import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { getUser } from "@/lib/auth";
import userModel from "@/models/user.model";

export async function POST(req) {
  try {
    await connectDB();
    const auth = await getUser(req);
    if (auth.error) return NextResponse.json({ message: auth.error }, { status: auth.status });

    const { fcmToken } = await req.json();
    if (!fcmToken) return NextResponse.json({ message: "Token is required" }, { status: 400 });

    await userModel.findByIdAndUpdate(auth.user._id, { fcmToken });
    return NextResponse.json({ message: "Token updated" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}