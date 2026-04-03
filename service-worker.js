const CACHE_VERSION = 'v4'; // MUDOU DE v1 para v4
const CACHE_NAME = `vidasaudavel-${CACHE_VERSION}`;

const urlsToCache = [
  '/',
  '/index.html',
  '/treino.html',
  '/dieta.html',
  '/acompanhamento.html',
  '/exercicios.html',
  '/translations.js',
  '/manifest.json'
];

// Install
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
      .then(() => self.skipWaiting())
  );
});

// Activate - LIMPA CACHES ANTIGOS
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('Deletando cache antigo:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch - Network first, depois cache
self.addEventListener('fetch', event => {
  event.respondWith(
    fetch(event.request)
      .then(response => {
        // Clona a resposta
        const responseToCache = response.clone();
        
        caches.open(CACHE_NAME).then(cache => {
          cache.put(event.request, responseToCache);
        });
        
        return response;
      })
      .catch(() => {
        // Se offline, usa cache
        return caches.match(event.request);
      })
  );
});
