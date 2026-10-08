import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { getUser } from "@/lib/auth";
import salesOrderModel from "@/models/salesOrder.model";

// DELETE /api/admin/orders/[id]  — admin delete order
export async function DELETE(req, { params }) {
  try {
    await connectDB();
    const auth = await getUser(req);
    if (auth.error || auth.user.role !== "admin") {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    const { id } = await params;
    const deleted = await salesOrderModel.findByIdAndDelete(id);
    if (!deleted) {
      return NextResponse.json({ message: "Order not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Order deleted successfully" });
  } catch (error) {
    console.error("Delete order error:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}

// GET /api/admin/orders/[id]  — fetch single order
export async function GET(req, { params }) {
  try {
    await connectDB();
    const auth = await getUser(req);
    if (auth.error || auth.user.role !== "admin") {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    const { id } = await params;
    const order = await salesOrderModel.findById(id).populate("user", "name email").lean();
    if (!order) {
      return NextResponse.json({ message: "Order not found" }, { status: 404 });
    }

    return NextResponse.json({ order });
  } catch (error) {
    console.error("Get order error:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
