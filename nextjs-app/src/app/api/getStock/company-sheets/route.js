import { NextResponse } from "next/server";
import companyStockModel from "@/models/companyStock.model";
import { connectDB } from "@/lib/db";

export async function GET(req) {
  try {
    await connectDB();
    const companySheets = await companyStockModel.distinct("sheetName");
    return NextResponse.json({
      message: "Company sheets fetched successfully",
      companySheets,
    }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Internal server error", error: error.message }, { status: 500 });
  }
}