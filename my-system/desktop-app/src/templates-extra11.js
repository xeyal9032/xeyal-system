/**
 * FORGE TEMPLATE REGISTRY — BATCH 11 (101-110)
 * Solar, Wind, Factory, Lawyer, Tax, Visa, environment, Power Grid, Marine, Mining
 */
Object.assign(window.FORGE_TEMPLATES, {

// ============================================================
// ☀️ SOLAR ENERGY DASHBOARD
// ============================================================
solar_energy: {
  keywords: ['solar', 'energy', 'sun', 'power', 'renewable', 'güneş enerjisi', 'panel', 'yenilenebilir enerji'],
  projectName: 'sun-grid',
  files: {
    'index.html': `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>SunGrid</title><link rel="stylesheet" href="style.css"></head>
<body><div class="app"><header><h1>SunGrid Dashboard</h1><span>Live Output: 4.2 kW</span></header>
<div class="stats"><div class="s">Total Generated<br><b>124 kWh</b></div><div class="s">Battery Level<br><b>85%</b></div><div class="s">CO2 Saved<br><b>12kg</b></div></div>
<div class="chart">DAILY PRODUCTION GRAPH CANVAS</div></div></body></html>`,
    'style.css': `*{box-sizing:border-box;margin:0;padding:0}body{background:#fffbeb;color:#92400e;font-family:'Inter',sans-serif;padding:60px;display:flex;justify-content:center}
.app{width:100%;max-width:500px}header{display:flex;justify-content:space-between;align-items:center;margin-bottom:40px}header span{background:#fef3c7;padding:5px 15px;border-radius:50px;font-size:0.8rem;font-weight:700}
.stats{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;margin-bottom:40px}.s{background:#fff;padding:20px;border-radius:16px;border:1px solid #fde68a;text-align:center}
b{display:block;margin-top:5px;font-size:1.2rem}.chart{height:200px;background:#fff;border-radius:24px;border:1px solid #fde68a;display:flex;align-items:center;justify-content:center;color:#d97706}`
  }
},

// ============================================================
// ⚖️ LAWYER CLIENT PORTAL
// ============================================================
lawyer_portal: {
  keywords: ['lawyer', 'legal', 'court', 'case', 'attorney', 'avukat', 'hukuk', 'dava', 'müvekkil'],
  projectName: 'lex-portal',
  files: {
    'index.html': `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>LexPortal</title><link rel="stylesheet" href="style.css"></head>
<body><div class="app"><aside><h2>LexPortal</h2><div class="m">My Cases</div><div class="m">Documents</div><div class="m">Billing</div></aside>
<main><h1>Active Case: 2024/402</h1><div class="status">Status: <b>Hearing Pending</b></div>
<div class="timeline"><div class="t">Petition Filed<span>Apr 12</span></div><div class="t">Evidence Submitted<span>Apr 20</span></div></div></main></div></body></html>`,
    'style.css': `*{box-sizing:border-box;margin:0;padding:0}body{background:#f8fafc;color:#0f172a;font-family:'Inter',sans-serif}
.app{display:grid;grid-template-columns:220px 1fr;height:100vh}aside{background:#0f172a;color:#fff;padding:30px}.m{padding:12px;opacity:0.7;cursor:pointer}
main{padding:40px}h1{font-size:1.5rem;margin-bottom:20px}.status{padding:20px;background:#fff;border-radius:12px;border:1px solid #e2e8f0;margin-bottom:40px}
.timeline{border-left:2px solid #cbd5e1;padding-left:30px}.t{position:relative;margin-bottom:30px}.t::before{content:'';position:absolute;left:-36px;top:5px;width:10px;height:10px;background:#3b82f6;border-radius:50%}
.t span{display:block;font-size:0.8rem;opacity:0.6}`
  }
},

// ============================================================
// 🌀 WIND TURBINE MONITOR
// ============================================================
wind_turbine: {
  keywords: ['wind', 'turbine', 'energy', 'renewable', 'monitoring', 'rüzgar türbini', 'enerji', 'izleme'],
  projectName: 'wind-watch',
  files: {
    'index.html': `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>WindWatch</title><link rel="stylesheet" href="style.css"></head>
<body><div class="app"><div class="turbine-box"><h2>Turbine #04</h2><div class="fan"></div><div class="data"><span>Speed: 14 m/s</span><span>Temp: 32°C</span></div></div>
<div class="output">Total Production: <b>1.8 MW</b></div></div></body></html>`,
    'style.css': `*{box-sizing:border-box;margin:0;padding:0}body{background:#f0f9ff;color:#0369a1;font-family:'Inter',sans-serif;display:flex;justify-content:center;padding-top:80px}
.turbine-box{background:#fff;padding:40px;border-radius:32px;border:1px solid #bae6fd;text-align:center;box-shadow:0 20px 40px rgba(0,0,0,0.05)}
.fan{width:80px;height:80px;border:4px solid #0369a1;border-radius:50%;margin:20px auto;border-top-color:transparent;animation:rot 2s linear infinite}
@keyframes rot{to{transform:rotate(360deg)}}.data{display:flex;gap:20px;margin-top:30px;font-size:0.9rem}
.output{margin-top:30px;text-align:center;font-size:1.2rem}b{color:#0284c7}`
  }
},

// ============================================================
// 🏭 FACTORY AUTOMATION
// ============================================================
factory_auto: {
  keywords: ['factory', 'automation', 'robotics', 'manufacturing', 'industry 4.0', 'fabrika', 'otomasyon', 'üretim'],
  projectName: 'factory-core',
  files: {
    'index.html': `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>FactoryCore</title><link rel="stylesheet" href="style.css"></head>
<body><div class="app"><header><h1>FactoryCore v1.0</h1><button>Emergency Stop</button></header>
<div class="grid"><div class="unit"><h3>Line A</h3><p>Status: Operating</p><div class="p-bar"><div style="width:75%"></div></div></div>
<div class="unit"><h3>Line B</h3><p>Status: Maintenance</p><div class="p-bar"><div style="width:10%"></div></div></div></div></div></body></html>`,
    'style.css': `*{box-sizing:border-box;margin:0;padding:0}body{background:#1e293b;color:#f8fafc;font-family:'Inter',sans-serif;padding:60px}
header{display:flex;justify-content:space-between;align-items:center;margin-bottom:60px}button{background:#ef4444;color:#fff;border:none;padding:12px 25px;border-radius:8px;font-weight:900;cursor:pointer}
.grid{display:grid;grid-template-columns:1fr 1fr;gap:30px}.unit{background:#334155;padding:30px;border-radius:16px;border:1px solid #475569}
.p-bar{height:8px;background:#1e293b;border-radius:10px;margin-top:15px;overflow:hidden}.p-bar div{height:100%;background:#22c55e}`
  }
},

// ============================================================
// 📑 TAX COMPLIANCE TRACKER
// ============================================================
tax_tracker: {
  keywords: ['tax', 'finance', 'compliance', 'accounting', 'business', 'vergi', 'muhasebe', 'maliye', 'beyanname'],
  projectName: 'tax-vault',
  files: {
    'index.html': `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>TaxVault</title><link rel="stylesheet" href="style.css"></head>
<body><div class="app"><h1>Tax Dashboard</h1><div class="card"><h3>Next Deadline</h3><h2>May 15, 2024</h2><p>VAT Return Q1</p></div>
<div class="list"><div class="i"><span>Estimated Tax</span><b>$4,250.00</b></div><div class="i"><span>Paid to Date</span><b>$1,100.00</b></div></div></div></body></html>`,
    'style.css': `*{box-sizing:border-box;margin:0;padding:0}body{background:#f8fafc;color:#1e293b;font-family:'Inter',sans-serif;padding:60px;display:flex;justify-content:center}
.app{width:360px}.card{background:#0f172a;color:#fff;padding:40px;border-radius:24px;margin-bottom:30px}h3{font-size:0.8rem;opacity:0.6;margin-bottom:10px}
.list{background:#fff;padding:25px;border-radius:24px;border:1px solid #e2e8f0}.i{display:flex;justify-content:space-between;padding:15px 0;border-bottom:1px solid #f1f5f9}`
  }
},

// ============================================================
// ✈️ VISA STATUS PORTAL
// ============================================================
visa_portal: {
  keywords: ['visa', 'immigration', 'travel', 'status', 'passport', 'vize', 'başvuru', 'durum sorgulama', 'pasaport'],
  projectName: 'xeyal-visa',
  files: {
    'index.html': `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>Visa Status</title><link rel="stylesheet" href="style.css"></head>
<body><div class="app"><h1>Track Application</h1><div class="search"><input type="text" placeholder="REF NUMBER"><button>Track</button></div>
<div class="steps"><div class="s active">Submitted</div><div class="s active">Processing</div><div class="s">Approved</div></div></div></body></html>`,
    'style.css': `*{box-sizing:border-box;margin:0;padding:0}body{background:#fff;color:#0f172a;font-family:'Inter',sans-serif;padding:80px;display:flex;justify-content:center}
.app{width:100%;max-width:400px;text-align:center}h1{margin-bottom:40px}.search{display:flex;gap:10px;margin-bottom:60px}
input{flex:1;padding:12px;border:2px solid #f1f5f9;border-radius:10px;outline:none}button{background:#0f172a;color:#fff;border:none;padding:0 25px;border-radius:10px;cursor:pointer}
.steps{display:flex;justify-content:space-between;position:relative}.s{font-size:0.75rem;opacity:0.3;font-weight:700}.s.active{opacity:1;color:#22c55e}`
  }
},

// ============================================================
// 🌍 ENVIRONMENTAL QUALITY MONITOR
// ============================================================
env_monitor: {
  keywords: ['environment', 'air quality', 'pollution', 'sensors', 'water', 'çevre', 'hava kalitesi', 'kirlilik', 'sensör'],
  projectName: 'eco-watch',
  files: {
    'index.html': `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>EcoWatch</title><link rel="stylesheet" href="style.css"></head>
<body><div class="app"><header><h1>EcoWatch Live</h1></header>
<div class="grid"><div class="c"><span>AQI Index</span><b>14 (Excellent)</b></div><div class="c"><span>Humidity</span><b>42%</b></div>
<div class="c"><span>Noise Level</span><b>45 dB</b></div><div class="c"><span>UV Index</span><b>Low (2)</b></div></div></div></body></html>`,
    'style.css': `*{box-sizing:border-box;margin:0;padding:0}body{background:#f0fdf4;color:#166534;font-family:'Inter',sans-serif;padding:60px;display:flex;justify-content:center}
.app{width:100%;max-width:500px}header{margin-bottom:40px;text-align:center}.grid{display:grid;grid-template-columns:1fr 1fr;gap:20px}
.c{background:#fff;padding:25px;border-radius:24px;border:1px solid #bbf7d0;font-weight:700}span{display:block;opacity:0.6;font-size:0.8rem}b{font-size:1.1rem}`
  }
},

// ============================================================
// ⚡ POWER GRID CONTROL
// ============================================================
power_grid: {
  keywords: ['power grid', 'electricity', 'energy', 'utility', 'load', 'elektrik şebekesi', 'enerji', 'kesinti'],
  projectName: 'grid-control',
  files: {
    'index.html': `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>GridControl</title><link rel="stylesheet" href="style.css"></head>
<body><div class="app"><header><h2>GRID CONTROL CENTER</h2></header>
<div class="status">⚡ ACTIVE LOAD: 12.4 GW</div><div class="map">CITY GRID MAP VISUALIZER</div>
<div class="alerts"><h3>Active Alerts</h3><div class="a">Substation B-12 Overload</div></div></div></body></html>`,
    'style.css': `*{box-sizing:border-box;margin:0;padding:0}body{background:#000;color:#facc15;font-family:monospace;padding:40px}
header{border-bottom:1px solid #facc15;padding-bottom:15px;margin-bottom:30px}.status{font-size:1.5rem;margin-bottom:20px}
.map{height:300px;border:1px solid #444;background:#111;display:flex;align-items:center;justify-content:center;color:#666}
.alerts{margin-top:40px}h3{color:#ef4444;margin-bottom:15px}.a{color:#ef4444;border-left:4px solid #ef4444;padding-left:15px}`
  }
},

// ============================================================
// 🚢 MARINE NAVIGATION HUB
// ============================================================
marine_nav: {
  keywords: ['marine', 'navigation', 'ship', 'boat', 'ocean', 'radar', 'denizcilik', 'navigasyon', 'gemi'],
  projectName: 'sea-track',
  files: {
    'index.html': `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>SeaTrack</title><link rel="stylesheet" href="style.css"></head>
<body><div class="app"><div class="radar"></div><div class="info"><h1>S.S. Xeyal</h1><p>Speed: 12 knots</p><p>Depth: 45m</p></div></div></body></html>`,
    'style.css': `*{box-sizing:border-box;margin:0;padding:0}body{background:#0f172a;color:#38bdf8;font-family:'Inter',sans-serif;padding:60px;display:flex;justify-content:center}
.app{display:flex;align-items:center;gap:40px}.radar{width:200px;height:200px;border:2px solid #38bdf8;border-radius:50%;position:relative;background:radial-gradient(circle,#38bdf811,transparent)}
.radar::after{content:'';position:absolute;top:0;left:50%;width:2px;height:100px;background:#38bdf8;transform-origin:bottom;animation:scan 4s linear infinite}
@keyframes scan{to{transform:rotate(360deg)}}h1{font-size:1.5rem;margin-bottom:10px}p{opacity:0.7}`
  }
},

// ============================================================
// ⛏️ MINING OPERATIONS
// ============================================================
mining_ops: {
  keywords: ['mining', 'operations', 'heavy machinery', 'excavation', 'safety', 'madencilik', 'operasyon', 'iş makinesi'],
  projectName: 'mine-core',
  files: {
    'index.html': `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>MineCore</title><link rel="stylesheet" href="style.css"></head>
<body><div class="app"><header><h1>MineCore Dashboard</h1></header>
<div class="grid"><div class="m">Excavator #12<br><b>Active</b></div><div class="m">Truck #45<br><b>Loading</b></div>
<div class="m">Oxygen Level<br><b>98%</b></div><div class="m">Efficiency<br><b>84%</b></div></div></div></body></html>`,
    'style.css': `*{box-sizing:border-box;margin:0;padding:0}body{background:#262626;color:#fbbf24;font-family:'Inter',sans-serif;padding:60px;display:flex;justify-content:center}
.app{width:100%;max-width:500px}header{margin-bottom:40px;text-align:center}.grid{display:grid;grid-template-columns:1fr 1fr;gap:20px}
.m{background:#171717;padding:30px;border-radius:12px;border:1px solid #404040}b{display:block;margin-top:10px;color:#fff}`
  }
}

});
