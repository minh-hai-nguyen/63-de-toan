// Kiểu dữ liệu cho một đề thi dùng để seed vào CSDL.
// LaTeX viết trong các trường stem/solution/choice.text — dùng String.raw để
// giữ nguyên dấu "\" (ví dụ \frac, \sqrt). Toán inline đặt giữa cặp $...$,
// toán hiển thị khối đặt giữa $$...$$. Có thể chèn HTML (vd <table>).

export type Choice = { key: "A" | "B" | "C" | "D"; text: string };

export type SeedQuestion = {
  part: "MC" | "ESSAY";
  order: number;
  stem: string;
  choices?: Choice[]; // chỉ MC
  correctKey?: "A" | "B" | "C" | "D"; // chỉ MC
  solution?: string; // lời giải
  topic: string; // mã thể loại, xem src/lib/taxonomy.ts
  difficulty: "NHAN_BIET" | "THONG_HIEU" | "VAN_DUNG" | "VAN_DUNG_CAO";
  points?: number;
};

export type ExamSeed = {
  number: number; // 1..63
  title: string;
  durationMin?: number;
  isPublished?: boolean;
  questions: SeedQuestion[];
};
