import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { submitAttempt } from "@/server/services/attempt.service";

/** Nộp bài: chấm trắc nghiệm, lưu bài làm tự luận, trả về id lượt làm. */
export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user)
    return NextResponse.json({ error: "Chưa đăng nhập." }, { status: 401 });

  const body = await req.json().catch(() => null);
  const examNumber = Number(body?.examNumber);
  if (!Number.isInteger(examNumber))
    return NextResponse.json({ error: "Thiếu mã đề." }, { status: 400 });

  try {
    const { attemptId, mcScore, mcMax } = await submitAttempt({
      userId: session.user.id,
      examNumber,
      answers: body?.answers ?? {},
      essayAnswers: body?.essayAnswers ?? {},
      durationSec: Number(body?.durationSec) || 0,
    });
    return NextResponse.json({ attemptId, mcScore, mcMax });
  } catch (e) {
    return NextResponse.json(
      { error: (e as Error).message || "Lỗi nộp bài." },
      { status: 400 }
    );
  }
}
