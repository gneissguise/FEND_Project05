// Cache name
const CURRENT_CACHE = 'restaurant-map-v1';

// Installing sw and caching routes
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
          '/index.html',
          '/restaurant.html'
        ]
      );
    })
  );
});

// Adding a fetch event to listen for requests.  Pulls request
// from cache if available, otherwise routes request to network.
self.addEventListener('fetch', (event) => {
  console.log('Handling fetch event for', event.request.url);

  event.respondWith(

    // Opens Cache objects that start with 'font'.
    caches.open(CURRENT_CACHE).then((cache) => {
      return cache.match(event.request).then((response) => {
        if (response) {
          console.log('Found response in cache:', response);

          return response;
        }

        console.log('Fetching request from the network');

        return fetch(event.request).then(function(networkResponse) {
          cache.put(event.request, networkResponse.clone());

          return networkResponse;
        });
      }).catch(function(error) {

        // Handles exceptions that arise from match() or fetch().
        console.error('Error in fetch handler:', error);

        throw error;
      });
    })
  );
});
