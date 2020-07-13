self.addEventListener("install", function(event) {
  event.waitUntil(
    caches.open("Cub'sContraption").then(function(cache) {
      return cache.addAll([
        "./style.css",
        "./script.js",
        "../Resources/Hermitcraft Logos/HC7 Logo.png",
        "https://fonts.googleapis.com/icon?family=Material+Icons"
      ]);
    })
  );
});

self.addEventListener("activate", event => {
  console.log("Inside the activate handler:", event);
});

self.addEventListener("fetch", event => {
  console.log("Inside the fetch handler:", event);
});
