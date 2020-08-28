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

async function fromCache(request) {
  const cache = await caches.open("CubsContraption");
  const matching = await cache.match(request);
  return matching || Promise.reject('no-match');
}

async function update(request) {
  const cache = await caches.open("CubsContraption");
  const response = await fetch(request);
  return cache.put(request, response);
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