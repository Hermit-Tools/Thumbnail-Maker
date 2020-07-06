self.addEventListener('install', function(event) {
  console.log('installed', event);
    event.waitUntil(
      caches.open("Cub'sContraption").then(function(cache) {
        return cache.addAll([
          'style.css',
          'script.js',
          'manifest.webmanifest',
          '/hc7logobydnator.png',
          'https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap',
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