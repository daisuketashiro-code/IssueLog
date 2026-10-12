import { runCollector } from "@/bots/collector/index";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

export async function GET(request: Request) {
  const secret = process.env.CRON_SECRET?.trim();
  if (process.env.NODE_ENV === "production" && !secret) {
    return NextResponse.json({ error: "CRON_SECRET が未設定です" }, { status: 500 });
  }
  if (secret && request.headers.get("authorization") !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const report = await runCollector();
  return NextResponse.json(report);
}
