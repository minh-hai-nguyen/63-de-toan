"use client";

import QuestionView from "@/components/QuestionView";
import { useBookmarks } from "@/components/useBookmarks";
import type { QuestionDTO } from "@/lib/types";

/** Danh sách câu hỏi ở chế độ xem lại (đáp án + lời giải + đánh dấu). */
export default function ReviewList({
  questions,
  selected = {},
  initialBookmarks,
  canBookmark = true,
  subtitleById,
}: {
  questions: QuestionDTO[];
  selected?: Record<string, string | null>;
  initialBookmarks: string[];
  canBookmark?: boolean;
  /** Nhãn nhỏ hiển thị phía trên mỗi câu (vd tên đề). */
  subtitleById?: Record<string, string>;
}) {
  const bm = useBookmarks(initialBookmarks);
  return (
    <div className="space-y-4">
      {questions.map((q) => (
        <div key={q.id}>
          {subtitleById?.[q.id] && (
            <p className="mb-1 ml-1 text-xs font-medium uppercase tracking-wide text-slate-400">
              {subtitleById[q.id]}
            </p>
          )}
          <QuestionView
            question={q}
            mode="review"
            selectedKey={selected[q.id] ?? null}
            bookmarked={canBookmark ? bm.has(q.id) : undefined}
            onToggleBookmark={canBookmark ? () => bm.toggle(q.id) : undefined}
          />
        </div>
      ))}
    </div>
  );
}
