import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { getUser } from "@/lib/auth";
import salesOrderModel from "@/models/salesOrder.model";

export async function GET(req) {
  try {
    await connectDB();
    const auth = await getUser(req);
    if (auth.error) return NextResponse.json({ message: auth.error }, { status: auth.status });

    const searchParams = req.nextUrl.searchParams;
    const q = (searchParams.get("q") || "").trim();

    if (!q) {
      return NextResponse.json({ message: "Search query 'q' is required" }, { status: 400 });
    }

    const safeQ = q.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const regex = new RegExp(safeQ, "i");

    const orders = await salesOrderModel
      .find({
        user: auth.user._id,
        partyName: { $regex: regex },
      })
      .sort({ createdAt: -1 })
      .limit(20)
      .lean();

    return NextResponse.json({
      message: "Search results",
      orders,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}