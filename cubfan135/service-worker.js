self.addEventListener('install', function(event) {
  console.log('installed', event);
    event.waitUntil(
      caches.open("Cub'sContraption").then(function(cache) {
        return cache.addAll([
          'style.css',
          'script.js',
          'manifest.webmanifest',
          '/hc7logobydnator.png',
          'https://fonts.googleapis.com/icon?family=Material+Icons'
        ]),
        console.log('cached');        
      })
    );
  });

  self.addEventListener('activate', (event) => {
    console.log('Inside the activate handler:', event);
  });
  
  self.addEventListener(fetch, (event) => {
    console.log('Inside the fetch handler:', event);
  });