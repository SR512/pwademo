self.addEventListener('install', function(event) {
    console.log("Service Worker Installing Service Worker...",event);
    event.waitUntil(
        caches.open('first-app')
            .then(function(cache) {
                cache.addAll([
                    '/',
                    'index.php',
                    'css/app.css'
                ])
            })
    );
    return self.clients.claim();
});

self.addEventListener('activate', function(event) {
    console.log("Service Worker Activating Service Worker...",event);
    return self.clients.claim();
});
self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request)
            .then(function(res) {
                return res;
            })
    );
});
