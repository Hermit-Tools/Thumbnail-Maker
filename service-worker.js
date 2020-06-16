var CACHE_NAME = 'ht-cache-v1';
var urlsToCache = [
  '/',
  'style.css',
  'script.js'
];

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});