/* Offline shell cache for Precision Pilot web — complements Flutter's service worker. */
const CACHE = 'precision-pilot-v1';
const PRECACHE = ['/', '/index.html', '/main.dart.js', '/flutter.js', '/manifest.json'];

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
