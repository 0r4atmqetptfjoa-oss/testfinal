
const CACHE = 'elearn-cache-v3';
const PRECACHE = [
  '/', '/index.html', '/manifest.json',
  // you can add more hashed assets from your build here
];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then(cache => cache.addAll(PRECACHE)));
});
self.addEventListener('activate', (e) => {
  e.waitUntil(self.clients.claim());
});
self.addEventListener('fetch', (e) => {
  const url = new URL(e.request.url);

  // API: network-first with fallback
  if (url.pathname.startsWith('/api/')){
    e.respondWith(
      fetch(e.request).then(res=>{
        const copy = res.clone();
        caches.open(CACHE).then(c=> c.put(e.request, copy));
        return res;
      }).catch(()=> caches.match(e.request))
    );
    return;
  }

  // Pages & static: stale-while-revalidate
  e.respondWith(
    caches.match(e.request).then(cached=>{
      const fetchPromise = fetch(e.request).then(res=>{
        const copy = res.clone();
        caches.open(CACHE).then(c=> c.put(e.request, copy));
        return res;
      }).catch(()=> cached);
      return cached || fetchPromise;
    })
  );
});
