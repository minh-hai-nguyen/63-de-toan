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
  durationSec: number;
}) {
  const { userId, examNumber, answers, durationSec } = params;

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

  const attempt = await prisma.attempt.create({
    data: {
      userId,
      examId: exam.id,
      submittedAt: new Date(),
      durationSec,
      mcScore,
      mcMax,
      status: "SUBMITTED",
      answers: {
        create: details.map((d) => ({
          questionId: d.questionId,
          selectedKey: d.selectedKey,
          isCorrect: d.isCorrect,
        })),
      },
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
