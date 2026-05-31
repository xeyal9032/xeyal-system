/**
 * FORGE TEMPLATE REGISTRY — BATCH 12 (111-120)
 * Radio, Lighting, Broadcast, Satellite, Smart Mirror, Drone, Greenhouse, Signage, Studio, Museum
 */
Object.assign(window.FORGE_TEMPLATES, {

// ============================================================
// 🎙️ RADIO STATION DASHBOARD
// ============================================================
radio_station: {
  keywords: ['radio', 'station', 'broadcast', 'audio', 'mic', 'radyo', 'yayın', 'ses', 'mikrofon'],
  projectName: 'x-radio',
  files: {
    'index.html': `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>X-Radio</title><link rel="stylesheet" href="style.css"></head>
<body><div class="app"><header><span>LIVE ON AIR</span><h1>X-Radio FM</h1></header>
<div class="player"><div class="art"></div><div class="track"><h4>Midnight Jazz</h4><p>Artist: Jazz Master</p></div></div>
<div class="mics"><div class="m active">Mic 1</div><div class="m">Mic 2</div></div></div></body></html>`,
    'style.css': `*{box-sizing:border-box;margin:0;padding:0}body{background:#000;color:#fff;font-family:'Inter',sans-serif;padding:60px;display:flex;justify-content:center}
.app{width:360px}header{text-align:center;margin-bottom:50px}header span{color:#ef4444;font-weight:900;font-size:0.8rem;border:2px solid #ef4444;padding:4px 12px;border-radius:4px}
.player{background:#111;padding:30px;border-radius:24px;display:flex;gap:20px;align-items:center;margin-bottom:30px}.art{width:80px;height:80px;background:#333;border-radius:12px}
.mics{display:flex;gap:15px}.m{flex:1;padding:15px;background:#222;text-align:center;border-radius:12px;cursor:pointer}.m.active{background:#ef4444;color:#fff}`
  }
},

// ============================================================
// 💡 LIGHTING CONTROL (DMX)
// ============================================================
lighting_dmx: {
  keywords: ['lighting', 'dmx', 'stage', 'lights', 'color', 'ışık kontrolü', 'sahne', 'dmx kontrol', 'renk'],
  projectName: 'lux-control',
  files: {
    'index.html': `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>LuxControl</title><link rel="stylesheet" href="style.css"></head>
<body><div class="app"><h2>Stage Lights</h2><div class="sliders"><div class="s"><span>R</span><div class="bar"><div style="height:80%"></div></div></div>
<div class="s"><span>G</span><div class="bar"><div style="height:30%"></div></div></div><div class="s"><span>B</span><div class="bar"><div style="height:90%"></div></div></div></div>
<div class="scenes"><button>Sunset</button><button>Party</button><button>Chill</button></div></div></body></html>`,
    'style.css': `*{box-sizing:border-box;margin:0;padding:0}body{background:#1a1a1a;color:#fff;font-family:monospace;padding:60px;display:flex;justify-content:center}
.app{width:400px;text-align:center}.sliders{display:flex;justify-content:center;gap:30px;margin:50px 0}.s span{display:block;margin-bottom:10px}
.bar{width:30px;height:200px;background:#333;border-radius:15px;position:relative;overflow:hidden}.bar div{position:absolute;bottom:0;width:100%;background:#fff}
.scenes{display:grid;grid-template-columns:1fr 1fr 1fr;gap:10px}button{padding:10px;background:#333;color:#fff;border:none;border-radius:4px;cursor:pointer}`
  }
},

// ============================================================
// 📹 BROADCAST CAMERA HUB
// ============================================================
broadcast_hub: {
  keywords: ['broadcast', 'camera', 'video', 'director', 'live', 'yayın', 'kamera', 'reji', 'canlı yayın'],
  projectName: 'xeyal-reji',
  files: {
    'index.html': `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>Broadcast</title><link rel="stylesheet" href="style.css"></head>
<body><div class="app"><div class="grid"><div class="v active">CAM 1 - MAIN</div><div class="v">CAM 2 - SIDE</div><div class="v">CAM 3 - CROWD</div><div class="v">PREVIEW</div></div>
<div class="controls"><button class="rec">REC</button><button>SWITCH</button></div></div></body></html>`,
    'style.css': `*{box-sizing:border-box;margin:0;padding:0}body{background:#000;color:#fff;font-family:sans-serif;padding:10px}
.grid{display:grid;grid-template-columns:1fr 1fr;grid-template-rows:1fr 1fr;height:calc(100vh - 100px);gap:5px}
.v{background:#111;border:1px solid #333;display:flex;align-items:center;justify-content:center;font-size:0.8rem}.v.active{border-color:#ef4444}
.controls{height:80px;display:flex;justify-content:center;align-items:center;gap:20px}.rec{color:#ef4444;font-weight:900}button{background:#222;color:#fff;border:none;padding:10px 30px;border-radius:4px;cursor:pointer}`
  }
},

// ============================================================
// 📡 SATELLITE SIGNAL TRACKER
// ============================================================
satellite_tracker: {
  keywords: ['satellite', 'tracker', 'signal', 'space', 'orbit', 'uydu', 'takip', 'uzay', 'yörünge'],
  projectName: 'orbit-link',
  files: {
    'index.html': `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>OrbitLink</title><link rel="stylesheet" href="style.css"></head>
<body><div class="app"><h1>Satellite Tracker</h1><div class="stats"><div class="s">Signal Strength<br><b>84%</b></div><div class="s">Uptime<br><b>99.9%</b></div></div>
<div class="map">ORBITAL POSITION VISUALIZER</div><p>Current: SAT-X102 | LAT: 42.5 | LNG: -12.4</p></div></body></html>`,
    'style.css': `*{box-sizing:border-box;margin:0;padding:0}body{background:#020617;color:#38bdf8;font-family:'Inter',sans-serif;padding:60px;display:flex;justify-content:center}
.app{width:100%;max-width:500px;text-align:center}h1{margin-bottom:40px}.stats{display:flex;gap:20px;margin-bottom:40px}.s{flex:1;background:#0f172a;padding:20px;border-radius:12px;border:1px solid #1e293b}
.map{height:200px;background:#000;border:1px solid #1e293b;border-radius:12px;margin-bottom:20px;display:flex;align-items:center;justify-content:center;color:#1e293b}p{font-size:0.8rem;opacity:0.6}`
  }
},

// ============================================================
// 🪞 SMART MIRROR INTERFACE
// ============================================================
smart_mirror: {
  keywords: ['smart mirror', 'ui', 'minimalist', 'clock', 'home', 'akıllı ayna', 'arayüz', 'ev', 'minimal'],
  projectName: 'zen-mirror',
  files: {
    'index.html': `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>ZenMirror</title><link rel="stylesheet" href="style.css"></head>
<body><div class="mirror"><div class="time">07:45</div><div class="date">Friday, April 24</div>
<div class="weather">🌦️ 18°C<br>Scattered Clouds</div><div class="news">Breaking: Xeyal-System reaches 120 templates.</div></div></body></html>`,
    'style.css': `*{box-sizing:border-box;margin:0;padding:0}body{background:#000;color:#fff;font-family:'Inter',sans-serif;height:100vh;overflow:hidden;padding:100px}
.mirror{display:flex;flex-direction:column;height:100%}.time{font-size:8rem;font-weight:100;letter-spacing:-5px}.date{font-size:1.5rem;opacity:0.6;margin-top:-20px}
.weather{margin-top:auto;font-size:1.5rem}.news{margin-top:40px;padding:20px;border-left:1px solid #fff;font-size:1rem;opacity:0.8;max-width:400px}`
  }
},

// ============================================================
// 📦 DRONE DELIVERY MONITOR
// ============================================================
drone_delivery: {
  keywords: ['drone', 'delivery', 'logistics', 'tracking', 'cargo', 'insansız hava aracı', 'teslimat', 'lojistik', 'takip'],
  projectName: 'sky-cargo',
  files: {
    'index.html': `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>SkyCargo</title><link rel="stylesheet" href="style.css"></head>
<body><div class="app"><header><h2>SkyCargo Logistics</h2></header><div class="main">
<div class="drone-status"><h3>Drone #A12</h3><div class="stat">Battery: 78%</div><div class="stat">Alt: 45m</div><div class="stat">Status: In Route</div></div>
<div class="map">DRONE PATH CANVAS</div></div></div></body></html>`,
    'style.css': `*{box-sizing:border-box;margin:0;padding:0}body{background:#f8fafc;color:#0f172a;font-family:'Inter',sans-serif;padding:60px;display:flex;justify-content:center}
.app{width:100%;max-width:600px}header{margin-bottom:40px;border-bottom:1px solid #e2e8f0;padding-bottom:20px}.main{display:grid;grid-template-columns:200px 1fr;gap:30px}
.drone-status{background:#fff;padding:20px;border-radius:12px;border:1px solid #e2e8f0}.stat{font-size:0.85rem;opacity:0.7;margin-top:10px}
.map{height:300px;background:#e2e8f0;border-radius:24px;display:flex;align-items:center;justify-content:center;color:#64748b}`
  }
},

// ============================================================
// 🌿 SMART GREENHOUSE CONTROL
// ============================================================
greenhouse_ctrl: {
  keywords: ['greenhouse', 'smart agriculture', 'plants', 'sensors', 'automation', 'sera', 'akıllı tarım', 'bitki', 'otomasyon'],
  projectName: 'eco-grow',
  files: {
    'index.html': `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>EcoGrow</title><link rel="stylesheet" href="style.css"></head>
<body><div class="app"><header><h1>EcoGrow Sera</h1></header>
<div class="grid"><div class="v">🌡️ 24°C<br><span>Temp</span></div><div class="v">💧 65%<br><span>Humidity</span></div>
<div class="v">☀️ 800lx<br><span>Light</span></div><div class="v">🚰 Auto<br><span>Watering</span></div></div></div></body></html>`,
    'style.css': `*{box-sizing:border-box;margin:0;padding:0}body{background:#f7fee7;color:#365314;font-family:'Inter',sans-serif;padding:60px;display:flex;justify-content:center}
.app{width:100%;max-width:400px}header{margin-bottom:40px;text-align:center}.grid{display:grid;grid-template-columns:1fr 1fr;gap:20px}
.v{background:#fff;padding:25px;border-radius:24px;border:1px solid #d9f99d;font-weight:700}span{display:block;opacity:0.6;font-size:0.8rem;margin-top:5px}`
  }
},

// ============================================================
// 📺 DIGITAL SIGNAGE MANAGER
// ============================================================
signage_mgr: {
  keywords: ['digital signage', 'advertising', 'screens', 'content management', 'reklam ekranı', 'içerik yönetimi', 'ekranlar'],
  projectName: 'x-sign',
  files: {
    'index.html': `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>X-Sign</title><link rel="stylesheet" href="style.css"></head>
<body><div class="app"><aside><h2>X-Sign</h2><div class="m">Screens</div><div class="m">Playlists</div></aside>
<main><h1>Active Screens</h1><div class="screen"><span>Main Lobby</span><b>Playing: Promo_v1</b></div><div class="screen"><span>Elevator A</span><b>Status: Offline</b></div></main></div></body></html>`,
    'style.css': `*{box-sizing:border-box;margin:0;padding:0}body{background:#f1f5f9;color:#0f172a;font-family:'Inter',sans-serif}
.app{display:grid;grid-template-columns:200px 1fr;height:100vh}aside{background:#0f172a;color:#fff;padding:30px}.m{padding:10px;opacity:0.7}
main{padding:40px}.screen{background:#fff;padding:20px;border-radius:12px;border:1px solid #e2e8f0;margin-bottom:15px}span{display:block;font-size:0.8rem;opacity:0.6}`
  }
},

// ============================================================
// 🎛️ RECORDING STUDIO CONSOLE
// ============================================================
studio_console: {
  keywords: ['studio', 'recording', 'audio', 'mixer', 'console', 'stüdyo', 'kayıt', 'ses mikseri', 'konsol'],
  projectName: 'wave-studio',
  files: {
    'index.html': `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>WaveStudio</title><link rel="stylesheet" href="style.css"></head>
<body><div class="app"><div class="mixer"><div class="ch"><span>CH 1</span><div class="fader"></div></div><div class="ch"><span>CH 2</span><div class="fader"></div></div>
<div class="ch"><span>MASTER</span><div class="fader master"></div></div></div></div></body></html>`,
    'style.css': `*{box-sizing:border-box;margin:0;padding:0}body{background:#111;color:#fff;font-family:monospace;padding:60px;display:flex;justify-content:center}
.mixer{display:flex;gap:30px;background:#222;padding:40px;border-radius:24px;border:1px solid #333}.ch{text-align:center}
.fader{width:10px;height:150px;background:#000;margin:15px auto;position:relative;border-radius:5px}.fader::after{content:'';position:absolute;top:50%;left:-10px;width:30px;height:10px;background:#888;border-radius:2px}
.master::after{background:#ef4444}`
  }
},

// ============================================================
// 🏛️ INTERACTIVE MUSEUM GUIDE
// ============================================================
museum_guide: {
  keywords: ['museum', 'guide', 'interactive', 'exhibition', 'qr', 'müze', 'rehber', 'sergi', 'interaktif'],
  projectName: 'history-go',
  files: {
    'index.html': `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>MuseumGo</title><link rel="stylesheet" href="style.css"></head>
<body><div class="app"><header>MuseumGo</header><div class="scan">SCAN QR CODE</div><div class="info">
<h1>The Great Sphinx</h1><p>Ancient Egyptian limestone statue of a reclining sphinx...</p><button>Audio Guide</button></div></div></body></html>`,
    'style.css': `*{box-sizing:border-box;margin:0;padding:0}body{background:#fdfcfb;color:#431407;font-family:'Inter',sans-serif;padding:40px;display:flex;justify-content:center}
.app{width:100%;max-width:360px}header{font-weight:900;text-align:center;margin-bottom:40px}.scan{height:150px;background:#fff;border:2px dashed #d6d3d1;display:flex;align-items:center;justify-content:center;margin-bottom:40px}
h1{font-size:1.5rem;margin-bottom:15px}p{line-height:1.6;opacity:0.8}button{width:100%;margin-top:30px;padding:15px;background:#431407;color:#fff;border:none;border-radius:50px;cursor:pointer}`
  }
}

});
