/* Sprachen lernen – Offline-Start. Programmdateien: Netz zuerst, sonst Cache. Firebase-SDK: Cache zuerst. */
const C='sprachen-lernen-v1';
self.addEventListener('install',e=>{self.skipWaiting()});
self.addEventListener('activate',e=>{e.waitUntil(self.clients.claim())});
self.addEventListener('fetch',e=>{
  const r=e.request;if(r.method!=='GET')return;
  let u;try{u=new URL(r.url)}catch(x){return}
  if(u.origin===self.location.origin){
    e.respondWith(fetch(r).then(res=>{if(res&&res.ok){const c=res.clone();caches.open(C).then(x=>x.put(r,c)).catch(()=>{})}return res})
      .catch(()=>caches.match(r,{ignoreSearch:true}).then(m=>m||(r.mode==='navigate'?caches.match('./',{ignoreSearch:true}):undefined)).then(m=>m||new Response('Offline – bitte später erneut öffnen.',{status:503,headers:{'Content-Type':'text/plain;charset=utf-8'}}))));
  }else if(u.hostname==='www.gstatic.com'){
    e.respondWith(caches.match(r).then(m=>m||fetch(r).then(res=>{if(res&&res.ok){const c=res.clone();caches.open(C).then(x=>x.put(r,c)).catch(()=>{})}return res})));
  }
});
