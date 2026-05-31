/**
 * FORGE TEMPLATE REGISTRY — BATCH 1 (10 templates)
 * Loaded after templates.js, extends window.FORGE_TEMPLATES
 */
Object.assign(window.FORGE_TEMPLATES, {

// ============================================================
// 🟦 TETRIS
// ============================================================
tetris: {
  keywords: ['tetris', 'blok', 'block', 'tetromino'],
  projectName: 'tetris',
  files: {
    'index.html': `<!DOCTYPE html><html lang="tr"><head><meta charset="UTF-8"><title>Tetris</title><link rel="stylesheet" href="style.css"></head>
<body><div class="app"><h1 class="title">TETRIS</h1><div class="game-area">
<canvas id="board" width="300" height="600"></canvas>
<div class="side"><div class="panel"><div class="lbl">NEXT</div><canvas id="next" width="100" height="100"></canvas></div>
<div class="panel"><div class="lbl">SCORE</div><div class="val" id="score">0</div></div>
<div class="panel"><div class="lbl">LEVEL</div><div class="val" id="level">1</div></div>
<div class="panel"><div class="lbl">LINES</div><div class="val" id="lines">0</div></div>
<button class="btn" id="btn">▶ START</button>
<div class="hint"><p>↑ Rotate</p><p>←→ Move</p><p>↓ Drop</p><p>Space Hard</p></div></div></div>
<div class="ov" id="ov"><div class="ob"><h2 id="ot">TETRIS</h2><p id="os">Press Start</p><button class="btn" onclick="startGame()">PLAY</button></div></div></div>
<script src="game.js"></script></body></html>`,

    'style.css': `*{box-sizing:border-box;margin:0;padding:0}
body{background:#0d0d1a;color:#e2e8f0;font-family:'Segoe UI',sans-serif;display:flex;align-items:center;justify-content:center;min-height:100vh}
.app{position:relative;display:flex;flex-direction:column;align-items:center;gap:12px}
.title{font-size:1.8rem;font-weight:900;letter-spacing:6px;background:linear-gradient(135deg,#6366f1,#22c55e);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
.game-area{display:flex;gap:16px}
#board{border:2px solid rgba(99,102,241,0.4);box-shadow:0 0 24px rgba(99,102,241,0.3);background:#0d0d1a;display:block}
.side{display:flex;flex-direction:column;gap:10px;width:120px}
.panel{background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.08);border-radius:8px;padding:10px;text-align:center}
.lbl{font-size:0.6rem;letter-spacing:2px;color:#64748b;margin-bottom:4px}
.val{font-size:1.4rem;font-weight:700;color:#6366f1}
.btn{width:100%;padding:10px;border-radius:8px;border:none;background:linear-gradient(135deg,#6366f1,#8b5cf6);color:white;font-weight:700;cursor:pointer;letter-spacing:1px;transition:all 0.2s}
.btn:hover{transform:scale(1.04)}
.hint{font-size:0.68rem;color:#64748b;line-height:2;background:rgba(255,255,255,0.03);border-radius:8px;padding:8px;text-align:left}
.ov{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;background:rgba(13,13,26,0.92);-webkit-backdrop-filter:blur(4px);backdrop-filter:blur(4px);z-index:10}
.ov.hidden{display:none}
.ob{text-align:center;display:flex;flex-direction:column;gap:16px;align-items:center}
.ob h2{font-size:2rem;letter-spacing:4px}
.ob p{color:#94a3b8}`,

    'game.js': `var C=10,R=20,B=30;
var CLRS=['','#ef4444','#f97316','#eab308','#22c55e','#06b6d4','#6366f1','#a855f7'];
var SHAPES=[
  [[0,0],[0,-1],[0,1],[0,2]],
  [[0,0],[1,0],[0,1],[1,1]],
  [[0,0],[-1,0],[1,0],[0,-1]],
  [[0,0],[1,0],[-1,1],[0,1]],
  [[0,0],[-1,0],[0,1],[1,1]],
  [[0,0],[1,0],[-1,0],[-1,-1]],
  [[0,0],[-1,0],[1,0],[1,-1]]
];
var cv=document.getElementById('board'),cx=cv.getContext('2d');
var nc=document.getElementById('next'),nx=nc.getContext('2d');
var board,cur,nxt,sc,lv,ln,run,raf,lt,dc,di;
function nb(){return Array.from({length:R},function(){return Array(C).fill(0);});}
function rp(){var i=Math.floor(Math.random()*SHAPES.length);return{s:SHAPES[i].map(function(a){return[a[0],a[1]];}),c:i+1,r:1,cl:Math.floor(C/2)};}
function db(ctx,r,c,col,sz){ctx.fillStyle=CLRS[col];ctx.fillRect(c*sz+1,r*sz+1,sz-2,sz-2);ctx.fillStyle='rgba(255,255,255,0.18)';ctx.fillRect(c*sz+1,r*sz+1,sz-2,4);ctx.fillRect(c*sz+1,r*sz+1,4,sz-2);}
function col(s,r,c){return s.some(function(a){var nr=r+a[0],nc=c+a[1];return nr<0||nr>=R||nc<0||nc>=C||(nr>=0&&board[nr][nc]!==0);});}
function draw(){cx.fillStyle='#0d0d1a';cx.fillRect(0,0,300,600);board.forEach(function(row,r){row.forEach(function(v,c){if(v)db(cx,r,c,v,B);});});var d=0;while(!col(cur.s,cur.r+d+1,cur.cl))d++;cur.s.forEach(function(a){var gr=cur.r+d+a[0],gc=cur.cl+a[1];if(gr>=0){cx.fillStyle='rgba(255,255,255,0.06)';cx.fillRect(gc*B+1,gr*B+1,B-2,B-2);}});cur.s.forEach(function(a){var r=cur.r+a[0],c=cur.cl+a[1];if(r>=0)db(cx,r,c,cur.c,B);});nx.fillStyle='#0d0d1a';nx.fillRect(0,0,100,100);nxt.s.forEach(function(a){db(nx,a[0]+2,a[1]+2,nxt.c,20);});}
function lock(){cur.s.forEach(function(a){var r=cur.r+a[0],c=cur.cl+a[1];if(r>=0&&r<R)board[r][c]=cur.c;});var cl=0;for(var r=R-1;r>=0;r--){if(board[r].every(function(v){return v!==0;})){board.splice(r,1);board.unshift(Array(C).fill(0));r++;cl++;}}if(cl){sc+=[0,100,300,500,800][cl]*lv;ln+=cl;lv=Math.floor(ln/10)+1;di=Math.max(80,1000-(lv-1)*100);document.getElementById('score').textContent=sc;document.getElementById('level').textContent=lv;document.getElementById('lines').textContent=ln;}cur=nxt;nxt=rp();if(col(cur.s,cur.r,cur.cl))go();}
function rot(){var ns=cur.s[0].map(function(_,c){return cur.s.map(function(r){return r[c];}).reverse();});if(!col(ns,cur.r,cur.cl))cur.s=ns;else if(!col(ns,cur.r,cur.cl-1)){cur.s=ns;cur.cl--;}else if(!col(ns,cur.r,cur.cl+1)){cur.s=ns;cur.cl++;}}
function loop(ts){if(!run)return;raf=requestAnimationFrame(loop);var dt=ts-(lt||ts);lt=ts;dc+=dt;if(dc>di){dc=0;if(!col(cur.s,cur.r+1,cur.cl))cur.r++;else lock();}draw();}
function go(){run=false;document.getElementById('ov').classList.remove('hidden');document.getElementById('ot').textContent='GAME OVER';document.getElementById('os').textContent='Score: '+sc;}
function startGame(){board=nb();sc=0;lv=1;ln=0;di=1000;dc=0;lt=0;run=true;cur=rp();nxt=rp();document.getElementById('score').textContent=0;document.getElementById('level').textContent=1;document.getElementById('lines').textContent=0;document.getElementById('ov').classList.add('hidden');if(raf)cancelAnimationFrame(raf);raf=requestAnimationFrame(loop);}
document.getElementById('btn').addEventListener('click',startGame);
document.addEventListener('keydown',function(e){if(!run)return;if(e.key==='ArrowLeft'&&!col(cur.s,cur.r,cur.cl-1))cur.cl--;else if(e.key==='ArrowRight'&&!col(cur.s,cur.r,cur.cl+1))cur.cl++;else if(e.key==='ArrowDown'&&!col(cur.s,cur.r+1,cur.cl))cur.r++;else if(e.key==='ArrowUp')rot();else if(e.code==='Space'){e.preventDefault();while(!col(cur.s,cur.r+1,cur.cl))cur.r++;lock();}});`
  }
},

// ============================================================
// 2️⃣0️⃣4️⃣8️⃣ — 2048
// ============================================================
game2048: {
  keywords: ['2048', 'karo', 'tile', 'puzzle'],
  projectName: '2048',
  files: {
    'index.html': `<!DOCTYPE html><html lang="tr"><head><meta charset="UTF-8"><title>2048</title><link rel="stylesheet" href="style.css"></head>
<body><div class="app">
<div class="header"><h1>2048</h1><div class="scores"><div class="sb"><div class="sl">SCORE</div><div id="sc">0</div></div><div class="sb"><div class="sl">BEST</div><div id="best">0</div></div></div></div>
<p class="sub">Aynı sayıları birleştir — 2048'e ulaş!</p>
<div class="grid" id="grid"></div>
<div class="btns"><button class="btn" onclick="init()">Yeni Oyun</button></div>
<div class="ov hidden" id="ov"><div class="ob"><h2 id="ot">2048!</h2><p id="os"></p><button class="btn" onclick="init()">TEKRAR</button></div></div>
</div><script src="app.js"></script></body></html>`,

    'style.css': `*{box-sizing:border-box;margin:0;padding:0}
body{background:#1a1a2e;color:#e2e8f0;font-family:'Segoe UI',sans-serif;display:flex;align-items:center;justify-content:center;min-height:100vh}
.app{display:flex;flex-direction:column;align-items:center;gap:16px;padding:20px;position:relative}
.header{width:100%;display:flex;align-items:center;justify-content:space-between}
h1{font-size:2.5rem;font-weight:900;color:#f59e0b}
.scores{display:flex;gap:10px}
.sb{background:rgba(255,255,255,0.08);border-radius:8px;padding:6px 16px;text-align:center;min-width:70px;font-size:1.2rem;font-weight:700}
.sl{font-size:0.6rem;letter-spacing:2px;color:#94a3b8;margin-bottom:2px}
.sub{color:#64748b;font-size:0.9rem}
.grid{display:grid;grid-template-columns:repeat(4,1fr);gap:10px;background:#16213e;border-radius:12px;padding:10px;width:340px}
.cell{width:72px;height:72px;border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:1.4rem;font-weight:900;background:#0f3460;color:#e2e8f0;transition:all 0.1s}
.c2{background:#eee4da;color:#776e65}.c4{background:#ede0c8;color:#776e65}.c8{background:#f2b179;color:white}.c16{background:#f59563;color:white}.c32{background:#f67c5f;color:white}.c64{background:#f65e3b;color:white}.c128{background:#edcf72;color:white;font-size:1.1rem}.c256{background:#edcc61;color:white;font-size:1.1rem}.c512{background:#edc850;color:white;font-size:1rem}.c1024{background:#edc53f;color:white;font-size:0.9rem}.c2048{background:#edc22e;color:white;font-size:0.9rem}
.btns{margin-top:4px}
.btn{padding:10px 24px;border-radius:10px;border:none;background:#f59e0b;color:#1a1a2e;font-weight:700;cursor:pointer;font-size:0.9rem;transition:all 0.2s}
.btn:hover{transform:scale(1.04)}
.ov{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;background:rgba(26,26,46,0.9);-webkit-backdrop-filter:blur(4px);backdrop-filter:blur(4px);border-radius:12px;z-index:10}
.ov.hidden{display:none}
.ob{text-align:center;display:flex;flex-direction:column;gap:16px;align-items:center}
.ob h2{font-size:2rem;font-weight:900}.ob p{color:#94a3b8}`,

    'app.js': `var board,score,best=0;function init(){board=Array.from({length:4},function(){return Array(4).fill(0);});score=0;addTile();addTile();document.getElementById('sc').textContent=0;document.getElementById('ov').classList.add('hidden');render();}function addTile(){var empty=[];for(var r=0;r<4;r++)for(var c=0;c<4;c++)if(!board[r][c])empty.push([r,c]);if(!empty.length)return;var pos=empty[Math.floor(Math.random()*empty.length)];board[pos[0]][pos[1]]=Math.random()<0.9?2:4;}function render(){var g=document.getElementById('grid');g.innerHTML='';board.forEach(function(row){row.forEach(function(v){var d=document.createElement('div');d.className='cell'+(v?' c'+v:'');d.textContent=v||'';g.appendChild(d);});});}function slide(row){var r=row.filter(function(v){return v;});var merged=[];var res=[];for(var i=0;i<r.length;i++){if(i+1<r.length&&r[i]===r[i+1]){merged.push(r[i]*2);score+=r[i]*2;i++;}else merged.push(r[i]);}while(merged.length<4)merged.push(0);return merged;}function move(dir){var prev=JSON.stringify(board);if(dir==='l')board=board.map(slide);else if(dir==='r')board=board.map(function(row){return slide(row.slice().reverse()).reverse();});else if(dir==='u'){for(var c=0;c<4;c++){var col=board.map(function(r){return r[c];});var s=slide(col);board.forEach(function(r,i){r[c]=s[i];});}}else{for(var c=0;c<4;c++){var col=board.map(function(r){return r[c];}).reverse();var s=slide(col).reverse();board.forEach(function(r,i){r[c]=s[i];});}}if(JSON.stringify(board)!==prev){addTile();document.getElementById('sc').textContent=score;if(score>best){best=score;document.getElementById('best').textContent=best;}check();render();}}function check(){if(board.some(function(r){return r.some(function(v){return v===2048;});})){win();}else{var moves=false;for(var r=0;r<4&&!moves;r++)for(var c=0;c<4&&!moves;c++){if(!board[r][c]||( c<3&&board[r][c]===board[r][c+1])||(r<3&&board[r][c]===board[r+1][c]))moves=true;}if(!moves)over();}}function win(){document.getElementById('ov').classList.remove('hidden');document.getElementById('ot').textContent='2048!';document.getElementById('os').textContent='Tebrikler! Skor: '+score;}function over(){document.getElementById('ov').classList.remove('hidden');document.getElementById('ot').textContent='GAME OVER';document.getElementById('os').textContent='Skor: '+score;}document.addEventListener('keydown',function(e){var map={ArrowLeft:'l',ArrowRight:'r',ArrowUp:'u',ArrowDown:'d',a:'l',d:'r',w:'u',s:'d'};if(map[e.key]){e.preventDefault();move(map[e.key]);}});init();`
  }
},

// ============================================================
// 💣 MINESWEEPER
// ============================================================
minesweeper: {
  keywords: ['minesweeper', 'mayın', 'mayin tarlasi', 'mine', 'bomb'],
  projectName: 'minesweeper',
  files: {
    'index.html': `<!DOCTYPE html><html lang="tr"><head><meta charset="UTF-8"><title>Minesweeper</title><link rel="stylesheet" href="style.css"></head>
<body><div class="app"><h1>💣 MINESWEEPER</h1>
<div class="hud"><div class="hud-box"><span>💣</span><span id="mcount">10</span></div><button class="face" id="face" onclick="init()">🙂</button><div class="hud-box"><span>⏱</span><span id="timer">0</span></div></div>
<div class="grid" id="grid"></div></div>
<script src="app.js"></script></body></html>`,

    'style.css': `*{box-sizing:border-box;margin:0;padding:0}body{background:#1e1e2e;color:#cdd6f4;font-family:'Segoe UI',monospace;display:flex;align-items:center;justify-content:center;min-height:100vh}
.app{display:flex;flex-direction:column;align-items:center;gap:16px;padding:24px;background:#181825;border-radius:16px;box-shadow:0 8px 32px rgba(0,0,0,0.4)}
h1{font-size:1.4rem;letter-spacing:3px}
.hud{display:flex;align-items:center;justify-content:space-between;width:100%;padding:8px 12px;background:#313244;border-radius:10px}
.hud-box{display:flex;align-items:center;gap:6px;font-size:1.1rem;font-weight:700;min-width:60px}
.face{font-size:1.8rem;background:none;border:none;cursor:pointer;transition:transform 0.1s}.face:hover{transform:scale(1.1)}
.grid{display:grid;grid-template-columns:repeat(9,1fr);gap:3px}
.cell{width:36px;height:36px;border-radius:6px;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:0.9rem;cursor:pointer;background:#313244;border:1px solid rgba(255,255,255,0.06);transition:all 0.1s;user-select:none}
.cell:hover:not(.revealed):not(.flagged){background:#45475a}
.cell.revealed{background:#1e1e2e;border-color:rgba(255,255,255,0.03);cursor:default}
.cell.flagged{background:#3d2f00}
.cell.mine-hit{background:#7f1d1d}
.n1{color:#60a5fa}.n2{color:#4ade80}.n3{color:#f87171}.n4{color:#818cf8}.n5{color:#fb923c}.n6{color:#22d3ee}.n7{color:#e879f9}.n8{color:#94a3b8}`,

    'app.js': `var ROWS=9,COLS=9,MINES=10;var board,revealed,flagged,gameOver,started,timerInt,elapsed;function init(){board=Array.from({length:ROWS},function(){return Array(COLS).fill(0);});revealed=Array.from({length:ROWS},function(){return Array(COLS).fill(false);});flagged=Array.from({length:ROWS},function(){return Array(COLS).fill(false);});gameOver=false;started=false;elapsed=0;clearInterval(timerInt);document.getElementById('timer').textContent='0';document.getElementById('mcount').textContent=MINES;document.getElementById('face').textContent='🙂';render();}function placeMines(sr,sc){var placed=0;while(placed<MINES){var r=Math.floor(Math.random()*ROWS),c=Math.floor(Math.random()*COLS);if(board[r][c]===0&&!(Math.abs(r-sr)<=1&&Math.abs(c-sc)<=1)){board[r][c]=-1;placed++;}}for(var r=0;r<ROWS;r++)for(var c=0;c<COLS;c++){if(board[r][c]===-1)continue;var cnt=0;for(var dr=-1;dr<=1;dr++)for(var dc=-1;dc<=1;dc++){var nr=r+dr,nc=c+dc;if(nr>=0&&nr<ROWS&&nc>=0&&nc<COLS&&board[nr][nc]===-1)cnt++;}board[r][c]=cnt;}}function reveal(r,c){if(r<0||r>=ROWS||c<0||c>=COLS||revealed[r][c]||flagged[r][c])return;revealed[r][c]=true;if(board[r][c]===0){for(var dr=-1;dr<=1;dr++)for(var dc=-1;dc<=1;dc++)reveal(r+dr,c+dc);}}function click(r,c){if(gameOver||revealed[r][c]||flagged[r][c])return;if(!started){started=true;placeMines(r,c);timerInt=setInterval(function(){elapsed++;document.getElementById('timer').textContent=elapsed;},1000);}if(board[r][c]===-1){revealed[r][c]=true;gameOver=true;clearInterval(timerInt);document.getElementById('face').textContent='😵';revealAll();render();return;}reveal(r,c);checkWin();render();}function flag(e,r,c){e.preventDefault();if(gameOver||revealed[r][c])return;flagged[r][c]=!flagged[r][c];var f=0;for(var i=0;i<ROWS;i++)for(var j=0;j<COLS;j++)if(flagged[i][j])f++;document.getElementById('mcount').textContent=MINES-f;render();}function revealAll(){for(var r=0;r<ROWS;r++)for(var c=0;c<COLS;c++)if(board[r][c]===-1)revealed[r][c]=true;}function checkWin(){var safe=0;for(var r=0;r<ROWS;r++)for(var c=0;c<COLS;c++)if(revealed[r][c]&&board[r][c]!==-1)safe++;if(safe===ROWS*COLS-MINES){gameOver=true;clearInterval(timerInt);document.getElementById('face').textContent='😎';}}function render(){var g=document.getElementById('grid');g.innerHTML='';for(var r=0;r<ROWS;r++){for(var c=0;c<COLS;c++){var cell=document.createElement('div');cell.className='cell';if(revealed[r][c]){cell.classList.add('revealed');if(board[r][c]===-1){cell.textContent='💣';cell.classList.add('mine-hit');}else if(board[r][c]>0){cell.textContent=board[r][c];cell.classList.add('n'+board[r][c]);}}else if(flagged[r][c]){cell.classList.add('flagged');cell.textContent='🚩';}(function(row,col){cell.addEventListener('click',function(){click(row,col);});cell.addEventListener('contextmenu',function(e){flag(e,row,col);});})(r,c);g.appendChild(cell);}}}init();`
  }
},

// ============================================================
// 🃏 MEMORY CARD GAME
// ============================================================
memory: {
  keywords: ['memory', 'kart', 'card', 'eşleştir', 'esleştir', 'matching'],
  projectName: 'memory-game',
  files: {
    'index.html': `<!DOCTYPE html><html lang="tr"><head><meta charset="UTF-8"><title>Memory</title><link rel="stylesheet" href="style.css"></head>
<body><div class="app"><h1>🃏 MEMORY</h1>
<div class="hud"><span>Hamle: <b id="moves">0</b></span><span>⏱ <b id="timer">0</b>s</span><span>✅ <b id="matched">0</b>/8</span></div>
<div class="grid" id="grid"></div>
<div class="ov hidden" id="ov"><div class="ob"><h2>🎉 Tebrikler!</h2><p id="res"></p><button class="btn" onclick="startGame()">TEKRAR</button></div></div>
</div><script src="app.js"></script></body></html>`,

    'style.css': `*{box-sizing:border-box;margin:0;padding:0}body{background:#0f172a;color:#e2e8f0;font-family:'Segoe UI',sans-serif;display:flex;align-items:center;justify-content:center;min-height:100vh}
.app{display:flex;flex-direction:column;align-items:center;gap:20px;padding:24px;position:relative}
h1{font-size:2rem;font-weight:900;background:linear-gradient(135deg,#818cf8,#c084fc);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
.hud{display:flex;gap:24px;font-size:0.9rem;color:#94a3b8}
.hud b{color:#e2e8f0}
.grid{display:grid;grid-template-columns:repeat(4,1fr);gap:12px}
.card{width:80px;height:80px;cursor:pointer;perspective:600px}
.card-inner{width:100%;height:100%;position:relative;transform-style:preserve-3d;transition:transform 0.4s}
.card.flipped .card-inner{transform:rotateY(180deg)}
.face,.back{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;border-radius:10px;backface-visibility:hidden;font-size:2rem}
.back{background:linear-gradient(135deg,#4f46e5,#7c3aed);border:2px solid rgba(139,92,246,0.4);box-shadow:0 4px 16px rgba(99,102,241,0.3)}
.face{background:#1e293b;border:2px solid rgba(255,255,255,0.08);transform:rotateY(180deg)}
.card.matched .face{border-color:#22c55e;box-shadow:0 0 16px rgba(34,197,94,0.4)}
.btn{padding:12px 32px;border-radius:12px;border:none;background:linear-gradient(135deg,#6366f1,#8b5cf6);color:white;font-weight:700;cursor:pointer;font-size:1rem;transition:all 0.2s}
.btn:hover{transform:scale(1.04)}
.ov{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;background:rgba(15,23,42,0.92);-webkit-backdrop-filter:blur(6px);backdrop-filter:blur(6px);border-radius:12px;z-index:10}
.ov.hidden{display:none}
.ob{text-align:center;display:flex;flex-direction:column;gap:16px;align-items:center}
.ob h2{font-size:2rem}.ob p{color:#94a3b8}`,

    'app.js': `var EMOJIS=['🍎','🍊','🍋','🍇','🌸','🦊','🐸','🦋'];var cards,flipped,matched,moves,elapsed,timerInt,locked;function startGame(){var pairs=EMOJIS.concat(EMOJIS).sort(function(){return Math.random()-0.5;});cards=pairs.map(function(e,i){return{id:i,emoji:e,flip:false,match:false};});flipped=[];matched=0;moves=0;elapsed=0;locked=false;clearInterval(timerInt);timerInt=setInterval(function(){elapsed++;document.getElementById('timer').textContent=elapsed;},1000);document.getElementById('moves').textContent=0;document.getElementById('matched').textContent=0;document.getElementById('timer').textContent=0;document.getElementById('ov').classList.add('hidden');render();}function click(i){if(locked||cards[i].flip||cards[i].match)return;cards[i].flip=true;flipped.push(i);render();if(flipped.length===2){locked=true;moves++;document.getElementById('moves').textContent=moves;var a=flipped[0],b=flipped[1];if(cards[a].emoji===cards[b].emoji){cards[a].match=cards[b].match=true;matched++;document.getElementById('matched').textContent=matched;flipped=[];locked=false;if(matched===EMOJIS.length){clearInterval(timerInt);document.getElementById('ov').classList.remove('hidden');document.getElementById('res').textContent=moves+' hamlede, '+elapsed+'sn\'de tamamladın!';}}else{setTimeout(function(){cards[a].flip=cards[b].flip=false;flipped=[];locked=false;render();},900);}}}function render(){var g=document.getElementById('grid');g.innerHTML='';cards.forEach(function(card,i){var d=document.createElement('div');d.className='card'+(card.flip||card.match?' flipped':'')+(card.match?' matched':'');d.innerHTML='<div class="card-inner"><div class="back">❓</div><div class="face">'+card.emoji+'</div></div>';(function(idx){d.addEventListener('click',function(){click(idx);});})(i);g.appendChild(d);});}startGame();`
  }
},

// ============================================================
// ❌ TIC TAC TOE
// ============================================================
tictactoe: {
  keywords: ['tictactoe', 'tic tac toe', 'xox', 'xo oyunu', 'xox oyunu'],
  projectName: 'tictactoe',
  files: {
    'index.html': `<!DOCTYPE html><html lang="tr"><head><meta charset="UTF-8"><title>Tic Tac Toe</title><link rel="stylesheet" href="style.css"></head>
<body><div class="app"><h1>❌ TIC TAC TOE ⭕</h1>
<div class="score"><div class="sb"><div>X</div><div id="sx">0</div></div><div class="sb draw"><div>DRAW</div><div id="sd">0</div></div><div class="sb o"><div>O</div><div id="so">0</div></div></div>
<div class="mode"><button class="mbtn active" id="m1" onclick="setMode(1)">vs Oyuncu</button><button class="mbtn" id="m2" onclick="setMode(2)">vs AI</button></div>
<div class="status" id="status">X'in sırası</div>
<div class="board" id="board"></div>
<button class="btn" onclick="reset()">YENİ OYUN</button>
</div><script src="app.js"></script></body></html>`,

    'style.css': `*{box-sizing:border-box;margin:0;padding:0}body{background:#0f0f1a;color:#e2e8f0;font-family:'Segoe UI',sans-serif;display:flex;align-items:center;justify-content:center;min-height:100vh}
.app{display:flex;flex-direction:column;align-items:center;gap:20px;padding:24px}
h1{font-size:1.5rem;font-weight:900;letter-spacing:1px}
.score{display:flex;gap:12px}
.sb{background:rgba(239,68,68,0.15);border:1px solid rgba(239,68,68,0.3);border-radius:12px;padding:10px 24px;text-align:center;font-weight:700}
.sb div:first-child{font-size:0.7rem;letter-spacing:2px;color:#f87171;margin-bottom:4px}
.sb div:last-child{font-size:1.6rem}
.sb.draw{background:rgba(255,255,255,0.05);border-color:rgba(255,255,255,0.1)}
.sb.draw div:first-child{color:#94a3b8}
.sb.o{background:rgba(99,102,241,0.15);border-color:rgba(99,102,241,0.3)}
.sb.o div:first-child{color:#818cf8}
.mode{display:flex;gap:8px}
.mbtn{padding:8px 20px;border-radius:20px;border:1px solid rgba(255,255,255,0.1);background:none;color:#94a3b8;cursor:pointer;font-size:0.85rem;transition:all 0.2s}
.mbtn.active{background:rgba(99,102,241,0.2);border-color:rgba(99,102,241,0.5);color:#818cf8}
.status{font-size:1rem;color:#94a3b8;letter-spacing:1px}
.board{display:grid;grid-template-columns:repeat(3,1fr);gap:8px}
.cell{width:100px;height:100px;border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:3rem;font-weight:900;cursor:pointer;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.07);transition:all 0.2s}
.cell:hover:not(.taken){background:rgba(255,255,255,0.09);transform:scale(1.04)}
.cell.x{color:#ef4444;text-shadow:0 0 20px rgba(239,68,68,0.5)}
.cell.o{color:#6366f1;text-shadow:0 0 20px rgba(99,102,241,0.5)}
.cell.win{background:rgba(34,197,94,0.15);border-color:rgba(34,197,94,0.4)}
.btn{padding:12px 32px;border-radius:12px;border:none;background:linear-gradient(135deg,#6366f1,#8b5cf6);color:white;font-weight:700;cursor:pointer;font-size:0.9rem;transition:all 0.2s}
.btn:hover{transform:scale(1.04)}`,

    'app.js': `var board,cur,done,mode=1,sx=0,so=0,sd=0;var WIN=[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];function setMode(m){mode=m;document.getElementById('m1').className='mbtn'+(m===1?' active':'');document.getElementById('m2').className='mbtn'+(m===2?' active':'');reset();}function reset(){board=Array(9).fill('');cur='X';done=false;document.getElementById('status').textContent='X\'in sırası';render();}function check(){for(var i=0;i<WIN.length;i++){var w=WIN[i];if(board[w[0]]&&board[w[0]]===board[w[1]]&&board[w[1]]===board[w[2]])return{winner:board[w[0]],line:w};}if(board.every(function(v){return v;}))return{winner:'DRAW',line:[]};return null;}function click(i){if(done||board[i])return;board[i]=cur;var r=check();if(r){end(r);return;}cur=cur==='X'?'O':'X';document.getElementById('status').textContent=cur+'\'in sırası';render();if(mode===2&&cur==='O'&&!done)setTimeout(aiMove,300);}function aiMove(){var empty=board.map(function(_,i){return i;}).filter(function(i){return!board[i];});if(!empty.length)return;var best=null;for(var i=0;i<empty.length;i++){board[empty[i]]='O';if(check()){{best=empty[i];board[empty[i]]='';break;}}board[empty[i]]='';}if(best===null){for(var i=0;i<empty.length;i++){board[empty[i]]='X';if(check()){best=empty[i];board[empty[i]]='';break;}board[empty[i]]='';}};if(best===null)best=empty.includes(4)?4:empty[0];board[best]='O';var r=check();if(r){end(r);return;}cur='X';document.getElementById('status').textContent='X\'in sırası';render();}function end(r){done=true;if(r.winner==='DRAW'){sd++;document.getElementById('sd').textContent=sd;document.getElementById('status').textContent='BERABERE!';}else{if(r.winner==='X'){sx++;document.getElementById('sx').textContent=sx;}else{so++;document.getElementById('so').textContent=so;}document.getElementById('status').textContent=r.winner+' KAZANDI! 🎉';}render(r.line);}function render(winLine){var b=document.getElementById('board');b.innerHTML='';board.forEach(function(v,i){var d=document.createElement('div');d.className='cell'+(v?' '+v.toLowerCase()+' taken':'')+(winLine&&winLine.includes(i)?' win':'');d.textContent=v;(function(idx){d.addEventListener('click',function(){click(idx);});})(i);b.appendChild(d);});}reset();`
  }
},

// ============================================================
// 🏓 PONG
// ============================================================
pong: {
  keywords: ['pong', 'pinpon', 'ping pong', 'paddle'],
  projectName: 'pong',
  files: {
    'index.html': `<!DOCTYPE html><html lang="tr"><head><meta charset="UTF-8"><title>Pong</title><link rel="stylesheet" href="style.css"></head>
<body><div class="app">
<h1>🏓 PONG</h1>
<div class="info">W/S — Sol &nbsp;|&nbsp; ↑/↓ — Sağ &nbsp;|&nbsp; Space — Başlat</div>
<canvas id="cv" width="700" height="450"></canvas>
<div class="ov hidden" id="ov"><div class="ob"><h2 id="ot">PONG</h2><p>Space ile başlat</p></div></div>
</div><script src="app.js"></script></body></html>`,

    'style.css': `*{box-sizing:border-box;margin:0;padding:0}body{background:#000;color:#fff;font-family:'Orbitron','Segoe UI',monospace;display:flex;align-items:center;justify-content:center;min-height:100vh}
.app{display:flex;flex-direction:column;align-items:center;gap:12px}
h1{font-size:1.8rem;letter-spacing:6px;opacity:0.8}
.info{font-size:0.7rem;letter-spacing:2px;color:rgba(255,255,255,0.4)}
#cv{border:1px solid rgba(255,255,255,0.1);display:block}
.ov{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;background:rgba(0,0,0,0.7);z-index:10}
.ov.hidden{display:none}
.ob{text-align:center}.ob h2{font-size:2.5rem;letter-spacing:4px;margin-bottom:8px}.ob p{color:rgba(255,255,255,0.5);letter-spacing:2px}`,

    'app.js': `var W=700,H=450,PW=12,PH=80,BALL=10,SPD=5;var cv=document.getElementById('cv'),cx=cv.getContext('2d');var p1,p2,ball,s1,s2,running,animId;var keys={};function init(){p1={x:20,y:H/2-PH/2};p2={x:W-20-PW,y:H/2-PH/2};ball={x:W/2,y:H/2,vx:SPD*(Math.random()>0.5?1:-1),vy:SPD*(Math.random()>0.5?1:-1)};s1=0;s2=0;}function draw(){cx.fillStyle='#000';cx.fillRect(0,0,W,H);cx.setLineDash([8,12]);cx.strokeStyle='rgba(255,255,255,0.15)';cx.lineWidth=2;cx.beginPath();cx.moveTo(W/2,0);cx.lineTo(W/2,H);cx.stroke();cx.setLineDash([]);cx.fillStyle='rgba(255,255,255,0.9)';cx.fillRect(p1.x,p1.y,PW,PH);cx.fillRect(p2.x,p2.y,PW,PH);cx.beginPath();cx.arc(ball.x,ball.y,BALL,0,Math.PI*2);cx.fill();cx.font='bold 48px monospace';cx.textAlign='right';cx.fillText(s1,W/2-30,60);cx.textAlign='left';cx.fillText(s2,W/2+30,60);}function update(){if(keys['w']&&p1.y>0)p1.y-=6;if(keys['s']&&p1.y<H-PH)p1.y+=6;if(keys['ArrowUp']&&p2.y>0)p2.y-=6;if(keys['ArrowDown']&&p2.y<H-PH)p2.y+=6;ball.x+=ball.vx;ball.y+=ball.vy;if(ball.y-BALL<0){ball.y=BALL;ball.vy*=-1;}if(ball.y+BALL>H){ball.y=H-BALL;ball.vy*=-1;}if(ball.x-BALL<p1.x+PW&&ball.y>p1.y&&ball.y<p1.y+PH&&ball.vx<0){ball.vx*=-1.05;ball.vy+=(ball.y-(p1.y+PH/2))*0.1;}if(ball.x+BALL>p2.x&&ball.y>p2.y&&ball.y<p2.y+PH&&ball.vx>0){ball.vx*=-1.05;ball.vy+=(ball.y-(p2.y+PH/2))*0.1;}ball.vx=Math.max(-12,Math.min(12,ball.vx));ball.vy=Math.max(-10,Math.min(10,ball.vy));if(ball.x<0){s2++;reset();}if(ball.x>W){s1++;reset();}}function reset(){ball={x:W/2,y:H/2,vx:SPD*(Math.random()>0.5?1:-1),vy:SPD*(Math.random()>0.5?1:-1)};}function loop(){if(!running)return;update();draw();animId=requestAnimationFrame(loop);}function start(){running=true;if(animId)cancelAnimationFrame(animId);animId=requestAnimationFrame(loop);}document.addEventListener('keydown',function(e){keys[e.key]=true;if(e.code==='Space'){e.preventDefault();start();}});document.addEventListener('keyup',function(e){keys[e.key]=false;});init();draw();`
  }
},

// ============================================================
// 🔑 PASSWORD GENERATOR
// ============================================================
passwordgenerator: {
  keywords: ['password', 'şifre', 'sifre', 'generator', 'üretici', 'uretici'],
  projectName: 'password-generator',
  files: {
    'index.html': `<!DOCTYPE html><html lang="tr"><head><meta charset="UTF-8"><title>Password Generator</title><link rel="stylesheet" href="style.css"></head>
<body><div class="app">
<h1>🔑 Şifre Üretici</h1>
<div class="output-box">
<input type="text" id="pwd" readonly placeholder="Şifre burada görünecek...">
<button class="copy-btn" id="copy" onclick="copyPwd()">📋</button>
</div>
<div class="strength-bar"><div id="sbar"></div></div>
<div class="strength-label" id="slabel">—</div>
<div class="controls">
<div class="ctrl-row"><label>Uzunluk: <b id="lenval">16</b></label><input type="range" id="len" min="8" max="64" value="16" oninput="document.getElementById('lenval').textContent=this.value;generate()"></div>
<div class="checks">
<label class="chk"><input type="checkbox" id="up" checked onchange="generate()"> Büyük Harf (A-Z)</label>
<label class="chk"><input type="checkbox" id="lo" checked onchange="generate()"> Küçük Harf (a-z)</label>
<label class="chk"><input type="checkbox" id="nu" checked onchange="generate()"> Rakam (0-9)</label>
<label class="chk"><input type="checkbox" id="sy" checked onchange="generate()"> Sembol (!@#$)</label>
</div>
</div>
<button class="btn" onclick="generate()">🔄 YENİ ŞİFRE ÜRET</button>
<div class="notice" id="notice"></div>
</div><script src="app.js"></script></body></html>`,

    'style.css': `*{box-sizing:border-box;margin:0;padding:0}body{background:#0f172a;color:#e2e8f0;font-family:'Segoe UI',sans-serif;display:flex;align-items:center;justify-content:center;min-height:100vh}
.app{display:flex;flex-direction:column;align-items:center;gap:20px;padding:32px;background:#1e293b;border-radius:20px;width:100%;max-width:480px;box-shadow:0 16px 48px rgba(0,0,0,0.4)}
h1{font-size:1.6rem;font-weight:700}
.output-box{display:flex;width:100%;gap:8px}
#pwd{flex:1;background:#0f172a;border:1px solid rgba(255,255,255,0.1);border-radius:10px;padding:14px 16px;color:#22c55e;font-family:'Courier New',monospace;font-size:1rem;letter-spacing:1px}
.copy-btn{width:48px;border-radius:10px;border:1px solid rgba(255,255,255,0.1);background:rgba(255,255,255,0.06);font-size:1.2rem;cursor:pointer;transition:all 0.2s}
.copy-btn:hover{background:rgba(34,197,94,0.2)}
.strength-bar{width:100%;height:6px;background:rgba(255,255,255,0.08);border-radius:4px;overflow:hidden}
#sbar{height:100%;width:0%;border-radius:4px;transition:all 0.3s}
.strength-label{font-size:0.8rem;color:#64748b}
.controls{width:100%;display:flex;flex-direction:column;gap:16px}
.ctrl-row{display:flex;justify-content:space-between;align-items:center;font-size:0.9rem}
input[type=range]{width:200px;accent-color:#6366f1}
.checks{display:flex;flex-direction:column;gap:8px}
.chk{display:flex;align-items:center;gap:10px;font-size:0.9rem;cursor:pointer;color:#94a3b8}
.chk:hover{color:#e2e8f0}
.chk input{width:16px;height:16px;accent-color:#6366f1;cursor:pointer}
.btn{width:100%;padding:14px;border-radius:12px;border:none;background:linear-gradient(135deg,#6366f1,#8b5cf6);color:white;font-weight:700;cursor:pointer;font-size:0.95rem;letter-spacing:1px;transition:all 0.2s}
.btn:hover{transform:scale(1.02);box-shadow:0 0 24px rgba(99,102,241,0.4)}
.notice{font-size:0.8rem;color:#22c55e;height:16px}`,

    'app.js': `function generate(){var up=document.getElementById('up').checked;var lo=document.getElementById('lo').checked;var nu=document.getElementById('nu').checked;var sy=document.getElementById('sy').checked;var len=parseInt(document.getElementById('len').value);var chars='';if(up)chars+='ABCDEFGHIJKLMNOPQRSTUVWXYZ';if(lo)chars+='abcdefghijklmnopqrstuvwxyz';if(nu)chars+='0123456789';if(sy)chars+='!@#$%^&*()_+-=[]{}|;:,.<>?';if(!chars){document.getElementById('pwd').value='En az bir seçenek seç!';return;}var pwd='';for(var i=0;i<len;i++)pwd+=chars[Math.floor(Math.random()*chars.length)];document.getElementById('pwd').value=pwd;calcStrength(pwd,up,lo,nu,sy);}function calcStrength(pwd,up,lo,nu,sy){var opts=[up,lo,nu,sy].filter(Boolean).length;var sc=0;if(pwd.length>=12)sc++;if(pwd.length>=20)sc++;if(opts>=3)sc++;if(opts===4)sc++;var colors=['#ef4444','#f97316','#eab308','#22c55e'];var labels=['Zayıf','Orta','Güçlü','Çok Güçlü'];var bar=document.getElementById('sbar');bar.style.width=((sc+1)*25)+'%';bar.style.background=colors[sc];document.getElementById('slabel').textContent=labels[sc];}function copyPwd(){var v=document.getElementById('pwd').value;if(!v||v.includes('seç'))return;navigator.clipboard.writeText(v).then(function(){document.getElementById('notice').textContent='✅ Panoya kopyalandı!';setTimeout(function(){document.getElementById('notice').textContent='';},2000);});}generate();`
  }
},

// ============================================================
// 🎨 COLOR PICKER
// ============================================================
colorpicker: {
  keywords: ['color', 'colour', 'renk', 'picker', 'palet', 'palette'],
  projectName: 'color-picker',
  files: {
    'index.html': `<!DOCTYPE html><html lang="tr"><head><meta charset="UTF-8"><title>Color Picker</title><link rel="stylesheet" href="style.css"></head>
<body><div class="app">
<h1>🎨 Color Picker</h1>
<div class="preview" id="preview"></div>
<div class="sliders">
<div class="sl-row"><label>Hue <b id="hv">200</b>°</label><input type="range" id="hue" min="0" max="360" value="200" class="sl hue-sl"></div>
<div class="sl-row"><label>Saturation <b id="sv">70</b>%</label><input type="range" id="sat" min="0" max="100" value="70" class="sl"></div>
<div class="sl-row"><label>Lightness <b id="lv">50</b>%</label><input type="range" id="lig" min="0" max="100" value="50" class="sl"></div>
<div class="sl-row"><label>Alpha <b id="av">100</b>%</label><input type="range" id="alp" min="0" max="100" value="100" class="sl"></div>
</div>
<div class="outputs">
<div class="out-box"><div class="out-label">HEX</div><input type="text" id="hex" readonly><button onclick="cp('hex')">📋</button></div>
<div class="out-box"><div class="out-label">RGB</div><input type="text" id="rgb" readonly><button onclick="cp('rgb')">📋</button></div>
<div class="out-box"><div class="out-label">HSL</div><input type="text" id="hsl" readonly><button onclick="cp('hsl')">📋</button></div>
</div>
<div class="palette" id="palette"></div>
<div class="notice" id="notice"></div>
</div><script src="app.js"></script></body></html>`,

    'style.css': `*{box-sizing:border-box;margin:0;padding:0}body{background:#111827;color:#e2e8f0;font-family:'Segoe UI',sans-serif;display:flex;align-items:center;justify-content:center;min-height:100vh;padding:16px}
.app{display:flex;flex-direction:column;align-items:center;gap:20px;padding:28px;background:#1f2937;border-radius:20px;width:100%;max-width:420px;box-shadow:0 16px 48px rgba(0,0,0,0.4)}
h1{font-size:1.5rem;font-weight:700}
.preview{width:100%;height:100px;border-radius:14px;border:2px solid rgba(255,255,255,0.08);transition:background 0.1s;cursor:pointer}
.sliders{width:100%;display:flex;flex-direction:column;gap:12px}
.sl-row{display:flex;justify-content:space-between;align-items:center;gap:12px;font-size:0.85rem;color:#94a3b8}
.sl-row label{min-width:140px}
.sl-row b{color:#e2e8f0}
.sl{width:180px;height:8px;border-radius:4px;cursor:pointer}
.hue-sl{background:linear-gradient(to right,hsl(0,100%,50%),hsl(60,100%,50%),hsl(120,100%,50%),hsl(180,100%,50%),hsl(240,100%,50%),hsl(300,100%,50%),hsl(360,100%,50%))}
.outputs{width:100%;display:flex;flex-direction:column;gap:8px}
.out-box{display:flex;align-items:center;gap:8px;background:#111827;border-radius:10px;padding:8px 12px}
.out-label{font-size:0.65rem;letter-spacing:2px;color:#6366f1;min-width:30px;font-weight:700}
.out-box input{flex:1;background:none;border:none;color:#e2e8f0;font-family:'Courier New',monospace;font-size:0.85rem}
.out-box button{background:none;border:none;cursor:pointer;font-size:1rem;opacity:0.6;transition:opacity 0.2s}
.out-box button:hover{opacity:1}
.palette{display:flex;gap:8px;flex-wrap:wrap;justify-content:center}
.pswatch{width:36px;height:36px;border-radius:50%;cursor:pointer;border:2px solid rgba(255,255,255,0.1);transition:transform 0.2s}
.pswatch:hover{transform:scale(1.2)}
.notice{font-size:0.8rem;color:#22c55e;height:16px}`,

    'app.js': `function hslToHex(h,s,l,a){s/=100;l/=100;var c=(1-Math.abs(2*l-1))*s,x=c*(1-Math.abs((h/60)%2-1)),m=l-c/2,r=0,g=0,b=0;if(h<60){r=c;g=x;}else if(h<120){r=x;g=c;}else if(h<180){g=c;b=x;}else if(h<240){g=x;b=c;}else if(h<300){r=x;b=c;}else{r=c;b=x;}r=Math.round((r+m)*255);g=Math.round((g+m)*255);b=Math.round((b+m)*255);var hex=function(n){return n.toString(16).padStart(2,'0');};return '#'+hex(r)+hex(g)+hex(b)+(a<100?hex(Math.round(a*2.55)):'');}function update(){var h=parseInt(document.getElementById('hue').value);var s=parseInt(document.getElementById('sat').value);var l=parseInt(document.getElementById('lig').value);var a=parseInt(document.getElementById('alp').value);document.getElementById('hv').textContent=h;document.getElementById('sv').textContent=s;document.getElementById('lv').textContent=l;document.getElementById('av').textContent=a;var hslStr='hsl('+h+','+s+'%,'+l+'%,'+(a/100)+')';document.getElementById('preview').style.background=hslStr;document.getElementById('hsl').value='hsl('+h+', '+s+'%, '+l+'%)';document.getElementById('hex').value=hslToHex(h,s,l,a);var r2=hslToHex(h,s,l,100);var rv=parseInt(r2.slice(1,3),16),gv=parseInt(r2.slice(3,5),16),bv=parseInt(r2.slice(5,7),16);document.getElementById('rgb').value='rgb('+rv+', '+gv+', '+bv+')';}function cp(id){var v=document.getElementById(id).value;navigator.clipboard.writeText(v);document.getElementById('notice').textContent='Kopyalandı: '+v;setTimeout(function(){document.getElementById('notice').textContent='';},2000);}document.querySelectorAll('input[type=range]').forEach(function(el){el.addEventListener('input',update);});var swatches=['#ef4444','#f97316','#f59e0b','#22c55e','#06b6d4','#6366f1','#a855f7','#ec4899','#ffffff','#64748b','#1e293b','#000000'];var pal=document.getElementById('palette');swatches.forEach(function(c){var d=document.createElement('div');d.className='pswatch';d.style.background=c;d.title=c;d.addEventListener('click',function(){document.getElementById('hex').value=c;document.getElementById('notice').textContent='Kopyalandı: '+c;navigator.clipboard.writeText(c);setTimeout(function(){document.getElementById('notice').textContent='';},2000);});pal.appendChild(d);});update();`
  }
},

// ============================================================
// 📝 JSON FORMATTER
// ============================================================
jsonformatter: {
  keywords: ['json', 'formatter', 'format', 'pretty print', 'json viewer'],
  projectName: 'json-formatter',
  files: {
    'index.html': `<!DOCTYPE html><html lang="tr"><head><meta charset="UTF-8"><title>JSON Formatter</title><link rel="stylesheet" href="style.css"></head>
<body><div class="app">
<h1>{ } JSON Formatter</h1>
<div class="editor">
<div class="panel-box"><div class="panel-hdr"><span>INPUT</span><button class="sm-btn" onclick="clearInput()">Clear</button></div><textarea id="inp" placeholder='{"key": "value", "arr": [1,2,3]}'></textarea></div>
<div class="panel-box"><div class="panel-hdr"><span>OUTPUT</span><button class="sm-btn" onclick="copy()">Copy</button></div><pre id="out" class="out"></pre></div>
</div>
<div class="btns">
<button class="btn" onclick="format()">✨ Formatla</button>
<button class="btn sec" onclick="minify()">🗜 Minify</button>
<button class="btn sec" onclick="validate()">✅ Doğrula</button>
</div>
<div class="status" id="status"></div>
</div><script src="app.js"></script></body></html>`,

    'style.css': `*{box-sizing:border-box;margin:0;padding:0}body{background:#0d1117;color:#c9d1d9;font-family:'Segoe UI',sans-serif;display:flex;align-items:flex-start;justify-content:center;min-height:100vh;padding:24px}
.app{display:flex;flex-direction:column;gap:16px;width:100%;max-width:1000px}
h1{font-size:1.5rem;font-weight:700;color:#58a6ff;letter-spacing:2px}
.editor{display:grid;grid-template-columns:1fr 1fr;gap:16px}
.panel-box{display:flex;flex-direction:column;gap:6px}
.panel-hdr{display:flex;justify-content:space-between;align-items:center;font-size:0.75rem;letter-spacing:2px;color:#8b949e}
.sm-btn{background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.1);border-radius:6px;padding:4px 10px;color:#c9d1d9;cursor:pointer;font-size:0.75rem;transition:all 0.2s}
.sm-btn:hover{background:rgba(255,255,255,0.12)}
textarea,pre{background:#161b22;border:1px solid rgba(255,255,255,0.08);border-radius:10px;padding:14px;font-family:'Courier New',monospace;font-size:0.85rem;min-height:400px;resize:vertical;color:#c9d1d9;outline:none;overflow:auto;white-space:pre-wrap;word-break:break-all}
textarea:focus{border-color:rgba(88,166,255,0.4)}
.out{color:#a5f3fc}
.btns{display:flex;gap:10px}
.btn{padding:10px 24px;border-radius:10px;border:none;background:#238636;color:white;font-weight:600;cursor:pointer;font-size:0.9rem;transition:all 0.2s}
.btn.sec{background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.12);color:#c9d1d9}
.btn:hover{transform:scale(1.03)}
.status{font-size:0.85rem;min-height:20px}
.ok{color:#22c55e}.err{color:#f87171}`,

    'app.js': `function format(){try{var v=JSON.parse(document.getElementById('inp').value);document.getElementById('out').textContent=JSON.stringify(v,null,2);status('✅ Geçerli JSON',true);}catch(e){status('❌ Hata: '+e.message,false);}}function minify(){try{var v=JSON.parse(document.getElementById('inp').value);document.getElementById('out').textContent=JSON.stringify(v);status('✅ Minified',true);}catch(e){status('❌ Hata: '+e.message,false);}}function validate(){try{JSON.parse(document.getElementById('inp').value);status('✅ JSON geçerli!',true);}catch(e){status('❌ Geçersiz JSON: '+e.message,false);}}function copy(){var t=document.getElementById('out').textContent;if(!t)return;navigator.clipboard.writeText(t).then(function(){status('📋 Kopyalandı!',true);setTimeout(function(){document.getElementById('status').textContent='';},2000);});}function clearInput(){document.getElementById('inp').value='';document.getElementById('out').textContent='';document.getElementById('status').textContent='';}function status(msg,ok){var el=document.getElementById('status');el.textContent=msg;el.className='status '+(ok?'ok':'err');}`
  }
},

// ============================================================
// 🎨 DRAWING APP
// ============================================================
drawingapp: {
  keywords: ['drawing', 'draw', 'çiz', 'paint', 'boya', 'canvas draw', 'resim'],
  projectName: 'drawing-app',
  files: {
    'index.html': `<!DOCTYPE html><html lang="tr"><head><meta charset="UTF-8"><title>Drawing App</title><link rel="stylesheet" href="style.css"></head>
<body><div class="app">
<div class="toolbar">
<div class="tools">
<button class="tool active" id="t-pen" onclick="setTool('pen')" title="Kalem">✏️</button>
<button class="tool" id="t-eraser" onclick="setTool('eraser')" title="Silgi">🔲</button>
<button class="tool" id="t-fill" onclick="setTool('fill')" title="Doldur">🪣</button>
<button class="tool" id="t-line" onclick="setTool('line')" title="Çizgi">📏</button>
</div>
<div class="sep"></div>
<div class="colors" id="colors"></div>
<input type="color" id="custom-color" value="#6366f1" onchange="setColor(this.value)" title="Özel renk">
<div class="sep"></div>
<label class="size-lbl">Boyut: <b id="sval">8</b><input type="range" id="sz" min="1" max="40" value="8" oninput="document.getElementById('sval').textContent=this.value"></label>
<div class="sep"></div>
<button class="act-btn" onclick="clearCanvas()">🗑 Temizle</button>
<button class="act-btn" onclick="download()">💾 İndir</button>
</div>
<canvas id="cv"></canvas>
</div><script src="app.js"></script></body></html>`,

    'style.css': `*{box-sizing:border-box;margin:0;padding:0}body{background:#1a1a2e;display:flex;align-items:center;justify-content:center;min-height:100vh;overflow:hidden}
.app{display:flex;flex-direction:column;gap:0;width:100vw;height:100vh}
.toolbar{display:flex;align-items:center;gap:12px;padding:10px 16px;background:#16213e;border-bottom:1px solid rgba(255,255,255,0.08);flex-wrap:wrap}
.tools{display:flex;gap:6px}
.tool{width:36px;height:36px;border-radius:8px;border:1px solid rgba(255,255,255,0.08);background:rgba(255,255,255,0.04);font-size:1rem;cursor:pointer;transition:all 0.15s}
.tool:hover,.tool.active{background:rgba(99,102,241,0.3);border-color:rgba(99,102,241,0.6)}
.sep{width:1px;height:32px;background:rgba(255,255,255,0.08)}
.colors{display:flex;gap:6px}
.cswatch{width:28px;height:28px;border-radius:50%;cursor:pointer;border:2px solid rgba(255,255,255,0.1);transition:transform 0.15s}
.cswatch:hover{transform:scale(1.2)}
.cswatch.active{border-color:white;transform:scale(1.15)}
#custom-color{width:32px;height:32px;border-radius:8px;border:1px solid rgba(255,255,255,0.08);cursor:pointer;background:none;padding:2px}
.size-lbl{color:#94a3b8;font-size:0.8rem;display:flex;align-items:center;gap:8px}
.size-lbl b{color:#e2e8f0;min-width:20px}
.size-lbl input{width:80px;accent-color:#6366f1}
.act-btn{padding:7px 14px;border-radius:8px;border:1px solid rgba(255,255,255,0.08);background:rgba(255,255,255,0.06);color:#e2e8f0;font-size:0.8rem;cursor:pointer;transition:all 0.2s}
.act-btn:hover{background:rgba(255,255,255,0.12)}
#cv{flex:1;cursor:crosshair;display:block;background:white}`,

    'app.js': `var cv=document.getElementById('cv');var cx=cv.getContext('2d');var tool='pen',color='#6366f1',drawing=false,lx,ly;var COLORS=['#ef4444','#f97316','#f59e0b','#22c55e','#06b6d4','#6366f1','#a855f7','#ec4899','#000000','#ffffff','#64748b'];
function resize(){cv.width=cv.offsetWidth;cv.height=cv.offsetHeight;}function setTool(t){tool=t;document.querySelectorAll('.tool').forEach(function(el){el.classList.remove('active');});var btn=document.getElementById('t-'+t);if(btn)btn.classList.add('active');cv.style.cursor=t==='fill'?'crosshair':t==='eraser'?'cell':'crosshair';}function setColor(c){color=c;document.querySelectorAll('.cswatch').forEach(function(el){el.classList.toggle('active',el.style.background===c||el.getAttribute('data-c')===c);});}function pos(e){var r=cv.getBoundingClientRect();var x=((e.clientX||e.touches[0].clientX)-r.left);var y=((e.clientY||e.touches[0].clientY)-r.top);return[x,y];}function flood(x,y,nc){var img=cx.getImageData(0,0,cv.width,cv.height);var d=img.data;var w=cv.width,h=cv.height;var i=(Math.floor(y)*w+Math.floor(x))*4;var tr=d[i],tg=d[i+1],tb=d[i+2],ta=d[i+3];var nr=parseInt(nc.slice(1,3),16),ng=parseInt(nc.slice(3,5),16),nb2=parseInt(nc.slice(5,7),16);if(tr===nr&&tg===ng&&tb===nb2&&ta===255)return;var stack=[[Math.floor(x),Math.floor(y)]];while(stack.length){var p=stack.pop();var pi=(p[1]*w+p[0])*4;if(p[0]<0||p[0]>=w||p[1]<0||p[1]>=h)continue;if(d[pi]!==tr||d[pi+1]!==tg||d[pi+2]!==tb||d[pi+3]!==ta)continue;d[pi]=nr;d[pi+1]=ng;d[pi+2]=nb2;d[pi+3]=255;stack.push([p[0]+1,p[1]],[p[0]-1,p[1]],[p[0],p[1]+1],[p[0],p[1]-1]);}cx.putImageData(img,0,0);}cv.addEventListener('mousedown',function(e){drawing=true;var p=pos(e);lx=p[0];ly=p[1];if(tool==='fill'){flood(p[0],p[1],color);return;}cx.beginPath();cx.moveTo(p[0],p[1]);});cv.addEventListener('mousemove',function(e){if(!drawing||tool==='fill')return;var p=pos(e);cx.lineWidth=parseInt(document.getElementById('sz').value);cx.lineCap='round';cx.strokeStyle=tool==='eraser'?'#ffffff':color;cx.lineJoin='round';cx.lineTo(p[0],p[1]);cx.stroke();cx.beginPath();cx.moveTo(p[0],p[1]);lx=p[0];ly=p[1];});cv.addEventListener('mouseup',function(){drawing=false;cx.beginPath();});cv.addEventListener('mouseleave',function(){drawing=false;});function clearCanvas(){cx.fillStyle='white';cx.fillRect(0,0,cv.width,cv.height);}function download(){var a=document.createElement('a');a.download='drawing.png';a.href=cv.toDataURL();a.click();}var pal=document.getElementById('colors');COLORS.forEach(function(c){var d=document.createElement('div');d.className='cswatch';d.style.background=c;d.setAttribute('data-c',c);d.addEventListener('click',function(){setColor(c);document.getElementById('custom-color').value=c;});pal.appendChild(d);});pal.children[5].classList.add('active');window.addEventListener('resize',function(){var img=cx.getImageData(0,0,cv.width,cv.height);resize();cx.putImageData(img,0,0);});resize();clearCanvas();`
  }
},

// ============================================================
// 🐍 SNAKE GAME
// ============================================================
snake: {
  keywords: ['snake', 'yılan', 'yilan', 'retro game', 'classic snake'],
  projectName: 'snake-game',
  files: {
    'index.html': `<!DOCTYPE html><html><head><title>Snake Game</title><style>body{background:#000;display:flex;justify-content:center;align-items:center;height:100vh;margin:0;color:#fff;font-family:sans-serif}canvas{border:2px solid #fff}</style></head><body><canvas id="game" width="400" height="400"></canvas><script src="snake.js"></script></body></html>`,
    'snake.js': `const canvas=document.getElementById('game'),ctx=canvas.getContext('2d');let snake=[{x:10,y:10}],food={x:15,y:15},dx=0,dy=0,score=0;function draw(){ctx.fillStyle='black';ctx.fillRect(0,0,400,400);ctx.fillStyle='lime';snake.forEach(p=>ctx.fillRect(p.x*20,p.y*20,18,18));ctx.fillStyle='red';ctx.fillRect(food.x*20,food.y*20,18,18);let head={x:snake[0].x+dx,y:snake[0].y+dy};snake.unshift(head);if(head.x===food.x&&head.y===food.y){score++;food={x:Math.floor(Math.random()*20),y:Math.floor(Math.random()*20)}}else{snake.pop()}if(head.x<0||head.x>=20||head.y<0||head.y>=20){alert('Game Over! Score: '+score);snake=[{x:10,y:10}];dx=0;dy=0;score=0}}document.addEventListener('keydown',e=>{if(e.key==='ArrowUp'&&dy===0){dx=0;dy=-1}if(e.key==='ArrowDown'&&dy===0){dx=0;dy=1}if(e.key==='ArrowLeft'&&dx===0){dx=-1;dy=0}if(e.key==='ArrowRight'&&dx===0){dx=1;dy=0}});setInterval(draw,100);`
  }
}

}); // End Object.assign
