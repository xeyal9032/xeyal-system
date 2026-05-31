/**
 * FORGE TEMPLATE REGISTRY — BATCH 6 (10 templates)
 * Kanban, Support, Inventory, Invoice, Analytics, Admin, SaaS, Wiki, Email, Survey
 */
Object.assign(window.FORGE_TEMPLATES, {

// ============================================================
// 📋 PROJECT KANBAN BOARD
// ============================================================
kanban: {
  keywords: ['kanban', 'trello', 'board', 'tasks', 'project management', 'görev', 'pano', 'proje'],
  projectName: 'task-flow',
  files: {
    'index.html': `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>TaskFlow</title><link rel="stylesheet" href="style.css"></head>
<body><nav><h1>TaskFlow</h1><button>+ New Task</button></nav>
<div class="board"><div class="col"><h4>TO DO</h4><div class="card">Fix CSS bugs</div><div class="card">Update API docs</div></div>
<div class="col"><h4>DOING</h4><div class="card">Batch 6 Templates</div></div><div class="col"><h4>DONE</h4><div class="card">System Audit</div><div class="card">Ollama Fix</div></div></div></body></html>`,
    'style.css': `*{box-sizing:border-box;margin:0;padding:0}body{background:#f8fafc;color:#1e293b;font-family:'Inter',sans-serif}
nav{padding:20px 40px;display:flex;justify-content:space-between;align-items:center;background:#fff;border-bottom:1px solid #e2e8f0}
h1{font-size:1.4rem;letter-spacing:-1px;color:#3b82f6}nav button{background:#3b82f6;color:#fff;border:none;padding:10px 20px;border-radius:8px;font-weight:600;cursor:pointer}
.board{display:grid;grid-template-columns:repeat(3,1fr);gap:25px;padding:40px}
.col{background:#f1f5f9;padding:20px;border-radius:12px;min-height:400px}h4{font-size:0.8rem;color:#64748b;margin-bottom:20px;letter-spacing:1px}
.card{background:#fff;padding:15px;border-radius:8px;box-shadow:0 2px 4px rgba(0,0,0,0.05);margin-bottom:12px;font-size:0.9rem;border:1px solid #e2e8f0;cursor:pointer}`
  }
},

// ============================================================
// 🛠️ CUSTOMER SUPPORT PORTAL
// ============================================================
support: {
  keywords: ['support', 'helpdesk', 'ticket', 'customer', 'destek', 'yardım', 'müşteri'],
  projectName: 'help-center',
  files: {
    'index.html': `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>HelpCenter</title><link rel="stylesheet" href="style.css"></head>
<body><header><h2>Support Portal</h2></header><div class="stats"><div class="s">Open: 12</div><div class="s">Resolved: 84</div></div>
<div class="tickets"><div class="t"><div class="pri high"></div><div><h4>Login Issue</h4><span>#4021 by UserX</span></div><button>View</button></div>
<div class="t"><div class="pri med"></div><div><h4>Billing Question</h4><span>#4022 by UserY</span></div><button>View</button></div></div></body></html>`,
    'style.css': `*{box-sizing:border-box;margin:0;padding:0}body{background:#fdfaff;color:#2e1065;font-family:'Inter',sans-serif;padding:40px}
header{margin-bottom:40px}h2{font-size:1.8rem;letter-spacing:-1px}
.stats{display:flex;gap:20px;margin-bottom:40px}.s{background:#fff;padding:15px 25px;border-radius:12px;font-weight:700;border:1px solid #f3e8ff}
.t{background:#fff;padding:20px;border-radius:16px;display:flex;align-items:center;gap:20px;margin-bottom:15px;border:1px solid #f3e8ff}
.pri{width:10px;height:40px;border-radius:10px}.high{background:#ef4444}.med{background:#f59e0b}
.t div{flex:1}h4{font-size:1rem;margin-bottom:5px}span{font-size:0.8rem;opacity:0.6}
button{background:#f3e8ff;border:none;padding:8px 15px;border-radius:6px;cursor:pointer}`
  }
},

// ============================================================
// 📦 INVENTORY MANAGER
// ============================================================
inventory: {
  keywords: ['inventory', 'stock', 'warehouse', 'warehouse management', 'stok', 'depo', 'ürün takibi'],
  projectName: 'stock-master',
  files: {
    'index.html': `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>StockMaster</title><link rel="stylesheet" href="style.css"></head>
<body><div class="app"><h2>Warehouse Stock</h2><div class="table"><div class="row hdr"><span>Product</span><span>In Stock</span><span>Status</span></div>
<div class="row"><span>MacBook Pro</span><span>12</span><span class="st ok">OK</span></div><div class="row"><span>iPhone 15</span><span>4</span><span class="st low">LOW</span></div><div class="row"><span>iPad Air</span><span>0</span><span class="st out">OUT</span></div></div></div></body></html>`,
    'style.css': `*{box-sizing:border-box;margin:0;padding:0}body{background:#09090b;color:#fafafa;font-family:'Inter',sans-serif;padding:60px;display:flex;justify-content:center}
.app{width:100%;max-width:600px}h2{margin-bottom:30px;letter-spacing:-1px}
.table{background:#18181b;border-radius:12px;overflow:hidden;border:1px solid #27272a}
.row{display:grid;grid-template-columns:1fr 100px 100px;padding:15px 25px;border-bottom:1px solid #27272a;font-size:0.9rem}
.row.hdr{background:#27272a;font-weight:700;color:#a1a1aa;font-size:0.8rem;text-transform:uppercase}
.st{font-size:0.75rem;font-weight:900;padding:2px 8px;border-radius:4px;text-align:center}
.ok{background:#22c55e22;color:#22c55e}.low{background:#f59e0b22;color:#f59e0b}.out{background:#ef444422;color:#ef4444}`
  }
},

// ============================================================
// 🧾 INVOICING SYSTEM
// ============================================================
invoice: {
  keywords: ['invoice', 'billing', 'payment', 'receipt', 'fatura', 'ödeme', 'makbuz'],
  projectName: 'easy-invoice',
  files: {
    'index.html': `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>Invoice</title><link rel="stylesheet" href="style.css"></head>
<body><div class="invoice-box"><h1>INVOICE</h1><div class="meta"><div><b>From:</b><br>Xeyal Systems<br>Baku, Azerbaijan</div><div><b>To:</b><br>John Doe<br>London, UK</div></div>
<div class="items"><div class="i hdr"><span>Item</span><span>Price</span></div><div class="i"><span>Web Design</span><span>$1,200</span></div><div class="i"><span>System Audit</span><span>$450</span></div></div>
<div class="total">Total: $1,650</div><button>Download PDF</button></div></body></html>`,
    'style.css': `*{box-sizing:border-box;margin:0;padding:0}body{background:#f1f5f9;color:#0f172a;font-family:'Inter',sans-serif;padding:60px;display:flex;justify-content:center}
.invoice-box{width:100%;max-width:500px;background:#fff;padding:40px;border-radius:8px;box-shadow:0 10px 25px rgba(0,0,0,0.05)}
h1{font-size:2rem;color:#3b82f6;margin-bottom:40px;letter-spacing:4px}
.meta{display:flex;justify-content:space-between;margin-bottom:40px;font-size:0.9rem;line-height:1.6}
.items{margin-bottom:40px;border-top:1px solid #e2e8f0}.i{display:flex;justify-content:space-between;padding:15px 0;border-bottom:1px solid #f1f5f9;font-size:0.9rem}
.i.hdr{font-weight:700;color:#64748b;text-transform:uppercase;font-size:0.75rem}
.total{text-align:right;font-size:1.5rem;font-weight:900;margin-bottom:30px}
button{width:100%;padding:15px;background:#0f172a;color:#fff;border:none;border-radius:6px;font-weight:700;cursor:pointer}`
  }
},

// ============================================================
// 📈 ANALYTICS DASHBOARD
// ============================================================
analytics: {
  keywords: ['analytics', 'dashboard', 'data', 'metrics', 'stats', 'istatistik', 'veri', 'analiz'],
  projectName: 'data-view',
  files: {
    'index.html': `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>DataView</title><link rel="stylesheet" href="style.css"></head>
<body><div class="app"><header><h2>Platform Stats</h2><select><option>Last 30 Days</option></select></header>
<div class="grid"><div class="card"><span>Users</span><h3>12.4k</h3><div class="line" style="width:70%"></div></div><div class="card"><span>Revenue</span><h3>$48,200</h3><div class="line" style="width:40%"></div></div></div>
<div class="main-chart"><h4>Traffic Source</h4><div class="pie"></div><div class="legend"><div>● Organic</div><div>● Direct</div></div></div></div></body></html>`,
    'style.css': `*{box-sizing:border-box;margin:0;padding:0}body{background:#f8fafc;color:#0f172a;font-family:'Inter',sans-serif;padding:40px;display:flex;justify-content:center}
.app{width:100%;max-width:500px}header{display:flex;justify-content:space-between;margin-bottom:30px}
.grid{display:grid;grid-template-columns:1fr 1fr;gap:20px;margin-bottom:20px}
.card{background:#fff;padding:25px;border-radius:16px;border:1px solid #e2e8f0}.card span{font-size:0.8rem;color:#64748b}
.card h3{font-size:1.6rem;margin:10px 0}.line{height:4px;background:#3b82f6;border-radius:2px}
.main-chart{background:#fff;padding:30px;border-radius:20px;border:1px solid #e2e8f0;text-align:center}
.pie{width:120px;height:120px;border-radius:50%;background:conic-gradient(#3b82f6 70%,#e2e8f0 0);margin:20px auto}
.legend{display:flex;justify-content:center;gap:20px;font-size:0.8rem;color:#64748b}`
  }
},

// ============================================================
// 🧱 ADMIN PANEL LAYOUT
// ============================================================
admin: {
  keywords: ['admin', 'panel', 'cms', 'backoffice', 'management', 'yönetim paneli', 'kontrol paneli'],
  projectName: 'xeyal-admin-pro',
  files: {
    'index.html': `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>X-Admin Pro</title><link rel="stylesheet" href="style.css"><link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700&display=swap" rel="stylesheet"></head>
<body><div class="app">
<aside class="sidebar"><div class="logo">X-FORGE</div><nav><div class="active">📊 Dashboard</div><div>👥 Users</div><div>📦 Products</div><div>📈 Analytics</div><div>⚙️ Settings</div></nav></aside>
<main class="content">
<header><div class="search">🔍 Search operations...</div><div class="user-profile"><span>Xeyal Admin</span><div class="avatar"></div></div></header>
<section class="overview"><h1>System Overview</h1><div class="stats-grid">
<div class="card"><span>Total Revenue</span><h3>$124,502.00</h3><div class="trend up">+14.2%</div></div>
<div class="card"><span>Active Sessions</span><h3>1,402</h3><div class="trend up">+5.1%</div></div>
<div class="card"><span>Error Rate</span><h3>0.04%</h3><div class="trend down">-1.2%</div></div>
<div class="card"><span>Server Load</span><h3>22%</h3><div class="trend">Optimal</div></div>
</div></section>
<section class="main-view"><div class="table-container"><h3>Recent Transactions</h3>
<table><thead><tr><th>User</th><th>Product</th><th>Amount</th><th>Status</th></tr></thead>
<tbody><tr><td>John Doe</td><td>SystemX Pro</td><td>$450</td><td><span class="badge success">Completed</span></td></tr>
<tr><td>Sarah Wilson</td><td>Cloud Bridge</td><td>$120</td><td><span class="badge pending">Pending</span></td></tr>
<tr><td>Mike Ross</td><td>Healer Engine</td><td>$299</td><td><span class="badge success">Completed</span></td></tr></tbody></table>
</div></section></main></div></body></html>`,
    'style.css': `*{box-sizing:border-box;margin:0;padding:0}body{background:#f0f2f5;color:#1a1c1e;font-family:'Inter',sans-serif;overflow-x:hidden}
.app{display:flex;min-height:100vh}.sidebar{width:260px;background:#0f172a;color:#fff;padding:40px 20px;display:flex;flex-direction:column;position:fixed;height:100vh}
.logo{font-size:1.5rem;font-weight:900;letter-spacing:2px;margin-bottom:60px;background:linear-gradient(90deg,#3b82f6,#9333ea);-webkit-background-clip:text;-webkit-text-fill-color:transparent}
nav div{padding:12px 20px;border-radius:12px;margin-bottom:8px;cursor:pointer;transition:0.2s;font-weight:500;opacity:0.6}
nav div:hover{background:rgba(255,255,255,0.05);opacity:1}nav div.active{background:#3b82f6;color:#fff;opacity:1;box-shadow:0 10px 20px rgba(59,130,246,0.2)}
.content{flex:1;margin-left:260px;padding:40px}header{display:flex;justify-content:space-between;align-items:center;margin-bottom:40px}
.search{background:#fff;padding:12px 25px;border-radius:50px;width:300px;font-size:0.85rem;color:#64748b;box-shadow:0 2px 10px rgba(0,0,0,0.02)}
.user-profile{display:flex;align-items:center;gap:15px;font-weight:600}.avatar{width:40px;height:40px;background:#3b82f6;border-radius:12px}
h1{font-size:1.8rem;letter-spacing:-1px;margin-bottom:30px}.stats-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:25px;margin-bottom:40px}
.card{background:#fff;padding:30px;border-radius:24px;box-shadow:0 10px 30px rgba(0,0,0,0.03);position:relative;overflow:hidden}
.card span{font-size:0.8rem;color:#64748b;text-transform:uppercase;font-weight:700}.card h3{font-size:1.8rem;margin:10px 0}
.trend{font-size:0.75rem;font-weight:700}.up{color:#22c55e}.down{color:#ef4444}
.table-container{background:#fff;padding:40px;border-radius:32px;box-shadow:0 20px 50px rgba(0,0,0,0.04)}
table{width:100%;text-align:left;border-collapse:collapse;margin-top:20px}th{padding:15px;font-size:0.75rem;text-transform:uppercase;color:#94a3b8;border-bottom:1px solid #f1f5f9}
td{padding:20px 15px;border-bottom:1px solid #f8fafc;font-size:0.9rem}.badge{padding:5px 12px;border-radius:50px;font-size:0.7rem;font-weight:700}
.success{background:#dcfce7;color:#166534}.pending{background:#fef3c7;color:#92400e}`
  }
},

// ============================================================
// 🚀 SAAS LANDING PAGE
// ============================================================
saas: {
  keywords: ['saas', 'landing', 'product', 'marketing', 'pricing', 'satış sayfası', 'ürün tanıtımı', 'fiyatlandırma'],
  projectName: 'saas-launch',
  files: {
    'index.html': `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>SaaS</title><link rel="stylesheet" href="style.css"></head>
<body><nav><b>SAAS.IO</b><button>Login</button></nav>
<header><h1>Scale your business faster.</h1><p>The all-in-one platform to manage your workflow and automate tasks.</p><button class="cta">Start Free Trial</button></header>
<section class="pricing"><h2>Simple Pricing</h2><div class="p-grid"><div class="p-card"><h4>Basic</h4><h3>$19/mo</h3><button>Choose</button></div>
<div class="p-card active"><h4>Pro</h4><h3>$49/mo</h3><button>Choose</button></div></div></section></body></html>`,
    'style.css': `*{box-sizing:border-box;margin:0;padding:0}body{background:#fff;color:#0f172a;font-family:'Outfit',sans-serif}
nav{padding:20px 40px;display:flex;justify-content:space-between;align-items:center;border-bottom:1px solid #f1f5f9}
header{text-align:center;padding:100px 20px;background:radial-gradient(circle at top,#f0f9ff,#fff)}
h1{font-size:3.5rem;margin-bottom:20px;letter-spacing:-2px}p{font-size:1.2rem;color:#64748b;margin-bottom:40px}
.cta{background:#3b82f6;color:#fff;border:none;padding:15px 35px;border-radius:8px;font-weight:900;cursor:pointer}
.pricing{padding:80px 40px;text-align:center}.p-grid{display:flex;justify-content:center;gap:30px;margin-top:40px}
.p-card{padding:40px;border:1px solid #e2e8f0;border-radius:24px;width:240px}
.p-card.active{border-color:#3b82f6;box-shadow:0 20px 40px rgba(59,130,246,0.1)}`
  }
},

// ============================================================
// 📖 INTERNAL WIKI/DOCS
// ============================================================
wiki: {
  keywords: ['wiki', 'docs', 'documentation', 'knowledge base', 'bilgi bankası', 'dokümantasyon'],
  projectName: 'internal-docs',
  files: {
    'index.html': `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>Docs</title><link rel="stylesheet" href="style.css"></head>
<body><div class="app"><aside><h3>DOCS</h3><nav><b>Getting Started</b><div class="active">Installation</div><div>Configuration</div><b>Advanced</b><div>Security</div></nav></aside>
<main><h1>Installation</h1><p>To install the system, run the following command in your terminal:</p><code>npm install xeyal-system</code><div class="note">Make sure you have Node v20+ installed.</div></main></div></body></html>`,
    'style.css': `*{box-sizing:border-box;margin:0;padding:0}body{background:#fff;color:#1e293b;font-family:'Inter',sans-serif}
.app{display:grid;grid-template-columns:260px 1fr;height:100vh}
aside{background:#f8fafc;padding:40px;border-right:1px solid #e2e8f0}
nav{margin-top:30px}nav b{display:block;margin-bottom:10px;font-size:0.75rem;color:#94a3b8;text-transform:uppercase}
nav div{padding:8px 0;font-size:0.9rem;cursor:pointer}.active{color:#3b82f6;font-weight:700}
main{padding:60px 80px}h1{font-size:2.5rem;margin-bottom:20px}code{display:block;background:#0f172a;color:#fff;padding:20px;border-radius:8px;font-family:monospace;margin:30px 0}
.note{padding:15px;background:#fff7ed;border-left:4px solid #f97316;color:#9a3412}`
  }
},

// ============================================================
// 📧 EMAIL MARKETING
// ============================================================
email: {
  keywords: ['email', 'marketing', 'campaign', 'mailchimp', 'newsletter', 'e-posta', 'kampanya', 'bülten'],
  projectName: 'mail-flow',
  files: {
    'index.html': `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>MailFlow</title><link rel="stylesheet" href="style.css"></head>
<body><div class="app"><header><h2>Campaigns</h2><button>Create New</button></header>
<div class="stats"><div class="s">Open Rate<br><b>24.5%</b></div><div class="s">Click Rate<br><b>8.2%</b></div><div class="s">Unsubscribed<br><b>0.4%</b></div></div>
<div class="list"><h3>Active Campaigns</h3><div class="c"><span>Welcome Series</span><b>Sending...</b></div><div class="c"><span>Monthly Newsletter</span><b>Completed</b></div></div></div></body></html>`,
    'style.css': `*{box-sizing:border-box;margin:0;padding:0}body{background:#fafafa;color:#18181b;font-family:'Inter',sans-serif;padding:60px;display:flex;justify-content:center}
.app{width:100%;max-width:600px}header{display:flex;justify-content:space-between;margin-bottom:40px}
.stats{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;margin-bottom:40px}
.s{background:#fff;padding:20px;border-radius:12px;border:1px solid #e4e4e7}
.list{background:#fff;padding:30px;border-radius:16px;border:1px solid #e4e4e7}
.c{display:flex;justify-content:space-between;padding:15px 0;border-bottom:1px solid #f4f4f5}
button{background:#18181b;color:#fff;border:none;padding:10px 20px;border-radius:6px;cursor:pointer}`
  }
},

// ============================================================
// 📝 SURVEY BUILDER
// ============================================================
survey: {
  keywords: ['survey', 'builder', 'poll', 'form', 'feedback', 'anket', 'form oluşturma', 'geri bildirim'],
  projectName: 'survey-gen',
  files: {
    'index.html': `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>SurveyGen</title><link rel="stylesheet" href="style.css"></head>
<body><div class="app"><h1>Create Survey</h1><div class="q"><span>Q1: How do you rate our service?</span><div class="type">Star Rating</div></div>
<div class="q"><span>Q2: Any additional comments?</span><div class="type">Text Input</div></div><button class="add">+ Add Question</button></div></body></html>`,
    'style.css': `*{box-sizing:border-box;margin:0;padding:0}body{background:#fdf2f8;color:#831843;font-family:'Inter',sans-serif;padding:80px;display:flex;justify-content:center}
.app{width:400px}h1{margin-bottom:40px;text-align:center}.q{background:#fff;padding:25px;border-radius:16px;margin-bottom:15px;box-shadow:0 4px 6px -1px rgba(0,0,0,0.05)}
.type{font-size:0.75rem;color:#db2777;background:#fce7f3;padding:4px 10px;border-radius:50px;width:fit-content;margin-top:10px;font-weight:700}
.add{width:100%;padding:15px;border-radius:12px;border:2px dashed #f9a8d4;background:transparent;color:#db2777;font-weight:700;cursor:pointer;margin-top:20px}`
  }
}

});
