# RKBSports.app Post-Deploy Checklist

Run this checklist after each production deployment.

## Core Pages

- [ ] Check homepage at `https://www.rkbsports.app/`.
- [ ] Check `/tools`.
- [ ] Check `/guides`.
- [ ] Check `/dashboard`.
- [ ] Check `/about`.
- [ ] Check `/contact`.
- [ ] Check `/privacy-policy`.
- [ ] Check `/terms-and-conditions`.
- [ ] Check `/disclaimer`.
- [ ] Check `/status`.

## Calculators

- [ ] Open every calculator from the Tools page.
- [ ] Test Run Rate Calculator.
- [ ] Test Required Run Rate Calculator.
- [ ] Test NRR Calculator.
- [ ] Test T20/ODI calculator variation pages.
- [ ] Test Points Table Calculator save/load/export.
- [ ] Confirm invalid overs such as `4.6` show friendly errors.

## Guides

- [ ] Check `/guides` list page.
- [ ] Open several guide detail pages.
- [ ] Confirm related tools and related guides work.
- [ ] Confirm FAQ sections render.

## PWA

- [ ] Check `/manifest.webmanifest`.
- [ ] Check `/icons/icon.svg`.
- [ ] Check `/icons/maskable-icon.svg`.
- [ ] Confirm service worker registration in browser DevTools.
- [ ] Confirm offline fallback works after one successful online visit.
- [ ] Confirm PWA install prompt behavior on a supported browser.

## SEO

- [ ] Check `https://www.rkbsports.app/sitemap.xml`.
- [ ] Check `https://www.rkbsports.app/robots.txt`.
- [ ] Confirm Search Console verification meta tag appears when env value is set.
- [ ] Submit sitemap in Search Console.
- [ ] Confirm canonical URLs use `https://www.rkbsports.app`.

## AdSense

- [ ] Check `https://www.rkbsports.app/ads.txt`.
- [ ] Confirm `ads.txt` has no fake publisher ID before approval.
- [ ] Confirm About, Contact, Privacy Policy, Terms, and Disclaimer are accessible.
- [ ] Confirm no streaming links, fake live scores, copied media, team logos, or official league branding.

## UX And Features

- [ ] Check mobile layout for homepage, tools, guides, dashboard, and calculator pages.
- [ ] Test dark mode.
- [ ] Test light mode.
- [ ] Test cookie consent banner.
- [ ] Test saved teams.
- [ ] Test recent calculations hub.
- [ ] Test tournament drafts.
- [ ] Test share card copy.
- [ ] Test share card PNG download where available.
- [ ] Test WhatsApp share buttons.

## Performance

- [ ] Run Lighthouse mobile.
- [ ] Run Lighthouse desktop.
- [ ] Review Core Web Vitals signals.
- [ ] Confirm no unexpected console errors.
- [ ] Confirm analytics scripts load only when `NEXT_PUBLIC_GA_ID` is set.
