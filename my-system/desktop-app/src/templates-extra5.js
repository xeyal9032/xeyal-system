/**
 * FORGE TEMPLATE REGISTRY — BATCH 5 (10 templates)
 * Jobs, Real Estate, Streaming, Booking, LMS, Social, Weather, Notes, Music, Messenger
 */
Object.assign(window.FORGE_TEMPLATES, {

// ============================================================
// 💼 JOB BOARD UI
// ============================================================
jobs: {
  keywords: ['jobs', 'hiring', 'career', 'work', 'apply', 'iş', 'kariyer', 'ilan'],
  projectName: 'career-hub',
  files: {
    'index.html': `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>CareerHub</title><link rel="stylesheet" href="style.css"></head>
<body><header><h1>CareerHub</h1><div class="search"><input type="text" placeholder="Job title or keyword..."></div></header>
<div class="filters"><span>Full-time</span><span>Remote</span><span>Design</span></div>
<div class="list"><div class="j-card"><h3>Senior UX Designer</h3><p>Google • Mountain View, CA</p><div class="tags"><span>$150k - $220k</span><span>Full-time</span></div><button>Apply</button></div>
<div class="j-card"><h3>Frontend Engineer</h3><p>Xeyal Systems • Remote</p><div class="tags"><span>$120k - $180k</span><span>Remote</span></div><button>Apply</button></div></div></body></html>`,
    'style.css': `*{box-sizing:border-box;margin:0;padding:0}body{background:#f3f4f6;color:#111827;font-family:'Inter',sans-serif}
header{background:#fff;padding:40px;text-align:center;border-bottom:1px solid #e5e7eb}h1{margin-bottom:20px;letter-spacing:-1px}
input{width:100%;max-width:500px;padding:15px;border-radius:12px;border:1px solid #d1d5db;outline:none}
.filters{display:flex;justify-content:center;gap:10px;margin:20px 0}
.filters span{background:#fff;padding:8px 16px;border-radius:50px;border:1px solid #d1d5db;font-size:0.85rem;cursor:pointer}
.list{max-width:800px;margin:40px auto;padding:0 20px}
.j-card{background:#fff;padding:24px;border-radius:16px;margin-bottom:15px;border:1px solid #e5e7eb;position:relative}
.j-card h3{margin-bottom:5px}.j-card p{color:#6b7280;font-size:0.9rem;margin-bottom:15px}
.tags{display:flex;gap:10px}.tags span{background:#f3f4f6;padding:4px 10px;border-radius:4px;font-size:0.75rem;font-weight:600}
button{position:absolute;top:24px;right:24px;background:#2563eb;color:#fff;border:none;padding:10px 20px;border-radius:8px;cursor:pointer}`
  }
},

// ============================================================
// 🏠 REAL ESTATE LISTINGS
// ============================================================
estate: {
  keywords: ['estate', 'home', 'house', 'apartment', 'rent', 'buy', 'emlak', 'ev', 'kira', 'satılık'],
  projectName: 'dream-home',
  files: {
    'index.html': `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>DreamHome</title><link rel="stylesheet" href="style.css"></head>
<body><nav>DreamHome</nav><div class="hero"><h2>Find Your Perfect Space</h2></div>
<div class="grid"><div class="card"><div class="img"></div><div class="meta"><h4>Modern Villa</h4><span>$850,000</span><p>4 Bed | 3 Bath | 2,500 sqft</p></div></div>
<div class="card"><div class="img"></div><div class="meta"><h4>Skyline Penthouse</h4><span>$1,200,000</span><p>3 Bed | 2 Bath | 1,800 sqft</p></div></div></div></body></html>`,
    'style.css': `*{box-sizing:border-box;margin:0;padding:0}body{background:#fff;color:#1e293b;font-family:'Outfit',sans-serif}
nav{padding:20px 40px;font-weight:900;font-size:1.4rem;color:#0f172a}
.hero{height:300px;background:#f1f5f9;display:flex;align-items:center;justify-content:center;margin-bottom:60px}
.hero h2{font-size:3rem;letter-spacing:-2px}
.grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(350px,1fr));gap:30px;padding:0 40px}
.card{border-radius:24px;overflow:hidden;background:#fff;box-shadow:0 20px 40px rgba(0,0,0,0.05);border:1px solid #f1f5f9}
.img{height:240px;background:#cbd5e1}
.meta{padding:25px}h4{font-size:1.2rem;margin-bottom:8px}span{color:#3b82f6;font-weight:800;font-size:1.3rem;display:block;margin-bottom:10px}
p{font-size:0.85rem;color:#64748b;letter-spacing:0.5px}`
  }
},

// ============================================================
// 🎬 MOVIE STREAMING UI
// ============================================================
streaming: {
  keywords: ['movie', 'stream', 'netflix', 'video', 'cinema', 'watch', 'film', 'izle', 'sinema'],
  projectName: 'xeyal-tv',
  files: {
    'index.html': `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>Xeyal TV</title><link rel="stylesheet" href="style.css"></head>
<body><nav><h1>XEYAL TV</h1><div>🔍</div></nav><div class="hero"><div class="badge">TRENDING</div><h2>Inception</h2><p>A thief who steals corporate secrets through the use of dream-sharing technology.</p><button>▶ WATCH NOW</button></div>
<h3>Popular Movies</h3><div class="row"><div class="poster"></div><div class="poster"></div><div class="poster"></div><div class="poster"></div><div class="poster"></div></div></body></html>`,
    'style.css': `*{box-sizing:border-box;margin:0;padding:0}body{background:#06060f;color:#fff;font-family:'Inter',sans-serif}
nav{padding:20px 40px;display:flex;justify-content:space-between;align-items:center}h1{font-size:1.5rem;color:#ef4444;letter-spacing:2px}
.hero{height:500px;padding:80px 60px;background:linear-gradient(90deg,#06060f 30%,transparent),#1e293b;display:flex;flex-direction:column;justify-content:center;gap:20px}
.badge{background:#ef4444;width:fit-content;padding:4px 12px;border-radius:4px;font-size:0.7rem;font-weight:900}
h2{font-size:4rem}p{max-width:450px;color:#94a3b8;line-height:1.6}
button{width:fit-content;padding:15px 30px;background:#fff;color:#000;border:none;border-radius:4px;font-weight:900;cursor:pointer}
h3{padding:40px 40px 20px}
.row{display:flex;gap:15px;padding:0 40px;overflow-x:auto}.poster{min-width:180px;height:260px;background:#1e293b;border-radius:8px;transition:0.3s}.poster:hover{transform:scale(1.1)}`
  }
},

// ============================================================
// 📅 BOOKING & CALENDAR
// ============================================================
booking: {
  keywords: ['booking', 'calendar', 'appointment', 'schedule', 'date', 'randevu', 'takvim', 'rezervasyon'],
  projectName: 'book-easy',
  files: {
    'index.html': `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>BookEasy</title><link rel="stylesheet" href="style.css"></head>
<body><div class="app"><h2>Select a Date</h2><div class="cal-grid"><div class="day">Mon</div><div class="day">Tue</div><div class="day">Wed</div><div class="day">Thu</div><div class="day">Fri</div>
<div class="num">14</div><div class="num active">15</div><div class="num">16</div><div class="num">17</div><div class="num">18</div></div>
<h3>Available Slots</h3><div class="slots"><div class="slot">09:00 AM</div><div class="slot">11:30 AM</div><div class="slot active">02:00 PM</div></div><button class="confirm">CONFIRM BOOKING</button></div></body></html>`,
    'style.css': `*{box-sizing:border-box;margin:0;padding:0}body{background:#f8fafc;color:#0f172a;font-family:'Inter',sans-serif;display:flex;justify-content:center;padding-top:80px}
.app{width:340px;background:#fff;padding:30px;border-radius:32px;box-shadow:0 25px 50px rgba(0,0,0,0.05)}
h2{font-size:1.2rem;margin-bottom:20px}
.cal-grid{display:grid;grid-template-columns:repeat(5,1fr);gap:10px;margin-bottom:30px;text-align:center}
.day{font-size:0.75rem;color:#64748b;font-weight:600}.num{padding:10px;border-radius:12px;font-weight:700;cursor:pointer}
.num.active{background:#3b82f6;color:#fff}
h3{font-size:0.9rem;margin-bottom:15px}.slots{display:flex;flex-wrap:wrap;gap:10px;margin-bottom:30px}
.slot{padding:8px 15px;background:#f1f5f9;border-radius:8px;font-size:0.8rem;font-weight:600;cursor:pointer}
.slot.active{background:#0f172a;color:#fff}
.confirm{width:100%;padding:15px;border-radius:14px;border:none;background:#3b82f6;color:#fff;font-weight:700;cursor:pointer}`
  }
},

// ============================================================
// 🎓 LMS DASHBOARD
// ============================================================
lms: {
  keywords: ['lms', 'course', 'learning', 'education', 'student', 'kurs', 'eğitim', 'ders'],
  projectName: 'skill-grow',
  files: {
    'index.html': `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>SkillGrow</title><link rel="stylesheet" href="style.css"></head>
<body><div class="app"><aside><h2>SkillGrow</h2><div class="m">Courses</div><div class="m">My Progress</div></aside>
<main><header><h2>My Courses</h2></header><div class="list"><div class="c"><div class="icon">💻</div><div><h4>Advanced JS</h4><div class="pb"><div class="p" style="width:75%"></div></div></div><span>75%</span></div>
<div class="c"><div class="icon">🎨</div><div><h4>UX Design</h4><div class="pb"><div class="p" style="width:30%"></div></div></div><span>30%</span></div></div></main></div></body></html>`,
    'style.css': `*{box-sizing:border-box;margin:0;padding:0}body{background:#fdfaff;color:#2e1065;font-family:'Inter',sans-serif}
.app{display:grid;grid-template-columns:220px 1fr;height:100vh}
aside{background:#fff;padding:30px;border-right:1px solid #f3e8ff}
.m{padding:12px;border-radius:8px;margin-bottom:10px;background:#faf5ff;font-size:0.9rem;font-weight:600;cursor:pointer}
main{padding:40px}
.c{background:#fff;padding:20px;border-radius:16px;display:flex;align-items:center;gap:20px;margin-bottom:15px;border:1px solid #f3e8ff}
.icon{font-size:2rem}.c div{flex:1}h4{font-size:1rem;margin-bottom:10px}
.pb{height:8px;background:#f3e8ff;border-radius:10px;overflow:hidden}.p{height:100%;background:#9333ea}`
  }
},

// ============================================================
// 📱 SOCIAL FEED (INSTA-STYLE)
// ============================================================
social: {
  keywords: ['social', 'feed', 'instagram', 'posts', 'share', 'sosyal medya', 'akış', 'paylaş'],
  projectName: 'xeyal-social',
  files: {
    'index.html': `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>X-Social</title><link rel="stylesheet" href="style.css"></head>
<body><nav><h2>X-Social</h2></nav><div class="stories"><div class="s"></div><div class="s"></div><div class="s"></div><div class="s"></div></div>
<div class="feed"><div class="post"><div class="p-hdr"><b>User_One</b></div><div class="p-img"></div><div class="p-ftr">❤️ 💬 🚀<p>Exploring the new system! #coding</p></div></div>
<div class="post"><div class="p-hdr"><b>Code_Master</b></div><div class="p-img" style="background:#3b82f6"></div><div class="p-ftr">❤️ 💬 🚀<p>The UI looks amazing.</p></div></div></div></body></html>`,
    'style.css': `*{box-sizing:border-box;margin:0;padding:0}body{background:#fff;color:#000;font-family:'Inter',sans-serif;display:flex;flex-direction:column;align-items:center}
nav{width:100%;max-width:500px;padding:15px;display:flex;justify-content:center;border-bottom:1px solid #efefef}
.stories{width:100%;max-width:500px;padding:15px;display:flex;gap:15px;overflow-x:auto}.s{min-width:60px;height:60px;border-radius:50%;border:2px solid #ef4444;background:#f3f4f6}
.feed{width:100%;max-width:500px;padding:20px 0}.post{margin-bottom:30px;border-bottom:1px solid #efefef}
.p-hdr{padding:10px;font-size:0.9rem}.p-img{aspect-ratio:1;background:#f3f4f6}.p-ftr{padding:15px;font-size:1.2rem}
.p-ftr p{font-size:0.9rem;margin-top:10px;font-weight:400}`
  }
},

// ============================================================
// 🌦️ ADVANCED WEATHER
// ============================================================
weather_adv: {
  keywords: ['weather', 'forecast', 'rain', 'sun', 'temperature', 'hava durumu', 'tahmin', 'sıcaklık'],
  projectName: 'sky-watch',
  files: {
    'index.html': `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>SkyWatch</title><link rel="stylesheet" href="style.css"></head>
<body><div class="app"><div class="main-w"><h3>Istanbul</h3><h1>24°C</h1><p>Partly Cloudy</p></div>
<div class="stats"><div>💧 60%<br><small>Humidity</small></div><div>💨 12 km/h<br><small>Wind</small></div><div>☀️ 6<br><small>UV Index</small></div></div>
<div class="forecast"><div class="f-day"><span>Mon</span><b>22°</b></div><div class="f-day"><span>Tue</span><b>24°</b></div><div class="f-day"><span>Wed</span><b>21°</b></div><div class="f-day"><span>Thu</span><b>25°</b></div></div></div></body></html>`,
    'style.css': `*{box-sizing:border-box;margin:0;padding:0}body{background:linear-gradient(180deg,#60a5fa,#3b82f6);color:#fff;font-family:'Inter',sans-serif;display:flex;justify-content:center;padding-top:100px}
.app{width:320px;text-align:center}.main-w{margin-bottom:40px}h1{font-size:4rem;font-weight:200}
.stats{display:flex;justify-content:space-between;background:rgba(255,255,255,0.1);padding:20px;border-radius:24px;margin-bottom:40px;font-size:0.9rem}
small{opacity:0.6;font-size:0.7rem}.forecast{display:flex;justify-content:space-between}
.f-day{display:flex;flex-direction:column;gap:5px;font-size:0.85rem}`
  }
},

// ============================================================
// 📌 STICKY NOTES
// ============================================================
notes: {
  keywords: ['notes', 'sticky', 'board', 'memo', 'tasks', 'notlar', 'mantar pano', 'hatırlatıcı'],
  projectName: 'memo-board',
  files: {
    'index.html': `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>MemoBoard</title><link rel="stylesheet" href="style.css"></head>
<body><div class="board"><h1>📌 MemoBoard</h1><div class="grid">
<div class="note" style="background:#fef9c3">Buy groceries for the week.</div>
<div class="note" style="background:#dcfce7">Meeting with team at 2PM.</div>
<div class="note" style="background:#fee2e2">Finish the system audit.</div>
<div class="note" style="background:#e0e7ff">Call Xeyal about the update.</div></div></div></body></html>`,
    'style.css': `*{box-sizing:border-box;margin:0;padding:0}body{background:#f1f5f9;color:#475569;font-family:'Inter',sans-serif;padding:40px}
h1{margin-bottom:40px;text-align:center}.grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:20px}
.note{height:200px;padding:25px;border-radius:4px;box-shadow:5px 5px 15px rgba(0,0,0,0.05);font-size:1.1rem;font-weight:600;display:flex;align-items:center;justify-content:center;text-align:center;transform:rotate(-2deg);transition:0.2s}
.note:nth-child(even){transform:rotate(2deg)}.note:hover{transform:scale(1.05) rotate(0deg);z-index:10}`
  }
},

// ============================================================
// 🥁 DRUM MACHINE
// ============================================================
music: {
  keywords: ['music', 'drum', 'beats', 'audio', 'instrument', 'müzik', 'davul', 'ritim'],
  projectName: 'beat-maker',
  files: {
    'index.html': `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>BeatMaker</title><link rel="stylesheet" href="style.css"></head>
<body><div class="app"><h1>🥁 BeatMaker</h1><div class="pads"><div class="pad">KICK</div><div class="pad">SNARE</div><div class="pad">HI-HAT</div><div class="pad">CLAP</div>
<div class="pad">TOM</div><div class="pad">RIDE</div><div class="pad">CRASH</div><div class="pad">PERC</div></div><div class="ctrl"><span>BPM: 120</span><input type="range"></div></div></body></html>`,
    'style.css': `*{box-sizing:border-box;margin:0;padding:0}body{background:#000;color:#fff;font-family:'Inter',sans-serif;display:flex;justify-content:center;align-items:center;min-height:100vh}
.app{text-align:center}h1{margin-bottom:40px;letter-spacing:4px}.pads{display:grid;grid-template-columns:repeat(4,1fr);gap:15px;margin-bottom:40px}
.pad{width:80px;height:80px;background:#111;border:2px solid #333;border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:0.7rem;font-weight:900;cursor:pointer;transition:0.1s}
.pad:hover{background:#222;border-color:#3b82f6}.pad:active{transform:scale(0.95);background:#3b82f6;border-color:#fff}
.ctrl{display:flex;align-items:center;justify-content:center;gap:20px;opacity:0.6}`
  }
},

// ============================================================
// 💬 MESSENGER UI
// ============================================================
chat: {
  keywords: ['chat', 'chat ui', 'messenger', 'message', 'whatsapp', 'slack', 'mesaj', 'sohbet'],
  projectName: 'xeyal-chat',
  files: {
    'index.html': `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>X-Chat</title><link rel="stylesheet" href="style.css"></head>
<body><div class="app"><aside><div class="u">User A</div><div class="u active">User B</div><div class="u">User C</div></aside>
<main><div class="msgs"><div class="m r">Hey! How is it going?</div><div class="m s">Pretty good, just testing the system.</div><div class="m r">The UI is super smooth.</div></div>
<div class="in"><input type="text" placeholder="Type a message..."><button>Send</button></div></main></div></body></html>`,
    'style.css': `*{box-sizing:border-box;margin:0;padding:0}body{background:#f3f4f6;color:#1e293b;font-family:'Inter',sans-serif}
.app{display:grid;grid-template-columns:260px 1fr;height:100vh}
aside{background:#fff;padding:20px;border-right:1px solid #e5e7eb}.u{padding:15px;border-radius:12px;margin-bottom:5px;cursor:pointer}.u.active{background:#f1f5f9;font-weight:700}
main{display:flex;flex-direction:column}
.msgs{flex:1;padding:30px;display:flex;flex-direction:column;gap:15px;overflow-y:auto}
.m{max-width:70%;padding:12px 16px;border-radius:18px;font-size:0.95rem}
.m.r{align-self:flex-start;background:#fff;border-bottom-left-radius:2px}
.m.s{align-self:flex-end;background:#3b82f6;color:#fff;border-bottom-right-radius:2px}
.in{padding:20px;background:#fff;display:flex;gap:10px}input{flex:1;padding:12px;border-radius:8px;border:1px solid #e5e7eb;outline:none}`
  }
}

});
