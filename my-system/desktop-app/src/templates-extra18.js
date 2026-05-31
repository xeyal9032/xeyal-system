/**
 * FORGE TEMPLATE REGISTRY — BATCH 18 (171-180)
 * Seat Map, Wedding, Menu, Housekeeping, Tour, Escape, Spa, Speaker, Check-in, Guestlist
 */
Object.assign(window.FORGE_TEMPLATES, {

// ============================================================
// 🎭 CONCERT HALL SEAT MAP
// ============================================================
seat_map: {
  keywords: ['seating', 'map', 'concert', 'theater', 'booking', 'tickets', 'koltuk planı', 'rezervasyon', 'tiyatro'],
  projectName: 'x-seats',
  files: {
    'index.html': `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>X-Seats</title><link rel="stylesheet" href="style.css"></head>
<body><div class="app"><div class="stage">STAGE</div><div class="grid">
<div class="s taken"></div><div class="s"></div><div class="s"></div><div class="s taken"></div></div>
<div class="info">Select a seat. Price: $85</div><button>Book Now</button></div></body></html>`,
    'style.css': `*{box-sizing:border-box;margin:0;padding:0}body{background:#000;color:#fff;font-family:'Inter',sans-serif;padding:60px;display:flex;justify-content:center}
.app{width:320px;text-align:center}.stage{height:40px;background:#333;margin-bottom:60px;display:flex;align-items:center;justify-content:center;font-weight:900;border-radius:4px}
.grid{display:grid;grid-template-columns:repeat(4,1fr);gap:15px;margin-bottom:40px}.s{aspect-ratio:1;background:#22c55e;border-radius:4px;cursor:pointer}
.s.taken{background:#ef4444;cursor:not-allowed}button{width:100%;padding:15px;background:#fff;color:#000;border:none;border-radius:8px;font-weight:900;cursor:pointer}`
  }
},

// ============================================================
// 💍 WEDDING RSVP & GUESTLIST
// ============================================================
wedding_rsvp: {
  keywords: ['wedding', 'rsvp', 'guestlist', 'invitation', 'events', 'düğün', 'davetiye', 'katılım', 'etkinlik'],
  projectName: 'x-wedding',
  files: {
    'index.html': `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>X-Wedding</title><link rel="stylesheet" href="style.css"></head>
<body><div class="app"><h1>Join our Big Day!</h1><p>John & Jane's Wedding</p><div class="form">
<input type="text" placeholder="Your Name"><div class="opts"><button>I'm Coming</button><button class="no">Cannot Attend</button></div></div></div></body></html>`,
    'style.css': `*{box-sizing:border-box;margin:0;padding:0}body{background:#fdfcfb;color:#431407;font-family:'Inter',sans-serif;padding:60px;display:flex;justify-content:center}
.app{width:100%;max-width:400px;text-align:center}h1{font-size:2rem;margin-bottom:10px}p{opacity:0.6;margin-bottom:40px}
input{width:100%;padding:15px;margin-bottom:20px;border:1px solid #ddd;border-radius:12px}.opts{display:flex;gap:10px}
button{flex:1;padding:15px;background:#431407;color:#fff;border:none;border-radius:12px;cursor:pointer}.button.no{background:#eee;color:#431407}`
  }
},

// ============================================================
// 👨‍🍳 CATERING MENU BUILDER
// ============================================================
menu_builder: {
  keywords: ['menu', 'catering', 'food', 'builder', 'restaurant', 'menü oluşturucu', 'catering', 'yemek', 'restoran'],
  projectName: 'x-menu',
  files: {
    'index.html': `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>X-Menu</title><link rel="stylesheet" href="style.css"></head>
<body><div class="app"><h1>Menu Builder</h1><div class="sections"><div class="s"><h3>Appetizers</h3><button>+ Add Item</button></div>
<div class="s"><h3>Main Course</h3><button>+ Add Item</button></div></div><button class="save">Save Menu</button></div></body></html>`,
    'style.css': `*{box-sizing:border-box;margin:0;padding:0}body{background:#fff;color:#0f172a;font-family:'Inter',sans-serif;padding:60px;display:flex;justify-content:center}
.app{width:400px}.s{background:#f8fafc;padding:25px;border-radius:16px;margin-bottom:20px;border:1px solid #e2e8f0}
h3{margin-bottom:15px}button{background:#fff;border:1px dashed #cbd5e1;padding:8px 15px;border-radius:6px;cursor:pointer}
.save{width:100%;margin-top:30px;padding:15px;background:#0f172a;color:#fff;border:none;border-radius:12px;font-weight:700}`
  }
},

// ============================================================
// 🧹 HOTEL HOUSEKEEPING APP
// ============================================================
housekeeping: {
  keywords: ['hotel', 'housekeeping', 'cleaning', 'rooms', 'staff', 'otel', 'temizlik', 'odalar', 'personel'],
  projectName: 'x-clean',
  files: {
    'index.html': `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>X-Clean</title><link rel="stylesheet" href="style.css"></head>
<body><div class="app"><h1>Housekeeping List</h1><div class="list">
<div class="r dirty">Room 102<span>Dirty</span></div><div class="r clean">Room 103<span>Clean</span></div>
<div class="r prog">Room 104<span>In Progress</span></div></div></div></body></html>`,
    'style.css': `*{box-sizing:border-box;margin:0;padding:0}body{background:#f1f5f9;color:#334155;font-family:'Inter',sans-serif;padding:60px;display:flex;justify-content:center}
.app{width:360px}h1{margin-bottom:40px;text-align:center}.r{background:#fff;padding:20px;border-radius:12px;margin-bottom:10px;display:flex;justify-content:space-between;align-items:center}
span{font-size:0.75rem;font-weight:700;padding:4px 10px;border-radius:4px}.dirty span{background:#fee2e2;color:#991b1b}
.clean span{background:#dcfce7;color:#166534}.prog span{background:#fef9c3;color:#854d0e}`
  }
},

// ============================================================
// 🗺️ TOUR GUIDE ITINERARY
// ============================================================
tour_itinerary: {
  keywords: ['tour', 'guide', 'travel', 'itinerary', 'trip', 'gezi', 'rehber', 'rota', 'zaman çizelgesi'],
  projectName: 'x-tour',
  files: {
    'index.html': `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>X-Tour</title><link rel="stylesheet" href="style.css"></head>
<body><div class="app"><h1>Paris City Tour</h1><div class="steps">
<div class="s"><span>09:00</span><h4>Eiffel Tower Visit</h4></div><div class="s"><span>12:00</span><h4>Lunch at Le Cafe</h4></div>
<div class="s"><span>15:00</span><h4>Louvre Museum</h4></div></div></div></body></html>`,
    'style.css': `*{box-sizing:border-box;margin:0;padding:0}body{background:#fff;color:#0f172a;font-family:'Inter',sans-serif;padding:60px;display:flex;justify-content:center}
.app{width:360px}.steps{border-left:2px solid #f1f5f9;padding-left:30px;margin-top:40px}.s{position:relative;margin-bottom:40px}
.s::before{content:'';position:absolute;left:-37px;top:5px;width:12px;height:12px;background:#3b82f6;border-radius:50%}
span{display:block;font-size:0.8rem;opacity:0.5;margin-bottom:5px}`
  }
},

// ============================================================
// 🔒 ESCAPE ROOM BOOKING
// ============================================================
escape_room: {
  keywords: ['escape room', 'booking', 'game', 'puzzle', 'sessions', 'kaçış oyunu', 'rezervasyon', 'seanslar'],
  projectName: 'x-escape',
  files: {
    'index.html': `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>X-Escape</title><link rel="stylesheet" href="style.css"></head>
<body><div class="app"><h1>Room: The Vault</h1><div class="grid">
<div class="t">10:00</div><div class="t taken">12:00</div><div class="t">14:00</div><div class="t">16:00</div></div>
<button>Book Selected</button></div></body></html>`,
    'style.css': `*{box-sizing:border-box;margin:0;padding:0}body{background:#000;color:#fff;font-family:monospace;padding:60px;display:flex;justify-content:center}
.app{width:320px;text-align:center}h1{margin-bottom:40px;color:#ef4444}.grid{display:grid;grid-template-columns:1fr 1fr;gap:15px;margin-bottom:40px}
.t{padding:15px;border:1px solid #333;cursor:pointer}.t.taken{opacity:0.2;text-decoration:line-through;cursor:not-allowed}
button{width:100%;padding:15px;background:#ef4444;color:#fff;border:none;font-weight:900;cursor:pointer}`
  }
},

// ============================================================
// 🧖 SPA & WELLNESS SCHEDULER
// ============================================================
spa_scheduler: {
  keywords: ['spa', 'wellness', 'massage', 'booking', 'appointments', 'masaj', 'bakım', 'randevu', 'ajanda'],
  projectName: 'x-spa',
  files: {
    'index.html': `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>X-Spa</title><link rel="stylesheet" href="style.css"></head>
<body><div class="app"><h1>Book Your Bliss</h1><div class="services">
<div class="s"><h4>Thai Massage</h4><span>$80 | 60m</span><button>Book</button></div>
<div class="s"><h4>Facial Care</h4><span>$60 | 45m</span><button>Book</button></div></div></div></body></html>`,
    'style.css': `*{box-sizing:border-box;margin:0;padding:0}body{background:#fdfaff;color:#5b21b6;font-family:'Inter',sans-serif;padding:60px;display:flex;justify-content:center}
.app{width:360px;text-align:center}.s{background:#fff;padding:25px;border-radius:24px;margin-bottom:15px;display:flex;align-items:center;justify-content:space-between;border:1px solid #ddd}
h4{font-size:1rem}span{font-size:0.8rem;opacity:0.6}button{background:#5b21b6;color:#fff;border:none;padding:8px 15px;border-radius:12px;cursor:pointer}`
  }
},

// ============================================================
// 🎙️ CONFERENCE SPEAKER BIO WALL
// ============================================================
speaker_bios: {
  keywords: ['conference', 'speakers', 'bios', 'events', 'profiles', 'konferans', 'konuşmacılar', 'biyografi', 'profiller'],
  projectName: 'x-speakers',
  files: {
    'index.html': `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>X-Speakers</title><link rel="stylesheet" href="style.css"></head>
<body><div class="app"><h1>Our Speakers</h1><div class="grid">
<div class="sp"><h3>Dr. Alice Smith</h3><p>AI Researcher @ Google</p></div>
<div class="sp"><h3>Bob Miller</h3><p>CEO @ TechFlow</p></div></div></div></body></html>`,
    'style.css': `*{box-sizing:border-box;margin:0;padding:0}body{background:#0f172a;color:#fff;font-family:'Inter',sans-serif;padding:60px;display:flex;justify-content:center}
.app{width:100%;max-width:500px}.grid{display:grid;grid-template-columns:1fr 1fr;gap:20px;margin-top:40px}
.sp{background:#1e293b;padding:30px;border-radius:24px;text-align:center;border:1px solid #334155}p{font-size:0.85rem;opacity:0.6;margin-top:10px}`
  }
},

// ============================================================
// 🏷️ BADGING / CHECK-IN PORTAL
// ============================================================
checkin_portal: {
  keywords: ['check-in', 'events', 'badging', 'registration', 'tickets', 'etkinlik giriş', 'kayıt', 'yaka kartı'],
  projectName: 'x-checkin',
  files: {
    'index.html': `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>X-Checkin</title><link rel="stylesheet" href="style.css"></head>
<body><div class="app"><h1>Event Check-in</h1><input type="text" placeholder="Search attendee name...">
<div class="list"><div class="a"><span>Sarah Connor</span><button>Print Badge</button></div></div></div></body></html>`,
    'style.css': `*{box-sizing:border-box;margin:0;padding:0}body{background:#f8fafc;color:#0f172a;font-family:'Inter',sans-serif;padding:60px;display:flex;justify-content:center}
.app{width:400px}input{width:100%;padding:15px;margin-bottom:30px;border:1px solid #ddd;border-radius:12px}.a{background:#fff;padding:20px;border-radius:16px;display:flex;justify-content:space-between;align-items:center;border:1px solid #e2e8f0}
button{background:#3b82f6;color:#fff;border:none;padding:10px 20px;border-radius:8px;cursor:pointer}`
  }
},

// ============================================================
// 🕺 NIGHTCLUB GUESTLIST MANAGER
// ============================================================
guestlist_mgr: {
  keywords: ['nightclub', 'guestlist', 'vip', 'events', 'party', 'gece kulübü', 'vip listesi', 'parti'],
  projectName: 'x-vip',
  files: {
    'index.html': `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>X-VIP</title><link rel="stylesheet" href="style.css"></head>
<body><div class="app"><h1>VIP Guestlist</h1><div class="list">
<div class="g"><span>Tony Stark (+2)</span><b>VIP</b></div><div class="g"><span>Bruce Wayne</span><b>VIP</b></div></div><button>Add Guest</button></div></body></html>`,
    'style.css': `*{box-sizing:border-box;margin:0;padding:0}body{background:#000;color:#fff;font-family:'Inter',sans-serif;padding:60px;display:flex;justify-content:center}
.app{width:360px}.g{background:#111;padding:25px;border-radius:16px;margin-bottom:10px;display:flex;justify-content:space-between;align-items:center;border:1px solid #333}
b{color:#fbbf24;font-size:0.75rem;letter-spacing:1px}button{width:100%;margin-top:30px;padding:15px;background:#fff;color:#000;border:none;border-radius:12px;font-weight:900;cursor:pointer}`
  }
}

});
