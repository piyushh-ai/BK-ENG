import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyDeNcaws-0lR-A10i3ffnhJbtRvj3LngJQ",
  projectId: "bk-eng",
  messagingSenderId: "602178407465",
  appId: "1:602178407465:web:c579114e52787322912038",
};

const app = initializeApp(firebaseConfig);

// Lazily initialize messaging only in a browser that supports Service Workers.
// Calling getMessaging() at module scope crashes in SSR / unsupported browsers
// because Firebase internally calls addEventListener on navigator.serviceWorker.
let _messaging = null;
export const getFirebaseMessaging = () => {
  // navigator.serviceWorker can be present in the prototype but undefined
  // in Android WebViews and other restricted environments — check the value, not just existence.
  if (typeof window === "undefined" || !navigator.serviceWorker) {
    return null;
  }
  if (!_messaging) {
    try {
      _messaging = getMessaging(app);
    } catch (e) {
      console.warn("[Firebase] getMessaging() failed:", e.message);
      return null;
    }
  }
  return _messaging;
};
