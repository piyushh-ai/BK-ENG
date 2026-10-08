import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import userModel from "@/models/user.model";
import jwt from "jsonwebtoken";

export async function POST(req) {
  try {
    await connectDB();
    const { name, email, password } = await req.json();

    const isAlreadyRegistered = await userModel.findOne({ email });
    if (isAlreadyRegistered) return NextResponse.json({ message: "User already registered" }, { status: 400 });

    const user = await userModel.create({ name, email, password });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
    const isProd = process.env.NODE_ENV === "production";

    const response = NextResponse.json({ message: "User registered successfully", user, token }, { status: 201 });
    response.cookies.set("token", token, {
      httpOnly: true,
      secure: isProd,
      sameSite: isProd ? "none" : "lax",
      maxAge: 7 * 24 * 60 * 60,
    });

    return response;
  } catch (error) {
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}