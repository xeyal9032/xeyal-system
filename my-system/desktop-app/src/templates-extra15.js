/**
 * FORGE TEMPLATE REGISTRY — BATCH 15 (141-150)
 * AI Dataset, Training Viz, API Docs, DB Browser, Container, Serverless, Webhook, Git, Bundle, Error
 */
Object.assign(window.FORGE_TEMPLATES, {

// ============================================================
// 🤖 AI DATASET MANAGER
// ============================================================
ai_dataset: {
  keywords: ['ai', 'dataset', 'data', 'labeling', 'training', 'machine learning', 'veri seti', 'etiketleme', 'yapay zeka'],
  projectName: 'x-data',
  files: {
    'index.html': `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>X-Data</title><link rel="stylesheet" href="style.css"></head>
<body><div class="app"><aside><h2>X-Data</h2><div class="m">Images</div><div class="m">Text</div></aside>
<main><h1>Dataset: Face_V2</h1><div class="grid"><div class="i"><span>IMG_01.jpg</span><button>Label</button></div><div class="i"><span>IMG_02.jpg</span><button>Label</button></div></div></main></div></body></html>`,
    'style.css': `*{box-sizing:border-box;margin:0;padding:0}body{background:#0f172a;color:#f8fafc;font-family:'Inter',sans-serif}
.app{display:grid;grid-template-columns:200px 1fr;height:100vh}aside{background:#1e293b;padding:30px}.m{padding:10px;opacity:0.7}
main{padding:40px}.grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:20px}.i{background:#334155;padding:20px;border-radius:12px;text-align:center}
span{display:block;margin-bottom:10px;font-size:0.8rem}button{padding:5px 15px;background:#3b82f6;color:#fff;border:none;border-radius:4px;cursor:pointer}`
  }
},

// ============================================================
// 📊 AI MODEL TRAINING VIZ
// ============================================================
training_viz: {
  keywords: ['ai', 'training', 'model', 'visualizer', 'loss', 'accuracy', 'eğitim görselleştirme', 'grafik', 'yapay zeka'],
  projectName: 'x-train',
  files: {
    'index.html': `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>X-Train</title><link rel="stylesheet" href="style.css"></head>
<body><div class="app"><header><h1>Training: Epoch 42/100</h1></header>
<div class="stats"><div class="s">Loss<br><b>0.042</b></div><div class="s">Accuracy<br><b>98.2%</b></div></div>
<div class="chart">LIVE TRAINING CHART CANVAS</div></div></body></html>`,
    'style.css': `*{box-sizing:border-box;margin:0;padding:0}body{background:#000;color:#22c55e;font-family:monospace;padding:60px;display:flex;justify-content:center}
.app{width:500px}header{margin-bottom:40px;border-bottom:1px solid #22c55e;padding-bottom:10px}.stats{display:flex;gap:20px;margin-bottom:40px}
.s{flex:1;background:#111;padding:20px;border:1px solid #22c55e;border-radius:8px}.chart{height:200px;background:#111;border:1px solid #22c55e;display:flex;align-items:center;justify-content:center}`
  }
},

// ============================================================
// 📑 API DOCUMENTATION PORTAL
// ============================================================
api_docs: {
  keywords: ['api', 'docs', 'swagger', 'postman', 'endpoint', 'dökümantasyon', 'geliştirici', 'arayüz'],
  projectName: 'x-api-docs',
  files: {
    'index.html': `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>API Docs</title><link rel="stylesheet" href="style.css"></head>
<body><div class="app"><aside><h2>Endpoints</h2><div class="e get">GET /users</div><div class="e post">POST /auth</div></aside>
<main><h1>GET /users</h1><p>Retrieve all system users.</p><div class="req">curl -X GET "https://api.x.com/users"</div></main></div></body></html>`,
    'style.css': `*{box-sizing:border-box;margin:0;padding:0}body{background:#fff;color:#0f172a;font-family:'Inter',sans-serif}
.app{display:grid;grid-template-columns:250px 1fr;height:100vh}aside{background:#f8fafc;padding:30px;border-right:1px solid #e2e8f0}.e{padding:10px;font-size:0.85rem;font-weight:700;margin-bottom:5px}
.get{color:#22c55e}.post{color:#3b82f6}main{padding:40px}.req{background:#0f172a;color:#fff;padding:20px;border-radius:8px;font-family:monospace;margin-top:20px}`
  }
},

// ============================================================
// 📁 DATABASE BROWSER (MOCK)
// ============================================================
db_browser: {
  keywords: ['database', 'sql', 'nosql', 'tables', 'explorer', 'veritabanı', 'tablolar', 'sorgu'],
  projectName: 'x-db-view',
  files: {
    'index.html': `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>DB View</title><link rel="stylesheet" href="style.css"></head>
<body><div class="app"><nav>Tables: [users], [posts], [orders]</nav>
<table><tr><th>id</th><th>email</th><th>status</th></tr><tr><td>1</td><td>x@y.com</td><td>active</td></tr></table></div></body></html>`,
    'style.css': `*{box-sizing:border-box;margin:0;padding:0}body{background:#f1f5f9;color:#334155;font-family:monospace;padding:40px}
nav{margin-bottom:30px;font-weight:700}table{width:100%;border-collapse:collapse;background:#fff;border-radius:8px;overflow:hidden}
th,td{padding:15px;text-align:left;border-bottom:1px solid #e2e8f0}th{background:#f8fafc}`
  }
},

// ============================================================
// 🐳 CONTAINER MONITOR
// ============================================================
container_mon: {
  keywords: ['docker', 'kubernetes', 'containers', 'devops', 'monitor', 'konteyner', 'sistem izleme', 'cpu', 'ram'],
  projectName: 'x-containers',
  files: {
    'index.html': `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>X-Containers</title><link rel="stylesheet" href="style.css"></head>
<body><div class="app"><h1>Active Containers</h1><div class="grid">
<div class="c"><span>api_gateway</span><b>RUNNING</b><p>CPU: 12% | RAM: 450MB</p></div>
<div class="c"><span>redis_cache</span><b>RUNNING</b><p>CPU: 2% | RAM: 120MB</p></div></div></div></body></html>`,
    'style.css': `*{box-sizing:border-box;margin:0;padding:0}body{background:#000;color:#fff;font-family:'Inter',sans-serif;padding:60px;display:flex;justify-content:center}
.app{width:100%;max-width:500px}.grid{display:flex;flex-direction:column;gap:15px}.c{background:#111;padding:25px;border-radius:12px;border:1px solid #333}
span{color:#3b82f6;font-weight:900}b{float:right;color:#22c55e;font-size:0.7rem}p{margin-top:10px;font-size:0.8rem;opacity:0.5}`
  }
},

// ============================================================
// ☁️ SERVERLESS LOG VIEW
// ============================================================
serverless_logs: {
  keywords: ['serverless', 'lambda', 'cloud', 'logs', 'functions', 'bulut', 'loglar', 'fonksiyonlar', 'hata'],
  projectName: 'x-cloud-logs',
  files: {
    'index.html': `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>CloudLogs</title><link rel="stylesheet" href="style.css"></head>
<body><div class="app"><header>Live Logs: Function_X</header><div class="logs">
<div class="l">[INFO] Execution started.</div><div class="l error">[ERROR] Timeout after 30s.</div><div class="l">[INFO] Retrying...</div></div></div></body></html>`,
    'style.css': `*{box-sizing:border-box;margin:0;padding:0}body{background:#1e293b;color:#cbd5e1;font-family:monospace;padding:40px;display:flex;justify-content:center}
.app{width:100%;max-width:600px}header{background:#0f172a;padding:15px;border-radius:8px 8px 0 0;font-weight:700;color:#fff}
.logs{background:#000;padding:20px;height:400px;overflow:auto;border-radius:0 0 8px 8px}.l{margin-bottom:10px}.l.error{color:#ef4444}`
  }
},

// ============================================================
// 🔗 WEBHOOK TESTER
// ============================================================
webhook_tester: {
  keywords: ['webhook', 'tester', 'api', 'http', 'payload', 'callback', 'test aracı', 'dinleyici'],
  projectName: 'x-hook',
  files: {
    'index.html': `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>X-Hook</title><link rel="stylesheet" href="style.css"></head>
<body><div class="app"><h1>Webhook Listener</h1><div class="url">URL: https://x-hook.io/782-abc</div>
<div class="requests"><h3>Latest Payloads</h3><div class="p"><span>POST</span> { "event": "user.created", "id": 102 }</div></div></div></body></html>`,
    'style.css': `*{box-sizing:border-box;margin:0;padding:0}body{background:#f8fafc;color:#0f172a;font-family:monospace;padding:60px;display:flex;justify-content:center}
.app{width:100%;max-width:500px}.url{background:#fff;padding:20px;border-radius:8px;border:1px solid #e2e8f0;margin-bottom:40px;color:#3b82f6}
.p{background:#1e293b;color:#f8fafc;padding:20px;border-radius:8px;margin-bottom:10px}span{color:#fbbf24;font-weight:700;margin-right:10px}`
  }
},

// ============================================================
// 🌿 GIT GRAPH VISUALIZER
// ============================================================
git_graph_viz: {
  keywords: ['git', 'graph', 'branch', 'commit', 'version control', 'versiyon kontrol', 'dallanma', 'görselleştirme'],
  projectName: 'x-git',
  files: {
    'index.html': `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>X-Git</title><link rel="stylesheet" href="style.css"></head>
<body><div class="app"><h1>Branch: main</h1><div class="graph">
<div class="node">Merge branch 'feat/150'<span>4m ago</span></div><div class="node child">Add extra-15 templates<span>10m ago</span></div></div></div></body></html>`,
    'style.css': `*{box-sizing:border-box;margin:0;padding:0}body{background:#0d1117;color:#c9d1d9;font-family:'Inter',sans-serif;padding:60px;display:flex;justify-content:center}
.app{width:400px}.graph{border-left:2px solid #30363d;padding-left:30px;position:relative}.node{margin-bottom:30px;position:relative}
.node::before{content:'';position:absolute;left:-37px;top:5px;width:12px;height:12px;background:#238636;border-radius:50%;border:2px solid #0d1117}
.node.child::before{background:#1f6feb}span{display:block;font-size:0.75rem;opacity:0.5}`
  }
},

// ============================================================
// 📦 BUNDLE SIZE ANALYZER
// ============================================================
bundle_analyzer: {
  keywords: ['bundle', 'analyzer', 'webpack', 'size', 'optimization', 'paket boyutu', 'optimizasyon', 'analiz'],
  projectName: 'x-bundle',
  files: {
    'index.html': `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>Bundle Analyzer</title><link rel="stylesheet" href="style.css"></head>
<body><div class="app"><h1>Bundle Breakdown</h1><div class="treemap">
<div class="chunk" style="width:60%;background:#3b82f6">react-dom (120kb)</div>
<div class="chunk" style="width:30%;background:#ef4444">lodash (65kb)</div></div></div></body></html>`,
    'style.css': `*{box-sizing:border-box;margin:0;padding:0}body{background:#fff;color:#0f172a;font-family:'Inter',sans-serif;padding:60px;display:flex;justify-content:center}
.app{width:500px}.treemap{height:300px;display:flex;gap:5px;margin-top:40px}.chunk{display:flex;align-items:center;justify-content:center;color:#fff;font-size:0.7rem;font-weight:700;padding:20px;text-align:center}`
  }
},

// ============================================================
// 🛑 ERROR TRACKING DASHBOARD
// ============================================================
error_tracker: {
  keywords: ['error', 'tracking', 'sentry', 'logs', 'debugging', 'hata takibi', 'debug', 'loglar'],
  projectName: 'x-errors',
  files: {
    'index.html': `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>X-Errors</title><link rel="stylesheet" href="style.css"></head>
<body><div class="app"><h1>Project: My-System</h1><div class="list">
<div class="err"><h3>TypeError: Cannot read property 'map'</h3><p>main.js:452 | 12 events | 1h ago</p></div>
<div class="err"><h3>500 Internal Server Error</h3><p>api/v1/forge | 2 events | 5m ago</p></div></div></div></body></html>`,
    'style.css': `*{box-sizing:border-box;margin:0;padding:0}body{background:#f8fafc;color:#1e293b;font-family:'Inter',sans-serif;padding:60px;display:flex;justify-content:center}
.app{width:100%;max-width:600px}.err{background:#fff;padding:25px;border-radius:12px;border:1px solid #e2e8f0;margin-bottom:15px;border-left:5px solid #ef4444}
h3{font-size:1rem;color:#ef4444}p{font-size:0.85rem;opacity:0.6;margin-top:10px}`
  }
}

});
