import { useEffect } from "react";
import { getToken, onMessage } from "firebase/messaging";
import { messaging } from "../../../config/firebase";
import { updateFCMToken } from "../services/admin.api";

// Get this from Firebase Console > Project Settings > Cloud Messaging > Web Push certificates
const VAPID_KEY = "BCR-DHYVMsPBNVxc4OwgAFTU-nSwqBg9uMI3gcHc-4YHxs7p7E0eP9bGRRaDt5oR85nvm7O8qKkVntdRg1eZRcI";

export const useFirebasePush = () => {
  useEffect(() => {
    const requestPermissionAndGetToken = async () => {
      try {
        // Guard: browser must support notifications
        if (typeof window === "undefined" || !("Notification" in window)) {
          console.log("[Push] This browser does not support notifications.");
          return;
        }

        const permission = await Notification.requestPermission();
        if (permission !== "granted") {
          console.log("[Push] Notification permission denied or dismissed.");
          return;
        }

        console.log("[Push] Notification permission granted.");

        try {
          const token = await getToken(messaging, { vapidKey: VAPID_KEY });
          if (token) {
            console.log("[Push] FCM Web Token earned, syncing to DB...");
            await updateFCMToken(token);
            console.log("[Push] Token synced successfully.");
          } else {
            console.warn("[Push] No FCM registration token available — check VAPID key or Service Worker.");
          }
        } catch (tokenErr) {
          console.error("[Push] getToken error:", tokenErr);
        }
      } catch (error) {
        console.error("[Push] Error initializing push notifications:", error);
      }
    };

    requestPermissionAndGetToken();

    // Show a browser toast when a foreground message arrives
    // (Service Worker handles background messages automatically)
    const unsubscribe = onMessage(messaging, (payload) => {
      console.log("[Push] Foreground message received:", payload);
      const { title, body } = payload.notification ?? {};
      if (title && Notification.permission === "granted") {
        new Notification(title, {
          body: body ?? "",
          icon: "/icons.svg",
        });
      }
    });

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []);
};
