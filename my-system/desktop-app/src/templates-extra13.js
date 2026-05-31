/**
 * FORGE TEMPLATE REGISTRY — BATCH 13 (121-130)
 * Pet, Neighborhood, Forum, Sneakers, Sub-Box, Crowdfund, Referral, Volunteer, Tickets, Auth
 */
Object.assign(window.FORGE_TEMPLATES, {

// ============================================================
// 🐾 PET ADOPTION PORTAL
// ============================================================
pet_adoption: {
  keywords: ['pet', 'adoption', 'animals', 'dogs', 'cats', 'shelter', 'hayvan sahiplenme', 'barınak', 'evcil hayvan'],
  projectName: 'paw-match',
  files: {
    'index.html': `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>PawMatch</title><link rel="stylesheet" href="style.css"></head>
<body><nav>PawMatch</nav><header><h1>Find your best friend.</h1></header>
<div class="grid"><div class="p"><div class="img"></div><h4>Buddy (Golden)</h4><button>Adopt Me</button></div>
<div class="p"><div class="img"></div><h4>Luna (Cat)</h4><button>Adopt Me</button></div></div></body></html>`,
    'style.css': `*{box-sizing:border-box;margin:0;padding:0}body{background:#fff7ed;color:#7c2d12;font-family:'Inter',sans-serif}
nav{padding:20px 40px;background:#fff;font-weight:900}header{padding:60px 40px;text-align:center}
.grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:30px;padding:40px}
.p{background:#fff;padding:20px;border-radius:24px;text-align:center;border:1px solid #ffedd5}.img{aspect-ratio:1;background:#ffedd5;border-radius:16px;margin-bottom:15px}
button{width:100%;padding:10px;background:#f97316;color:#fff;border:none;border-radius:8px;font-weight:700;cursor:pointer}`
  }
},

// ============================================================
// 👟 SNEAKER DROPS UI
// ============================================================
sneaker_drops: {
  keywords: ['sneakers', 'drops', 'hype', 'shoes', 'raffles', 'ayakkabı', 'stok', 'çekiliş', 'sneakerhead'],
  projectName: 'x-drops',
  files: {
    'index.html': `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>X-Drops</title><link rel="stylesheet" href="style.css"></head>
<body><div class="app"><h1>Upcoming Drops</h1><div class="list">
<div class="item"><span>Apr 26</span><h4>Jordan 1 Retro</h4><p>$180</p><button>Enter Raffle</button></div>
<div class="item"><span>May 02</span><h4>Yeezy Boost</h4><p>$220</p><button disabled>Sold Out</button></div></div></div></body></html>`,
    'style.css': `*{box-sizing:border-box;margin:0;padding:0}body{background:#000;color:#fff;font-family:'Inter',sans-serif;padding:60px;display:flex;justify-content:center}
.app{width:100%;max-width:400px}h1{margin-bottom:40px;letter-spacing:-1px}.list{display:flex;flex-direction:column;gap:15px}
.item{background:#111;padding:25px;border-radius:16px;border:1px solid #222}span{color:#ef4444;font-weight:900;font-size:0.8rem}
h4{margin:10px 0}p{opacity:0.6;margin-bottom:20px}button{width:100%;padding:12px;background:#fff;color:#000;border:none;border-radius:8px;font-weight:900;cursor:pointer}`
  }
},

// ============================================================
// 🏘️ NEIGHBORHOOD WATCH NETWORK
// ============================================================
neighborhood_watch: {
  keywords: ['neighborhood', 'watch', 'security', 'community', 'alerts', 'mahalle', 'güvenlik', 'dayanışma', 'bildirim'],
  projectName: 'x-watch',
  files: {
    'index.html': `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>X-Watch</title><link rel="stylesheet" href="style.css"></head>
<body><div class="app"><header><h1>X-Watch: Central</h1><div class="status">System: Secure</div></header>
<div class="feed"><h3>Recent Activity</h3><div class="a warning">Suspicious vehicle reported at Main St.<span>2m ago</span></div><div class="a">Street lights repaired.<span>1h ago</span></div></div>
<button class="alert">Report Incident</button></div></body></html>`,
    'style.css': `*{box-sizing:border-box;margin:0;padding:0}body{background:#f8fafc;color:#0f172a;font-family:'Inter',sans-serif;padding:60px;display:flex;justify-content:center}
.app{width:100%;max-width:400px}header{margin-bottom:40px;display:flex;justify-content:space-between;align-items:center}.status{background:#dcfce7;color:#166534;padding:5px 12px;border-radius:50px;font-size:0.75rem;font-weight:700}
.feed{background:#fff;padding:25px;border-radius:24px;border:1px solid #e2e8f0;margin-bottom:30px}.a{padding:15px 0;border-bottom:1px solid #f1f5f9;font-size:0.9rem}
.a.warning{color:#ef4444}.a span{display:block;font-size:0.75rem;opacity:0.5;margin-top:5px}.alert{width:100%;padding:15px;background:#ef4444;color:#fff;border:none;border-radius:12px;font-weight:700;cursor:pointer}`
  }
},

// ============================================================
// 💬 COMMUNITY FORUM
// ============================================================
community_forum: {
  keywords: ['forum', 'community', 'board', 'discussion', 'topics', 'forum sitesi', 'tartışma', 'topluluk'],
  projectName: 'x-board',
  files: {
    'index.html': `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>X-Board</title><link rel="stylesheet" href="style.css"></head>
<body><nav>X-BOARD</nav><div class="app"><div class="cats"><div class="c">General</div><div class="c active">Tech Talk</div><div class="c">Events</div></div>
<div class="topics"><div class="t"><h4>Best VS Code extensions?</h4><span>By JohnDoe | 12 replies</span></div><div class="t"><h4>How to build 200 templates?</h4><span>By Xeyal | 45 replies</span></div></div></div></body></html>`,
    'style.css': `*{box-sizing:border-box;margin:0;padding:0}body{background:#f1f5f9;color:#334155;font-family:'Inter',sans-serif}
nav{padding:20px 40px;background:#fff;border-bottom:1px solid #e2e8f0;font-weight:900}.app{display:grid;grid-template-columns:200px 1fr;gap:40px;padding:40px;max-width:1000px;margin:0 auto}
.cats div{padding:12px;margin-bottom:10px;cursor:pointer}.c.active{background:#fff;border-radius:8px;font-weight:700;color:#0f172a}
.topics{display:flex;flex-direction:column;gap:15px}.t{background:#fff;padding:25px;border-radius:16px;border:1px solid #e2e8f0}span{font-size:0.8rem;opacity:0.6;margin-top:10px;display:block}`
  }
},

// ============================================================
// 📦 SUBSCRIPTION BOX MANAGER
// ============================================================
sub_box_mgr: {
  keywords: ['subscription', 'box', 'ecommerce', 'delivery', 'membership', 'abonelik kutusu', 'yönetim', 'seçim'],
  projectName: 'x-box',
  files: {
    'index.html': `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>X-Box</title><link rel="stylesheet" href="style.css"></head>
<body><div class="app"><h1>My Subscription</h1><div class="card"><h3>April Box: Coffee Lovers</h3><p>Status: Shipped</p><button>Customize Next Box</button></div>
<div class="history"><h3>Past Boxes</h3><div class="h">March: Green Tea</div><div class="h">February: Dark Roast</div></div></div></body></html>`,
    'style.css': `*{box-sizing:border-box;margin:0;padding:0}body{background:#fff;color:#431407;font-family:'Inter',sans-serif;padding:60px;display:flex;justify-content:center}
.app{width:360px}h1{margin-bottom:40px}.card{background:#431407;color:#fff;padding:30px;border-radius:24px;margin-bottom:40px}h3{margin-bottom:10px}
button{width:100%;margin-top:20px;padding:12px;background:#fff;color:#431407;border:none;border-radius:8px;font-weight:700;cursor:pointer}
.history{opacity:0.6}.h{padding:10px 0;border-bottom:1px solid #eee}`
  }
},

// ============================================================
// 💰 CROWDFUNDING CAMPAIGN
// ============================================================
crowdfund: {
  keywords: ['crowdfunding', 'kickstarter', 'donations', 'project', 'funding', 'kitlesel fonlama', 'bağış', 'proje'],
  projectName: 'x-fund',
  files: {
    'index.html': `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>X-Fund</title><link rel="stylesheet" href="style.css"></head>
<body><div class="app"><div class="hero"></div><h1>Eco-Friendly Water Bottle</h1><p>Help us save the oceans with our new design.</p>
<div class="progress"><div class="bar"><div style="width:65%"></div></div><span>$12,450 raised of $20,000</span></div><button>Back this project</button></div></body></html>`,
    'style.css': `*{box-sizing:border-box;margin:0;padding:0}body{background:#fdfcfb;color:#1e293b;font-family:'Inter',sans-serif;padding:60px;display:flex;justify-content:center}
.app{width:400px}.hero{height:200px;background:#e2e8f0;border-radius:24px;margin-bottom:30px}h1{margin-bottom:10px}p{opacity:0.6;margin-bottom:40px}
.bar{height:12px;background:#e2e8f0;border-radius:10px;overflow:hidden;margin-bottom:10px}.bar div{height:100%;background:#059669}
span{font-weight:700;font-size:0.9rem}button{width:100%;margin-top:40px;padding:15px;background:#059669;color:#fff;border:none;border-radius:12px;font-weight:700;cursor:pointer}`
  }
},

// ============================================================
// 👥 JOB REFERRAL SYSTEM
// ============================================================
referral_sys: {
  keywords: ['referral', 'jobs', 'hiring', 'bonus', 'employee', 'referans', 'iş ilanı', 'ik', 'bonus'],
  projectName: 'x-refer',
  files: {
    'index.html': `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>X-Refer</title><link rel="stylesheet" href="style.css"></head>
<body><div class="app"><h1>Employee Referrals</h1><div class="card"><span>Potential Bonus</span><h2>$2,500</h2><p>For Senior React Dev</p></div>
<div class="jobs"><div class="j"><h4>Backend Engineer</h4><button>Refer Friend</button></div><div class="j"><h4>UI Designer</h4><button>Refer Friend</button></div></div></div></body></html>`,
    'style.css': `*{box-sizing:border-box;margin:0;padding:0}body{background:#f0fdf4;color:#166534;font-family:'Inter',sans-serif;padding:60px;display:flex;justify-content:center}
.app{width:360px}.card{background:#166534;color:#fff;padding:40px;border-radius:24px;margin-bottom:30px}h2{font-size:2.5rem;margin:10px 0}
.j{background:#fff;padding:20px;border-radius:12px;display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;border:1px solid #bbf7d0}
button{background:#166534;color:#fff;border:none;padding:8px 15px;border-radius:6px;cursor:pointer;font-size:0.8rem}`
  }
},

// ============================================================
// 🤝 VOLUNTEER MATCH PLATFORM
// ============================================================
volunteer_match: {
  keywords: ['volunteer', 'charity', 'help', 'social impact', 'gönüllü', 'yardım', 'sosyal sorumluluk'],
  projectName: 'x-volunteer',
  files: {
    'index.html': `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>X-Volunteer</title><link rel="stylesheet" href="style.css"></head>
<body><div class="app"><h1>Make an Impact</h1><div class="list">
<div class="v"><h4>Local Food Bank</h4><p>Needs 4 people this Saturday</p><button>Join</button></div>
<div class="v"><h4>Animal Shelter</h4><p>Dog walking assistance</p><button>Join</button></div></div></div></body></html>`,
    'style.css': `*{box-sizing:border-box;margin:0;padding:0}body{background:#fdfaff;color:#4338ca;font-family:'Inter',sans-serif;padding:60px;display:flex;justify-content:center}
.app{width:400px}h1{margin-bottom:40px;text-align:center}.v{background:#fff;padding:30px;border-radius:24px;border:1px solid #e0e7ff;margin-bottom:15px}
h4{margin-bottom:5px}p{opacity:0.6;margin-bottom:20px}button{width:100%;padding:12px;background:#4338ca;color:#fff;border:none;border-radius:12px;font-weight:700;cursor:pointer}`
  }
},

// ============================================================
// 🎟️ TICKET RESALE MARKET
// ============================================================
ticket_resale: {
  keywords: ['tickets', 'resale', 'concert', 'events', 'marketplace', 'bilet', 'ikinci el', 'konser', 'etkinlik'],
  projectName: 'x-tickets',
  files: {
    'index.html': `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>X-Tickets</title><link rel="stylesheet" href="style.css"></head>
<body><nav>X-TICKETS</nav><div class="app"><h1>Available Tickets</h1><div class="t">
<div class="info"><h4>Rock Festival 2024</h4><p>Section A | Row 4</p></div><div class="price">$150</div><button>Buy</button></div></div></body></html>`,
    'style.css': `*{box-sizing:border-box;margin:0;padding:0}body{background:#f8fafc;color:#0f172a;font-family:'Inter',sans-serif}
nav{padding:20px 40px;background:#0f172a;color:#fff;font-weight:900}.app{padding:40px;max-width:600px;margin:0 auto}
.t{background:#fff;padding:25px;border-radius:16px;display:flex;align-items:center;gap:20px;border:1px solid #e2e8f0}.info{flex:1}
.price{font-weight:900;font-size:1.2rem}button{padding:10px 25px;background:#0f172a;color:#fff;border:none;border-radius:8px;cursor:pointer}`
  }
},

// ============================================================
// 🔍 LUXURY GOODS AUTHENTICATOR
// ============================================================
luxury_auth: {
  keywords: ['luxury', 'auth', 'authenticator', 'fashion', 'verification', 'lüks', 'doğrulama', 'orijinallik', 'moda'],
  projectName: 'x-verify',
  files: {
    'index.html': `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>X-Verify</title><link rel="stylesheet" href="style.css"></head>
<body><div class="app"><h1>Luxury Authenticator</h1><div class="upload">Drop photo of serial number</div>
<div class="results"><h3>Verification Results</h3><div class="r valid">Status: Authentic ✅</div></div></div></body></html>`,
    'style.css': `*{box-sizing:border-box;margin:0;padding:0}body{background:#000;color:#fff;font-family:'Inter',sans-serif;padding:60px;display:flex;justify-content:center}
.app{width:360px;text-align:center}.upload{height:200px;border:2px dashed #333;border-radius:24px;display:flex;align-items:center;justify-content:center;margin:40px 0;color:#666}
.r{padding:20px;border-radius:12px;background:#111}.r.valid{color:#22c55e;border:1px solid #22c55e}`
  }
}

});
