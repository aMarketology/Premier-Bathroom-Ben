# 100K Organic Search — ObjectWire Growth Plan

> **Goal:** Reach 100,000 monthly organic search sessions within 12 months, starting from ~330 indexed pages across 25+ verticals, powered by an automated SEO pipeline (content registry, news sitemap, structured data) that already exists.

---

## Current State — March 2026 Audit

| Metric | Value |
|---|---|
| Total pages (app/) | 330 |
| Registered in content registry | 344 entries |
| Top sections | Winter Olympics (32), Video Games (28), YouTube (25), News (24) |
| Categories covered | 25+ (YouTube, Sports, Technology, Gaming, News, Entertainment, Finance, etc.) |
| SEO infrastructure | ✅ Sitemap, ✅ News sitemap (auto from registry), ✅ JSON-LD on every article, ✅ robots.txt with Googlebot-News rules, ✅ canonical tags, ✅ OG metadata |
| Auto-sync | ✅ `prebuild` script registers new pages before every deploy |
| CMS (Supabase) | ✅ Wired — `/admin/editor` → Supabase → `/blog/[slug]` |
| Newsletter | ✅ Inline on every NewsArticle |
| Build time | ~15–20s (Turbopack) |

### Strengths

- **Deep topical authority** in Video Games, Tech, Finance, YouTube — Google rewards depth
- **Structured data on every page** — NewsArticle + BreadcrumbList JSON-LD, critical for Top Stories
- **News sitemap auto-feeds from registry** — zero friction to surface new articles to Google News
- **Component library (NewsArticle, ObjectDesign)** enables fast article output with consistent schema
- **Topic hub architecture** — `/video-games/gta-6`, `/video-games/forza-horizon-6`, etc. create internal link clusters

### Gaps

- Many pages have generic auto-synced descriptions ("ObjectWire coverage of...")
- `imageUrl` / `imageWidth` / `imageHeight` missing on most registry entries — blocks Google Top Stories eligibility
- YouTube section (43 pages, largest) has low search intent — review pages serve better than wiki profiles
- Category naming inconsistent (both "Tech" and "Technology", "Gaming" and "Video Games")
- No programmatic content generation for high-volume keyword clusters
- Some thin hub pages (e.g., `/social/meta`) with boilerplate content
- No internal linking automation — interlinks are manually added per article

---

## Phase 1 — Foundation Fixes (Weeks 1–3)

**Target: Fix the 80% of entries missing critical SEO fields, unify categories, and fill Google Top Stories requirements.**

### 1.1 Registry Data Quality Pass

Every content registry entry needs these filled:
- `description` — unique, 130–155 chars, contains the primary keyword
- `imageUrl` — hosted on objectwire.org or Supabase, min 1200×675 (16:9)
- `imageWidth` + `imageHeight` — Google requires exact dimensions for Top Stories
- `imageAlt` — descriptive alt text

**Action:** Write a `scripts/audit-registry.ts` script that flags entries with:
- Description < 80 chars or containing "ObjectWire coverage of"
- Missing `imageUrl`
- Missing `imageWidth` or `imageHeight`
- Duplicate descriptions

### 1.2 Category Consolidation

Merge overlapping categories to create clean topic signals:

| Merge From | Merge To |
|---|---|
| Tech | Technology |
| Gaming, Video Games | Gaming |
| SaaS | Technology |
| Social Media | Technology |
| Blog | (use actual topic category) |
| General | News |

### 1.3 Google News Publisher Center

- Register at [Google Publisher Center](https://publishercenter.google.com/)
- Verify `objectwire.org` ownership
- Submit `/news-sitemap.xml` as the news feed
- Label sections: Technology, Gaming, Entertainment, Finance, Science
- Upload publisher logo (min 1000×1000 square)

### 1.4 Google Search Console Validation

- Verify sitemap coverage (all 344 URLs indexed)
- Check for soft 404s on thin hub pages
- Submit news sitemap separately
- Fix any coverage issues flagged

---

## Phase 2 — Content Engine (Weeks 3–8)

**Target: Publish 5–7 articles per week across 4 pillar verticals, building topical authority clusters.**

### 2.1 Pillar Verticals (Priority Order)

Based on existing depth, search volume, and competition analysis:

| Pillar | Current Pages | Keyword Opportunity | Why |
|---|---|---|---|
| **Gaming** | 28 | GTA 6, Forza, Nintendo Switch 2, PS5 | Massive search volume, you already have deep pages. Every game announcement = traffic spike |
| **Tech / AI** | 54 (Tech+Technology combined) | OpenAI, Google AI, Apple, Nvidia | Breaking AI news has insatiable demand. You cover Google, Apple, Nvidia, OpenAI already |
| **Entertainment** | 21 | Streaming news, studio deals, movie/show stuff | Growing section. The Paramount/WBD article is the template |
| **Finance / Business** | 17 | Bank of America, crypto, IPOs, startup funding | Established presence. B2B + retail investor keywords |

### 2.2 Content Cadence

| Day | Article Type | Pillar | Example |
|---|---|---|---|
| Monday | Breaking news | Tech/AI | "OpenAI Announces GPT-5 Pricing — $30/Month for Pro" |
| Tuesday | Deep-dive / analysis | Gaming | "GTA 6 Pre-Orders Tracker: Every Edition, Price, & Platform" |
| Wednesday | Breaking news | Entertainment | "Netflix Reports Q1 2026 Subscribers — 310M Milestone" |
| Thursday | Evergreen guide | Gaming/Tech | "Best Gaming Monitors 2026 — 4K 240Hz Buyer's Guide" |
| Friday | Breaking news | Finance | "Fed Holds Rates at 4.75% — March 2026 FOMC Decision" |
| Saturday | Weekend feature | Any | "How Japan's Touge Culture Shaped Forza Horizon 6's Map" |
| Sunday | Update / roundup | Any | "This Week in AI: March 1–7, 2026" |

### 2.3 SEO-First Article Template

Every article must ship with:

```
✅ metadata.title        — keyword + brand ("Forza Horizon 6 Release Date | ObjectWire")
✅ metadata.description  — 130–155 chars, primary keyword in first 60 chars
✅ metadata.keywords     — 10–15 long-tail keywords
✅ canonical URL         — always set
✅ openGraph             — title, description, image (1200×675), publishedTime, section
✅ NewsArticleSchema     — matches registry entry exactly
✅ SEOWrapper            — slug pointed at registry
✅ Breadcrumb            — 3–4 levels deep
✅ H2 headings           — one per major section, keyword-rich
✅ Internal links        — 4–6 interlinks to related ObjectWire pages
✅ thumbnail + imageUrl  — real image, 1200px+ wide, hosted on objectwire.org
```

### 2.4 Supabase for Volume

Once the cadence exceeds 5 articles/week, shift all new content to `/admin/editor` → Supabase. Benefits:
- No code deploys for new articles
- Draft → Publish workflow
- Batch scheduling
- No build time growth (dynamic route, single `page.tsx`)

---

## Phase 3 — Keyword Clusters & Topic Authority (Weeks 4–12)

**Target: Build deep clusters around 10 high-volume keyword families to dominate long-tail.**

### 3.1 Cluster Architecture

Each cluster follows this pattern:

```
Hub Page (high authority, broad keyword)
 ├── Sub-article 1 (specific long-tail)
 ├── Sub-article 2 (specific long-tail)
 ├── Sub-article 3 (specific long-tail)
 └── Sub-article N
```

All sub-articles link back to the hub. The hub links to all sub-articles. Internal linking is **the single highest-leverage SEO tactic** for a new publisher.

### 3.2 Priority Clusters

| # | Hub URL | Hub Keyword (monthly search vol est.) | Sub-Articles Needed |
|---|---|---|---|
| 1 | `/video-games/gta-6` | "GTA 6" (5M+/mo) | Pre-orders, price by country, PC release, map size, characters, online mode, system requirements |
| 2 | `/video-games/forza-horizon-6` | "Forza Horizon 6" (500K+/mo) | Car list, map breakdown, editions comparison, Japan routes, PC specs |
| 3 | `/video-games/switch2` | "Nintendo Switch 2" (2M+/mo) | Switch 2 specs, launch games, price, backwards compatibility, Joy-Con 2 |
| 4 | `/apple` | "Apple news" (1M+/mo) | iPhone 18, WWDC 2026, Core AI framework, Mac Mini M5, Apple TV F1 |
| 5 | `/google` | "Google news" (2M+/mo) | Gemini 3, Google AI Plus, Agentic Vision, Pixel 11 |
| 6 | `/nvidia` | "Nvidia news" (800K+/mo) | RTX 5090, CUDA updates, AI hardware, Blackwell B200 |
| 7 | `/open-ai` | "OpenAI" (3M+/mo) | GPT-5, ChatGPT Pro, o3 model, Sora video, pricing changes |
| 8 | `/winter-olympics` | "2026 Winter Olympics" (1M+ seasonal) | Medal tracker, Team USA, event schedule, Milan Cortina travel |
| 9 | `/world-cup` | "2026 World Cup" (5M+ seasonal) | Groups, schedule, venues, USA cities, ticket prices |
| 10 | `/finance` | "finance news" (500K+/mo) | Fed rate decisions, bank earnings, crypto regulation |

### 3.3 Cluster Completion Targets

| Month | Clusters Complete | Total New Articles | Cumulative Site Pages |
|---|---|---|---|
| Month 1 | 2 (GTA 6, Forza) | 30 | 360 |
| Month 2 | 4 (+Switch 2, Apple) | 60 | 390 |
| Month 3 | 6 (+Google, Nvidia) | 90 | 420 |
| Month 4 | 8 (+OpenAI, Olympics) | 120 | 450 |
| Month 5 | 10 (+World Cup, Finance) | 150 | 480 |
| Month 6–12 | Expand + maintain | 300+ | 630+ |

---

## Phase 4 — Google News Acceleration (Ongoing)

**Target: Consistent presence in Google News Top Stories carousel.**

### 4.1 Top Stories Eligibility Checklist

Every article that should reach Google News **must** have all of these:

| Requirement | ObjectWire Status | Notes |
|---|---|---|
| Published within last 2 days | ✅ Auto via `publishDate` filter in news-sitemap | Already working |
| `NewsArticle` JSON-LD on page | ✅ `NewsArticleSchema` component | Already on every article |
| Listed in news sitemap | ✅ Auto from content registry | Wired in `app/news-sitemap.xml/route.ts` |
| `imageUrl` ≥ 1200px wide | ⚠️ Missing on most entries | **Must fix — Phase 1** |
| Publisher registered in Google Publisher Center | ❌ Not yet done | **Must do — Phase 1** |
| Transparent authorship (real author name) | ✅ Author on every article | Some use "ObjectWire Editorial" — add real names |
| Original reporting, not rewrites | ✅ Original analysis + sourcing | Maintain this standard |

### 4.2 Breaking News Velocity

Google News rewards **first-to-publish**. When a story breaks:

1. Publish a 300-word stub within 30 minutes using the admin editor
2. Set `status: 'published'` immediately — it enters the news sitemap
3. Update the article with depth over the next 2 hours
4. Google re-crawls news sitemaps every 5–15 minutes

The Supabase CMS supports this workflow — no build/deploy needed for new articles.

### 4.3 Recency Signal

Google News devalues articles after 48 hours. Strategy:

- **Update articles** when new facts emerge — change `modifiedDate` in the registry
- **Publish follow-up articles** under the same hub rather than updating a stale URL
- **Weekly roundups** ("This Week in AI") capture tail-end traffic from multiple keywords

---

## Phase 5 — Technical SEO & Performance (Weeks 2–6)

### 5.1 Internal Linking Automation

Build a `RelatedArticles` component that reads the content registry and auto-suggests articles by matching `tags[]`:

```
Current article tags: ["GTA 6", "Rockstar Games", "Pre-orders"]
        ↓ scan registry for tag overlap
Suggested: GTA 6 hub, GTA 6 pre-orders tracker, Take-Two earnings
```

Place this at the bottom of every article automatically. Target: 4–6 internal links per article, zero manual effort.

### 5.2 Breadcrumb Depth

Current: Most articles have 2–3 breadcrumb levels.
Target: Every article has 3–4+ levels reflecting the hub/cluster hierarchy.

```
Home → Video Games → Racing → Forza Horizon 6
Home → Video Games → GTA 6 → Pre-Orders Tracker
Home → Technology → Google → Gemini 3 Flash
```

### 5.3 Page Speed

Current: Static pages via Next.js are fast. Ensure:
- All images use `next/image` with proper `width`/`height` to avoid CLS
- Lazy-load non-critical images below fold
- Keep first paint under 1.5s (Turbopack SSG already achieves this)

### 5.4 Mobile Optimization

- Verify all tables use `overflow-x-auto` (already done on NewsArticle tables)
- Test stat grids on 320px viewport
- Ensure YouTube embeds are lazy-loaded (`loading="lazy"` on iframe)

---

## Phase 6 — Programmatic Content (Months 3–6)

### 6.1 Definition Pages

The `/define/` section (13 pages) is a programmatic SEO goldmine. Scale to 200+ definition pages:

- "What is CUDA" → `/define/cuda`
- "What is LLM" → `/define/llm`
- "What is Tokamak" → `/define/tokamak`
- Template: 300-word definition + related ObjectWire articles + schema.org `DefinedTerm` markup

Each definition page:
- Targets a "what is X" keyword (high volume, low competition)
- Links to 3–5 related ObjectWire articles
- Takes < 10 minutes to create with a standard template

### 6.2 Company Profiles

Expand the SaaS/Tech profiles (`/saas/cognyte`, `/saas/hashicorp`) to cover 100+ companies:

- Template: Overview, Key Facts table, Recent News, Stock/Funding data, Related Coverage
- These pages capture "[company name] wiki" and "[company name] overview" searches year-round
- Each profile links to news articles mentioning that company

### 6.3 Event Pages

Scale `/events/` before major 2026 events:
- WWDC 2026
- E3 / Summer Game Fest 2026
- GTC 2026 (Nvidia)
- Google I/O 2026
- 2026 World Cup (pre-event content)
- 2026 Winter Olympics (already strong — maintain)

---

## Phase 7 — Distribution & Amplification (Ongoing)

### 7.1 Google Discover

Google Discover (mobile feed) drives massive traffic for publishers. Requirements:
- High-quality hero images (1200px+) ← Phase 1 image fix
- Engaging titles (not clickbait, but compelling)
- E-E-A-T signals (author pages, about page, editorial standards)

ObjectWire already has `/about`, `/editorial-standards`, `/authors/*` — these are E-E-A-T signals. Ensure they're linked from every article footer (already done via the `NewsArticle` author card).

### 7.2 Bing News

- Register at [Bing News PubHub](https://www.bing.com/webmasters/pubhub)
- Submit the same news sitemap
- Bing indexes faster than Google for new publishers

### 7.3 Apple News

- Register at [Apple News Publisher](https://developer.apple.com/news-publisher/)
- RSS feed (`/rss.xml/`) is already built — submit it
- Apple News drives significant mobile traffic for news publishers

---

## Milestone Projections

| Month | Est. Monthly Organic Sessions | Indexed Pages | Key Driver |
|---|---|---|---|
| 1 | 2,000–5,000 | 360 | Foundation fixes + registry cleanup + Publisher Center |
| 2 | 5,000–12,000 | 400 | Gaming cluster completion (GTA 6, Forza, Switch 2) |
| 3 | 12,000–25,000 | 450 | Google News inclusion + tech cluster + first Discover hits |
| 4 | 20,000–40,000 | 500 | Compound growth from clusters + breaking news velocity |
| 5 | 30,000–50,000 | 550 | World Cup pre-event content + definition pages scaling |
| 6 | 40,000–65,000 | 600+ | Seasonal peaks (E3, WWDC) + programmatic content |
| 8 | 60,000–80,000 | 700+ | Topical authority established in 3+ verticals |
| 10 | 80,000–95,000 | 800+ | Google Discover traffic + Bing/Apple News |
| 12 | **100,000+** | 900+ | Compound authority across all pillars |

---

## Key Metrics to Track Weekly

| Metric | Tool | Target |
|---|---|---|
| Indexed pages | Google Search Console → Coverage | 100% of published pages |
| Average position | GSC → Performance → Queries | < 20 for pillar keywords |
| Click-through rate | GSC → Performance | > 3% (improve titles if below) |
| Top Stories appearances | GSC → Performance → Search Appearance | 10+/week by month 3 |
| News sitemap articles | `/news-sitemap.xml` | 3–5 articles within 2-day window at all times |
| Internal links per page | Manual audit / Screaming Frog | 4–6 minimum |
| Core Web Vitals | GSC → Core Web Vitals | All green (LCP < 2.5s, CLS < 0.1) |
| Registry completeness | `scripts/audit-registry.ts` | 0 entries with missing image/description |

---

## Immediate Action Items (This Week)

1. **Register ObjectWire in Google Publisher Center** — unlocks Google News eligibility
2. **Run registry audit script** — identify all entries missing `imageUrl` and fix top 50
3. **Consolidate "Tech" → "Technology" and "Gaming" → merge with "Video Games"** in registry + sync script
4. **Write 3 GTA 6 cluster sub-articles** — pre-orders, PC release, system requirements
5. **Submit sitemaps in Google Search Console** — both `/sitemap.xml` and `/news-sitemap.xml`
6. **Register on Bing News PubHub** — free, takes 10 minutes
7. **Add `loading="lazy"` to YouTube iframe embeds** across all articles

---

*This plan builds on ObjectWire's existing technical infrastructure — the content registry, auto-sync, news sitemap, structured data, and Supabase CMS are all operational. The gap is content volume and data completeness, not tooling.*
