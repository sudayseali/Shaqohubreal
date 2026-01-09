// service-worker.js
const CACHE_NAME = "shaqohub-offline-v1";
const OFFLINE_URL = "/offline.html";

// Cache offline page on install
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
    .then(cache => cache.add(OFFLINE_URL))
    .then(() => self.skipWaiting())
  );
});

// Activate Service Worker
self.addEventListener("activate", event => {
  event.waitUntil(self.clients.claim());
});

// Fetch event - serve offline.html for navigation requests if fetch fails
self.addEventListener("fetch", event => {
  if (event.request.mode === "navigate") {
    event.respondWith(
      fetch(event.request).catch(() => caches.match(OFFLINE_URL))
    );
  }
});