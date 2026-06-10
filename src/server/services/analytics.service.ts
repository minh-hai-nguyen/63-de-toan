import "server-only";
import { prisma } from "@/lib/prisma";
import { aggregateTopicStats, type TopicStat } from "@/lib/scoring";

/** Tỉ lệ đúng theo thể loại của một học sinh (từ các câu trắc nghiệm đã nộp). */
export async function getUserTopicStats(userId: string): Promise<TopicStat[]> {
  const rows = await prisma.answer.findMany({
    where: { attempt: { userId, status: "SUBMITTED" } },
    select: { isCorrect: true, question: { select: { topic: true } } },
  });
  return aggregateTopicStats(
    rows.map((r) => ({ topic: r.question.topic, isCorrect: r.isCorrect }))
  );
}

/** Tổng quan kết quả của một học sinh. */
export async function getUserSummary(userId: string) {
  const attempts = await prisma.attempt.findMany({
    where: { userId, status: "SUBMITTED" },
    select: { mcScore: true, mcMax: true, durationSec: true },
  });
  const count = attempts.length;
  const avgPct =
    count === 0
      ? 0
      : attempts.reduce(
          (s, a) => s + (a.mcMax > 0 ? a.mcScore / a.mcMax : 0),
          0
        ) / count;
  return { count, avgPct };
}

export type StudentRow = {
  id: string;
  displayName: string;
  username: string;
  className: string | null;
  attemptCount: number;
  avgPct: number;
  weakestTopic: string | null;
};

/** Tổng quan toàn lớp cho giáo viên: từng HS + thể loại yếu nhất. */
export async function getClassOverview(): Promise<{
  students: StudentRow[];
  classTopicStats: TopicStat[];
}> {
  const students = await prisma.user.findMany({
    where: { role: "STUDENT" },
    orderBy: { displayName: "asc" },
    select: {
      id: true,
      displayName: true,
      username: true,
      className: true,
      attempts: {
        where: { status: "SUBMITTED" },
        select: {
          mcScore: true,
          mcMax: true,
          answers: {
            select: { isCorrect: true, question: { select: { topic: true } } },
          },
        },
      },
    },
  });

  const studentRows: StudentRow[] = students.map((s) => {
    const attemptCount = s.attempts.length;
    const avgPct =
      attemptCount === 0
        ? 0
        : s.attempts.reduce(
            (acc, a) => acc + (a.mcMax > 0 ? a.mcScore / a.mcMax : 0),
            0
          ) / attemptCount;
    const topicStats = aggregateTopicStats(
      s.attempts.flatMap((a) =>
        a.answers.map((ans) => ({
          topic: ans.question.topic,
          isCorrect: ans.isCorrect,
        }))
      )
    );
    return {
      id: s.id,
      displayName: s.displayName,
      username: s.username,
      className: s.className,
      attemptCount,
      avgPct,
      weakestTopic: topicStats.length ? topicStats[0].topic : null,
    };
  });

  // Thống kê thể loại toàn lớp
  const allAnswers = await prisma.answer.findMany({
    where: { attempt: { status: "SUBMITTED" } },
    select: { isCorrect: true, question: { select: { topic: true } } },
  });
  const classTopicStats = aggregateTopicStats(
    allAnswers.map((r) => ({ topic: r.question.topic, isCorrect: r.isCorrect }))
  );

  return { students: studentRows, classTopicStats };
}

/** Thông tin chi tiết một học sinh cho giáo viên. */
export async function getStudentDetail(studentId: string) {
  const student = await prisma.user.findUnique({
    where: { id: studentId },
    select: {
      id: true,
      displayName: true,
      username: true,
      className: true,
      role: true,
    },
  });
  if (!student || student.role !== "STUDENT") return null;

  const attempts = await prisma.attempt.findMany({
    where: { userId: studentId, status: "SUBMITTED" },
    orderBy: { submittedAt: "desc" },
    include: { exam: { select: { number: true, title: true } } },
  });
  const topicStats = await getUserTopicStats(studentId);
  return { student, attempts, topicStats };
}
