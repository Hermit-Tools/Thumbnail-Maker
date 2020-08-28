function precache() {
  caches.open("CubsContraption").then(function (cache) {
    return cache.addAll([
      "./style.css",
      "./script.js",
      "./index.html",
      "./manifest.webmanifest",
      "../Resources/Hermitcraft Logos/HC7 Logo.png",
      "https://fonts.googleapis.com/icon?family=Material+Icons"
    ]);
  })
}

function fromCache(request) {
  return caches.open("CubsContraption").then(function (cache) {
    return cache.match(request).then(function (matching) {
      return matching || Promise.reject('no-match');
    });
  });
}

function update(request) {
  return caches.open("CubsContraption").then(function (cache) {
    return fetch(request).then(function (response) {
      return cache.put(request, response);
    });
  });
}

self.addEventListener("install", function (event) {
  console.log("SW is installing.");
  event.waitUntil(precache())
})

self.addEventListener("activate", event => {
  console.log("Inside the activate handler:", event);
});

self.addEventListener("fetch", event => {
  console.log("SW is being fetched.");
  event.respondWith(fromCache(event.request));
  update(event.request);
});