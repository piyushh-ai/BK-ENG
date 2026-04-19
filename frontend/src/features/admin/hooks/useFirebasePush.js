import { useEffect } from "react";
import { getToken, onMessage } from "firebase/messaging";
import { messaging } from "../../../config/firebase";
import { updateFCMToken } from "../services/admin.api";

// ⚠️ IMPORTANT: Replace this with your actual VAPID key from Firebase Console
// Project Settings -> Cloud Messaging -> Web Push certificates
const VAPID_KEY = "BCR-DHYVMsPBNVxc4OwgAFTU-nSwqBg9uMI3gcHc-4YHxs7p7E0eP9bGRRaDt5oR85nvm7O8qKkVntdRg1eZRcI"; 

export const useFirebasePush = () => {
  useEffect(() => {
    const requestPermissionAndGetToken = async () => {
      try {
        if (VAPID_KEY === "BCR-DHYVMsPBNVxc4OwgAFTU-nSwqBg9uMI3gcHc-4YHxs7p7E0eP9bGRRaDt5oR85nvm7O8qKkVntdRg1eZRcI") {
             console.warn("⚠️ Firebase VAPID key is missing. Push notifications cannot be initialized.");
             return;
        }

        if (typeof window !== "undefined" && !("Notification" in window)) {
          console.log("This browser does not support desktop notification");
          return;
        }

        const permission = await Notification.requestPermission();
        if (permission === "granted") {
          console.log("Notification permission granted.");
          try {
            const token = await getToken(messaging, { vapidKey: VAPID_KEY });
            if (token) {
              console.log("FCM Token earned, syncing to DB...");
              await updateFCMToken(token);
            } else {
              alert("Firebase Token failed: No registration token available.");
            }
          } catch (tokenErr) {
            console.error("getToken error:", tokenErr);
            alert("Firebase GetToken Error: " + tokenErr.message);
          }
        } else {
          console.log("Notification permission denied or dismissed.");
        }
      } catch (error) {
        console.error("An error occurred while retrieving or sending FCM token: ", error);
        alert("Firebase Notification Error: " + error.message);
      }
    };

    requestPermissionAndGetToken();

    // Listen for foreground messages
    const unsubscribe = onMessage(messaging, (payload) => {
      console.log("Foreground message received:", payload);
      // Optional: You could trigger a toast or in-app alert here since 
      // the service worker sometimes only shows OS notifications in background.
    });

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []);
};
