# RKBSports.app Content Status

Last reviewed: June 13, 2026

## Current Totals

- Calculators and calculator-style tools: 21
- Markdown guide articles: 21
- Static/generated pages in the production build: 58

## Calculator Coverage

The site includes working calculators for run rate, required run rate, NRR,
T20/ODI variations, batting and bowling metrics, super over planning, chase
planning, fantasy points, qualification scenarios, balls-to-overs conversion,
follow-on checks, and a custom points table creator.

All calculator pages are manual tools. They do not use live scores, demo APIs,
official team branding, player photos, or league logos.

## Guide Coverage

The Markdown guide library covers:

- Cricket overs and balls
- Run rate and required run rate
- Net run rate and NRR strategy
- T20 and ODI run rate strategy
- Powerplay, free hit, follow-on, and super over rules
- Points table and qualification scenarios
- Batting and bowling metrics
- Generic fantasy cricket points

Earlier starter guides were reviewed and expanded with additional context and
FAQs to reduce thin-content risk.

## PWA Status

PWA foundation is active:

- Manifest exists at `/manifest.webmanifest`.
- Original placeholder icons exist in `public/icons/`.
- Service worker exists at `public/sw.js`.
- Offline fallback exists at `public/offline.html`.
- Install hint and offline banner are client-side and local-only.

The service worker is designed to avoid caching analytics, ads, external
third-party resources, and non-GET requests.

## SEO Status

- Static pages use shared SEO metadata helpers.
- Calculator pages use calculator metadata from `src/data/calculators.ts`.
- Guide pages use Markdown frontmatter metadata.
- Canonical URLs are set through shared metadata helpers.
- Article, FAQ, breadcrumb, website, organization, and calculator schemas are present where relevant.
- Sitemap includes static pages, guide pages, and calculator pages.
- Robots allows indexing and points to the sitemap.

## AdSense Readiness

Trust pages are present:

- About
- Contact
- Privacy Policy
- Terms and Conditions
- Disclaimer
- Status

Footer navigation exposes important trust and policy pages. Contact emails are
visible. Cookie consent is present. `public/ads.txt` contains only a safe
placeholder and no fake publisher ID.

## Current Risk Notes

- Real Google Analytics and Search Console values must be added only when ready.
- Real AdSense publisher information must not be added until approval.
- Any future guide expansion should follow `CONTENT_GUIDE.md` and avoid thin
  pages, copied content, official team/league branding, fake scores, and live
  data claims.

## Future Roadmap

- Add more high-quality guides only when they answer real search intent.
- Improve calculator UX based on real user feedback.
- Add optional import/export improvements for local dashboard and points table data.
- Add real AdSense code only after approval and layout testing.
- Consider final owned brand icons before broader PWA or TWA packaging.
