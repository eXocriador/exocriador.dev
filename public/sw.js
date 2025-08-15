const CACHE_NAME = "exocriador-portfolio-v1";

// Перевіряємо, чи ми в dev режимі
const isDevMode =
  self.location.hostname === "localhost" ||
  self.location.hostname === "127.0.0.1" ||
  self.location.protocol === "http:";

// В dev режимі не кешуємо dev-специфічні файли
const urlsToCache = isDevMode
  ? ["/", "/index.html"]
  : [
      "/",
      "/index.html",
      "/src/main.tsx",
      "/src/App.tsx",
      "/src/index.css",
      "/src/App.module.css"
    ];

// Install event - cache resources
self.addEventListener("install", (event) => {
  console.log(
    `Service Worker installing in ${isDevMode ? "DEV" : "PRODUCTION"} mode`
  );

  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Opened cache:", CACHE_NAME);
      console.log("Caching URLs:", urlsToCache);
      return cache.addAll(urlsToCache);
    })
  );
});

// Fetch event - serve from cache when offline
self.addEventListener("fetch", (event) => {
  const request = event.request;
  const url = new URL(request.url);

  // В dev режимі пропускаємо dev-специфічні запити
  if (isDevMode) {
    // Пропускаємо Vite dev server запити
    if (
      url.pathname.startsWith("/@") ||
      url.pathname.startsWith("/node_modules/") ||
      url.pathname.includes(".tsx") ||
      url.pathname.includes(".ts") ||
      url.pathname.includes(".js") ||
      url.pathname.includes(".css")
    ) {
      return fetch(request);
    }
  }

  // Для production або статичних ресурсів використовуємо кеш
  event.respondWith(
    caches.match(request).then((response) => {
      // Return cached version or fetch from network
      if (response) {
        return response;
      }
      return fetch(request);
    })
  );
});

// Activate event - clean up old caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log("Deleting old cache:", cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Background sync for offline form submissions
self.addEventListener("sync", (event) => {
  if (event.tag === "background-sync") {
    event.waitUntil(doBackgroundSync());
  }
});

// Push notifications
self.addEventListener("push", (event) => {
  const options = {
    body: event.data ? event.data.text() : "New update available!",
    icon: "/icon-192x192.png",
    badge: "/icon-72x72.png",
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    actions: [
      {
        action: "explore",
        title: "View Portfolio",
        icon: "/icon-96x96.png"
      },
      {
        action: "close",
        title: "Close",
        icon: "/icon-96x96.png"
      }
    ]
  };

  event.waitUntil(
    self.registration.showNotification("eXocriador Portfolio", options)
  );
});

// Handle notification clicks
self.addEventListener("notificationclick", (event) => {
  event.notification.close();

  if (event.action === "explore") {
    event.waitUntil(self.clients.openWindow("/#portfolio"));
  }
});

// Background sync function
async function doBackgroundSync() {
  try {
    // Check for pending form submissions
    const pendingSubmissions = await getPendingSubmissions();

    for (const submission of pendingSubmissions) {
      try {
        await submitForm(submission);
        await removePendingSubmission(submission.id);
      } catch {
        console.error("Background sync failed for submission:", submission.id);
      }
    }
  } catch {
    console.error("Background sync failed");
  }
}

// Helper functions for background sync
async function getPendingSubmissions() {
  // This would typically use IndexedDB
  return [];
}

async function submitForm(submission) {
  // Submit the form data
  const response = await fetch("/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(submission)
  });

  if (!response.ok) {
    throw new Error("Form submission failed");
  }

  return response.json();
}

async function removePendingSubmission(id) {
  // Remove from pending submissions
  console.log("Removed pending submission:", id);
}
