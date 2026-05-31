/**
 * FORGE TEMPLATE REGISTRY — BATCH 7 (10 templates)
 * VPN, Smart Home, Video Editor, Code Editor, Event, Restaurant, Car Rental, Clinic, Banking, LMS Course
 */
Object.assign(window.FORGE_TEMPLATES, {

// ============================================================
// 🛡️ VPN / NETWORK DASHBOARD
// ============================================================
vpn: {
  keywords: ['vpn', 'network', 'proxy', 'security', 'ip', 'bağlantı', 'güvenlik', 'ağ'],
  projectName: 'secure-link',
  files: {
    'index.html': `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>SecureLink VPN</title><link rel="stylesheet" href="style.css"></head>
<body><div class="app"><div class="status">Disconnected</div><div class="main-btn" onclick="this.parentElement.classList.toggle('connected')"><span>POWER</span></div>
<div class="info"><div>IP: 192.168.1.1</div><div>Location: New York, USA</div></div><div class="loc-list"><h4>Select Location</h4><div class="l active">🇺🇸 USA</div><div class="l">🇬🇧 UK</div><div class="l">🇩🇪 Germany</div></div></div></body></html>`,
    'style.css': `*{box-sizing:border-box;margin:0;padding:0}body{background:#06060f;color:#fff;font-family:'Inter',sans-serif;display:flex;justify-content:center;padding-top:80px}
.app{width:320px;text-align:center}.status{font-size:0.8rem;opacity:0.6;margin-bottom:40px;letter-spacing:2px}
.main-btn{width:120px;height:120px;border-radius:50%;background:#1e1e2d;border:4px solid #333;margin:0 auto 40px;display:flex;align-items:center;justify-content:center;cursor:pointer;transition:0.3s}
.main-btn span{font-size:0.7rem;font-weight:900}.connected .main-btn{background:#3b82f6;border-color:#fff;box-shadow:0 0 30px #3b82f6}
.connected .status{color:#3b82f6;opacity:1;content:'Connected'}
.info{background:#111;padding:20px;border-radius:16px;display:flex;justify-content:space-between;font-size:0.75rem;margin-bottom:40px}
.loc-list{text-align:left}h4{font-size:0.8rem;margin-bottom:15px;opacity:0.5}.l{padding:12px;background:#111;border-radius:8px;margin-bottom:8px;font-size:0.9rem;cursor:pointer}
.l.active{border:1px solid #3b82f6}`
  }
},

// ============================================================
// 🏠 SMART HOME CONTROL
// ============================================================
smarthome: {
  keywords: ['smart home', 'iot', 'lights', 'ac', 'security camera', 'akıllı ev', 'kontrol', 'ışıklar'],
  projectName: 'home-core',
  files: {
    'index.html': `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>HomeCore</title><link rel="stylesheet" href="style.css"></head>
<body><div class="app"><header><h2>Living Room</h2><span>24°C • Sunny</span></header>
<div class="grid"><div class="card active">💡 Lights<br><b>ON</b></div><div class="card">❄️ AC<br><b>OFF</b></div><div class="card">🔒 Security<br><b>ARMED</b></div><div class="card">🎵 Music<br><b>IDLE</b></div></div>
<div class="scene"><h4>SCENES</h4><div class="s">Movie Night</div><div class="s">Good Morning</div></div></div></body></html>`,
    'style.css': `*{box-sizing:border-box;margin:0;padding:0}body{background:#f8fafc;color:#0f172a;font-family:'Inter',sans-serif;padding:40px;display:flex;justify-content:center}
.app{width:100%;max-width:400px}header{margin-bottom:40px}header span{font-size:0.85rem;color:#64748b}
.grid{display:grid;grid-template-columns:1fr 1fr;gap:20px;margin-bottom:40px}
.card{background:#fff;padding:25px;border-radius:24px;box-shadow:0 10px 15px rgba(0,0,0,0.02);border:1px solid #e2e8f0;font-size:0.9rem}
.card.active{background:#0f172a;color:#fff;border-color:#0f172a}.card b{display:block;margin-top:10px;font-size:1.1rem}
h4{font-size:0.8rem;letter-spacing:1px;margin-bottom:20px;opacity:0.5}.scene{display:flex;gap:15px}
.s{padding:15px;background:#fff;border-radius:12px;flex:1;text-align:center;font-size:0.85rem;font-weight:700;cursor:pointer;border:1px solid #e2e8f0}`
  }
},

// ============================================================
// 🎬 VIDEO EDITOR UI
// ============================================================
video_editor: {
  keywords: ['video', 'editor', 'timeline', 'cuts', 'media', 'film düzenleme', 'kurgu', 'montaj'],
  projectName: 'xeyal-cut',
  files: {
    'index.html': `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>XeyalCut</title><link rel="stylesheet" href="style.css"></head>
<body><div class="app"><div class="top"><div class="media">Media Library</div><div class="preview">Preview Player</div></div>
<div class="timeline"><div class="tools">✂️ 🖐️ 🔍</div><div class="tracks"><div class="track">Clip_01.mp4</div><div class="track">Audio_01.wav</div></div></div></div></body></html>`,
    'style.css': `*{box-sizing:border-box;margin:0;padding:0}body{background:#111;color:#aaa;font-family:'Inter',sans-serif;height:100vh}
.app{display:grid;grid-template-rows:1fr 200px;height:100%}
.top{display:grid;grid-template-columns:300px 1fr;border-bottom:1px solid #333}
.media{background:#181818;padding:20px;border-right:1px solid #333}
.preview{background:#000;display:flex;align-items:center;justify-content:center;color:#fff}
.timeline{background:#181818;padding:20px}.tools{margin-bottom:20px;font-size:1.5rem}
.track{height:40px;background:#3b82f644;border:1px solid #3b82f6;border-radius:4px;margin-bottom:10px;padding:10px;font-size:0.8rem;color:#fff}`
  }
},

// ============================================================
// 💻 CODE PLAYGROUND
// ============================================================
playground: {
  keywords: ['code', 'playground', 'ide', 'editor', 'javascript', 'html', 'css', 'kod', 'editör'],
  projectName: 'live-code',
  files: {
    'index.html': `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>LiveCode</title><link rel="stylesheet" href="style.css"></head>
<body><nav><b>LiveCode</b><button>Run</button></nav><div class="app"><div class="editor"><code>function hello() {<br>&nbsp;&nbsp;console.log("Hello World");<br>}</code></div>
<div class="output">Output:<br>> Hello World</div></div></body></html>`,
    'style.css': `*{box-sizing:border-box;margin:0;padding:0}body{background:#0f172a;color:#94a3b8;font-family:monospace}
nav{padding:15px;background:#1e293b;display:flex;justify-content:space-between;align-items:center;color:#fff}
button{background:#10b981;color:#fff;border:none;padding:8px 20px;border-radius:4px;cursor:pointer}
.app{display:grid;grid-template-columns:1fr 1fr;height:calc(100vh - 60px)}
.editor{padding:40px;font-size:1.1rem;color:#e2e8f0;border-right:1px solid #334155}
.output{padding:40px;background:#000;color:#10b981;font-size:1rem}`
  }
},

// ============================================================
// 📅 EVENT LANDING PAGE
// ============================================================
event_page: {
  keywords: ['event', 'conference', 'tickets', 'meeting', 'landing', 'konferans', 'etkinlik', 'bilet'],
  projectName: 'tech-summit-2026',
  files: {
    'index.html': `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>TechSummit</title><link rel="stylesheet" href="style.css"></head>
<body><nav>TECHSUMMIT'26</nav><header><h1>The Future of AI.</h1><p>Join us in London for 3 days of intensive coding and workshops.</p><button>Register Now</button></header>
<div class="speakers"><h3>Speakers</h3><div class="s-grid"><div class="s"><b>Dr. Xeyal</b><span>AI Specialist</span></div><div class="s"><b>Jane Doe</b><span>UX Lead</span></div></div></div></body></html>`,
    'style.css': `*{box-sizing:border-box;margin:0;padding:0}body{background:#fff;color:#0f172a;font-family:'Outfit',sans-serif}
nav{padding:30px;font-weight:900;letter-spacing:2px}
header{padding:100px 40px;text-align:center;background:#0f172a;color:#fff}
h1{font-size:4rem;margin-bottom:20px}p{font-size:1.2rem;opacity:0.7;margin-bottom:40px}
button{padding:15px 40px;background:#fff;color:#000;border:none;border-radius:50px;font-weight:900;cursor:pointer}
.speakers{padding:80px 40px}h3{margin-bottom:40px;font-size:2rem;text-align:center}
.s-grid{display:flex;justify-content:center;gap:40px}.s{text-align:center}
.s b{display:block;font-size:1.2rem}.s span{opacity:0.6}`
  }
},

// ============================================================
// 🍽️ RESTAURANT RESERVATION
// ============================================================
restaurant: {
  keywords: ['restaurant', 'food', 'menu', 'reservation', 'table', 'yemek', 'restoran', 'rezervasyon', 'masa'],
  projectName: 'fine-dine',
  files: {
    'index.html': `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>FineDine</title><link rel="stylesheet" href="style.css"></head>
<body><nav><h1>FineDine</h1></nav><header><h2>Exquisite Flavors</h2><p>Reserve your table for an unforgettable evening.</p></header>
<div class="form"><input type="date"><select><option>2 Persons</option><option>4 Persons</option></select><button>Book Now</button></div>
<div class="menu"><h3>Chef's Specials</h3><div class="m-item">Grilled Salmon<span>$32</span></div><div class="m-item">Truffle Pasta<span>$28</span></div></div></body></html>`,
    'style.css': `*{box-sizing:border-box;margin:0;padding:0}body{background:#fff;color:#1a1a1a;font-family:'Inter',sans-serif}
nav{padding:20px;text-align:center;border-bottom:1px solid #eee}h1{font-style:italic;letter-spacing:4px}
header{padding:60px 20px;text-align:center;background:#fafafa}h2{font-size:2.5rem;margin-bottom:10px}
.form{display:flex;justify-content:center;gap:10px;margin:-30px auto 60px;max-width:500px;background:#fff;padding:20px;box-shadow:0 10px 30px rgba(0,0,0,0.1);border-radius:8px}
input,select{padding:12px;border:1px solid #ddd;border-radius:4px}button{background:#1a1a1a;color:#fff;border:none;padding:12px 25px;border-radius:4px;cursor:pointer}
.menu{max-width:600px;margin:0 auto;padding:0 20px}.m-item{display:flex;justify-content:space-between;padding:15px 0;border-bottom:1px solid #f5f5f5}`
  }
},

// ============================================================
// 🚗 CAR RENTAL DASHBOARD
// ============================================================
car_rental: {
  keywords: ['car', 'rental', 'auto', 'fleet', 'booking', 'araç kiralama', 'otomobil', 'filo', 'araba'],
  projectName: 'x-drive',
  files: {
    'index.html': `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>X-Drive</title><link rel="stylesheet" href="style.css"></head>
<body><nav>X-DRIVE</nav><div class="hero"><h2>Rent the Best.</h2></div>
<div class="cars"><div class="c-card"><div class="img"></div><h4>Tesla Model S</h4><span>$120/day</span><button>Rent</button></div>
<div class="c-card"><div class="img"></div><h4>Porsche 911</h4><span>$250/day</span><button>Rent</button></div></div></body></html>`,
    'style.css': `*{box-sizing:border-box;margin:0;padding:0}body{background:#f3f4f6;color:#111827;font-family:'Inter',sans-serif}
nav{padding:20px 40px;font-weight:900;letter-spacing:1px;background:#fff}
.hero{height:200px;background:#000;color:#fff;display:flex;align-items:center;justify-content:center}
.cars{display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:30px;padding:40px}
.c-card{background:#fff;padding:20px;border-radius:16px;text-align:center}.img{height:150px;background:#e5e7eb;margin-bottom:20px;border-radius:12px}
h4{font-size:1.1rem;margin-bottom:10px}span{color:#3b82f6;font-weight:700;display:block;margin-bottom:20px}
button{width:100%;padding:12px;background:#000;color:#fff;border:none;border-radius:8px;font-weight:700;cursor:pointer}`
  }
},

// ============================================================
// 🏥 CLINIC MANAGEMENT
// ============================================================
clinic: {
  keywords: ['clinic', 'hospital', 'doctor', 'patient', 'health', 'klinik', 'hastane', 'doktor', 'sağlık'],
  projectName: 'care-point',
  files: {
    'index.html': `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>CarePoint</title><link rel="stylesheet" href="style.css"></head>
<body><div class="app"><aside><h2>CarePoint</h2><div class="m">Dashboard</div><div class="m">Patients</div><div class="m">Schedule</div></aside>
<main><header><h3>Overview</h3></header><div class="stats"><div class="s">Today's Visits<br><b>24</b></div><div class="s">Pending Results<br><b>8</b></div></div>
<div class="list"><h4>Upcoming Appointments</h4><div class="a"><span>John Smith</span><b>10:30 AM</b></div><div class="a"><span>Jane Doe</span><b>11:15 AM</b></div></div></main></div></body></html>`,
    'style.css': `*{box-sizing:border-box;margin:0;padding:0}body{background:#f0f9ff;color:#0c4a6e;font-family:'Inter',sans-serif}
.app{display:grid;grid-template-columns:220px 1fr;height:100vh}
aside{background:#fff;padding:30px;border-right:1px solid #bae6fd}.m{padding:12px;margin-bottom:10px;cursor:pointer;font-size:0.9rem}
main{padding:40px}.stats{display:flex;gap:20px;margin:30px 0}.s{flex:1;background:#fff;padding:20px;border-radius:12px;border:1px solid #bae6fd}
.list{background:#fff;padding:25px;border-radius:16px;border:1px solid #bae6fd}.a{display:flex;justify-content:space-between;padding:12px 0;border-bottom:1px solid #f0f9ff}`
  }
},

// ============================================================
// 💳 BANK ACCOUNT OVERVIEW
// ============================================================
banking: {
  keywords: ['bank', 'finance', 'account', 'money', 'wallet', 'banka', 'finans', 'hesap', 'para', 'cüzdan'],
  projectName: 'x-bank',
  files: {
    'index.html': `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>X-Bank</title><link rel="stylesheet" href="style.css"></head>
<body><div class="app"><div class="card"><span>Total Balance</span><h1>$12,450.80</h1><p>**** **** **** 4021</p></div>
<div class="actions"><button>Send</button><button>Receive</button><button>Pay</button></div>
<div class="txs"><h3>Recent Transactions</h3><div class="tx"><span>Amazon.com</span><b>-$42.00</b></div><div class="tx"><span>Salary</span><b style="color:#22c55e">+$4,500.00</b></div></div></div></body></html>`,
    'style.css': `*{box-sizing:border-box;margin:0;padding:0}body{background:#fff;color:#0f172a;font-family:'Inter',sans-serif;display:flex;justify-content:center;padding-top:60px}
.app{width:360px}.card{background:linear-gradient(135deg,#1e293b,#0f172a);color:#fff;padding:30px;border-radius:24px;margin-bottom:30px}
h1{margin:10px 0 20px}.actions{display:flex;gap:10px;margin-bottom:40px}
button{flex:1;padding:12px;border-radius:12px;border:1px solid #e2e8f0;background:#fff;font-weight:700;cursor:pointer}
.txs h3{font-size:1rem;margin-bottom:20px}.tx{display:flex;justify-content:space-between;padding:15px 0;border-bottom:1px solid #f1f5f9}`
  }
},

// ============================================================
// 🎓 LMS COURSE VIEW
// ============================================================
course_view: {
  keywords: ['course', 'learning', 'video lessons', 'education', 'lms', 'eğitim', 'ders izleme', 'kurs'],
  projectName: 'skill-watch',
  files: {
    'index.html': `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>Course View</title><link rel="stylesheet" href="style.css"></head>
<body><div class="app"><main><div class="video">PLAYER</div><h1>1. Introduction to AI Forge</h1><p>Learn how to scaffold projects in seconds.</p></main>
<aside><h3>Course Content</h3><div class="l active">1. Introduction</div><div class="l">2. Setup Environment</div><div class="l">3. First Deployment</div></aside></div></body></html>`,
    'style.css': `*{box-sizing:border-box;margin:0;padding:0}body{background:#f8fafc;color:#1e293b;font-family:'Inter',sans-serif}
.app{display:grid;grid-template-columns:1fr 300px;height:100vh}
main{padding:40px}.video{aspect-ratio:16/9;background:#000;border-radius:12px;margin-bottom:30px;display:flex;align-items:center;justify-content:center;color:#fff}
aside{background:#fff;padding:30px;border-left:1px solid #e2e8f0}h3{margin-bottom:25px;font-size:1.1rem}
.l{padding:12px;border-radius:8px;margin-bottom:8px;font-size:0.9rem;cursor:pointer}.l.active{background:#f1f5f9;font-weight:700;color:#3b82f6}`
  }
}

});
