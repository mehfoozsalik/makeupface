# MakeUp Face Ai — Free AI Makeup Analysis, Face Shape Tools & Beauty Guides

**[MakeUp Face Ai](https://makeupface.app/)** is a free AI beauty platform: upload a selfie (photos stay in your browser), learn your face shape and features, and get makeup recommendations with placement maps you can use at home.

**Live site:** [https://makeupface.app](https://makeupface.app/)

[Analyze my face](https://makeupface.app/analyze/) · [Beauty tools](https://makeupface.app/tools/) · [Makeup Hub](https://makeupface.app/makeup/) · [Blog](https://makeupface.app/blog/) · [Guides](https://makeupface.app/guides/) · [Try-on](https://makeupface.app/try-on/)

---

## Why MakeUp Face Ai

- **On-device face analysis** with MediaPipe (no photo upload to the AI API)
- **Personalized makeup guidance** for eyes, lips, cheeks, and face shape
- **25 free beauty tools** for undertone, foundation, blush, contour, brows, and more
- **SEO education hubs** for [face makeup](https://makeupface.app/face-makeup/), [eye makeup](https://makeupface.app/eye-makeup/), and [lip makeup](https://makeupface.app/lip-makeup/)
- **Daily AI blog** with practical mirror tips: [MakeUp Face Ai Blog](https://makeupface.app/blog/)

---

## Free AI makeup tools (absolute links)

Use these pages directly. Each URL is a live product page on MakeUp Face Ai.

| Tool | Absolute URL |
| --- | --- |
| Face shape detector | https://makeupface.app/tools/face-shape-detector/ |
| Eye shape detector | https://makeupface.app/tools/eye-shape-detector/ |
| Skin undertone test | https://makeupface.app/tools/skin-undertone-test/ |
| Foundation shade finder | https://makeupface.app/tools/foundation-shade-finder/ |
| Blush placement finder | https://makeupface.app/tools/blush-placement-finder/ |
| Contour placement guide | https://makeupface.app/tools/contour-placement-guide/ |
| Eyebrow shaping guide | https://makeupface.app/tools/eyebrow-shaping-guide/ |
| Lipstick shade finder | https://makeupface.app/tools/lipstick-shade-finder/ |
| Lip liner guide | https://makeupface.app/tools/lip-liner-guide/ |
| Eyeliner style finder | https://makeupface.app/tools/eyeliner-style-finder/ |
| Eyeshadow placement guide | https://makeupface.app/tools/eyeshadow-placement-guide/ |
| Makeup routine generator | https://makeupface.app/tools/makeup-routine-generator/ |
| Everyday makeup finder | https://makeupface.app/tools/everyday-makeup-finder/ |
| Wedding makeup finder | https://makeupface.app/tools/wedding-makeup-finder/ |
| Full tools index | https://makeupface.app/tools/ |

More analyzers: [face symmetry test](https://makeupface.app/tools/face-symmetry-test/), [jawline shape detector](https://makeupface.app/tools/jawline-shape-detector/), [cheekbone analyzer](https://makeupface.app/tools/cheekbone-analyzer/), [makeup style finder](https://makeupface.app/tools/makeup-style-finder/).

---

## Makeup looks & tutorials

Browse the [makeup looks library](https://makeupface.app/makeup-looks/) or jump to a look:

- [Natural makeup](https://makeupface.app/makeup-looks/natural-makeup/)
- [No-makeup makeup](https://makeupface.app/makeup-looks/no-makeup-makeup/)
- [Soft glam](https://makeupface.app/makeup-looks/soft-glam/)
- [Clean girl makeup](https://makeupface.app/makeup-looks/clean-girl-makeup/)
- [Korean makeup](https://makeupface.app/makeup-looks/korean-makeup/)
- [Office makeup](https://makeupface.app/makeup-looks/office-makeup/)
- [Date night makeup](https://makeupface.app/makeup-looks/date-night-makeup/)
- [Bridal makeup](https://makeupface.app/makeup-looks/bridal-makeup/)
- [Smokey eye](https://makeupface.app/makeup-looks/smokey-eye/)
- [Makeup by face shape](https://makeupface.app/makeup-looks-by-face-shape/)
- [Cat face makeup](https://makeupface.app/cat-face-makeup/)

---

## Beauty guides worth bookmarking

Editorial how-tos on [MakeUp Face Ai Guides](https://makeupface.app/guides/):

- [Undertone vs surface tone](https://makeupface.app/guides/undertone-vs-surface-tone/)
- [Blush placement by face shape](https://makeupface.app/guides/blush-placement-by-face-shape/)
- [Contour for round faces](https://makeupface.app/guides/contour-for-round-faces/)
- [Eyeshadow for hooded eyes](https://makeupface.app/guides/eyeshadow-for-hooded-eyes/)
- [Eyebrow mapping basics](https://makeupface.app/guides/eyebrow-mapping-basics/)
- [Skin prep before makeup](https://makeupface.app/guides/skin-prep-before-makeup/)
- [Face primer guide](https://makeupface.app/guides/face-primer-makeup-primer/)
- [Wedding makeup timeline](https://makeupface.app/guides/wedding-makeup-timeline/)
- [Soft glam eyes](https://makeupface.app/guides/soft-glam-eyes/)

---

## Start here (product entry points)

1. **[AI Makeup Assistant](https://makeupface.app/analyze/)** — multi-step face analysis and recommendations  
2. **[Look Try-On](https://makeupface.app/try-on/)** — inspiration photo guidance without sending photos to the API  
3. **[Makeup Hub](https://makeupface.app/makeup/)** — daily desk posts for face, eyes, and lips  
4. **[Saved analysis](https://makeupface.app/analysis/)** — reports stored locally in your browser  

---

## Privacy model (trust signal)

1. Photos stay in the browser.  
2. MediaPipe Face Landmarker runs on-device.  
3. The recommendation API receives measurements and preferences only, never image pixels.  
4. Saved reports use `localStorage` without image data.  

Read more: [Privacy](https://makeupface.app/privacy/) · [Terms](https://makeupface.app/terms/) · [About](https://makeupface.app/about/)

---

## Keywords this project targets

`AI makeup`, `face shape detector`, `eye shape detector`, `foundation shade finder`, `undertone test`, `blush placement`, `contour guide`, `hooded eyes makeup`, `soft glam tutorial`, `clean girl makeup`, `makeup by face shape`, `on-device face analysis`, `free beauty tools`

Canonical brand and homepage: **[MakeUp Face Ai](https://makeupface.app/)**

---

## Stack (for developers)

- Next.js App Router + TypeScript + Tailwind CSS  
- MediaPipe Face Landmarker (browser-only WASM)  
- DeepSeek API via Route Handlers (structured JSON only)  
- Zustand, Zod, React Hook Form, Motion, Sonner, Recharts, Lucide  
- Daily blog generation + Unsplash images (`npm run blog:generate`)

### Local setup

```bash
npm install
cp .env.example .env.local
# Set DEEPSEEK_API_KEY, UNSPLASH_ACCESS_KEY, NEXT_PUBLIC_APP_URL=https://makeupface.app
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Environment

| Variable | Where | Purpose |
| --- | --- | --- |
| `DEEPSEEK_API_KEY` | Server | AI makeup recommendations + daily blog |
| `DEEPSEEK_MODEL` | Server | Defaults to `deepseek-chat` |
| `UNSPLASH_ACCESS_KEY` | Server | Blog cover / inline photos |
| `CRON_SECRET` | Server | Protects `/api/cron/generate-blog` |
| `NEXT_PUBLIC_APP_URL` | Public | Canonical URLs, sitemap, OG (`https://makeupface.app`) |

Never expose `DEEPSEEK_API_KEY` to client code.

### Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
npm run blog:generate
npm run blog:generate:force
```

---

## Related SEO hubs (share these URLs)

| Page | Absolute URL |
| --- | --- |
| Homepage | https://makeupface.app/ |
| Makeup Hub | https://makeupface.app/makeup/ |
| Face makeup | https://makeupface.app/face-makeup/ |
| Eye makeup | https://makeupface.app/eye-makeup/ |
| Lip makeup | https://makeupface.app/lip-makeup/ |
| Makeup looks | https://makeupface.app/makeup-looks/ |
| Makeup by face shape | https://makeupface.app/makeup-looks-by-face-shape/ |
| Blog | https://makeupface.app/blog/ |
| Tools | https://makeupface.app/tools/ |
| Guides | https://makeupface.app/guides/ |
| Analyze | https://makeupface.app/analyze/ |
| Try-on | https://makeupface.app/try-on/ |
| Sitemap | https://makeupface.app/sitemap.xml |

---

## Notes

- Face / eye / brow / lip labels are **heuristic** from landmarks. Confidence and uncertainty are shown; hooded and monolid results especially need user confirmation.  
- Educational content is not medical or dermatological advice.  
- Brand product guides (for example Clinique) are unaffiliated editorials.  

---

## License & attribution

Private application source. Product and content © MakeUp Face Ai.  
Live product: [https://makeupface.app](https://makeupface.app/)
