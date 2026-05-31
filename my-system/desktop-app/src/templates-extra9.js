/**
 * FORGE TEMPLATE REGISTRY — BATCH 9 (10 templates)
 * AI Studio, Stocks, Language, Travel, Auction, Freelance, Voting, Crypto, Recipes, MindMap
 */
Object.assign(window.FORGE_TEMPLATES, {

// ============================================================
// 🎨 AI IMAGE STUDIO
// ============================================================
ai_studio: {
  keywords: ['ai image', 'generator', 'dall-e', 'midjourney', 'prompt', 'yapay zeka görsel', 'üretici'],
  projectName: 'xeyal-studio',
  files: {
    'index.html': `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>AI Studio</title><link rel="stylesheet" href="style.css"></head>
<body><div class="app"><aside><h3>Styles</h3><div>Realistic</div><div>Cyberpunk</div><div>Anime</div></aside>
<main><header><h1>AI Visualizer</h1></header><div class="gal"><div class="img"></div><div class="img"></div></div>
<div class="prompt"><input type="text" placeholder="A futuristic city in the clouds..."><button>Generate</button></div></main></div></body></html>`,
    'style.css': `*{box-sizing:border-box;margin:0;padding:0}body{background:#000;color:#fff;font-family:'Inter',sans-serif}
.app{display:grid;grid-template-columns:200px 1fr;height:100vh}aside{padding:30px;background:#111}aside div{padding:10px;opacity:0.6;cursor:pointer}
main{padding:40px;display:flex;flex-direction:column}h1{margin-bottom:40px;text-align:center}
.gal{flex:1;display:grid;grid-template-columns:1fr 1fr;gap:20px}.img{background:#222;border-radius:12px}
.prompt{display:flex;gap:15px;background:#111;padding:20px;border-radius:16px;margin-top:20px}
input{flex:1;background:transparent;border:none;color:#fff;outline:none}button{background:#fff;color:#000;border:none;padding:10px 25px;border-radius:8px;font-weight:700;cursor:pointer}`
  }
},

// ============================================================
// 📈 STOCK MARKET PRO
// ============================================================
stocks: {
  keywords: ['stocks', 'market', 'trading', 'crypto', 'finance', 'borsa', 'hisse', 'yatırım', 'finans'],
  projectName: 'stock-pro',
  files: {
    'index.html': `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>StockPro</title><link rel="stylesheet" href="style.css"></head>
<body><div class="app"><nav>StockPro</nav><div class="main-chart"><h2>AAPL <span>+2.45%</span></h2><div class="graph"></div></div>
<div class="list"><h3>Watchlist</h3><div class="s"><span>TSLA</span><b>$175.20</b></div><div class="s"><span>NVDA</span><b>$890.10</b></div></div></div></body></html>`,
    'style.css': `*{box-sizing:border-box;margin:0;padding:0}body{background:#0a0a0a;color:#fff;font-family:'Inter',sans-serif;padding:40px;display:flex;justify-content:center}
.app{width:100%;max-width:500px}nav{margin-bottom:40px;font-weight:900;letter-spacing:2px}
.main-chart{background:#111;padding:30px;border-radius:24px;border:1px solid #222;margin-bottom:30px}
h2 span{color:#22c55e;font-size:1rem;margin-left:10px}.graph{height:150px;background:linear-gradient(to top,#22c55e22,transparent);margin-top:20px;border-bottom:2px solid #22c55e}
.list{background:#111;padding:25px;border-radius:24px;border:1px solid #222}.s{display:flex;justify-content:space-between;padding:15px 0;border-bottom:1px solid #222}`
  }
},

// ============================================================
// 🌍 LANGUAGE LEARNER
// ============================================================
language_app: {
  keywords: ['language', 'learn', 'words', 'study', 'english', 'dil öğrenme', 'kelime', 'ingilizce'],
  projectName: 'skill-lingo',
  files: {
    'index.html': `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>SkillLingo</title><link rel="stylesheet" href="style.css"></head>
<body><div class="app"><header><span>Level 4</span><div class="p-bar"><div style="width:60%"></div></div></header>
<div class="card"><h1>Bonjour</h1><p>Meaning: Hello</p><button>Got it!</button></div>
<div class="stats"><span>🔥 12 Days</span><span>🎯 850 Words</span></div></div></body></html>`,
    'style.css': `*{box-sizing:border-box;margin:0;padding:0}body{background:#fff;color:#1e293b;font-family:'Inter',sans-serif;padding:80px;display:flex;justify-content:center}
.app{width:320px;text-align:center}header{display:flex;align-items:center;gap:15px;margin-bottom:60px;font-weight:700}
.p-bar{flex:1;height:10px;background:#f1f5f9;border-radius:10px;overflow:hidden}.p-bar div{height:100%;background:#10b981}
.card{background:#10b981;color:#fff;padding:60px 30px;border-radius:32px;box-shadow:0 20px 40px rgba(16,185,129,0.2);margin-bottom:40px}
h1{font-size:3rem;margin-bottom:10px}button{background:#fff;color:#10b981;border:none;padding:12px 30px;border-radius:50px;font-weight:900;cursor:pointer}
.stats{display:flex;justify-content:space-between;font-weight:700;opacity:0.6}`
  }
},

// ============================================================
// ✈️ TRAVEL PLANNER
// ============================================================
travel_planner: {
  keywords: ['travel', 'trip', 'itinerary', 'flights', 'hotels', 'gezi', 'seyahat', 'planlayıcı', 'tatil'],
  projectName: 'xeyal-travel',
  files: {
    'index.html': `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>Travel</title><link rel="stylesheet" href="style.css"></head>
<body><div class="app"><nav>Explore</nav><h1>Tokyo, Japan</h1><div class="days">
<div class="d">Day 1: Shibuya Crossing</div><div class="d">Day 2: Mount Fuji</div><div class="d">Day 3: Shinjuku Night</div></div>
<div class="booking"><h3>Booking Summary</h3><p>✈️ flight: Confirmed</p><p>🏨 Hotel: Confirmed</p></div></div></body></html>`,
    'style.css': `*{box-sizing:border-box;margin:0;padding:0}body{background:#fdfcfb;color:#1e293b;font-family:'Inter',sans-serif;padding:60px;display:flex;justify-content:center}
.app{width:100%;max-width:400px}nav{color:#f97316;font-weight:700;margin-bottom:10px}h1{font-size:2.5rem;margin-bottom:40px}
.d{background:#fff;padding:20px;border-radius:12px;border:1px solid #fed7aa;margin-bottom:12px;font-weight:600}
.booking{margin-top:40px;background:#0f172a;color:#fff;padding:30px;border-radius:24px}h3{margin-bottom:15px;font-size:1rem}p{opacity:0.7;margin-bottom:5px}`
  }
},

// ============================================================
// 🔨 ONLINE AUCTION
// ============================================================
auction: {
  keywords: ['auction', 'bid', 'selling', 'marketplace', 'collectibles', 'açık artırma', 'teklif', 'satış'],
  projectName: 'bid-master',
  files: {
    'index.html': `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>BidMaster</title><link rel="stylesheet" href="style.css"></head>
<body><div class="app"><div class="item-img"></div><div class="details"><span>Live Auction</span><h1>Rare Digital Art</h1><div class="timer">Ends in: 04:12:05</div>
<div class="price">Current Bid: <b>$2,450</b></div><div class="bid-in"><input type="number" value="2500"><button>Place Bid</button></div></div></div></body></html>`,
    'style.css': `*{box-sizing:border-box;margin:0;padding:0}body{background:#fff;color:#0f172a;font-family:'Inter',sans-serif;padding:80px;display:flex;justify-content:center}
.app{display:grid;grid-template-columns:1fr 1fr;gap:40px;max-width:800px;align-items:center}
.item-img{aspect-ratio:1;background:#f3f4f6;border-radius:24px}
span{color:#ef4444;font-weight:900;text-transform:uppercase;font-size:0.75rem;letter-spacing:1px}
h1{font-size:2.5rem;margin:10px 0 20px}.timer{font-weight:700;margin-bottom:30px}
.price{background:#f8fafc;padding:20px;border-radius:12px;margin-bottom:30px}.price b{font-size:1.5rem;color:#3b82f6}
.bid-in{display:flex;gap:10px}input{padding:12px;border:1px solid #ddd;border-radius:8px;width:120px}
button{flex:1;background:#0f172a;color:#fff;border:none;border-radius:8px;font-weight:700;cursor:pointer}`
  }
},

// ============================================================
// 🤝 FREELANCE MARKETPLACE
// ============================================================
freelance: {
  keywords: ['freelance', 'marketplace', 'jobs', 'gigs', 'upwork', 'serbest çalışma', 'iş ilanları', 'pazar yeri'],
  projectName: 'xeyal-gigs',
  files: {
    'index.html': `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>X-Gigs</title><link rel="stylesheet" href="style.css"></head>
<body><nav>X-GIGS</nav><header><h1>Find the perfect talent.</h1></header>
<div class="list"><div class="g"><div class="u"></div><div><h4>Logo Design</h4><p>$50 - $100</p></div><button>Apply</button></div>
<div class="g"><div class="u"></div><div><h4>React Developer</h4><p>$2k - $5k</p></div><button>Apply</button></div></div></body></html>`,
    'style.css': `*{box-sizing:border-box;margin:0;padding:0}body{background:#f8fafc;color:#0f172a;font-family:'Inter',sans-serif}
nav{padding:20px 40px;background:#fff;border-bottom:1px solid #e2e8f0;font-weight:900}
header{padding:60px 40px;text-align:center}h1{font-size:2rem;letter-spacing:-1px}
.list{max-width:600px;margin:0 auto;padding:0 20px}.g{background:#fff;padding:20px;border-radius:12px;display:flex;align-items:center;gap:20px;margin-bottom:15px;border:1px solid #e2e8f0}
.u{width:50px;height:50px;background:#f1f5f9;border-radius:50%}h4{font-size:1rem;margin-bottom:5px}p{font-size:0.85rem;opacity:0.6}
button{margin-left:auto;background:#0f172a;color:#fff;border:none;padding:8px 20px;border-radius:6px;cursor:pointer}`
  }
},

// ============================================================
// 🗳️ SMART VOTING
// ============================================================
voting: {
  keywords: ['voting', 'poll', 'election', 'survey', 'secure', 'oy verme', 'seçim', 'anket', 'güvenli'],
  projectName: 'vote-core',
  files: {
    'index.html': `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>VoteCore</title><link rel="stylesheet" href="style.css"></head>
<body><div class="app"><h1>Election 2026</h1><div class="card"><h3>Candidate A</h3><div class="bar"><div style="width:42%"></div></div><span>42%</span><button>Vote</button></div>
<div class="card"><h3>Candidate B</h3><div class="bar"><div style="width:58%"></div></div><span>58%</span><button>Vote</button></div></div></body></html>`,
    'style.css': `*{box-sizing:border-box;margin:0;padding:0}body{background:#fdfaff;color:#1e1b4b;font-family:'Inter',sans-serif;padding:80px;display:flex;justify-content:center}
.app{width:400px}h1{margin-bottom:40px;text-align:center}.card{background:#fff;padding:30px;border-radius:24px;border:1px solid #e0e7ff;margin-bottom:15px}
.bar{height:10px;background:#f1f5f9;border-radius:10px;overflow:hidden;margin:15px 0}.bar div{height:100%;background:#4f46e5}
span{font-weight:700;display:block;margin-bottom:20px}button{width:100%;padding:12px;background:#4f46e5;color:#fff;border:none;border-radius:12px;font-weight:700;cursor:pointer}`
  }
},

// ============================================================
// 💳 DIGITAL WALLET / CRYPTO
// ============================================================
crypto_wallet: {
  keywords: ['crypto', 'wallet', 'bitcoin', 'eth', 'defi', 'kripto cüzdan', 'para transferi', 'finans'],
  projectName: 'x-wallet',
  files: {
    'index.html': `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>X-Wallet</title><link rel="stylesheet" href="style.css"></head>
<body><div class="app"><div class="header"><span>Portfolio Value</span><h1>$8,420.50</h1><small>+$245.00 (24h)</small></div>
<div class="assets"><div class="a"><span>BTC</span><b>0.12</b></div><div class="a"><span>ETH</span><b>2.45</b></div><div class="a"><span>SOL</span><b>15.00</b></div></div>
<div class="btns"><button>Send</button><button>Swap</button></div></div></body></html>`,
    'style.css': `*{box-sizing:border-box;margin:0;padding:0}body{background:#000;color:#fff;font-family:'Inter',sans-serif;padding:60px;display:flex;justify-content:center}
.app{width:360px}.header{text-align:center;margin-bottom:50px}span{opacity:0.5;font-size:0.8rem}h1{font-size:2.5rem;margin:10px 0}small{color:#22c55e}
.assets{background:#111;padding:25px;border-radius:24px;border:1px solid #222;margin-bottom:30px}
.a{display:flex;justify-content:space-between;padding:15px 0;border-bottom:1px solid #222}.btns{display:flex;gap:15px}
button{flex:1;padding:15px;background:#fff;color:#000;border:none;border-radius:12px;font-weight:900;cursor:pointer}`
  }
},

// ============================================================
// 🍳 RECIPE EXPLORER
// ============================================================
recipes: {
  keywords: ['recipe', 'cooking', 'food', 'chef', 'ingredients', 'yemek tarifi', 'mutfak', 'şef'],
  projectName: 'chef-mode',
  files: {
    'index.html': `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>ChefMode</title><link rel="stylesheet" href="style.css"></head>
<body><nav>ChefMode</nav><h1>Quick Pasta</h1><div class="meta">⏱️ 15m | 🔥 450 kcal</div>
<div class="list"><h3>Ingredients</h3><ul><li>Pasta</li><li>Garlic</li><li>Olive Oil</li><li>Chili Flakes</li></ul></div>
<div class="steps"><h3>Steps</h3><p>1. Boil water.<br>2. Sauté garlic.<br>3. Mix everything.</p></div></body></html>`,
    'style.css': `*{box-sizing:border-box;margin:0;padding:0}body{background:#fff7ed;color:#7c2d12;font-family:'Inter',sans-serif;padding:60px;display:flex;justify-content:center}
nav{font-weight:900;margin-bottom:40px;display:block}h1{font-size:2.5rem;margin-bottom:10px}.meta{opacity:0.6;margin-bottom:40px}
.list,.steps{background:#fff;padding:30px;border-radius:24px;margin-bottom:20px;box-shadow:0 10px 15px rgba(124,45,18,0.05)}
h3{margin-bottom:15px}ul{padding-left:20px}p{line-height:1.6}`
  }
},

// ============================================================
// 🧠 MIND MAPPING TOOL
// ============================================================
mindmap: {
  keywords: ['mindmap', 'canvas', 'nodes', 'brainstorm', 'ideas', 'beyin fırtınası', 'zihin haritası', 'notlar'],
  projectName: 'idea-node',
  files: {
    'index.html': `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>IdeaNode</title><link rel="stylesheet" href="style.css"></head>
<body><div class="canvas"><div class="node center">Project X</div><div class="node n1">UI Design</div><div class="node n2">Backend</div><div class="node n3">Testing</div></div></body></html>`,
    'style.css': `*{box-sizing:border-box;margin:0;padding:0}body{background:#f1f5f9;font-family:'Inter',sans-serif;height:100vh;overflow:hidden}
.canvas{position:relative;width:100%;height:100%;display:flex;align-items:center;justify-content:center}
.node{position:absolute;padding:20px 40px;background:#fff;border-radius:50px;box-shadow:0 10px 25px rgba(0,0,0,0.05);font-weight:700;cursor:pointer}
.center{background:#3b82f6;color:#fff;z-index:2}.n1{top:20%;left:30%}.n2{top:70%;left:40%}.n3{top:40%;right:25%}`
  }
}

});
