/**
 * FORGE TEMPLATE REGISTRY — BATCH 14 (131-140)
 * Chess, Sudoku, Wordle, Habit, Debt, Savings, Flashcards, Recipes, Journal, Pomodoro
 */
Object.assign(window.FORGE_TEMPLATES, {

// ============================================================
// ♟️ CHESS UI
// ============================================================
chess_ui: {
  keywords: ['chess', 'board game', 'strategy', 'multiplayer', 'satranç', 'oyun', 'tahta oyunu', 'strateji'],
  projectName: 'x-chess',
  files: {
    'index.html': `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>X-Chess</title><link rel="stylesheet" href="style.css"></head>
<body><div class="app"><div class="board">BOARD GRID</div><aside><h3>Moves</h3><div class="m">1. e4 e5</div><div class="m">2. Nf3 Nc6</div></aside></div></body></html>`,
    'style.css': `*{box-sizing:border-box;margin:0;padding:0}body{background:#312e2b;color:#fff;font-family:'Inter',sans-serif;padding:40px;display:flex;justify-content:center}
.app{display:grid;grid-template-columns:500px 200px;gap:20px}.board{aspect-ratio:1;background:#779556;display:flex;align-items:center;justify-content:center;font-weight:900;font-size:2rem}
aside{background:#262421;padding:20px;border-radius:8px}.m{padding:5px 0;opacity:0.6;font-size:0.9rem}`
  }
},

// ============================================================
// 🔢 SUDOKU GAME
// ============================================================
sudoku_game: {
  keywords: ['sudoku', 'puzzle', 'numbers', 'logic', 'game', 'akıl oyunu', 'bulmaca', 'sayılar'],
  projectName: 'x-sudoku',
  files: {
    'index.html': `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>Sudoku</title><link rel="stylesheet" href="style.css"></head>
<body><div class="app"><h1>Sudoku</h1><div class="grid">CELLS</div><div class="nums"><button>1</button><button>2</button><button>3</button></div></div></body></html>`,
    'style.css': `*{box-sizing:border-box;margin:0;padding:0}body{background:#f8fafc;color:#0f172a;font-family:'Inter',sans-serif;padding:60px;display:flex;justify-content:center}
.app{text-align:center}.grid{width:300px;height:300px;background:#fff;border:4px solid #000;margin:40px auto;display:flex;align-items:center;justify-content:center;font-weight:900}
.nums{display:flex;gap:10px;justify-content:center}button{width:40px;height:40px;background:#0f172a;color:#fff;border:none;border-radius:4px;cursor:pointer}`
  }
},

// ============================================================
// 📝 WORDLE CLONE
// ============================================================
wordle_clone: {
  keywords: ['wordle', 'word game', 'puzzle', 'daily', 'kelime oyunu', 'tahmin', 'bulmaca'],
  projectName: 'x-wordle',
  files: {
    'index.html': `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>Wordle</title><link rel="stylesheet" href="style.css"></head>
<body><div class="app"><h1>WORDLE</h1><div class="board"><div class="row"><div class="box correct">W</div><div class="box">O</div><div class="box">R</div><div class="box">D</div><div class="box">S</div></div></div></div></body></html>`,
    'style.css': `*{box-sizing:border-box;margin:0;padding:0}body{background:#121213;color:#fff;font-family:'Inter',sans-serif;padding:60px;display:flex;justify-content:center}
.app{text-align:center}h1{letter-spacing:5px;margin-bottom:60px}.row{display:flex;gap:5px;justify-content:center}
.box{width:60px;height:60px;border:2px solid #3a3a3c;display:flex;align-items:center;justify-content:center;font-size:2rem;font-weight:900}
.correct{background:#538d4e;border-color:#538d4e}`
  }
},

// ============================================================
// 📅 HABIT TRACKER
// ============================================================
habit_tracker: {
  keywords: ['habit', 'tracker', 'productivity', 'goals', 'routine', 'alışkanlık', 'takip', 'rutin', 'hedef'],
  projectName: 'x-habit',
  files: {
    'index.html': `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>Habit Tracker</title><link rel="stylesheet" href="style.css"></head>
<body><div class="app"><h1>Habit Tracker</h1><div class="list">
<div class="h"><span>Read 30 mins</span><div class="days"><div class="d c"></div><div class="d"></div><div class="d c"></div></div></div>
<div class="h"><span>Workout</span><div class="days"><div class="d"></div><div class="d c"></div><div class="d c"></div></div></div></div></div></body></html>`,
    'style.css': `*{box-sizing:border-box;margin:0;padding:0}body{background:#fff;color:#0f172a;font-family:'Inter',sans-serif;padding:60px;display:flex;justify-content:center}
.app{width:360px}h1{margin-bottom:40px}.h{display:flex;justify-content:space-between;align-items:center;padding:20px 0;border-bottom:1px solid #eee}
.days{display:flex;gap:5px}.d{width:20px;height:20px;background:#f1f5f9;border-radius:4px}.d.c{background:#22c55e}`
  }
},

// ============================================================
// 💸 DEBT TRACKER
// ============================================================
debt_tracker: {
  keywords: ['debt', 'finance', 'money', 'bills', 'tracking', 'borç takip', 'finans', 'para', 'ödemeler'],
  projectName: 'debt-zero',
  files: {
    'index.html': `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>DebtZero</title><link rel="stylesheet" href="style.css"></head>
<body><div class="app"><h1>DebtZero</h1><div class="total">Total Debt: <b>$12,450</b></div>
<div class="debts"><div class="d"><span>Credit Card</span><b>$4,200</b><div class="p"><div style="width:30%"></div></div></div></div></div></body></html>`,
    'style.css': `*{box-sizing:border-box;margin:0;padding:0}body{background:#fef2f2;color:#991b1b;font-family:'Inter',sans-serif;padding:60px;display:flex;justify-content:center}
.app{width:360px}.total{background:#fff;padding:30px;border-radius:24px;text-align:center;margin-bottom:40px;border:1px solid #fecaca}
.d{background:#fff;padding:20px;border-radius:16px;margin-bottom:15px;border:1px solid #fecaca}.p{height:6px;background:#f1f5f9;border-radius:10px;margin-top:10px;overflow:hidden}.p div{height:100%;background:#ef4444}`
  }
},

// ============================================================
// 🎯 SAVINGS GOAL TRACKER
// ============================================================
savings_goal: {
  keywords: ['savings', 'goal', 'money', 'finance', 'piggy bank', 'birikim', 'hedef', 'para', 'tasarruf'],
  projectName: 'x-savings',
  files: {
    'index.html': `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>Savings</title><link rel="stylesheet" href="style.css"></head>
<body><div class="app"><h1>New Car Goal</h1><div class="circle"><span>65%</span></div>
<div class="stats"><p>Saved: $13,000</p><p>Goal: $20,000</p></div><button>Add Savings</button></div></body></html>`,
    'style.css': `*{box-sizing:border-box;margin:0;padding:0}body{background:#f0fdf4;color:#166534;font-family:'Inter',sans-serif;padding:60px;display:flex;justify-content:center}
.app{width:320px;text-align:center}.circle{width:150px;height:150px;border:10px solid #bbf7d0;border-radius:50%;margin:40px auto;display:flex;align-items:center;justify-content:center;font-size:2rem;font-weight:900}
.stats{margin-bottom:40px}button{width:100%;padding:15px;background:#166534;color:#fff;border:none;border-radius:12px;font-weight:700;cursor:pointer}`
  }
},

// ============================================================
// 🧠 FLASHCARD STUDY TOOL
// ============================================================
flashcards_pro: {
  keywords: ['flashcards', 'study', 'education', 'learning', 'anki', 'hafıza kartları', 'ders çalışma', 'eğitim'],
  projectName: 'x-cards',
  files: {
    'index.html': `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>X-Cards</title><link rel="stylesheet" href="style.css"></head>
<body><div class="app"><div class="card"><h1>Photosynthesis</h1><p>(Click to flip)</p></div>
<div class="controls"><button>Previous</button><span>1 / 20</span><button>Next</button></div></div></body></html>`,
    'style.css': `*{box-sizing:border-box;margin:0;padding:0}body{background:#fdfaff;color:#4338ca;font-family:'Inter',sans-serif;padding:80px;display:flex;justify-content:center}
.app{width:360px;text-align:center}.card{height:240px;background:#fff;border-radius:24px;border:2px solid #e0e7ff;display:flex;flex-direction:column;align-items:center;justify-content:center;margin-bottom:40px;cursor:pointer}
h1{font-size:1.5rem;margin-bottom:10px}p{font-size:0.8rem;opacity:0.5}.controls{display:flex;justify-content:space-between;align-items:center}
button{background:#4338ca;color:#fff;border:none;padding:10px 20px;border-radius:8px;cursor:pointer}`
  }
},

// ============================================================
// 🍳 RECIPE BOOK (ADVANCED)
// ============================================================
recipe_book: {
  keywords: ['recipes', 'cooking', 'food', 'chef', 'ingredients', 'yemek kitabı', 'tarifler', 'mutfak'],
  projectName: 'x-chef',
  files: {
    'index.html': `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>X-Chef</title><link rel="stylesheet" href="style.css"></head>
<body><div class="app"><aside><h2>X-Chef</h2><div class="m">Breakfast</div><div class="m">Dinner</div></aside>
<main><h1>Creamy Pasta</h1><div class="grid"><div class="ing"><h3>Ingredients</h3><ul><li>Pasta</li><li>Cream</li></ul></div>
<div class="steps"><h3>Instructions</h3><p>Boil, mix, serve.</p></div></div></main></div></body></html>`,
    'style.css': `*{box-sizing:border-box;margin:0;padding:0}body{background:#fff;color:#0f172a;font-family:'Inter',sans-serif}
.app{display:grid;grid-template-columns:200px 1fr;height:100vh}aside{background:#f8fafc;padding:30px;border-right:1px solid #e2e8f0}.m{padding:10px;opacity:0.7}
main{padding:40px}.grid{display:grid;grid-template-columns:1fr 1fr;gap:40px;margin-top:30px}h1{font-size:2rem}`
  }
},

// ============================================================
// 📔 JOURNAL / DIARY
// ============================================================
journal_app: {
  keywords: ['journal', 'diary', 'writing', 'notes', 'mood', 'günlük', 'ajanda', 'notlar', 'ruh hali'],
  projectName: 'x-journal',
  files: {
    'index.html': `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>X-Journal</title><link rel="stylesheet" href="style.css"></head>
<body><div class="app"><header><span>April 24, 2026</span><div class="mood">Mood: 😊</div></header>
<textarea placeholder="Write your thoughts..."></textarea><button>Save Entry</button></div></body></html>`,
    'style.css': `*{box-sizing:border-box;margin:0;padding:0}body{background:#fafaf9;color:#44403c;font-family:'Inter',sans-serif;padding:60px;display:flex;justify-content:center}
.app{width:100%;max-width:500px}header{display:flex;justify-content:space-between;margin-bottom:30px;font-weight:700}
textarea{width:100%;height:300px;background:#fff;border:1px solid #e7e5e4;border-radius:12px;padding:30px;font-size:1.1rem;resize:none;outline:none}
button{width:100%;margin-top:20px;padding:15px;background:#44403c;color:#fff;border:none;border-radius:12px;font-weight:700;cursor:pointer}`
  }
},

// ============================================================
// ⏲️ POMODORO TIMER
// ============================================================
pomodoro_timer: {
  keywords: ['pomodoro', 'timer', 'focus', 'productivity', 'zamanlayıcı', 'odaklanma', 'verimlilik'],
  projectName: 'x-focus',
  files: {
    'index.html': `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>X-Focus</title><link rel="stylesheet" href="style.css"></head>
<body><div class="app"><div class="modes"><button class="active">Pomodoro</button><button>Break</button></div>
<div class="timer">25:00</div><button class="start">START</button></div></body></html>`,
    'style.css': `*{box-sizing:border-box;margin:0;padding:0}body{background:#ba4949;color:#fff;font-family:'Inter',sans-serif;padding:80px;display:flex;justify-content:center}
.app{width:320px;text-align:center}.modes{display:flex;justify-content:center;gap:10px;margin-bottom:60px}
.modes button{background:rgba(255,255,255,0.1);color:#fff;border:none;padding:8px 15px;border-radius:4px;cursor:pointer}
.modes button.active{background:rgba(0,0,0,0.1);font-weight:700}.timer{font-size:6rem;font-weight:900;margin-bottom:60px}
.start{width:100%;padding:15px;background:#fff;color:#ba4949;border:none;border-radius:8px;font-size:1.5rem;font-weight:900;cursor:pointer}`
  }
}

});
