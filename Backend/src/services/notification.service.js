import admin from "../config/firebase.js";

export const sendNewOrderNotification = async (tokens, orderData) => {
  // If no tokens provided or Firebase is not initialized, abort silently
  if (!tokens || tokens.length === 0 || !admin.apps.length) return;

  try {
    const BASE_URL = "https://bk-eng.onrender.com";
    const orderPath = `/admin/all_orders?orderId=${orderData._id}`;

    const message = {
      notification: {
        title: "🔥 New Order Punched!",
        body: `Order from ${orderData.partyName} has been created.`,
      },
      data: {
        url: orderPath
      },
      android: {
        priority: "high",
        notification: {
          // Must match the channel created in useMobilePush.ts
          channelId: "orders-v2",
        },
      },
      webpush: {
        fcmOptions: {
          link: `${BASE_URL}${orderPath}`
        }
      },
      tokens: tokens
    };

    const response = await admin.messaging().sendEachForMulticast(message);
    console.log(`Notification sent: ${response.successCount} successes, ${response.failureCount} failures.`);

    // Log the exact error for every failed token
    if (response.failureCount > 0) {
      response.responses.forEach((resp, idx) => {
        if (!resp.success) {
          console.error(`[FCM FAIL] Token[${idx}]: ${tokens[idx]}`);
          console.error(`[FCM FAIL] Error code: ${resp.error?.code}`);
          console.error(`[FCM FAIL] Error message: ${resp.error?.message}`);
        }
      });
    }
  } catch (error) {
    console.log("Error sending notification:", error);
  }
};