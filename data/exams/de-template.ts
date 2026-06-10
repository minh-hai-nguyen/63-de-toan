import type { ExamSeed } from "./types";

// ───────────────────────────────────────────────────────────────
// MẪU NHẬP ĐỀ MỚI
// 1) Copy file này thành de-03.ts (đổi số), điền nội dung.
// 2) Mở data/exams/index.ts, import và thêm vào mảng `filled`.
// 3) Chạy:  npm run db:seed   (nạp lại dữ liệu).
//
// Quy ước viết toán:
//   - Toán inline:  $...$        ví dụ  $x^2-4x+3=0$
//   - Toán khối:    $$...$$
//   - Dùng String.raw (biến R bên dưới) để KHÔNG phải nhân đôi dấu "\".
//   - Có thể chèn HTML, ví dụ bảng:  <table class="qtable">...</table>
//
// topic (thể loại) – dùng đúng các mã trong src/lib/taxonomy.ts:
//   PHUONG_TRINH_HE_PT, RUT_GON_BIEU_THUC, HAM_SO_DO_THI, BAT_PHUONG_TRINH,
//   HE_THUC_LUONG, HINH_HOC_DUONG_TRON, HINH_KHONG_GIAN, THONG_KE, XAC_SUAT,
//   TOAN_THUC_TE, BAT_DANG_THUC_GTLN_GTNN
// difficulty (độ khó): NHAN_BIET | THONG_HIEU | VAN_DUNG | VAN_DUNG_CAO
// ───────────────────────────────────────────────────────────────

const R = String.raw;

export const deTemplate: ExamSeed = {
  number: 3,
  title: "Đề số 03",
  durationMin: 120,
  isPublished: true,
  questions: [
    {
      part: "MC",
      order: 1,
      stem: R`Nội dung câu trắc nghiệm 1...`,
      choices: [
        { key: "A", text: R`$...$` },
        { key: "B", text: R`$...$` },
        { key: "C", text: R`$...$` },
        { key: "D", text: R`$...$` },
      ],
      correctKey: "A",
      topic: "PHUONG_TRINH_HE_PT",
      difficulty: "NHAN_BIET",
    },
    // ... thêm câu 2..8 (MC) ...
    {
      part: "ESSAY",
      order: 9,
      points: 1.5,
      topic: "PHUONG_TRINH_HE_PT",
      difficulty: "VAN_DUNG",
      hint: R`Hướng dẫn giải ngắn (gợi ý phương pháp)... (HS chỉ xem được sau khi nộp bài)`,
      stem: R`Nội dung câu tự luận 9...
Chèn hình (nếu có): <img class="qfig" src="/exam-figures/ten-hinh.png" alt="..." />`,
      solution: R`Lời giải chi tiết câu 9...`,
    },
    // ... thêm câu 10..15 (ESSAY) ...
  ],
};

export default deTemplate;
