# RKBSports.app

RKBSports.app is a production-ready cricket tools website built with Next.js 14
App Router, TypeScript, and Tailwind CSS. It provides manual cricket
calculators, guide articles, static information pages, PWA support, and
AdSense-ready layout placeholders.

The site does not include streaming features, fake live scores, copyrighted
sports images, player photos, team logos, official league branding, or demo API
data.

## Local development

```bash
npm install
npm run dev
```

Open http://localhost:3000 in your browser.

## Production build

```bash
npm run lint
npm run build
npm run start
```

Run lint and build before every deployment.

## Environment variables

Create a local `.env.local` file when needed:

```bash
NEXT_PUBLIC_SITE_URL=https://www.rkbsports.app/
NEXT_PUBLIC_GA_ID=
NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=
```

- `NEXT_PUBLIC_SITE_URL` should match the production domain.
- `NEXT_PUBLIC_GA_ID` enables Google Analytics only when a real GA ID is set.
- `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` outputs a Search Console verification
  meta tag only when a real verification value is set.

## Vercel deployment

1. Push the project to a Git repository.
2. Import the repository in Vercel.
3. Use the **Next.js** framework preset.
4. Set the build command to `npm run build`.
5. Leave output handling to Next.js and Vercel.
6. Add environment variables in Vercel Project Settings:

```bash
NEXT_PUBLIC_SITE_URL=https://www.rkbsports.app/
NEXT_PUBLIC_GA_ID=
NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=
```

7. Run `npm run build` locally before deploying.
8. Deploy and confirm the Vercel build completes successfully.
9. Visit the production URL and test homepage, tools, guides, calculator pages,
   static pages, PWA install behavior, and offline fallback.

## Custom domain checklist

For `www.rkbsports.app` and `rkbsports.app`:

- Add both domains in Vercel.
- Configure DNS records as Vercel recommends.
- Set `www.rkbsports.app` as the preferred production domain.
- Redirect `rkbsports.app` to `www.rkbsports.app` if possible.
- Keep `NEXT_PUBLIC_SITE_URL` set to `https://www.rkbsports.app/`.
- Confirm `robots.txt`, `sitemap.xml`, manifest, service worker, and canonical
  URLs load correctly after DNS propagation.

## Google Analytics setup

Analytics is handled by `src/components/analytics/Analytics.tsx`.

- Add a real GA measurement ID to `NEXT_PUBLIC_GA_ID`.
- If the variable is empty, no GA script is loaded.
- The service worker does not cache analytics scripts or third-party resources.
- Verify analytics only after deployment on the production domain.

## Search Console setup

- Create a Google Search Console property for the production domain.
- Add the verification value to `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`.
- Redeploy and confirm the meta tag is present in the page source.
- Submit `https://www.rkbsports.app/sitemap.xml` after launch.

## AdSense readiness

- `public/ads.txt` contains a safe placeholder comment only.
- Do not add a fake publisher ID.
- After AdSense approval, replace the placeholder with the real publisher line
  provided by Google.
- Ad placeholder components are visual placeholders only; no real ad code is
  included yet.
- The service worker intentionally avoids caching ad-related paths or external
  third-party resources.

## PWA and offline support

RKBSports.app includes a lightweight progressive web app foundation:

- `public/manifest.webmanifest` defines the app name, start URL, standalone
  display mode, dark theme colors, and safe generated icons.
- App icons are stored in `public/icons/` as original SVG assets with simple
  text and cricket-style shapes. They do not use copyrighted logos, team marks,
  player photos, or official branding.
- `public/sw.js` precaches the home page, tools and guides entry pages, offline
  fallback, manifest, icons, and current calculator pages.
- Page navigations use a network-first strategy with cached fallback.
- Same-origin static assets use a cache-first strategy.
- External resources, analytics, ads, non-GET requests, and API-style paths are
  not cached.
- `ServiceWorkerRegistration` registers the worker only in production-capable
  browsers and never blocks normal site usage if registration fails.
- `OfflineStatusBanner` shows when the browser is offline.
- `InstallHint` listens for the browser install prompt and stores dismissals in
  localStorage.

When calculator routes change, update `public/sw.js` so the precache list stays
current. Bump the cache version string to force old cached assets to be replaced.

For a future Android APK or Trusted Web Activity conversion, keep the PWA
manifest, icons, HTTPS deployment, service worker, and mobile-friendly pages in
place. Replace placeholder icons with final owned brand assets before app store
packaging.

## Lighthouse and post-deployment checks

After deployment, run Lighthouse in Chrome DevTools for mobile and desktop:

- Check Performance, Accessibility, Best Practices, and SEO.
- Test dark mode and light mode.
- Test offline behavior after one successful online visit.
- Confirm calculator forms, copy buttons, WhatsApp share links, download share
  cards, saved teams, and recent calculations still work.
- Confirm analytics and Search Console only use real environment values.

## Main routes

- `/`
- `/tools`
- `/guides`
- `/guides/[slug]`
- `/dashboard`
- `/status`
- `/about`
- `/contact`
- `/privacy-policy`
- `/terms-and-conditions`
- `/disclaimer`

## Local dashboard

The `/dashboard` page is a browser-only workspace for users. It does not use
login, a backend, a database, or an API.

- Saved Teams use `rkbsports:saved-teams`.
- Recent Calculations are read from each calculator's `rkbsports:*recent`
  localStorage key.
- Tournament Drafts use `rkbsports:tournament-drafts`.
- Points Table Calculator saved tables use `rkbsports:points-table-calculator`.
- Clear actions remove only local browser data on the current device.

Test the dashboard after calculator changes to confirm saved teams, recent
calculation summaries, tournament drafts, quick links, and clear buttons still
work in both dark and light mode.

## Points table calculator

The `/tools/points-table-calculator` page is a manual local-only points table
creator for school, club, friendly, and community tournaments.

- Users add and edit their own team names.
- Points default to wins x 2 plus no results x 1, but can be edited manually.
- NRR uses runs scored / overs faced minus runs conceded / overs bowled.
- Cricket overs use the shared validation utilities, so values such as `4.6`
  are rejected.
- Rankings sort by points, NRR, wins, then team name.
- Save/load/export features use localStorage and browser APIs only.
