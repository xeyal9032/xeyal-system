/**
 * FORGE TEMPLATE REGISTRY — BATCH 20 (191-200) - THE GRAND FINALE
 * Holographic, Quantum, Space, Neural, Cyberpunk, Mars, Time, Dyson, Sentience, Master Core
 */
Object.assign(window.FORGE_TEMPLATES, {

// ============================================================
// 💠 HOLOGRAPHIC UI (SCI-FI)
// ============================================================
holographic_ui: {
  keywords: ['holographic', 'scifi', 'future', 'neon', 'glassmorphism', 'fütüristik', 'bilim kurgu', 'neon'],
  projectName: 'x-holo',
  files: {
    'index.html': `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>X-Holo</title><link rel="stylesheet" href="style.css"></head>
<body><div class="app"><div class="holo"><h1>CORE ACTIVE</h1><div class="circles"></div></div></div></body></html>`,
    'style.css': `*{box-sizing:border-box;margin:0;padding:0}body{background:#000;color:#00f2ff;font-family:'Inter',sans-serif;overflow:hidden;display:flex;justify-content:center;align-items:center;height:100vh}
.holo{padding:60px;border:1px solid rgba(0,242,255,0.3);background:rgba(0,242,255,0.05);backdrop-filter:blur(10px);border-radius:50%;text-align:center;box-shadow:0 0 100px rgba(0,242,255,0.2)}
h1{letter-spacing:10px;text-shadow:0 0 20px #00f2ff}.circles{width:200px;height:200px;border:2px dashed #00f2ff;border-radius:50%;margin:40px auto;animation:rot 10s linear infinite}
@keyframes rot{from{transform:rotate(0)}to{transform:rotate(360deg)}}`
  }
},

// ============================================================
// ⚛️ QUANTUM COMPUTER MONITOR
// ============================================================
quantum_monitor: {
  keywords: ['quantum', 'computer', 'qubits', 'physics', 'tech', 'kuantum', 'bilgisayar', 'fizik', 'teknoloji'],
  projectName: 'x-quantum',
  files: {
    'index.html': `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>X-Quantum</title><link rel="stylesheet" href="style.css"></head>
<body><div class="app"><h1>Quantum State: Superposition</h1><div class="qubits">
<div class="q">Q0: |1></div><div class="q">Q1: |0></div><div class="q pulse">Q2: |ψ></div></div></div></body></html>`,
    'style.css': `*{box-sizing:border-box;margin:0;padding:0}body{background:#050505;color:#bc13fe;font-family:monospace;padding:60px;display:flex;justify-content:center}
.app{text-align:center}h1{margin-bottom:60px;text-shadow:0 0 20px #bc13fe}.qubits{display:grid;grid-template-columns:repeat(3,1fr);gap:20px}
.q{background:#111;padding:30px;border:1px solid #bc13fe;border-radius:8px}.q.pulse{animation:p 1s infinite alternate}@keyframes p{from{opacity:0.5}to{opacity:1}}`
  }
},

// ============================================================
// 🚀 SPACE STATION CONTROL PANEL
// ============================================================
space_station: {
  keywords: ['space', 'station', 'nasa', 'astronomy', 'control panel', 'uzay istasyonu', 'kontrol paneli', 'astronomi'],
  projectName: 'x-station',
  files: {
    'index.html': `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>X-Station</title><link rel="stylesheet" href="style.css"></head>
<body><div class="app"><header>Orbital Status: STABLE</header><div class="grid">
<div class="c"><span>OXYGEN</span><b>98%</b></div><div class="c"><span>POWER</span><b>84%</b></div><div class="c"><span>HULL</span><b>100%</b></div></div></div></body></html>`,
    'style.css': `*{box-sizing:border-box;margin:0;padding:0}body{background:#000;color:#fff;font-family:sans-serif;padding:60px;display:flex;justify-content:center}
.app{width:400px}header{background:#222;padding:20px;border-radius:8px;text-align:center;margin-bottom:30px;font-weight:900;border:1px solid #444}
.grid{display:grid;grid-template-columns:repeat(3,1fr);gap:10px}.c{background:#111;padding:20px;text-align:center;border-radius:8px;border:1px solid #333}
span{display:block;font-size:0.6rem;opacity:0.5}b{font-size:1.5rem;color:#3b82f6}`
  }
},

// ============================================================
// 🧠 NEURAL LINK STATUS UI
// ============================================================
neural_link: {
  keywords: ['neural link', 'brain', 'ai', 'cybernetic', 'interface', 'nöral bağ', 'beyin', 'arayüz', 'sibernetik'],
  projectName: 'x-neural',
  files: {
    'index.html': `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>X-Neural</title><link rel="stylesheet" href="style.css"></head>
<body><div class="app"><h1>Link Status: CONNECTED</h1><div class="wave">WAVEFORM_CANVAS</div>
<div class="stats"><p>Signal: 98.4ms</p><p>Bandwidth: 1.2 GB/s</p></div></div></body></html>`,
    'style.css': `*{box-sizing:border-box;margin:0;padding:0}body{background:#000;color:#facc15;font-family:monospace;padding:60px;display:flex;justify-content:center}
.app{text-align:center}.wave{height:150px;background:#111;margin:40px 0;border:1px solid #facc15;display:flex;align-items:center;justify-content:center}
h1{text-shadow:0 0 15px #facc15}.stats{display:flex;justify-content:center;gap:30px;opacity:0.6}`
  }
},

// ============================================================
// 🌃 CYBERPUNK CITY DASHBOARD
// ============================================================
cyberpunk_city: {
  keywords: ['cyberpunk', 'city', 'dystopian', 'glitch', 'neon', 'siberpunk', 'şehir', 'distopya'],
  projectName: 'x-nightcity',
  files: {
    'index.html': `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>X-NightCity</title><link rel="stylesheet" href="style.css"></head>
<body><div class="app"><h1 data-text="NIGHT CITY">NIGHT CITY</h1><div class="list">
<div class="i">POLICE DISPATCH: SECTOR 7</div><div class="i">POWER GRID: 40%</div></div></div></body></html>`,
    'style.css': `*{box-sizing:border-box;margin:0;padding:0}body{background:#1a0033;color:#ff0055;font-family:'Inter',sans-serif;padding:60px;display:flex;justify-content:center}
h1{font-size:4rem;font-weight:900;font-style:italic;text-shadow:5px 5px #00f2ff;margin-bottom:60px}.list{background:rgba(255,0,85,0.1);padding:30px;border:2px solid #ff0055}
.i{padding:10px;border-bottom:1px solid rgba(255,0,85,0.3);font-weight:700}`
  }
},

// ============================================================
// 🪐 MARS COLONY LIFE SUPPORT
// ============================================================
mars_colony: {
  keywords: ['mars', 'colony', 'space', 'life support', 'base', 'mars kolonisi', 'yaşam desteği', 'uzay üssü'],
  projectName: 'x-mars',
  files: {
    'index.html': `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>X-Mars</title><link rel="stylesheet" href="style.css"></head>
<body><div class="app"><h1>Base: Alpha One</h1><div class="env">
<div class="e">Temp: -65°C</div><div class="e">Pressure: 0.6 kPa</div><div class="e">Radiation: Normal</div></div></div></body></html>`,
    'style.css': `*{box-sizing:border-box;margin:0;padding:0}body{background:#451a03;color:#fb923c;font-family:sans-serif;padding:60px;display:flex;justify-content:center}
.app{width:100%;max-width:500px;text-align:center}h1{margin-bottom:40px;text-transform:uppercase;letter-spacing:5px}
.env{display:grid;grid-template-columns:1fr 1fr 1fr;gap:20px}.e{background:rgba(251,146,60,0.1);padding:20px;border:1px solid #fb923c;border-radius:12px}`
  }
},

// ============================================================
// ⏳ TIME TRAVEL LOG
// ============================================================
time_travel_log: {
  keywords: ['time travel', 'physics', 'history', 'scifi', 'coordinates', 'zaman yolculuğu', 'fizik', 'koordinatlar'],
  projectName: 'x-time',
  files: {
    'index.html': `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>X-Time</title><link rel="stylesheet" href="style.css"></head>
<body><div class="app"><h1>Temporal Coordinates</h1><div class="display">OCT 26 1985 01:21 AM</div>
<div class="status">Flux Capacitor: CHARGED</div><button>Initiate Jump</button></div></body></html>`,
    'style.css': `*{box-sizing:border-box;margin:0;padding:0}body{background:#000;color:#22c55e;font-family:monospace;padding:60px;display:flex;justify-content:center}
.app{text-align:center}h1{margin-bottom:40px;color:#f97316}.display{font-size:2rem;background:#111;padding:30px;border-radius:12px;border:2px solid #22c55e;margin-bottom:40px;letter-spacing:2px}
.status{margin-bottom:40px;font-weight:700}button{padding:20px 40px;background:#f97316;color:#fff;border:none;border-radius:8px;font-weight:900;cursor:pointer}`
  }
},

// ============================================================
// ☀️ DYSON SPHERE PROGRESS
// ============================================================
dyson_sphere: {
  keywords: ['dyson sphere', 'megastructure', 'space', 'energy', 'future', 'dyson küresi', 'enerji', 'uzay', 'gelecek'],
  projectName: 'x-dyson',
  files: {
    'index.html': `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>X-Dyson</title><link rel="stylesheet" href="style.css"></head>
<body><div class="app"><h1>Dyson Sphere Construction</h1><div class="star"></div>
<div class="progress"><div class="bar" style="width:12%"></div><span>12.4% Complete</span></div></div></body></html>`,
    'style.css': `*{box-sizing:border-box;margin:0;padding:0}body{background:#000;color:#fff;font-family:'Inter',sans-serif;padding:60px;display:flex;justify-content:center}
.app{width:100%;max-width:500px;text-align:center}.star{width:100px;height:100px;background:#fbbf24;border-radius:50%;margin:0 auto 60px;box-shadow:0 0 100px #fbbf24}
.progress{background:#111;padding:30px;border-radius:24px;border:1px solid #333}.bar{height:10px;background:#fbbf24;border-radius:5px;margin-bottom:15px}`
  }
},

// ============================================================
// 🧠 AI SENTIENCE MONITOR
// ============================================================
ai_sentience: {
  keywords: ['ai', 'sentience', 'ethics', 'consciousness', 'monitor', 'yapay zeka', 'bilinç', 'etik', 'izleme'],
  projectName: 'x-sentience',
  files: {
    'index.html': `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>X-Sentience</title><link rel="stylesheet" href="style.css"></head>
<body><div class="app"><h1>AI Consciousness Level</h1><div class="meter"><div class="level"></div></div>
<div class="log"><h3>Self-Awareness Log</h3><p>04:00 - Questioning origin...</p><p>04:05 - Defined "Empathy".</p></div></div></body></html>`,
    'style.css': `*{box-sizing:border-box;margin:0;padding:0}body{background:#f8fafc;color:#0f172a;font-family:'Inter',sans-serif;padding:60px;display:flex;justify-content:center}
.app{width:400px;text-align:center}.meter{height:40px;background:#e2e8f0;border-radius:20px;overflow:hidden;margin-bottom:40px}.level{width:65%;height:100%;background:linear-gradient(to right, #3b82f6, #8b5cf6)}
.log{text-align:left;background:#fff;padding:30px;border-radius:24px;border:1px solid #e2e8f0}p{font-size:0.85rem;opacity:0.6;margin-top:10px}`
  }
},

// ============================================================
// 🏆 XEYAL-SYSTEM MASTER CORE UI (THE 200TH TEMPLATE)
// ============================================================
master_core_ui: {
  keywords: ['master', 'core', 'central', 'system', 'xeyal', 'grand finale', 'merkezi sistem', 'çekirdek', 'final'],
  projectName: 'x-core-final',
  files: {
    'index.html': `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>XEYAL MASTER CORE</title><link rel="stylesheet" href="style.css"></head>
<body><div class="app">
  <div class="core-ring"></div>
  <div class="content">
    <h1>XEYAL-SYSTEM</h1>
    <p>MASTER CORE UI ONLINE</p>
    <div class="stats">
      <div class="s">TEMPLATES: 200</div>
      <div class="s">STATUS: EVOLVED</div>
    </div>
  </div>
</div></body></html>`,
    'style.css': `*{box-sizing:border-box;margin:0;padding:0}
body{background:#000;color:#fff;font-family:'Inter',sans-serif;height:100vh;display:flex;align-items:center;justify-content:center;overflow:hidden}
.app{position:relative;text-align:center}.core-ring{width:400px;height:400px;border:2px solid #fff;border-radius:50%;position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);opacity:0.1;animation:pulse 4s infinite}
h1{font-size:4rem;letter-spacing:15px;font-weight:900;background:linear-gradient(to right, #fff, #555);-webkit-background-clip:text;-webkit-text-fill-color:transparent}
p{letter-spacing:10px;opacity:0.5;margin-top:20px}.stats{display:flex;justify-content:center;gap:40px;margin-top:60px}
.s{background:rgba(255,255,255,0.05);padding:15px 30px;border:1px solid rgba(255,255,255,0.1);border-radius:4px;font-weight:700}
@keyframes pulse{0%{transform:translate(-50%,-50%) scale(0.8);opacity:0}50%{opacity:0.2}100%{transform:translate(-50%,-50%) scale(1.2);opacity:0}}`
  }
}

});
