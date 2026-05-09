const CACHE_NAME = 'farmalocal-v1';
const urlsToCache = [
    '/FarmaLocal/',
    '/FarmaLocal/index.html',
    '/FarmaLocal/styles.css',
    '/FarmaLocal/app.js',
    '/FarmaLocal/medicamentos.json'
];

self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open(CACHE_NAME).then(function(cache) {
            return cache.addAll(urlsToCache);
        })
    );
});

self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request).then(function(response) {
            if (response) {
                return response;
            }
            return fetch(event.request);
        })
    );
});
