import { NextResponse } from "next/server";

export async function GET() {
  const healthStatus = {
    API_URL: process.env.BACKEND_API_URL
  }

  console.log(process.env.BACKEND_API_URL)

  return NextResponse.json(healthStatus)
}
