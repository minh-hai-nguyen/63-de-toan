// Kiểu dữ liệu dùng chung giữa server và client (đã "phẳng hoá" từ Prisma).

export type ChoiceDTO = { key: string; text: string };

export type QuestionDTO = {
  id: string;
  part: "MC" | "ESSAY";
  order: number;
  stem: string;
  choices: ChoiceDTO[]; // rỗng nếu là tự luận
  correctKey: string | null;
  hint: string | null; // hướng dẫn giải ngắn (chỉ hiện sau khi nộp)
  solution: string | null;
  topic: string;
  difficulty: string;
  points: number;
};

export type ExamSummaryDTO = {
  number: number;
  title: string;
  durationMin: number;
  isPublished: boolean;
  mcCount: number;
  essayCount: number;
};

export type ExamWithQuestionsDTO = ExamSummaryDTO & {
  id: string;
  questions: QuestionDTO[];
};
