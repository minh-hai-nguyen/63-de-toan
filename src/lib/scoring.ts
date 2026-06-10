// Helper chấm điểm trắc nghiệm và tổng hợp thống kê theo thể loại.

export type GradeQuestion = {
  id: string;
  part: string;
  correctKey: string | null;
  points: number;
  topic: string;
};

export type GradedAnswer = {
  questionId: string;
  selectedKey: string | null;
  isCorrect: boolean;
  topic: string;
  points: number;
};

export type GradeResult = {
  mcScore: number;
  mcMax: number;
  details: GradedAnswer[];
};

/** Chấm phần trắc nghiệm dựa trên đáp án HS chọn. */
export function gradeMultipleChoice(
  questions: GradeQuestion[],
  answers: Record<string, string | null>
): GradeResult {
  let mcScore = 0;
  let mcMax = 0;
  const details: GradedAnswer[] = [];

  for (const q of questions) {
    if (q.part !== "MC") continue;
    mcMax += q.points;
    const selectedKey = answers[q.id] ?? null;
    const isCorrect = !!selectedKey && selectedKey === q.correctKey;
    if (isCorrect) mcScore += q.points;
    details.push({
      questionId: q.id,
      selectedKey,
      isCorrect,
      topic: q.topic,
      points: q.points,
    });
  }

  return {
    mcScore: Math.round(mcScore * 100) / 100,
    mcMax: Math.round(mcMax * 100) / 100,
    details,
  };
}

export type TopicStat = {
  topic: string;
  correct: number;
  total: number;
  accuracy: number; // 0..1
};

/** Tổng hợp tỉ lệ đúng theo thể loại từ danh sách câu trả lời (đã chấm). */
export function aggregateTopicStats(
  rows: { topic: string; isCorrect: boolean | null }[]
): TopicStat[] {
  const map = new Map<string, { correct: number; total: number }>();
  for (const r of rows) {
    if (r.isCorrect === null || r.isCorrect === undefined) continue;
    const cur = map.get(r.topic) ?? { correct: 0, total: 0 };
    cur.total += 1;
    if (r.isCorrect) cur.correct += 1;
    map.set(r.topic, cur);
  }
  return Array.from(map.entries())
    .map(([topic, v]) => ({
      topic,
      correct: v.correct,
      total: v.total,
      accuracy: v.total ? v.correct / v.total : 0,
    }))
    .sort((a, b) => a.accuracy - b.accuracy);
}

/** Điểm tổng quy đổi về thang 10 (chỉ tính phần trắc nghiệm đã chấm tự động). */
export function formatScore(score: number): string {
  return Number.isInteger(score) ? String(score) : score.toFixed(2);
}

export function formatDuration(sec: number): string {
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `${m} phút ${s.toString().padStart(2, "0")} giây`;
}

export function formatDateTime(d: Date | string): string {
  const date = typeof d === "string" ? new Date(d) : d;
  return new Intl.DateTimeFormat("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}
