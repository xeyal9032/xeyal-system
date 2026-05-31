/**
 * FORGE TEMPLATE REGISTRY — BATCH 10 (10 templates) — THE 100TH MILESTONE!
 * AI Coder, Metaverse, Security SOC, Logistics, Smart City, NFT, Zen, HR Portal, Video Call, News
 */
Object.assign(window.FORGE_TEMPLATES, {

// ============================================================
// 🤖 AI CODING ASSISTANT
// ============================================================
ai_coder: {
  keywords: ['ai coder', 'coding assistant', 'github copilot', 'programming', 'code review', 'yapay zeka kodlama', 'yazılım yardımcısı'],
  projectName: 'xeyal-coder',
  files: {
    'index.html': `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>AI Coder</title><link rel="stylesheet" href="style.css"></head>
<body><div class="app"><div class="editor"><code>const x = 10;<br>console.log(x);</code></div>
<div class="assistant"><h3>AI Suggestions</h3><div class="sug">Refactor: Use an arrow function for better readability.<button>Apply</button></div></div></div></body></html>`,
    'style.css': `*{box-sizing:border-box;margin:0;padding:0}body{background:#0d1117;color:#c9d1d9;font-family:monospace}
.app{display:grid;grid-template-columns:1fr 300px;height:100vh}
.editor{padding:40px;background:#0d1117;border-right:1px solid #30363d;font-size:1.1rem}
.assistant{background:#161b22;padding:30px}h3{font-size:0.9rem;margin-bottom:20px;color:#8b949e}
.sug{padding:15px;background:#0d1117;border:1px solid #30363d;border-radius:6px;font-size:0.85rem}
button{width:100%;margin-top:10px;padding:8px;background:#238636;color:#fff;border:none;border-radius:6px;cursor:pointer}`
  }
},

// ============================================================
// 🌌 METAVERSE / GAME UI
// ============================================================
metaverse: {
  keywords: ['metaverse', 'game', 'gaming', 'virtual reality', 'avatar', 'market', 'oyun', 'sanal gerçeklik'],
  projectName: 'xeyal-world',
  files: {
    'index.html': `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>Metaverse</title><link rel="stylesheet" href="style.css"></head>
<body><div class="hud"><div class="profile">XP: 2450 | Level 12</div><div class="map">MINI MAP</div>
<div class="inventory"><h4>INVENTORY</h4><div class="items"><div class="i">⚔️</div><div class="i">🛡️</div><div class="i">🧪</div></div></div></div></body></html>`,
    'style.css': `*{box-sizing:border-box;margin:0;padding:0}body{background:radial-gradient(circle,#1e1b4b,#020617);color:#fff;font-family:'Outfit',sans-serif;height:100vh;overflow:hidden}
.hud{position:relative;width:100%;height:100%;padding:40px}
.profile{position:absolute;top:40px;left:40px;background:rgba(255,255,255,0.1);padding:15px 30px;border-radius:50px;backdrop-filter:blur(10px)}
.map{position:absolute;top:40px;right:40px;width:150px;height:150px;background:rgba(0,0,0,0.5);border:2px solid #6366f1;display:flex;align-items:center;justify-content:center}
.inventory{position:absolute;bottom:40px;left:50%;transform:translateX(-50%);background:rgba(0,0,0,0.8);padding:20px;border-radius:24px;border:1px solid #6366f1}
.items{display:flex;gap:15px;margin-top:15px}.i{width:60px;height:60px;background:#1e1b4b;display:flex;align-items:center;justify-content:center;font-size:2rem;border-radius:12px;cursor:pointer}`
  }
},

// ============================================================
// 🛡️ SECURITY OPERATIONS (SOC)
// ============================================================
soc_dashboard: {
  keywords: ['security', 'soc', 'threat', 'monitoring', 'logs', 'cybersecurity', 'siber güvenlik', 'tehdit takibi'],
  projectName: 'x-shield',
  files: {
    'index.html': `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>X-Shield SOC</title><link rel="stylesheet" href="style.css"></head>
<body><div class="app"><header><h2>X-SHIELD SOC</h2><div class="threat-lv">Level: Low</div></header>
<div class="main"><div class="map">GLOBAL THREAT MAP</div><div class="logs"><h3>Real-time Logs</h3><div class="l">SSH Login attempt from 192.x.x.x</div><div class="l">Firewall rule updated</div></div></div></div></body></html>`,
    'style.css': `*{box-sizing:border-box;margin:0;padding:0}body{background:#000;color:#0f0;font-family:monospace;padding:40px}
header{display:flex;justify-content:space-between;border-bottom:1px solid #0f0;padding-bottom:20px;margin-bottom:30px}
.threat-lv{background:#040;padding:5px 15px;border-radius:4px;border:1px solid #0f0}
.main{display:grid;grid-template-columns:1fr 400px;gap:30px}
.map{height:400px;border:1px solid #0f0;display:flex;align-items:center;justify-content:center;background:#010}
.logs{background:#010;padding:20px;border:1px solid #0f0;height:400px;overflow-y:auto}
.l{padding:5px 0;font-size:0.8rem;border-bottom:1px solid #020}`
  }
},

// ============================================================
// 🚛 LOGISTICS / FLEET TRACKER
// ============================================================
logistics: {
  keywords: ['logistics', 'fleet', 'truck', 'tracking', 'delivery', 'lojistik', 'filo', 'teslimat'],
  projectName: 'xeyal-cargo',
  files: {
    'index.html': `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>Logistics</title><link rel="stylesheet" href="style.css"></head>
<body><div class="app"><aside><h2>CargoFlow</h2><div class="nav">Vehicles</div><div class="nav">Active Routes</div></aside>
<main><h1>Fleet Overview</h1><div class="stats"><div class="s">Active Trucks<br><b>142</b></div><div class="s">On-time Rate<br><b>98.4%</b></div></div>
<div class="map">ROUTE TRACKER CANVAS</div></main></div></body></html>`,
    'style.css': `*{box-sizing:border-box;margin:0;padding:0}body{background:#f8fafc;color:#0f172a;font-family:'Inter',sans-serif}
.app{display:grid;grid-template-columns:240px 1fr;height:100vh}
aside{background:#1e293b;color:#fff;padding:40px}.nav{padding:15px 0;opacity:0.7;cursor:pointer}
main{padding:40px}.stats{display:flex;gap:20px;margin:30px 0}.s{flex:1;background:#fff;padding:20px;border-radius:12px;border:1px solid #e2e8f0}
.map{height:300px;background:#e2e8f0;border-radius:16px;display:flex;align-items:center;justify-content:center;color:#64748b}`
  }
},

// ============================================================
// 🏙️ SMART CITY DASHBOARD
// ============================================================
smart_city: {
  keywords: ['smart city', 'iot', 'traffic', 'energy', 'environment', 'akıllı şehir', 'trafik', 'enerji'],
  projectName: 'city-core',
  files: {
    'index.html': `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>CityCore</title><link rel="stylesheet" href="style.css"></head>
<body><div class="app"><header><h1>CityCore Dashboard</h1><span>London, UK | 14:00</span></header>
<div class="grid"><div class="card">🚦 Traffic Flow<br><b>Smooth</b></div><div class="card">🌬️ Air Quality<br><b>Excellent (12)</b></div>
<div class="card">⚡ Energy Load<br><b>Normal</b></div><div class="card">🚯 Waste Level<br><b>45%</b></div></div></div></body></html>`,
    'style.css': `*{box-sizing:border-box;margin:0;padding:0}body{background:#f0f9ff;color:#0c4a6e;font-family:'Inter',sans-serif;padding:60px;display:flex;justify-content:center}
.app{width:100%;max-width:600px}header{margin-bottom:40px;text-align:center}header span{opacity:0.6;font-size:0.9rem}
.grid{display:grid;grid-template-columns:1fr 1fr;gap:20px}.card{background:#fff;padding:30px;border-radius:24px;border:1px solid #bae6fd;font-weight:700}
.card b{display:block;margin-top:10px;font-size:1.2rem;color:#0284c7}`
  }
},

// ============================================================
// 💎 NFT MARKETPLACE
// ============================================================
nft_market: {
  keywords: ['nft', 'crypto art', 'blockchain', 'web3', 'mint', 'collectibles', 'dijital sanat', 'pazar yeri'],
  projectName: 'x-mint',
  files: {
    'index.html': `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>X-Mint</title><link rel="stylesheet" href="style.css"></head>
<body><nav><b>X-MINT</b><button>Connect Wallet</button></nav><header><h1>Collect rare digital art.</h1></header>
<div class="grid"><div class="n"><div class="art"></div><h4>Cyber Punk #01</h4><span>2.4 ETH</span></div>
<div class="n"><div class="art"></div><h4>Future Ape #42</h4><span>1.8 ETH</span></div></div></body></html>`,
    'style.css': `*{box-sizing:border-box;margin:0;padding:0}body{background:#000;color:#fff;font-family:'Outfit',sans-serif}
nav{padding:20px 40px;display:flex;justify-content:space-between;align-items:center;border-bottom:1px solid #222}
header{padding:80px 40px;text-align:center}h1{font-size:3rem;background:linear-gradient(to right,#6366f1,#a855f7);-webkit-background-clip:text;-webkit-text-fill-color:transparent}
.grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(250px,1fr));gap:30px;padding:40px}
.n{background:#111;padding:20px;border-radius:24px;border:1px solid #222}.art{aspect-ratio:1;background:#222;border-radius:16px;margin-bottom:20px}
h4{margin-bottom:10px}span{color:#a855f7;font-weight:900}button{background:#fff;color:#000;border:none;padding:10px 20px;border-radius:50px;font-weight:900;cursor:pointer}`
  }
},

// ============================================================
// 🧘 MEDITATION / ZEN APP
// ============================================================
zen_app: {
  keywords: ['meditation', 'zen', 'calm', 'sleep', 'relax', 'mindfulness', 'meditasyon', 'uyku', 'rahatlama'],
  projectName: 'zen-flow',
  files: {
    'index.html': `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>ZenFlow</title><link rel="stylesheet" href="style.css"></head>
<body><div class="app"><h1>Peace of Mind</h1><div class="timer">10:00</div>
<div class="sounds"><div class="s">Rain</div><div class="s active">Forest</div><div class="s">Waves</div></div><button>Start Session</button></div></body></html>`,
    'style.css': `*{box-sizing:border-box;margin:0;padding:0}body{background:#f0f4f8;color:#2d3748;font-family:'Inter',sans-serif;display:flex;justify-content:center;padding-top:100px}
.app{width:320px;text-align:center}h1{font-weight:300;margin-bottom:60px;letter-spacing:2px}
.timer{font-size:4rem;font-weight:100;margin-bottom:60px}.sounds{display:flex;justify-content:center;gap:15px;margin-bottom:60px}
.s{padding:10px 20px;background:#fff;border-radius:50px;font-size:0.8rem;cursor:pointer}.s.active{background:#2d3748;color:#fff}
button{width:100%;padding:15px;background:#2d3748;color:#fff;border:none;border-radius:12px;font-weight:700;cursor:pointer;letter-spacing:1px}`
  }
},

// ============================================================
// 📁 INTERNAL HR PORTAL
// ============================================================
hr_portal: {
  keywords: ['hr', 'portal', 'employees', 'payroll', 'vacation', 'ik portal', 'çalışanlar', 'maaş', 'izin'],
  projectName: 'team-core',
  files: {
    'index.html': `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>TeamCore HR</title><link rel="stylesheet" href="style.css"></head>
<body><div class="app"><nav><h2>TeamCore</h2></nav><div class="main">
<div class="card"><h3>Welcome, John</h3><p>You have 12 days of vacation remaining.</p></div>
<div class="actions"><div class="a">Request Time Off</div><div class="a">View Payslip</div><div class="a">Company Directory</div></div></div></div></body></html>`,
    'style.css': `*{box-sizing:border-box;margin:0;padding:0}body{background:#f8fafc;color:#1e293b;font-family:'Inter',sans-serif}
nav{padding:20px 40px;background:#fff;border-bottom:1px solid #e2e8f0}.main{padding:40px;max-width:800px;margin:0 auto}
.card{background:#0f172a;color:#fff;padding:40px;border-radius:24px;margin-bottom:30px}h3{margin-bottom:10px}
.actions{display:grid;grid-template-columns:repeat(3,1fr);gap:20px}.a{background:#fff;padding:25px;border-radius:16px;border:1px solid #e2e8f0;text-align:center;font-weight:700;cursor:pointer}`
  }
},

// ============================================================
// 📞 CONFERENCE CALL UI
// ============================================================
video_call: {
  keywords: ['video call', 'conference', 'zoom', 'meeting', 'video konferans', 'toplantı', 'görüntülü görüşme'],
  projectName: 'xeyal-meet',
  files: {
    'index.html': `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>XeyalMeet</title><link rel="stylesheet" href="style.css"></head>
<body><div class="grid"><div class="v">User A</div><div class="v">User B</div><div class="v">User C</div><div class="v me">You</div></div>
<div class="controls"><div class="c">🎤</div><div class="c">📹</div><div class="c leave">📞</div></div></body></html>`,
    'style.css': `*{box-sizing:border-box;margin:0;padding:0}body{background:#1a1a1a;color:#fff;font-family:'Inter',sans-serif}
.grid{display:grid;grid-template-columns:1fr 1fr;grid-template-rows:1fr 1fr;height:calc(100vh - 100px);gap:10px;padding:10px}
.v{background:#333;display:flex;align-items:center;justify-content:center;border-radius:12px;font-weight:700}.me{border:2px solid #3b82f6}
.controls{height:100px;background:#000;display:flex;justify-content:center;align-items:center;gap:30px}
.c{width:50px;height:50px;background:#333;border-radius:50%;display:flex;align-items:center;justify-content:center;cursor:pointer;font-size:1.5rem}
.leave{background:#ef4444}`
  }
},

// ============================================================
// 📰 GLOBAL NEWS PORTAL
// ============================================================
news_portal: {
  keywords: ['news', 'portal', 'magazine', 'blog', 'headlines', 'haber sitem', 'magazin', 'gündem'],
  projectName: 'x-news',
  files: {
    'index.html': `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>X-News</title><link rel="stylesheet" href="style.css"></head>
<body><nav><b>X-NEWS</b><span>Friday, April 24</span></nav>
<header><h1>The Global AI Revolution: What's Next?</h1><p>Experts weigh in on the impact of autonomous systems in 2026.</p></header>
<div class="grid"><div class="n"><h3>Tech</h3><p>New local LLM sets records.</p></div><div class="n"><h3>Finance</h3><p>Market hits all-time high.</p></div></div></body></html>`,
    'style.css': `*{box-sizing:border-box;margin:0;padding:0}body{background:#fff;color:#000;font-family:'Inter',sans-serif}
nav{padding:20px 40px;border-bottom:4px solid #000;display:flex;justify-content:space-between;align-items:center}
header{padding:60px 40px;border-bottom:1px solid #eee}h1{font-size:3.5rem;margin-bottom:20px;letter-spacing:-2px}
.grid{display:grid;grid-template-columns:1fr 1fr;gap:40px;padding:40px}.n h3{border-bottom:2px solid #ef4444;width:fit-content;margin-bottom:15px}`
  }
}

});
