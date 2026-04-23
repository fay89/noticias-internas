const CACHE_NAME = 'enfoque-nublo-v1';
const urlsToCache = [
  '/',
  '/manifest.json',
  '/logo.png'
];

self.addEventListener('install', event => {
  // Pre-cachea recursos estáticos esenciales
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  // Intercepta las peticiones: si está en caché lo sirve, si no, lo pide a la red.
  // Es obligatorio tener un handler de fetch para que Chrome ofrezca la instalación PWA.
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});
