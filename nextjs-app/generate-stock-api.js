const fs = require("fs");
const path = require("path");

const apiDir = path.join(__dirname, "src", "app", "api", "getStock");

const createDir = (dir) => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
};

const buildSearchQueryString = `
const buildSearchQuery = (search) => {
  if (!search) return {};
  const tokens = search.trim().split(/\\s+/);
  const andConditions = tokens.map((token) => {
    const regex = token
      .split("")
      .map((char) => char.replace(/[.*+?^$\\{}()|[\\]\\\\]/g, "\\\\$&"))
      .join("\\\\s*");
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
`;

const boschStockContent = `
import { NextResponse } from "next/server";
import boschStockModel from "@/models/boschStock.model";
import { connectDB } from "@/lib/db";
import { requireAuth } from "@/lib/auth"; // fallback if you don't have requireAuth

${buildSearchQueryString}

export async function GET(req) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page")) || 1;
    const limit = parseInt(searchParams.get("limit")) || 10;
    const search = searchParams.get("search") || "";
    const startIndex = (page - 1) * limit;

    const query = buildSearchQuery(search);

    const [boschStock, totalDocuments] = await Promise.all([
      boschStockModel
        .find(query)
        .sort({ updatedAt: -1 })
        .skip(startIndex)
        .limit(limit)
        .lean(),
      boschStockModel.countDocuments(query),
    ]);

    const totalPages = Math.ceil(totalDocuments / limit);

    return NextResponse.json({
      message: "Bosch stock fetched successfully",
      boschStock,
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
`;

const companySheetsContent = `
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
`;

const companyStockContent = `
import { NextResponse } from "next/server";
import companyStockModel from "@/models/companyStock.model";
import { connectDB } from "@/lib/db";

${buildSearchQueryString}

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
`;

const masterSearchContent = `
import { NextResponse } from "next/server";
import boschStockModel from "@/models/boschStock.model";
import companyStockModel from "@/models/companyStock.model";
import { connectDB } from "@/lib/db";

${buildSearchQueryString}

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
`;

createDir(path.join(apiDir, "boschStock"));
fs.writeFileSync(path.join(apiDir, "boschStock", "route.js"), boschStockContent.trim());

createDir(path.join(apiDir, "company-sheets"));
fs.writeFileSync(path.join(apiDir, "company-sheets", "route.js"), companySheetsContent.trim());

createDir(path.join(apiDir, "company-stock", "[sheetName]"));
fs.writeFileSync(path.join(apiDir, "company-stock", "[sheetName]", "route.js"), companyStockContent.trim());

createDir(path.join(apiDir, "master-search"));
fs.writeFileSync(path.join(apiDir, "master-search", "route.js"), masterSearchContent.trim());

console.log("getStock API routes generated successfully!");
