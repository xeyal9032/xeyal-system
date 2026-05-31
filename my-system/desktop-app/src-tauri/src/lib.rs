use tauri::{AppHandle, Emitter, Manager};
use tauri_plugin_dialog::{DialogExt, FilePath};
use tauri_plugin_opener::OpenerExt;
use std::process::{Command, Stdio};
use std::os::windows::process::CommandExt;
use std::io::{BufRead, BufReader, Write};
use std::sync::{Arc, Mutex};
use std::thread;
use std::time::Duration;
use sysinfo::System;
use std::fs;
use std::path::{Path, PathBuf};

#[derive(Clone, serde::Serialize)]
struct LogPayload {
    message: String,
    level: String,
}

#[derive(Clone, serde::Serialize)]
struct HealthPayload {
    cpu: u32,
    ram: u64, // Added RAM
    uptime: u64,
    project: String,
}

struct AppState {
    child_process: Arc<Mutex<Option<std::process::Child>>>,
}

fn normalize_path(path: PathBuf) -> PathBuf {
    let s = path.to_string_lossy();
    if s.starts_with("\\\\?\\") {
        PathBuf::from(s[4..].to_string())
    } else {
        path
    }
}

fn discover_root(app: &AppHandle) -> PathBuf {
    // 1. Check Desktop/systemx/my-system (User's primary dev path)
    if let Ok(desktop) = app.path().desktop_dir() {
        let dev_path = desktop.join("systemx").join("my-system");
        if dev_path.exists() {
            return dev_path;
        }
    }

    // 2. Check Tauri's resource directory
    if let Ok(res_dir) = app.path().resource_dir() {
        let res_dir = normalize_path(res_dir);
        if res_dir.join("XEYAL_HEALER.cjs").exists() {
            return res_dir;
        }
    }

    // 3. Check AppData
    if let Ok(app_data) = app.path().app_local_data_dir() {
        let app_data = normalize_path(app_data);
        if app_data.join("XEYAL_HEALER.cjs").exists() {
            return app_data;
        }
    }

    std::env::current_dir().unwrap_or_else(|_| PathBuf::from("."))
}

fn extract_json(output: &str) -> String {
    let start_tag = "XEYAL_JSON_DATA_START";
    let end_tag = "XEYAL_JSON_DATA_END";

    if let Some(start_pos) = output.find(start_tag) {
        if let Some(end_pos) = output.find(end_tag) {
            let json_start = start_pos + start_tag.len();
            if end_pos > json_start {
                return output[json_start..end_pos].trim().to_string();
            }
        }
    }
    // Fallback: If no tags found, try to return the raw output if it looks like JSON
    output.trim().to_string()
}

#[tauri::command]
async fn swarm_action(app: AppHandle, action_type: String, path_str: String, content: String) -> Result<String, String> {
    let desktop = app.path().desktop_dir().unwrap_or_else(|_| PathBuf::from("."));
    let swarm_dir = desktop.join("Xeyal_Swarm_Output");
    
    if !swarm_dir.exists() {
        fs::create_dir_all(&swarm_dir).map_err(|e| e.to_string())?;
    }

    if action_type == "WRITE_FILE" {
        let file_path = swarm_dir.join(path_str);
        
        // Ensure parent directories exist
        if let Some(parent) = file_path.parent() {
            let _ = fs::create_dir_all(parent);
        }

        fs::write(&file_path, content).map_err(|e| e.to_string())?;
        
        let _ = app.emit("cli-log", LogPayload { 
            message: format!("🦾 Swarm Action: File written to {:?}", file_path), 
            level: "success".into() 
        });
        
        return Ok(format!("File written successfully to {:?}", file_path));
    }

    Err("Unknown action type".into())
}

#[tauri::command]
async fn execute_swarm_code(app: AppHandle, filename: String) -> Result<String, String> {
    let desktop = app.path().desktop_dir().unwrap_or_else(|_| PathBuf::from("."));
    let swarm_dir = desktop.join("Xeyal_Swarm_Output");
    let target_path = swarm_dir.join(&filename);

    if !target_path.exists() {
        return Err("Target path not found".into());
    }

    // MULTI-FILE PROJECT EXECUTION
    if target_path.is_dir() {
        if target_path.join("package.json").exists() {
            let _ = app.emit("cli-log", LogPayload { message: "📦 Found package.json, launching Node project...".into(), level: "system".into() });
            
            #[cfg(target_os = "windows")]
            Command::new("cmd").args(["/C", "start", "cmd", "/K", "npm install && npm start"]).current_dir(&target_path).spawn().map_err(|e| e.to_string())?;
            #[cfg(not(target_os = "windows"))]
            let _ = Command::new("npm").args(["start"]).current_dir(&target_path).spawn();

            return Ok(format!("Executing Node project in {}", filename));
        } else if target_path.join("requirements.txt").exists() {
            let _ = app.emit("cli-log", LogPayload { message: "📦 Found requirements.txt, launching Python project...".into(), level: "system".into() });
            let py_file = if target_path.join("app.py").exists() { "app.py" } else { "main.py" };
            
            #[cfg(target_os = "windows")]
            {
                let cmd_str = format!("pip install -r requirements.txt && python {}", py_file);
                Command::new("cmd").args(["/C", "start", "cmd", "/K", &cmd_str]).current_dir(&target_path).spawn().map_err(|e| e.to_string())?;
            }
            #[cfg(not(target_os = "windows"))]
            let _ = Command::new("python").arg(&py_file).current_dir(&target_path).spawn();

            return Ok(format!("Executing {} in {}", py_file, filename));
        } else if target_path.join("app.js").exists() {
            #[cfg(target_os = "windows")]
            Command::new("cmd").args(["/C", "start", "cmd", "/K", "node app.js"]).current_dir(&target_path).spawn().map_err(|e| e.to_string())?;
            return Ok(format!("Executing app.js in {}", filename));
        } else if target_path.join("index.html").exists() {
             let path_str = target_path.join("index.html").to_string_lossy().to_string();
             let _ = app.opener().open_path(path_str, None::<&str>);
             return Ok(format!("Opening index.html in {}", filename));
        } else {
            return Err("Unknown project structure in directory".into());
        }
    }

    // SINGLE-FILE EXECUTION
    let file_path = target_path;
    if filename.ends_with(".py") {
        let content = fs::read_to_string(&file_path).unwrap_or_default();
        let mut deps = Vec::new();
        if content.contains("import requests") { deps.push("requests"); }
        if content.contains("bs4") { deps.push("beautifulsoup4"); }
        if content.contains("feedparser") { deps.push("feedparser"); }
        if content.contains("flask") { deps.push("flask"); }

        #[cfg(target_os = "windows")]
        {
            let dep_str = if deps.is_empty() { "".to_string() } else { format!("pip install {} && ", deps.join(" ")) };
            let cmd_str = format!("{}python {}", dep_str, filename);
            Command::new("cmd").args(["/C", "start", "cmd", "/K", &cmd_str]).current_dir(&swarm_dir).spawn().map_err(|e| e.to_string())?;
        }
        #[cfg(not(target_os = "windows"))]
        let _ = Command::new("python").arg(&filename).current_dir(&swarm_dir).spawn();

    } else if filename.ends_with(".js") {
        let content = fs::read_to_string(&file_path).unwrap_or_default();
        let mut deps = Vec::new();
        if content.contains("require('express')") { deps.push("express"); }
        if content.contains("require('axios')") { deps.push("axios"); }

        #[cfg(target_os = "windows")]
        {
            let dep_str = if deps.is_empty() { "".to_string() } else { format!("npm install --no-save {} && ", deps.join(" ")) };
            let cmd_str = format!("{}node {}", dep_str, filename);
            Command::new("cmd").args(["/C", "start", "cmd", "/K", &cmd_str]).current_dir(&swarm_dir).spawn().map_err(|e| e.to_string())?;
        }
        #[cfg(not(target_os = "windows"))]
        let _ = Command::new("node").arg(&filename).current_dir(&swarm_dir).spawn();
    } else {
        return Err("Unsupported file type".into());
    }

    Ok(format!("Executing {}", filename))
}

#[tauri::command]
async fn get_desktop_path(app: AppHandle) -> Result<String, String> {
    let desktop = app.path().desktop_dir().map_err(|e| e.to_string())?;
    Ok(desktop.to_string_lossy().to_string())
}


#[tauri::command]
async fn open_project_folder(app: AppHandle, path: String) -> Result<String, String> {
    let root = discover_root(&app);
    let cli_script = root.join("cli").join("index.js");

    let _ = app.emit("cli-log", LogPayload { 
        message: format!("📂 Activating project: {}", path), 
        level: "system".into() 
    });

    // Update projects.json config
    let projects_path = root.join("config").join("projects.json");
    let _ = fs::create_dir_all(root.join("config"));
    let project_name = Path::new(&path).file_name().unwrap_or_default().to_string_lossy().to_string();
    
    // Read existing to preserve the projects list
    let mut current_data: serde_json::Value = fs::read_to_string(&projects_path)
        .ok()
        .and_then(|s| serde_json::from_str(&s).ok())
        .unwrap_or_else(|| serde_json::json!({ "projects": [] }));
    
    current_data["active"] = serde_json::json!(project_name);
    if current_data["projects"].is_null() {
        current_data["projects"] = serde_json::json!([]);
    }

    let _ = fs::write(projects_path, current_data.to_string());

    let mut child = Command::new("node")
        .arg(&cli_script)
        .arg("open")
        .arg(&path)
        .env("XEYAL_GUI", "true")
        .current_dir(&root)
        .creation_flags(0x08000000) // CREATE_NO_WINDOW
        .stdout(Stdio::piped())
        .stderr(Stdio::piped())
        .spawn()
        .map_err(|e| {
            let err = format!("❌ Shell Error: Could not launch Node.js. Details: {}", e);
            let _ = app.emit("cli-log", LogPayload { message: err.clone(), level: "error".into() });
            err
        })?;

    let stdout = child.stdout.take().unwrap();
    let stderr = child.stderr.take().unwrap();
    
    let app_out = app.clone();
    thread::spawn(move || {
        let reader = BufReader::new(stdout);
        for line in reader.lines() {
            if let Ok(l) = line {
                let _ = app_out.emit("cli-log", LogPayload { message: l, level: "info".into() });
            }
        }
    });

    let app_err = app.clone();
    thread::spawn(move || {
        let reader = BufReader::new(stderr);
        for line in reader.lines() {
            if let Ok(l) = line {
                let _ = app_err.emit("cli-log", LogPayload { message: l, level: "error".into() });
            }
        }
    });

    Ok(path)
}

#[tauri::command]
async fn start_dev_environment(app: AppHandle, state: tauri::State<'_, AppState>) -> Result<String, String> {
    let mut lock = state.child_process.lock().unwrap();
    let root = discover_root(&app);
    let cli_script = root.join("cli").join("index.js");
    
    if lock.is_some() {
        return Err("Running".into());
    }

    let mut child = Command::new("node")
        .arg(&cli_script)
        .arg("dev")
        .current_dir(&root)
        .env("XEYAL_GUI", "true")
        .creation_flags(0x08000000) // CREATE_NO_WINDOW
        .stdout(Stdio::piped())
        .stderr(Stdio::piped())
        .spawn()
        .map_err(|e| format!("Node error: {}", e))?;

    let stdout = child.stdout.take().unwrap();
    let stderr = child.stderr.take().unwrap();
    
    let app_clone = app.clone();
    thread::spawn(move || {
        let reader = BufReader::new(stdout);
        for line in reader.lines() {
            if let Ok(l) = line {
                let _ = app_clone.emit("cli-log", LogPayload { message: l, level: "info".into() });
            }
        }
    });

    let app_clone_err = app.clone();
    thread::spawn(move || {
        let reader = BufReader::new(stderr);
        for line in reader.lines() {
            if let Ok(l) = line {
                let _ = app_clone_err.emit("cli-log", LogPayload { message: l, level: "error".into() });
            }
        }
    });

    *lock = Some(child);
    Ok("Started".into())
}

#[tauri::command]
async fn stop_all_services(state: tauri::State<'_, AppState>) -> Result<String, String> {
    let mut lock = state.child_process.lock().unwrap();
    // Use current_dir fallback for stop (no AppHandle available here)
    let root = std::env::current_dir().unwrap_or_else(|_| PathBuf::from("."));
    let cli_script = root.join("cli").join("index.js");

    if let Some(mut child) = lock.take() {
        let _ = child.kill();
        let _ = Command::new("node")
            .arg(&cli_script)
            .arg("clean")
            .current_dir(&root)
            .spawn();
        Ok("Stopped".into())
    } else {
        Err("No active services".into())
    }
}

#[tauri::command]
async fn pick_project_folder(app: AppHandle) -> Result<String, String> {
    let window = app.get_webview_window("main");
    let root = discover_root(&app);
    let app_for_block = app.clone();
    let path = tauri::async_runtime::spawn_blocking(move || {
        let builder = if let Some(w) = window {
            w.dialog().file()
        } else {
            app_for_block.dialog().file()
        };

        builder
            .set_directory(&root)
            .blocking_pick_folder()
    }).await.map_err(|e| format!("Picker error: {}", e))?;

    if let Some(path) = path {
        let path_str = match path {
            FilePath::Path(p) => p.to_string_lossy().to_string(),
            FilePath::Url(u) => u.to_string(),
        };
        open_project_folder(app, path_str).await
    } else {
        Err("Cancelled".into())
    }
}

#[tauri::command]
async fn get_active_ports(app: AppHandle) -> Result<serde_json::Value, String> {
    let root = discover_root(&app);
    let cli_script = root.join("cli").join("index.js");

    let output = Command::new("node")
        .arg(&cli_script)
        .arg("status") 
        .arg("--json") 
        .env("XEYAL_GUI", "true")
        .current_dir(&root)
        .creation_flags(0x08000000) // CREATE_NO_WINDOW
        .output()
        .map_err(|e| format!("Failed to run status: {}", e))?;

    let stdout_raw = String::from_utf8_lossy(&output.stdout);
    let stderr_raw = String::from_utf8_lossy(&output.stderr);
    let json_str = extract_json(&stdout_raw);
    
    serde_json::from_str(&json_str).map_err(|e| {
        let msg = format!("❌ Communication Failure (Status):\nError: {}\nStdout: {}\nStderr: {}", e, stdout_raw, stderr_raw);
        let _ = app.emit("cli-log", LogPayload { message: msg.clone(), level: "error".into() });
        msg
    })
}

#[tauri::command]
async fn get_marketplace_plugins(app: AppHandle) -> Result<serde_json::Value, String> {
    let root = discover_root(&app);
    let cli_script = root.join("cli").join("index.js");

    let output = Command::new("node")
        .arg(&cli_script)
        .arg("marketplace")
        .arg("list")
        .arg("--json")
        .env("XEYAL_GUI", "true")
        .current_dir(&root)
        .creation_flags(0x08000000) // CREATE_NO_WINDOW
        .output()
        .map_err(|e| format!("Failed to list plugins: {}", e))?;

    let stdout_raw = String::from_utf8_lossy(&output.stdout);
    let stderr_raw = String::from_utf8_lossy(&output.stderr);
    let json_str = extract_json(&stdout_raw);
    
    serde_json::from_str(&json_str).map_err(|e| {
        let msg = format!("❌ Communication Failure (Marketplace):\nError: {}\nStdout: {}\nStderr: {}", e, stdout_raw, stderr_raw);
        let _ = app.emit("cli-log", LogPayload { message: msg.clone(), level: "error".into() });
        msg
    })
}

#[tauri::command]
async fn install_marketplace_plugin(app: AppHandle, id: String) -> Result<String, String> {
    let root = discover_root(&app);
    let cli_script = root.join("cli").join("index.js");

    let output = Command::new("node")
        .arg(&cli_script)
        .arg("marketplace")
        .arg("install")
        .arg(&id)
        .env("XEYAL_GUI", "true")
        .current_dir(&root)
        .creation_flags(0x08000000) // CREATE_NO_WINDOW
        .output()
        .map_err(|e| format!("Failed to install plugin: {}", e))?;

    if output.status.success() {
        Ok(format!("Plugin {} installed", id))
    } else {
        Err(String::from_utf8_lossy(&output.stderr).to_string())
    }
}

#[tauri::command]
async fn install_dependencies(app: tauri::AppHandle, path: String) -> Result<String, String> {
    let root = discover_root(&app);
    let cli_script = root.join("cli").join("index.js");

    let _ = app.emit("cli-log", LogPayload { 
        message: format!("📦 Running autopilot installer in: {}", path), 
        level: "system".into() 
    });

    let output = Command::new("node")
        .arg(&cli_script)
        .arg("install")
        .env("XEYAL_GUI", "true")
        .current_dir(&path) 
        .creation_flags(0x08000000) // CREATE_NO_WINDOW
        .output()
        .map_err(|e| format!("Install failed: {}", e))?;

    if output.status.success() {
        Ok("Dependencies installed".into())
    } else {
        Err(String::from_utf8_lossy(&output.stderr).to_string())
    }
}

#[tauri::command]
async fn create_project(app: AppHandle, name: String, template: String, path: Option<String>) -> Result<String, String> {
    let root = discover_root(&app);
    let cli_script = root.join("cli").join("index.js");

    let base_dir = if let Some(p) = path {
        std::path::PathBuf::from(p)
    } else {
        root.clone()
    };

    let target_path = base_dir.join(&name);

    // 1. Try Scaffolding via CLI
    let output = Command::new("node")
        .arg(&cli_script)
        .arg("create")
        .arg(&name)
        .arg("--template")
        .arg(&template)
        .arg("--non-interactive")
        .env("XEYAL_GUI", "true")
        .current_dir(&base_dir)
        .creation_flags(0x08000000) // CREATE_NO_WINDOW
        .output();

    match output {
        Ok(out) if out.status.success() => {
            let stdout_raw = String::from_utf8_lossy(&out.stdout);
            let json_str = extract_json(&stdout_raw);
            if let Ok(val) = serde_json::from_str::<serde_json::Value>(&json_str) {
                if let Some(p) = val["path"].as_str() {
                    return Ok(p.to_string());
                }
            }
            Ok(target_path.to_string_lossy().to_string())
        },
        _ => {
            // 2. FALLBACK: Create folder manually if CLI fails
            std::fs::create_dir_all(&target_path).map_err(|e| format!("Folder creation failed: {}", e))?;
            Ok(target_path.to_string_lossy().to_string())
        }
    }
}

#[tauri::command]
async fn invoke_ollama(app: AppHandle, model: String, prompt: String) -> Result<String, String> {
    let root = discover_root(&app);
    let cli_script = root.join("cli").join("index.js");

    let mut child = Command::new("node")
        .arg(&cli_script)
        .arg("intelligence-chat")
        .arg("--model")
        .arg(&model)
        .env("XEYAL_GUI", "true")
        .stdin(Stdio::piped())
        .stdout(Stdio::piped())
        .current_dir(&root)
        .creation_flags(0x08000000) // CREATE_NO_WINDOW
        .spawn()
        .map_err(|e| format!("Failed to launch AI bridge: {}", e))?;

    {
        let mut stdin = child.stdin.take().ok_or("Failed to open stdin")?;
        stdin.write_all(prompt.as_bytes()).map_err(|e| format!("Write error: {}", e))?;
    }

    let output = child.wait_with_output().map_err(|e| format!("Failed to read AI response: {}", e))?;
    let stdout_raw = String::from_utf8_lossy(&output.stdout);
    let json_str = extract_json(&stdout_raw);
    
    let val: serde_json::Value = serde_json::from_str(&json_str).map_err(|e| {
        format!("AI Error: {}\nRaw: {}", e, stdout_raw)
    })?;
        
    // Handle both /api/generate (response) and /api/chat (message.content)
    let ai_text = if let Some(content) = val.get("message").and_then(|m| m.get("content")) {
        content.as_str().unwrap_or("No content").to_string()
    } else {
        val.get("response").and_then(|r| r.as_str()).unwrap_or("No response").to_string()
    };

    Ok(ai_text)
}

#[tauri::command]
async fn check_ollama_status() -> Result<bool, String> {
    let client = reqwest::Client::new();
    let res = client.get("http://localhost:11434/api/tags")
        .timeout(std::time::Duration::from_secs(2))
        .send()
        .await;
    
    match res {
        Ok(response) => Ok(response.status().is_success()),
        Err(_) => Ok(false)
    }
}

#[tauri::command]
async fn read_project_file(app: AppHandle, path: String) -> Result<String, String> {
    let root = discover_root(&app);
    let desktop = dirs::desktop_dir().unwrap_or_else(|| PathBuf::from("."));
    
    let full_path = if Path::new(&path).is_absolute() {
        PathBuf::from(&path)
    } else {
        root.join(&path)
    };
    
    // NORMALIZE BOTH SIDES FOR COMPARISON (Crucial for Windows \\?\ prefix)
    let full_path_str = full_path.to_string_lossy().replace("\\\\?\\", "").replace("/", "\\");
    let root_str = root.canonicalize().unwrap_or(root).to_string_lossy().replace("\\\\?\\", "").replace("/", "\\");
    let desktop_str = desktop.canonicalize().unwrap_or(desktop).to_string_lossy().replace("\\\\?\\", "").replace("/", "\\");
    
    if !full_path_str.starts_with(&root_str) && !full_path_str.starts_with(&desktop_str) {
        return Err(format!("Security Violation: Access denied as path is outside workspace."));
    }
    fs::read_to_string(full_path).map_err(|e| format!("Read Error: {}", e))
}

#[tauri::command]
async fn write_project_file(app: AppHandle, path: String, content: String) -> Result<String, String> {
    let root = discover_root(&app);
    let desktop = dirs::desktop_dir().unwrap_or_else(|| PathBuf::from("."));
    
    // Resolve path
    let full_path = if Path::new(&path).is_absolute() {
        PathBuf::from(&path)
    } else {
        root.join(&path)
    };
    
    let parent = full_path.parent().unwrap_or(&full_path);
    
    // 1. Create parent directory FIRST so canonicalize can resolve it fully and safely (removes ../ and resolves symlinks)
    if !parent.exists() {
        fs::create_dir_all(parent).map_err(|e| format!("Dir Creation Error: {}", e))?;
    }
    
    // 2. Robust Security check: Canonicalize now that parent exists
    let root_canon = root.canonicalize().unwrap_or(root);
    let desktop_canon = desktop.canonicalize().unwrap_or(desktop);
    let parent_canon = parent.canonicalize().unwrap_or(parent.to_path_buf());

    if !parent_canon.starts_with(&root_canon) && !parent_canon.starts_with(&desktop_canon) {
        return Err(format!("Security Violation: Write to {:?} (canon: {:?}) is denied.", full_path, parent_canon));
    }
    
    // 3. Write file
    fs::write(&full_path, content).map_err(|e| format!("Write Error: {}", e))?;
    Ok("File written successfully".into())
}

#[tauri::command]
async fn get_project_structure(app: AppHandle, path: Option<String>) -> Result<serde_json::Value, String> {
    let focus_path = if let Some(p) = path {
        PathBuf::from(p)
    } else {
        discover_root(&app)
    };

    if !focus_path.exists() {
        return Err("Path does not exist".into());
    }

    // Get project structure
    fn walk(dir: &std::path::Path, root: &std::path::Path, files: &mut Vec<serde_json::Value>) {
        if let Ok(entries) = fs::read_dir(dir) {
            for entry in entries.flatten() {
                let path = entry.path();
                let name = path.file_name().unwrap_or_default().to_string_lossy().to_string();
                let is_dir = path.is_dir();
                
                let name_lower = name.to_lowercase();
                if name_lower == "node_modules" || name_lower == ".git" || name_lower == "target" || 
                   name_lower == "venv" || name_lower == "test" || name_lower == "tests" || 
                   name_lower == "examples" || name_lower == "docs" || name_lower == ".vscode" {
                    continue;
                }

                if is_dir {
                    walk(&path, root, files);
                } else {
                    if let Ok(rel) = path.strip_prefix(root) {
                        // FORCE FORWARD SLASHES FOR CONSISTENT JS SPLITTING
                        let rel_str = rel.to_string_lossy().replace("\\", "/");
                        files.push(serde_json::json!({
                            "name": name,
                            "path": path.to_string_lossy().to_string(),
                            "rel": rel_str,
                            "kind": "File"
                        }));
                    }
                }
            }
        }
    }
    
    let mut file_list: Vec<serde_json::Value> = Vec::new();
    walk(&focus_path, &focus_path, &mut file_list);
    Ok(serde_json::to_value(file_list).unwrap())
}

#[tauri::command]
async fn get_available_skills(app: AppHandle) -> Result<serde_json::Value, String> {
    let root = discover_root(&app);
    let cli_script = root.join("cli").join("index.js");

    let output = Command::new("node")
        .arg(&cli_script)
        .arg("skills")
        .arg("list")
        .arg("--json")
        .env("XEYAL_GUI", "true")
        .current_dir(&root)
        .creation_flags(0x08000000) // CREATE_NO_WINDOW
        .output()
        .map_err(|e| format!("Failed to list skills: {}", e))?;

    let json_str = extract_json(&String::from_utf8_lossy(&output.stdout));
    serde_json::from_str(&json_str).map_err(|e| format!("Parse error: {}", e))
}

#[tauri::command]
async fn launch_skill(app: AppHandle, id: String) -> Result<String, String> {
    let root = discover_root(&app);
    let cli_script = root.join("cli").join("index.js");

    let _ = Command::new("node")
        .arg(&cli_script)
        .arg("skills")
        .arg("launch")
        .arg(&id)
        .env("XEYAL_GUI", "true")
        .current_dir(&root)
        .creation_flags(0x08000000) // CREATE_NO_WINDOW
        .spawn()
        .map_err(|e| format!("Failed to launch skill: {}", e))?;

    Ok(format!("Skill {} launched", id))
}

#[tauri::command]
async fn stop_skill(app: AppHandle, id: String) -> Result<String, String> {
    let root = discover_root(&app);
    let cli_script = root.join("cli").join("index.js");

    let _ = Command::new("node")
        .arg(&cli_script)
        .arg("skills")
        .arg("stop")
        .arg(&id)
        .env("XEYAL_GUI", "true")
        .current_dir(&root)
        .output()
        .map_err(|e| format!("Failed to stop skill: {}", e))?;

    Ok(format!("Skill {} stopped", id))
}

#[tauri::command]
async fn run_forge_project(app: AppHandle, path: String, cmd: Option<String>) -> Result<String, String> {
    let target = PathBuf::from(&path);
    if !target.exists() { return Err("Project path does not exist.".into()); }

    // 0. Manual Command Override (Priority)
    if let Some(command) = cmd {
        let _ = Command::new("powershell")
            .arg("-Command")
            .arg(format!("cd '{}'; {}", path, command))
            .creation_flags(0x08000000) // CREATE_NO_WINDOW
            .spawn()
            .map_err(|e| format!("Manual command failed: {}", e))?;
        return Ok(format!("Executing manual command: {}", command));
    }

    // 1. PHP/Laravel Detection (Priority)
    if target.join("artisan").exists() {
        // AUTO-REPAIR: If .env is missing, copy from example and generate key
        if !target.join(".env").exists() && target.join(".env.example").exists() {
            let _ = Command::new("powershell")
                .arg("-Command")
                .arg(format!("cd '{}'; Copy-Item .env.example .env; php artisan key:generate", path))
                .output();
        }

        let _ = Command::new("powershell")
            .arg("-Command")
            .arg(format!("cd '{}'; php artisan serve --port=8000 || php -S localhost:8000 -t public", path))
            .creation_flags(0x08000000) // CREATE_NO_WINDOW
            .spawn()
            .map_err(|e| format!("PHP launch failed: {}", e))?;
            
        // WAIT A BIT FOR SERVER TO START, THEN OPEN BROWSER
        let _ = app.opener().open_url("http://localhost:8000", None::<String>);
        return Ok("Launching PHP/Laravel project with Auto-Repair...".into());
    }

    // 1.1 Pure PHP Detection (No Artisan)
    if target.join("public").join("index.php").exists() || target.join("index.php").exists() {
        let doc_root = if target.join("public").exists() { "public" } else { "." };
        let _ = Command::new("powershell")
            .arg("-Command")
            .arg(format!("cd '{}'; php -S localhost:8000 -t {}", path, doc_root))
            .creation_flags(0x08000000) // CREATE_NO_WINDOW
            .spawn()
            .map_err(|e| format!("Pure PHP launch failed: {}", e))?;

        let _ = app.opener().open_url("http://localhost:8000", None::<String>);
        return Ok("Launching Pure PHP server...".into());
    }

    // 2. Web Detection
    if target.join("index.html").exists() {
        let _ = app.opener().open_path(target.join("index.html").to_string_lossy().to_string(), None::<String>);
        return Ok("Launching in Browser...".into());
    }

    // 2. Rust/Cargo Detection
    if target.join("Cargo.toml").exists() {
        let _ = Command::new("powershell")
            .arg("-Command")
            .arg(format!("cd '{}'; cargo run", path))
            .spawn()
            .map_err(|e| format!("Cargo launch failed: {}", e))?;
        return Ok("Launching Rust project...".into());
    }

    // 4. Node.js Detection
    if target.join("package.json").exists() {
        let _ = Command::new("powershell")
            .arg("-Command")
            .arg(format!("cd '{}'; npm start || npm run dev", path))
            .spawn()
            .map_err(|e| format!("NPM launch failed: {}", e))?;
        return Ok("Launching Node.js project...".into());
    }

    // 5. Python Detection (with venv support)
    if target.join("main.py").exists() || target.join("app.py").exists() || target.join("requirements.txt").exists() {
        let script = if target.join("main.py").exists() { "main.py" } else { "app.py" };
        let _ = Command::new("powershell")
            .arg("-Command")
            .arg(format!("cd '{}'; if(Test-Path 'venv') {{ .\\venv\\Scripts\\python.exe '{}' }} else {{ python '{}' }}", path, script, script))
            .spawn()
            .map_err(|e| format!("Python launch failed: {}", e))?;
        return Ok("Launching Python project...".into());
    }

    // 6. C++ Detection
    if target.join("main.cpp").exists() || target.join("index.cpp").exists() {
        let script = if target.join("main.cpp").exists() { "main.cpp" } else { "index.cpp" };
        let _ = Command::new("powershell")
            .arg("-Command")
            .arg(format!("cd '{}'; g++ '{}' -o forge_app.exe; if ($?) {{ .\\forge_app.exe }}", path, script))
            .spawn()
            .map_err(|e| format!("C++ launch failed: {}", e))?;
        return Ok("Launching C++ project...".into());
    }

    Err("Could not determine how to run this project. Please open in VS Code.".into())
}

// ═══════════════════════════════════════════
// ONBOARDING COMMANDS
// ═══════════════════════════════════════════

#[tauri::command]
async fn check_onboarding_complete(app: AppHandle) -> bool {
    let data_dir = app.path().app_local_data_dir().unwrap_or_default();
    data_dir.join(".onboarding-complete").exists()
}

#[tauri::command]
async fn set_onboarding_complete(app: AppHandle) -> Result<String, String> {
    let data_dir = app.path().app_local_data_dir().unwrap_or_default();
    let _ = fs::create_dir_all(&data_dir);
    fs::write(data_dir.join(".onboarding-complete"), "1").map_err(|e| e.to_string())?;
    Ok("done".into())
}

#[tauri::command]
async fn check_ollama_installed() -> bool {
    // 1. Try global path
    if Command::new("ollama")
        .arg("--version")
        .creation_flags(0x08000000) // CREATE_NO_WINDOW
        .output()
        .map(|o| o.status.success())
        .unwrap_or(false) {
        return true;
    }
    // 2. Try common Windows install paths (Modern Programs/Ollama and Legacy Ollama)
    if let Ok(local_appdata) = std::env::var("LOCALAPPDATA") {
        let p1 = std::path::Path::new(&local_appdata).join("Programs").join("Ollama").join("ollama.exe");
        let p2 = std::path::Path::new(&local_appdata).join("Ollama").join("ollama.exe");
        if p1.exists() || p2.exists() { return true; }
    }
    false
}

fn map_agent_to_model(agent: &str) -> &str {
    match agent {
        "openclaw" => "qwen2.5-coder:7b",
        "claude-local" => "codellama:7b",
        "codex-local" => "starcoder2:3b",
        "opencode" => "deepseek-coder:6.7b",
        "droid" => "stable-code",
        "pi" => "phi3:mini",
        "claudedesktop" => "llama3",
        "hermesagent" => "hermes3",
        "copilotcli" => "codegemma",
        "autogpt" => "llama3",
        "agentgpt" => "llama3",
        "crewai" => "qwen2.5-coder:7b",
        "langchain" => "qwen2.5-coder:7b",
        "superagi" => "qwen2.5-coder:7b",
        "babyagi" => "phi3:mini",
        "opendevin" => "qwen2.5-coder:7b",
        "metagpt" => "qwen2.5-coder:7b",
        "gpt-engineer" => "qwen2.5-coder:7b",
        "devika" => "qwen2.5-coder:7b",
        _ => agent
    }
}

#[tauri::command]
async fn install_ollama_agent(agent: String) -> Result<String, String> {
    // 1. Try to find the full path to ollama in common folders
    let mut ollama_exe = "ollama".to_string();
    
    if let Ok(local_appdata) = std::env::var("LOCALAPPDATA") {
        let p1 = std::path::Path::new(&local_appdata).join("Programs").join("Ollama").join("ollama.exe");
        let p2 = std::path::Path::new(&local_appdata).join("Ollama").join("ollama.exe");
        if p1.exists() {
            ollama_exe = p1.to_string_lossy().to_string();
        } else if p2.exists() {
            ollama_exe = p2.to_string_lossy().to_string();
        }
    }
    
    // 2. Resolve agent alias to standard model
    let target_model = map_agent_to_model(&agent);

    // 3. Direct call forcing OLLAMA_HOST to 127.0.0.1:11434 to prevent IPv6/localhost lock rotation timeout on Windows
    let output = Command::new(&ollama_exe)
        .arg("pull")
        .arg(target_model)
        .env("OLLAMA_HOST", "127.0.0.1:11434")
        .creation_flags(0x08000000) // CREATE_NO_WINDOW
        .output();
    
    match output {
        Ok(o) if o.status.success() => Ok(format!("{} basariyla kuruldu", agent)),
        Ok(o) => {
            let err_msg = String::from_utf8_lossy(&o.stderr).to_string();
            Err(format!("Ollama Hatasi ({}): {}", agent, if err_msg.is_empty() { "Cevap yok".into() } else { err_msg }))
        },
        Err(e) => Err(format!("Ollama bulunamadi: {}. Kurulumu kontrol edin.", e))
    }
}

#[tauri::command]
async fn open_ollama_download() -> Result<(), String> {
    let _ = Command::new("cmd")
        .arg("/c")
        .arg("start")
        .arg("https://ollama.com/download")
        .spawn();
    Ok(())
}

#[tauri::command]
async fn open_url(url: String) -> Result<(), String> {
    let _ = Command::new("cmd")
        .arg("/c")
        .arg("start")
        .arg(&url)
        .spawn();
    Ok(())
}

#[tauri::command]
async fn check_ollama_model(name: String) -> bool {
    let mut ollama_exe = "ollama".to_string();
    if let Ok(local_appdata) = std::env::var("LOCALAPPDATA") {
        let p1 = std::path::Path::new(&local_appdata).join("Programs").join("Ollama").join("ollama.exe");
        let p2 = std::path::Path::new(&local_appdata).join("Ollama").join("ollama.exe");
        if p1.exists() {
            ollama_exe = p1.to_string_lossy().to_string();
        } else if p2.exists() {
            ollama_exe = p2.to_string_lossy().to_string();
        }
    }

    // Resolve agent alias to standard model
    let target_model = map_agent_to_model(&name);

    Command::new(&ollama_exe)
        .arg("show")
        .arg(target_model)
        .env("OLLAMA_HOST", "127.0.0.1:11434")
        .creation_flags(0x08000000) // CREATE_NO_WINDOW
        .output()
        .map(|o| o.status.success())
        .unwrap_or(false)
}

#[tauri::command]
async fn heal_project(app: AppHandle, project_path: String) -> Result<String, String> {
    let root = discover_root(&app);
    let healer_script = root.join("XEYAL_HEALER.cjs");

    let _ = app.emit("cli-log", LogPayload { 
        message: format!("🔍 Healer looking for script at: {}", healer_script.to_string_lossy()), 
        level: "system".into() 
    });

    let output = std::process::Command::new("node")
        .arg(&healer_script)
        .arg(&project_path)
        .env("XEYAL_GUI", "true")
        .current_dir(&root)
        .creation_flags(0x08000000) // CREATE_NO_WINDOW
        .output()
        .map_err(|e| format!("Healer activation failed: {}", e))?;

    let stdout = String::from_utf8_lossy(&output.stdout);
    let stderr = String::from_utf8_lossy(&output.stderr);
    
    if output.status.success() {
        Ok(stdout.to_string())
    } else {
        let err_msg = format!("Healer Error: {} | Stderr: {}", stdout, stderr);
        let _ = app.emit("cli-log", LogPayload { message: format!("❌ {}", err_msg), level: "error".into() });
        Err(err_msg)
    }
}
#[tauri::command]
async fn read_forge_library(app: AppHandle) -> Result<String, String> {
    let root = discover_root(&app);

    
    // Try languages in priority order: TR, EN, then RU fallback
    let candidates = ["FORGE_LIBRARY_TR.md", "FORGE_LIBRARY.md", "FORGE_LIBRARY_RU.md"];
    
    for filename in candidates {
        let path = root.join(filename);
        if path.exists() {
            return fs::read_to_string(path).map_err(|e| e.to_string());
        }
    }
    
    Err("Forge Library not found (Checked TR, EN, RU)".into())
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .plugin(tauri_plugin_dialog::init())
        .manage(AppState {
            child_process: Arc::new(Mutex::new(None)),
        })
        .invoke_handler(tauri::generate_handler![
            start_dev_environment, 
            stop_all_services,
            pick_project_folder,
            open_project_folder,
            get_active_ports,
            get_marketplace_plugins,
            install_marketplace_plugin,
            install_dependencies,
            get_desktop_path,
            create_project,
            read_project_file,
            write_project_file,
            get_project_structure,
            invoke_ollama,
            get_available_skills,
            launch_skill,
            stop_skill,
            run_forge_project,
            check_onboarding_complete,
            set_onboarding_complete,
            check_ollama_installed,
            install_ollama_agent,
            open_ollama_download,
            open_url,
            check_ollama_model,
            swarm_action,
            execute_swarm_code,
            read_forge_library,
            heal_project,
            check_ollama_status
        ])
        .setup(|app| {
            let handle = app.handle().clone();
            let root = discover_root(&handle);
            let root_str = root.to_string_lossy().to_string();
            
            thread::spawn(move || {
                thread::sleep(Duration::from_millis(500));
                let _ = handle.emit("cli-log", LogPayload { 
                    message: format!("📍 System established at: {}", root_str), 
                    level: "system".into() 
                });
            });

            let handle_mon = app.handle().clone();
            let root_mon = root.clone();
            thread::spawn(move || {
                let mut sys = System::new_all();
                let start_time = std::time::Instant::now();
                loop {
                    sys.refresh_cpu_all();
                    sys.refresh_memory();
                    let cpu_usage = sys.global_cpu_usage() as u32;
                    let ram_usage = sys.used_memory() / 1024 / 1024 / 1024; // GB
                    let uptime = start_time.elapsed().as_secs();
                    
                    let projects_path = root_mon.join("config").join("projects.json");
                    let project_name = fs::read_to_string(projects_path)
                        .ok()
                        .and_then(|content| {
                            let json: serde_json::Value = serde_json::from_str(&content).ok()?;
                            json["active"].as_str().map(|s| s.to_string())
                        })
                        .unwrap_or_else(|| "No Active Project".into());

                    let _ = handle_mon.emit("health-update", HealthPayload {
                        cpu: cpu_usage,
                        ram: ram_usage,
                        uptime,
                        project: project_name,
                    });
                    thread::sleep(Duration::from_secs(2));
                }
            });
            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
