import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { getUser } from "@/lib/auth";
import salesOrderModel from "@/models/salesOrder.model";
import userModel from "@/models/user.model";
import cloudinary from "@/config/cloudinary";
import { sendNewOrderNotification } from "@/services/notification.service";

// Upload buffer to cloudinary
const uploadToCloudinary = (buffer, folder) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder },
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      }
    );
    uploadStream.end(buffer);
  });
};

export async function POST(req) {
  try {
    await connectDB();
    const auth = await getUser(req);
    if (auth.error) return NextResponse.json({ message: auth.error }, { status: auth.status });

    const formData = await req.formData();
    const partyName = formData.get("partyName");
    const description = formData.get("description");
    const files = formData.getAll("images"); // assuming images is the field name

    if (!partyName?.trim()) {
      return NextResponse.json({ message: "Party name is required" }, { status: 400 });
    }

    if (!description?.trim() && (!files || files.length === 0)) {
      return NextResponse.json({ message: "Please provide either a description or an order image." }, { status: 400 });
    }

    const images = [];
    for (const file of files) {
      if (file && typeof file !== 'string') {
        const buffer = Buffer.from(await file.arrayBuffer());
        const result = await uploadToCloudinary(buffer, "sales_orders");
        images.push({ url: result.secure_url, publicId: result.public_id });
      }
    }

    const order = await salesOrderModel.create({
      partyName: partyName.trim(),
      description: description?.trim() || "",
      images,
      user: auth.user._id,
    });

    setImmediate(async () => {
      try {
        const admins = await userModel.find({ role: "admin", fcmToken: { $ne: null } }).lean();
        const tokens = admins.map((a) => a.fcmToken).filter(Boolean);
        if (tokens.length > 0) sendNewOrderNotification(tokens, order, auth.user.name);
      } catch (e) {
        console.error("Notif error", e);
      }
    });

    return NextResponse.json({ message: "Sales order created successfully", order }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}