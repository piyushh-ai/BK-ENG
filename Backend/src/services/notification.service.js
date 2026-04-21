
import admin from "../config/firebase.js";
import userModel from "../models/user.model.js";

// FCM error codes that indicate the token is permanently invalid
const INVALID_TOKEN_CODES = [
  "messaging/registration-token-not-registered",
  "messaging/invalid-registration-token",
  "messaging/invalid-argument",
];

export const sendNewOrderNotification = async (tokens, orderData, salesmanName = "A Salesman") => {
  // If no tokens provided or Firebase is not initialized, abort silently
  if (!tokens || tokens.length === 0 || !admin.apps.length) return;

  try {
    const BASE_URL = "http://13.205.77.25";
    const orderPath = `/admin/order/${orderData._id}`;

    // First image URL from order (if any)
    const imageUrl = orderData.images?.[0]?.url ?? null;

    const message = {
      notification: {
        title: `New Order by ${salesmanName}`,
        body: `PARTY: ${orderData.partyName.toUpperCase()}\nTap to view order details`,
        ...(imageUrl && { imageUrl }),
      },
      data: {
        url: orderPath,
      },
      android: {
        priority: "high",
        notification: {
          channelId: "orders-v2",
          title: `New Order by ${salesmanName}`,
          body: orderData.partyName.toUpperCase(),
          ...(imageUrl && { imageUrl }),
          notificationCount: 1,
          vibrateTimingsMillis: [0, 250, 250, 250],
          defaultVibrateTimings: false,
          clickAction: "expo.modules.notifications.actions.DEFAULT",
        },
      },
      webpush: {
        fcmOptions: {
          link: `${BASE_URL}${orderPath}`,
        },
      },
      tokens: tokens,
    };

    const response = await admin.messaging().sendEachForMulticast(message);
    console.log(`Notification sent: ${response.successCount} successes, ${response.failureCount} failures.`);

    // Handle failed tokens — auto-cleanup stale/invalid tokens from DB
    if (response.failureCount > 0) {
      const staleTokens = [];

      response.responses.forEach((resp, idx) => {
        if (!resp.success) {
          const errorCode = resp.error?.code;
          console.error(`[FCM FAIL] Token[${idx}]: ${tokens[idx]}`);
          console.error(`[FCM FAIL] Error code: ${errorCode}`);
          console.error(`[FCM FAIL] Error message: ${resp.error?.message}`);

          // Collect tokens that are permanently invalid
          if (INVALID_TOKEN_CODES.includes(errorCode)) {
            staleTokens.push(tokens[idx]);
          }
        }
      });

      // Remove stale tokens from the database
      if (staleTokens.length > 0) {
        try {
          const result = await userModel.updateMany(
            { fcmToken: { $in: staleTokens } },
            { $set: { fcmToken: null } }
          );
          console.log(`[FCM] Cleared ${result.modifiedCount} stale token(s) from DB.`);
        } catch (dbErr) {
          console.error("[FCM] Failed to clear stale tokens from DB:", dbErr.message);
        }
      }
    }
  } catch (error) {
    console.error("Error sending notification:", error);
  }
};