let cacheData = "appV1";
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(cacheData).then((cache) => {
      cache.addAll(["/auth/sign-in", "auth/sign-up"]);
    })
  );
  if ("mediaDevices" in navigator && "getUserMedia" in navigator.mediaDevices) {
    const stream = navigator.mediaDevices.getUserMedia({ video: true });
    console.log("Let's get this party started:", stream);
  } else {
    console.log("Your Device Doesn't Compatible with this app");
  }
});
self.addEventListener("fetch", (event) => {
  if (!navigator.onLine) {
    event.respondWith(
      caches.match(event.request).then((res) => {
        if (res) return res;
      })
    );
  }
});
