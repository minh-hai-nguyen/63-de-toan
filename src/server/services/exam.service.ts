import "server-only";
import { prisma } from "@/lib/prisma";
import type {
  ChoiceDTO,
  ExamSummaryDTO,
  ExamWithQuestionsDTO,
  QuestionDTO,
} from "@/lib/types";

function parseChoices(raw: string | null): ChoiceDTO[] {
  if (!raw) return [];
  try {
    return JSON.parse(raw) as ChoiceDTO[];
  } catch {
    return [];
  }
}

/** Danh sách toàn bộ đề (kèm số câu) để hiển thị trang /exams. */
export async function listExams(): Promise<ExamSummaryDTO[]> {
  const exams = await prisma.exam.findMany({
    orderBy: { number: "asc" },
    include: { _count: { select: { questions: true } }, questions: { select: { part: true } } },
  });
  return exams.map((e) => {
    const mcCount = e.questions.filter((q) => q.part === "MC").length;
    return {
      number: e.number,
      title: e.title,
      durationMin: e.durationMin,
      isPublished: e.isPublished,
      mcCount,
      essayCount: e.questions.length - mcCount,
    };
  });
}

function toQuestionDTO(q: {
  id: string;
  part: string;
  order: number;
  stem: string;
  choices: string | null;
  correctKey: string | null;
  solution: string | null;
  topic: string;
  difficulty: string;
  points: number;
}): QuestionDTO {
  return {
    id: q.id,
    part: q.part as "MC" | "ESSAY",
    order: q.order,
    stem: q.stem,
    choices: parseChoices(q.choices),
    correctKey: q.correctKey,
    solution: q.solution,
    topic: q.topic,
    difficulty: q.difficulty,
    points: q.points,
  };
}

/** Lấy 1 đề kèm câu hỏi (sắp theo thứ tự). null nếu không tồn tại. */
export async function getExamByNumber(
  number: number
): Promise<ExamWithQuestionsDTO | null> {
  const exam = await prisma.exam.findUnique({
    where: { number },
    include: { questions: { orderBy: { order: "asc" } } },
  });
  if (!exam) return null;
  const questions = exam.questions.map(toQuestionDTO);
  const mcCount = questions.filter((q) => q.part === "MC").length;
  return {
    id: exam.id,
    number: exam.number,
    title: exam.title,
    durationMin: exam.durationMin,
    isPublished: exam.isPublished,
    mcCount,
    essayCount: questions.length - mcCount,
    questions,
  };
}
