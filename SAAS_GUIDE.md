# 🚀 Xeyal Cloud: SaaS Deployment & Integration Guide

Welcome to the production-ready Xeyal Cloud platform. This guide will walk you through setting up the backend, using the SDK, and managing your dashboard.

---

## 🏗️ 1. Backend Setup (The Cloud)

**Path:** `/xeyal-cloud`

1. **Install Dependencies:**

   ```bash
   cd xeyal-cloud
   npm install
   ```

2. **Database Configuration:**
   - Create a PostgreSQL database.
   - Run the schema located at `database/schema.sql`.
   - Update `.env`:

     ```env
     DATABASE_URL=postgres://user:pass@localhost:5432/xeyal_cloud
     OLLAMA_URL=http://localhost:11434/api/generate
     OPENAI_API_KEY=your_key_here
     ```

3. **Start the Server:**

   ```bash
   npm start
   ```

---

## 📦 2. SDK Integration (The Client)

**Path:** `/xeyal-sdk-node`

Integrate Xeyal into your application to start tracking errors with AI analysis:

```javascript
import xeyal from '@xeyal/sdk';

xeyal.init({
    apiKey: 'YOUR_XEYAL_API_KEY',
    projectName: 'Customer-API'
});

// Capture any error
try {
    // your code...
} catch (error) {
    xeyal.captureError(error);
}
```

---

## 🖥️ 3. Dashboard Deployment (The UI)

**Path:** `/xeyal-dashboard`

1. **Install and Run:**

   ```bash
   cd xeyal-dashboard
   npm install
   npm run dev
   ```

2. **Visuals:** Enjoy the premium Glassmorphism UI at `http://localhost:5173`.

---

## 🛠️ 4. Unique Feature: Auto-Fix Mode

Xeyal doesn't just watch; it heals.

1. **Detect Error:** Your app throws an error, and the SDK reports it.
2. **Run Fix:**

   ```bash
   node cli/index.js fix
   ```

3. **Behavior:**
   - Xeyal Cloud analyzes the stack trace.
   - AI generates a code patch.
   - CLI asks for your confirmation.
   - **Patch Applied!** Your bug is fixed automatically.

---

## 🛡️ 5. Snapshot & Safety

Before performing any major cloud updates or auto-fixes, remember to take a snapshot:

```bash
node cli/index.js snapshot create "pre-saas-update"
```

---

## 🧪 6. Testing & Validation

We've included comprehensive tests to ensure system stability:

### Backend Logic Tests
Verify the API and Auth logic without needing a live DB:
```bash
cd xeyal-cloud
npm test
```

### AI Engine Test
Verify the hybrid routing (Local vs Cloud) logic:
```bash
cd xeyal-cloud
node tests/ai_test.js
```

### SDK Integration Test
Simulate a real-world error report and AI fix:
```bash
cd xeyal-sdk-node
node example.js
```

---

## 🏁 Xeyal System v2.0 - Hybrid Intelligence Era
