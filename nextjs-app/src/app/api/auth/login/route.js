import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import userModel from "@/models/user.model";
import jwt from "jsonwebtoken";

export async function POST(req) {
  try {
    await connectDB();
    const { email, password } = await req.json();

    const user = await userModel.findOne({ email }).select("+password");
    if (!user) return NextResponse.json({ message: "User not found" }, { status: 404 });

    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) return NextResponse.json({ message: "Invalid password" }, { status: 401 });

    const userResponse = user.toObject();
    delete userResponse.password;

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
    const isProd = process.env.NODE_ENV === "production";

    const response = NextResponse.json({ message: "User logged in successfully", user: userResponse, token }, { status: 200 });
    response.cookies.set("token", token, {
      httpOnly: true,
      secure: isProd,
      sameSite: isProd ? "none" : "lax",
      maxAge: 7 * 24 * 60 * 60,
    });

    return response;
  } catch (error) {
    console.error("Login Error:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}