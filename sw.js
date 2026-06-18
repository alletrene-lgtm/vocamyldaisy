const CACHE_NAME = "daisy-player-v1";
const ASSETS = [
  "./",
  "./index.html",
  "./manifest.json"
];

// Enregistrement des fichiers essentiels au démarrage
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

// Interception des requêtes pour fonctionner hors ligne
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      return cachedResponse || fetch(event.request);
    })
  );
});