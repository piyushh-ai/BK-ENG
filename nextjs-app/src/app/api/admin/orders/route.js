import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { getUser } from "@/lib/auth";
import salesOrderModel from "@/models/salesOrder.model";
import { buildPagination } from "@/app/api/salesOrder/my/route";

export async function GET(req) {
  try {
    await connectDB();
    const auth = await getUser(req);
    if (auth.error || auth.user.role !== "admin") return NextResponse.json({ message: "Forbidden" }, { status: 403 });

    const searchParams = req.nextUrl.searchParams;
    const page = Math.max(1, parseInt(searchParams.get("page")) || 1);
    const limit = Math.min(2000, parseInt(searchParams.get("limit")) || 10);
    const skip = (page - 1) * limit;

    const filter = {};
    const startDate = searchParams.get("startDate");
    const endDate = searchParams.get("endDate");
    if (startDate || endDate) {
      filter.createdAt = {};
      if (startDate) filter.createdAt.$gte = new Date(startDate);
      if (endDate) {
        const end = new Date(endDate);
        end.setHours(23, 59, 59, 999);
        filter.createdAt.$lte = end;
      }
    }

    const [orders, total] = await Promise.all([
      salesOrderModel.find(filter).populate("user", "name email").sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
      salesOrderModel.countDocuments(filter),
    ]);

    return NextResponse.json({ message: "Orders fetched successfully", orders, pagination: buildPagination(total, page, limit) });
  } catch (error) {
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}