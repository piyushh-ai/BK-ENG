import { NextResponse } from "next/server";
import boschStockModel from "@/models/boschStock.model";
import companyStockModel from "@/models/companyStock.model";
import { connectDB } from "@/lib/db";


const buildSearchQuery = (search) => {
  if (!search) return {};
  const tokens = search.trim().split(/\s+/);
  const andConditions = tokens.map((token) => {
    const regex = token
      .split("")
      .map((char) => char.replace(/[.*+?^$\{}()|[\]\\]/g, "\\$&"))
      .join("\\s*");
    return {
      $or: [
        { itemName: { $regex: regex, $options: "i" } },
        { partno: { $regex: regex, $options: "i" } },
        { sno: { $regex: regex, $options: "i" } },
        { description: { $regex: regex, $options: "i" } },
        { sheetName: { $regex: regex, $options: "i" } },
      ],
    };
  });
  return { $and: andConditions };
};


export async function GET(req) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const search = searchParams.get("search") || "";
    const page = parseInt(searchParams.get("page")) || 1;
    const limit = parseInt(searchParams.get("limit")) || 10;
    
    const query = buildSearchQuery(search);

    const [bosch, company] = await Promise.all([
      boschStockModel
        .find(query)
        .select("itemName partno")
        .limit(limit)
        .lean(),
      companyStockModel
        .find(query)
        .select("itemName partno sheetName")
        .limit(limit)
        .lean(),
    ]);

    const results = [
      ...bosch.map((item) => ({ ...item, source: "bosch" })),
      ...company.map((item) => ({ ...item, source: "company" })),
    ];

    return NextResponse.json({
      results,
      total: results.length,
    }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Internal server error", error: error.message }, { status: 500 });
  }
}