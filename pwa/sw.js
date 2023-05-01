const version = 2;
const cacheName = `MonzGomz-files.${version}`;
let isOnline = true;
const cacheItems = [
  './',
  './index.html',
  './js/main.js',
  './css/main.css',
  './img/android-chrome-192x192.png',
  './img/android-chrome-512x512.png',
  './img/apple-touch-icon.png',
  './img/favicon-16x16.png',
  './img/favicon-32x32.png',
  './img/favicon.ico'
];

self.addEventListener('install', (ev) => {
  ev.waitUntil(caches.open(cacheName).then((cache) => cache.addAll(cacheItems)));
});

self.addEventListener('activate', (ev) => {
   ev.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(keys.filter((key) => key != cacheName).map((name) => caches.delete(name)));
    })
  );
});

self.addEventListener('fetch', (ev) => {
    let url = new URL(ev.request.url);
  let isOnline = navigator.onLine;
  let isImage =
    url.pathname.includes('.png') ||
    url.pathname.includes('.jpg') ||
    url.pathname.includes('.gif') ||
    url.pathname.includes('.webp') ||
    url.pathname.includes('.jpeg') ||
    url.hostname.includes('placeholder.com')||
    url.hostname.startsWith('placedog.net');
  let isCss = url.pathname.includes('.css');
  let isJS = url.pathname.includes('.js');
  let isFont = url.hostname.includes('fonts.gstatic.com');
  let isJSON = url.hostname.includes('json');

  if (isOnline) { 
    if (isFont || isImage || isJS || isCss) {
       ev.respondWith(staleWhileRevalidate(ev));
    } else if(isJSON){
      ev.respondWith(networkFirstAndRevalidate(ev));
    }
  } else {
      ev.respondWith(cacheOnly(ev));
    }
  }
);

function staleWhileRevalidate(ev) {
  return caches.match(ev.request).then((cacheResponse) => {
    let fetchResponse = fetch(ev.request,{mode:'cors',credentials:'omit',}).then((response) => {
      return caches.open(cacheName).then((cache) => {
        cache.put(ev.request, response.clone());
        return response;
      });
    });
    return cacheResponse || fetchResponse;
  });
}

function networkFirstAndRevalidate(ev) {
  return fetch(ev.request).then((response) => {
    if (!response.ok) return caches.match(ev.request);
    return caches.open(cacheName).then((cache) => {
        cache.put(ev.request, response.clone());
        return response;
      });
  });
}

self.addEventListener('message', (ev) => {
});

function sendMessage(msg, clientId) {
}
function cacheOnly(ev) {
  console.log('cache only');
  console.log(ev.request);
  
  return caches.match(ev.request);
}

class NetworkError extends Error {
  constructor(msg, response) {
    super(msg);
    this.type = 'NetworkError';
    this.response = response;
    this.message = msg;
  }
}
