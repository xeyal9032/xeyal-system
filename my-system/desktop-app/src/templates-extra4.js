/**
 * FORGE TEMPLATE REGISTRY — BATCH 4 (10 templates)
 * Crypto, Fitness, AI Hub, E-commerce, Recipe, Finance, Flashcards, Password, URL, Quiz
 */
Object.assign(window.FORGE_TEMPLATES, {

// ============================================================
// 💹 CRYPTO DASHBOARD
// ============================================================
crypto: {
  keywords: ['crypto', 'coin', 'bitcoin', 'trading', 'borsa', 'market', 'chart', 'kripto'],
  projectName: 'crypto-hub',
  files: {
    'index.html': `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>CryptoHub Dashboard</title><link rel="stylesheet" href="style.css"></head>
<body><div class="sidebar"><div class="logo">💹</div><nav><div class="nav-item active">📊 Dashboard</div><div class="nav-item">💼 Wallet</div><div class="nav-item">🔄 Swap</div><div class="nav-item">⚙️ Settings</div></nav></div>
<main><header><h2>Market Overview</h2><div class="user">Xeyal System</div></header>
<div class="stats"><div class="stat-card"><span>Total Balance</span><h3>$42,592.10</h3><small class="up">+12.5% Today</small></div><div class="stat-card"><span>Active Assets</span><h3>12 Coins</h3></div><div class="stat-card"><span>Profit (24h)</span><h3>+$1,240.00</h3><small class="up">+4.2%</small></div></div>
<div class="chart-container"><div class="chart-header"><h4>BTC / USDT</h4><span class="price">$64,281.50</span></div><div class="mock-chart"><div class="bar" style="height:40%"></div><div class="bar" style="height:60%"></div><div class="bar" style="height:50%"></div><div class="bar" style="height:80%"></div><div class="bar" style="height:90%"></div><div class="bar" style="height:70%"></div><div class="bar" style="height:100%"></div></div></div>
<div class="recent"><h4>Recent Transactions</h4><div class="t-row"><span>Sent BTC</span><span>-0.004 BTC</span><span class="date">Today</span></div><div class="t-row"><span>Received ETH</span><span>+0.25 ETH</span><span class="date">Yesterday</span></div></div></main></body></html>`,
    'style.css': `*{box-sizing:border-box;margin:0;padding:0}body{background:#06060f;color:#e2e8f0;font-family:'Inter',sans-serif;display:flex;height:100vh}
.sidebar{width:80px;background:#0c0c1a;border-right:1px solid #1e1e2d;display:flex;flex-direction:column;align-items:center;padding:20px 0}
.logo{font-size:2rem;margin-bottom:40px;filter:drop-shadow(0 0 10px #3b82f6)}
.nav-item{margin-bottom:30px;cursor:pointer;opacity:0.5;font-size:0.7rem;text-align:center}.nav-item.active{opacity:1;color:#3b82f6}
main{flex:1;padding:30px;overflow-y:auto}
header{display:flex;justify-content:space-between;align-items:center;margin-bottom:30px}
.stats{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;margin-bottom:30px}
.stat-card{background:#0c0c1a;padding:20px;border-radius:16px;border:1px solid #1e1e2d}
.stat-card span{font-size:0.8rem;color:#94a3b8}
.stat-card h3{margin:10px 0;font-size:1.5rem}
.up{color:#22c55e;font-size:0.75rem;font-weight:700}
.chart-container{background:#0c0c1a;padding:25px;border-radius:20px;border:1px solid #1e1e2d;margin-bottom:30px}
.mock-chart{height:150px;display:flex;align-items:flex-end;gap:10px;margin-top:20px}
.bar{flex:1;background:#3b82f6;border-radius:4px 4px 0 0;animation:grow 1s ease-out}
@keyframes grow{from{height:0}to{height:100%}}
.recent{background:#0c0c1a;padding:20px;border-radius:16px;border:1px solid #1e1e2d}
.t-row{display:flex;justify-content:space-between;padding:12px 0;border-bottom:1px solid #1e1e2d;font-size:0.9rem}
.t-row:last-child{border:none}.date{color:#64748b;font-size:0.8rem}`
  }
},

// ============================================================
// 🏃 FITNESS TRACKER
// ============================================================
fitness: {
  keywords: ['fitness', 'workout', 'gym', 'health', 'calorie', 'step', 'antrenman', 'spor'],
  projectName: 'fitness-pro',
  files: {
    'index.html': `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>FitnessPro</title><link rel="stylesheet" href="style.css"></head>
<body><div class="mobile-frame"><header><span>Welcome Back!</span><h3>Runner One</h3></header>
<div class="ring-area"><div class="ring"><div class="val">85<span>%</span></div></div><div class="goals"><div>🔥 1,240 kcal</div><div>👟 8,420 steps</div></div></div>
<div class="section-title">Today's Activity</div>
<div class="act-card"><span>Running</span><div class="bar-bg"><div class="bar" style="width:70%"></div></div><small>4.2 km / 6 km</small></div>
<div class="act-card"><span>Water</span><div class="bar-bg"><div class="bar" style="width:40%"></div></div><small>0.8 L / 2 L</small></div>
<div class="nav-bar"><span>🏠</span><span>📊</span><span>🔥</span><span>👤</span></div></div></body></html>`,
    'style.css': `*{box-sizing:border-box;margin:0;padding:0}body{background:#f8fafc;color:#0f172a;font-family:'Outfit',sans-serif;display:flex;justify-content:center;align-items:center;min-height:100vh}
.mobile-frame{width:360px;height:640px;background:#fff;border-radius:40px;box-shadow:0 30px 60px rgba(0,0,0,0.1);overflow:hidden;padding:30px;display:flex;flex-direction:column;position:relative}
header{margin-bottom:30px}header span{font-size:0.9rem;color:#64748b}header h3{font-size:1.4rem}
.ring-area{display:flex;align-items:center;gap:30px;margin-bottom:40px}
.ring{width:120px;height:120px;border-radius:50%;border:12px solid #f1f5f9;border-top-color:#ef4444;display:flex;align-items:center;justify-content:center;font-weight:900;font-size:1.5rem}
.ring span{font-size:0.8rem;opacity:0.5}
.goals div{font-size:0.9rem;font-weight:700;margin-bottom:10px;color:#0f172a}
.section-title{font-size:1rem;font-weight:800;margin-bottom:20px}
.act-card{background:#f8fafc;padding:15px;border-radius:16px;margin-bottom:15px}
.act-card span{font-size:0.85rem;font-weight:600;display:block;margin-bottom:8px}
.bar-bg{height:8px;background:#e2e8f0;border-radius:4px;overflow:hidden;margin-bottom:5px}
.bar{height:100%;background:#ef4444;border-radius:4px}
.nav-bar{position:absolute;bottom:0;left:0;right:0;height:70px;background:#fff;border-top:1px solid #f1f5f9;display:flex;justify-content:space-around;align-items:center;font-size:1.5rem}`
  }
},

// ============================================================
// 🎨 AI GENERATION HUB
// ============================================================
aihub: {
  keywords: ['ai', 'generator', 'image', 'stable diffusion', 'midjourney', 'prompt', 'yapay zeka'],
  projectName: 'ai-creative-studio',
  files: {
    'index.html': `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>AI Creative Studio</title><link rel="stylesheet" href="style.css"></head>
<body><div class="app"><aside><h2>Studio</h2><div class="menu">Generate</div><div class="menu">History</div></aside>
<main><div class="prompt-box"><h3>Create Image</h3><textarea placeholder="Describe your masterpiece... e.g. A cyberpunk city at night with neon lights"></textarea>
<div class="options"><span>Size: 1024x1024</span><span>Model: SDXL 2.0</span></div><button class="gen-btn">GENERATE IMAGE</button></div>
<div class="gallery"><h4>Recent Generations</h4><div class="grid"><div class="img-mock"></div><div class="img-mock"></div><div class="img-mock"></div><div class="img-mock"></div></div></div></main></div></body></html>`,
    'style.css': `*{box-sizing:border-box;margin:0;padding:0}body{background:#020617;color:#f8fafc;font-family:'Inter',sans-serif}
.app{display:grid;grid-template-columns:240px 1fr;height:100vh}
aside{background:#0f172a;padding:30px;border-right:1px solid #1e293b}
.menu{padding:12px;border-radius:8px;margin-bottom:10px;cursor:pointer;background:rgba(255,255,255,0.05)}
main{padding:40px;overflow-y:auto}
.prompt-box{background:#0f172a;padding:30px;border-radius:20px;border:1px solid #3b82f6;margin-bottom:40px}
textarea{width:100%;height:100px;background:#1e293b;border:none;border-radius:12px;padding:20px;color:white;resize:none;font-size:1.1rem;margin-bottom:20px}
.options{display:flex;gap:20px;font-size:0.85rem;color:#94a3b8;margin-bottom:20px}
.gen-btn{width:100%;padding:15px;border-radius:12px;border:none;background:linear-gradient(90deg,#3b82f6,#8b5cf6);color:white;font-weight:700;cursor:pointer;letter-spacing:1px}
.grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:20px;margin-top:20px}
.img-mock{aspect-ratio:1;background:#1e293b;border-radius:12px;border:1px solid rgba(255,255,255,0.1);position:relative}
.img-mock::after{content:'AI Image';position:absolute;inset:0;display:flex;align-items:center;justify-content:center;opacity:0.3}`
  }
},

// ============================================================
// 🛒 E-COMMERCE SHOWCASE
// ============================================================
shop: {
  keywords: ['shop', 'store', 'product', 'ecommerce', 'cart', 'buy', 'satın al', 'ürün', 'sepet'],
  projectName: 'premium-store',
  files: {
    'index.html': `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>Store</title><link rel="stylesheet" href="style.css"></head>
<body><nav><span>MYSTORE</span><div>🛒 Cart (0)</div></nav><div class="product"><div class="img-wrap"><div class="badge">NEW</div></div>
<div class="details"><h1>X-Series Smart Watch</h1><div class="price">$299.00 <del>$349.00</del></div><p>Experience the next generation of wearable technology with seamless AI integration and 7-day battery life.</p>
<div class="opts"><span>Color:</span><div class="swatch" style="background:#000"></div><div class="swatch" style="background:#888"></div></div><button class="buy-btn">ADD TO CART</button></div></div></body></html>`,
    'style.css': `*{box-sizing:border-box;margin:0;padding:0}body{background:#fff;color:#0f172a;font-family:'Outfit',sans-serif}
nav{padding:20px 40px;display:flex;justify-content:space-between;font-weight:900;border-bottom:1px solid #f1f5f9}
.product{max-width:1000px;margin:80px auto;display:grid;grid-template-columns:1fr 1fr;gap:60px;padding:0 20px}
.img-wrap{background:#f8fafc;aspect-ratio:1;border-radius:24px;position:relative}
.badge{position:absolute;top:20px;left:20px;background:#0f172a;color:#fff;padding:5px 12px;border-radius:50px;font-size:0.75rem;font-weight:700}
h1{font-size:2.5rem;margin-bottom:15px;letter-spacing:-1px}
.price{font-size:1.8rem;font-weight:800;color:#3b82f6;margin-bottom:25px}
.price del{font-size:1.1rem;color:#94a3b8;font-weight:400;margin-left:10px}
p{color:#64748b;line-height:1.7;margin-bottom:30px}
.opts{display:flex;align-items:center;gap:15px;margin-bottom:40px}
.swatch{width:30px;height:30px;border-radius:50%;cursor:pointer;border:2px solid #fff;outline:1px solid #e2e8f0}
.buy-btn{width:100%;padding:20px;border-radius:12px;border:none;background:#0f172a;color:#fff;font-weight:700;cursor:pointer;transition:0.3s}.buy-btn:hover{background:#3b82f6}`
  }
},

// ============================================================
// 🍜 SMART RECIPE BOOK
// ============================================================
recipe: {
  keywords: ['recipe', 'food', 'cooking', 'chef', 'kitchen', 'yemek', 'tarif', 'mutfak'],
  projectName: 'smart-chef',
  files: {
    'index.html': `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>SmartChef</title><link rel="stylesheet" href="style.css"></head>
<body><header><h1>🍳 SmartChef</h1><input type="text" placeholder="Search for recipes..."></header>
<div class="cats"><span>Italian</span><span class="active">Asian</span><span>Dessert</span><span>Vegan</span></div>
<div class="grid"><div class="card"><div class="img"></div><div class="info"><h4>Classic Ramen</h4><span>30 mins | Medium</span></div></div>
<div class="card"><div class="img"></div><div class="info"><h4>Sushi Roll</h4><span>45 mins | Hard</span></div></div><div class="card"><div class="img"></div><div class="info"><h4>Thai Curry</h4><span>20 mins | Easy</span></div></div></div></body></html>`,
    'style.css': `*{box-sizing:border-box;margin:0;padding:0}body{background:#fefce8;color:#422006;font-family:'Inter',sans-serif}
header{padding:40px;text-align:center}h1{font-size:2rem;margin-bottom:20px}
input{width:100%;max-width:500px;padding:15px 25px;border-radius:50px;border:1px solid #fde68a;outline:none;background:#fff;box-shadow:0 10px 15px -3px rgba(234,179,8,0.1)}
.cats{display:flex;justify-content:center;gap:15px;margin-bottom:40px}
.cats span{padding:8px 20px;border-radius:50px;background:#fff;border:1px solid #fde68a;cursor:pointer;font-size:0.85rem}
.cats span.active{background:#facc15;font-weight:700}
.grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:30px;padding:0 40px}
.card{background:#fff;border-radius:24px;overflow:hidden;box-shadow:0 4px 6px -1px rgba(0,0,0,0.05);transition:0.3s}.card:hover{transform:translateY(-8px)}
.img{height:180px;background:#fde047}
.info{padding:20px}h4{font-size:1.1rem;margin-bottom:5px}.info span{font-size:0.75rem;color:#713f12;opacity:0.6}`
  }
},

// ============================================================
// 💰 PERSONAL FINANCE MANAGER
// ============================================================
finance: {
  keywords: ['finance', 'budget', 'money', 'expense', 'tracker', 'bütçe', 'para', 'harcama'],
  projectName: 'wealth-manager',
  files: {
    'index.html': `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>WealthManager</title><link rel="stylesheet" href="style.css"></head>
<body><div class="app"><div class="balance"><span>Current Balance</span><h1>$12,480.50</h1></div>
<div class="summary"><div class="s-box"><span>Income</span><h4 class="up">+$4,200</h4></div><div class="s-box"><span>Expenses</span><h4 class="down">-$1,840</h4></div></div>
<h3>Spending by Category</h3><div class="cat-list"><div class="c-item"><span>🍔 Food</span><div class="bar-wrap"><div class="bar" style="width:40%"></div></div><span>$420</span></div>
<div class="c-item"><span>🚗 Transport</span><div class="bar-wrap"><div class="bar" style="width:25%"></div></div><span>$250</span></div><div class="c-item"><span>🎬 Entertainment</span><div class="bar-wrap"><div class="bar" style="width:15%"></div></div><span>$150</span></div></div></div></body></html>`,
    'style.css': `*{box-sizing:border-box;margin:0;padding:0}body{background:#000;color:#fff;font-family:'Inter',sans-serif;display:flex;justify-content:center;padding:40px}
.app{width:100%;max-width:400px}.balance{text-align:center;margin-bottom:40px}.balance span{font-size:0.9rem;opacity:0.6}
.summary{display:flex;gap:20px;margin-bottom:40px}.s-box{flex:1;background:#111;padding:20px;border-radius:16px;text-align:center}
.up{color:#22c55e}.down{color:#ef4444}h3{font-size:1.1rem;margin-bottom:20px}
.cat-list{display:flex;flex-direction:column;gap:20px}.c-item{display:flex;align-items:center;gap:15px;font-size:0.9rem}
.bar-wrap{flex:1;height:8px;background:#222;border-radius:4px;overflow:hidden}.bar{height:100%;background:#3b82f6}`
  }
},

// ============================================================
// 🧠 INTERACTIVE FLASHCARDS
// ============================================================
flashcards: {
  keywords: ['flashcard', 'study', 'learn', 'quiz', 'education', 'kart', 'ders', 'eğitim'],
  projectName: 'study-master',
  files: {
    'index.html': `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>StudyMaster</title><link rel="stylesheet" href="style.css"></head>
<body><div class="app"><h1>StudyMaster</h1><div class="card" onclick="this.classList.toggle('flip')"><div class="front">What is the capital of France?</div><div class="back">Paris 🗼</div></div>
<div class="controls"><button>Previous</button><span>1 / 20</span><button>Next</button></div></div></body></html>`,
    'style.css': `*{box-sizing:border-box;margin:0;padding:0}body{background:#f0f9ff;color:#0c4a6e;font-family:'Inter',sans-serif;display:flex;justify-content:center;align-items:center;min-height:100vh}
.app{text-align:center}h1{margin-bottom:40px;letter-spacing:-1px}
.card{width:320px;height:200px;perspective:1000px;cursor:pointer;position:relative;transition:transform 0.6s;transform-style:preserve-3d}
.card.flip{transform:rotateY(180deg)}
.front,.back{position:absolute;inset:0;backface-visibility:hidden;display:flex;align-items:center;justify-content:center;font-size:1.4rem;font-weight:700;padding:30px;background:#fff;border-radius:24px;box-shadow:0 15px 30px rgba(0,0,0,0.1)}
.back{transform:rotateY(180deg);background:#0ea5e9;color:#fff}
.controls{margin-top:40px;display:flex;align-items:center;justify-content:center;gap:20px}
button{padding:10px 25px;border-radius:50px;border:none;background:#0ea5e9;color:#fff;cursor:pointer}`
  }
},

// ============================================================
// 🔐 PASSWORD VAULT
// ============================================================
vault: {
  keywords: ['password', 'vault', 'security', 'generator', 'safe', 'şifre', 'güvenlik', 'kasa'],
  projectName: 'secure-vault',
  files: {
    'index.html': `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>SecureVault</title><link rel="stylesheet" href="style.css"></head>
<body><div class="app"><h2>🔐 SecureVault</h2><div class="gen-box"><div class="display">xK9!-2pL9-vR2</div><button>Regenerate</button></div>
<div class="list"><h3>Stored Accounts</h3><div class="item"><span>Google</span><button>Copy Pass</button></div><div class="item"><span>GitHub</span><button>Copy Pass</button></div></div></div></body></html>`,
    'style.css': `*{box-sizing:border-box;margin:0;padding:0}body{background:#09090b;color:#fafafa;font-family:'Inter',sans-serif;display:flex;justify-content:center;padding-top:100px}
.app{width:340px}h2{margin-bottom:30px;text-align:center}
.gen-box{background:#18181b;padding:20px;border-radius:12px;text-align:center;margin-bottom:40px}
.display{font-family:monospace;font-size:1.4rem;color:#3b82f6;margin-bottom:15px}
.gen-box button{background:#3b82f6;border:none;padding:8px 20px;border-radius:6px;color:#fff;cursor:pointer}
.item{display:flex;justify-content:space-between;align-items:center;padding:12px 15px;background:#18181b;border-radius:8px;margin-bottom:10px}
.item button{background:transparent;border:1px solid #27272a;padding:5px 10px;border-radius:4px;color:#a1a1aa;cursor:pointer;font-size:0.8rem}`
  }
},

// ============================================================
// 🔗 URL SHORTENER
// ============================================================
shorten: {
  keywords: ['url', 'link', 'shorten', 'link kısalt', 'analytics', 'kısaltma'],
  projectName: 'tiny-link',
  files: {
    'index.html': `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>TinyLink</title><link rel="stylesheet" href="style.css"></head>
<body><div class="app"><h1>🔗 TinyLink</h1><div class="input-wrap"><input type="text" placeholder="Paste a long URL..."><button>Shorten</button></div>
<div class="res"><span>Shortened Link:</span><a href="#">tiny.cc/x2vR9</a></div></div></body></html>`,
    'style.css': `*{box-sizing:border-box;margin:0;padding:0}body{background:#fdf4ff;color:#701a75;font-family:'Inter',sans-serif;display:flex;justify-content:center;align-items:center;min-height:100vh}
.app{text-align:center;width:400px}h1{margin-bottom:40px}.input-wrap{display:flex;gap:10px;margin-bottom:30px}
input{flex:1;padding:15px;border-radius:12px;border:1px solid #f5d0fe;outline:none}
button{padding:15px 25px;border-radius:12px;border:none;background:#a21caf;color:#fff;font-weight:700;cursor:pointer}
.res{background:#fff;padding:20px;border-radius:12px;border:1px solid #f5d0fe}
.res span{display:block;font-size:0.8rem;margin-bottom:5px;opacity:0.6}a{font-weight:900;color:#a21caf}`
  }
},

// ============================================================
// ⏱️ TIMED QUIZ
// ============================================================
quiz: {
  keywords: ['quiz', 'test', 'exam', 'challenge', 'yarışma', 'soru'],
  projectName: 'quiz-master',
  files: {
    'index.html': `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>QuizMaster</title><link rel="stylesheet" href="style.css"></head>
<body><div class="app"><header><div class="timer">Time: 14s</div><span>Question 1/5</span></header>
<div class="q-area"><h2>Which planet is known as the Red Planet?</h2><div class="opts"><div class="opt">Venus</div><div class="opt active">Mars</div><div class="opt">Jupiter</div><div class="opt">Saturn</div></div></div></div></body></html>`,
    'style.css': `*{box-sizing:border-box;margin:0;padding:0}body{background:#faf5ff;color:#581c87;font-family:'Inter',sans-serif;display:flex;justify-content:center;padding-top:100px}
.app{width:450px}header{display:flex;justify-content:space-between;margin-bottom:40px;font-weight:700}
.timer{color:#9333ea}.q-area{background:#fff;padding:40px;border-radius:32px;box-shadow:0 20px 40px rgba(88,28,135,0.05)}
h2{font-size:1.3rem;margin-bottom:30px}.opts{display:flex;flex-direction:column;gap:12px}
.opt{padding:15px 20px;border-radius:16px;border:2px solid #f3e8ff;cursor:pointer;transition:0.2s}
.opt:hover{border-color:#d8b4fe}.opt.active{background:#9333ea;color:#fff;border-color:#9333ea}`
  }
}

});
