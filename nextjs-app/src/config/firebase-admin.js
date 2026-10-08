import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getMessaging } from 'firebase-admin/messaging';

if (!getApps().length) {
  try {
    let serviceAccount;
    
    // Check if the base64 string exists
    if (process.env.FIREBASE_SERVICE_ACCOUNT_BASE64) {
      const buff = Buffer.from(process.env.FIREBASE_SERVICE_ACCOUNT_BASE64, "base64");
      const serviceAccountStr = buff.toString("utf-8");
      serviceAccount = JSON.parse(serviceAccountStr);
    } 

    if (serviceAccount) {
      initializeApp({
        credential: cert(serviceAccount),
      });
      console.log("Firebase Admin initialized successfully.");
    } else {
      console.warn("FIREBASE_SERVICE_ACCOUNT_BASE64 is missing in .env. Firebase Admin not initialized.");
    }
  } catch (error) {
    console.error("Firebase Admin initialization error:", error);
  }
}

export const messaging = getMessaging;
