import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { getUser } from "@/lib/auth";
import salesOrderModel from "@/models/salesOrder.model";
import cloudinary from "@/config/cloudinary";

export async function GET(req, { params }) {
  try {
    await connectDB();
    const auth = await getUser(req);
    if (auth.error) return NextResponse.json({ message: auth.error }, { status: auth.status });

    const { id } = await params;
    const order = await salesOrderModel.findById(id).populate("user", "name email").lean();

    if (!order) return NextResponse.json({ message: "Order not found" }, { status: 404 });

    const isAdmin = auth.user.role === "admin";
    const isOwner = order.user._id.toString() === auth.user._id.toString();

    if (!isAdmin && !isOwner) {
      return NextResponse.json({ message: "Forbidden: you can only view your own orders" }, { status: 403 });
    }

    return NextResponse.json({ message: "Order fetched successfully", order });
  } catch (error) {
    if (error.name === "CastError") return NextResponse.json({ message: "Invalid order ID" }, { status: 400 });
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  try {
    await connectDB();
    const auth = await getUser(req);
    if (auth.error) return NextResponse.json({ message: auth.error }, { status: auth.status });

    const { id } = await params;
    const order = await salesOrderModel.findById(id);

    if (!order) return NextResponse.json({ message: "Order not found" }, { status: 404 });

    if (order.user.toString() !== auth.user._id.toString()) {
      return NextResponse.json({ message: "Forbidden: you can only delete your own orders" }, { status: 403 });
    }

    if (order.status !== "pending") {
      return NextResponse.json({ message: `Order cannot be deleted. Current status is "${order.status}".` }, { status: 403 });
    }

    if (order.images?.length > 0) {
       await Promise.allSettled(
         order.images.map((img) => cloudinary.uploader.destroy(img.publicId))
       );
    }

    await order.deleteOne();

    return NextResponse.json({ message: "Order deleted successfully" });
  } catch (error) {
    if (error.name === "CastError") return NextResponse.json({ message: "Invalid order ID" }, { status: 400 });
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}