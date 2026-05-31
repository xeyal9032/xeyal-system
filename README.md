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

## 📸 Ekran Görüntüleri

### 🌐 Cloud Dashboard — Canlı Hata Monitörü

<img src="docs/assets/dashboard-preview.svg" alt="Xeyal Cloud Dashboard" width="100%"/>

> Glassmorphism tasarımlı React paneli: canlı hata akışı, AI analiz sonuçları, auto-patch simülasyonu ve cluster durumu.

<br/>

### 🖥️ Tauri Masaüstü — Forge AI Studio

<img src="docs/assets/desktop-preview.svg" alt="Xeyal Desktop App" width="100%"/>

> Yerel Ollama entegrasyonu, AI ajan yönetimi, terminal çıktısı ve otonom proje oluşturma arayüzü.

<br/>

### 🎬 Demo

> Gerçek ekran kaydı eklemek için `docs/assets/demo.gif` veya `docs/assets/demo.mp4` dosyasını repoya yükleyin.

<!-- GIF eklendiğinde aşaıdaki satırın yorumunu kaldırın:
<img src="docs/assets/demo.gif" alt="Xeyal System Demo" width="100%"/>
-->

<!-- Video eklendiğinde:
https://github.com/user-attachments/assets/VIDEO_ID
-->

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

### 1️⃣ Tüm Ekosistemi Başlat

```bash
git clone https://github.com/xeyal9032/xeyal-system.git
cd xeyal-system
node launch-all.js
```

Bu komut paralel olarak başlatır:
- `xeyal-cloud` → Backend API
- `xeyal-dashboard` → React panel
- `my-system` → Developer OS

### 2️⃣ Sadece Developer OS

```bash
cd my-system
npm install
npx xeyal-system dev
```

### 3️⃣ Docker ile Cloud Stack

```bash
docker compose up -d
```

| Servis | URL |
|--------|-----|
| Backend API | http://localhost:4000 |
| Dashboard | http://localhost:80 |
| PostgreSQL | localhost:5432 |
| my-system Dashboard | http://localhost:3000 |

### 4️⃣ SDK Entegrasyonu

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
