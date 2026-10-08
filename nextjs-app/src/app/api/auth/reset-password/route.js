import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import userModel from "@/models/user.model";

export async function POST(req) {
  try {
    await connectDB();
    const { otp, newPassword } = await req.json();
    if (!otp || !newPassword) return NextResponse.json({ message: "OTP and new password are required" }, { status: 400 });

    const user = await userModel.findOne({
      resetToken: otp,
      resetTokenExpiry: { $gt: Date.now() }
    });

    if (!user) return NextResponse.json({ message: "Invalid or expired OTP" }, { status: 400 });

    user.password = newPassword;
    user.resetToken = null;
    user.resetTokenExpiry = null;
    user.resetRequested = false;
    await user.save();

    return NextResponse.json({ message: "Password reset successfully" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}