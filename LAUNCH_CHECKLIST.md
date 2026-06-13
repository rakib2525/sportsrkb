# RKBSports.app Launch Checklist

Use this checklist before launching or relaunching the production site.

## Domain and DNS

- [ ] Confirm the canonical production domain is `www.rkbsports.app`.
- [ ] Add the root domain in Vercel.
- [ ] Add the `www` domain in Vercel.
- [ ] Configure DNS records exactly as Vercel recommends.
- [ ] Confirm HTTPS is active for all production domains.
- [ ] Redirect `rkbsports.app` to `www.rkbsports.app` if possible.

## Vercel

- [ ] Import the correct Git repository.
- [ ] Confirm the framework preset is Next.js.
- [ ] Confirm build command is `npm run build`.
- [ ] Confirm output is handled by Next.js/Vercel.
- [ ] Add production environment variables.
- [ ] Set `NEXT_PUBLIC_SITE_URL=https://www.rkbsports.app/`.
- [ ] Keep `NEXT_PUBLIC_GA_ID=` empty until the real GA ID is ready.
- [ ] Keep `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=` empty until the real verification token is ready.
- [ ] Run `npm run build` locally before deploy.
- [ ] Run a production deployment.
- [ ] Confirm the deployment has no build errors.
- [ ] Test `/`, `/tools`, `/guides`, `/dashboard`, `/status`, and key calculator pages.

## Environment Variables

- [ ] `NEXT_PUBLIC_SITE_URL` is set to `https://www.rkbsports.app/`.
- [ ] `NEXT_PUBLIC_GA_ID` is empty until a real Google Analytics ID is ready.
- [ ] `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` is empty until a real Search Console value is ready.

## Analytics

- [ ] Add the real GA measurement ID only after the Analytics property is created.
- [ ] Confirm no analytics script loads when `NEXT_PUBLIC_GA_ID` is empty.
- [ ] Confirm analytics is visible in GA after production deployment.

## Search Console

- [ ] Create a Search Console property for the production domain.
- [ ] Add the real verification value to `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`.
- [ ] Redeploy and verify the property.
- [ ] Submit `/sitemap.xml`.

## Sitemap and Robots

- [ ] Confirm `/sitemap.xml` loads.
- [ ] Confirm `/robots.txt` loads.
- [ ] Confirm calculator and guide URLs are included in the sitemap.
- [ ] Confirm important pages are not blocked from indexing.

## AdSense

- [ ] Confirm About, Contact, Privacy Policy, Terms, and Disclaimer pages are accessible from navigation.
- [ ] Confirm footer includes contact and support email addresses.
- [ ] Confirm content does not include streaming, fake live scores, copied sports media, team logos, or official league branding.
- [ ] Keep `public/ads.txt` as a placeholder until approval.
- [ ] Add the real AdSense publisher line to `public/ads.txt` only after approval.
- [ ] Add real ad code only after approval and layout testing.

## PWA

- [ ] Confirm `/manifest.webmanifest` loads.
- [ ] Confirm icons load from `/icons/`.
- [ ] Confirm the service worker registers in production.
- [ ] Test install prompt behavior on a supported browser.
- [ ] Test offline fallback after one successful online visit.
- [ ] Confirm analytics and ads are not cached by the service worker.

## Mobile and Accessibility

- [ ] Test homepage on mobile.
- [ ] Test tools listing on mobile.
- [ ] Test calculator forms on mobile.
- [ ] Test dashboard on mobile.
- [ ] Test dark mode and light mode.
- [ ] Confirm keyboard focus states are visible.
- [ ] Confirm no sticky banner covers form buttons.

## Lighthouse

- [ ] Run Lighthouse mobile.
- [ ] Run Lighthouse desktop.
- [ ] Review Performance, Accessibility, Best Practices, and SEO.
- [ ] Fix any launch-blocking issues before submitting to AdSense.

## Cookie Consent

- [ ] Cookie banner appears on first visit.
- [ ] Accept button stores consent locally.
- [ ] Banner does not block calculator use.
- [ ] Banner is readable in dark and light mode.

## Share Cards

- [ ] Copy Result works on calculators.
- [ ] WhatsApp Share opens with result text.
- [ ] Copy Card Text works where share cards are present.
- [ ] Download Card as PNG works or shows a friendly fallback.

## Dashboard

- [ ] Saved teams add, delete, and clear all.
- [ ] Recent calculations hub reads calculator history.
- [ ] Tournament drafts add, delete, and clear all.
- [ ] Dashboard clearly says data is saved only on this device.
- [ ] No login, backend, database, or API is required.

## Final Commands

- [ ] `npm run lint` passes.
- [ ] `npm run build` passes.
