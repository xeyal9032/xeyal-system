/**
 * FORGE TEMPLATE REGISTRY — BATCH 16 (151-160)
 * OBD-II, Service, Fleet, EV Map, Parking, Auction, Accident, Logbook, Diagnostic, Smart Key
 */
Object.assign(window.FORGE_TEMPLATES, {

// ============================================================
// 🚗 OBD-II LIVE DASHBOARD
// ============================================================
obd_live: {
  keywords: ['obd', 'obd2', 'car', 'dashboard', 'live data', 'rpm', 'speed', 'otomobil', 'araba', 'canlı veri', 'hız'],
  projectName: 'x-obd',
  files: {
    'index.html': `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>X-OBD</title><link rel="stylesheet" href="style.css"></head>
<body><div class="app"><div class="gauge"><span>RPM</span><h2>3,250</h2></div><div class="stats">
<div class="s">Speed: 84 km/h</div><div class="s">Temp: 92°C</div><div class="s">Load: 45%</div></div></div></body></html>`,
    'style.css': `*{box-sizing:border-box;margin:0;padding:0}body{background:#000;color:#22c55e;font-family:monospace;padding:60px;display:flex;justify-content:center}
.app{text-align:center}.gauge{width:200px;height:200px;border:5px solid #22c55e;border-radius:50%;margin:0 auto 40px;display:flex;flex-direction:column;align-items:center;justify-content:center}
h2{font-size:3rem}.stats{display:grid;grid-template-columns:repeat(3,1fr);gap:20px}.s{background:#111;padding:15px;border:1px solid #333;border-radius:8px}`
  }
},

// ============================================================
// 🛠️ CAR SERVICE HISTORY
// ============================================================
service_history: {
  keywords: ['car', 'service', 'maintenance', 'repairs', 'history', 'araç bakım', 'servis geçmişi', 'araba', 'onarım', 'ajanda'],
  projectName: 'x-service',
  files: {
    'index.html': `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>X-Service</title><link rel="stylesheet" href="style.css"></head>
<body><div class="app"><h1>Service History: BMW X1</h1><div class="list">
<div class="i"><span>Apr 12, 2024</span><h4>Oil Change & Filters</h4><p>Mileage: 45,200 km</p></div>
<div class="i"><span>Jan 20, 2024</span><h4>Brake Pad Replacement</h4><p>Mileage: 42,100 km</p></div></div><button>Add Entry</button></div></body></html>`,
    'style.css': `*{box-sizing:border-box;margin:0;padding:0}body{background:#f8fafc;color:#0f172a;font-family:'Inter',sans-serif;padding:60px;display:flex;justify-content:center}
.app{width:100%;max-width:400px}h1{margin-bottom:40px;font-size:1.2rem;opacity:0.6}.i{background:#fff;padding:25px;border-radius:16px;border:1px solid #e2e8f0;margin-bottom:15px}
span{font-size:0.8rem;color:#3b82f6;font-weight:700}h4{margin:5px 0}p{font-size:0.85rem;opacity:0.5}
button{width:100%;margin-top:20px;padding:15px;background:#0f172a;color:#fff;border:none;border-radius:12px;font-weight:700;cursor:pointer}`
  }
},

// ============================================================
// 🚛 FLEET MANAGEMENT TRACKER
// ============================================================
fleet_mgr: {
  keywords: ['fleet', 'trucks', 'logistics', 'tracking', 'telematics', 'filo yönetimi', 'lojistik', 'takip', 'kamyon'],
  projectName: 'x-fleet',
  files: {
    'index.html': `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>X-Fleet</title><link rel="stylesheet" href="style.css"></head>
<body><div class="app"><aside><h2>FleetX</h2><div class="m">Vehicles (12)</div><div class="m">Drivers</div></aside>
<main><h1>Global Fleet Overview</h1><div class="grid"><div class="v"><span>TRUCK-01</span><b>In Route</b><p>Fuel: 65%</p></div>
<div class="v"><span>VAN-42</span><b>Idle</b><p>Fuel: 92%</p></div></div></main></div></body></html>`,
    'style.css': `*{box-sizing:border-box;margin:0;padding:0}body{background:#f1f5f9;color:#0f172a;font-family:'Inter',sans-serif}
.app{display:grid;grid-template-columns:200px 1fr;height:100vh}aside{background:#0f172a;color:#fff;padding:30px}.m{padding:10px;opacity:0.7}
main{padding:40px}.grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:20px}
.v{background:#fff;padding:25px;border-radius:12px;border:1px solid #e2e8f0}span{display:block;font-weight:900}b{color:#22c55e;font-size:0.75rem}p{margin-top:10px;font-size:0.8rem;opacity:0.6}`
  }
},

// ============================================================
// ⚡ EV CHARGING STATION MAP
// ============================================================
ev_map: {
  keywords: ['ev', 'charging', 'electric vehicle', 'map', 'tesla', 'şarj istasyonu', 'elektrikli araç', 'harita'],
  projectName: 'x-ev-map',
  files: {
    'index.html': `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>EV Map</title><link rel="stylesheet" href="style.css"></head>
<body><div class="app"><div class="map">STATION MAP VISUALIZER</div><div class="list">
<div class="s"><h4>Supercharge A1</h4><span>Available: 4/6</span><button>Navigate</button></div>
<div class="s"><h4>EcoCharge Center</h4><span>Available: 0/2</span><button disabled>Full</button></div></div></div></body></html>`,
    'style.css': `*{box-sizing:border-box;margin:0;padding:0}body{background:#fff;color:#0f172a;font-family:'Inter',sans-serif;padding:20px;display:flex;justify-content:center}
.app{width:100%;max-width:400px}.map{height:200px;background:#e2e8f0;border-radius:24px;margin-bottom:20px;display:flex;align-items:center;justify-content:center;color:#64748b}
.s{padding:20px;border-bottom:1px solid #f1f5f9;display:flex;align-items:center;justify-content:space-between}span{font-size:0.8rem;opacity:0.6}
button{background:#22c55e;color:#fff;border:none;padding:8px 15px;border-radius:6px;cursor:pointer}`
  }
},

// ============================================================
// 🅿️ PARKING SPOT FINDER
// ============================================================
parking_finder: {
  keywords: ['parking', 'spot', 'city', 'valet', 'finder', 'park yeri', 'otopark', 'akıllı şehir'],
  projectName: 'x-park',
  files: {
    'index.html': `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>X-Park</title><link rel="stylesheet" href="style.css"></head>
<body><div class="app"><h1>Parking Near Me</h1><div class="grid">
<div class="p"><span>A-102</span><b>Free</b></div><div class="p"><span>A-103</span><b>Taken</b></div><div class="p"><span>A-104</span><b>Free</b></div></div>
<div class="total">Total Available: 12</div></div></body></html>`,
    'style.css': `*{box-sizing:border-box;margin:0;padding:0}body{background:#f8fafc;color:#1e293b;font-family:'Inter',sans-serif;padding:60px;display:flex;justify-content:center}
.grid{display:grid;grid-template-columns:repeat(3,1fr);gap:15px;margin-bottom:40px}.p{background:#fff;padding:25px;border-radius:12px;text-align:center;border:2px solid #e2e8f0}
.p b{display:block;margin-top:10px;font-size:0.75rem;color:#22c55e}.total{text-align:center;font-weight:900;font-size:1.5rem}`
  }
},

// ============================================================
// 🔨 CAR AUCTION / BIDDING
// ============================================================
car_auction: {
  keywords: ['car auction', 'bidding', 'sales', 'luxury cars', 'araba', 'alim', 'satim', 'araç açık artırma', 'teklif verme', 'satış'],
  projectName: 'x-bid',
  files: {
    'index.html': `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>X-Bid</title><link rel="stylesheet" href="style.css"></head>
<body><div class="app"><div class="car-img"></div><h1>Porsche 911 GT3</h1><div class="bid-box">
<span>Current Bid</span><h2>$145,000</h2><input type="number" placeholder="Enter amount"><button>Place Bid</button></div></div></body></html>`,
    'style.css': `*{box-sizing:border-box;margin:0;padding:0}body{background:#000;color:#fff;font-family:'Inter',sans-serif;padding:60px;display:flex;justify-content:center}
.car-img{height:250px;background:#111;border-radius:24px;margin-bottom:30px}h1{margin-bottom:40px}.bid-box{background:#111;padding:40px;border-radius:32px;text-align:center}
span{opacity:0.6;font-size:0.9rem}input{width:100%;padding:15px;margin:20px 0;background:#222;border:1px solid #333;color:#fff;border-radius:12px}
button{width:100%;padding:15px;background:#ef4444;color:#fff;border:none;border-radius:12px;font-weight:900;cursor:pointer}`
  }
},

// ============================================================
// ⚠️ ACCIDENT REPORTER
// ============================================================
accident_report: {
  keywords: ['accident', 'report', 'insurance', 'car crash', 'kaza', 'tutanak', 'sigorta', 'bildirim'],
  projectName: 'x-report',
  files: {
    'index.html': `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>X-Report</title><link rel="stylesheet" href="style.css"></head>
<body><div class="app"><h1>Accident Reporter</h1><div class="step">Step 1: Location & Time</div>
<div class="upload">Upload Photos of Damage</div><button>Submit to Insurance</button></div></body></html>`,
    'style.css': `*{box-sizing:border-box;margin:0;padding:0}body{background:#fff;color:#0f172a;font-family:'Inter',sans-serif;padding:60px;display:flex;justify-content:center}
.app{width:360px;text-align:center}.step{background:#f1f5f9;padding:15px;border-radius:8px;margin-bottom:20px;font-weight:700}
.upload{height:150px;border:2px dashed #e2e8f0;border-radius:12px;display:flex;align-items:center;justify-content:center;margin-bottom:40px;color:#94a3b8}
button{width:100%;padding:15px;background:#ef4444;color:#fff;border:none;border-radius:12px;font-weight:700;cursor:pointer}`
  }
},

// ============================================================
// 📅 DRIVER LOGBOOK (ELD)
// ============================================================
driver_log: {
  keywords: ['driver', 'logbook', 'eld', 'trucking', 'hours of service', 'sürücü', 'günlük', 'çalışma saati'],
  projectName: 'x-log',
  files: {
    'index.html': `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>X-Log</title><link rel="stylesheet" href="style.css"></head>
<body><div class="app"><h1>Daily Driver Log</h1><div class="status">Current Status: <b>DRIVING</b></div>
<div class="timer">Elapsed: 04:20h</div><div class="actions"><button>Off Duty</button><button>Sleeper</button></div></div></body></html>`,
    'style.css': `*{box-sizing:border-box;margin:0;padding:0}body{background:#0f172a;color:#fff;font-family:'Inter',sans-serif;padding:60px;display:flex;justify-content:center}
.app{width:360px;text-align:center}.status{font-size:1.2rem;margin-bottom:20px}.timer{font-size:3rem;font-weight:900;margin-bottom:40px;color:#22c55e}
.actions{display:grid;grid-template-columns:1fr 1fr;gap:10px}button{padding:15px;background:#1e293b;color:#fff;border:1px solid #334155;border-radius:12px;cursor:pointer}`
  }
},

// ============================================================
// 🔍 VEHICLE DIAGNOSTICS REPORT
// ============================================================
car_diag: {
  keywords: ['car', 'diagnostics', 'dtc', 'fault codes', 'scanner', 'araç arıza', 'tanılama', 'arıza kodları', 'tarayıcı'],
  projectName: 'x-diag',
  files: {
    'index.html': `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>X-Diag</title><link rel="stylesheet" href="style.css"></head>
<body><div class="app"><h1>Full System Scan</h1><div class="results">
<div class="r ok">Engine: OK</div><div class="r ok">ABS: OK</div><div class="r warn">Airbag: B0012-13</div></div><button>Clear Codes</button></div></body></html>`,
    'style.css': `*{box-sizing:border-box;margin:0;padding:0}body{background:#111;color:#fff;font-family:monospace;padding:60px;display:flex;justify-content:center}
.app{width:360px}h1{margin-bottom:40px;border-bottom:1px solid #333;padding-bottom:10px}.r{padding:15px;margin-bottom:10px;border-radius:4px}
.ok{background:#064e3b;color:#34d399}.warn{background:#7f1d1d;color:#f87171}
button{width:100%;margin-top:30px;padding:12px;background:#333;color:#fff;border:none;border-radius:4px;cursor:pointer}`
  }
},

// ============================================================
// 🔑 SMART KEY / REMOTE CONTROL
// ============================================================
smart_key: {
  keywords: ['smart key', 'remote', 'car control', 'lock', 'engine start', 'akıllı anahtar', 'uzaktan kontrol', 'araç kontrol'],
  projectName: 'x-key',
  files: {
    'index.html': `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>X-Key</title><link rel="stylesheet" href="style.css"></head>
<body><div class="app"><div class="key-card"><h1>BMW X1</h1><div class="grid">
<button class="lock">🔒</button><button class="unlock">🔓</button>
<button class="start">START</button><button class="trunk">TRUNK</button></div></div></div></body></html>`,
    'style.css': `*{box-sizing:border-box;margin:0;padding:0}body{background:#f1f5f9;color:#0f172a;font-family:'Inter',sans-serif;padding:60px;display:flex;justify-content:center}
.key-card{width:300px;background:#0f172a;color:#fff;padding:40px;border-radius:32px;text-align:center;box-shadow:0 20px 40px rgba(0,0,0,0.2)}
.grid{display:grid;grid-template-columns:1fr 1fr;gap:20px;margin-top:40px}button{aspect-ratio:1;background:#1e293b;border:1px solid #334155;color:#fff;border-radius:16px;font-size:1.5rem;cursor:pointer}
.start{grid-column: span 2;aspect-ratio:auto;padding:20px;background:#ef4444;font-weight:900}`
  }
}

});
