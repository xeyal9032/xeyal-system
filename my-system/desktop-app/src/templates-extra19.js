/**
 * FORGE TEMPLATE REGISTRY — BATCH 19 (181-190)
 * Air Quality, Transport, Emergency, Recycling, Park, Library, Crime Map, Citizen, Water, Election
 */
Object.assign(window.FORGE_TEMPLATES, {

// ============================================================
// 🌬️ AIR QUALITY MONITOR
// ============================================================
air_quality: {
  keywords: ['air quality', 'aqi', 'environment', 'pollution', 'weather', 'hava kalitesi', 'çevre', 'kirlilik', 'hava durumu'],
  projectName: 'x-air',
  files: {
    'index.html': `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>X-Air</title><link rel="stylesheet" href="style.css"></head>
<body><div class="app"><div class="score good">42<span>Good</span></div>
<div class="stats"><div class="s">PM2.5: 12</div><div class="s">O3: 45</div></div></div></body></html>`,
    'style.css': `*{box-sizing:border-box;margin:0;padding:0}body{background:#f0fdf4;color:#166534;font-family:'Inter',sans-serif;padding:60px;display:flex;justify-content:center}
.app{text-align:center}.score{width:150px;height:150px;background:#fff;border-radius:50%;margin:0 auto 40px;display:flex;flex-direction:column;align-items:center;justify-content:center;font-size:3rem;font-weight:900;border:8px solid #22c55e}
span{font-size:1rem;display:block;opacity:0.6}.stats{display:flex;gap:20px}.s{background:#fff;padding:15px;border-radius:12px;border:1px solid #bbf7d0}`
  }
},

// ============================================================
// 🚌 PUBLIC TRANSPORT LIVE MAP
// ============================================================
transport_map: {
  keywords: ['transport', 'bus', 'train', 'live map', 'metro', 'ulaşım', 'otobüs', 'canlı harita', 'toplu taşıma'],
  projectName: 'x-transport',
  files: {
    'index.html': `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>X-Transport</title><link rel="stylesheet" href="style.css"></head>
<body><div class="app"><div class="map">LIVE TRANSPORT VISUALIZER</div><div class="list">
<div class="t"><h4>Line 102 (Bus)</h4><span>Next: 4 mins</span></div><div class="t"><h4>Metro M2</h4><span>Next: 2 mins</span></div></div></div></body></html>`,
    'style.css': `*{box-sizing:border-box;margin:0;padding:0}body{background:#fff;color:#0f172a;font-family:'Inter',sans-serif;padding:20px;display:flex;justify-content:center}
.app{width:100%;max-width:400px}.map{height:250px;background:#e2e8f0;border-radius:24px;margin-bottom:20px;display:flex;align-items:center;justify-content:center;color:#64748b}
.t{padding:20px;border-bottom:1px solid #f1f5f9;display:flex;align-items:center;justify-content:space-between}span{font-size:0.8rem;color:#22c55e;font-weight:700}`
  }
},

// ============================================================
// 🚨 EMERGENCY ALERT SYSTEM
// ============================================================
emergency_alert: {
  keywords: ['emergency', 'alert', 'disaster', 'safety', 'notifications', 'acil durum', 'afet', 'uyarı', 'güvenlik'],
  projectName: 'x-emergency',
  files: {
    'index.html': `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>X-Emergency</title><link rel="stylesheet" href="style.css"></head>
<body><div class="app"><div class="alert"><h1>⚠️ RED ALERT</h1><p>Flood Warning in Zone 4</p></div>
<div class="info"><h3>Safe Zones</h3><ul><li>Central School</li><li>City Hall</li></ul></div></div></body></html>`,
    'style.css': `*{box-sizing:border-box;margin:0;padding:0}body{background:#450a0a;color:#fff;font-family:'Inter',sans-serif;padding:60px;display:flex;justify-content:center}
.app{width:360px}.alert{background:#ef4444;padding:40px;border-radius:24px;text-align:center;margin-bottom:40px;box-shadow:0 0 50px rgba(239,68,68,0.5)}
h1{letter-spacing:2px}p{margin-top:10px;opacity:0.8}.info{background:rgba(255,255,255,0.1);padding:30px;border-radius:24px}`
  }
},

// ============================================================
// ♻️ RECYCLING CENTER LOCATOR
// ============================================================
recycling_finder: {
  keywords: ['recycling', 'waste', 'environment', 'green', 'locator', 'geri dönüşüm', 'atık', 'çevre', 'harita'],
  projectName: 'x-recycle',
  files: {
    'index.html': `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>X-Recycle</title><link rel="stylesheet" href="style.css"></head>
<body><div class="app"><h1>Green Points</h1><div class="list">
<div class="p"><h4>Paper & Glass</h4><span>Distance: 0.5km</span><button>Navigate</button></div>
<div class="p"><h4>Electronic Waste</h4><span>Distance: 2.1km</span><button>Navigate</button></div></div></div></body></html>`,
    'style.css': `*{box-sizing:border-box;margin:0;padding:0}body{background:#fff;color:#14532d;font-family:'Inter',sans-serif;padding:60px;display:flex;justify-content:center}
.app{width:360px}.p{background:#f0fdf4;padding:25px;border-radius:16px;margin-bottom:15px;display:flex;align-items:center;justify-content:space-between;border:1px solid #dcfce7}
span{font-size:0.8rem;opacity:0.6}button{background:#16a34a;color:#fff;border:none;padding:8px 15px;border-radius:8px;cursor:pointer}`
  }
},

// ============================================================
// 🌳 PARK / PLAYGROUND FINDER
// ============================================================
park_finder: {
  keywords: ['park', 'playground', 'city', 'recreation', 'kids', 'parklar', 'oyun alanı', 'şehir rehberi', 'aktivite'],
  projectName: 'x-parks',
  files: {
    'index.html': `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>X-Parks</title><link rel="stylesheet" href="style.css"></head>
<body><div class="app"><h1>Explore Parks</h1><div class="grid">
<div class="p"><span>Central Park</span><b>Pet Friendly</b></div><div class="p"><span>Sky Garden</span><b>Basketball</b></div></div></div></body></html>`,
    'style.css': `*{box-sizing:border-box;margin:0;padding:0}body{background:#f8fafc;color:#0f172a;font-family:'Inter',sans-serif;padding:60px;display:flex;justify-content:center}
.grid{display:grid;grid-template-columns:1fr 1fr;gap:20px}.p{background:#fff;padding:30px;border-radius:24px;text-align:center;border:1px solid #e2e8f0}
span{display:block;font-weight:900}b{display:block;margin-top:10px;font-size:0.75rem;color:#22c55e}`
  }
},

// ============================================================
// 📚 PUBLIC LIBRARY CATALOG
// ============================================================
library_catalog: {
  keywords: ['library', 'books', 'catalog', 'search', 'education', 'kütüphane', 'kitaplar', 'arama', 'eğitim'],
  projectName: 'x-library',
  files: {
    'index.html': `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>X-Library</title><link rel="stylesheet" href="style.css"></head>
<body><div class="app"><h1>Library Search</h1><input type="text" placeholder="Title, Author, ISBN...">
<div class="results"><div class="b"><h4>The Great Gatsby</h4><span>Available (Section B-4)</span></div></div></div></body></html>`,
    'style.css': `*{box-sizing:border-box;margin:0;padding:0}body{background:#fafaf9;color:#44403c;font-family:'Inter',sans-serif;padding:60px;display:flex;justify-content:center}
.app{width:400px}input{width:100%;padding:15px;margin-bottom:30px;border:1px solid #e7e5e4;border-radius:12px}.b{background:#fff;padding:25px;border-radius:16px;border:1px solid #e7e5e4}
span{font-size:0.8rem;color:#b45309;font-weight:700}`
  }
},

// ============================================================
// 🗺️ CRIME MAP / SAFETY DASHBOARD
// ============================================================
crime_map: {
  keywords: ['crime', 'map', 'safety', 'neighborhood', 'police', 'suç haritası', 'güvenlik', 'emniyet', 'mahalle'],
  projectName: 'x-safety',
  files: {
    'index.html': `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>X-Safety</title><link rel="stylesheet" href="style.css"></head>
<body><div class="app"><h1>City Safety Index</h1><div class="map">HEATMAP VISUALIZER</div>
<div class="stats"><div class="s">Thefts: -12%</div><div class="s">Safe Zones: 85%</div></div></div></body></html>`,
    'style.css': `*{box-sizing:border-box;margin:0;padding:0}body{background:#0f172a;color:#fff;font-family:'Inter',sans-serif;padding:60px;display:flex;justify-content:center}
.app{width:100%;max-width:500px}.map{height:250px;background:rgba(239,68,68,0.2);border-radius:24px;border:1px solid #ef4444;margin-bottom:30px;display:flex;align-items:center;justify-content:center;color:#ef4444}
.stats{display:grid;grid-template-columns:1fr 1fr;gap:20px}.s{background:#1e293b;padding:20px;border-radius:12px;text-align:center;border:1px solid #334155}`
  }
},

// ============================================================
// 🏛️ CITIZEN COMPLAINT PORTAL
// ============================================================
citizen_portal: {
  keywords: ['citizen', 'complaint', 'city hall', 'feedback', 'government', 'vatandaş portalı', 'şikayet', 'belediye', 'beyaz masa'],
  projectName: 'x-citizen',
  files: {
    'index.html': `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>X-Citizen</title><link rel="stylesheet" href="style.css"></head>
<body><div class="app"><h1>Citizen Feedback</h1><textarea placeholder="Describe the issue..."></textarea>
<select><option>Pothole</option><option>Lighting</option></select><button>Submit Request</button></div></body></html>`,
    'style.css': `*{box-sizing:border-box;margin:0;padding:0}body{background:#f8fafc;color:#0f172a;font-family:'Inter',sans-serif;padding:60px;display:flex;justify-content:center}
.app{width:400px}textarea{width:100%;height:150px;padding:15px;margin-bottom:15px;border:1px solid #e2e8f0;border-radius:12px;resize:none}
select,button{width:100%;padding:12px;margin-bottom:15px;border-radius:8px;border:1px solid #e2e8f0}
button{background:#3b82f6;color:#fff;font-weight:700;cursor:pointer}`
  }
},

// ============================================================
// 💧 WATER USAGE MONITOR
// ============================================================
water_usage: {
  keywords: ['water', 'usage', 'utility', 'smart meter', 'conservation', 'su tüketimi', 'tasarruf', 'fatura', 'akıllı sayaç'],
  projectName: 'x-water',
  files: {
    'index.html': `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>X-Water</title><link rel="stylesheet" href="style.css"></head>
<body><div class="app"><h1>Water Usage</h1><div class="gauge"><span>120L</span></div>
<p>Today: 12.5L | Month: 420L</p><div class="tips">Tip: Fix leaks to save 20%!</div></div></body></html>`,
    'style.css': `*{box-sizing:border-box;margin:0;padding:0}body{background:#f0f9ff;color:#0369a1;font-family:'Inter',sans-serif;padding:60px;display:flex;justify-content:center}
.app{width:320px;text-align:center}.gauge{width:120px;height:120px;border:8px solid #0ea5e9;border-radius:50%;margin:0 auto 30px;display:flex;align-items:center;justify-content:center;font-size:1.5rem;font-weight:900}
.tips{margin-top:40px;background:#fff;padding:20px;border-radius:16px;font-size:0.85rem;border:1px solid #bae6fd}`
  }
},

// ============================================================
// 🗳️ ELECTION RESULTS LIVE
// ============================================================
election_results: {
  keywords: ['election', 'results', 'voting', 'politics', 'live', 'seçim sonuçları', 'oylama', 'siyaset', 'canlı'],
  projectName: 'x-election',
  files: {
    'index.html': `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>X-Election</title><link rel="stylesheet" href="style.css"></head>
<body><div class="app"><h1>Live Results</h1><div class="bars">
<div class="b"><p>Party A: 52%</p><div class="p"><div style="width:52%;background:#ef4444"></div></div></div>
<div class="b"><p>Party B: 48%</p><div class="p"><div style="width:48%;background:#3b82f6"></div></div></div></div></div></body></html>`,
    'style.css': `*{box-sizing:border-box;margin:0;padding:0}body{background:#fff;color:#0f172a;font-family:'Inter',sans-serif;padding:60px;display:flex;justify-content:center}
.app{width:400px}.b{margin-bottom:30px}p{font-weight:700;margin-bottom:10px}.p{height:20px;background:#f1f5f9;border-radius:10px;overflow:hidden}
.p div{height:100%}`
  }
}

});
