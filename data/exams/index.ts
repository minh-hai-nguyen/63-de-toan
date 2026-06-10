import type { ExamSeed } from "./types";
import { de01 } from "./de-01";
import { de02 } from "./de-02";

// Các đề đã nhập đầy đủ nội dung.
const filled: ExamSeed[] = [de01, de02];

// Tạo "khung" cho đủ 63 đề: những đề chưa có nội dung sẽ hiện trên danh sách
// nhưng ở trạng thái "Đang cập nhật" (isPublished = false, chưa có câu hỏi).
// Khi bạn nhập xong một đề mới, thêm file de-XX.ts rồi đưa vào mảng `filled`.
const TOTAL_EXAMS = 63;
const filledNumbers = new Set(filled.map((e) => e.number));

const placeholders: ExamSeed[] = [];
for (let n = 1; n <= TOTAL_EXAMS; n++) {
  if (filledNumbers.has(n)) continue;
  placeholders.push({
    number: n,
    title: `Đề số ${String(n).padStart(2, "0")}`,
    durationMin: 120,
    isPublished: false,
    questions: [],
  });
}

export const exams: ExamSeed[] = [...filled, ...placeholders].sort(
  (a, b) => a.number - b.number
);
