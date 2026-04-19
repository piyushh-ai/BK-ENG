importScripts("https://www.gstatic.com/firebasejs/10.8.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.8.0/firebase-messaging-compat.js");

const firebaseConfig = {
  apiKey: "AIzaSyDeNcaws-0lR-A10i3ffnhJbtRvj3LngJQ",
  projectId: "bk-eng",
  messagingSenderId: "602178407465",
  appId: "1:602178407465:web:c579114e52787322912038",
};

try {
  // Initialize the Firebase app in the service worker.
  // Because the Backend payload uses `notification`, Firebase will automatically 
  // display a background notification for us.
  // Because the Backend payload uses `webpush.fcmOptions.link`, Firebase will automatically 
  // handle clicking the notification and navigating to the right order!
  firebase.initializeApp(firebaseConfig);
  const messaging = firebase.messaging();
} catch (error) {
  console.log("Firebase SW initialization error:", error.message);
}
