const CACHE_NAME = 'poultry-app-v1';

self.addEventListener('install', () => {
  console.log('Service Worker installing...');
  self.skipWaiting();
});

self.addEventListener('activate', () => {
  console.log('Service Worker activating...');
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  // Let all requests go through normally - no caching for now
  event.respondWith(fetch(event.request));
});