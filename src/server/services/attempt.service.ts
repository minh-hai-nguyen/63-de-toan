import "server-only";
import { prisma } from "@/lib/prisma";
import { gradeMultipleChoice, type GradeQuestion } from "@/lib/scoring";

/**
 * Tạo một lượt làm bài đã nộp: chấm trắc nghiệm tự động và lưu kết quả.
 * `answers`: map questionId -> đáp án đã chọn (A..D).
 */
export async function submitAttempt(params: {
  userId: string;
  examNumber: number;
  answers: Record<string, string | null>;
  essayAnswers?: Record<string, string>;
  durationSec: number;
}) {
  const { userId, examNumber, answers, essayAnswers = {}, durationSec } = params;

  const exam = await prisma.exam.findUnique({
    where: { number: examNumber },
    include: { questions: true },
  });
  if (!exam || !exam.isPublished) throw new Error("Đề thi không tồn tại.");

  const gradeQuestions: GradeQuestion[] = exam.questions.map((q) => ({
    id: q.id,
    part: q.part,
    correctKey: q.correctKey,
    points: q.points,
    topic: q.topic,
  }));

  const { mcScore, mcMax, details } = gradeMultipleChoice(
    gradeQuestions,
    answers
  );

  // Bản ghi câu trả lời: trắc nghiệm (đã chấm) + tự luận (lưu bài làm để đối chiếu)
  const answerRows = [
    ...details.map((d) => ({
      questionId: d.questionId,
      selectedKey: d.selectedKey,
      isCorrect: d.isCorrect,
    })),
    ...exam.questions
      .filter((q) => q.part === "ESSAY" && (essayAnswers[q.id] ?? "").trim())
      .map((q) => ({
        questionId: q.id,
        essayText: essayAnswers[q.id].trim(),
      })),
  ];

  const attempt = await prisma.attempt.create({
    data: {
      userId,
      examId: exam.id,
      submittedAt: new Date(),
      durationSec,
      mcScore,
      mcMax,
      status: "SUBMITTED",
      answers: { create: answerRows },
    },
  });

  return { attemptId: attempt.id, mcScore, mcMax };
}

/** Lấy chi tiết một lượt làm bài (kèm đề, câu hỏi, đáp án). */
export async function getAttemptDetail(attemptId: string) {
  return prisma.attempt.findUnique({
    where: { id: attemptId },
    include: {
      user: { select: { id: true, displayName: true, username: true } },
      exam: { include: { questions: { orderBy: { order: "asc" } } } },
      answers: true,
    },
  });
}

/** Danh sách lượt làm bài của một học sinh, mới nhất trước. */
export async function listUserAttempts(userId: string) {
  return prisma.attempt.findMany({
    where: { userId, status: "SUBMITTED" },
    orderBy: { submittedAt: "desc" },
    include: { exam: { select: { number: true, title: true } } },
  });
}
