import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "送信内容を読み取れませんでした。" }, { status: 400 });
  }

  const body = payload as { name?: unknown; email?: unknown; message?: unknown; website?: unknown };
  if (typeof body.website === "string" && body.website.trim()) {
    return NextResponse.json({ ok: true, id: "received" });
  }

  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const message = typeof body.message === "string" ? body.message.trim() : "";

  if (!name || name.length > 80) {
    return NextResponse.json({ ok: false, error: "名前を80字以内で入力してください。" }, { status: 400 });
  }
  if (!emailPattern.test(email) || email.length > 200) {
    return NextResponse.json({ ok: false, error: "メールアドレスの形式を確認してください。" }, { status: 400 });
  }
  if (!message || message.length > 4000) {
    return NextResponse.json({ ok: false, error: "相談内容を4000字以内で入力してください。" }, { status: 400 });
  }

  const inquiry = await prisma.inquiry.create({
    data: { name, email, message },
  });

  return NextResponse.json({ ok: true, id: inquiry.id });
}
