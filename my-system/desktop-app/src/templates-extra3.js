/**
 * FORGE TEMPLATE REGISTRY — BATCH 3 (10 templates)
 * Breakout, Hangman, Space Invaders, Unit Converter, BMI,
 * Text Analyzer, Resume/CV, Music Player, Grade Calc, Weather
 */
Object.assign(window.FORGE_TEMPLATES, {

// ============================================================
// 🧱 BREAKOUT
// ============================================================
breakout: {
  keywords: ['breakout', 'brick', 'arkanoid', 'tuğla', 'tugla', 'topu', 'ball game'],
  projectName: 'breakout',
  files: {
    'index.html': `<!DOCTYPE html><html lang="tr"><head><meta charset="UTF-8"><title>Breakout</title><link rel="stylesheet" href="style.css"></head>
<body><div class="app"><h1>🧱 BREAKOUT</h1>
<div class="hud"><span>PUAN: <b id="sc">0</b></span><span>CAN: <b id="lv">3</b> ❤️</span><span>SEVİYE: <b id="lvl">1</b></span></div>
<canvas id="cv" width="480" height="420"></canvas>
<div class="hint">← → veya Fare ile hareket et &nbsp;|&nbsp; Space ile başlat</div>
<div class="ov" id="ov"><div class="ob"><h2 id="ot">BREAKOUT</h2><p id="os">Space veya tıkla</p><button class="btn" onclick="startGame()">▶ BAŞLAT</button></div></div>
</div><script src="app.js"></script></body></html>`,

    'style.css': `*{box-sizing:border-box;margin:0;padding:0}body{background:#06060f;color:#e2e8f0;font-family:'Segoe UI',sans-serif;display:flex;align-items:center;justify-content:center;min-height:100vh}
.app{display:flex;flex-direction:column;align-items:center;gap:12px;position:relative}
h1{font-size:1.6rem;font-weight:900;letter-spacing:4px;background:linear-gradient(135deg,#f97316,#ef4444);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
.hud{display:flex;gap:32px;font-size:0.9rem;color:#94a3b8}.hud b{color:#f97316}
#cv{border:2px solid rgba(249,115,22,0.3);border-radius:4px;box-shadow:0 0 32px rgba(249,115,22,0.2);display:block;background:#06060f}
.hint{font-size:0.72rem;color:#475569;letter-spacing:1px}
.ov{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;background:rgba(6,6,15,0.92);-webkit-backdrop-filter:blur(4px);backdrop-filter:blur(4px);z-index:10}
.ov.hidden{display:none}.ob{text-align:center;display:flex;flex-direction:column;gap:14px;align-items:center}
.ob h2{font-size:2.2rem;letter-spacing:4px;color:#f97316}.ob p{color:#94a3b8}
.btn{padding:12px 32px;border-radius:24px;border:none;background:linear-gradient(135deg,#f97316,#ef4444);color:white;font-weight:700;cursor:pointer;font-size:0.95rem;letter-spacing:2px;transition:all 0.2s}
.btn:hover{transform:scale(1.05);box-shadow:0 0 24px rgba(249,115,22,0.5)}`,

    'app.js': `var W=480,H=420,PW=80,PH=10,BR=8,ROWS=5,COLS=9,BPAD=4,BTOP=50;var cv=document.getElementById('cv'),cx=cv.getContext('2d');var px,ball,bricks,sc,lives,lvl,running,raf,keys={};var BCLRS=['#ef4444','#f97316','#f59e0b','#22c55e','#06b6d4'];
function makeBricks(){var arr=[];for(var r=0;r<ROWS;r++)for(var c=0;c<COLS;c++){var bw=(W-BPAD*(COLS+1))/COLS;arr.push({x:BPAD+(bw+BPAD)*c,y:BTOP+r*(16+BPAD),w:bw,h:16,alive:true,color:BCLRS[r%BCLRS.length]});}return arr;}
function startGame(){px={x:W/2-PW/2,y:H-30};ball={x:W/2,y:H/2,vx:3,vy:-4,r:8};bricks=makeBricks();sc=0;lives=3;lvl=1;running=true;document.getElementById('sc').textContent=0;document.getElementById('lv').textContent=3;document.getElementById('lvl').textContent=1;document.getElementById('ov').classList.add('hidden');if(raf)cancelAnimationFrame(raf);raf=requestAnimationFrame(loop);}
function draw(){cx.fillStyle='#06060f';cx.fillRect(0,0,W,H);bricks.forEach(function(b){if(!b.alive)return;cx.fillStyle=b.color;cx.fillRect(b.x,b.y,b.w,b.h);cx.fillStyle='rgba(255,255,255,0.2)';cx.fillRect(b.x,b.y,b.w,4);});var pg=cx.createLinearGradient(px.x,0,px.x+PW,0);pg.addColorStop(0,'#f97316');pg.addColorStop(1,'#ef4444');cx.fillStyle=pg;cx.beginPath();cx.roundRect(px.x,px.y,PW,PH,6);cx.fill();cx.beginPath();cx.arc(ball.x,ball.y,ball.r,0,Math.PI*2);var bg=cx.createRadialGradient(ball.x-2,ball.y-2,1,ball.x,ball.y,ball.r);bg.addColorStop(0,'#fff');bg.addColorStop(1,'#f97316');cx.fillStyle=bg;cx.fill();}
function update(){if(keys['ArrowLeft']&&px.x>0)px.x-=6;if(keys['ArrowRight']&&px.x<W-PW)px.x+=6;ball.x+=ball.vx;ball.y+=ball.vy;if(ball.x-ball.r<0){ball.x=ball.r;ball.vx*=-1;}if(ball.x+ball.r>W){ball.x=W-ball.r;ball.vx*=-1;}if(ball.y-ball.r<0){ball.y=ball.r;ball.vy*=-1;}if(ball.y+ball.r>ball.y&&ball.y<px.y+PH&&ball.x>px.x&&ball.x<px.x+PW&&ball.vy>0){ball.vy*=-1;ball.vx+=(ball.x-(px.x+PW/2))*0.04;}if(ball.y>H){lives--;document.getElementById('lv').textContent=lives;if(lives<=0){gameOver(false);return;}ball={x:W/2,y:H/2,vx:3*(Math.random()>0.5?1:-1),vy:-4,r:8};}bricks.forEach(function(b){if(!b.alive)return;if(ball.x+ball.r>b.x&&ball.x-ball.r<b.x+b.w&&ball.y+ball.r>b.y&&ball.y-ball.r<b.y+b.h){b.alive=false;sc+=10;document.getElementById('sc').textContent=sc;var overlapX=Math.min(ball.x+ball.r-b.x,b.x+b.w-(ball.x-ball.r));var overlapY=Math.min(ball.y+ball.r-b.y,b.y+b.h-(ball.y-ball.r));if(overlapX<overlapY)ball.vx*=-1;else ball.vy*=-1;}});if(bricks.every(function(b){return !b.alive;})){lvl++;document.getElementById('lvl').textContent=lvl;bricks=makeBricks();ball.vx*=1.1;ball.vy*=1.1;}}
function loop(){if(!running)return;update();draw();raf=requestAnimationFrame(loop);}
function gameOver(win){running=false;document.getElementById('ov').classList.remove('hidden');document.getElementById('ot').textContent=win?'KAZANDIN! 🎉':'OYUN BİTTİ';document.getElementById('os').textContent='Puan: '+sc;}
cv.addEventListener('mousemove',function(e){var r=cv.getBoundingClientRect();px.x=Math.max(0,Math.min(W-PW,e.clientX-r.left-PW/2));});
document.addEventListener('keydown',function(e){keys[e.key]=true;if(e.code==='Space'&&!running)startGame();});
document.addEventListener('keyup',function(e){keys[e.key]=false;});`
  }
},

// ============================================================
// 🪢 HANGMAN
// ============================================================
hangman: {
  keywords: ['hangman', 'kelime', 'tahmin', 'adam asmaca', 'asmaca', 'word guess'],
  projectName: 'hangman',
  files: {
    'index.html': `<!DOCTYPE html><html lang="tr"><head><meta charset="UTF-8"><title>Hangman</title><link rel="stylesheet" href="style.css"></head>
<body><div class="app">
<h1>🪢 ADAM ASMACA</h1>
<div class="game">
<canvas id="hang" width="200" height="240"></canvas>
<div class="right-side">
<p class="category" id="cat"></p>
<div class="word-display" id="word-display"></div>
<p class="status" id="status"></p>
<p class="hint-text">Kalan hak: <b id="left">6</b></p>
<div class="keyboard" id="keyboard"></div>
</div></div>
<div class="ov hidden" id="ov"><div class="ob"><h2 id="ot"></h2><p id="os"></p><button class="btn" onclick="newGame()">TEKRAR →</button></div></div>
</div><script src="app.js"></script></body></html>`,

    'style.css': `*{box-sizing:border-box;margin:0;padding:0}body{background:#0f0f1a;color:#e2e8f0;font-family:'Segoe UI',sans-serif;display:flex;align-items:center;justify-content:center;min-height:100vh}
.app{position:relative;display:flex;flex-direction:column;align-items:center;gap:20px;padding:24px}
h1{font-size:1.6rem;font-weight:900;letter-spacing:3px}
.game{display:flex;gap:32px;align-items:flex-start}
#hang{background:rgba(255,255,255,0.02);border-radius:12px;border:1px solid rgba(255,255,255,0.06)}
.right-side{display:flex;flex-direction:column;gap:16px;min-width:320px}
.category{font-size:0.7rem;letter-spacing:3px;color:#6366f1;font-weight:700;text-transform:uppercase}
.word-display{display:flex;gap:8px;flex-wrap:wrap}
.letter-box{width:36px;height:44px;border-bottom:2px solid #475569;display:flex;align-items:center;justify-content:center;font-size:1.6rem;font-weight:700;text-transform:uppercase;color:#e2e8f0;transition:all 0.2s}
.letter-box.revealed{border-bottom-color:#22c55e;color:#22c55e}
.letter-box.space{border:none;width:16px}
.status{font-size:0.9rem;color:#94a3b8}
.hint-text{font-size:0.85rem;color:#64748b}.hint-text b{color:#f59e0b}
.keyboard{display:flex;flex-wrap:wrap;gap:6px;max-width:320px}
.key{width:36px;height:36px;border-radius:8px;border:1px solid rgba(255,255,255,0.1);background:rgba(255,255,255,0.05);color:#e2e8f0;font-size:0.85rem;font-weight:600;cursor:pointer;transition:all 0.15s;text-transform:uppercase}
.key:hover:not(:disabled){background:rgba(99,102,241,0.3);border-color:rgba(99,102,241,0.5)}
.key.correct{background:rgba(34,197,94,0.2);border-color:#22c55e;color:#22c55e}
.key.wrong{background:rgba(239,68,68,0.15);border-color:#ef4444;color:#ef4444;opacity:0.6}
.key:disabled{cursor:default}
.ov{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;background:rgba(15,15,26,0.92);-webkit-backdrop-filter:blur(4px);backdrop-filter:blur(4px);border-radius:12px;z-index:10}
.ov.hidden{display:none}.ob{text-align:center;display:flex;flex-direction:column;gap:16px;align-items:center}
.ob h2{font-size:2rem;font-weight:700}.ob p{color:#94a3b8;font-size:1rem}
.btn{padding:12px 32px;border-radius:12px;border:none;background:#6366f1;color:white;font-weight:700;cursor:pointer;font-size:0.95rem;transition:all 0.2s}
.btn:hover{transform:scale(1.04)}`,

    'app.js': `var WORDS=[{w:'javascript',c:'Programlama'},{w:'minesweeper',c:'Oyun'},{w:'keyboard',c:'Teknoloji'},{w:'dinosaur',c:'Hayvan'},{w:'chocolate',c:'Yiyecek'},{w:'elephant',c:'Hayvan'},{w:'hurricane',c:'Hava'},{w:'penguin',c:'Hayvan'},{w:'strawberry',c:'Meyve'},{w:'algorithm',c:'Bilişim'},{w:'developer',c:'Meslek'},{w:'adventure',c:'Aktivite'},{w:'butterfly',c:'Hayvan'},{w:'telescope',c:'Bilim'},{w:'saxophone',c:'Müzik'}];var word,guessed,wrong,maxWrong=6;function newGame(){var pick=WORDS[Math.floor(Math.random()*WORDS.length)];word=pick.w;guessed=new Set();wrong=0;document.getElementById('cat').textContent='Kategori: '+pick.c;document.getElementById('left').textContent=maxWrong;document.getElementById('status').textContent='';document.getElementById('ov').classList.add('hidden');renderWord();renderKeys();drawHang(0);}function renderWord(){var d=document.getElementById('word-display');d.innerHTML='';word.split('').forEach(function(ch){var span=document.createElement('div');if(ch===' '){span.className='letter-box space';}else{span.className='letter-box'+(guessed.has(ch)?' revealed':'');span.textContent=guessed.has(ch)?ch:'_';}d.appendChild(span);});}function renderKeys(){var kb=document.getElementById('keyboard');kb.innerHTML='';'abcdefghijklmnopqrstuvwxyz'.split('').forEach(function(ch){var btn=document.createElement('button');btn.className='key'+(guessed.has(ch)?(word.includes(ch)?' correct':' wrong'):'');btn.textContent=ch;btn.disabled=guessed.has(ch);btn.addEventListener('click',function(){guess(ch);});kb.appendChild(btn);});}function guess(ch){if(guessed.has(ch))return;guessed.add(ch);if(!word.includes(ch)){wrong++;document.getElementById('left').textContent=maxWrong-wrong;drawHang(wrong);}renderWord();renderKeys();var allRevealed=word.split('').every(function(c){return guessed.has(c)||c===' ';});if(allRevealed){showEnd(true);}else if(wrong>=maxWrong){showEnd(false);}}function showEnd(win){if(!win){word.split('').forEach(function(c){guessed.add(c);});renderWord();}document.getElementById('ov').classList.remove('hidden');document.getElementById('ot').textContent=win?'🎉 KAZANDIN!':'💀 KAYBETTİN';document.getElementById('os').textContent='Kelime: '+word;}function drawHang(n){var cv=document.getElementById('hang'),cx=cv.getContext('2d');cx.clearRect(0,0,200,240);cx.strokeStyle='rgba(255,255,255,0.15)';cx.lineWidth=2;cx.strokeRect(5,5,190,230);cx.strokeStyle='#e2e8f0';cx.lineWidth=3;cx.lineCap='round';function line(x1,y1,x2,y2){cx.beginPath();cx.moveTo(x1,y1);cx.lineTo(x2,y2);cx.stroke();}line(20,220,180,220);line(60,220,60,20);line(60,20,130,20);line(130,20,130,50);if(n>0){cx.beginPath();cx.arc(130,65,15,0,Math.PI*2);cx.stroke();}if(n>1)line(130,80,130,140);if(n>2)line(130,95,105,125);if(n>3)line(130,95,155,125);if(n>4)line(130,140,110,175);if(n>5)line(130,140,150,175);}document.addEventListener('keydown',function(e){var k=e.key.toLowerCase();if(/^[a-z]$/.test(k))guess(k);});newGame();`
  }
},

// ============================================================
// 🚀 SPACE INVADERS
// ============================================================
spaceinvaders: {
  keywords: ['space invaders', 'uzay', 'space', 'invaders', 'shoot', 'ateş', 'atesi'],
  projectName: 'space-invaders',
  files: {
    'index.html': `<!DOCTYPE html><html lang="tr"><head><meta charset="UTF-8"><title>Space Invaders</title><link rel="stylesheet" href="style.css"></head>
<body><div class="app"><h1>🚀 SPACE INVADERS</h1>
<div class="hud"><span>PUAN: <b id="sc">0</b></span><span>CAN: <b id="lv">3</b></span><span>SEVİYE: <b id="lvl">1</b></span></div>
<canvas id="cv" width="480" height="520"></canvas>
<div class="hint">← → Hareket &nbsp;|&nbsp; Space Ateş &nbsp;|&nbsp; Space Başlat</div>
<div class="ov" id="ov"><div class="ob"><h2 id="ot">SPACE INVADERS</h2><p id="os">Space ile başlat</p><button class="btn" onclick="startGame()">▶ BAŞLAT</button></div></div>
</div><script src="app.js"></script></body></html>`,

    'style.css': `*{box-sizing:border-box;margin:0;padding:0}body{background:#000;color:#0f0;font-family:'Courier New',monospace;display:flex;align-items:center;justify-content:center;min-height:100vh}
.app{display:flex;flex-direction:column;align-items:center;gap:10px;position:relative}
h1{font-size:1.4rem;font-weight:700;letter-spacing:4px;color:#0f0;text-shadow:0 0 10px #0f0}
.hud{display:flex;gap:32px;font-size:0.85rem;color:#0a0}.hud b{color:#0f0}
#cv{border:1px solid #0f0;display:block;background:#000;box-shadow:0 0 24px rgba(0,255,0,0.2)}
.hint{font-size:0.65rem;color:#0a0;letter-spacing:2px}
.ov{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;background:rgba(0,0,0,0.88);z-index:10}
.ov.hidden{display:none}.ob{text-align:center;display:flex;flex-direction:column;gap:14px;align-items:center}
.ob h2{font-size:2rem;letter-spacing:6px;color:#0f0;text-shadow:0 0 20px #0f0}.ob p{color:#0a0}
.btn{padding:12px 28px;border-radius:4px;border:1px solid #0f0;background:rgba(0,255,0,0.1);color:#0f0;font-family:inherit;font-weight:700;cursor:pointer;letter-spacing:3px;transition:all 0.2s}
.btn:hover{background:rgba(0,255,0,0.2);box-shadow:0 0 16px rgba(0,255,0,0.4)}`,

    'app.js': `var W=480,H=520,cv=document.getElementById('cv'),cx=cv.getContext('2d');var player,enemies,bullets,eBullets,sc,lives,lvl,running,raf,keys={},lastEShot=0;function mkEnemies(){var arr=[];for(var r=0;r<4;r++)for(var c=0;c<9;c++)arr.push({x:40+c*46,y:60+r*40,w:28,h:20,alive:true,row:r});return arr;}function startGame(){player={x:W/2-20,y:H-50,w:40,h:24,speed:5};enemies=mkEnemies();bullets=[];eBullets=[];sc=0;lives=3;lvl=1;running=true;document.getElementById('sc').textContent=0;document.getElementById('lv').textContent=3;document.getElementById('lvl').textContent=1;document.getElementById('ov').classList.add('hidden');if(raf)cancelAnimationFrame(raf);raf=requestAnimationFrame(loop);}
var eDir=1,eSpeed=0.8,lastShot=0;function drawPlayer(){cx.fillStyle='#0f0';cx.fillRect(player.x+15,player.y,10,8);cx.fillRect(player.x,player.y+8,player.w,16);}function drawEnemy(e){if(!e.alive)return;cx.fillStyle=e.row<2?'#0ff':'#0f0';cx.font='20px monospace';cx.fillText(e.row<2?'👾':'👽',e.x,e.y+e.h);}function draw(){cx.fillStyle='#000';cx.fillRect(0,0,W,H);cx.fillStyle='rgba(0,255,0,0.05)';enemies.forEach(drawEnemy);drawPlayer();cx.fillStyle='#0f0';bullets.forEach(function(b){cx.fillRect(b.x,b.y,3,12);});cx.fillStyle='#f00';eBullets.forEach(function(b){cx.fillRect(b.x,b.y,3,12);});cx.fillStyle='rgba(0,255,0,0.15)';cx.fillRect(0,H-20,W,2);}
function update(ts){if(keys['ArrowLeft']&&player.x>0)player.x-=player.speed;if(keys['ArrowRight']&&player.x<W-player.w)player.x+=player.speed;var alive=enemies.filter(function(e){return e.alive;});if(alive.length===0){lvl++;eSpeed+=0.4;enemies=mkEnemies();document.getElementById('lvl').textContent=lvl;return;}var minX=Math.min.apply(null,alive.map(function(e){return e.x;}));var maxX=Math.max.apply(null,alive.map(function(e){return e.x+e.w;}));if(maxX>W-10&&eDir>0){eDir=-1;enemies.forEach(function(e){e.y+=16;});}if(minX<10&&eDir<0){eDir=1;enemies.forEach(function(e){e.y+=16;});}enemies.forEach(function(e){if(e.alive)e.x+=eDir*eSpeed;});bullets.forEach(function(b){b.y-=9;});eBullets.forEach(function(b){b.y+=4;});bullets=bullets.filter(function(b){return b.y>0;});bullets.forEach(function(b){enemies.forEach(function(e){if(e.alive&&b.x>e.x&&b.x<e.x+e.w&&b.y>e.y&&b.y<e.y+e.h){e.alive=false;b.y=-1;sc+=10*(e.row<2?2:1);document.getElementById('sc').textContent=sc;}});});eBullets=eBullets.filter(function(b){return b.y<H;});eBullets.forEach(function(b){if(b.x>player.x&&b.x<player.x+player.w&&b.y>player.y){eBullets=eBullets.filter(function(bb){return bb!==b;});lives--;document.getElementById('lv').textContent=lives;if(lives<=0){gameOver(false);return;}}});if(ts-lastEShot>1500){lastEShot=ts;if(alive.length){var shooter=alive[Math.floor(Math.random()*alive.length)];eBullets.push({x:shooter.x+14,y:shooter.y+shooter.h});}}if(alive.some(function(e){return e.y+e.h>=H-20;}))gameOver(false);}
function loop(ts){if(!running)return;update(ts);draw();raf=requestAnimationFrame(loop);}function gameOver(win){running=false;document.getElementById('ov').classList.remove('hidden');document.getElementById('ot').textContent=win?'KAZANDIN! 🎉':'OYUN BİTTİ 💀';document.getElementById('os').textContent='Puan: '+sc;}document.addEventListener('keydown',function(e){keys[e.key]=true;if(e.code==='Space'){e.preventDefault();if(!running)startGame();else if(Date.now()-lastShot>300){lastShot=Date.now();bullets.push({x:player.x+player.w/2,y:player.y});}}});document.addEventListener('keyup',function(e){keys[e.key]=false;});`
  }
},

// ============================================================
// 📐 UNIT CONVERTER
// ============================================================
unitconverter: {
  keywords: ['unit', 'birim', 'convert', 'dönüştür', 'donustur', 'km', 'kg', 'celsius', 'fahrenheit'],
  projectName: 'unit-converter',
  files: {
    'index.html': `<!DOCTYPE html><html lang="tr"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"><title>Birim Dönüştürücü</title><link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet"><link rel="stylesheet" href="style.css"></head>
<body><div class="app">
<h1>📐 Birim Dönüştürücü</h1>
<div class="tabs" id="tabs"><button class="tab active" onclick="setTab(0)">📏 Uzunluk</button><button class="tab" onclick="setTab(1)">⚖️ Ağırlık</button><button class="tab" onclick="setTab(2)">🌡️ Sıcaklık</button><button class="tab" onclick="setTab(3)">📐 Alan</button><button class="tab" onclick="setTab(4)">💧 Hacim</button></div>
<div class="converter">
<div class="row"><div class="field"><input type="number" id="val1" placeholder="Değer gir" oninput="convert()"><select id="u1" onchange="convert()"></select></div>
<button class="swap-btn" onclick="swap()">⇄</button>
<div class="field"><input type="number" id="val2" readonly placeholder="Sonuç"><select id="u2" onchange="convert()"></select></div></div>
<div class="quick-ref" id="qref"></div>
</div>
</div><script src="app.js"></script></body></html>`,

    'style.css': `*{box-sizing:border-box;margin:0;padding:0}body{background:#0f172a;color:#e2e8f0;font-family:'Inter',sans-serif;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:24px}
.app{width:100%;max-width:560px;display:flex;flex-direction:column;gap:24px}
h1{font-size:1.6rem;font-weight:700;text-align:center}
.tabs{display:flex;gap:6px;flex-wrap:wrap;justify-content:center}
.tab{padding:8px 16px;border-radius:20px;border:1px solid rgba(255,255,255,0.08);background:rgba(255,255,255,0.03);color:#94a3b8;font-family:inherit;font-size:0.82rem;cursor:pointer;transition:all 0.2s}
.tab.active{background:#6366f1;border-color:#6366f1;color:white}
.converter{background:#1e293b;border-radius:20px;padding:28px;display:flex;flex-direction:column;gap:20px;box-shadow:0 8px 32px rgba(0,0,0,0.3)}
.row{display:flex;align-items:center;gap:12px}
.field{flex:1;display:flex;flex-direction:column;gap:8px}
input{background:#0f172a;border:1px solid rgba(255,255,255,0.08);border-radius:10px;padding:14px 16px;color:#e2e8f0;font-family:inherit;font-size:1.1rem;font-weight:600;outline:none;width:100%;transition:border-color 0.2s}
input:focus{border-color:rgba(99,102,241,0.5)}
input[readonly]{color:#6366f1;border-style:dashed}
select{background:#0f172a;border:1px solid rgba(255,255,255,0.08);border-radius:10px;padding:11px 14px;color:#e2e8f0;font-family:inherit;font-size:0.9rem;outline:none;width:100%;cursor:pointer}
.swap-btn{width:44px;height:44px;border-radius:50%;border:1px solid rgba(255,255,255,0.1);background:rgba(99,102,241,0.15);color:#818cf8;font-size:1.2rem;cursor:pointer;flex-shrink:0;transition:all 0.2s;margin-top:20px}
.swap-btn:hover{background:rgba(99,102,241,0.3);transform:rotate(180deg)}
.quick-ref{display:grid;grid-template-columns:1fr 1fr;gap:8px}
.ref-item{background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.05);border-radius:10px;padding:10px 14px;font-size:0.8rem;color:#64748b;line-height:1.5}
.ref-item b{color:#e2e8f0}`,

    'app.js': `var TABS=[{name:'Uzunluk',units:{m:'Metre',km:'Kilometre',cm:'Santimetre',mm:'Milimetre',mi:'Mil',ft:'Fit',in:'İnç',yd:'Yarda'},base:{m:1,km:1000,cm:0.01,mm:0.001,mi:1609.34,ft:0.3048,in:0.0254,yd:0.9144}},{name:'Ağırlık',units:{kg:'Kilogram',g:'Gram',mg:'Miligram',lb:'Pound',oz:'Ons',t:'Ton'},base:{kg:1,g:0.001,mg:0.000001,lb:0.453592,oz:0.0283495,t:1000}},{name:'Sıcaklık',units:{c:'Celsius',f:'Fahrenheit',k:'Kelvin'},special:true},{name:'Alan',units:{m2:'m²',km2:'km²',ha:'Hektar',ft2:'ft²',acre:'Dönüm'},base:{m2:1,km2:1e6,ha:1e4,ft2:0.092903,acre:4046.86}},{name:'Hacim',units:{l:'Litre',ml:'Mililitre',m3:'m³',cup:'Bardak',gal:'Galon'},base:{l:1,ml:0.001,m3:1000,cup:0.236588,gal:3.78541}}];var curTab=0;function setTab(i){curTab=i;document.querySelectorAll('.tab').forEach(function(t,j){t.classList.toggle('active',i===j);});var tab=TABS[i];var u1=document.getElementById('u1'),u2=document.getElementById('u2');u1.innerHTML='';u2.innerHTML='';Object.keys(tab.units).forEach(function(k){u1.innerHTML+='<option value="'+k+'">'+tab.units[k]+'</option>';u2.innerHTML+='<option value="'+k+'">'+tab.units[k]+'</option>';});u2.selectedIndex=1;document.getElementById('val1').value='';document.getElementById('val2').value='';updateRef();}function convert(){var v=parseFloat(document.getElementById('val1').value);if(isNaN(v)){document.getElementById('val2').value='';return;}var tab=TABS[curTab];var u1=document.getElementById('u1').value,u2=document.getElementById('u2').value;var res;if(tab.special){if(u1==='c'&&u2==='f')res=v*9/5+32;else if(u1==='c'&&u2==='k')res=v+273.15;else if(u1==='f'&&u2==='c')res=(v-32)*5/9;else if(u1==='f'&&u2==='k')res=(v-32)*5/9+273.15;else if(u1==='k'&&u2==='c')res=v-273.15;else if(u1==='k'&&u2==='f')res=(v-273.15)*9/5+32;else res=v;}else{res=v*tab.base[u1]/tab.base[u2];}document.getElementById('val2').value=parseFloat(res.toPrecision(8));}function swap(){var v1=document.getElementById('val1').value,u1i=document.getElementById('u1').selectedIndex,u2i=document.getElementById('u2').selectedIndex;document.getElementById('u1').selectedIndex=u2i;document.getElementById('u2').selectedIndex=u1i;document.getElementById('val1').value=document.getElementById('val2').value;convert();}function updateRef(){var tab=TABS[curTab];var ref=document.getElementById('qref');ref.innerHTML='';var keys=Object.keys(tab.units);for(var i=0;i<Math.min(4,keys.length);i++){for(var j=i+1;j<Math.min(i+2,keys.length);j++){if(tab.special)continue;var r=tab.base[keys[i]]/tab.base[keys[j]];ref.innerHTML+='<div class="ref-item"><b>1 '+tab.units[keys[i]]+'</b><br>= '+parseFloat(r.toPrecision(6))+' '+tab.units[keys[j]]+'</div>';}}}setTab(0);`
  }
},

// ============================================================
// ⚖️ BMI CALCULATOR
// ============================================================
bmicalculator: {
  keywords: ['bmi', 'vücut kitle', 'boy kilo', 'kilom', 'obezite', 'body mass'],
  projectName: 'bmi-calculator',
  files: {
    'index.html': `<!DOCTYPE html><html lang="tr"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"><title>BMI Hesaplayıcı</title><link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet"><link rel="stylesheet" href="style.css"></head>
<body><div class="app">
<h1>⚖️ BMI Hesaplayıcı</h1>
<div class="unit-toggle"><button class="utm active" id="ut-metric" onclick="setUnit('metric')">Metrik (cm, kg)</button><button class="utm" id="ut-imperial" onclick="setUnit('imperial')">Imperial (ft, lb)</button></div>
<div class="card">
<div class="inputs">
<div class="field"><label id="h-label">Boy (cm)</label><div class="inp-row"><input type="number" id="height" placeholder="175" min="1" oninput="calc()"><span class="unit-lbl" id="h-unit">cm</span></div></div>
<div class="field"><label id="w-label">Kilo (kg)</label><div class="inp-row"><input type="number" id="weight" placeholder="70" min="1" oninput="calc()"><span class="unit-lbl" id="w-unit">kg</span></div></div>
<div class="field"><label>Yaş</label><div class="inp-row"><input type="number" id="age" placeholder="25" min="1" max="120" oninput="calc()"><span class="unit-lbl">yıl</span></div></div>
</div>
<div class="result hidden" id="result">
<div class="bmi-circle"><div class="bmi-val" id="bmi-val">0</div><div class="bmi-cat" id="bmi-cat">—</div></div>
<div class="gauge"><div class="gauge-bar"><div id="gauge-mark"></div></div><div class="gauge-labels"><span>Zayıf</span><span>Normal</span><span>Kilolu</span><span>Obez</span></div></div>
<div class="advice" id="advice"></div>
</div>
</div>
</div><script src="app.js"></script></body></html>`,

    'style.css': `*{box-sizing:border-box;margin:0;padding:0}body{background:#0f172a;color:#e2e8f0;font-family:'Inter',sans-serif;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:24px}
.app{width:100%;max-width:440px;display:flex;flex-direction:column;gap:20px}
h1{font-size:1.6rem;font-weight:700;text-align:center}
.unit-toggle{display:flex;background:#1e293b;border-radius:12px;padding:4px;gap:4px}
.utm{flex:1;padding:9px;border-radius:9px;border:none;background:none;color:#64748b;font-family:inherit;font-size:0.85rem;font-weight:500;cursor:pointer;transition:all 0.2s}
.utm.active{background:#6366f1;color:white}
.card{background:#1e293b;border-radius:20px;padding:28px;display:flex;flex-direction:column;gap:20px}
.inputs{display:flex;flex-direction:column;gap:14px}
.field{display:flex;flex-direction:column;gap:6px}
.field label{font-size:0.82rem;color:#94a3b8;font-weight:500}
.inp-row{display:flex;align-items:center;gap:8px}
input{flex:1;background:#0f172a;border:1px solid rgba(255,255,255,0.08);border-radius:10px;padding:12px 14px;color:#e2e8f0;font-family:inherit;font-size:1rem;outline:none;transition:border-color 0.2s}
input:focus{border-color:rgba(99,102,241,0.5)}
.unit-lbl{font-size:0.82rem;color:#64748b;min-width:24px}
.result{display:flex;flex-direction:column;align-items:center;gap:20px}
.result.hidden{display:none}
.bmi-circle{width:130px;height:130px;border-radius:50%;display:flex;flex-direction:column;align-items:center;justify-content:center;border:4px solid #6366f1;box-shadow:0 0 32px rgba(99,102,241,0.3)}
.bmi-val{font-size:2.4rem;font-weight:700;color:#6366f1}
.bmi-cat{font-size:0.78rem;color:#94a3b8;letter-spacing:1px;margin-top:2px}
.gauge{width:100%}
.gauge-bar{height:12px;border-radius:6px;background:linear-gradient(to right,#60a5fa,#22c55e,#f59e0b,#ef4444);position:relative;margin-bottom:6px}
#gauge-mark{position:absolute;top:-4px;width:4px;height:20px;background:white;border-radius:2px;transform:translateX(-50%);transition:left 0.4s ease;box-shadow:0 0 8px rgba(255,255,255,0.5)}
.gauge-labels{display:flex;justify-content:space-between;font-size:0.68rem;color:#64748b}
.advice{background:rgba(99,102,241,0.08);border:1px solid rgba(99,102,241,0.2);border-radius:12px;padding:14px;font-size:0.85rem;color:#94a3b8;line-height:1.6;width:100%;text-align:center}`,

    'app.js': `var metric=true;function setUnit(u){metric=u==='metric';document.getElementById('ut-metric').classList.toggle('active',metric);document.getElementById('ut-imperial').classList.toggle('active',!metric);document.getElementById('h-label').textContent=metric?'Boy (cm)':'Boy (ft\'\'in)';document.getElementById('w-label').textContent=metric?'Kilo (kg)':'Kilo (lb)';document.getElementById('h-unit').textContent=metric?'cm':'ft';document.getElementById('w-unit').textContent=metric?'kg':'lb';document.getElementById('height').placeholder=metric?'175':'510';document.getElementById('weight').placeholder=metric?'70':'154';document.getElementById('result').classList.add('hidden');}function calc(){var h=parseFloat(document.getElementById('height').value);var w=parseFloat(document.getElementById('weight').value);if(!h||!w||h<=0||w<=0){document.getElementById('result').classList.add('hidden');return;}var hm,wk;if(metric){hm=h/100;wk=w;}else{hm=h*0.3048;wk=w*0.453592;}var bmi=wk/(hm*hm);var cat,clr,adv,pct;if(bmi<18.5){cat='ZAYİF';clr='#60a5fa';adv='BMI değeriniz normal aralığın altında. Sağlıklı beslenerek kilo almanız önerilir.';pct=(bmi/18.5)*20;}else if(bmi<25){cat='NORMAL';clr='#22c55e';adv='BMI değeriniz sağlıklı aralıkta! Aktif kalmaya ve dengeli beslenmeye devam edin.';pct=20+((bmi-18.5)/(25-18.5))*30;}else if(bmi<30){cat='KİLOLU';clr='#f59e0b';adv='BMI değeriniz biraz yüksek. Düzenli egzersiz ve sağlıklı beslenme önerilir.';pct=50+((bmi-25)/(30-25))*25;}else{cat='OBEZ';clr='#ef4444';adv='BMI değeriniz yüksek risk bölgesinde. Lütfen bir doktor ile görüşün.';pct=75+Math.min(25,(bmi-30)/10*25);}document.getElementById('bmi-val').textContent=bmi.toFixed(1);document.getElementById('bmi-cat').textContent=cat;document.getElementById('bmi-circle'||'.bmi-circle');document.querySelector('.bmi-circle').style.borderColor=clr;document.querySelector('.bmi-val').style.color=clr;document.getElementById('gauge-mark').style.left=Math.min(98,Math.max(2,pct))+'%';document.getElementById('advice').textContent=adv;document.getElementById('result').classList.remove('hidden');}`
  }
},

// ============================================================
// 📝 TEXT ANALYZER
// ============================================================
textanalyzer: {
  keywords: ['text', 'metin', 'analyzer', 'kelime say', 'word count', 'analiz', 'karakter'],
  projectName: 'text-analyzer',
  files: {
    'index.html': `<!DOCTYPE html><html lang="tr"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"><title>Text Analyzer</title><link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400&display=swap" rel="stylesheet"><link rel="stylesheet" href="style.css"></head>
<body><div class="app">
<h1>📝 Text Analyzer</h1>
<textarea id="txt" placeholder="Metni buraya yapıştır veya yaz..." oninput="analyze()"></textarea>
<div class="btns"><button onclick="clearTxt()">🗑 Temizle</button><button onclick="copyTxt()">📋 Kopyala</button><button onclick="download()">💾 İndir</button></div>
<div class="stats-grid" id="stats"></div>
<div class="top-words" id="top-words"></div>
</div><script src="app.js"></script></body></html>`,

    'style.css': `*{box-sizing:border-box;margin:0;padding:0}body{background:#0d1117;color:#c9d1d9;font-family:'Inter',sans-serif;min-height:100vh;display:flex;align-items:flex-start;justify-content:center;padding:24px 16px}
.app{width:100%;max-width:800px;display:flex;flex-direction:column;gap:18px}
h1{font-size:1.6rem;font-weight:700;color:#58a6ff}
textarea{width:100%;height:220px;background:#161b22;border:1px solid rgba(255,255,255,0.08);border-radius:12px;padding:16px;font-family:'JetBrains Mono',monospace;font-size:0.92rem;color:#c9d1d9;resize:vertical;outline:none;line-height:1.7;transition:border-color 0.2s}
textarea:focus{border-color:rgba(88,166,255,0.4)}
.btns{display:flex;gap:8px}
.btns button{padding:9px 18px;border-radius:8px;border:1px solid rgba(255,255,255,0.08);background:rgba(255,255,255,0.04);color:#c9d1d9;font-family:inherit;font-size:0.85rem;cursor:pointer;transition:all 0.2s}
.btns button:hover{background:rgba(255,255,255,0.08)}
.stats-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(140px,1fr));gap:12px}
.stat-card{background:#161b22;border:1px solid rgba(255,255,255,0.07);border-radius:12px;padding:16px;text-align:center}
.sc-val{font-size:1.8rem;font-weight:700;color:#58a6ff;margin-bottom:4px}
.sc-lbl{font-size:0.72rem;color:#8b949e;letter-spacing:1px}
.top-words{background:#161b22;border:1px solid rgba(255,255,255,0.07);border-radius:12px;padding:20px}
.tw-title{font-size:0.8rem;letter-spacing:2px;color:#8b949e;margin-bottom:14px;font-weight:600}
.word-bars{display:flex;flex-direction:column;gap:8px}
.wb-row{display:flex;align-items:center;gap:10px}
.wb-word{min-width:90px;font-size:0.85rem;color:#c9d1d9;font-weight:500}
.wb-bar{flex:1;height:10px;background:rgba(255,255,255,0.06);border-radius:5px;overflow:hidden}
.wb-fill{height:100%;background:linear-gradient(90deg,#58a6ff,#388bfd);border-radius:5px;transition:width 0.5s ease}
.wb-cnt{font-size:0.78rem;color:#8b949e;min-width:30px;text-align:right}`,

    'app.js': `function analyze(){var txt=document.getElementById('txt').value;var chars=txt.length;var charsNoSpace=txt.replace(/\\s/g,'').length;var words=txt.trim()?txt.trim().split(/\\s+/).length:0;var sentences=txt.trim()?txt.split(/[.!?]+/).filter(function(s){return s.trim();}).length:0;var paragraphs=txt.trim()?txt.split(/\\n+/).filter(function(p){return p.trim();}).length:0;var readTime=Math.ceil(words/200);var STATS=[{val:chars,lbl:'KARAKTER'},{val:charsNoSpace,lbl:'BOŞLUKSUZ'},{val:words,lbl:'KELİME'},{val:sentences,lbl:'CÜMLE'},{val:paragraphs,lbl:'PARAGRAF'},{val:readTime+' dk',lbl:'OKUMA SÜRESİ'}];var sg=document.getElementById('stats');sg.innerHTML='';STATS.forEach(function(s){sg.innerHTML+='<div class="stat-card"><div class="sc-val">'+s.val+'</div><div class="sc-lbl">'+s.lbl+'</div></div>';});var tw=document.getElementById('top-words');if(!txt.trim()){tw.innerHTML='';return;}var freq={};var STOP='ve bir ile bu da de da için ile bir bu o en çok daha ne bu o ben sen biz siz için gibi ama fakat'.split(' ');txt.toLowerCase().match(/[a-züçğıöşa-z]+/g)||[];(txt.toLowerCase().match(/[a-züçğıöşa-z]+/g)||[]).forEach(function(w){if(w.length>2&&!STOP.includes(w))freq[w]=(freq[w]||0)+1;});var top=Object.entries(freq).sort(function(a,b){return b[1]-a[1];}).slice(0,8);if(!top.length){tw.innerHTML='';return;}var maxF=top[0][1];tw.innerHTML='<div class="tw-title">EN SIK KULLANILAN KELİMELER</div><div class="word-bars">'+top.map(function(e){return '<div class="wb-row"><span class="wb-word">'+e[0]+'</span><div class="wb-bar"><div class="wb-fill" style="width:'+(e[1]/maxF*100)+'%"></div></div><span class="wb-cnt">'+e[1]+'</span></div>';}).join('')+'</div>';}function clearTxt(){document.getElementById('txt').value='';analyze();}function copyTxt(){navigator.clipboard.writeText(document.getElementById('txt').value);}function download(){var a=document.createElement('a');a.download='metin.txt';a.href=URL.createObjectURL(new Blob([document.getElementById('txt').value],{type:'text/plain'}));a.click();}analyze();`
  }
},

// ============================================================
// 📄 RESUME / CV
// ============================================================
resumecv: {
  keywords: ['resume', 'cv', 'özgeçmiş', 'ozgecmis', 'curriculum vitae'],
  projectName: 'resume-cv',
  files: {
    'index.html': `<!DOCTYPE html><html lang="tr"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"><title>Özgeçmiş</title><link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet"><link rel="stylesheet" href="style.css"></head>
<body>
<div class="print-btn-bar"><button onclick="window.print()" class="prt-btn">🖨️ PDF Olarak Kaydet</button></div>
<div class="cv">
<aside class="sidebar">
<div class="avatar">👤</div>
<h1>Alex Johnson</h1>
<p class="title">Full-Stack Developer</p>
<div class="sb-section"><h3>İletişim</h3><p>📧 alex@example.com</p><p>📱 +90 555 000 0000</p><p>🌐 alexjohnson.dev</p><p>📍 İstanbul, TR</p></div>
<div class="sb-section"><h3>Beceriler</h3><div class="skill-list"><div class="skill-item"><span>JavaScript</span><div class="bar"><div style="width:95%"></div></div></div><div class="skill-item"><span>React</span><div class="bar"><div style="width:90%"></div></div></div><div class="skill-item"><span>Node.js</span><div class="bar"><div style="width:85%"></div></div></div><div class="skill-item"><span>Python</span><div class="bar"><div style="width:75%"></div></div></div><div class="skill-item"><span>SQL</span><div class="bar"><div style="width:80%"></div></div></div><div class="skill-item"><span>Docker</span><div class="bar"><div style="width:70%"></div></div></div></div></div>
<div class="sb-section"><h3>Diller</h3><p>Türkçe — Anadil</p><p>İngilizce — C1</p><p>Almanca — A2</p></div>
</aside>
<main class="main">
<section><h2>Hakkımda</h2><p>5+ yıl deneyimli, kullanıcı odaklı web uygulamaları geliştiren Full-Stack geliştiriciyim. Hızlı öğrenen, takım çalışmasına yatkın ve kaliteli kod yazmaya özen gösteren biriyim.</p></section>
<section><h2>Deneyim</h2>
<div class="exp-item"><div class="exp-hdr"><div><div class="job-title">Senior Frontend Developer</div><div class="company">Tech Corp — İstanbul</div></div><span class="date">2021 – Günümüz</span></div><ul><li>React ve TypeScript ile 10+ enterprise uygulama geliştirdim</li><li>CI/CD pipeline kurarak deployment süresini %60 düşürdüm</li><li>5 kişilik frontend ekibine teknik liderlik yaptım</li></ul></div>
<div class="exp-item"><div class="exp-hdr"><div><div class="job-title">Full-Stack Developer</div><div class="company">StartupXYZ — Remote</div></div><span class="date">2019 – 2021</span></div><ul><li>Node.js ile RESTful API tasarladım ve geliştirdim</li><li>PostgreSQL ve Redis entegrasyonu yaparak performansı artırdım</li><li>Mobil uyumlu dashboard geliştirdim</li></ul></div>
</section>
<section><h2>Eğitim</h2>
<div class="exp-item"><div class="exp-hdr"><div><div class="job-title">Bilgisayar Mühendisliği</div><div class="company">İstanbul Teknik Üniversitesi</div></div><span class="date">2015 – 2019</span></div><p>GPA: 3.6/4.0 — Lisans</p></div>
</section>
<section><h2>Projeler</h2>
<div class="proj-item"><div class="proj-hdr"><b>OpenTask</b><div class="tags"><span>React</span><span>Node.js</span><span>MongoDB</span></div></div><p>500+ kullanıcıya sahip açık kaynak proje yönetim aracı</p></div>
<div class="proj-item"><div class="proj-hdr"><b>AI Code Review</b><div class="tags"><span>Python</span><span>GPT-4</span></div></div><p>Kodu otomatik inceleyen ve hata bulan AI aracı</p></div>
</section>
<section><h2>Sertifikalar</h2>
<div class="cert-list"><div class="cert">☁️ AWS Certified Developer</div><div class="cert">🐳 Docker Certified Associate</div><div class="cert">⚛️ Meta React Developer</div></div>
</section>
</main>
</div></body></html>`,

    'style.css': `*{box-sizing:border-box;margin:0;padding:0}body{background:#f1f5f9;font-family:'Inter',sans-serif;color:#1e293b;padding:20px}
.print-btn-bar{text-align:center;margin-bottom:16px}@media print{.print-btn-bar{display:none}}
.prt-btn{padding:10px 24px;border-radius:10px;border:none;background:#6366f1;color:white;font-family:inherit;font-weight:600;cursor:pointer;font-size:0.9rem}
.cv{max-width:900px;margin:0 auto;display:grid;grid-template-columns:260px 1fr;box-shadow:0 8px 40px rgba(0,0,0,0.12);border-radius:16px;overflow:hidden;background:white}
.sidebar{background:linear-gradient(160deg,#1e293b,#0f172a);color:#e2e8f0;padding:32px 24px;display:flex;flex-direction:column;gap:24px}
.avatar{width:90px;height:90px;border-radius:50%;background:linear-gradient(135deg,#6366f1,#8b5cf6);display:flex;align-items:center;justify-content:center;font-size:3rem;margin:0 auto}
.sidebar h1{text-align:center;font-size:1.2rem;font-weight:700}
.title{text-align:center;color:#94a3b8;font-size:0.82rem;letter-spacing:1px}
.sb-section h3{font-size:0.7rem;letter-spacing:3px;color:#6366f1;margin-bottom:10px;font-weight:700;text-transform:uppercase}
.sb-section p{font-size:0.82rem;color:#94a3b8;margin-bottom:6px;line-height:1.5}
.skill-list{display:flex;flex-direction:column;gap:8px}
.skill-item span{font-size:0.78rem;color:#cbd5e1;display:block;margin-bottom:3px}
.bar{height:5px;background:rgba(255,255,255,0.08);border-radius:4px;overflow:hidden}
.bar div{height:100%;background:linear-gradient(90deg,#6366f1,#8b5cf6);border-radius:4px}
.main{padding:36px 32px;display:flex;flex-direction:column;gap:28px}
section h2{font-size:0.75rem;letter-spacing:3px;color:#6366f1;font-weight:700;text-transform:uppercase;margin-bottom:14px;padding-bottom:6px;border-bottom:2px solid #f1f5f9}
section p{font-size:0.88rem;color:#64748b;line-height:1.7}
.exp-item{margin-bottom:16px}
.exp-hdr{display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:8px;flex-wrap:wrap;gap:4px}
.job-title{font-size:0.92rem;font-weight:600;color:#1e293b}
.company{font-size:0.8rem;color:#64748b}
.date{font-size:0.75rem;color:#94a3b8;white-space:nowrap}
.exp-item ul{padding-left:16px;display:flex;flex-direction:column;gap:4px}
.exp-item li{font-size:0.82rem;color:#64748b;line-height:1.6}
.exp-item>p{margin-top:4px}
.proj-item{margin-bottom:12px;background:#f8fafc;border-radius:10px;padding:12px 14px;border-left:3px solid #6366f1}
.proj-hdr{display:flex;align-items:center;gap:10px;margin-bottom:4px;flex-wrap:wrap}
.proj-hdr b{font-size:0.9rem}
.tags{display:flex;gap:6px;flex-wrap:wrap}
.tags span{padding:2px 8px;border-radius:100px;background:#ede9fe;color:#6366f1;font-size:0.7rem;font-weight:600}
.proj-item p{font-size:0.8rem;color:#64748b}
.cert-list{display:flex;gap:8px;flex-wrap:wrap}
.cert{padding:8px 14px;border-radius:8px;background:#f8fafc;border:1px solid #e2e8f0;font-size:0.82rem;font-weight:500}
@media print{body{background:white;padding:0}.cv{box-shadow:none;border-radius:0}}`
  }
},

// ============================================================
// 🎵 MUSIC PLAYER UI
// ============================================================
musicplayer: {
  keywords: ['music', 'müzik', 'player', 'çalar', 'playlist', 'sarki', 'şarkı'],
  projectName: 'music-player',
  files: {
    'index.html': `<!DOCTYPE html><html lang="tr"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"><title>Music Player</title><link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet"><link rel="stylesheet" href="style.css"></head>
<body><div class="app">
<div class="player">
<div class="album-art" id="art"><div class="art-inner" id="art-inner"></div></div>
<div class="track-info"><div class="track-name" id="track-name">Şarkı Adı</div><div class="artist" id="artist">Sanatçı</div></div>
<div class="progress-area"><div class="time"><span id="cur-time">0:00</span><span id="dur">3:30</span></div><div class="progress-bar" id="pb" onclick="seek(event)"><div class="progress-fill" id="pf"></div></div></div>
<div class="controls">
<button class="ctrl-btn" id="shuffle-btn" onclick="toggleShuffle()" title="Karıştır">🔀</button>
<button class="ctrl-btn" onclick="prevTrack()">⏮</button>
<button class="ctrl-btn play-btn" id="play-btn" onclick="togglePlay()">▶</button>
<button class="ctrl-btn" onclick="nextTrack()">⏭</button>
<button class="ctrl-btn" id="repeat-btn" onclick="toggleRepeat()" title="Tekrar">🔁</button>
</div>
<div class="volume-row"><span>🔈</span><input type="range" id="vol" min="0" max="100" value="80" oninput="setVol(this.value)"><span>🔊</span></div>
<div class="like-row"><button class="like-btn" id="like-btn" onclick="toggleLike()">🤍</button><span id="like-lbl">Beğen</span></div>
</div>
<div class="playlist">
<div class="pl-hdr"><span>Çalma Listesi</span><span class="pl-cnt" id="pl-cnt">8 Şarkı</span></div>
<div class="pl-list" id="pl-list"></div>
</div>
</div><script src="app.js"></script></body></html>`,

    'style.css': `*{box-sizing:border-box;margin:0;padding:0}body{background:#09090f;color:#e2e8f0;font-family:'Inter',sans-serif;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:16px}
.app{display:flex;gap:20px;max-width:780px;width:100%;flex-wrap:wrap;justify-content:center}
.player{background:linear-gradient(160deg,#1a1028,#0f0a1a);border:1px solid rgba(255,255,255,0.07);border-radius:28px;padding:28px;width:320px;display:flex;flex-direction:column;gap:18px;box-shadow:0 24px 64px rgba(0,0,0,0.5)}
.album-art{width:220px;height:220px;border-radius:50%;margin:0 auto;padding:8px;background:linear-gradient(135deg,rgba(139,92,246,0.3),rgba(99,102,241,0.3));box-shadow:0 8px 32px rgba(139,92,246,0.4)}
.art-inner{width:100%;height:100%;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:5rem;transition:background 0.5s}
.album-art.spinning .art-inner{animation:spin 8s linear infinite}
@keyframes spin{from{transform:rotate(0)}to{transform:rotate(360deg)}}
.track-info{text-align:center}
.track-name{font-size:1.1rem;font-weight:700;margin-bottom:4px}
.artist{color:#8b5cf6;font-size:0.85rem}
.progress-area{display:flex;flex-direction:column;gap:6px}
.time{display:flex;justify-content:space-between;font-size:0.72rem;color:#64748b}
.progress-bar{height:5px;background:rgba(255,255,255,0.08);border-radius:4px;cursor:pointer;position:relative}
.progress-fill{height:100%;background:linear-gradient(90deg,#8b5cf6,#6366f1);border-radius:4px;width:0%;transition:width 0.5s linear;position:relative}
.progress-fill::after{content:'';position:absolute;right:-4px;top:-4px;width:12px;height:12px;border-radius:50%;background:white;box-shadow:0 0 8px rgba(139,92,246,0.6)}
.controls{display:flex;align-items:center;justify-content:center;gap:12px}
.ctrl-btn{background:rgba(255,255,255,0.06);border:none;color:#e2e8f0;width:44px;height:44px;border-radius:50%;font-size:1.1rem;cursor:pointer;transition:all 0.2s;display:flex;align-items:center;justify-content:center}
.ctrl-btn:hover{background:rgba(139,92,246,0.3)}
.ctrl-btn.active{color:#8b5cf6}
.play-btn{width:60px;height:60px;font-size:1.4rem;background:linear-gradient(135deg,#8b5cf6,#6366f1);box-shadow:0 0 24px rgba(139,92,246,0.5)}
.play-btn:hover{transform:scale(1.08)}
.volume-row{display:flex;align-items:center;gap:10px;font-size:1rem}
.volume-row input{flex:1;accent-color:#8b5cf6}
.like-row{display:flex;align-items:center;gap:8px;justify-content:center}
.like-btn{background:none;border:none;font-size:1.4rem;cursor:pointer;transition:transform 0.2s}
.like-btn:hover{transform:scale(1.2)}
.playlist{background:#110e1a;border:1px solid rgba(255,255,255,0.06);border-radius:20px;padding:20px;width:380px;max-height:560px;display:flex;flex-direction:column;gap:14px}
.pl-hdr{display:flex;justify-content:space-between;align-items:center;font-weight:600;font-size:0.95rem}
.pl-cnt{font-size:0.78rem;color:#64748b}
.pl-list{overflow-y:auto;display:flex;flex-direction:column;gap:4px}
.pl-item{display:flex;align-items:center;gap:12px;padding:10px 12px;border-radius:12px;cursor:pointer;transition:all 0.2s}
.pl-item:hover{background:rgba(255,255,255,0.05)}
.pl-item.active{background:rgba(139,92,246,0.15);border:1px solid rgba(139,92,246,0.3)}
.pl-num{font-size:0.8rem;color:#64748b;min-width:20px;text-align:center}
.pl-num.playing{color:#8b5cf6}
.pl-art{font-size:1.6rem}
.pl-info{flex:1}.pl-name{font-size:0.88rem;font-weight:500}.pl-artist{font-size:0.75rem;color:#64748b}
.pl-time{font-size:0.75rem;color:#64748b}
.pl-like{font-size:0.85rem;opacity:0;transition:opacity 0.2s}
.pl-item:hover .pl-like{opacity:1}`,

    'app.js': `var TRACKS=[{name:'Midnight Drive',artist:'The Neon Lights',dur:'3:42',art:'🌃',bg:'linear-gradient(135deg,#1a1028,#2d1b69)',likes:false},{name:'Digital Dreams',artist:'Synthwave Studio',dur:'4:15',art:'🔮',bg:'linear-gradient(135deg,#0f1729,#1e3a5f)',likes:false},{name:'Electric Heart',artist:'Future Bass',dur:'3:28',art:'⚡',bg:'linear-gradient(135deg,#1a0a2e,#4a0e4e)',likes:false},{name:'Ocean Waves',artist:'Chill Vibes',dur:'5:01',art:'🌊',bg:'linear-gradient(135deg,#0a1628,#0e4d6e)',likes:false},{name:'Neon City',artist:'Retrowave',dur:'3:55',art:'🏙️',bg:'linear-gradient(135deg,#1a0520,#6b1a6e)',likes:false},{name:'Starlight',artist:'Ambient Sound',dur:'4:30',art:'✨',bg:'linear-gradient(135deg,#0a0a2e,#1a1a6e)',likes:false},{name:'Jungle Beats',artist:'World Music',dur:'3:10',art:'🌿',bg:'linear-gradient(135deg,#0a1a0a,#1a4a1a)',likes:false},{name:'Fire Soul',artist:'Rock Band',dur:'2:58',art:'🔥',bg:'linear-gradient(135deg,#2a0a0a,#6e1a0a)',likes:false}];var cur=0,playing=false,shuffle=false,repeat=false,progress=0,timer=null;function timeToSec(t){var p=t.split(':');return parseInt(p[0])*60+parseInt(p[1]);}function secToTime(s){return Math.floor(s/60)+':'+(s%60).toString().padStart(2,'0');}function updatePlayer(){var t=TRACKS[cur];document.getElementById('track-name').textContent=t.name;document.getElementById('artist').textContent=t.artist;document.getElementById('dur').textContent=t.dur;document.getElementById('art-inner').textContent=t.art;document.getElementById('art-inner').style.background=t.bg;document.getElementById('like-btn').textContent=t.likes?'❤️':'🤍';document.getElementById('like-lbl').textContent=t.likes?'Beğenildi':'Beğen';renderPlaylist();}function renderPlaylist(){var list=document.getElementById('pl-list');list.innerHTML='';TRACKS.forEach(function(t,i){var d=document.createElement('div');d.className='pl-item'+(i===cur?' active':'');d.innerHTML='<span class="pl-num '+(i===cur&&playing?'playing':'')+'">'+( i===cur&&playing?'▶':(i+1))+'</span><span class="pl-art">'+t.art+'</span><div class="pl-info"><div class="pl-name">'+t.name+'</div><div class="pl-artist">'+t.artist+'</div></div><span class="pl-time">'+t.dur+'</span><span class="pl-like">'+( t.likes?'❤️':'🤍')+'</span>';(function(idx){d.addEventListener('click',function(){selectTrack(idx);});})(i);list.appendChild(d);});}function selectTrack(i){cur=i;progress=0;clearInterval(timer);playing=true;startProgress();updatePlayer();document.getElementById('album-art'||'.album-art');document.querySelector('.album-art').classList.add('spinning');}function togglePlay(){playing=!playing;document.getElementById('play-btn').textContent=playing?'⏸':'▶';if(playing){startProgress();document.querySelector('.album-art').classList.add('spinning');}else{clearInterval(timer);document.querySelector('.album-art').classList.remove('spinning');}renderPlaylist();}function startProgress(){clearInterval(timer);var total=timeToSec(TRACKS[cur].dur);timer=setInterval(function(){progress++;var pct=progress/total*100;document.getElementById('pf').style.width=pct+'%';document.getElementById('cur-time').textContent=secToTime(progress);if(progress>=total){if(repeat){progress=0;}else{nextTrack();}}},1000);}function nextTrack(){progress=0;if(shuffle){cur=Math.floor(Math.random()*TRACKS.length);}else{cur=(cur+1)%TRACKS.length;}updatePlayer();if(playing)startProgress();}function prevTrack(){progress=0;cur=(cur-1+TRACKS.length)%TRACKS.length;updatePlayer();if(playing)startProgress();}function toggleShuffle(){shuffle=!shuffle;document.getElementById('shuffle-btn').classList.toggle('active',shuffle);}function toggleRepeat(){repeat=!repeat;document.getElementById('repeat-btn').classList.toggle('active',repeat);}function toggleLike(){TRACKS[cur].likes=!TRACKS[cur].likes;updatePlayer();}function seek(e){var pb=document.getElementById('pb');var pct=e.offsetX/pb.offsetWidth;var total=timeToSec(TRACKS[cur].dur);progress=Math.floor(pct*total);document.getElementById('pf').style.width=(pct*100)+'%';document.getElementById('cur-time').textContent=secToTime(progress);}function setVol(v){document.getElementById('vol').value=v;}updatePlayer();`
  }
},

// ============================================================
// 🏆 GRADE CALCULATOR
// ============================================================
gradecalculator: {
  keywords: ['grade', 'not', 'gpa', 'ders', 'sınav', 'sinav hesapla', 'ortalama'],
  projectName: 'grade-calculator',
  files: {
    'index.html': `<!DOCTYPE html><html lang="tr"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"><title>Not Hesaplayıcı</title><link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet"><link rel="stylesheet" href="style.css"></head>
<body><div class="app">
<h1>🏆 Not Hesaplayıcı</h1>
<div class="summary">
<div class="sum-box"><div class="sv" id="avg">—</div><div class="sl">AĞIRLIKLI ORT.</div></div>
<div class="sum-box"><div class="sv gpa" id="gpa">—</div><div class="sl">GPA (4.0)</div></div>
<div class="sum-box"><div class="sv ltr" id="ltr">—</div><div class="sl">HARF NOTU</div></div>
<div class="sum-box"><div class="sv" id="status-lbl">—</div><div class="sl">DURUM</div></div>
</div>
<div class="add-form">
<input type="text" id="cname" placeholder="Ders adı" style="flex:2">
<input type="number" id="cnote" placeholder="Not (0-100)" min="0" max="100" style="flex:1">
<input type="number" id="ccred" placeholder="Kredi" min="1" max="6" value="3" style="flex:1">
<button onclick="addCourse()">+ Ekle</button>
</div>
<table class="table" id="tbl"><thead><tr><th>#</th><th>Ders</th><th>Not</th><th>Kredi</th><th>Harf</th><th>Etki</th><th></th></tr></thead><tbody id="tbody"></tbody></table>
<button class="clr-btn" onclick="clear()">Tümünü Sil</button>
</div><script src="app.js"></script></body></html>`,

    'style.css': `*{box-sizing:border-box;margin:0;padding:0}body{background:#0f172a;color:#e2e8f0;font-family:'Inter',sans-serif;min-height:100vh;display:flex;align-items:flex-start;justify-content:center;padding:24px 16px}
.app{width:100%;max-width:720px;display:flex;flex-direction:column;gap:20px}
h1{font-size:1.6rem;font-weight:700;text-align:center}
.summary{display:grid;grid-template-columns:repeat(4,1fr);gap:12px}
.sum-box{background:#1e293b;border-radius:14px;padding:16px;text-align:center;border:1px solid rgba(255,255,255,0.06)}
.sv{font-size:1.8rem;font-weight:700;color:#6366f1;margin-bottom:4px}
.sv.gpa{color:#f59e0b}
.sv.ltr{color:#22c55e}
.sl{font-size:0.62rem;letter-spacing:2px;color:#64748b}
.add-form{display:flex;gap:8px;flex-wrap:wrap}
input,select{background:#1e293b;border:1px solid rgba(255,255,255,0.08);border-radius:10px;padding:11px 14px;color:#e2e8f0;font-family:inherit;font-size:0.9rem;outline:none;min-width:80px;transition:border-color 0.2s}
input:focus{border-color:rgba(99,102,241,0.5)}
.add-form button{padding:11px 20px;border-radius:10px;border:none;background:#6366f1;color:white;font-family:inherit;font-weight:600;cursor:pointer;white-space:nowrap;transition:all 0.2s}
.add-form button:hover{transform:scale(1.04)}
.table{width:100%;border-collapse:separate;border-spacing:0 6px}
.table thead th{font-size:0.7rem;letter-spacing:2px;color:#64748b;padding:0 12px 6px;text-align:left;font-weight:600}
.table tbody tr{background:#1e293b;animation:fadeIn 0.2s ease}
@keyframes fadeIn{from{opacity:0;transform:translateY(-4px)}to{opacity:1}}
.table td{padding:12px;font-size:0.88rem;border-top:1px solid transparent;border-bottom:1px solid rgba(255,255,255,0.05)}
.table td:first-child{border-radius:10px 0 0 10px}
.table td:last-child{border-radius:0 10px 10px 0}
.grade-lbl{display:inline-block;padding:3px 10px;border-radius:20px;font-size:0.78rem;font-weight:700}
.g-a{background:rgba(34,197,94,0.15);color:#22c55e}
.g-b{background:rgba(59,130,246,0.15);color:#60a5fa}
.g-c{background:rgba(245,158,11,0.15);color:#f59e0b}
.g-d{background:rgba(249,115,22,0.15);color:#fb923c}
.g-f{background:rgba(239,68,68,0.15);color:#ef4444}
.del-btn{background:none;border:none;color:#ef4444;cursor:pointer;font-size:0.9rem;opacity:0.5;transition:opacity 0.2s;padding:4px 8px;border-radius:6px}
.del-btn:hover{opacity:1;background:rgba(239,68,68,0.1)}
.progress-bar{height:6px;background:rgba(255,255,255,0.06);border-radius:3px;overflow:hidden;min-width:60px}
.progress-fill{height:100%;border-radius:3px;background:linear-gradient(90deg,#6366f1,#8b5cf6)}
.clr-btn{align-self:flex-start;background:none;border:none;color:#ef4444;font-family:inherit;font-size:0.85rem;cursor:pointer;text-decoration:underline;opacity:0.7}
.clr-btn:hover{opacity:1}`,

    'app.js': `var courses=JSON.parse(localStorage.getItem('grades')||'[]');function getLetter(n){if(n>=90)return{l:'AA',g:4.0};if(n>=85)return{l:'BA',g:3.5};if(n>=80)return{l:'BB',g:3.0};if(n>=75)return{l:'CB',g:2.5};if(n>=70)return{l:'CC',g:2.0};if(n>=65)return{l:'DC',g:1.5};if(n>=60)return{l:'DD',g:1.0};return{l:'FF',g:0.0};}function getClass(l){if(l.startsWith('A'))return 'g-a';if(l.startsWith('B'))return 'g-b';if(l.startsWith('C'))return 'g-c';if(l.startsWith('D'))return 'g-d';return 'g-f';}function calc(){if(!courses.length){document.getElementById('avg').textContent='—';document.getElementById('gpa').textContent='—';document.getElementById('ltr').textContent='—';document.getElementById('status-lbl').textContent='—';return;}var totalWeight=0,totalCred=0;courses.forEach(function(c){totalWeight+=c.note*c.cred;totalCred+=c.cred;});var avg=totalWeight/totalCred;var gpa=0,totalCredG=0;courses.forEach(function(c){gpa+=getLetter(c.note).g*c.cred;totalCredG+=c.cred;});gpa=gpa/totalCredG;var ltr=getLetter(avg);document.getElementById('avg').textContent=avg.toFixed(1);document.getElementById('gpa').textContent=gpa.toFixed(2);document.getElementById('ltr').textContent=ltr.l;document.getElementById('status-lbl').textContent=avg>=60?'✅ GEÇTİ':'❌ KALDI';document.getElementById('status-lbl').style.color=avg>=60?'#22c55e':'#ef4444';}function save(){localStorage.setItem('grades',JSON.stringify(courses));}function render(){var tbody=document.getElementById('tbody');tbody.innerHTML='';courses.forEach(function(c,i){var lt=getLetter(c.note);var tr=document.createElement('tr');tr.innerHTML='<td>'+(i+1)+'</td><td>'+c.name+'</td><td>'+c.note+'</td><td>'+c.cred+'</td><td><span class="grade-lbl '+getClass(lt.l)+'">'+lt.l+'</span></td><td><div class="progress-bar"><div class="progress-fill" style="width:'+c.note+'%"></div></div></td><td><button class="del-btn" onclick="del('+i+')">🗑</button></td>';tbody.appendChild(tr);});calc();}function addCourse(){var n=document.getElementById('cname').value.trim();var note=parseFloat(document.getElementById('cnote').value);var cred=parseFloat(document.getElementById('ccred').value)||3;if(!n||isNaN(note)||note<0||note>100){alert('Geçerli ders adı ve not girin (0-100)');return;}courses.push({name:n,note:note,cred:cred});document.getElementById('cname').value='';document.getElementById('cnote').value='';save();render();}function del(i){courses.splice(i,1);save();render();}function clear(){if(confirm('Tüm dersler silinsin mi?')){courses=[];save();render();}}render();`
  }
},

// ============================================================
// 🌤️ WEATHER APP (Demo)
// ============================================================
weatherapp: {
  keywords: ['weather', 'hava', 'hava durumu', 'sıcaklık', 'sicaklik', 'tahmin', 'meteoroloji'],
  projectName: 'weather-app',
  files: {
    'index.html': `<!DOCTYPE html><html lang="tr"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"><title>Hava Durumu</title><link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet"><link rel="stylesheet" href="style.css"></head>
<body><div class="app">
<div class="search-bar"><input type="text" id="city-input" placeholder="Şehir ara... (İstanbul, Ankara...)" onkeydown="if(event.key==='Enter')search()"><button onclick="search()">🔍</button></div>
<div class="weather-card" id="main-card">
<div class="weather-bg" id="wbg"></div>
<div class="card-content">
<div class="location" id="location">İstanbul, TR</div>
<div class="date" id="wdate"></div>
<div class="main-weather"><div class="weather-icon" id="wicon">⛅</div><div class="temp" id="temp">18°</div></div>
<div class="desc" id="desc">Parçalı Bulutlu</div>
<div class="stats"><div class="ws"><div class="wv" id="feels">16°</div><div class="wl">Hissedilen</div></div><div class="ws"><div class="wv" id="humidity">65%</div><div class="wl">Nem</div></div><div class="ws"><div class="wv" id="wind">12 km/s</div><div class="wl">Rüzgar</div></div><div class="ws"><div class="wv" id="uv">3</div><div class="wl">UV İndeks</div></div></div>
</div>
</div>
<div class="forecast" id="forecast"></div>
<div class="api-note">💡 Demo mod: Gerçek veri için OpenWeatherMap API key gerekir</div>
</div><script src="app.js"></script></body></html>`,

    'style.css': `*{box-sizing:border-box;margin:0;padding:0}body{background:#06090f;color:#f1f5f9;font-family:'Inter',sans-serif;min-height:100vh;display:flex;align-items:flex-start;justify-content:center;padding:24px 16px;background-image:radial-gradient(ellipse at 50% 0%,rgba(56,189,248,0.08),transparent 60%)}
.app{width:100%;max-width:460px;display:flex;flex-direction:column;gap:16px}
.search-bar{display:flex;gap:8px}
.search-bar input{flex:1;background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.1);border-radius:14px;padding:13px 16px;color:#f1f5f9;font-family:inherit;font-size:0.9rem;outline:none;transition:border-color 0.2s}
.search-bar input:focus{border-color:rgba(56,189,248,0.5)}
.search-bar button{width:50px;border-radius:14px;border:none;background:rgba(56,189,248,0.2);color:#7dd3fc;font-size:1.1rem;cursor:pointer;transition:all 0.2s}
.search-bar button:hover{background:rgba(56,189,248,0.35)}
.weather-card{position:relative;border-radius:24px;overflow:hidden;border:1px solid rgba(255,255,255,0.08)}
.weather-bg{position:absolute;inset:0;background:linear-gradient(160deg,#0c4a6e,#1e40af);z-index:0;transition:background 0.5s}
.card-content{position:relative;z-index:1;padding:28px}
.location{font-size:1rem;font-weight:600;margin-bottom:4px}
.date{color:rgba(255,255,255,0.6);font-size:0.82rem;margin-bottom:20px}
.main-weather{display:flex;align-items:center;gap:0;margin-bottom:8px}
.weather-icon{font-size:5rem;line-height:1;filter:drop-shadow(0 4px 16px rgba(0,0,0,0.3))}
.temp{font-size:5rem;font-weight:300;letter-spacing:-3px}
.desc{color:rgba(255,255,255,0.8);font-size:1rem;margin-bottom:24px;text-transform:capitalize}
.stats{display:grid;grid-template-columns:repeat(4,1fr);gap:8px}
.ws{background:rgba(255,255,255,0.12);border-radius:12px;padding:10px;text-align:center;-webkit-backdrop-filter:blur(4px);backdrop-filter:blur(4px)}
.wv{font-size:0.95rem;font-weight:600;margin-bottom:3px}
.wl{font-size:0.65rem;color:rgba(255,255,255,0.6);letter-spacing:1px}
.forecast{display:grid;grid-template-columns:repeat(5,1fr);gap:8px}
.fc-item{background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.07);border-radius:14px;padding:12px 8px;text-align:center;display:flex;flex-direction:column;gap:6px}
.fc-day{font-size:0.7rem;color:#94a3b8;font-weight:600}
.fc-icon{font-size:1.6rem}
.fc-hi{font-size:0.9rem;font-weight:600}
.fc-lo{font-size:0.78rem;color:#64748b}
.api-note{text-align:center;font-size:0.75rem;color:#475569;padding:8px;background:rgba(255,255,255,0.02);border-radius:10px}`,

    'app.js': `var CITIES={istanbul:{name:'İstanbul, TR',temp:18,feels:16,humidity:65,wind:12,uv:3,desc:'Parçalı Bulutlu',icon:'⛅',bg:'linear-gradient(160deg,#0c4a6e,#1e40af)',forecast:[{d:'Sal',i:'🌤',h:21,l:14},{d:'Çar',i:'🌧',h:17,l:11},{d:'Per',i:'⛈',h:15,l:10},{d:'Cum',i:'🌦',h:19,l:13},{d:'Cmt',i:'☀️',h:24,l:15}]},ankara:{name:'Ankara, TR',temp:12,feels:9,humidity:55,wind:18,uv:2,desc:'Bulutlu',icon:'☁️',bg:'linear-gradient(160deg,#1c1c2e,#374151)',forecast:[{d:'Sal',i:'🌧',h:14,l:6},{d:'Çar',i:'❄️',h:8,l:2},{d:'Per',i:'🌨',h:6,l:1},{d:'Cum',i:'☁️',h:11,l:4},{d:'Cmt',i:'🌤',h:16,l:7}]},izmir:{name:'İzmir, TR',temp:24,feels:23,humidity:70,wind:8,uv:6,desc:'Güneşli',icon:'☀️',bg:'linear-gradient(160deg,#7c3aed,#c2410c)',forecast:[{d:'Sal',i:'☀️',h:27,l:18},{d:'Çar',i:'🌤',h:25,l:17},{d:'Per',i:'⛅',h:22,l:15},{d:'Cum',i:'☀️',h:26,l:17},{d:'Cmt',i:'☀️',h:28,l:19}]},antalya:{name:'Antalya, TR',temp:28,feels:27,humidity:60,wind:6,uv:8,desc:'Güneşli ve Sıcak',icon:'🌞',bg:'linear-gradient(160deg,#c2410c,#b45309)',forecast:[{d:'Sal',i:'☀️',h:30,l:22},{d:'Çar',i:'🌤',h:28,l:20},{d:'Per',i:'⛅',h:26,l:19},{d:'Cum',i:'☀️',h:31,l:23},{d:'Cmt',i:'🌞',h:33,l:24}]},london:{name:'London, UK',temp:9,feels:6,humidity:80,wind:22,uv:1,desc:'Sisli ve Yağmurlu',icon:'🌧',bg:'linear-gradient(160deg,#1f2937,#374151)',forecast:[{d:'Tue',i:'🌧',h:11,l:7},{d:'Wed',i:'⛈',h:9,l:5},{d:'Thu',i:'🌦',h:12,l:6},{d:'Fri',i:'☁️',h:13,l:7},{d:'Sat',i:'🌤',h:15,l:8}]}};function search(){var q=document.getElementById('city-input').value.trim().toLowerCase();var key=Object.keys(CITIES).find(function(k){return k.includes(q)||CITIES[k].name.toLowerCase().includes(q);});if(!key){alert('Şehir bulunamadı. Dene: Istanbul, Ankara, Izmir, Antalya, London');return;}render(CITIES[key]);}function render(w){document.getElementById('location').textContent=w.name;document.getElementById('wdate').textContent=new Date().toLocaleDateString('tr-TR',{weekday:'long',year:'numeric',month:'long',day:'numeric'});document.getElementById('wicon').textContent=w.icon;document.getElementById('temp').textContent=w.temp+'°';document.getElementById('desc').textContent=w.desc;document.getElementById('feels').textContent=w.feels+'°';document.getElementById('humidity').textContent=w.humidity+'%';document.getElementById('wind').textContent=w.wind+' km/s';document.getElementById('uv').textContent=w.uv;document.getElementById('wbg').style.background=w.bg;var fc=document.getElementById('forecast');fc.innerHTML='';w.forecast.forEach(function(f){fc.innerHTML+='<div class="fc-item"><div class="fc-day">'+f.d+'</div><div class="fc-icon">'+f.i+'</div><div class="fc-hi">'+f.h+'°</div><div class="fc-lo">'+f.l+'°</div></div>';});}render(CITIES.istanbul);`
  }
}

}); // End Object.assign Batch 3
