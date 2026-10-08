import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    version: "1.0.1",
    forceUpdate: true,
    updateUrl: "YOUR_GOOGLE_DRIVE_LINK_HERE"
  });
}
