/**
 * FORGE TEMPLATE REGISTRY — BATCH 8 (10 templates)
 * Fitness, Property, Podcast, Charity, Photography, Subscription, Status, Interview, Garden, Game Library
 */
Object.assign(window.FORGE_TEMPLATES, {

// ============================================================
// 🏋️ FITNESS COACH DASHBOARD
// ============================================================
fitness: {
  keywords: ['fitness', 'workout', 'coach', 'gym', 'training', 'spor', 'antrenman', 'koç', 'egzersiz'],
  projectName: 'fit-core',
  files: {
    'index.html': `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>FitCore</title><link rel="stylesheet" href="style.css"></head>
<body><div class="app"><header><h1>FitCore</h1><div class="u">User Profile</div></header>
<div class="stats"><div class="s">Daily Steps<br><b>8,420</b></div><div class="s">Calories<br><b>1,250</b></div><div class="s">Workouts<br><b>12</b></div></div>
<div class="today"><h3>Today's Plan</h3><div class="p"><span>Leg Day</span><b>45m</b></div><div class="p"><span>Cardio</span><b>20m</b></div></div></div></body></html>`,
    'style.css': `*{box-sizing:border-box;margin:0;padding:0}body{background:#000;color:#fff;font-family:'Inter',sans-serif;padding:60px;display:flex;justify-content:center}
.app{width:100%;max-width:500px}header{display:flex;justify-content:space-between;margin-bottom:40px}h1{letter-spacing:-1px}
.stats{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;margin-bottom:40px}
.s{background:#111;padding:20px;border-radius:16px;border:1px solid #222;text-align:center}b{color:#22c55e;font-size:1.2rem;display:block;margin-top:5px}
.today{background:#111;padding:30px;border-radius:24px;border:1px solid #222}
.p{display:flex;justify-content:space-between;padding:15px 0;border-bottom:1px solid #222}`
  }
},

// ============================================================
// 🏘️ PROPERTY MANAGEMENT
// ============================================================
property: {
  keywords: ['property', 'management', 'rent', 'landlord', 'tenant', 'mülk yönetimi', 'kira', 'emlak'],
  projectName: 'prop-manager',
  files: {
    'index.html': `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>PropManager</title><link rel="stylesheet" href="style.css"></head>
<body><div class="app"><aside><h3>PropManager</h3><nav><div>Properties</div><div>Tenants</div><div>Payments</div></nav></aside>
<main><h2>Overview</h2><div class="grid"><div class="c">Total Units<br><b>42</b></div><div class="c">Occupied<br><b>38</b></div><div class="c">Rent Collected<br><b>92%</b></div></div>
<div class="alerts"><h4>Maintenance Alerts</h4><div class="a">Unit 402: Leaking tap</div></div></main></div></body></html>`,
    'style.css': `*{box-sizing:border-box;margin:0;padding:0}body{background:#f8fafc;color:#1e293b;font-family:'Inter',sans-serif}
.app{display:grid;grid-template-columns:220px 1fr;height:100vh}
aside{background:#0f172a;color:#fff;padding:30px}nav{margin-top:40px}nav div{padding:12px;opacity:0.6;cursor:pointer}
main{padding:40px}.grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;margin-top:30px}
.c{background:#fff;padding:25px;border-radius:12px;border:1px solid #e2e8f0}.alerts{margin-top:40px}
.a{padding:15px;background:#fff1f2;border-left:4px solid #ef4444;margin-top:10px;font-size:0.9rem}`
  }
},

// ============================================================
// 🎙️ PODCAST PLATFORM
// ============================================================
podcast: {
  keywords: ['podcast', 'audio', 'radio', 'streaming', 'episodes', 'ses', 'yayın', 'bölümler'],
  projectName: 'xeyal-cast',
  files: {
    'index.html': `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>XeyalCast</title><link rel="stylesheet" href="style.css"></head>
<body><nav><h1>X-CAST</h1></nav><header><h2>The Art of Coding</h2><button>Subscribe</button></header>
<div class="episodes"><h3>Episodes</h3><div class="e"><span>#12 - Future of AI</span><b>45:20</b></div><div class="e"><span>#11 - local LLMs</span><b>38:15</b></div></div>
<div class="player">▶ 00:00 / 45:20 🔈</div></body></html>`,
    'style.css': `*{box-sizing:border-box;margin:0;padding:0}body{background:#0a0a0a;color:#fff;font-family:'Inter',sans-serif}
nav{padding:20px 40px;border-bottom:1px solid #222}h1{font-size:1.2rem;letter-spacing:4px}
header{padding:60px 40px;background:linear-gradient(to right,#3b82f644,#000)}h2{font-size:2.5rem;margin-bottom:20px}
button{background:#fff;color:#000;border:none;padding:12px 30px;border-radius:50px;font-weight:900;cursor:pointer}
.episodes{padding:40px}h3{margin-bottom:20px;opacity:0.5}.e{display:flex;justify-content:space-between;padding:15px 0;border-bottom:1px solid #111;cursor:pointer}
.player{position:fixed;bottom:0;width:100%;background:#111;padding:20px;text-align:center;border-top:1px solid #222}`
  }
},

// ============================================================
// 🎗️ CHARITY / DONATION PAGE
// ============================================================
charity: {
  keywords: ['charity', 'donation', 'fundraise', 'nonprofit', 'bağış', 'yardım', 'kampanya'],
  projectName: 'care-share',
  files: {
    'index.html': `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>CareShare</title><link rel="stylesheet" href="style.css"></head>
<body><nav>CareShare</nav><div class="hero"><h1>Help those in need.</h1><div class="prog"><div class="bar" style="width:65%"></div></div><p>$12,400 raised of $20,000</p><button>Donate Now</button></div>
<section><h3>Our Missions</h3><div class="grid"><div class="m">Clean Water</div><div class="m">Education</div><div class="m">Food Security</div></div></section></body></html>`,
    'style.css': `*{box-sizing:border-box;margin:0;padding:0}body{background:#fff;color:#1e293b;font-family:'Inter',sans-serif}
nav{padding:20px 40px;font-weight:900;color:#059669}
.hero{background:#ecfdf5;padding:80px 40px;text-align:center}h1{font-size:3rem;margin-bottom:30px}
.prog{width:100%;max-width:500px;height:12px;background:#d1fae5;margin:20px auto;border-radius:10px;overflow:hidden}.bar{height:100%;background:#059669}
button{background:#059669;color:#fff;border:none;padding:15px 40px;border-radius:50px;font-weight:700;margin-top:30px;cursor:pointer}
section{padding:60px 40px;text-align:center}.grid{display:flex;justify-content:center;gap:20px;margin-top:30px}
.m{padding:20px;background:#f8fafc;border-radius:12px;flex:1;font-weight:600}`
  }
},

// ============================================================
// 📸 PHOTOGRAPHY PORTFOLIO
// ============================================================
photography: {
  keywords: ['photography', 'portfolio', 'gallery', 'photos', 'arts', 'fotoğrafçı', 'galeri', 'portfolyo'],
  projectName: 'eye-view',
  files: {
    'index.html': `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>EyeView</title><link rel="stylesheet" href="style.css"></head>
<body><nav>EYEVIEW</nav><div class="gallery"><div class="item h1"></div><div class="item"></div><div class="item"></div><div class="item h2"></div><div class="item"></div><div class="item"></div></div></body></html>`,
    'style.css': `*{box-sizing:border-box;margin:0;padding:0}body{background:#fff;color:#000;font-family:'Outfit',sans-serif}
nav{padding:40px;font-weight:900;letter-spacing:10px;text-align:center}
.gallery{display:grid;grid-template-columns:repeat(auto-fill,minmax(250px,1fr));grid-auto-rows:250px;gap:10px;padding:10px}
.item{background:#f3f4f6;transition:0.3s;cursor:pointer}.item:hover{opacity:0.8;transform:scale(0.98)}
.h1{grid-row:span 2}.h2{grid-column:span 2}`
  }
},

// ============================================================
// 💳 SUBSCRIPTION MANAGER
// ============================================================
subscriptions: {
  keywords: ['subscription', 'manager', 'bills', 'recurring', 'costs', 'abonelik', 'fatura', 'maliyet'],
  projectName: 'sub-track',
  files: {
    'index.html': `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>SubTrack</title><link rel="stylesheet" href="style.css"></head>
<body><div class="app"><h2>My Subscriptions</h2><div class="list">
<div class="s"><span>Netflix</span><b>$15.99/mo</b><small>Next: May 12</small></div>
<div class="s"><span>Spotify</span><b>$9.99/mo</b><small>Next: May 15</small></div>
<div class="s"><span>Adobe CC</span><b>$52.99/mo</b><small>Next: May 20</small></div></div>
<div class="total">Monthly Total: $78.97</div></div></body></html>`,
    'style.css': `*{box-sizing:border-box;margin:0;padding:0}body{background:#f8fafc;color:#0f172a;font-family:'Inter',sans-serif;padding:60px;display:flex;justify-content:center}
.app{width:360px}h2{margin-bottom:30px;letter-spacing:-1px}
.s{background:#fff;padding:20px;border-radius:16px;margin-bottom:15px;border:1px solid #e2e8f0;position:relative}
.s span{display:block;font-weight:700}.s b{display:block;color:#3b82f6;margin:5px 0}.s small{opacity:0.5;font-size:0.75rem}
.total{margin-top:40px;text-align:center;font-weight:900;font-size:1.2rem;background:#0f172a;color:#fff;padding:20px;border-radius:12px}`
  }
},

// ============================================================
// 🚦 SERVICE STATUS PAGE
// ============================================================
status_page: {
  keywords: ['status', 'uptime', 'monitoring', 'incident', 'server', 'durum sayfası', 'sunucu', 'hizmet'],
  projectName: 'x-status',
  files: {
    'index.html': `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>Status</title><link rel="stylesheet" href="style.css"></head>
<body><div class="app"><header><h1>System Status</h1><div class="all-ok">All Systems Operational</div></header>
<div class="services"><div class="svc"><span>API Gateway</span><b class="ok">Operational</b></div><div class="svc"><span>Auth Service</span><b class="ok">Operational</b></div><div class="svc"><span>Database</span><b class="ok">Operational</b></div></div>
<div class="history"><h3>Past Incidents</h3><p>No incidents reported in the last 30 days.</p></div></div></body></html>`,
    'style.css': `*{box-sizing:border-box;margin:0;padding:0}body{background:#fff;color:#18181b;font-family:'Inter',sans-serif;padding:80px;display:flex;justify-content:center}
.app{width:100%;max-width:600px}header{display:flex;justify-content:space-between;align-items:center;margin-bottom:60px}
.all-ok{background:#22c55e;color:#fff;padding:8px 16px;border-radius:50px;font-size:0.85rem;font-weight:700}
.svc{display:flex;justify-content:space-between;padding:20px;background:#f4f4f5;border-radius:12px;margin-bottom:10px}
.ok{color:#22c55e}.history{margin-top:60px;padding-top:40px;border-top:1px solid #e4e4e7}h3{margin-bottom:20px}`
  }
},

// ============================================================
// 👨‍🏫 JOB INTERVIEW PREP
// ============================================================
interview_prep: {
  keywords: ['interview', 'prep', 'questions', 'career', 'study', 'mülakat', 'hazırlık', 'sorular', 'kariyer'],
  projectName: 'ace-interview',
  files: {
    'index.html': `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>AceInterview</title><link rel="stylesheet" href="style.css"></head>
<body><div class="app"><h1>Interview Prep</h1><div class="card"><h3>Q: What is a closure in JS?</h3><div class="ans hidden">A closure is the combination of a function bundled together with references to its surrounding state.</div><button onclick="this.previousElementSibling.classList.toggle('hidden')">Show Answer</button></div>
<div class="prog">Progress: 12/50 questions</div></div></body></html>`,
    'style.css': `*{box-sizing:border-box;margin:0;padding:0}body{background:#fdfaff;color:#2e1065;font-family:'Inter',sans-serif;padding:80px;display:flex;justify-content:center}
.app{width:400px}h1{margin-bottom:40px;text-align:center}.card{background:#fff;padding:30px;border-radius:24px;border:1px solid #f3e8ff;box-shadow:0 10px 15px rgba(0,0,0,0.02)}
h3{margin-bottom:20px;font-size:1.1rem}.ans{padding:15px;background:#faf5ff;border-radius:12px;font-size:0.9rem;margin-bottom:20px}
.hidden{display:none}button{width:100%;padding:12px;border-radius:8px;border:none;background:#7c3aed;color:#fff;font-weight:700;cursor:pointer}
.prog{margin-top:40px;text-align:center;font-size:0.85rem;opacity:0.6}`
  }
},

// ============================================================
// 🌿 GARDEN / PLANT CARE
// ============================================================
garden_care: {
  keywords: ['garden', 'plants', 'nature', 'care', 'water', 'bahçe', 'bitki', 'bakım', 'sulama'],
  projectName: 'green-thumb',
  files: {
    'index.html': `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>GreenThumb</title><link rel="stylesheet" href="style.css"></head>
<body><div class="app"><header><h1>My Garden</h1></header><div class="plants">
<div class="p"><div class="img">🌿</div><h4>Monstera</h4><span>Water in 2 days</span></div>
<div class="p"><div class="img">🌵</div><h4>Cactus</h4><span>Water in 12 days</span></div></div></div></body></html>`,
    'style.css': `*{box-sizing:border-box;margin:0;padding:0}body{background:#f0fdf4;color:#166534;font-family:'Inter',sans-serif;padding:60px;display:flex;justify-content:center}
.app{width:100%;max-width:400px}header{margin-bottom:40px;text-align:center}
.plants{display:grid;grid-template-columns:1fr 1fr;gap:20px}.p{background:#fff;padding:25px;border-radius:24px;text-align:center;border:1px solid #dcfce7}
.img{font-size:3rem;margin-bottom:15px}h4{margin-bottom:5px}span{font-size:0.8rem;opacity:0.6}`
  }
},

// ============================================================
// 🎮 GAME LIBRARY (STEAM-LIKE)
// ============================================================
game_library: {
  keywords: ['game', 'library', 'steam', 'collection', 'play', 'oyun', 'kütüphane', 'koleksiyon'],
  projectName: 'x-games',
  files: {
    'index.html': `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>X-Games</title><link rel="stylesheet" href="style.css"></head>
<body><nav>X-GAMES</nav><div class="hero"><h2>Summer Sale is Live!</h2></div>
<div class="grid"><div class="g"><div class="poster"></div><h4>Cyberpunk 2077</h4><span>Action RPG</span></div>
<div class="g"><div class="poster"></div><h4>Elden Ring</h4><span>Soulslike</span></div></div></body></html>`,
    'style.css': `*{box-sizing:border-box;margin:0;padding:0}body{background:#0b0e14;color:#fff;font-family:'Inter',sans-serif}
nav{padding:20px 40px;background:#171a21;font-weight:900;letter-spacing:2px}
.hero{height:300px;background:linear-gradient(to bottom,transparent,#171a21),#2a475e;display:flex;align-items:flex-end;padding:40px}
.grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:20px;padding:40px}
.g{background:#171a21;padding:15px;border-radius:8px;transition:0.2s}.g:hover{background:#1b2838;transform:translateY(-5px)}
.poster{aspect-ratio:2/3;background:#2a475e;border-radius:4px;margin-bottom:15px}h4{font-size:0.9rem}span{font-size:0.75rem;opacity:0.5}`
  }
}

});
