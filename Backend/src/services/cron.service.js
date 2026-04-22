import cron from "node-cron";
import userModel from "../models/user.model.js";
import salesOrderModel from "../models/salesOrder.model.js";
import cloudinary from "../config/cloudinary.js";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "smtp-relay.brevo.com",
  port: process.env.SMTP_PORT || 587,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export const initCronJobs = () => {
  // 1. Send warning emails on the 26th and 29th of every month at 9:00 AM
  cron.schedule("0 9 26,29 * *", async () => {
    try {
      console.log("Running scheduled task: Sending deletion warning emails to admins...");
      const admins = await userModel.find({ role: "admin" });
      if (!admins || admins.length === 0) {
        console.log("No admins found to send warning email.");
        return;
      }

      const emailPromises = admins.map((admin) => {
        const mailOptions = {
          from: '"B.K Engineering" <piyushairoliya122@gmail.com>',
          to: admin.email,
          subject: "⚠️ Urgent: All Orders Scheduled for Auto-Deletion",
          html: `
            <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
              <h2 style="color: #e11d48;">Monthly Order Cleanup Warning</h2>
              <p>Hello ${admin.name},</p>
              <p>This is an automated reminder that <strong>all orders</strong> in the system are scheduled to be permanently deleted at the end of this month.</p>
              <p>Please review all pending and completed orders to ensure nothing important is lost. This action is irreversible and will also remove all associated order images.</p>
              <br/>
              <a href="http://13.205.77.2/admin" style="background: #4f46e5; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">Review Admin Order List</a>
              <br/><br/>
              <p>Thank you,<br/>BK-ENG System</p>
            </div>
          `
        };
        return transporter.sendMail(mailOptions);
      });

      await Promise.allSettled(emailPromises);
      console.log(`Successfully sent warning emails to ${admins.length} admin(s).`);
    } catch (error) {
      console.error("Error sending warning emails:", error);
    }
  });

  // 2. Auto delete all orders on the last day of the month at 11:55 PM
  cron.schedule("55 23 * * *", async () => {
    try {
      // Check if tomorrow is the 1st of the month (meaning today is the last day)
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      
      if (tomorrow.getDate() !== 1) {
        // Not the last day of the month, do nothing
        return;
      }

      console.log("Running scheduled task: Deleting all orders and images for month end...");
      
      const orders = await salesOrderModel.find({});
      if (orders.length === 0) {
        console.log("No orders found to delete.");
        return;
      }

      let deletedImagesCount = 0;

      // Extract and delete all Cloudinary images sequentially to avoid rate limits
      for (const order of orders) {
        if (order.images && order.images.length > 0) {
          for (const img of order.images) {
            if (img.publicId) {
              try {
                await cloudinary.uploader.destroy(img.publicId);
                deletedImagesCount++;
              } catch (cloudErr) {
                console.error("Failed to delete image:", img.publicId, cloudErr);
              }
            }
          }
        }
      }

      console.log(`Successfully deleted ${deletedImagesCount} images from Cloudinary.`);

      // Delete all orders from DB
      const deleteResult = await salesOrderModel.deleteMany({});
      console.log(`Successfully deleted ${deleteResult.deletedCount} orders from the database.`);
      
    } catch (error) {
      console.error("Error during automated order deletion:", error);
    }
  });
};
