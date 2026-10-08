import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { getUser } from "@/lib/auth";
import userModel from "@/models/user.model";

export async function PUT(req) {
  try {
    await connectDB();
    const auth = await getUser(req);
    if (auth.error || auth.user.role !== "admin") return NextResponse.json({ message: "Forbidden" }, { status: 403 });

    const { userId, role } = await req.json();
    if (!["sales", "admin"].includes(role)) return NextResponse.json({ message: "Invalid role" }, { status: 400 });

    await userModel.findByIdAndUpdate(userId, { role });
    return NextResponse.json({ message: "Role updated successfully" });
  } catch (error) {
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}