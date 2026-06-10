// Phân loại câu hỏi: thể loại (topic) và độ khó (difficulty).
// Dùng String trong DB; file này là nguồn nhãn tiếng Việt + màu hiển thị.

export const TOPICS = {
  PHUONG_TRINH_HE_PT: "Phương trình & hệ phương trình",
  RUT_GON_BIEU_THUC: "Rút gọn biểu thức (căn thức)",
  HAM_SO_DO_THI: "Hàm số & đồ thị",
  BAT_PHUONG_TRINH: "Bất phương trình",
  HE_THUC_LUONG: "Hệ thức lượng & tỉ số lượng giác",
  HINH_HOC_DUONG_TRON: "Hình học (đường tròn)",
  HINH_KHONG_GIAN: "Hình học không gian (thể tích)",
  THONG_KE: "Thống kê",
  XAC_SUAT: "Xác suất",
  TOAN_THUC_TE: "Toán thực tế",
  BAT_DANG_THUC_GTLN_GTNN: "Bất đẳng thức, GTLN–GTNN",
} as const;

export type TopicKey = keyof typeof TOPICS;

export const TOPIC_KEYS = Object.keys(TOPICS) as TopicKey[];

export function topicLabel(key: string): string {
  return (TOPICS as Record<string, string>)[key] ?? key;
}

export const DIFFICULTIES = {
  NHAN_BIET: { label: "Nhận biết", color: "emerald" },
  THONG_HIEU: { label: "Thông hiểu", color: "sky" },
  VAN_DUNG: { label: "Vận dụng", color: "amber" },
  VAN_DUNG_CAO: { label: "Vận dụng cao", color: "rose" },
} as const;

export type DifficultyKey = keyof typeof DIFFICULTIES;

export function difficultyLabel(key: string): string {
  return (DIFFICULTIES as Record<string, { label: string }>)[key]?.label ?? key;
}

// Bảng lớp màu Tailwind cho badge độ khó (tĩnh để Tailwind nhận diện).
export const DIFFICULTY_BADGE: Record<string, string> = {
  NHAN_BIET: "bg-emerald-100 text-emerald-700 border-emerald-200",
  THONG_HIEU: "bg-sky-100 text-sky-700 border-sky-200",
  VAN_DUNG: "bg-amber-100 text-amber-700 border-amber-200",
  VAN_DUNG_CAO: "bg-rose-100 text-rose-700 border-rose-200",
};
