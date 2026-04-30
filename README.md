<p align="center">
  <img src="public/logo/logo_pantauin.png" alt="Pantauin" width="80" />
</p>

<h1 align="center">Pantauin</h1>

<p align="center">AI-powered platform for monitoring and early detection of issues in Indonesia's Free Nutritious Meal (MBG) program — from social media, news, and public reports in real-time.</p>

<p align="center"><a href="https://pantauin-web.vercel.app">https://pantauin-web.vercel.app</a></p>

---

## Features

- **Overview** — high-level dashboard summarizing active incidents, risk levels, and sentiment trends across regions
- **Risk Map** — interactive map for visualizing MBG procurement anomalies and MBG-related incidents (food poisoning, portion issues, distribution failures) by region
- **Pantau Insiden** — AI-powered live feed that crawls and analyzes signals from Twitter/X, Instagram, TikTok, and news outlets, with automated sentiment scoring and entity extraction
- **Kawalin** — real-time SPPG CCTV monitoring grid by province and region, sourced from local government streams
- **Laporin** — public incident reporting channel for citizens to submit MBG-related complaints directly

## Tech Stack

- [Next.js 15](https://nextjs.org) + TypeScript
- Tailwind CSS + Framer Motion

## Related

- [pantauin-crawling](https://github.com/randyver/pantauin-crawling) — AI agent for MBG data crawling & analysis

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).
