/**
 * FORGE TEMPLATE REGISTRY — BATCH 17 (161-170)
 * Scanner, Warehouse, Shipment, Vendor, Purchase, Loyalty, Flash Sale, Reviews, Store, POS
 */
Object.assign(window.FORGE_TEMPLATES, {

// ============================================================
// 📦 INVENTORY SCANNER UI
// ============================================================
inv_scanner: {
  keywords: ['inventory', 'scanner', 'qr', 'barcode', 'stock', 'envanter', 'tarayıcı', 'barkod', 'stok'],
  projectName: 'x-scanner',
  files: {
    'index.html': `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>X-Scanner</title><link rel="stylesheet" href="style.css"></head>
<body><div class="app"><div class="scan-area">SCANNING...</div><div class="result">
<h3>Item: Laptop_X</h3><p>Stock: 42 units</p><div class="actions"><button>+</button><button>-</button></div></div></div></body></html>`,
    'style.css': `*{box-sizing:border-box;margin:0;padding:0}body{background:#000;color:#fff;font-family:'Inter',sans-serif;padding:40px;display:flex;justify-content:center}
.app{width:320px;text-align:center}.scan-area{height:200px;border:2px solid #22c55e;border-radius:24px;display:flex;align-items:center;justify-content:center;margin-bottom:40px;color:#22c55e}
.result{background:#111;padding:30px;border-radius:24px;border:1px solid #333}.actions{display:flex;gap:10px;justify-content:center;margin-top:20px}
button{width:50px;height:50px;background:#333;color:#fff;border:none;border-radius:50%;font-size:1.5rem;cursor:pointer}`
  }
},

// ============================================================
// 🚛 SHIPMENT TIMELINE
// ============================================================
shipment_timeline: {
  keywords: ['shipment', 'tracking', 'logistics', 'delivery', 'timeline', 'kargo', 'takip', 'lojistik', 'zaman çizelgesi'],
  projectName: 'x-track',
  files: {
    'index.html': `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>X-Track</title><link rel="stylesheet" href="style.css"></head>
<body><div class="app"><h1>Order #78292</h1><div class="timeline">
<div class="step active">Order Placed<span>Apr 24</span></div><div class="step active">In Transit<span>Apr 25</span></div>
<div class="step">Delivered<span>Est: Apr 26</span></div></div></div></body></html>`,
    'style.css': `*{box-sizing:border-box;margin:0;padding:0}body{background:#f8fafc;color:#0f172a;font-family:'Inter',sans-serif;padding:60px;display:flex;justify-content:center}
.app{width:360px}.timeline{border-left:2px solid #e2e8f0;padding-left:30px;margin-top:40px}.step{position:relative;margin-bottom:40px;opacity:0.3}
.step.active{opacity:1}.step::before{content:'';position:absolute;left:-37px;top:5px;width:12px;height:12px;background:#3b82f6;border-radius:50%}
span{display:block;font-size:0.8rem;opacity:0.6;margin-top:5px}`
  }
},

// ============================================================
// 🏗️ WAREHOUSE 3D LAYOUT (MOCK)
// ============================================================
warehouse_3d: {
  keywords: ['warehouse', 'layout', 'logistics', 'inventory', 'storage', 'depo', 'yerleşim', 'raf', 'stok'],
  projectName: 'x-warehouse',
  files: {
    'index.html': `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>X-Warehouse</title><link rel="stylesheet" href="style.css"></head>
<body><div class="app"><header><h2>Section A: Main Hall</h2></header><div class="grid">
<div class="rack full">R1</div><div class="rack">R2</div><div class="rack warning">R3</div><div class="rack">R4</div></div>
<div class="legend"><span>Full</span><span>Available</span><span>Low Stock</span></div></div></body></html>`,
    'style.css': `*{box-sizing:border-box;margin:0;padding:0}body{background:#1e293b;color:#f8fafc;font-family:'Inter',sans-serif;padding:60px;display:flex;justify-content:center}
.app{width:100%;max-width:500px}.grid{display:grid;grid-template-columns:repeat(4,1fr);gap:20px;margin:40px 0}
.rack{aspect-ratio:1;background:#334155;border-radius:8px;display:flex;align-items:center;justify-content:center;font-weight:900;border:1px solid #475569}
.rack.full{background:#3b82f6}.rack.warning{background:#ef4444}.legend{display:flex;justify-content:center;gap:30px;font-size:0.8rem;opacity:0.7}`
  }
},

// ============================================================
// 🤝 VENDOR MANAGEMENT PORTAL
// ============================================================
vendor_portal: {
  keywords: ['vendor', 'suppliers', 'management', 'portal', 'b2b', 'tedarikçi', 'yönetim', 'satıcı'],
  projectName: 'x-vendor',
  files: {
    'index.html': `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>X-Vendor</title><link rel="stylesheet" href="style.css"></head>
<body><div class="app"><h1>Vendor List</h1><div class="list">
<div class="v"><h4>Global Tech Inc</h4><p>Contact: John @ Global</p><button>Order Now</button></div>
<div class="v"><h4>FastLogistics Ltd</h4><p>Contact: Sarah @ Fast</p><button>Order Now</button></div></div></div></body></html>`,
    'style.css': `*{box-sizing:border-box;margin:0;padding:0}body{background:#f8fafc;color:#0f172a;font-family:'Inter',sans-serif;padding:60px;display:flex;justify-content:center}
.app{width:400px}.v{background:#fff;padding:25px;border-radius:16px;border:1px solid #e2e8f0;margin-bottom:15px}
h4{margin-bottom:5px}p{font-size:0.85rem;opacity:0.6;margin-bottom:20px}button{width:100%;padding:10px;background:#0f172a;color:#fff;border:none;border-radius:8px;cursor:pointer}`
  }
},

// ============================================================
// 📜 PURCHASE ORDER SYSTEM
// ============================================================
purchase_order: {
  keywords: ['purchase order', 'procurement', 'inventory', 'business', 'satın alma', 'sipariş', 'maliye'],
  projectName: 'x-po',
  files: {
    'index.html': `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>X-PO</title><link rel="stylesheet" href="style.css"></head>
<body><div class="app"><h1>New Purchase Order</h1><div class="form">
<input type="text" placeholder="Item Name"><input type="number" placeholder="Quantity"><button>Create PO</button></div>
<div class="history"><h3>Pending Approvals</h3><div class="p">PO-902: 50x Monitor<span>$5,000</span></div></div></div></body></html>`,
    'style.css': `*{box-sizing:border-box;margin:0;padding:0}body{background:#f1f5f9;color:#334155;font-family:'Inter',sans-serif;padding:60px;display:flex;justify-content:center}
.app{width:360px}.form{background:#fff;padding:30px;border-radius:24px;margin-bottom:40px}input{width:100%;padding:12px;margin-bottom:10px;border:1px solid #ddd;border-radius:8px}
button{width:100%;padding:12px;background:#3b82f6;color:#fff;border:none;border-radius:8px;cursor:pointer}.p{display:flex;justify-content:space-between;padding:10px 0;font-size:0.85rem;border-bottom:1px solid #ddd}`
  }
},

// ============================================================
// 💳 LOYALTY CARD WALLET
// ============================================================
loyalty_wallet: {
  keywords: ['loyalty', 'wallet', 'rewards', 'cards', 'coupons', 'sadakat', 'cüzdan', 'puan', 'kartlar'],
  projectName: 'x-loyalty',
  files: {
    'index.html': `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>X-Loyalty</title><link rel="stylesheet" href="style.css"></head>
<body><div class="app"><h1>My Rewards</h1><div class="card"><h3>Coffee Co.</h3><p>Points: 450</p><div class="barcode">BARCODE</div></div>
<div class="card" style="background:#1e293b"><h3>Tech Store</h3><p>Points: 1200</p><div class="barcode">BARCODE</div></div></div></body></html>`,
    'style.css': `*{box-sizing:border-box;margin:0;padding:0}body{background:#fafaf9;color:#44403c;font-family:'Inter',sans-serif;padding:60px;display:flex;justify-content:center}
.app{width:320px}.card{background:#b45309;color:#fff;padding:30px;border-radius:24px;margin-bottom:20px;position:relative}
.barcode{margin-top:20px;background:#fff;color:#000;padding:5px;font-family:monospace;text-align:center;font-size:0.7rem;letter-spacing:5px}`
  }
},

// ============================================================
// ⚡ FLASH SALE COUNTDOWN
// ============================================================
flash_sale: {
  keywords: ['flash sale', 'countdown', 'ecommerce', 'offers', 'campaign', 'flaş indirim', 'kampanya', 'geri sayım'],
  projectName: 'x-sale',
  files: {
    'index.html': `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>X-Sale</title><link rel="stylesheet" href="style.css"></head>
<body><div class="app"><h1>FLASH SALE</h1><div class="timer">04:12:45</div>
<div class="product"><h3>Wireless Pro Max</h3><p>Was $299 | Now <b>$149</b></p></div><button>Claim Now</button></div></body></html>`,
    'style.css': `*{box-sizing:border-box;margin:0;padding:0}body{background:#ef4444;color:#fff;font-family:'Inter',sans-serif;padding:60px;display:flex;justify-content:center}
.app{width:360px;text-align:center}h1{letter-spacing:10px;margin-bottom:20px}.timer{font-size:3rem;font-weight:900;background:#000;padding:20px;border-radius:12px;margin-bottom:40px}
.product{background:rgba(0,0,0,0.2);padding:30px;border-radius:24px;margin-bottom:30px}button{width:100%;padding:15px;background:#fff;color:#ef4444;border:none;border-radius:12px;font-weight:900;cursor:pointer}`
  }
},

// ============================================================
// ⭐ PRODUCT REVIEW AGGREGATOR
// ============================================================
review_aggregator: {
  keywords: ['reviews', 'ratings', 'feedback', 'aggregator', 'social proof', 'yorumlar', 'puanlama', 'analiz'],
  projectName: 'x-reviews',
  files: {
    'index.html': `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>X-Reviews</title><link rel="stylesheet" href="style.css"></head>
<body><div class="app"><h1>Overall Rating</h1><div class="score">4.8 / 5</div>
<div class="list"><div class="r">"Best tool ever!"<span>- Mike</span></div><div class="r">"Highly recommended."<span>- Sarah</span></div></div></div></body></html>`,
    'style.css': `*{box-sizing:border-box;margin:0;padding:0}body{background:#f8fafc;color:#0f172a;font-family:'Inter',sans-serif;padding:60px;display:flex;justify-content:center}
.app{width:360px;text-align:center}.score{font-size:4rem;font-weight:900;color:#fbbf24;margin:40px 0}.list{text-align:left}
.r{background:#fff;padding:20px;border-radius:12px;margin-bottom:10px;border:1px solid #e2e8f0}span{display:block;font-size:0.8rem;opacity:0.5;margin-top:5px}`
  }
},

// ============================================================
// 📍 STORE LOCATOR (RETAIL)
// ============================================================
store_locator: {
  keywords: ['store locator', 'map', 'branches', 'retail', 'find us', 'mağaza bulucu', 'şubeler', 'harita'],
  projectName: 'x-stores',
  files: {
    'index.html': `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>X-Stores</title><link rel="stylesheet" href="style.css"></head>
<body><div class="app"><h1>Find a Store</h1><div class="search"><input type="text" placeholder="Enter zip code"></div>
<div class="list"><div class="s"><h4>Central Plaza</h4><p>Open until 10 PM</p><span>1.2 miles away</span></div></div></div></body></html>`,
    'style.css': `*{box-sizing:border-box;margin:0;padding:0}body{background:#fff;color:#0f172a;font-family:'Inter',sans-serif;padding:60px;display:flex;justify-content:center}
.app{width:100%;max-width:400px}.search{margin-bottom:30px}input{width:100%;padding:12px;border:1px solid #e2e8f0;border-radius:8px}
.s{padding:20px;border-bottom:1px solid #f1f5f9}span{font-size:0.8rem;color:#3b82f6}`
  }
},

// ============================================================
// 🛒 POS (POINT OF SALE) UI
// ============================================================
pos_ui: {
  keywords: ['pos', 'point of sale', 'checkout', 'retail', 'billing', 'kasa', 'satış noktası', 'fatura'],
  projectName: 'x-pos',
  files: {
    'index.html': `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>X-POS</title><link rel="stylesheet" href="style.css"></head>
<body><div class="app"><div class="cart"><h3>Current Cart</h3><div class="i">Coffee<span>$4.50</span></div><div class="i">Bagel<span>$3.00</span></div></div>
<div class="total">Total: $7.50</div><button>PAY NOW</button></div></body></html>`,
    'style.css': `*{box-sizing:border-box;margin:0;padding:0}body{background:#0f172a;color:#fff;font-family:'Inter',sans-serif;padding:60px;display:flex;justify-content:center}
.app{width:320px;background:#1e293b;padding:30px;border-radius:24px}.cart{margin-bottom:40px}.i{display:flex;justify-content:space-between;padding:10px 0;border-bottom:1px solid #334155}
.total{font-size:2rem;font-weight:900;text-align:center;margin-bottom:40px}button{width:100%;padding:20px;background:#22c55e;color:#fff;border:none;border-radius:12px;font-weight:900;cursor:pointer}`
  }
}

});
