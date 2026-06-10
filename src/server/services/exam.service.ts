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
  hint: string | null;
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
    hint: q.hint,
    solution: q.solution,
    topic: q.topic,
    difficulty: q.difficulty,
    points: q.points,
  };
}

/** Bỏ đáp án/lời giải/gợi ý — dùng khi gửi đề xuống lúc HS đang làm bài. */
function stripAnswers(q: QuestionDTO): QuestionDTO {
  return { ...q, correctKey: null, hint: null, solution: null };
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

/**
 * Đề dùng cho màn LÀM BÀI: đã loại bỏ đáp án/gợi ý/lời giải để không lộ
 * cho học sinh trước khi nộp. Việc chấm vẫn dựa trên dữ liệu gốc ở server.
 */
export async function getExamForAttempt(
  number: number
): Promise<ExamWithQuestionsDTO | null> {
  const exam = await getExamByNumber(number);
  if (!exam) return null;
  return { ...exam, questions: exam.questions.map(stripAnswers) };
}
