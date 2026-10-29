# 🌱 EcoQuiz — Learn the planet. Level up your impact.

> **CHE110 Environmental Studies — CA1 Group Assignment (Topic 16: Environmental Quiz and Gamification App)**  
> **Institution:** Lovely Professional University (LPU)  
> **Degree:** First-Year B.Tech Computer Science and Engineering  
> **Team Members:**  
> - **Krishan Chander Khjuriya** (spelled as on official course list)  
> - **Aman Dadwal**  
> - **Harsh Srivastava**  

---

## 🌍 Executive Summary

**EcoQuiz** is a high-performance, browser-based environmental gamification platform engineered to replace vague eco-feelings with empirical planetary metrics. Everyday consumer choices regarding water, energy, waste, climate, and biodiversity are frequently driven by intuition rather than verified numbers. EcoQuiz bridges this gap through short, timed learning rounds, deterministic daily challenges, 5 evolution levels, 10 verifiable achievement badges, a searchable scientific fact library, and full legal/privacy disclosures.

---

## 🎯 Core Academic Objectives & Use Cases

- **Immediate Retrieval Practice & Error Correction:** Questions are attempted first under a focused timer, immediately followed by the empirical explanation and source citation.
- **Empirical Grounding:** Every factual metric (e.g. 11,000 litres lost to tap leaks, 95% energy savings in aluminium recycling, 75% LED efficiency, 1.1°C global temperature anomaly) is cited to recognized institutions.
- **100% Client-Side Privacy:** Zero telemetry, no cookies, no third-party trackers. All user stats, streak history, levels, and badges are stored strictly in browser `localStorage` (`ecoquiz:v1`).
- **Target Applications:**
  1. *Classroom Warm-ups:* 2-minute interactive rounds to kick off university environmental science lectures.
  2. *Campus Eco-Clubs:* Friendly tournaments and device leaderboards during sustainability drives.
  3. *Awareness Drives:* Interactive kiosks for Earth Day and college environmental fests.
  4. *Exam Revision:* Evidence-backed revision companion for students preparing for CHE110 assessments.

---

## ⚡ Technical Architecture & Stack

| Layer | Technology | Purpose |
|---|---|---|
| **Core Framework** | React 18 & TypeScript | Type-safe, component-driven UI architecture |
| **Build & Bundler** | Vite 5 | Sub-second HMR and code-split production chunks |
| **Styling** | Tailwind CSS & PostCSS | Editorial design tokens, fluid typography, dark/light themes |
| **Sound Synthesis** | Web Audio API | Zero-network procedural chime and tick synthesizer (off by default) |
| **Visual Effects** | Custom Inline SVG & canvas-confetti | Scroll-linked sprout growth animation and celebration bursts |
| **Testing** | Vitest | 26 automated unit tests for scoring, daily RNG, levels, and badges |

---

## 🎨 Design System & Palette Tokens

EcoQuiz features a cinematic, obsidian and bio-emerald visual identity:

- **Obsidian Deep Slate Background:** `#0B0F12` (Velvety dark surface with subtle ambient lighting)
- **Bio-Emerald Vivid Accent:** `#10B981` (Growth highlights, progress bars, interactive rings)
- **Mint Luminous Accent:** `#34D399` / `#6EE7B7` (Gradients and focal points)
- **Porcelain / White Prose:** `#F8FAFC` (WCAG 2.1 AA compliant contrast ratio $>4.5:1$)
- **Muted Slate / Sage:** `#94A3B8` (Subtitles, metadata, and citation labels)
- **Card Surface & Border:** `bg-slate-900/60` / `border-white/10` with glassmorphic backdrop blur
- **Typography:**
  - *Headings:* `Fraunces` (Editorial serif with character)
  - *Prose & Body:* `Plus Jakarta Sans` / `Inter` (Fluid, highly legible sans-serif)
  - *Data & Badges:* `JetBrains Mono` (Technical, monospace tabular numbers)

---

## 🕹️ Game Rules & Mechanics

### 1. Scoring Formula
- **Base Points by Difficulty:**
  - Easy: **10 points**
  - Medium: **20 points**
  - Hard: **30 points**
- **Time Limits:**
  - Easy: **20 seconds**
  - Medium: **15 seconds**
  - Hard: **10 seconds**
- **Time Bonus:** Up to **10 bonus points**, scaled linearly to remaining seconds:  
  $$\text{TimeBonus} = \text{round}\left(\frac{\text{TimeLeft}}{\text{MaxTime}} \times 10\right)$$
- **Wrong or Timed-out Answers:** **0 points**.

### 2. Five Progression Levels
1. **Seedling:** 0 – 99 points 🌱
2. **Sprout:** 100 – 299 points 🌿
3. **Sapling:** 300 – 599 points 🪴
4. **Guardian:** 600 – 999 points 🌳
5. **Earth Guardian:** 1,000+ points 🌍

### 3. Ten Verifiable Badges
1. **First Round:** Complete at least 1 quiz round.
2. **Perfect Round:** Achieve 100% accuracy in a round with $\ge 5$ questions (confetti burst).
3. **Water Expert:** Water topic accuracy $\ge 80\%$ with $\ge 10$ questions answered.
4. **Daily Devotee:** Maintain an active 7-day consecutive streak.
5. **Five Topics:** Answer $\ge 1$ question correctly in all five topics (Waste, Water, Energy, Climate, Biodiversity).
6. **Lightning Reflexes:** Answer $\ge 3$ questions in a single round with $>50\%$ time remaining.
7. **Waste Warrior:** Waste topic accuracy $\ge 80\%$ with $\ge 10$ questions answered.
8. **Energy Pioneer:** Energy topic accuracy $\ge 80\%$ with $\ge 10$ questions answered.
9. **Library Scholar:** Inspect and study $\ge 10$ scientific facts in the Fact Library.
10. **Earth Guardian:** Reach the top rank of 1,000+ total knowledge points.

---

## 📁 Repository File Tree

```
ecoquiz/
├── index.html                   # HTML5 shell, SEO tags, preconnects & fonts
├── package.json                 # Project manifest & build/test scripts
├── postcss.config.js            # PostCSS plugin pipeline
├── tailwind.config.js           # Design tokens, palette & typography
├── tsconfig.json                # TypeScript strict compilation config
├── vite.config.ts               # Vite bundler & Vitest test runner setup
├── public/
│   ├── robots.txt               # Search engine crawl directives
│   └── sitemap.xml              # XML sitemap covering all routes (including /terms and /privacy)
├── src/
│   ├── main.tsx                 # React DOM mount entry
│   ├── App.tsx                  # Global state, theme/sound sync & routing
│   ├── index.css                # Tailwind directives & design tokens
│   ├── types/
│   │   └── index.ts             # Strict TypeScript models & interfaces
│   ├── data/
│   │   ├── questions.ts         # 56 peer-reviewed questions across 5 topics
│   │   ├── sources.ts           # 10 cited institutional frameworks
│   │   ├── badges.ts            # 10 badge definitions and criteria
│   │   └── levels.ts            # 5 level thresholds and progress math
│   ├── components/
│   │   ├── Navbar.tsx           # Sticky glass navbar with theme & sound toggles
│   │   ├── MobileTabBar.tsx     # Mobile-first bottom sticky tab navigation
│   │   ├── Footer.tsx           # Course attribution, team, legal links & placeholders
│   │   ├── HeroIllustration.tsx # Original inline SVG sprout that grows on scroll
│   │   └── BadgeToast.tsx       # Live status toast when badges unlock
│   ├── pages/
│   │   ├── HomePage.tsx         # Full-viewport hero, counters, facts & demo
│   │   ├── PlayPage.tsx         # Playable engine, timer, review & leaderboard
│   │   ├── LibraryPage.tsx      # Searchable & filterable 56-fact knowledge base
│   │   ├── AboutPage.tsx        # Project story, pedagogy, team & external links
│   │   ├── TermsPage.tsx        # Legal & academic terms of use
│   │   └── PrivacyPage.tsx      # Zero-telemetry client-side privacy policy
│   ├── utils/
│   │   ├── scoring.ts           # Base points & time-bonus scaling formulas
│   │   ├── daily.ts             # Deterministic PRNG daily question selection
│   │   ├── badgesEvaluator.ts   # Rule evaluation engine for badge unlocks
│   │   ├── sound.ts             # Web Audio API procedural sound synthesizer
│   │   ├── storage.ts           # LocalStorage reader/writer with JSON backup
│   │   └── share.ts             # Clean plain-text shareable scorecard generator
│   └── tests/
│       ├── scoring.test.ts      # Unit tests for scoring & timeouts
│       ├── daily.test.ts        # Unit tests for daily determinism
│       ├── levels.test.ts       # Unit tests for level thresholds & ring progress
│       └── badges.test.ts       # Unit tests for all 10 badge unlock rules
└── README.md                    # Comprehensive documentation & deployment guide
```

---

## 🚀 Setup, Run, Build & Test Instructions

### 1. Prerequisites
- **Node.js:** v18.0.0 or higher
- **npm:** v9.0.0 or higher

### 2. Install Dependencies
```bash
npm install
```

### 3. Run Development Server
```bash
npm run dev
```
Open `http://localhost:3000` in your web browser.

### 4. Run Automated Unit Tests (Vitest)
```bash
npm test
```
Runs all 26 test suites covering scoring math, level progression, daily challenge determinism, and badge evaluation.

### 5. Build for Production
```bash
npm run build
```
Creates an optimized, tree-shaken, code-split production bundle inside the `dist/` directory.

### 6. Preview Production Build
```bash
npm run preview
```

### 7. Run Production Server with SPA Fallback
```bash
npm run serve
```

### 8. Deploying Publicly
- **Instant Live Cloudflare Tunnel:** Double click `tunnel.bat` or run:
  ```bash
  cloudflared tunnel --url http://127.0.0.1:4173
  ```
- **Vercel / Netlify / Cloudflare Pages:**
  1. Build the production bundle: `npm run build`
  2. Deploy the `dist/` directory (static client-side SPA with zero server dependencies).
  3. Set build command to `npm run build` and output directory to `dist`.

---

## 📚 Question Sources & Fact-Checking Summary

EcoQuiz synthesizes all 56 questions from the following 10 authoritative organizations:

1. **US EPA WaterSense:** Residential faucet leakage standards, showerhead flow specifications ($\le 2.0$ gpm), and high-efficiency flush volumes.
2. **US Department of Energy (DOE):** LED energy savings ($\ge 75\%$), operational longevity ($25\times$), standby vampire loads ($5\text{--}10\%$), and heat pump efficiency gains.
3. **Intergovernmental Panel on Climate Change (IPCC):** AR6 global surface warming anomaly ($1.1^\circ\text{C}$), remaining carbon budgets, methane GWP20 ($80\text{--}84\times$), and 2050 net-zero targets.
4. **IUCN Red List of Threatened Species:** Over 44,000 threatened species, amphibian extinction risk ($41\%$), coral reef vulnerability ($33\%$), and category definitions (VU, EN, CR).
5. **Ramsar Convention on Wetlands:** Peatland carbon density (storing twice as much carbon as all global forest biomass), Montreux Record, and coastal blue carbon habitats.
6. **CITES:** Appendices I and II commercial wildlife trade regulations and treaty adoption timeline (1973).
7. **Montreal Protocol:** Phase-out of chlorofluorocarbons (CFCs), Antarctic springtime ozone recovery, and the 2016 Kigali Amendment on hydrofluorocarbons (HFCs).
8. **Paris Agreement (UNFCCC):** Article 2 temperature threshold (holding warming well below $2.0^\circ\text{C}$ and pursuing $1.5^\circ\text{C}$), and 5-year NDC communication cycles.
9. **India's E-Waste (Management) Rules, 2022:** Extended Producer Responsibility (EPR) mandates, Central Pollution Control Board (CPCB) governance, and Chapter V solar PV inclusion.
10. **Water Footprint Network:** Virtual water benchmarks for cotton shirts ($\sim 2,700\text{ L}$) and beef ($\sim 15,400\text{ L/kg}$), alongside green, blue, and grey water definitions.

> *Mandatory Citation Note:* "Check the original report before quoting a figure." Figures are synthesized for educational purposes in CHE110.

---

## 🔗 Official Project Links (Placeholders)
- **Demo Video:** `[DEMO_VIDEO_URL]`
- **Instagram Reel:** `[INSTAGRAM_LINK]`
- **YouTube Shorts:** `[YOUTUBE_SHORTS_LINK]`
- **GitHub Repository:** `[GITHUB_REPO_LINK]`
