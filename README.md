# RAYCAT

Official $RAYCAT Phase 1 website.

## Run locally

```bash
npm install
npm run dev
```

Build with `npm run build` and run with `npm start`.

## Structure

- `app/page.tsx` — homepage sections and live dashboard
- `app/museum/page.tsx` — Phase 2 museum placeholder
- `lib/config.ts` — mint, StonkFun API, and optional social/action URLs
- `lib/stonkfun.ts` — typed data access and caching layer
- `public/image/` — RayCat artwork and meme assets

Optional `buyUrl`, `chartUrl`, `xUrl`, and `telegramUrl` values are intentionally empty until official destinations are configured. The dashboard reads current token, rewards, and burns data from StonkFun with revalidation instead of hardcoded values.
