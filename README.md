# Archie A. Menisis — Interactive AI Portfolio

An AI-native portfolio website. Chat with Archie's AI avatar to explore his work, skills, and how he can automate your business.

## Stack

- **Next.js 14** (App Router)
- **Vercel AI SDK** — streaming chat
- **Groq** (Llama 3.1 70B) or **OpenAI** (GPT-4o-mini) — AI model
- **Framer Motion** — avatar and UI animations
- **Tailwind CSS v3** — styling

---

## Local Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment

```bash
cp .env.example .env.local
```

Open `.env.local` and add your API key:

```env
# Option A — Groq (recommended: free tier, very fast)
GROQ_API_KEY=gsk_...

# Option B — OpenAI (comment out GROQ_API_KEY and uncomment this)
# OPENAI_API_KEY=sk-...
```

Get a Groq key free at: https://console.groq.com

### 3. Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## Deploying to Vercel

```bash
npm install -g vercel
vercel
```

Add `GROQ_API_KEY` (or `OPENAI_API_KEY`) as an environment variable in the Vercel dashboard under **Settings → Environment Variables**.

## Deploying to Render

1. Connect your GitHub repo to Render
2. Set **Build Command**: `npm install && npm run build`
3. Set **Start Command**: `npm start`
4. Add environment variable `GROQ_API_KEY` in Render dashboard
5. Deploy

---

## Customisation

- **AI knowledge base** — edit `lib/prompt.ts` to update your bio, projects, and contact info
- **Projects** — edit `components/ProjectCards.tsx` to update titles, descriptions, metrics, and images
- **Suggestion chips** — edit `components/SuggestionChips.tsx`
- **Colors** — edit CSS variables in `app/globals.css`
- **Avatar** — edit `components/Avatar.tsx` (SVG-based, fully animated)

---

## Adding Real Project Screenshots

Replace picsum.photos URLs in `components/ProjectCards.tsx` with your actual images:

1. Place images in `public/projects/` (e.g. `public/projects/project1.png`)
2. Update the `image` field to `/projects/project1.png`

---

## Project Structure

```
├── app/
│   ├── api/chat/route.ts   — streaming AI endpoint
│   ├── globals.css          — CSS tokens + animations
│   ├── layout.tsx           — root layout + font
│   └── page.tsx             — main page (chat interface)
├── components/
│   ├── Avatar.tsx           — animated SVG avatar
│   ├── ChatMessage.tsx      — message bubbles + markdown
│   ├── MouseEffect.tsx      — rainbow cursor + click ripples
│   ├── ProjectCards.tsx     — inline project showcase
│   ├── SuggestionChips.tsx  — quick-start chips
│   └── ThemeToggle.tsx      — dark/light toggle
└── lib/
    └── prompt.ts            — AI system prompt (knowledge base)
```
