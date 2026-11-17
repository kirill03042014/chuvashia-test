const CACHE_NAME = 'cheb-offline-v1';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './icon.png',
  './manifest.json',
  'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css',
  'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js',
  'https://unpkg.com/lucide@latest',
  'https://cdn.jsdelivr.net/npm/appwrite@13.0.0'
];

// Установка (сохраняем файлы)
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

// Активация (удаляем старый кэш, если был)
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(keyList.map((key) => {
        if (key !== CACHE_NAME) return caches.delete(key);
      }));
    })
  );
});

// Перехват запросов
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => {
      // Если файл есть в кэше — отдаем его. Если нет — грузим из сети.
      return response || fetch(e.request);
    })
  );
});
