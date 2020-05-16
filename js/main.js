if('serviceWorker' in navigator){
    console.log('Service Worker: Supported')
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./../sw_cached_sites.js')
        .then(reg => console.log('Service Worker: Registered'))
        .catch(err => console.log(`Service Worker: Error: ${err}`))
    });
}