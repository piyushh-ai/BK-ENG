import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyDeNcaws-0lR-A10i3ffnhJbtRvj3LngJQ",
  projectId: "bk-eng",
  messagingSenderId: "602178407465",
  appId: "1:602178407465:web:c579114e52787322912038",
};

const app = initializeApp(firebaseConfig);
export const messaging = getMessaging(app);
