# RKBSports.app QA Checklist

Use this checklist before production deployment and after major changes.

## Homepage

- [ ] Hero section loads and links to tools/guides work.
- [ ] Featured tools render correctly on mobile and desktop.
- [ ] No fake live scores, streaming text, copied sports media, or team logos.
- [ ] SEO intro content is readable in dark and light mode.

## Tools page

- [ ] All available calculator cards link to real `/tools/...` pages.
- [ ] Coming soon tools do not link to missing calculator routes.
- [ ] Saved Teams component can add and delete local team names.
- [ ] Page remains usable on narrow mobile screens.

## Calculator pages

- [ ] Every calculator page renders with header, intro, ads, form, result area,
      description, formula, example, FAQ, related tools, and related guides.
- [ ] Invalid inputs show friendly validation errors.
- [ ] Cricket overs validation rejects values such as `4.6`.
- [ ] Reset buttons clear inputs/results.
- [ ] Recent calculations save only to localStorage and show the last five.
- [ ] No calculator depends on fake data, live feeds, or demo APIs.
- [ ] Points Table Calculator can add, edit, and delete teams.
- [ ] Points Table Calculator rejects invalid overs such as `4.6`.
- [ ] Points Table Calculator calculates NRR and ranking order correctly.
- [ ] Points Table Calculator can save, load, clear, copy text, and download JSON backup locally.

## Guides pages

- [ ] `/guides` lists all guide articles.
- [ ] Every guide detail page has heading, intro, explanation, formula where
      relevant, example, FAQ, and related tool links.
- [ ] Guide metadata, canonical URL, Open Graph, and Twitter metadata are set.

## Static pages

- [ ] About page loads.
- [ ] Contact page loads.
- [ ] Dashboard page loads.
- [ ] Status page loads.
- [ ] Privacy Policy page loads.
- [ ] Terms and Conditions page loads.
- [ ] Disclaimer page loads.
- [ ] Footer links point to valid routes.

## Contact emails

- [ ] General contact uses `contact@rkbsports.app`.
- [ ] Support and bug reports use `support@rkbsports.app`.
- [ ] Mail links use `mailto:` and are readable in both themes.

## Cookie consent

- [ ] Banner appears on first visit.
- [ ] Accept button stores consent in localStorage.
- [ ] Banner does not block calculator use.
- [ ] Banner is readable on mobile and in dark mode.

## PWA install

- [ ] Manifest loads at `/manifest.webmanifest`.
- [ ] Icons load from `/icons/`.
- [ ] Install hint appears only when the browser emits the install prompt.
- [ ] Dismissed install hint is stored in localStorage.

## Offline fallback

- [ ] Service worker registers in production.
- [ ] Cached calculator pages can load after an online visit.
- [ ] `/offline.html` appears when a page is unavailable offline.
- [ ] Analytics, ads, external resources, and non-GET requests are not cached.

## Mobile view

- [ ] Header navigation is usable.
- [ ] Announcement bar does not cover navigation.
- [ ] Sticky/offline/install banners do not cover form buttons.
- [ ] Calculator forms fit without horizontal scrolling.

## Dark mode

- [ ] Theme toggle switches to dark mode.
- [ ] Dark mode preference persists in localStorage.
- [ ] Cards, forms, buttons, ad placeholders, and result panels have sufficient contrast.

## Light mode

- [ ] Theme toggle switches to light mode.
- [ ] Light mode preference persists in localStorage.
- [ ] Text, links, and focus states remain readable.

## Copy and WhatsApp share

- [ ] Copy Result works for calculators.
- [ ] Copy Card Text works for share verdict cards.
- [ ] WhatsApp Share opens a share URL with calculator result text.
- [ ] Copy success state is visible where applicable.

## Download share card

- [ ] Download Card as PNG works on supported browsers.
- [ ] A friendly fallback appears if image generation fails.
- [ ] Share card is readable in dark and light mode.

## Saved teams

- [ ] Team names save to localStorage only.
- [ ] Saved team names display in the Saved Teams component.
- [ ] Delete removes the selected team.
- [ ] Clear All Teams removes all saved team names from this device.
- [ ] NRR calculator can use a saved team name where available.

## Recent calculations

- [ ] Recent calculations save to localStorage only.
- [ ] Only the latest five entries are shown.
- [ ] Reset does not crash recent calculations.
- [ ] Dashboard recent calculations hub reads calculator history safely.
- [ ] Dashboard handles older recent entries without timestamps.
- [ ] Clear All Recent removes calculator history keys from this device.

## Dashboard

- [ ] Dashboard explains that data is saved only in this browser/device.
- [ ] Quick calculator links navigate to valid tools.
- [ ] Dashboard quick links include Points Table Calculator.
- [ ] Saved Teams can add, delete, and clear all teams.
- [ ] Tournament Drafts can add a name and note.
- [ ] Tournament Drafts can delete one draft and clear all drafts.
- [ ] Dashboard does not use login wording, backend calls, database calls, fake data, or live data.
- [ ] Dashboard is readable and usable in mobile, dark mode, and light mode.

## Analytics env

- [ ] Empty `NEXT_PUBLIC_GA_ID` loads no analytics script.
- [ ] Real GA ID loads Google Analytics only after deployment.
- [ ] Service worker does not cache analytics scripts.

## Search Console env

- [ ] Empty `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` outputs no fake meta tag.
- [ ] Real verification value appears after deployment.
- [ ] Production sitemap is submitted in Search Console.

## ads.txt

- [ ] `public/ads.txt` has no fake publisher ID.
- [ ] Real AdSense publisher line is added only after approval.
- [ ] Ad placeholders remain placeholders until real ad code is added.

## Final commands

- [ ] `npm run lint` passes.
- [ ] `npm run build` passes.
