const CACHE_VERSION = "rkbsports-pwa-v2";
const PAGE_CACHE = `${CACHE_VERSION}-pages`;
const STATIC_CACHE = `${CACHE_VERSION}-static`;

const CORE_ASSETS = [
  "/",
  "/tools",
  "/guides",
  "/offline.html",
  "/manifest.webmanifest",
  "/icons/icon.svg",
  "/icons/maskable-icon.svg",
];

const CALCULATOR_PAGES = [
  "/tools/nrr-calculator",
  "/tools/run-rate-calculator",
  "/tools/t20-net-run-rate-calculator",
  "/tools/odi-net-run-rate-calculator",
  "/tools/t20-run-rate-calculator",
  "/tools/odi-run-rate-calculator",
  "/tools/required-run-rate-calculator",
  "/tools/strike-rate-calculator",
  "/tools/economy-rate-calculator",
  "/tools/batting-average-calculator",
  "/tools/bowling-average-calculator",
  "/tools/follow-on-calculator",
  "/tools/bowling-strike-rate-calculator",
  "/tools/partnership-run-rate-calculator",
  "/tools/balls-to-overs-converter",
  "/tools/super-over-target-calculator",
  "/tools/bowlers-spell-analyzer",
  "/tools/target-run-rate-chase-planner",
  "/tools/fantasy-cricket-points-calculator",
  "/tools/tournament-qualification-scenario-predictor",
  "/tools/points-table-calculator",
];

const BLOCKED_CACHE_PATHS = [
  "/ads",
  "/adsbygoogle",
  "/analytics",
  "/gtag",
  "/googletagmanager",
  "/googlesyndication",
  "/google-analytics",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    Promise.all([
      caches.open(STATIC_CACHE).then((cache) => cache.addAll(CORE_ASSETS)),
      caches.open(PAGE_CACHE).then((cache) => cache.addAll(CALCULATOR_PAGES)),
    ])
      .then(() => self.skipWaiting())
      .catch(() => undefined),
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((key) => key.startsWith("rkbsports-pwa-") && !key.startsWith(CACHE_VERSION))
            .map((key) => caches.delete(key)),
        ),
      )
      .then(() => self.clients.claim()),
  );
});

self.addEventListener("fetch", (event) => {
  const { request } = event;

  if (request.method !== "GET") {
    return;
  }

  const url = new URL(request.url);

  if (url.origin !== self.location.origin) {
    return;
  }

  if (BLOCKED_CACHE_PATHS.some((path) => url.pathname.includes(path))) {
    return;
  }

  if (request.mode === "navigate") {
    event.respondWith(networkFirstPage(request));
    return;
  }

  if (
    url.pathname.startsWith("/_next/static/") ||
    url.pathname.startsWith("/icons/") ||
    url.pathname === "/manifest.webmanifest"
  ) {
    event.respondWith(cacheFirstStatic(request));
  }
});

async function networkFirstPage(request) {
  const cache = await caches.open(PAGE_CACHE);

  try {
    const response = await fetch(request);
    if (response.ok) {
      await cache.put(request, response.clone());
    }
    return response;
  } catch (_) {
    const cached = await cache.match(request);
    return cached || caches.match("/offline.html");
  }
}

async function cacheFirstStatic(request) {
  const cache = await caches.open(STATIC_CACHE);
  const cached = await cache.match(request);

  if (cached) {
    return cached;
  }

  const response = await fetch(request);
  if (response.ok) {
    await cache.put(request, response.clone());
  }
  return response;
}
