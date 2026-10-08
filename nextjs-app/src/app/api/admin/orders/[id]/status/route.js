import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { getUser } from "@/lib/auth";
import salesOrderModel from "@/models/salesOrder.model";

export async function PUT(req, { params }) {
  try {
    await connectDB();
    const auth = await getUser(req);
    if (auth.error || auth.user.role !== "admin") return NextResponse.json({ message: "Forbidden" }, { status: 403 });

    const { id } = await params;
    const { status, remark } = await req.json();

    const order = await salesOrderModel.findById(id);
    if (!order) return NextResponse.json({ message: "Order not found" }, { status: 404 });

    const prevStatus = order.status;
    if (status) order.status = status;
    if (remark !== undefined) order.remark = remark.trim();

    if ((status && status !== prevStatus) || remark !== undefined) {
      order.statusHistory.push({ status: order.status, remark: order.remark, changedBy: auth.user._id, changedByName: auth.user.name || "" });
    }

    await order.save();
    return NextResponse.json({ message: "Order updated successfully", order });
  } catch (error) {
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}