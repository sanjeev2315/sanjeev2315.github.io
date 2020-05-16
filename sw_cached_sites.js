const cacheName = "v1";

// install SW
self.addEventListener("install", (event) => {
  console.log("Service Worker: Installed");
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
        }));
    }));
});

self.addEventListener("fetch", (event) => {
    console.log("Service Worker: Fetching");
    event.respondWith(
        fetch(event.request)
        .then(response => {
          const resClone = response.clone();
          caches.open(cacheName).then(cache =>{
            cache.put(event.request, resClone);
          });
          return response;
        })
        .catch((err) => {
            caches.match(event.request).then(res => res)
        })
    );
});
