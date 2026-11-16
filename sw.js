const CACHE='magnus-nsaka-v2';
const FILES=['./','./index.html','./manifest.webmanifest','./assets/logo-magnus.png','./assets/artwork-promo.png','./assets/magnus-portrait.png','./assets/icon-192.png','./assets/icon-512.png','./assets/magnus-run.png','./assets/magnus-shoot.png','./assets/enemy-soldier.png','./assets/orion-dog.png'];
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(FILES)).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;e.respondWith(caches.match(e.request).then(hit=>hit||fetch(e.request).then(res=>{let copy=res.clone();caches.open(CACHE).then(c=>c.put(e.request,copy));return res}).catch(()=>caches.match('./index.html'))))});
