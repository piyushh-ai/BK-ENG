import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { getUser } from "@/lib/auth";
import userModel from "@/models/user.model";

export async function GET(req) {
  try {
    await connectDB();
    const auth = await getUser(req);
    if (auth.error || auth.user.role !== "admin") return NextResponse.json({ message: "Forbidden" }, { status: 403 });

    const users = await userModel.find().select("-password").sort({ createdAt: -1 });
    return NextResponse.json({ users });
  } catch (error) {
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}