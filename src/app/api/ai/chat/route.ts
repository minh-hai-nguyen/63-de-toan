import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { aiConfigured, askGemini, TUTOR_SYSTEM, type AiMessage } from "@/lib/ai";

/** Trợ lý AI: trao đổi kiến thức Toán với học sinh. */
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
  const raw = Array.isArray(body?.messages) ? body.messages : [];
  const messages: AiMessage[] = raw
    .slice(-12) // giữ 12 lượt gần nhất cho gọn
    .map((m: { role?: string; text?: string; content?: string }) => ({
      role: m.role === "model" ? "model" : "user",
      text: String(m.text ?? m.content ?? "").slice(0, 4000),
    }))
    .filter((m: AiMessage) => m.text);

  if (messages.length === 0)
    return NextResponse.json({ error: "Thiếu nội dung." }, { status: 400 });

  try {
    const reply = await askGemini({ system: TUTOR_SYSTEM, messages });
    return NextResponse.json({ reply });
  } catch {
    return NextResponse.json(
      { error: "AI tạm thời bận, em thử lại sau ít phút nhé." },
      { status: 502 }
    );
  }
}
