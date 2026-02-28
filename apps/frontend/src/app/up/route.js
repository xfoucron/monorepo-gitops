import { NextResponse } from "next/server";

export async function GET() {
    const healthStatus = {
        status: "ok",
        timestamp: new Date().toISOString(),
    }

    return NextResponse.json(healthStatus)
}
