const cacheName = "v3";

const cacheAssets = [
  "/index.html",
  "/about.html",
  "/css/style.css",
  "/js/main.js",
];

// install SW
self.addEventListener("install", (event) => {
  console.log("Service Worker: Installed");
  event.waitUntill(
    caches.open(cacheName).then((cache) => {
      console.log("Cache: ", cache);
      cache.addAll(cacheAssets);
    }).then(()=> self.skipWaiting()
    )
  );
});

// activate SW
self.addEventListener("activate", (event) => {
  console.log("Service Worker: Activated");
  event.waitUntill(
    caches.keys().then(cacheNames => {
        return Promise.all(cacheNames.map(cache => {
            if(cache !== cacheName){
                caches.delete(cache);
            }
        }))
    }))
});

self.addEventListener("fetch", (event) => {
    console.log("Service Worker: Fetching");
    event.respondWith(
        fetch(event.request).catch(()=>{
            caches.match(event.request);
        })
    )
});
