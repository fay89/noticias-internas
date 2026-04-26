const CACHE_NAME = 'eco-proposito-v1';
const urlsToCache = [
  '/',
  '/manifest.json',
  '/logo.png'
];

self.addEventListener('install', event => {
  self.skipWaiting(); // Fuerza al Service Worker a instalarse de inmediato
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('activate', event => {
  // Limpiar cachés antiguas (v1) para que el diseño nuevo se cargue
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim()) // Fuerza a los clientes a usar el nuevo SW
  );
});

self.addEventListener('fetch', event => {
  // ESTRATEGIA: Network First (Red primero), luego Caché.
  // Esto garantiza que siempre veas los últimos cambios de diseño si hay internet.
  event.respondWith(
    fetch(event.request)
      .then(response => {
        // Actualizar la caché con la respuesta de la red
        if (response && response.status === 200 && response.type === 'basic') {
          const responseToCache = response.clone();
          caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, responseToCache);
          });
        }
        return response;
      })
      .catch(() => {
        // Si no hay internet, usar la caché
        return caches.match(event.request);
      })
  );
});
