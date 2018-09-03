// Cache name
const CURRENT_CACHE = 'restaurant-map-v1';

// Caching application files
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CURRENT_CACHE).then((cache) => {
      return cache.addAll(
        [
          '/css/styles.css',
          '/data/restaurants.json',
          '/img/1.jpg',
          '/img/2.jpg',
          '/img/3.jpg',
          '/img/4.jpg',
          '/img/5.jpg',
          '/img/6.jpg',
          '/img/7.jpg',
          '/img/8.jpg',
          '/img/9.jpg',
          '/img/10.jpg',
          '/js/dbhelper.js',
          '/js/main.js',
          '/js/restaurant_info.js',
          '/index.html',
          '/restaurant.html',
          '/restaurant.html?id=1',
          '/restaurant.html?id=2',
          '/restaurant.html?id=3',
          '/restaurant.html?id=4',
          '/restaurant.html?id=5',
          '/restaurant.html?id=6',
          '/restaurant.html?id=7',
          '/restaurant.html?id=8',
          '/restaurant.html?id=9',
          '/restaurant.html?id=10',
          '/sw.js'
        ]
      );
    })
  );
});

// Adding a fetch event to listen for requests.  Pulls request
// from cache if available, otherwise routes request to network.
self.addEventListener('fetch', function(event) {
  console.log('Fetch request: ' + event.request);
  event.respondWith(
    caches.open(CURRENT_CACHE).then(function(cache) {
      return cache.match(event.request).then(function (response) {
        return response || fetch(event.request).then(function(response) {
          cache.put(event.request, response.clone());
          return response;
        });
      });
    })
  );
});

// Deleting old cache
self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.filter(function(cacheName) {
          // Delete instances of cache that dont match the current name
          if(cacheName !== CURRENT_CACHE) {
            return true;
          }
        }).map(function(cacheName) {
          console.log('Cache ' + cacheName + ' deleted.');
          return caches.delete(cacheName);
        })
      );
    })
  );
});
