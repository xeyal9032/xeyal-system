<div align="center">

<img src="docs/assets/banner.svg" alt="Xeyal System Banner" width="100%"/>

<br/><br/>

[![Version](https://img.shields.io/badge/version-1.5.1-06b6d4?style=for-the-badge&logo=semver&logoColor=white)](https://github.com/xeyal9032/xeyal-system)
[![License](https://img.shields.io/badge/license-MIT-8b5cf6?style=for-the-badge)](LICENSE)
[![Node](https://img.shields.io/badge/node-%3E%3D20-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org)
[![Ollama](https://img.shields.io/badge/Ollama-Local_AI-eab308?style=for-the-badge)](https://ollama.com)
[![Tauri](https://img.shields.io/badge/Tauri-2.0-24c8db?style=for-the-badge&logo=tauri&logoColor=white)](https://tauri.app)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-4169e1?style=for-the-badge&logo=postgresql&logoColor=white)](https://postgresql.org)

**Tek komutla geliştirme ortamını ayağa kaldır · Hataları yerel AI ile analiz et · Bulutta izle ve onar**

[🚀 Hızlı Başlangıç](#-hızlı-başlangıç) ·
[🖥️ Masaüstü EXE](#-masaüstü-uygulaması-exe) ·
[📸 Ekran Görüntüleri](#-ekran-görüntüleri) ·
[🏗️ Mimari](#%EF%B8%8F-mimari) ·
[📦 Modüller](#-modüller) ·
[🤝 Katkı](#-katkı)

<br/>

<img src="https://readme-typing-svg.demolab.com?font=Fira+Code&weight=600&size=22&duration=3000&pause=1000&color=06B6D4&center=true&vCenter=true&width=600&lines=Autonomous+Developer+OS;AI-Powered+Error+Intelligence;Cloud+SaaS+Platform;100%25+Local+%26+Private" alt="Typing SVG"/>

</div>

---

## ✨ Xeyal System Nedir?

**Xeyal System**, geliştiriciler için tasarlanmış **otonom bir Developer OS** ve **AI destekli hata izleme SaaS platformudur**. Port çakışmalarından framework algılamaya, yerel Ollama analizinden bulut dashboard'a kadar tüm geliştirme döngüsünü tek ekosistemde birleştirir.

<table>
<tr>
<td width="50%" valign="top">

### 🖥️ Developer OS
- Tek komut: `npx xeyal-system dev`
- Node · Python · Rust · PHP · Ruby desteği
- Otomatik port temizliği & bağımlılık kurulumu
- Tauri masaüstü + Web dashboard
- AI Swarm ajanları (Coder-Pro, Guardian, Fixer-Bot)

</td>
<td width="50%" valign="top">

### ☁️ Cloud SaaS
- SDK ile hata yakalama & breadcrumb
- Hybrid AI: Ollama + Cloud fallback
- PostgreSQL ile kalıcı hata arşivi
- React dashboard ile canlı izleme
- Docker Compose ile tek komut deploy

</td>
</tr>
</table>

---

## 🖥️ Masaüstü Uygulaması (EXE)

> **Xeyal-System'in kalbi** — Tauri 2 ile yazılmış, glassmorphism tasarımlı **Autonomous Developer OS** masaüstü paneli.  
> Cloud dashboard'dan çok daha zengin: Cockpit, AI Forge, Swarm, Skills Hub ve yerel Ollama entegrasyonu tek pencerede.

<p align="center">
  <img src="docs/assets/desktop-app-exe.png" alt="Xeyal-System Desktop EXE — Skill Hub" width="94%"/>
</p>

<p align="center">
  <img src="docs/assets/desktop-demo.gif" alt="Xeyal Desktop App Demo" width="94%"/>
</p>

<table>
<tr>
<td width="33%" align="center">
<img src="docs/assets/desktop-app-welcome.png" width="100%"/><br/>
<sub><b>Initialize System</b> — ilk açılış</sub>
</td>
<td width="33%" align="center">
<img src="docs/assets/desktop-app-cockpit.png" width="100%"/><br/>
<sub><b>Cockpit</b> — proje &amp; log kontrolü</sub>
</td>
<td width="33%" align="center">
<img src="docs/assets/desktop-app-forge.png" width="100%"/><br/>
<sub><b>AI Forge</b> — Ollama proje üretici</sub>
</td>
</tr>
</table>

### 📥 Kurulum (Windows)

<table>
<tr>
<th width="28%">Yöntem</th>
<th width="72%">Adımlar</th>
</tr>
<tr>
<td><b>🎁 ZIP Paketi</b><br/><sub>Önerilen</sub></td>
<td>

1. `xeyal-system-v1.5.1-windows.zip` dosyasını çıkarın  
2. `install.ps1` → sağ tık → **PowerShell ile Çalıştır**  
3. Kurulum sihirbazı EXE'yi yükler, masaüstü kısayolu oluşturur  

</td>
</tr>
<tr>
<td><b>⚙️ NSIS Installer</b></td>
<td>

Doğrudan çalıştırın: `xeyal-system_1.5.1_x64-setup.exe`  
*(build: `my-system/desktop-app/src-tauri/target/release/bundle/nsis/`)*

</td>
</tr>
<tr>
<td><b>👨‍💻 Geliştirici</b></td>
<td>

```bash
cd my-system && npm install
npm run desktop        # dev modu
npm run build:desktop  # .exe üret
```

</td>
</tr>
</table>

**Gereksinimler:** Windows 10/11 · Node.js ≥ 20 · Ollama (AI için, opsiyonel)

📖 Detaylı kurulum: **[docs/DESKTOP.md](docs/DESKTOP.md)**

[![Windows](https://img.shields.io/badge/Windows-10%2F11-0078D4?style=for-the-badge&logo=windows&logoColor=white)](docs/DESKTOP.md)
[![Download](https://img.shields.io/badge/Kurulum-Rehberi-06b6d4?style=for-the-badge)](docs/DESKTOP.md)
[![Tauri](https://img.shields.io/badge/Native-Tauri_2-24c8db?style=for-the-badge&logo=tauri)](https://tauri.app)

---

## 📸 Ekran Görüntüleri

### 🖥️ Masaüstü — Skills Hub & AI Ajanları

<p align="center">
  <img src="docs/assets/desktop-app-skills.png" alt="Xeyal Desktop Skills Hub" width="92%"/>
</p>

> OpenClaw, Claude Code, Codex ve daha fazlası — tek tıkla başlat.

<br/>

### 🌐 Cloud Dashboard — Canlı Hata Monitörü

<p align="center">
  <img src="docs/assets/dashboard-preview.png" alt="Xeyal Cloud Dashboard" width="92%"/>
</p>

> Glassmorphism tasarımlı React paneli: canlı hata akışı, AI analiz sonuçları, auto-patch simülasyonu.

<br/>

### ⚡ my-system Web Dashboard

<p align="center">
  <img src="docs/assets/mysystem-dashboard.png" alt="my-system Dashboard" width="92%"/>
</p>

> Socket.IO destekli canlı metrik paneli — port izleme, servis durumu ve otonom log akışı.

<br/>

### 🎬 Demo

<p align="center">
  <img src="docs/assets/demo.gif" alt="Xeyal System Demo" width="92%"/>
</p>

> Dashboard sekmeleri, my-system paneli ve Forge UI — gerçek uygulama ekran kaydı.

<table align="center">
<tr>
<td align="center" width="33%">
<img src="https://img.shields.io/badge/CLI-17_Komut-06b6d4?style=flat-square"/>
<br/><sub><code>xeyal-system dev</code></sub>
</td>
<td align="center" width="33%">
<img src="https://img.shields.io/badge/Dashboard-Socket.IO-8b5cf6?style=flat-square"/>
<br/><sub>Canlı metrik &amp; log akışı</sub>
</td>
<td align="center" width="33%">
<img src="https://img.shields.io/badge/AI-Ollama_llama3-ec4899?style=flat-square"/>
<br/><sub>%100 yerel &amp; gizli</sub>
</td>
</tr>
</table>

---

## 🏗️ Mimari

<img src="docs/assets/architecture.svg" alt="Xeyal System Architecture" width="100%"/>

```mermaid
flowchart LR
    subgraph Client["İstemci Katmanı"]
        SDK["📦 xeyal-sdk-node"]
        CLI["⚡ my-system CLI"]
        GUI["🖥️ Tauri Desktop"]
    end

    subgraph Cloud["Bulut Katmanı"]
        API["☁️ xeyal-cloud :4000"]
        DB[("🐘 PostgreSQL")]
        AI["🧠 Ollama llama3"]
    end

    subgraph UI["Arayüz"]
        DASH["📊 Dashboard :5173"]
    end

    SDK -->|POST /api/error| API
    CLI --> AI
    API --> DB
    API --> AI
    DASH -->|REST| API
    GUI --> CLI
```

---

## 📦 Modüller

<table>
<thead>
<tr>
<th align="left">Modül</th>
<th align="left">Teknoloji</th>
<th align="left">Port</th>
<th align="left">Açıklama</th>
</tr>
</thead>
<tbody>
<tr>
<td><b>my-system</b></td>
<td>Node.js · Tauri 2 · Express</td>
<td><code>3000</code></td>
<td>Otonom geliştirici OS, CLI, AI swarm, healer</td>
</tr>
<tr>
<td><b>xeyal-cloud</b></td>
<td>Express · PostgreSQL · Jest</td>
<td><code>4000</code></td>
<td>Production-ready hata raporlama &amp; AI analiz API</td>
</tr>
<tr>
<td><b>xeyal-dashboard</b></td>
<td>React · Vite · Tailwind · Framer Motion</td>
<td><code>5173</code></td>
<td>Cyber/glass temalı yönetim paneli</td>
</tr>
<tr>
<td><b>xeyal-sdk-node</b></td>
<td>Axios · stacktrace-parser</td>
<td>—</td>
<td>Resmi Node.js hata izleme SDK</td>
</tr>
<tr>
<td><b>demo-app</b></td>
<td>Express</td>
<td><code>5000</code></td>
<td>Basit test uygulaması</td>
</tr>
</tbody>
</table>

---

## 🚀 Hızlı Başlangıç

### Gereksinimler

- **Node.js** ≥ 20
- **PostgreSQL** 15 (Cloud için)
- **Ollama** (AI özellikleri için, opsiyonel)
- **Rust** (Tauri desktop build için)

### 2️⃣ Masaüstü Uygulamasını Kur (Önerilen)

```powershell
cd my-system
.\install.ps1
# veya geliştirici modu:
npm install && npm run desktop
```

Detaylı rehber: [docs/DESKTOP.md](docs/DESKTOP.md)

### 3️⃣ Tüm Ekosistemi Başlat

```bash
git clone https://github.com/xeyal9032/xeyal-system.git
cd xeyal-system
node launch-all.js
```

Bu komut paralel olarak başlatır:
- `xeyal-cloud` → Backend API
- `xeyal-dashboard` → React panel
- `my-system` → Developer OS

### 4️⃣ Sadece Developer OS (CLI)

```bash
cd my-system
npm install
npx xeyal-system dev
```

### 5️⃣ Docker ile Cloud Stack

```bash
docker compose up -d
```

| Servis | URL |
|--------|-----|
| Backend API | http://localhost:4000 |
| Dashboard | http://localhost:80 |
| PostgreSQL | localhost:5432 |
| my-system Dashboard | http://localhost:3000 |

### 6️⃣ SDK Entegrasyonu

```javascript
import xeyal from '@xeyal/sdk';

xeyal.init({
  apiKey: 'YOUR_API_KEY',
  projectName: 'My-App',
  apiUrl: 'http://localhost:4000/api',
  autoCapture: true
});

try {
  // kodunuz...
} catch (error) {
  xeyal.captureError(error);
}
```

---

## 🧰 CLI Komutları

<table>
<tr>
<td>

| Komut | Açıklama |
|-------|----------|
| `dev` | Ortamı otomatik başlat |
| `create` | Proje iskeleti oluştur |
| `doctor` | Derin sistem diagnostiği |
| `fix` | Port & ortam onarımı |
| `skills` | AI ajan yönetimi |

</td>
<td>

| Komut | Açıklama |
|-------|----------|
| `cockpit` | TUI kokpit (blessed) |
| `snapshot` | Tam sistem yedeği |
| `explain` | Ollama ile hata açıklama |
| `marketplace` | Eklenti marketi |
| `status` | Sistem sağlık özeti |

</td>
</tr>
</table>

---

## 🧠 AI Özellikleri

<table align="center">
<tr>
<td align="center" width="25%">
<h3>🤖 Coder-Pro</h3>
<p>Full-stack kod üretimi<br/>Laravel · Next.js · SPA</p>
</td>
<td align="center" width="25%">
<h3>🛡️ Guardian</h3>
<p>Güvenlik taraması<br/>Lint &amp; vulnerability</p>
</td>
<td align="center" width="25%">
<h3>🔧 Fixer-Bot</h3>
<p>Otomatik hata onarımı<br/>Patch engine</p>
</td>
<td align="center" width="25%">
<h3>🏗️ Architect</h3>
<p>Proje iskeleti<br/>21+ Forge şablonu</p>
</td>
</tr>
</table>

---

## 🛠️ Tech Stack

<div align="center">

![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=flat-square&logo=express&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white)
![Tauri](https://img.shields.io/badge/Tauri-24C8DB?style=flat-square&logo=tauri&logoColor=white)
![Rust](https://img.shields.io/badge/Rust-000000?style=flat-square&logo=rust&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=flat-square&logo=postgresql&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=flat-square&logo=docker&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)
![Socket.IO](https://img.shields.io/badge/Socket.IO-010101?style=flat-square&logo=socketdotio&logoColor=white)
![Jest](https://img.shields.io/badge/Jest-C21325?style=flat-square&logo=jest&logoColor=white)

</div>

---

## 📁 Proje Yapısı

```
xeyal-system/
├── my-system/           # Developer OS (CLI + Core + Tauri)
│   ├── cli/             # Commander.js giriş noktası
│   ├── core/            # intelligence · runtime · system
│   ├── commands/        # 17 CLI komutu
│   ├── plugins/         # Eklenti sistemi
│   ├── swarm/           # Çoklu AI ajan
│   └── desktop-app/     # Tauri 2 masaüstü GUI
├── xeyal-cloud/         # Express backend API
├── xeyal-dashboard/     # React yönetim paneli
├── xeyal-sdk-node/      # Node.js SDK
├── demo-app/            # Test uygulaması
├── docs/assets/         # README görselleri
├── launch-all.js        # Cluster orchestrator
└── docker-compose.yml   # Postgres + Backend + Dashboard
```

---

## 🔄 CI/CD

GitHub Actions ile otomatik test ve build:

- ✅ `xeyal-cloud` — Jest testleri (PostgreSQL servisi ile)
- ✅ `xeyal-dashboard` — Vite production build
- 🚀 Main branch deploy placeholder

---

## 🤝 Katkı

1. Fork edin
2. Feature branch oluşturun (`git checkout -b feature/amazing`)
3. Commit edin (`git commit -m 'feat: harika özellik eklendi'`)
4. Push edin (`git push origin feature/amazing`)
5. Pull Request açın

---

## 👤 Geliştirici

<div align="center">

**Khayal Jamilli** — Web Designer & Developer @ OstWind Group

[![GitHub](https://img.shields.io/badge/GitHub-xeyal9032-181717?style=for-the-badge&logo=github)](https://github.com/xeyal9032)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Khayal-0A66C2?style=for-the-badge&logo=linkedin)](https://linkedin.com/in/khayaljamilli9032)
[![Portfolio](https://img.shields.io/badge/Portfolio-ostwind.az-06b6d4?style=for-the-badge)](https://frontend.ostwind.az/)
[![Instagram](https://img.shields.io/badge/Instagram-xeyal9032-E4405F?style=for-the-badge&logo=instagram)](https://instagram.com/xeyal9032)

</div>

---

<div align="center">

**⭐ Beğendiyseniz yıldız vermeyi unutmayın!**

<br/>

*"Kurulum yok. Konfigürasyon yok. %100 Gizlilik. %100 Verimlilik."* 🛡️🦾

<br/>

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:06b6d4,100:8b5cf6&height=100&section=footer&text=XEYAL%20SYSTEM&fontSize=30&fontColor=ffffff&animation=twinkling"/>

</div>
