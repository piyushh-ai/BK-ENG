import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import userModel from "@/models/user.model";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "smtp-relay.brevo.com",
  port: process.env.SMTP_PORT || 587,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function POST(req) {
  try {
    await connectDB();
    const { email } = await req.json();
    if (!email) return NextResponse.json({ message: "Email is required" }, { status: 400 });

    const user = await userModel.findOne({ email });
    if (!user) return NextResponse.json({ message: "User not found" }, { status: 404 });

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    user.resetToken = otp;
    user.resetTokenExpiry = Date.now() + 15 * 60 * 1000;
    user.resetRequested = false;
    await user.save();

    const mailOptions = {
      from: '"B.K Engineering" <piyushairoliya122@gmail.com>',
      to: email,
      subject: "Password Reset OTP",
      text: `Your OTP for password reset is: ${otp}. It is valid for 15 minutes.`,
      html: `
        <div style="font-family: sans-serif; padding: 20px; color: #333;">
          <h2 style="color: #004e89;">Password Reset</h2>
          <p>You requested a password reset for your B.K Engineering account.</p>
          <p>Your One-Time Password (OTP) is:</p>
          <h1 style="background: #f0f4f8; padding: 10px 20px; display: inline-block; border-radius: 5px; letter-spacing: 5px;">${otp}</h1>
          <p>This OTP is valid for 15 minutes.</p>
          <p>If you did not request this, please ignore this email.</p>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);
    return NextResponse.json({ message: "An OTP has been sent to your email address." }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}