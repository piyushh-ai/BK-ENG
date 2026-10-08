import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { getUser } from "@/lib/auth";
import salesOrderModel from "@/models/salesOrder.model";

export const buildPagination = (total, page, limit) => ({
  total,
  totalPages: Math.ceil(total / limit),
  currentPage: page,
  pageSize: limit,
  hasNextPage: page < Math.ceil(total / limit),
  hasPrevPage: page > 1,
});

export async function GET(req) {
  try {
    await connectDB();
    const auth = await getUser(req);
    if (auth.error) return NextResponse.json({ message: auth.error }, { status: auth.status });

    const searchParams = req.nextUrl.searchParams;
    const page = Math.max(1, parseInt(searchParams.get("page")) || 1);
    const limit = Math.min(2000, parseInt(searchParams.get("limit")) || 10);
    const skip = (page - 1) * limit;

    const filter = { user: auth.user._id };

    const [orders, total] = await Promise.all([
      salesOrderModel
        .find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      salesOrderModel.countDocuments(filter),
    ]);

    return NextResponse.json({
      message: "Your orders fetched successfully",
      orders,
      pagination: buildPagination(total, page, limit),
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}