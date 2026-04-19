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
      webpush: {
        fcmOptions: {
          link: `${BASE_URL}${orderPath}`
        }
      },
      tokens: tokens
    };

    const response = await admin.messaging().sendEachForMulticast(message);
    console.log(`Notification sent: ${response.successCount} successes, ${response.failureCount} failures.`);
  } catch (error) {
    console.log("Error sending notification:", error);
  }
};