import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";
import excelService from "@/services/excel.service";
import boschStockModel from "@/models/boschStock.model";
import companyStockModel from "@/models/companyStock.model";
import fs from "fs";
import path from "path";
import os from "os";

export async function POST(req) {
  try {
    await connectDB();

    const authResult = await requireAdmin(req);
    if (authResult.error) {
      return NextResponse.json({ message: authResult.error }, { status: authResult.status });
    }

    const formData = await req.formData();
    const boschFile = formData.get("bosch");
    const companyFile = formData.get("company");

    const processFile = async (file, model) => {
      const buffer = Buffer.from(await file.arrayBuffer());
      await excelService.importExcel(buffer, model);
    };
    if (boschFile && typeof boschFile === "object") {
      await processFile(boschFile, boschStockModel);
    }

    if (companyFile && typeof companyFile === "object") {
      await processFile(companyFile, companyStockModel);
    }

    // In a serverless environment (Vercel), memory cache isn't global across instances.
    // Since Next.js App Router API routes don't strictly use node-cache the same way as Express,
    // we would typically use Next.js's revalidatePath or revalidateTag here if we were caching responses.
    
    return NextResponse.json({ message: "Stock updated successfully ✅", user: authResult.user }, { status: 200 });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ message: "Internal server error", error: error.message }, { status: 500 });
  }
}
