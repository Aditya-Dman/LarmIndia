# LarmIndia

## 🔗 Live Site
**https://larm-india.vercel.app**

A modern, responsive e‑commerce style web app built with **Next.js** and **TypeScript**.

---

## ✨ Overview
LarmIndia is a web storefront experience focused on clean UX, fast performance, and a component-driven UI.

---

## 🧱 Tech Stack
- **Framework:** Next.js
- **Language:** TypeScript
- **UI Components:** Radix UI
- **Styling:** Tailwind CSS
- **Forms/Validation:** React Hook Form + Zod
- **Charts (if used):** Recharts
- **Analytics:** Vercel Analytics
- **Optional integrations:**
  - **Supabase** (auth/data) via `@supabase/supabase-js` and `@supabase/ssr`
  - **Razorpay** (payments)

---

## ✅ Requirements
- Node.js (recommended: latest LTS)
- npm

---

## 🚀 Getting Started (Local Development)

### 1) Install dependencies
```bash
npm install
```

### 2) Start the dev server
```bash
npm run dev
```

Then open:
- http://localhost:3000

---

## 📜 Scripts
```bash
npm run dev     # Start Next.js dev server
npm run build   # Production build
npm run start   # Start production server
npm run lint    # Lint the codebase
```

---

## 🖼️ Product Images
Product images are served from `public/products/`.

See the full naming + folder structure guide here:
- `public/products/README.md`

---

## 🔐 Environment Variables (if configured)
Create a `.env.local` file in the project root.

Common variables you may need:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `RAZORPAY_KEY_ID`
- `RAZORPAY_KEY_SECRET`

> Note: The exact list depends on what features you enabled in the code.

---

## 📦 Deployment
This project is deployed on **Vercel**:
- **Production:** https://larm-india.vercel.app

Typical Vercel settings:
- Build Command: `npm run build`
- Output: Next.js default

---

## 🤝 Contributing
1. Fork the repo
2. Create a feature branch
3. Commit changes
4. Open a pull request

---

## 📄 License
No license specified yet.