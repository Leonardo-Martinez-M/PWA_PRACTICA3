// service-worker.js

// Versión de la caché. ¡Cambia esto si actualizas archivos!
var cacheName = "pwa3-cache-v2";

// Lista de TODOS los archivos críticos que se deben cachear (incluyendo Bootstrap)
var filesToCache = [
  // Raíz y HTML
  "/",
  "index.html",

  // Archivos de Bootstrap (Asegúrate de que esta ruta sea correcta)
  "/bootstrap-5.3.8-dist/css/bootstrap-grid.min.css",
  "/bootstrap-5.3.8-dist/js/bootstrap.bundle.min.js",

  // Archivos JS y CSS propios
  "/js/lib1.js",
  "/js/lib2.js",
  //"/css/style.css",

  // Imágenes de la PWA
  "/images/Dino.jpg",
  "/images/utp.png", // Si usas utp.png
];

// Evento INSTALL: Precaching de recursos
self.addEventListener("install", (event) => {
  console.log("[ServiceWorker] Install Event: Starting precaching...");
  event.waitUntil(
    // Abrir la caché y añadir todos los archivos de la lista
    caches.open(cacheName).then((cache) => {
      console.log("[ServiceWorker] Caching App Shell");
      return cache.addAll(filesToCache).then(() => self.skipWaiting()); // Forzar activación para tomar control
    })
  );
});

// Evento ACTIVATE: Limpieza de cachés antiguas
self.addEventListener("activate", (event) => {
  console.log("[ServiceWorker] Activate Event: Cleaning old caches...");
  var cacheWhitelist = [cacheName];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((name) => {
          if (cacheWhitelist.indexOf(name) === -1) {
            console.log("[ServiceWorker] Deleting old cache:", name);
            return caches.delete(name);
          }
        })
      ).then(() => clients.claim()); // Tomar control de las páginas existentes
    })
  );
});

// Evento FETCH: Estrategia Cache-First
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // Si el recurso está en caché, lo devuelve (¡Rápido y Offline!)
      if (response) {
        console.log("[ServiceWorker] Serving from Cache:", event.request.url);
        return response;
      }
      // Si no está, va a la red
      console.log("[ServiceWorker] Serving from Network:", event.request.url);
      return fetch(event.request);
    })
  );
});
