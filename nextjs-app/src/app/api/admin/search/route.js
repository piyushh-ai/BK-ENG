import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { getUser } from "@/lib/auth";
import salesOrderModel from "@/models/salesOrder.model";

export async function GET(req) {
  try {
    await connectDB();
    const auth = await getUser(req);
    if (auth.error || auth.user.role !== "admin") return NextResponse.json({ message: "Forbidden" }, { status: 403 });

    const searchParams = req.nextUrl.searchParams;
    const q = (searchParams.get("q") || "").trim();
    if (!q) return NextResponse.json({ message: "Search query required" }, { status: 400 });

    const safeQ = q.replace(/[.*+?^${()|[\]\\]/g, "\\$&");
    const regex = new RegExp(safeQ, "i");

    const orders = await salesOrderModel.find({ partyName: { $regex: regex } }).populate("user", "name email").sort({ createdAt: -1 }).limit(20).lean();
    return NextResponse.json({ message: "Search completed", orders });
  } catch (error) {
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}