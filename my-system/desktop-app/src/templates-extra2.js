/**
 * FORGE TEMPLATE REGISTRY — BATCH 2 (10 templates)
 * Portfolio, Login, Pricing, 404, Coming Soon,
 * Expense Tracker, Habit Tracker, Kanban, Flashcard, Typing Test
 */
Object.assign(window.FORGE_TEMPLATES, {

// ============================================================
// 🌐 PORTFOLIO
// ============================================================
portfolio: {
  keywords: ['portfolio', 'portfolyo', 'kisisel site', 'personal', 'hakkimda', 'about me'],
  projectName: 'portfolio',
  files: {
    'index.html': `<!DOCTYPE html><html lang="tr"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"><title>Portfolio</title><link rel="preconnect" href="https://fonts.googleapis.com"><link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700;800&display=swap" rel="stylesheet"><link rel="stylesheet" href="style.css"></head>
<body>
<nav class="nav"><div class="nav-inner"><span class="logo">⚡ Dev</span><div class="nav-links"><a href="#about">Hakkımda</a><a href="#projects">Projeler</a><a href="#skills">Beceriler</a><a href="#contact">İletişim</a></div></div></nav>
<section class="hero"><div class="hero-content"><div class="hero-badge">Merhaba, ben</div><h1 class="hero-name">Geliştirici<br><span class="accent">Adı</span></h1><p class="hero-sub">Full-Stack Geliştirici & UI/UX Tasarımcısı. Güzel, hızlı ve erişilebilir web deneyimleri yaratıyorum.</p><div class="hero-btns"><a href="#projects" class="btn-primary">Projelerimi Gör →</a><a href="#contact" class="btn-secondary">İletişim</a></div></div><div class="hero-img"><div class="avatar">👨‍💻</div></div></section>
<section class="section" id="about"><div class="container"><span class="tag">HAKKIMDA</span><h2>Kim Olduğum</h2><div class="about-grid"><div class="about-text"><p>5+ yıl deneyimli bir Full-Stack geliştiriciyim. React, Node.js, Python ve modern web teknolojileri konusunda uzmanım. Kullanıcı odaklı, performanslı uygulamalar geliştiriyorum.</p><p style="margin-top:12px">Boş zamanlarımda açık kaynak projelere katkıda bulunuyor ve yeni teknolojiler öğreniyorum.</p></div><div class="about-stats"><div class="stat-item"><span class="sn">50+</span><span class="sl">Proje</span></div><div class="stat-item"><span class="sn">5+</span><span class="sl">Yıl</span></div><div class="stat-item"><span class="sn">30+</span><span class="sl">Müşteri</span></div></div></div></div></section>
<section class="section alt" id="projects"><div class="container"><span class="tag">PROJELER</span><h2>Son Çalışmalar</h2><div class="projects-grid"><div class="project-card"><div class="p-icon">🛒</div><h3>E-Commerce Platform</h3><p>React & Node.js ile geliştirilmiş full-stack e-ticaret platformu.</p><div class="p-tags"><span>React</span><span>Node.js</span><span>MongoDB</span></div></div><div class="project-card"><div class="p-icon">📊</div><h3>Analytics Dashboard</h3><p>Gerçek zamanlı veri görselleştirme ve analitik arayüzü.</p><div class="p-tags"><span>Vue.js</span><span>D3.js</span><span>PostgreSQL</span></div></div><div class="project-card"><div class="p-icon">🤖</div><h3>AI Chat App</h3><p>GPT entegrasyonlu akıllı sohbet uygulaması.</p><div class="p-tags"><span>Python</span><span>FastAPI</span><span>OpenAI</span></div></div></div></div></section>
<section class="section" id="skills"><div class="container"><span class="tag">BECERİLER</span><h2>Teknolojiler</h2><div class="skills-grid"><div class="skill-item" style="--c:#61dafb">⚛️ React</div><div class="skill-item" style="--c:#339933">🟢 Node.js</div><div class="skill-item" style="--c:#3776ab">🐍 Python</div><div class="skill-item" style="--c:#f7df1e">🟨 JavaScript</div><div class="skill-item" style="--c:#3178c6">🔷 TypeScript</div><div class="skill-item" style="--c:#47a248">🍃 MongoDB</div><div class="skill-item" style="--c:#336791">🐘 PostgreSQL</div><div class="skill-item" style="--c:#2496ed">🐳 Docker</div></div></div></section>
<section class="section alt" id="contact"><div class="container"><span class="tag">İLETİŞİM</span><h2>Konuşalım</h2><div class="contact-box"><p>Yeni bir proje mi? Hadi konuşalım.</p><div class="contact-links"><a class="contact-btn" href="mailto:mail@example.com">📧 E-posta Gönder</a><a class="contact-btn ghost" href="https://github.com" target="_blank">🐙 GitHub</a></div></div></div></section>
<footer class="footer"><p>© 2025 Portfolio. Xeyal Forge ile yapıldı.</p></footer>
<script src="main.js"></script></body></html>`,

    'style.css': `*{box-sizing:border-box;margin:0;padding:0}:root{--bg:#020617;--surface:rgba(255,255,255,0.03);--border:rgba(255,255,255,0.07);--accent:#6366f1;--text:#f1f5f9;--muted:#94a3b8}
body{background:var(--bg);color:var(--text);font-family:'Inter',sans-serif;overflow-x:hidden;background-image:radial-gradient(ellipse 80% 40% at 50% -10%,rgba(99,102,241,0.2),transparent)}
.nav{position:fixed;top:0;left:0;right:0;z-index:100;padding:16px 24px;background:rgba(2,6,23,0.8);-webkit-backdrop-filter:blur(12px);backdrop-filter:blur(12px);border-bottom:1px solid var(--border)}
.nav-inner{max-width:1100px;margin:0 auto;display:flex;align-items:center;justify-content:space-between}
.logo{font-size:1.2rem;font-weight:700}
.nav-links{display:flex;gap:24px}.nav-links a{color:var(--muted);text-decoration:none;font-size:0.9rem;transition:color 0.2s}.nav-links a:hover{color:var(--text)}
.hero{min-height:100vh;display:flex;align-items:center;justify-content:space-between;max-width:1100px;margin:0 auto;padding:100px 24px 60px;gap:40px}
.hero-badge{color:var(--muted);font-size:0.9rem;margin-bottom:12px}
.hero-name{font-size:clamp(2.5rem,5vw,4rem);font-weight:800;line-height:1.1;letter-spacing:-2px;margin-bottom:20px}
.accent{background:linear-gradient(135deg,var(--accent),#c084fc);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
.hero-sub{color:var(--muted);font-size:1.1rem;line-height:1.7;max-width:480px;margin-bottom:28px}
.hero-btns{display:flex;gap:12px;flex-wrap:wrap}
.btn-primary,.btn-secondary{padding:13px 28px;border-radius:12px;text-decoration:none;font-weight:600;font-size:0.95rem;transition:all 0.25s}
.btn-primary{background:var(--accent);color:white;box-shadow:0 0 24px rgba(99,102,241,0.4)}.btn-primary:hover{transform:translateY(-2px);box-shadow:0 0 40px rgba(99,102,241,0.6)}
.btn-secondary{border:1px solid var(--border);background:var(--surface);color:var(--text)}.btn-secondary:hover{background:rgba(255,255,255,0.06)}
.avatar{width:200px;height:200px;border-radius:50%;background:linear-gradient(135deg,rgba(99,102,241,0.2),rgba(192,132,252,0.2));border:2px solid var(--border);display:flex;align-items:center;justify-content:center;font-size:6rem}
.section{padding:100px 24px}.section.alt{background:rgba(255,255,255,0.015)}
.container{max-width:1100px;margin:0 auto}
.tag{display:inline-block;padding:4px 14px;border-radius:100px;background:rgba(99,102,241,0.1);border:1px solid rgba(99,102,241,0.3);color:#a5b4fc;font-size:0.75rem;letter-spacing:2px;font-weight:600;margin-bottom:16px}
h2{font-size:2.2rem;font-weight:700;letter-spacing:-1px;margin-bottom:40px}
.about-grid{display:grid;grid-template-columns:2fr 1fr;gap:40px;align-items:start}
.about-text{color:var(--muted);line-height:1.8;font-size:1rem}
.about-stats{display:flex;flex-direction:column;gap:16px}
.stat-item{background:var(--surface);border:1px solid var(--border);border-radius:16px;padding:20px;text-align:center}
.sn{display:block;font-size:2rem;font-weight:700;color:var(--accent)}.sl{color:var(--muted);font-size:0.85rem}
.projects-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:20px}
.project-card{background:var(--surface);border:1px solid var(--border);border-radius:20px;padding:28px;transition:all 0.3s}
.project-card:hover{transform:translateY(-4px);border-color:rgba(99,102,241,0.4)}
.p-icon{font-size:2.5rem;margin-bottom:12px}
.project-card h3{font-size:1.1rem;font-weight:600;margin-bottom:8px}
.project-card p{color:var(--muted);font-size:0.88rem;line-height:1.6;margin-bottom:16px}
.p-tags{display:flex;gap:6px;flex-wrap:wrap}
.p-tags span{padding:3px 10px;border-radius:100px;background:rgba(99,102,241,0.1);border:1px solid rgba(99,102,241,0.2);font-size:0.72rem;color:#a5b4fc}
.skills-grid{display:flex;flex-wrap:wrap;gap:12px}
.skill-item{padding:12px 20px;border-radius:12px;background:var(--surface);border:1px solid var(--border);font-size:0.9rem;font-weight:500;transition:all 0.2s}
.skill-item:hover{border-color:var(--c,var(--accent));color:var(--c,var(--text));transform:translateY(-2px)}
.contact-box{background:var(--surface);border:1px solid var(--border);border-radius:24px;padding:48px;text-align:center;display:flex;flex-direction:column;align-items:center;gap:24px}
.contact-box p{color:var(--muted);font-size:1.1rem}
.contact-links{display:flex;gap:12px;flex-wrap:wrap;justify-content:center}
.contact-btn{padding:13px 28px;border-radius:12px;text-decoration:none;font-weight:600;font-size:0.9rem;background:var(--accent);color:white;transition:all 0.2s}
.contact-btn.ghost{background:var(--surface);border:1px solid var(--border);color:var(--text)}
.contact-btn:hover{transform:scale(1.03)}
.footer{padding:24px;text-align:center;border-top:1px solid var(--border);color:var(--muted);font-size:0.85rem}`,

    'main.js': `document.querySelectorAll('a[href^="#"]').forEach(function(a){a.addEventListener('click',function(e){e.preventDefault();var el=document.querySelector(a.getAttribute('href'));if(el)el.scrollIntoView({behavior:'smooth'});});});var nav=document.querySelector('.nav');window.addEventListener('scroll',function(){nav.style.boxShadow=window.scrollY>50?'0 8px 32px rgba(0,0,0,0.4)':'none';});`
  }
},

// ============================================================
// 🔐 LOGIN FORM
// ============================================================
loginform: {
  keywords: ['login', 'giriş', 'register', 'kayıt', 'signup', 'auth', 'authentication'],
  projectName: 'login-form',
  files: {
    'index.html': `<!DOCTYPE html><html lang="tr"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"><title>Login</title><link rel="preconnect" href="https://fonts.googleapis.com"><link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet"><link rel="stylesheet" href="style.css"></head>
<body><div class="wrapper">
<div class="card">
<div class="logo">⚡ App</div>
<div class="tabs"><button class="tab active" id="ltab" onclick="showTab('login')">Giriş Yap</button><button class="tab" id="rtab" onclick="showTab('register')">Kayıt Ol</button></div>
<form id="login-form" class="form" onsubmit="submit(event,'login')">
<h2>Tekrar Hoşgeldin</h2>
<div class="field"><label>E-posta</label><input type="email" id="l-email" placeholder="mail@ornek.com" required></div>
<div class="field"><label>Şifre <a class="forgot" href="#">Şifreni mi unuttun?</a></label><div class="inp-wrap"><input type="password" id="l-pass" placeholder="••••••••" required><button type="button" class="eye" onclick="togglePass('l-pass',this)">👁</button></div></div>
<button type="submit" class="btn-submit">Giriş Yap →</button>
<div class="divider"><span>veya</span></div>
<div class="social"><button type="button" class="social-btn" onclick="alert('Google ile giriş')">🌐 Google ile Devam Et</button><button type="button" class="social-btn" onclick="alert('GitHub ile giriş')">🐙 GitHub ile Devam Et</button></div>
</form>
<form id="register-form" class="form hidden" onsubmit="submit(event,'register')">
<h2>Hesap Oluştur</h2>
<div class="field"><label>Ad Soyad</label><input type="text" id="r-name" placeholder="Ad Soyad" required></div>
<div class="field"><label>E-posta</label><input type="email" id="r-email" placeholder="mail@ornek.com" required></div>
<div class="field"><label>Şifre</label><div class="inp-wrap"><input type="password" id="r-pass" placeholder="En az 8 karakter" required oninput="checkStrength(this.value)"><button type="button" class="eye" onclick="togglePass('r-pass',this)">👁</button></div><div class="strength-bar"><div id="sbar"></div></div><div class="strength-lbl" id="slbl"></div></div>
<div class="field"><label>Şifreyi Onayla</label><div class="inp-wrap"><input type="password" id="r-pass2" placeholder="Şifreyi tekrar gir" required></div></div>
<label class="chk-lbl"><input type="checkbox" required> <span>Kullanım koşullarını kabul ediyorum</span></label>
<button type="submit" class="btn-submit">Hesap Oluştur</button>
</form>
<div class="msg hidden" id="msg"></div>
</div>
</div><script src="app.js"></script></body></html>`,

    'style.css': `*{box-sizing:border-box;margin:0;padding:0}body{background:#0f172a;font-family:'Inter',sans-serif;color:#e2e8f0;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:16px;background-image:radial-gradient(ellipse at 50% 0%,rgba(99,102,241,0.12),transparent 60%)}
.wrapper{width:100%;max-width:420px}
.card{background:#1e293b;border:1px solid rgba(255,255,255,0.08);border-radius:24px;padding:36px;box-shadow:0 24px 64px rgba(0,0,0,0.4)}
.logo{text-align:center;font-size:1.4rem;font-weight:700;margin-bottom:24px}
.tabs{display:flex;background:#0f172a;border-radius:12px;padding:4px;margin-bottom:28px}
.tab{flex:1;padding:9px;border-radius:9px;border:none;background:none;color:#64748b;font-family:inherit;font-size:0.9rem;font-weight:500;cursor:pointer;transition:all 0.2s}
.tab.active{background:#6366f1;color:white}
.form h2{font-size:1.4rem;font-weight:700;margin-bottom:24px;letter-spacing:-0.5px}
.form.hidden{display:none}
.field{display:flex;flex-direction:column;gap:6px;margin-bottom:16px}
.field label{display:flex;justify-content:space-between;font-size:0.85rem;font-weight:500;color:#94a3b8}
.forgot{color:#6366f1;text-decoration:none;font-size:0.82rem}.forgot:hover{text-decoration:underline}
.inp-wrap{position:relative}
.inp-wrap input{width:100%;padding:11px 40px 11px 14px;}
input{background:#0f172a;border:1px solid rgba(255,255,255,0.1);border-radius:10px;padding:11px 14px;color:#e2e8f0;font-family:inherit;font-size:0.9rem;outline:none;width:100%;transition:border-color 0.2s}
input:focus{border-color:rgba(99,102,241,0.6)}
.eye{position:absolute;right:10px;top:50%;transform:translateY(-50%);background:none;border:none;cursor:pointer;font-size:1rem;opacity:0.5;transition:opacity 0.2s}
.eye:hover{opacity:1}
.strength-bar{height:4px;background:rgba(255,255,255,0.06);border-radius:4px;margin-top:6px;overflow:hidden}
#sbar{height:100%;width:0;border-radius:4px;transition:all 0.3s}
.strength-lbl{font-size:0.72rem;color:#64748b;margin-top:4px}
.chk-lbl{display:flex;align-items:flex-start;gap:10px;font-size:0.85rem;color:#94a3b8;margin-bottom:20px;cursor:pointer;line-height:1.5}
.chk-lbl input{width:16px;height:16px;accent-color:#6366f1;flex-shrink:0;margin-top:2px}
.btn-submit{width:100%;padding:13px;border-radius:12px;border:none;background:linear-gradient(135deg,#6366f1,#8b5cf6);color:white;font-family:inherit;font-size:0.95rem;font-weight:600;cursor:pointer;letter-spacing:0.5px;transition:all 0.2s;margin-bottom:16px}
.btn-submit:hover{transform:translateY(-1px);box-shadow:0 8px 24px rgba(99,102,241,0.4)}
.divider{position:relative;text-align:center;margin:16px 0}
.divider::before{content:'';position:absolute;inset-block:50%;left:0;right:0;height:1px;background:rgba(255,255,255,0.08)}
.divider span{background:#1e293b;padding:0 12px;color:#64748b;font-size:0.8rem;position:relative}
.social{display:flex;flex-direction:column;gap:8px}
.social-btn{padding:11px;border-radius:10px;border:1px solid rgba(255,255,255,0.1);background:rgba(255,255,255,0.04);color:#e2e8f0;font-family:inherit;font-size:0.85rem;cursor:pointer;transition:all 0.2s}
.social-btn:hover{background:rgba(255,255,255,0.08)}
.msg{margin-top:12px;padding:12px;border-radius:10px;font-size:0.85rem;text-align:center}
.msg.ok{background:rgba(34,197,94,0.1);border:1px solid rgba(34,197,94,0.3);color:#22c55e}
.msg.err{background:rgba(239,68,68,0.1);border:1px solid rgba(239,68,68,0.3);color:#ef4444}
.msg.hidden{display:none}`,

    'app.js': `function showTab(t){document.getElementById('login-form').classList.toggle('hidden',t!=='login');document.getElementById('register-form').classList.toggle('hidden',t!=='register');document.getElementById('ltab').classList.toggle('active',t==='login');document.getElementById('rtab').classList.toggle('active',t==='register');document.getElementById('msg').className='msg hidden';}function togglePass(id,btn){var inp=document.getElementById(id);inp.type=inp.type==='password'?'text':'password';btn.textContent=inp.type==='password'?'👁':'🙈';}function checkStrength(v){var sc=0;if(v.length>=8)sc++;if(/[A-Z]/.test(v))sc++;if(/[0-9]/.test(v))sc++;if(/[^a-zA-Z0-9]/.test(v))sc++;var colors=['','#ef4444','#f97316','#eab308','#22c55e'];var labels=['','Zayıf','Orta','Güçlü','Çok Güçlü'];document.getElementById('sbar').style.width=(sc*25)+'%';document.getElementById('sbar').style.background=colors[sc]||'';document.getElementById('slbl').textContent=labels[sc]||'';}function submit(e,type){e.preventDefault();var msg=document.getElementById('msg');if(type==='login'){var em=document.getElementById('l-email').value;var pw=document.getElementById('l-pass').value;if(em&&pw){msg.className='msg ok';msg.textContent='✅ Giriş başarılı! Yönlendiriliyor...';}else{msg.className='msg err';msg.textContent='❌ Lütfen tüm alanları doldurun.';}}else{var p1=document.getElementById('r-pass').value;var p2=document.getElementById('r-pass2').value;if(p1!==p2){msg.className='msg err';msg.textContent='❌ Şifreler eşleşmiyor!';return;}msg.className='msg ok';msg.textContent='✅ Hesap oluşturuldu! Giriş yapabilirsiniz.';}}`
  }
},

// ============================================================
// 💰 PRICING PAGE
// ============================================================
pricingpage: {
  keywords: ['pricing', 'fiyat', 'fiyatlandirma', 'plan', 'subscription', 'abonelik'],
  projectName: 'pricing-page',
  files: {
    'index.html': `<!DOCTYPE html><html lang="tr"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"><title>Pricing</title><link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet"><link rel="stylesheet" href="style.css"></head>
<body><div class="page">
<header><h1>Sade ve Şeffaf Fiyatlar</h1><p>İhtiyacınıza uygun planı seçin. İstediğiniz zaman iptal edin.</p>
<div class="toggle"><span id="tl" class="ton">Aylık</span><div class="sw" onclick="toggleBill()"><div class="handle" id="handle"></div></div><span id="tr" class="toff">Yıllık <span class="save">%20 indir</span></span></div></header>
<div class="cards">
<div class="card">
<div class="card-top"><div class="plan-name">Ücretsiz</div><div class="price"><span id="p0">₺0</span><span class="per">/ay</span></div></div>
<p class="desc">Başlamak için mükemmel.</p>
<ul class="feats"><li>✅ 3 Proje</li><li>✅ 1 GB Depolama</li><li>✅ Temel Analitik</li><li class="no">❌ API Erişimi</li><li class="no">❌ Öncelikli Destek</li></ul>
<button class="btn ghost" onclick="pick('Ücretsiz')">Ücretsiz Başla</button></div>
<div class="card popular">
<div class="badge">🔥 Popüler</div>
<div class="card-top"><div class="plan-name">Pro</div><div class="price"><span id="p1">₺299</span><span class="per">/ay</span></div></div>
<p class="desc">Büyüyen ekipler için.</p>
<ul class="feats"><li>✅ Sınırsız Proje</li><li>✅ 100 GB Depolama</li><li>✅ Gelişmiş Analitik</li><li>✅ API Erişimi</li><li class="no">❌ Öncelikli Destek</li></ul>
<button class="btn primary" onclick="pick('Pro')">Pro'yu Dene →</button></div>
<div class="card">
<div class="card-top"><div class="plan-name">Enterprise</div><div class="price"><span id="p2">₺899</span><span class="per">/ay</span></div></div>
<p class="desc">Kurumsal ihtiyaçlar için.</p>
<ul class="feats"><li>✅ Sınırsız Her Şey</li><li>✅ 1 TB Depolama</li><li>✅ Özel Analitik</li><li>✅ API Erişimi</li><li>✅ Öncelikli Destek</li></ul>
<button class="btn ghost" onclick="pick('Enterprise')">Satış ile İletişim</button></div>
</div>
<div class="faq"><h2>Sık Sorulan Sorular</h2><div class="qa"><details><summary>İptal edebilir miyim?</summary><p>Evet, istediğiniz zaman hiçbir ücret ödemeden iptal edebilirsiniz.</p></details><details><summary>Ödeme yöntemleri neler?</summary><p>Kredi kartı, banka kartı ve banka transferi ile ödeme yapabilirsiniz.</p></details><details><summary>Fatura alabilir miyim?</summary><p>Evet, tüm ödemeler için otomatik fatura e-posta adresinize gönderilir.</p></details></div></div>
</div><script src="app.js"></script></body></html>`,

    'style.css': `*{box-sizing:border-box;margin:0;padding:0}body{background:#020617;color:#f1f5f9;font-family:'Inter',sans-serif;min-height:100vh;background-image:radial-gradient(ellipse at 50% -20%,rgba(99,102,241,0.18),transparent 60%)}
.page{max-width:1100px;margin:0 auto;padding:60px 24px}
header{text-align:center;margin-bottom:60px}
header h1{font-size:2.8rem;font-weight:800;letter-spacing:-1.5px;margin-bottom:12px}
header p{color:#94a3b8;font-size:1.1rem;margin-bottom:28px}
.toggle{display:flex;align-items:center;justify-content:center;gap:12px}
.ton{color:#f1f5f9;font-weight:600}.toff{color:#94a3b8}
.sw{width:52px;height:28px;background:#1e293b;border-radius:100px;cursor:pointer;position:relative;border:1px solid rgba(255,255,255,0.1);transition:background 0.3s}
.sw.active{background:#6366f1}
.handle{width:20px;height:20px;background:white;border-radius:50%;position:absolute;top:3px;left:4px;transition:left 0.3s}
.sw.active .handle{left:28px}
.save{background:rgba(34,197,94,0.15);color:#22c55e;padding:2px 8px;border-radius:100px;font-size:0.75rem;font-weight:600}
.cards{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:20px;margin-bottom:80px;align-items:start}
.card{background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);border-radius:24px;padding:32px;position:relative}
.card.popular{border-color:rgba(99,102,241,0.6);background:rgba(99,102,241,0.06);transform:scale(1.02)}
.badge{position:absolute;top:-12px;left:50%;transform:translateX(-50%);background:#6366f1;color:white;padding:4px 16px;border-radius:100px;font-size:0.78rem;font-weight:700;white-space:nowrap}
.plan-name{font-size:0.8rem;font-weight:700;letter-spacing:3px;color:#64748b;margin-bottom:12px}
.price{font-size:2.8rem;font-weight:800;letter-spacing:-1px;margin-bottom:8px}
.per{font-size:1rem;color:#64748b;font-weight:400}
.desc{color:#94a3b8;font-size:0.88rem;margin-bottom:24px;line-height:1.6}
.feats{list-style:none;display:flex;flex-direction:column;gap:10px;margin-bottom:28px;font-size:0.88rem}
.feats .no{color:#475569}
.btn{width:100%;padding:13px;border-radius:12px;font-family:'Inter',sans-serif;font-size:0.9rem;font-weight:600;cursor:pointer;transition:all 0.2s;letter-spacing:0.3px}
.btn.primary{background:#6366f1;border:none;color:white;box-shadow:0 0 24px rgba(99,102,241,0.4)}.btn.primary:hover{transform:translateY(-2px);box-shadow:0 0 40px rgba(99,102,241,0.6)}
.btn.ghost{background:none;border:1px solid rgba(255,255,255,0.12);color:#f1f5f9}.btn.ghost:hover{background:rgba(255,255,255,0.06)}
.faq{max-width:700px;margin:0 auto}
.faq h2{font-size:1.8rem;font-weight:700;text-align:center;margin-bottom:32px;letter-spacing:-0.5px}
.qa{display:flex;flex-direction:column;gap:8px}
details{background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.07);border-radius:12px;padding:16px 20px}
summary{cursor:pointer;font-weight:500;color:#e2e8f0;list-style:none;display:flex;justify-content:space-between}
summary::after{content:'▾';color:#6366f1;transition:transform 0.2s}
details[open] summary::after{transform:rotate(180deg)}
details p{color:#94a3b8;font-size:0.9rem;margin-top:12px;line-height:1.6}`,

    'app.js': `var yearly=false;var prices={monthly:[0,299,899],yearly:[0,239,719]};function toggleBill(){yearly=!yearly;var sw=document.querySelector('.sw');sw.classList.toggle('active',yearly);document.getElementById('tl').className=yearly?'toff':'ton';document.getElementById('tr').className=yearly?'ton':'toff';var p=yearly?prices.yearly:prices.monthly;document.getElementById('p0').textContent='₺'+p[0];document.getElementById('p1').textContent='₺'+p[1];document.getElementById('p2').textContent='₺'+p[2];}function pick(plan){alert(plan+' planı seçildi! Ödeme sayfasına yönlendiriliyorsunuz.');}`
  }
},

// ============================================================
// 🚫 404 PAGE
// ============================================================
notfound: {
  keywords: ['404', 'not found', 'bulunamadi', 'hata sayfasi', 'error page'],
  projectName: '404-page',
  files: {
    'index.html': `<!DOCTYPE html><html lang="tr"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"><title>404 — Sayfa Bulunamadı</title><link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@700;900&family=Inter:wght@400;500;600&display=swap" rel="stylesheet"><link rel="stylesheet" href="style.css"></head>
<body><div class="page">
<div class="glitch-wrap"><div class="glitch" data-text="404">404</div></div>
<h1>Sayfa Bulunamadı</h1>
<p>Aradığın sayfa kaybolmuş, taşınmış ya da hiç var olmamış olabilir. Endişelenme, başıma da gelebilir.</p>
<div class="actions"><a href="/" class="btn-primary">🏠 Ana Sayfaya Dön</a><button class="btn-sec" onclick="history.back()">← Geri Git</button></div>
<div class="floating">🛸</div>
</div><script src="app.js"></script></body></html>`,

    'style.css': `*{box-sizing:border-box;margin:0;padding:0}body{background:#09090f;color:#e2e8f0;font-family:'Inter',sans-serif;min-height:100vh;display:flex;align-items:center;justify-content:center;overflow:hidden;background-image:radial-gradient(ellipse at 50% 50%,rgba(99,102,241,0.08) 0%,transparent 60%)}
.page{text-align:center;display:flex;flex-direction:column;align-items:center;gap:20px;padding:40px;position:relative}
.glitch-wrap{position:relative;margin-bottom:8px}
.glitch{font-family:'Orbitron',monospace;font-size:clamp(8rem,20vw,14rem);font-weight:900;color:#6366f1;position:relative;letter-spacing:-4px;line-height:1;text-shadow:0 0 40px rgba(99,102,241,0.5)}
.glitch::before,.glitch::after{content:attr(data-text);position:absolute;top:0;left:0;width:100%;height:100%}
.glitch::before{color:#ef4444;animation:glitch1 3s infinite;clip-path:polygon(0 0,100% 0,100% 35%,0 35%)}
.glitch::after{color:#22c55e;animation:glitch2 3s infinite;clip-path:polygon(0 65%,100% 65%,100% 100%,0 100%)}
@keyframes glitch1{0%,90%,100%{transform:translate(0)}91%{transform:translate(-4px,2px)}93%{transform:translate(4px,-2px)}95%{transform:translate(-2px,0)}}
@keyframes glitch2{0%,90%,100%{transform:translate(0)}91%{transform:translate(4px,-2px)}93%{transform:translate(-4px,2px)}95%{transform:translate(2px,0)}}
h1{font-size:1.8rem;font-weight:700;letter-spacing:-0.5px}
p{color:#64748b;font-size:1rem;max-width:420px;line-height:1.7}
.actions{display:flex;gap:12px;flex-wrap:wrap;justify-content:center}
.btn-primary,.btn-sec{padding:13px 28px;border-radius:12px;font-size:0.9rem;font-weight:600;text-decoration:none;cursor:pointer;transition:all 0.2s;font-family:inherit}
.btn-primary{background:#6366f1;color:white;border:none;box-shadow:0 0 24px rgba(99,102,241,0.4)}.btn-primary:hover{transform:translateY(-2px)}
.btn-sec{background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);color:#e2e8f0}.btn-sec:hover{background:rgba(255,255,255,0.1)}
.floating{position:fixed;font-size:4rem;animation:float 6s ease-in-out infinite;top:10%;right:10%;pointer-events:none}
@keyframes float{0%,100%{transform:translateY(0) rotate(0deg)}50%{transform:translateY(-20px) rotate(10deg)}}`,

    'app.js': `// Easter egg: Konami code → party modevar s=[38,38,40,40,37,39,37,39,66,65],i=0;document.addEventListener('keydown',function(e){if(e.keyCode===s[i]){i++;if(i===s.length){document.body.style.animation='party 0.5s infinite';i=0;}}else i=0;});var style=document.createElement('style');style.textContent='@keyframes party{0%{filter:hue-rotate(0deg)}100%{filter:hue-rotate(360deg)}}';document.head.appendChild(style);`
  }
},

// ============================================================
// ⏳ COMING SOON
// ============================================================
comingsoon: {
  keywords: ['coming soon', 'yakında', 'yakinda', 'countdown', 'geri sayım'],
  projectName: 'coming-soon',
  files: {
    'index.html': `<!DOCTYPE html><html lang="tr"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"><title>Yakında</title><link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@700;900&family=Inter:wght@400;500;600&display=swap" rel="stylesheet"><link rel="stylesheet" href="style.css"></head>
<body><div class="page">
<div class="logo">⚡ Brand</div>
<h1>Çok Yakında</h1>
<p class="sub">Harika bir şey inşa ediyoruz. Hazır olduğunda seni haberdar edelim.</p>
<div class="countdown" id="countdown">
<div class="unit"><div class="val" id="cd-d">00</div><div class="lbl">GÜN</div></div>
<div class="sep">:</div>
<div class="unit"><div class="val" id="cd-h">00</div><div class="lbl">SAAT</div></div>
<div class="sep">:</div>
<div class="unit"><div class="val" id="cd-m">00</div><div class="lbl">DAKİKA</div></div>
<div class="sep">:</div>
<div class="unit"><div class="val" id="cd-s">00</div><div class="lbl">SANİYE</div></div>
</div>
<form class="email-form" onsubmit="subscribe(event)"><input type="email" placeholder="E-posta adresin" required><button type="submit">Beni Bildir →</button></form>
<div class="social-links"><a href="#" title="Twitter">𝕏</a><a href="#" title="Instagram">📸</a><a href="#" title="LinkedIn">💼</a></div>
<div class="msg hidden" id="msg">✅ Kayıt oldun! Seni haberdar edeceğiz.</div>
</div><script src="app.js"></script></body></html>`,

    'style.css': `*{box-sizing:border-box;margin:0;padding:0}body{background:#09090f;color:#e2e8f0;font-family:'Inter',sans-serif;min-height:100vh;display:flex;align-items:center;justify-content:center;background-image:radial-gradient(ellipse at 50% 50%,rgba(99,102,241,0.1) 0%,transparent 70%);overflow:hidden}
.page{display:flex;flex-direction:column;align-items:center;gap:28px;padding:40px 24px;text-align:center;max-width:640px}
.logo{font-size:1.4rem;font-weight:700;color:#6366f1}
h1{font-family:'Orbitron',monospace;font-size:clamp(2rem,6vw,3.5rem);font-weight:900;letter-spacing:4px;background:linear-gradient(135deg,#f1f5f9,#94a3b8);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
.sub{color:#64748b;font-size:1rem;line-height:1.7;max-width:480px}
.countdown{display:flex;align-items:center;gap:16px}
.unit{display:flex;flex-direction:column;align-items:center;gap:8px;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-radius:16px;padding:20px 24px;min-width:90px}
.val{font-family:'Orbitron',monospace;font-size:2.5rem;font-weight:700;color:#6366f1;line-height:1}
.lbl{font-size:0.6rem;letter-spacing:3px;color:#475569;font-weight:600}
.sep{font-family:'Orbitron',monospace;font-size:2rem;color:#334155;font-weight:900}
.email-form{display:flex;gap:8px;width:100%;max-width:440px}
.email-form input{flex:1;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);border-radius:12px;padding:13px 16px;color:#e2e8f0;font-family:inherit;font-size:0.9rem;outline:none;transition:border-color 0.2s}
.email-form input:focus{border-color:rgba(99,102,241,0.5)}
.email-form button{padding:13px 24px;border-radius:12px;border:none;background:#6366f1;color:white;font-family:inherit;font-size:0.9rem;font-weight:600;cursor:pointer;white-space:nowrap;transition:all 0.2s}
.email-form button:hover{transform:scale(1.03);box-shadow:0 0 20px rgba(99,102,241,0.4)}
.social-links{display:flex;gap:16px}
.social-links a{width:44px;height:44px;border-radius:50%;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.08);display:flex;align-items:center;justify-content:center;text-decoration:none;font-size:1.1rem;color:#e2e8f0;transition:all 0.2s}
.social-links a:hover{background:rgba(99,102,241,0.2);border-color:rgba(99,102,241,0.4)}
.msg{background:rgba(34,197,94,0.1);border:1px solid rgba(34,197,94,0.3);color:#22c55e;padding:12px 24px;border-radius:12px;font-size:0.9rem}
.msg.hidden{display:none}`,

    'app.js': `var launch=new Date();launch.setDate(launch.getDate()+30);function tick(){var now=new Date(),diff=launch-now;if(diff<=0){document.getElementById('countdown').innerHTML='<div style="font-size:2rem;color:#22c55e">🚀 BAŞLADI!</div>';return;}var d=Math.floor(diff/864e5),h=Math.floor((diff%864e5)/36e5),m=Math.floor((diff%36e5)/6e4),s=Math.floor((diff%6e4)/1e3);function pad(n){return n.toString().padStart(2,'0');}document.getElementById('cd-d').textContent=pad(d);document.getElementById('cd-h').textContent=pad(h);document.getElementById('cd-m').textContent=pad(m);document.getElementById('cd-s').textContent=pad(s);}tick();setInterval(tick,1000);function subscribe(e){e.preventDefault();document.getElementById('msg').classList.remove('hidden');e.target.reset();}`
  }
},

// ============================================================
// 💸 EXPENSE TRACKER
// ============================================================
expensetracker: {
  keywords: ['expense', 'harcama', 'butce', 'bütçe', 'para', 'gelir', 'gider', 'budget', 'finance'],
  projectName: 'expense-tracker',
  files: {
    'index.html': `<!DOCTYPE html><html lang="tr"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"><title>Harcama Takip</title><link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet"><link rel="stylesheet" href="style.css"></head>
<body><div class="app">
<h1>💸 Harcama Takibi</h1>
<div class="summary">
<div class="sum-box balance"><div class="sl">BAKİYE</div><div class="sv" id="balance">₺0</div></div>
<div class="sum-box income"><div class="sl">TOPLAM GELİR</div><div class="sv" id="income">₺0</div></div>
<div class="sum-box expense"><div class="sl">TOPLAM GİDER</div><div class="sv" id="expense">₺0</div></div>
</div>
<div class="add-form">
<input type="text" id="desc" placeholder="Açıklama (örn: Market alışverişi)">
<input type="number" id="amt" placeholder="Tutar" step="0.01">
<select id="type"><option value="income">+ Gelir</option><option value="expense">- Gider</option></select>
<select id="cat"><option value="food">🍔 Yemek</option><option value="transport">🚗 Ulaşım</option><option value="health">💊 Sağlık</option><option value="entertainment">🎮 Eğlence</option><option value="salary">💼 Maaş</option><option value="other">📦 Diğer</option></select>
<button class="btn-add" onclick="addEntry()">+ Ekle</button>
</div>
<div class="tx-header"><span>İşlemler</span><button class="clr-btn" onclick="clearAll()">Tümünü Sil</button></div>
<ul class="tx-list" id="txlist"></ul>
</div><script src="app.js"></script></body></html>`,

    'style.css': `*{box-sizing:border-box;margin:0;padding:0}body{background:#0f172a;color:#e2e8f0;font-family:'Inter',sans-serif;min-height:100vh;display:flex;align-items:flex-start;justify-content:center;padding:24px 16px;background-image:radial-gradient(ellipse at 50% 0%,rgba(34,197,94,0.06),transparent 60%)}
.app{width:100%;max-width:560px;display:flex;flex-direction:column;gap:20px}
h1{font-size:1.6rem;font-weight:700;text-align:center}
.summary{display:grid;grid-template-columns:1.2fr 1fr 1fr;gap:12px}
.sum-box{background:#1e293b;border:1px solid rgba(255,255,255,0.07);border-radius:16px;padding:16px;text-align:center}
.sl{font-size:0.62rem;letter-spacing:2px;color:#64748b;margin-bottom:6px}
.sv{font-size:1.5rem;font-weight:700}
.balance .sv{color:#f1f5f9}
.income .sv{color:#22c55e}
.expense .sv{color:#ef4444}
.add-form{display:grid;grid-template-columns:1fr 1fr;gap:10px}
input,select{background:#1e293b;border:1px solid rgba(255,255,255,0.08);border-radius:10px;padding:11px 14px;color:#e2e8f0;font-family:'Inter',sans-serif;font-size:0.9rem;outline:none;width:100%;transition:border-color 0.2s}
input:focus,select:focus{border-color:rgba(99,102,241,0.5)}
.add-form input:first-child,.btn-add{grid-column:span 2}
.btn-add{padding:12px;border-radius:10px;border:none;background:linear-gradient(135deg,#22c55e,#16a34a);color:white;font-family:inherit;font-size:0.95rem;font-weight:600;cursor:pointer;transition:all 0.2s}
.btn-add:hover{transform:scale(1.02);box-shadow:0 0 20px rgba(34,197,94,0.3)}
.tx-header{display:flex;justify-content:space-between;align-items:center}
.tx-header span{font-weight:600;color:#94a3b8;font-size:0.85rem;letter-spacing:1px;text-transform:uppercase}
.clr-btn{background:none;border:none;color:#ef4444;cursor:pointer;font-size:0.8rem;font-family:inherit;opacity:0.6;transition:opacity 0.2s}
.clr-btn:hover{opacity:1}
.tx-list{list-style:none;display:flex;flex-direction:column;gap:8px}
.tx-item{display:flex;align-items:center;gap:12px;background:#1e293b;border-radius:12px;padding:14px;border:1px solid rgba(255,255,255,0.05);border-left:3px solid transparent;animation:fadeIn 0.2s ease}
@keyframes fadeIn{from{opacity:0;transform:translateY(-6px)}to{opacity:1;transform:translateY(0)}}
.tx-item.income{border-left-color:#22c55e}
.tx-item.expense{border-left-color:#ef4444}
.tx-icon{font-size:1.4rem}
.tx-info{flex:1}.tx-desc{font-size:0.9rem;font-weight:500}.tx-cat{font-size:0.75rem;color:#64748b}
.tx-amt{font-size:1rem;font-weight:700}
.tx-item.income .tx-amt{color:#22c55e}
.tx-item.expense .tx-amt{color:#ef4444}
.tx-del{background:none;border:none;color:#64748b;cursor:pointer;font-size:1rem;padding:4px;border-radius:6px;transition:all 0.2s;opacity:0}
.tx-item:hover .tx-del{opacity:1}
.tx-del:hover{background:rgba(239,68,68,0.1);color:#ef4444}`,

    'app.js': `var entries=JSON.parse(localStorage.getItem('expenses')||'[]');var ICONS={food:'🍔',transport:'🚗',health:'💊',entertainment:'🎮',salary:'💼',other:'📦'};var LABELS={food:'Yemek',transport:'Ulaşım',health:'Sağlık',entertainment:'Eğlence',salary:'Maaş',other:'Diğer'};function save(){localStorage.setItem('expenses',JSON.stringify(entries));}function calc(){var inc=0,exp=0;entries.forEach(function(e){if(e.type==='income')inc+=e.amt;else exp+=e.amt;});var fmt=function(n){return '₺'+n.toLocaleString('tr-TR',{minimumFractionDigits:2});};document.getElementById('balance').textContent=fmt(inc-exp);document.getElementById('income').textContent=fmt(inc);document.getElementById('expense').textContent=fmt(exp);document.getElementById('balance').style.color=(inc-exp)>=0?'#22c55e':'#ef4444';}function render(){var list=document.getElementById('txlist');list.innerHTML='';entries.slice().reverse().forEach(function(e,i){var li=document.createElement('li');li.className='tx-item '+e.type;li.innerHTML='<span class="tx-icon">'+ICONS[e.cat]+'</span><div class="tx-info"><div class="tx-desc">'+e.desc+'</div><div class="tx-cat">'+LABELS[e.cat]+'</div></div><div class="tx-amt">'+(e.type==='income'?'+':'-')+'₺'+e.amt.toLocaleString('tr-TR',{minimumFractionDigits:2})+'</div><button class="tx-del" onclick="del('+(entries.length-1-i)+')">🗑</button>';list.appendChild(li);});calc();}function addEntry(){var desc=document.getElementById('desc').value.trim();var amt=parseFloat(document.getElementById('amt').value);var type=document.getElementById('type').value;var cat=document.getElementById('cat').value;if(!desc||!amt||amt<=0){alert('Açıklama ve geçerli tutar girin!');return;}entries.push({desc:desc,amt:amt,type:type,cat:cat,date:new Date().toLocaleDateString('tr-TR')});document.getElementById('desc').value='';document.getElementById('amt').value='';save();render();}function del(i){entries.splice(i,1);save();render();}function clearAll(){if(confirm('Tüm işlemler silinsin mi?')){entries=[];save();render();}}render();`
  }
},

// ============================================================
// 🌱 HABIT TRACKER
// ============================================================
habittracker: {
  keywords: ['habit', 'alışkanlık', 'aliskanlik', 'tracker', 'takip', 'gunluk', 'günlük'],
  projectName: 'habit-tracker',
  files: {
    'index.html': `<!DOCTYPE html><html lang="tr"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"><title>Alışkanlık Takibi</title><link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet"><link rel="stylesheet" href="style.css"></head>
<body><div class="app">
<div class="hdr"><h1>🌱 Alışkanlıklarım</h1><div class="date" id="today-date"></div></div>
<div class="add-habit"><input type="text" id="new-habit" placeholder="Yeni alışkanlık (örn: 8 bardak su iç)" maxlength="60"><input type="text" id="new-icon" placeholder="Emoji" maxlength="2" style="width:60px"><button onclick="addHabit()">+ Ekle</button></div>
<div class="week-hdr"><span>Alışkanlık</span><div class="days-row" id="days-hdr"></div></div>
<div class="habits" id="habits"></div>
<div class="stats"><div class="stat-box"><div class="sn" id="total-done">0</div><div class="sl">Bugün Tamamlanan</div></div><div class="stat-box"><div class="sn" id="best-streak">0</div><div class="sl">En Uzun Seri</div></div><div class="stat-box"><div class="sn" id="completion">0%</div><div class="sl">Tamamlanma Oranı</div></div></div>
</div><script src="app.js"></script></body></html>`,

    'style.css': `*{box-sizing:border-box;margin:0;padding:0}body{background:#0f0f1a;color:#e2e8f0;font-family:'Inter',sans-serif;min-height:100vh;display:flex;align-items:flex-start;justify-content:center;padding:24px 16px;background-image:radial-gradient(ellipse at 50% 0%,rgba(34,197,94,0.08),transparent 60%)}
.app{width:100%;max-width:700px;display:flex;flex-direction:column;gap:20px}
.hdr{display:flex;justify-content:space-between;align-items:center}
h1{font-size:1.6rem;font-weight:700}
.date{color:#64748b;font-size:0.9rem}
.add-habit{display:flex;gap:8px}
.add-habit input{background:#1a1a2e;border:1px solid rgba(255,255,255,0.08);border-radius:10px;padding:10px 14px;color:#e2e8f0;font-family:inherit;font-size:0.9rem;outline:none;flex:1;transition:border-color 0.2s}
.add-habit input:focus{border-color:rgba(34,197,94,0.5)}
.add-habit button{padding:10px 20px;border-radius:10px;border:none;background:#22c55e;color:#0f0f1a;font-family:inherit;font-weight:700;cursor:pointer;white-space:nowrap;transition:all 0.2s}
.add-habit button:hover{transform:scale(1.04)}
.week-hdr{display:flex;align-items:center;justify-content:space-between;padding:0 4px}
.week-hdr>span{font-size:0.75rem;letter-spacing:1px;color:#64748b;min-width:180px}
.days-row{display:flex;gap:6px}
.day-lbl{width:36px;text-align:center;font-size:0.65rem;color:#475569;font-weight:600}
.habits{display:flex;flex-direction:column;gap:8px}
.habit-row{display:flex;align-items:center;justify-content:space-between;background:#1a1a2e;border-radius:12px;padding:12px 16px;border:1px solid rgba(255,255,255,0.05);gap:12px}
.habit-info{display:flex;align-items:center;gap:10px;min-width:180px;flex:1}
.habit-icon{font-size:1.4rem}
.habit-name{font-size:0.9rem;font-weight:500}
.streak{font-size:0.72rem;color:#f59e0b;font-weight:600}
.checks{display:flex;gap:6px}
.chk{width:36px;height:36px;border-radius:8px;border:1px solid rgba(255,255,255,0.1);background:rgba(255,255,255,0.04);cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:1rem;transition:all 0.2s}
.chk.done{background:rgba(34,197,94,0.2);border-color:#22c55e;color:#22c55e}
.chk:hover:not(.done){background:rgba(34,197,94,0.08);border-color:rgba(34,197,94,0.4)}
.del-habit{background:none;border:none;color:#ef4444;cursor:pointer;font-size:0.9rem;opacity:0;transition:opacity 0.2s;padding:4px 8px}
.habit-row:hover .del-habit{opacity:1}
.stats{display:grid;grid-template-columns:repeat(3,1fr);gap:12px}
.stat-box{background:#1a1a2e;border:1px solid rgba(255,255,255,0.06);border-radius:14px;padding:16px;text-align:center}
.sn{font-size:1.8rem;font-weight:700;color:#22c55e;margin-bottom:4px}
.sl{font-size:0.72rem;color:#64748b;letter-spacing:1px}`,

    'app.js': `var habits=JSON.parse(localStorage.getItem('habits')||'[]');var today=new Date();var dayNames=['Paz','Pzt','Sal','Çar','Per','Cum','Cmt'];function getWeekDates(){var dates=[];for(var i=6;i>=0;i--){var d=new Date(today);d.setDate(today.getDate()-i);dates.push(d);}return dates;}function dateKey(d){return d.toISOString().slice(0,10);}function save(){localStorage.setItem('habits',JSON.stringify(habits));}function addHabit(){var n=document.getElementById('new-habit').value.trim();var ic=document.getElementById('new-icon').value.trim()||'✅';if(!n)return;habits.push({id:Date.now(),name:n,icon:ic,done:{}});document.getElementById('new-habit').value='';document.getElementById('new-icon').value='';save();render();}function toggle(id,dk){var h=habits.find(function(h){return h.id===id;});if(!h)return;h.done[dk]=!h.done[dk];save();render();}function delHabit(id){habits=habits.filter(function(h){return h.id!==id;});save();render();}function getStreak(h){var s=0;var d=new Date(today);while(h.done[dateKey(d)]){s++;d.setDate(d.getDate()-1);}return s;}function render(){var dates=getWeekDates();var todayKey=dateKey(today);document.getElementById('today-date').textContent=today.toLocaleDateString('tr-TR',{weekday:'long',year:'numeric',month:'long',day:'numeric'});var hdr=document.getElementById('days-hdr');hdr.innerHTML='';dates.forEach(function(d){var span=document.createElement('div');span.className='day-lbl';span.textContent=dayNames[d.getDay()];hdr.appendChild(span);});var list=document.getElementById('habits');list.innerHTML='';var todayDone=0,totalStreaks=0;habits.forEach(function(h){var row=document.createElement('div');row.className='habit-row';var streak=getStreak(h);if(h.done[todayKey])todayDone++;totalStreaks=Math.max(totalStreaks,streak);var checksHTML='';dates.forEach(function(d){var dk=dateKey(d);var done=h.done[dk]?'done':'';checksHTML+='<div class="chk '+done+'" data-id="'+h.id+'" data-dk="'+dk+'">'+( h.done[dk]?'✓':'')+'</div>';});row.innerHTML='<div class="habit-info"><span class="habit-icon">'+h.icon+'</span><div><div class="habit-name">'+h.name+'</div><div class="streak">'+( streak>0?'🔥 '+streak+' gün':'—')+'</div></div></div><div class="checks">'+checksHTML+'</div><button class="del-habit" onclick="delHabit('+h.id+')">✕</button>';list.appendChild(row);});list.querySelectorAll('.chk').forEach(function(el){el.addEventListener('click',function(){toggle(parseInt(el.dataset.id),el.dataset.dk);});});document.getElementById('total-done').textContent=todayDone+'/'+habits.length;document.getElementById('best-streak').textContent=totalStreaks;var pct=habits.length?Math.round(todayDone/habits.length*100):0;document.getElementById('completion').textContent=pct+'%';}render();`
  }
},

// ============================================================
// 📋 KANBAN BOARD
// ============================================================
kanbanboard: {
  keywords: ['kanban', 'board', 'görev panosu', 'gorev panosu', 'task board', 'proje yönetimi', 'scrum'],
  projectName: 'kanban-board',
  files: {
    'index.html': `<!DOCTYPE html><html lang="tr"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"><title>Kanban Board</title><link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet"><link rel="stylesheet" href="style.css"></head>
<body><div class="app">
<header class="hdr"><h1>📋 Kanban Board</h1><button class="add-btn" onclick="openModal()">+ Kart Ekle</button></header>
<div class="board">
<div class="col" id="col-todo" ondragover="dragover(event)" ondrop="drop(event,'todo')"><div class="col-hdr"><span class="col-title">📝 Yapılacak</span><span class="col-count" id="cnt-todo">0</span></div><div class="cards" id="cards-todo"></div></div>
<div class="col" id="col-doing" ondragover="dragover(event)" ondrop="drop(event,'doing')"><div class="col-hdr"><span class="col-title">⚡ Devam Eden</span><span class="col-count" id="cnt-doing">0</span></div><div class="cards" id="cards-doing"></div></div>
<div class="col done" id="col-done" ondragover="dragover(event)" ondrop="drop(event,'done')"><div class="col-hdr"><span class="col-title">✅ Tamamlandı</span><span class="col-count" id="cnt-done">0</span></div><div class="cards" id="cards-done"></div></div>
</div>
<div class="modal hidden" id="modal" onclick="closeModal(event)"><div class="modal-box"><h2>Yeni Kart</h2><div class="field"><label>Başlık</label><input type="text" id="c-title" placeholder="Görev başlığı"></div><div class="field"><label>Açıklama</label><textarea id="c-desc" placeholder="Açıklama (isteğe bağlı)" rows="3"></textarea></div><div class="field"><label>Öncelik</label><select id="c-prio"><option value="low">🟢 Düşük</option><option value="med" selected>🟡 Orta</option><option value="high">🔴 Yüksek</option></select></div><div class="field"><label>Sütun</label><select id="c-col"><option value="todo">Yapılacak</option><option value="doing">Devam Eden</option><option value="done">Tamamlandı</option></select></div><div class="modal-btns"><button class="btn-cancel" onclick="closeModal()">İptal</button><button class="btn-save" onclick="addCard()">Kaydet</button></div></div></div>
</div><script src="app.js"></script></body></html>`,

    'style.css': `*{box-sizing:border-box;margin:0;padding:0}body{background:#0f0f1a;color:#e2e8f0;font-family:'Inter',sans-serif;min-height:100vh;overflow-x:auto}
.app{min-height:100vh;padding:20px;display:flex;flex-direction:column;gap:20px}
.hdr{display:flex;align-items:center;justify-content:space-between}
h1{font-size:1.4rem;font-weight:700}
.add-btn{padding:9px 20px;border-radius:10px;border:none;background:#6366f1;color:white;font-family:inherit;font-weight:600;cursor:pointer;font-size:0.9rem;transition:all 0.2s}
.add-btn:hover{transform:scale(1.04);box-shadow:0 0 16px rgba(99,102,241,0.4)}
.board{display:flex;gap:16px;align-items:flex-start;min-width:700px}
.col{flex:1;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.07);border-radius:16px;padding:14px;min-height:500px;transition:background 0.2s}
.col.drag-over{background:rgba(99,102,241,0.08);border-color:rgba(99,102,241,0.3)}
.col.done{background:rgba(34,197,94,0.03)}
.col-hdr{display:flex;align-items:center;justify-content:space-between;margin-bottom:14px}
.col-title{font-size:0.85rem;font-weight:600;letter-spacing:0.3px}
.col-count{background:rgba(255,255,255,0.08);border-radius:100px;padding:2px 8px;font-size:0.72rem;font-weight:600;color:#94a3b8}
.cards{display:flex;flex-direction:column;gap:8px}
.card{background:#1a1a2e;border:1px solid rgba(255,255,255,0.07);border-radius:12px;padding:14px;cursor:grab;user-select:none;animation:fadeIn 0.2s ease;position:relative;border-left:3px solid transparent}
.card:active{cursor:grabbing;opacity:0.8}
.card:hover{border-color:rgba(255,255,255,0.12);transform:translateY(-1px)}
.card.prio-high{border-left-color:#ef4444}
.card.prio-med{border-left-color:#f59e0b}
.card.prio-low{border-left-color:#22c55e}
@keyframes fadeIn{from{opacity:0;transform:scale(0.97)}to{opacity:1;transform:scale(1)}}
.card-title{font-size:0.9rem;font-weight:600;margin-bottom:6px}
.card-desc{font-size:0.78rem;color:#64748b;line-height:1.5}
.card-footer{display:flex;justify-content:space-between;align-items:center;margin-top:10px}
.prio-tag{font-size:0.68rem;padding:2px 8px;border-radius:100px;font-weight:600}
.prio-high .prio-tag{background:rgba(239,68,68,0.15);color:#f87171}
.prio-med .prio-tag{background:rgba(245,158,11,0.15);color:#fbbf24}
.prio-low .prio-tag{background:rgba(34,197,94,0.15);color:#4ade80}
.del-card{background:none;border:none;color:#ef4444;cursor:pointer;font-size:0.85rem;opacity:0;transition:opacity 0.2s;padding:2px 6px}
.card:hover .del-card{opacity:1}
.modal{position:fixed;inset:0;background:rgba(0,0,0,0.7);display:flex;align-items:center;justify-content:center;z-index:100;-webkit-backdrop-filter:blur(4px);backdrop-filter:blur(4px)}
.modal.hidden{display:none}
.modal-box{background:#1e293b;border:1px solid rgba(255,255,255,0.1);border-radius:20px;padding:28px;width:100%;max-width:400px}
.modal-box h2{font-size:1.2rem;margin-bottom:20px}
.field{display:flex;flex-direction:column;gap:6px;margin-bottom:14px}
.field label{font-size:0.82rem;color:#94a3b8;font-weight:500}
input,textarea,select{background:#0f172a;border:1px solid rgba(255,255,255,0.08);border-radius:10px;padding:10px 14px;color:#e2e8f0;font-family:'Inter',sans-serif;font-size:0.88rem;outline:none;width:100%;transition:border-color 0.2s}
input:focus,textarea:focus,select:focus{border-color:rgba(99,102,241,0.5)}
.modal-btns{display:flex;gap:10px;justify-content:flex-end;margin-top:20px}
.btn-cancel,.btn-save{padding:10px 20px;border-radius:10px;font-family:inherit;font-size:0.88rem;font-weight:600;cursor:pointer;transition:all 0.2s}
.btn-cancel{background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.1);color:#e2e8f0}.btn-cancel:hover{background:rgba(255,255,255,0.1)}
.btn-save{background:#6366f1;border:none;color:white}.btn-save:hover{transform:scale(1.03)}`,

    'app.js': `var cards=JSON.parse(localStorage.getItem('kanban')||'[]');var dragging=null;var PRIO={low:'🟢 Düşük',med:'🟡 Orta',high:'🔴 Yüksek'};function save(){localStorage.setItem('kanban',JSON.stringify(cards));}function render(){['todo','doing','done'].forEach(function(col){var list=document.getElementById('cards-'+col);list.innerHTML='';var colCards=cards.filter(function(c){return c.col===col;});document.getElementById('cnt-'+col).textContent=colCards.length;colCards.forEach(function(c){var d=document.createElement('div');d.className='card prio-'+c.prio;d.draggable=true;d.innerHTML='<div class="card-title">'+c.title+'</div>'+(c.desc?'<div class="card-desc">'+c.desc+'</div>':'')+'<div class="card-footer"><span class="prio-tag">'+PRIO[c.prio]+'</span><button class="del-card" onclick="delCard('+c.id+')">🗑</button></div>';d.addEventListener('dragstart',function(){dragging=c.id;setTimeout(function(){d.style.opacity='0.5';},0);});d.addEventListener('dragend',function(){d.style.opacity='1';});list.appendChild(d);});});}function dragover(e){e.preventDefault();e.currentTarget.classList.add('drag-over');}function drop(e,col){e.preventDefault();document.querySelectorAll('.col').forEach(function(c){c.classList.remove('drag-over');});if(dragging===null)return;var card=cards.find(function(c){return c.id===dragging;});if(card)card.col=col;dragging=null;save();render();}function addCard(){var t=document.getElementById('c-title').value.trim();if(!t)return;cards.push({id:Date.now(),title:t,desc:document.getElementById('c-desc').value.trim(),prio:document.getElementById('c-prio').value,col:document.getElementById('c-col').value});closeModal();save();render();}function delCard(id){cards=cards.filter(function(c){return c.id!==id;});save();render();}function openModal(){document.getElementById('modal').classList.remove('hidden');document.getElementById('c-title').focus();}function closeModal(e){if(!e||e.target===document.getElementById('modal'))document.getElementById('modal').classList.add('hidden');}render();`
  }
},

// ============================================================
// 🃏 FLASHCARD APP
// ============================================================
flashcardapp: {
  keywords: ['flashcard', 'flash card', 'kart', 'ezber', 'çalışma', 'calisma', 'study', 'quiz card'],
  projectName: 'flashcard-app',
  files: {
    'index.html': `<!DOCTYPE html><html lang="tr"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"><title>Flashcard</title><link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet"><link rel="stylesheet" href="style.css"></head>
<body><div class="app">
<h1>🃏 Flashcard</h1>
<div class="progress-bar"><div id="prog"></div></div>
<div class="card-area">
<div class="flashcard" id="flashcard" onclick="flip()">
<div class="card-inner">
<div class="card-front"><div class="card-label">SORU</div><div class="card-text" id="q-text"></div><div class="flip-hint">Cevabı görmek için tıkla 👆</div></div>
<div class="card-back"><div class="card-label">CEVAP</div><div class="card-text" id="a-text"></div></div>
</div></div>
</div>
<div class="nav-btns">
<button class="nav-btn" id="prev-btn" onclick="prev()">← Önceki</button>
<span class="counter" id="counter">0/0</span>
<button class="nav-btn" id="next-btn" onclick="next()">Sonraki →</button>
</div>
<div class="result-btns hidden" id="result-btns">
<button class="rbtn wrong" onclick="mark(false)">❌ Bilmedim</button>
<button class="rbtn right" onclick="mark(true)">✅ Bildim</button>
</div>
<div class="stats"><span>✅ <b id="sc">0</b></span><span>❌ <b id="wc">0</b></span><span>📊 <b id="acc">—</b></span></div>
<div class="add-section"><h2>Kart Ekle</h2><div class="add-form"><input type="text" id="nq" placeholder="Soru"><input type="text" id="na" placeholder="Cevap"><button onclick="addCard()">+ Ekle</button></div><button class="reset-btn" onclick="resetCards()">Orijinal Kartlara Dön</button></div>
</div><script src="app.js"></script></body></html>`,

    'style.css': `*{box-sizing:border-box;margin:0;padding:0}body{background:#0f172a;color:#e2e8f0;font-family:'Inter',sans-serif;min-height:100vh;display:flex;align-items:flex-start;justify-content:center;padding:24px 16px}
.app{width:100%;max-width:560px;display:flex;flex-direction:column;gap:20px;align-items:center}
h1{font-size:1.8rem;font-weight:700;align-self:flex-start}
.progress-bar{width:100%;height:5px;background:rgba(255,255,255,0.06);border-radius:4px;overflow:hidden}
#prog{height:100%;background:linear-gradient(90deg,#6366f1,#c084fc);border-radius:4px;transition:width 0.4s ease}
.card-area{width:100%;perspective:1000px}
.flashcard{width:100%;height:260px;cursor:pointer;user-select:none}
.card-inner{width:100%;height:100%;position:relative;transform-style:preserve-3d;transition:transform 0.5s cubic-bezier(0.4,0,0.2,1)}
.flashcard.flipped .card-inner{transform:rotateY(180deg)}
.card-front,.card-back{position:absolute;inset:0;backface-visibility:hidden;border-radius:20px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:12px;padding:32px;text-align:center}
.card-front{background:linear-gradient(135deg,#1e293b,#1a1a2e);border:1px solid rgba(99,102,241,0.3);box-shadow:0 8px 32px rgba(99,102,241,0.15)}
.card-back{background:linear-gradient(135deg,#1a2e1e,#0f1a15);border:1px solid rgba(34,197,94,0.3);box-shadow:0 8px 32px rgba(34,197,94,0.15);transform:rotateY(180deg)}
.card-label{font-size:0.65rem;letter-spacing:3px;color:#64748b;font-weight:600}
.card-text{font-size:1.2rem;font-weight:600;line-height:1.5}
.card-back .card-text{color:#22c55e}
.flip-hint{font-size:0.75rem;color:#475569}
.nav-btns{display:flex;align-items:center;gap:20px}
.nav-btn{padding:10px 20px;border-radius:10px;border:1px solid rgba(255,255,255,0.08);background:rgba(255,255,255,0.04);color:#e2e8f0;font-family:inherit;font-size:0.9rem;cursor:pointer;transition:all 0.2s}
.nav-btn:hover:not(:disabled){background:rgba(255,255,255,0.1)}
.nav-btn:disabled{opacity:0.3;cursor:default}
.counter{font-size:0.9rem;color:#64748b;min-width:60px;text-align:center}
.result-btns{display:flex;gap:12px;width:100%}
.result-btns.hidden{display:none}
.rbtn{flex:1;padding:13px;border-radius:12px;border:none;font-family:inherit;font-weight:700;font-size:0.95rem;cursor:pointer;transition:all 0.2s}
.rbtn.wrong{background:rgba(239,68,68,0.15);border:1px solid rgba(239,68,68,0.3);color:#f87171}
.rbtn.wrong:hover{background:rgba(239,68,68,0.25)}
.rbtn.right{background:rgba(34,197,94,0.15);border:1px solid rgba(34,197,94,0.3);color:#4ade80}
.rbtn.right:hover{background:rgba(34,197,94,0.25)}
.stats{display:flex;gap:24px;font-size:0.9rem;color:#94a3b8}
.stats b{color:#e2e8f0}
.add-section{width:100%;background:#1e293b;border-radius:16px;padding:20px;display:flex;flex-direction:column;gap:12px}
.add-section h2{font-size:1rem;font-weight:600}
.add-form{display:flex;gap:8px}
.add-form input{flex:1;background:#0f172a;border:1px solid rgba(255,255,255,0.08);border-radius:10px;padding:10px 12px;color:#e2e8f0;font-family:inherit;font-size:0.85rem;outline:none}
.add-form input:focus{border-color:rgba(99,102,241,0.5)}
.add-form button{padding:10px 16px;border-radius:10px;border:none;background:#6366f1;color:white;font-family:inherit;font-weight:600;cursor:pointer;white-space:nowrap}
.reset-btn{background:none;border:none;color:#64748b;font-family:inherit;font-size:0.8rem;cursor:pointer;text-decoration:underline;text-align:left}`,

    'app.js': `var DEFAULT=[{q:'JavaScript\'te typeof null ne döndürür?',a:'object (tarihi bir bug)'},  {q:'CSS\'te flex container\'a yazılan "justify-content: center" ne yapar?',a:'Elemanları ana eksen boyunca ortalar'},  {q:'HTTP 404 ne anlama gelir?',a:'Kaynak bulunamadı (Not Found)'},  {q:'Git\'te "commit" ne işe yarar?',a:'Değişiklikleri yerel depoya kaydeder'},  {q:'Python\'da liste ile tuple farkı nedir?',a:'Liste değiştirilebilir (mutable), tuple değiştirilemez (immutable)'},  {q:'DNS\'in açılımı nedir?',a:'Domain Name System'},  {q:'REST API\'de PUT ve PATCH farkı nedir?',a:'PUT tüm kaynağı değiştirir, PATCH kısmi güncelleme yapar'},  {q:'SQL\'de JOIN türleri nelerdir?',a:'INNER, LEFT, RIGHT, FULL OUTER JOIN'}];var cards=JSON.parse(localStorage.getItem('flashcards')||JSON.stringify(DEFAULT));var idx=0,flipped=false,correct=0,wrong=0;function save(){localStorage.setItem('flashcards',JSON.stringify(cards));}function updateUI(){if(!cards.length){document.getElementById('q-text').textContent='Kart yok! Aşağıdan ekle.';document.getElementById('a-text').textContent='';document.getElementById('counter').textContent='0/0';document.getElementById('prog').style.width='0%';return;}var c=cards[idx];document.getElementById('q-text').textContent=c.q;document.getElementById('a-text').textContent=c.a;document.getElementById('counter').textContent=(idx+1)+'/'+cards.length;document.getElementById('prog').style.width=Math.round((idx+1)/cards.length*100)+'%';document.getElementById('prev-btn').disabled=idx===0;document.getElementById('next-btn').disabled=idx===cards.length-1;var tot=correct+wrong;document.getElementById('sc').textContent=correct;document.getElementById('wc').textContent=wrong;document.getElementById('acc').textContent=tot?Math.round(correct/tot*100)+'%':'—';}function flip(){var card=document.getElementById('flashcard');flipped=!flipped;card.classList.toggle('flipped',flipped);document.getElementById('result-btns').classList.toggle('hidden',!flipped);}function mark(ok){if(ok)correct++;else wrong++;if(idx<cards.length-1){idx++;flipped=false;document.getElementById('flashcard').classList.remove('flipped');document.getElementById('result-btns').classList.add('hidden');}updateUI();}function prev(){if(idx>0){idx--;flipped=false;document.getElementById('flashcard').classList.remove('flipped');document.getElementById('result-btns').classList.add('hidden');updateUI();}}function next(){if(idx<cards.length-1){idx++;flipped=false;document.getElementById('flashcard').classList.remove('flipped');document.getElementById('result-btns').classList.add('hidden');updateUI();}}function addCard(){var q=document.getElementById('nq').value.trim();var a=document.getElementById('na').value.trim();if(!q||!a)return;cards.push({q:q,a:a});document.getElementById('nq').value='';document.getElementById('na').value='';save();updateUI();}function resetCards(){cards=DEFAULT.slice();localStorage.removeItem('flashcards');idx=0;correct=0;wrong=0;flipped=false;document.getElementById('flashcard').classList.remove('flipped');document.getElementById('result-btns').classList.add('hidden');updateUI();}updateUI();`
  }
},

// ============================================================
// ⌨️ TYPING SPEED TEST
// ============================================================
typingtest: {
  keywords: ['typing', 'yazma hizi', 'hız testi', 'wpm', 'klavye', 'keyboard', 'typing test', 'tip'],
  projectName: 'typing-test',
  files: {
    'index.html': `<!DOCTYPE html><html lang="tr"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"><title>Yazma Hızı Testi</title><link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;600&display=swap" rel="stylesheet"><link rel="stylesheet" href="style.css"></head>
<body><div class="app">
<h1>⌨️ Yazma Hızı Testi</h1>
<div class="stats-bar"><div class="stat"><span class="sv" id="wpm">0</span><span class="sl">WPM</span></div><div class="stat"><span class="sv acc" id="acc">100%</span><span class="sl">Doğruluk</span></div><div class="stat"><span class="sv timer" id="timer">60</span><span class="sl">Saniye</span></div><div class="stat"><span class="sv err" id="errs">0</span><span class="sl">Hata</span></div></div>
<div class="text-display" id="text-display"></div>
<textarea id="input" placeholder="Yazmaya başla — timer otomatik başlar..." spellcheck="false" autocomplete="off" autocorrect="off" autocapitalize="off"></textarea>
<div class="btns"><button class="btn" onclick="restart()">🔄 Yeniden Başla</button><button class="btn sec" onclick="changeText()">🔀 Farklı Metin</button></div>
<div class="result hidden" id="result"><h2>📊 Sonuç</h2><div class="result-grid"><div class="ritem"><div class="rv" id="r-wpm">0</div><div class="rl">WPM</div></div><div class="ritem"><div class="rv" id="r-acc">0%</div><div class="rl">Doğruluk</div></div><div class="ritem"><div class="rv" id="r-time">0s</div><div class="rl">Süre</div></div><div class="ritem"><div class="rv" id="r-errs">0</div><div class="rl">Hata</div></div></div><button class="btn" style="margin-top:20px" onclick="restart()">Tekrar Dene</button></div>
</div><script src="app.js"></script></body></html>`,

    'style.css': `*{box-sizing:border-box;margin:0;padding:0}body{background:#0d0d1a;color:#e2e8f0;font-family:'Inter',sans-serif;min-height:100vh;display:flex;align-items:flex-start;justify-content:center;padding:32px 16px}
.app{width:100%;max-width:760px;display:flex;flex-direction:column;gap:24px;align-items:center}
h1{font-size:1.8rem;font-weight:700;align-self:flex-start}
.stats-bar{display:flex;gap:16px;background:#13131f;border-radius:16px;padding:16px 24px;width:100%;justify-content:space-around}
.stat{display:flex;flex-direction:column;align-items:center;gap:4px}
.sv{font-size:2rem;font-weight:700;color:#6366f1}
.sv.acc{color:#22c55e}.sv.timer{color:#f59e0b}.sv.err{color:#ef4444}
.sl{font-size:0.65rem;letter-spacing:2px;color:#64748b}
.text-display{width:100%;background:#13131f;border-radius:14px;padding:24px;font-family:'JetBrains Mono',monospace;font-size:1.05rem;line-height:1.9;letter-spacing:0.3px;border:1px solid rgba(255,255,255,0.06);position:relative}
.char{position:relative}
.char.correct{color:#22c55e}
.char.wrong{color:#ef4444;background:rgba(239,68,68,0.15);border-radius:2px}
.char.current::after{content:'';position:absolute;left:0;top:0;bottom:0;width:2px;background:#6366f1;animation:blink 1s infinite}
@keyframes blink{0%,100%{opacity:1}50%{opacity:0}}
textarea{width:100%;height:100px;background:#13131f;border:1px solid rgba(99,102,241,0.3);border-radius:14px;padding:16px;font-family:'JetBrains Mono',monospace;font-size:1rem;color:#e2e8f0;resize:none;outline:none;transition:border-color 0.2s}
textarea:focus{border-color:rgba(99,102,241,0.6);box-shadow:0 0 0 3px rgba(99,102,241,0.1)}
.btns{display:flex;gap:10px}
.btn{padding:11px 24px;border-radius:11px;border:none;background:#6366f1;color:white;font-family:inherit;font-weight:600;cursor:pointer;font-size:0.9rem;transition:all 0.2s}
.btn.sec{background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.08);color:#e2e8f0}
.btn:hover{transform:scale(1.03)}
.result{width:100%;background:#13131f;border-radius:20px;padding:32px;text-align:center;display:flex;flex-direction:column;align-items:center;gap:20px;border:1px solid rgba(99,102,241,0.3)}
.result.hidden{display:none}
.result h2{font-size:1.4rem;font-weight:700}
.result-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:16px;width:100%}
.ritem{background:rgba(255,255,255,0.04);border-radius:14px;padding:16px}
.rv{font-size:1.8rem;font-weight:700;color:#6366f1;margin-bottom:4px}
.rl{font-size:0.7rem;color:#64748b;letter-spacing:1px}`,

    'app.js': `var TEXTS=['The quick brown fox jumps over the lazy dog. Pack my box with five dozen liquor jugs. How valiantly the army fought against the invaders on the shore.','JavaScript is a lightweight interpreted programming language with first-class functions. It is most well-known as the scripting language for web pages.','The only way to do great work is to love what you do. If you have not found it yet, keep looking. Do not settle. As with all matters of the heart, you will know when you find it.','Success is not the key to happiness. Happiness is the key to success. If you love what you are doing, you will be successful. Hard work and dedication pay off.','Technology is best when it brings people together. Innovation distinguishes between a leader and a follower. Design is not just what it looks like. Design is how it works.'];var cur,idx=0,started=false,elapsed=0,totalTime=60,timerInt,errors=0,correctChars=0;function getText(){return TEXTS[idx%TEXTS.length];}function renderText(){var txt=getText();var disp=document.getElementById('text-display');disp.innerHTML='';txt.split('').forEach(function(ch,i){var span=document.createElement('span');span.className='char'+(i===0?' current':'');span.textContent=ch;disp.appendChild(span);});}function restart(){started=false;elapsed=0;errors=0;correctChars=0;cur=0;clearInterval(timerInt);document.getElementById('input').value='';document.getElementById('wpm').textContent='0';document.getElementById('acc').textContent='100%';document.getElementById('timer').textContent=totalTime;document.getElementById('errs').textContent='0';document.getElementById('result').classList.add('hidden');renderText();document.getElementById('input').focus();}function changeText(){idx++;restart();}function updateStats(){var elapsed2=Math.max(elapsed,1);var wpm=Math.round(correctChars/5/(elapsed2/60));var tot=cur,acc=tot?Math.round(Math.max(0,(tot-errors)/tot)*100):100;document.getElementById('wpm').textContent=wpm;document.getElementById('acc').textContent=acc+'%';document.getElementById('errs').textContent=errors;}function showResult(){clearInterval(timerInt);var wpm=Math.round(correctChars/5/(Math.max(elapsed,1)/60));var tot=cur,acc=tot?Math.round(Math.max(0,(tot-errors)/tot)*100):100;document.getElementById('r-wpm').textContent=wpm;document.getElementById('r-acc').textContent=acc+'%';document.getElementById('r-time').textContent=elapsed+'s';document.getElementById('r-errs').textContent=errors;document.getElementById('result').classList.remove('hidden');}document.getElementById('input').addEventListener('input',function(e){var val=this.value;var txt=getText();if(!started&&val.length>0){started=true;timerInt=setInterval(function(){elapsed++;var rem=totalTime-elapsed;document.getElementById('timer').textContent=Math.max(0,rem);if(rem<=0)showResult();},1000);}var spans=document.querySelectorAll('.char');errors=0;correctChars=0;for(var i=0;i<spans.length;i++){spans[i].className='char';if(i<val.length){if(val[i]===txt[i]){spans[i].classList.add('correct');correctChars++;}else{spans[i].classList.add('wrong');errors++;}}if(i===val.length)spans[i].classList.add('current');}cur=val.length;if(val===txt)showResult();updateStats();});restart();`
  }
},

}); // End Object.assign Batch 2
