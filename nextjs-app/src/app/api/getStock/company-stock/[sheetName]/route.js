import { NextResponse } from "next/server";
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


export async function GET(req, { params }) {
  try {
    await connectDB();
    
    // next 15 async params
    const { sheetName } = await params;
    
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page")) || 1;
    const limit = parseInt(searchParams.get("limit")) || 10;
    const search = searchParams.get("search") || "";
    const startIndex = (page - 1) * limit;

    const query = buildSearchQuery(search);
    query.sheetName = sheetName;

    const [companyStock, totalDocuments] = await Promise.all([
      companyStockModel
        .find(query)
        .sort({ updatedAt: -1 })
        .skip(startIndex)
        .limit(limit)
        .lean(),
      companyStockModel.countDocuments(query),
    ]);

    const totalPages = Math.ceil(totalDocuments / limit);

    return NextResponse.json({
      message: "Company stock fetched successfully",
      companyStock,
      pagination: {
        totalDocuments,
        totalPages,
        currentPage: page,
        pageSize: limit,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1,
      },
    }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Internal server error", error: error.message }, { status: 500 });
  }
}