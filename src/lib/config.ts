// Cấu hình tập trung của ứng dụng. Sửa ở đây thay vì rải rác nhiều nơi.

export const APP = {
  name: "Luyện thi Toán",
  tagline: "Ôn luyện 63 đề thi tuyển sinh lớp 10",
  totalExams: 63,
  defaultDurationMin: 120,
  /** Số câu trắc nghiệm tối thiểu để được tính vào thống kê thể loại. */
  minMcForStats: 1,
} as const;

export const ROLES = {
  STUDENT: "STUDENT",
  TEACHER: "TEACHER",
} as const;

export const ROUTES = {
  home: "/",
  login: "/login",
  register: "/register",
  exams: "/exams",
  exam: (n: number | string) => `/exams/${n}`,
  attempt: (n: number | string) => `/exams/${n}/attempt`,
  result: (n: number | string, attemptId: string) =>
    `/exams/${n}/result/${attemptId}`,
  dashboard: "/dashboard",
  review: "/review",
  teacher: "/teacher",
  teacherStudent: (id: string) => `/teacher/students/${id}`,
} as const;
