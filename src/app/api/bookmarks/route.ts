import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { toggleBookmark } from "@/server/services/bookmark.service";

/** Bật/tắt đánh dấu "xem lại" cho 1 câu hỏi. */
export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user)
    return NextResponse.json({ error: "Chưa đăng nhập." }, { status: 401 });

  const body = await req.json().catch(() => null);
  const questionId = String(body?.questionId ?? "");
  if (!questionId)
    return NextResponse.json({ error: "Thiếu mã câu hỏi." }, { status: 400 });

  const res = await toggleBookmark(session.user.id, questionId);
  return NextResponse.json(res);
}
