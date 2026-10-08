import { NextResponse } from "next/server";
import { getUser } from "@/lib/auth";

export async function GET(req) {
  const authResult = await getUser(req);
  if (authResult.error) {
    return NextResponse.json({ message: authResult.error }, { status: authResult.status });
  }
  return NextResponse.json({ user: authResult.user }, { status: 200 });
}