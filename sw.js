/* Çevrimdışı çalışma: oyun dosyaları ilk açılışta önbelleğe alınır.
 Her istekte önce önbellekteki sürüm verilir, arkada ağdan yenisi alınıp önbellek güncellenir;
 yani bir değişiklik yayınlanınca oyuncu onu bir sonraki açılışta görür. Dosya listesi değişirse CACHE adını artırın. */
const CACHE="gelecekten-mektup-v1";
const SHELL=["./","index.html","data.js","engine.js","ui.js","manifest.webmanifest","icons/icon.svg","icons/icon-192.png","icons/icon-512.png"];

self.addEventListener("install",e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(SHELL)).then(()=>self.skipWaiting()));});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));});
// Oyun dosyaları ve Google Fonts: önbellekten ver, arkada yenile
self.addEventListener("fetch",e=>{
 const u=new URL(e.request.url);
 if(e.request.method!=="GET"||!(u.origin===location.origin||/fonts\.(googleapis|gstatic)\.com$/.test(u.hostname)))return;
 e.respondWith(caches.open(CACHE).then(async c=>{
  const hit=await c.match(e.request,{ignoreSearch:u.origin===location.origin});
  const net=fetch(e.request).then(r=>{if(r.ok||r.type==="opaque")c.put(e.request,r.clone());return r;}).catch(()=>hit);
  return hit||net;
 }));
});
