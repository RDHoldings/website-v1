/* Optional offline shell (not registered from index.html): Flutter’s bootstrap already
 * registers the build service worker; a second worker here caused prepareServiceWorker
 * timeouts. Kept for experiments only — register manually if you merge strategies.
 * Resolve precache URLs relative to this script for subpath embeds. */
const CACHE = 'precision-pilot-v1';
const SW_ROOT = new URL('./', self.location.href);
const PRECACHE = ['index.html', 'flutter_bootstrap.js', 'main.dart.js', 'manifest.json'].map(
  (name) => new URL(name, SW_ROOT).href,
);

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE).then((cache) => cache.addAll(PRECACHE).catch(() => undefined)),
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  let url;
  try {
    url = new URL(event.request.url);
  } catch (_) {
    return;
  }
  // Only handle same-origin GETs. Cross-origin (gstatic, Google APIs, tiles)
  // must use the default fetch path so auth and third-party scripts are not
  // routed through this cache strategy.
  if (url.origin !== self.location.origin) return;

  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) return cached;
      return fetch(event.request).then((response) => {
        const copy = response.clone();
        if (response.ok) {
          caches.open(CACHE).then((cache) => cache.put(event.request, copy));
        }
        return response;
      });
    }),
  );
});
