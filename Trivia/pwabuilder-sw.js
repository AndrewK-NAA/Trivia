/*/ This is the "Offline copy of pages" service worker

const CACHE = "pwabuilder-offline";

// TODO: replace the following with the correct offline fallback page i.e.: const offlineFallbackPage = "index.html";
const offlineFallbackPage = "index.html";

// Install stage sets up the index page (home page) in the cache and opens a new cache
self.addEventListener("install", function(event) {
    console.log("[PWA Builder] Install Event processing");

    event.waitUntil(
        caches.open(CACHE).then(function(cache) {
            console.log("[PWA Builder] Cached offline page during install");

            if (offlineFallbackPage === "index.html") {
                return cache.add(new Response("TODO: Update the value of the offlineFallbackPage constant in the serviceworker."));
            }

            return cache.add(offlineFallbackPage);
        })
    );
});

// If any fetch fails, it will look for the request in the cache and serve it from there first
self.addEventListener("fetch", function(event) {
    if (event.request.method !== "GET") return;

    event.respondWith(
        fetch(event.request)
        .then(function(response) {
            console.log("[PWA Builder] add page to offline cache: " + response.url);

            // If request was success, add or update it in the cache
            event.waitUntil(updateCache(event.request, response.clone()));

            return response;
        })
        .catch(function(error) {
            console.log("[PWA Builder] Network request Failed. Serving content from cache: " + error);
            return fromCache(event.request);
        })
    );
});

function fromCache(request) {
    // Check to see if you have it in the cache
    // Return response
    // If not in the cache, then return error page
    return caches.open(CACHE).then(function(cache) {
        return cache.match(request).then(function(matching) {
            if (!matching || matching.status === 404) {
                return Promise.reject("no-match");
            }

            return matching;
        });
    });
}

function updateCache(request, response) {
    return caches.open(CACHE).then(function(cache) {
        return cache.put(request, response);
    });
}
*/
self.addEventListener('install', function(event) {
    console.log('SW Installed');
    event.waitUntil(
        caches.open('static')
        .then(function(cache) {
            // cache.add('/');
            // cache.add('/index.html');
            // cache.add('/src/js/app.js');
            cache.addAll([
                '/',
                '/index.html',
                '/js/main.js',
                '/css/style.css',
                '/images/q.jpg',
                '/images/lt40.png',
                '/images/ab40.png',

            ]);
        })
    );
});

self.addEventListener('activate', function() {
    console.log('SW Activated');
});

self.addEventListener('fetch', function(event) {
    console.log("fetching");
    event.respondWith(
        caches.match(event.request)
        .then(function(res) {
            if (res) {
                return res;
            } else {
                return fetch(event.request);
            }
        })
    );
});