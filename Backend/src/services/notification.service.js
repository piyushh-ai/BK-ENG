
import admin from "../config/firebase.js";

export const sendNewOrderNotification = async (tokens, orderData, salesmanName = "A Salesman") => {
  // If no tokens provided or Firebase is not initialized, abort silently
  if (!tokens || tokens.length === 0 || !admin.apps.length) return;

  try {
    const BASE_URL = "http://13.205.77.25";
    const orderPath = `/admin/all_orders?orderId=${orderData._id}`;

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
          // Show party name in bold using Android's inbox style title
          title: `New Order by ${salesmanName}`,
          body: orderData.partyName.toUpperCase(),
          // Large image (big picture style) — shows order's first image
          ...(imageUrl && { imageUrl }),
          // Icon badge
          notificationCount: 1,
          // Vibrate on arrival
          vibrateTimingsMillis: [0, 250, 250, 250],
          defaultVibrateTimings: false,
          clickAction: "default",
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
    console.log(tokens);
    

    // Log exact error for every failed token
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
    console.error("Error sending notification:", error);
  }
};