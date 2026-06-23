import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import {
  aiConfigured,
  askGemini,
  stripHtml,
  ESSAY_SYSTEM,
} from "@/lib/ai";

/** AI nhận xét bài tự luận: so bài làm HS với lời giải mẫu, cho nhận xét + điểm gợi ý. */
export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user)
    return NextResponse.json({ error: "Chưa đăng nhập." }, { status: 401 });
  if (!aiConfigured())
    return NextResponse.json(
      { error: "Tính năng AI chưa được bật (thiếu GEMINI_API_KEY)." },
      { status: 503 }
    );

  const body = await req.json().catch(() => null);
  const questionId = String(body?.questionId ?? "");
  const studentAnswer = String(body?.studentAnswer ?? "").slice(0, 6000).trim();
  if (!questionId)
    return NextResponse.json({ error: "Thiếu câu hỏi." }, { status: 400 });
  if (!studentAnswer)
    return NextResponse.json(
      { error: "Chưa có bài làm để nhận xét." },
      { status: 400 }
    );

  // Lấy đề + lời giải mẫu từ server (không tin dữ liệu client gửi lên)
  const q = await prisma.question.findUnique({ where: { id: questionId } });
  if (!q || q.part !== "ESSAY")
    return NextResponse.json({ error: "Câu hỏi không hợp lệ." }, { status: 404 });

  const user = [
    `ĐỀ BÀI:\n${stripHtml(q.stem)}`,
    `\nLỜI GIẢI MẪU:\n${stripHtml(q.solution ?? "(không có)")}`,
    `\nBÀI LÀM CỦA HỌC SINH:\n${studentAnswer}`,
    `\nThang điểm của câu này: ${q.points} điểm.`,
  ].join("\n");

  try {
    const feedback = await askGemini({
      system: ESSAY_SYSTEM,
      messages: [{ role: "user", text: user }],
      maxTokens: 800,
    });
    return NextResponse.json({ feedback });
  } catch {
    return NextResponse.json(
      { error: "AI tạm thời bận, em thử lại sau ít phút nhé." },
      { status: 502 }
    );
  }
}
