/* 1UpFarm Service Worker — minimal offline shell (Fase 12)
 * Network-first + cache fallback untuk navigasi.
 */
const CACHE = "1upfarm-v1";

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE).then((cache) => cache.addAll(["/", "/manifest.webmanifest"])).then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener("fetch", (event) => {
  const { request } = event;
  if (request.method !== "GET") return;
  // Network-first untuk navigasi, fallback cache
  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request)
        .then((res) => {
          const copy = res.clone();
          caches.open(CACHE).then((cache) => cache.put(request, copy));
          return res;
        })
        .catch(() => caches.match(request).then((c) => c || caches.match("/")))
    );
    return;
  }
  // Cache-first untuk aset statis
  event.respondWith(caches.match(request).then((hit) => hit || fetch(request)));
});
