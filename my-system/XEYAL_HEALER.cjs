/**
 * 🛠️ XEYAL-HEALER v3.4: MULTI-LANGUAGE RESILIENCE ENGINE
 * -----------------------------------------------------
 * Laravel, Rails ve her tür Framework yapısına tam uyum.
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const os = require('os');

const TARGET_DIR = process.argv[2];

if (!TARGET_DIR) {
    console.error("❌ HATA: Hedef dizin belirtilmedi!");
    process.exit(1);
}

console.log(`\n🧠 XEYAL-HEALER v3.4: '${TARGET_DIR}' projesi derin analize alındı...\n`);

if (!fs.existsSync(TARGET_DIR)) {
    console.error("❌ HATA: Hedef dizin bulunamadı!");
    process.exit(1);
}

// AUTO-GENERATE PACKAGE.JSON IF MISSING
const pkgPath = path.join(TARGET_DIR, 'package.json');
if (!fs.existsSync(pkgPath)) {
    console.log("💡 package.json eksik. Otonom olarak oluşturuluyor...");
    const basePkg = {
        name: path.basename(TARGET_DIR),
        version: "1.0.0",
        dependencies: {},
        devDependencies: {},
        scripts: { "start": "node index.js" }
    };
    fs.writeFileSync(pkgPath, JSON.stringify(basePkg, null, 2));
}

let report = `# 🧬 Xeyal-Healer v3.4: Multi-Language Resilience Raporu\n\n`;
report += `**Tarih:** ${new Date().toLocaleString()}\n`;

let pkgJson;
try {
    pkgJson = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
} catch (e) {
    pkgJson = { dependencies: {}, devDependencies: {}, scripts: {} };
}

// Ensure critical sections exist
if (!pkgJson.dependencies) pkgJson.dependencies = {};
if (!pkgJson.devDependencies) pkgJson.devDependencies = {};
if (!pkgJson.scripts) pkgJson.scripts = {};

let changesMade = 0;
let secrets = [];

// AI REPAIR (Shell-Safe)
function aiRepair(filePath) {
    const content = fs.readFileSync(filePath, 'utf8');
    if (content.length < 30) return false;
    
    const tempIn = path.join(os.tmpdir(), `x_heal_in_${Date.now()}.json`);
    const prompt = `Fix any syntax errors in this code. Return ONLY the code. Code:\n${content}`;
    
    try {
        console.log(`🧠 AI Denetimi: ${path.basename(filePath)}...`);
        fs.writeFileSync(tempIn, JSON.stringify({ model: "llama3", prompt: prompt, stream: false }));
        const cmd = `powershell -Command "$body = Get-Content -Raw -Path '${tempIn}'; Invoke-RestMethod -Uri 'http://localhost:11434/api/generate' -Method Post -Body $body -ContentType 'application/json'"`;
        const res = execSync(cmd, { timeout: 20000 }).toString();
        const json = JSON.parse(res);
        if (json.response && json.response.length > 50) {
            fs.writeFileSync(filePath, json.response.trim());
            return true;
        }
    } catch (e) {} finally {
        if (fs.existsSync(tempIn)) fs.unlinkSync(tempIn);
    }
    return false;
}

// DEEP SCAN
function deepScan(dir) {
    if (!fs.existsSync(dir)) return;
    const files = fs.readdirSync(dir);
    files.forEach(file => {
        const fullPath = path.join(dir, file);
        try {
            const stats = fs.lstatSync(fullPath);
            if (stats.isDirectory()) {
                if (file !== 'node_modules' && file !== '.git' && file !== 'vendor') deepScan(fullPath);
            } else if (file.endsWith('.js') || file.endsWith('.jsx') || file.endsWith('.html') || file.endsWith('.ts')) {
                // AI Repair (Skip large vendor files)
                if (file.endsWith('.js') && stats.size < 50000 && aiRepair(fullPath)) {
                    report += `- 🧠 **AI Onarımı:** \`${file}\` kod yapısı optimize edildi.\n`;
                    changesMade++;
                }

                let content = fs.readFileSync(fullPath, 'utf8');
                
                // DEPENDENCY SYNC (SAFE)
                const matches = content.match(/(import|require).*?['"](.*?)['"]/g) || [];
                matches.forEach(m => {
                    const p = m.match(/['"](.*?)['"]/)[1].split('/')[0];
                    if (!p.startsWith('.') && !['fs','path','os','http','https','crypto','stream'].includes(p)) {
                        if (!pkgJson.dependencies[p] && !pkgJson.devDependencies[p]) {
                            pkgJson.dependencies[p] = "*";
                            report += `- ➕ **Bağımlılık:** \`${p}\` eklendi.\n`;
                            changesMade++;
                        }
                    }
                });

                // SECURITY SANITIZER
                const secretRegex = /['"](sk-[^'"]{10,}|[a-zA-Z0-9]{20,})['"]/gi;
                if (secretRegex.test(content)) {
                    content = content.replace(secretRegex, (m, val) => {
                        const keyName = `XEYAL_SECRET_${secrets.length + 1}`;
                        secrets.push({ key: keyName, val: val });
                        return `process.env.${keyName}`;
                    });
                    fs.writeFileSync(fullPath, content);
                    report += `- 🛡️ **Güvenlik:** \`${file}\` hassas veriler temizlendi.\n`;
                    changesMade++;
                }
            }
        } catch (e) {}
    });
}

deepScan(TARGET_DIR);

if (secrets.length > 0) {
    const envPath = path.join(TARGET_DIR, '.env');
    fs.writeFileSync(envPath, secrets.map(s => `${s.key}=${s.val}`).join('\n'));
}

// FRAMEWORK RECOVERY
if (pkgJson.dependencies['react'] && (pkgJson.scripts.start || "").includes('node ')) {
    pkgJson.scripts.start = "react-scripts start";
    pkgJson.scripts.build = "react-scripts build";
    changesMade++;
}

// PHP / LARAVEL ZERO-DEPENDENCY RECOVERY
const hasArtisan = fs.existsSync(path.join(TARGET_DIR, 'artisan'));
const publicDir = path.join(TARGET_DIR, 'public');
const hasPublicIndex = fs.existsSync(path.join(publicDir, 'index.php'));

if (hasArtisan || hasPublicIndex) {
    const vendorDir = path.join(TARGET_DIR, 'vendor');
    const bootstrapDir = path.join(TARGET_DIR, 'bootstrap');
    
    // Always write or overwrite the emulator core to match updated class mappings
    console.log("💡 Laravel/PHP projesi algılandı. Otonom SIFIR-BAĞIMLILIKLI LARAVEL EMÜLATÖRÜ güncelleniyor...");
    
    fs.mkdirSync(vendorDir, { recursive: true });
    fs.mkdirSync(bootstrapDir, { recursive: true });
    
    const mockAutoload = `<?php
// 🧬 XEYAL-HEALER: Zero-Dependency Laravel Emulator Core

namespace {
    if (!class_exists('Route')) {
        class Route {
            public static $routes = [];
            public static function get($uri, $action) {
                self::$routes['GET'][trim($uri, '/')] = $action;
            }
            public static function post($uri, $action) {
                self::$routes['POST'][trim($uri, '/')] = $action;
            }
        }
    }

    if (!function_exists('view')) {
        function view($name, $data = []) {
            $viewFile = __DIR__ . '/../app/Views/' . $name . '.blade.php';
            if (!file_exists($viewFile)) {
                $viewFile = __DIR__ . '/../resources/views/' . $name . '.blade.php';
            }
            if (!file_exists($viewFile)) {
                $viewFile = __DIR__ . '/../' . $name . '.html';
            }
            if (file_exists($viewFile)) {
                $content = file_get_contents($viewFile);
                foreach ($data as $key => $value) {
                    if (is_string($value)) {
                        $content = str_replace('{{ ' . $key . ' }}', $value, $content);
                        $content = str_replace('{{$' . $key . '}}', $value, $content);
                    }
                }
                return preg_replace('/\\{\\{\\s*(.*?)\\s*\\}\\}/', '', $content);
            }
            return "View '$name' not found.";
        }
    }
}

namespace App\\Http\\Controllers {
    if (!class_exists('App\\Http\\Controllers\\Controller')) {
        class Controller {}
    }
}

namespace Illuminate\\Support\\Facades {
    if (!class_exists('Illuminate\\Support\\Facades\\Route')) {
        class Route {
            public static function get($uri, $action) {
                \\Route::get($uri, $action);
            }
            public static function post($uri, $action) {
                \\Route::post($uri, $action);
            }
        }
    }
}

namespace Illuminate\\Http {
    class Request {
        public static function capture() { return new self(); }
    }
}

namespace Illuminate\\Contracts\\Http {
    interface Kernel {}
}

namespace Illuminate\\Foundation {
    class Application {
        public $basePath;
        
        public function __construct($basePath = '') {
            $this->basePath = $basePath;
        }

        public static function configure($basePath) {
            return new self($basePath);
        }

        public function make($class) {
            return new class($this) {
                protected $app;
                public function __construct($app) { $this->app = $app; }
                public function handle($request) {
                    return new class($this->app) {
                        protected $app;
                        public function __construct($app) { $this->app = $app; }
                        public function send() {
                            $this->app->run();
                        }
                    };
                }
            };
        }

        public function run() {
            $uri = trim(parse_url($_SERVER['REQUEST_URI'] ?? '/', PHP_URL_PATH), '/');
            $method = $_SERVER['REQUEST_METHOD'] ?? 'GET';
            
            // Load controller files dynamically
            $controllerDir = __DIR__ . '/../app/Http/Controllers';
            if (file_exists($controllerDir)) {
                $files = scandir($controllerDir);
                foreach ($files as $f) {
                    if (substr($f, -4) === '.php') {
                        require_once $controllerDir . '/' . $f;
                    }
                }
            }

            // Load routes
            $routesFile = __DIR__ . '/../routes/web.php';
            if (file_exists($routesFile)) {
                try {
                    require_once $routesFile;
                } catch (\\Throwable $e) {}
            }

            $action = \\Route::$routes[$method][$uri] ?? null;
            if (!$action && $uri === '') {
                $action = \\Route::$routes[$method]['/'] ?? null;
            }
            
            if ($action) {
                if (is_callable($action)) {
                    $request = new \\Illuminate\\Http\\Request();
                    echo $action($request);
                } else if (is_array($action)) {
                    $controllerClass = $action[0];
                    $methodName = $action[1];
                    
                    if (class_exists($controllerClass)) {
                        $controller = new $controllerClass();
                        $request = new \\Illuminate\\Http\\Request();
                        echo $controller->$methodName($request);
                    } else {
                        echo "Controller not found: " . $controllerClass;
                    }
                } else if (is_string($action)) {
                    echo $action;
                }
            } else {
                // Default landing view
                $viewFile = __DIR__ . '/../app/Views/home.blade.php';
                if (!file_exists($viewFile)) {
                    $viewFile = __DIR__ . '/../resources/views/home.blade.php';
                }
                if (!file_exists($viewFile)) {
                    $viewFile = __DIR__ . '/../index.html';
                }
                
                if (file_exists($viewFile)) {
                    echo file_get_contents($viewFile);
                } else {
                    header("HTTP/1.0 404 Not Found");
                    echo "Xeyal-System: 404 Page Not Found";
                }
            }
        }
    }
}
`;

    const mockAppBootstrap = `<?php
return new Illuminate\\Foundation\\Application();
`;

    fs.writeFileSync(path.join(vendorDir, 'autoload.php'), mockAutoload);
    fs.writeFileSync(path.join(bootstrapDir, 'app.php'), mockAppBootstrap);
    
    report += `- 🏛️ **Laravel Emülatör Core:** \`vendor/autoload.php\` ve \`bootstrap/app.php\` otonom kuruldu. Sıfır bağımlılık sağlandı.\\n`;
    changesMade++;

    // Inject autoload to public/index.php if missing
    if (fs.existsSync(path.join(publicDir, 'index.php'))) {
        const indexFile = path.join(publicDir, 'index.php');
        let indexContent = fs.readFileSync(indexFile, 'utf8');
        if (!indexContent.includes('vendor/autoload.php')) {
            console.log("💡 public/index.php içine vendor/autoload.php entegrasyonu ekleniyor...");
            indexContent = indexContent.replace(/^<\?php/, `<?php\nrequire_once __DIR__ . '/../vendor/autoload.php';`);
            fs.writeFileSync(indexFile, indexContent);
            report += `- 🔄 **index.php Bağlantısı:** \`public/index.php\` dosyasına otonom olarak autoloader eklendi.\\n`;
            changesMade++;
        }
    }
}

fs.writeFileSync(pkgPath, JSON.stringify(pkgJson, null, 2));
fs.writeFileSync(path.join(TARGET_DIR, 'XEYAL_HEALING_REPORT.md'), report);

console.log(`✅ CYBERNETIC HEALING v3.4 TAMAMLANDI. (${changesMade} düzeltme)\n`);
