# Pelaris Digital 2.0 🚀

The All-in-One AI Marketing Assistant for Malaysian Small Businesses (TikTok, WhatsApp, Shopee, and Meta Sellers). 

## 🏗 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: TailwindCSS & Glassmorphism Design Tokens
- **Components**: Radix UI primitives & custom Shadcn/UI-inspired macros
- **Backend & Auth**: Supabase (PostgreSQL, Auth, Storage)
- **AI**: Gemini 1.5 Flash SDK (`@google/generative-ai`)
- **PWA**: Fully functional PWA manifests (`public/manifest.json`)

---

## 🚀 Local Development Setup

### 1. Requirements

- Node.js `v18+`
- npm `v9+` or higher
- A [Supabase](https://supabase.com/) Account (Free tier is sufficient)
- A [Google Gemini API Key](https://aistudio.google.com/)

### 2. Environment Variables

Create a `.env.local` file in the root directory and copy the contents from `.env.example`:

```bash
NEXT_PUBLIC_SUPABASE_URL="YOUR_SUPABASE_URL"
NEXT_PUBLIC_SUPABASE_ANON_KEY="YOUR_SUPABASE_ANON_KEY"
SUPABASE_SERVICE_ROLE_KEY="YOUR_SUPABASE_SERVICE_ROLE_KEY"

GEMINI_API_KEY="YOUR_GEMINI_API_KEY"
```

### 3. Database Sync

In your Supabase project dashboard, run the SQL script provided in `supabase/schema.sql`. This script sets up:
1. `users` & `business_profile` tables
2. The core marketing tables: `captions`, `hooks`, `calendar_posts`, `sales_scripts`
3. RLS Policies to ensure safe, secure data access per `user_id`.

**Important**: Make sure Supabase Authentication is set to allow typical Emails and Passwords. 

### 4. Install & Run

```bash
npm install
npm run dev
```

Your app should now be running cleanly on `http://localhost:3000`.

---

## 🎨 Features & Architecture

### 🧠 Core AI Layer (`lib/ai/service.ts`)
- Implements custom `generatePrompt` abstractions.
- Seamlessly blends Malay-English contextual translations & local slangs ("padu", "murmur je").
- Returns strict JSON outputs for hooks and calendars using Gemini's structured response config.
- Centralized for multi-framework integration.

### 📱 Modern PWA Interface
- Dark mode default utilizing `next-themes`.
- High-performance glassmorphism CSS defined dynamically in `app/globals.css`.
- Complete responsive dashboard layout (`app/(dashboard)/layout.tsx`) with animated sidebar toggles and loading skeletons.
- Route protection securely enforced by Supabase SSR `middleware.ts`.

### ⚡ Available Tools
- **Caption Studio**: Product info to TikTok/FB customized copy.
- **Hook Hub**: 5 angles (FOMO, Testimonial, Problem, Shock, Educational).
- **Scheduler & Planner**: Full 30-day interactive calendar built via AI analysis of the user's Niche.
- **Sales Funnel Script Generator**: WhatsApp auto-reply handler mapping common local objections (e.g. "Mahal sangat").
- **Smart Image Studio**: Image handling UI pipeline mockup (Cloudinary/Photoroom ready).
- **Analytics View**: High fidelity charts leveraging `recharts` to track AI-ROI.

---

## ⚙️ CI/CD Deployment (Vercel)

This application is **Deployment Ready** for Vercel.

1. Connect your GitHub repository to Vercel.
2. Select Next.js preset.
3. Paste in all your environmental variables.
4. Set up an optional Vercel Cron Job to hit `app/api/scheduler/route.ts` every hour (`0 * * * *`) for automated social media mock posting.

Happy shipping! 🚀
