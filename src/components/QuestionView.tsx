"use client";

import { useState } from "react";
import MathContent from "@/components/MathContent";
import { cn } from "@/lib/cn";
import { difficultyLabel, topicLabel, DIFFICULTY_BADGE } from "@/lib/taxonomy";
import { Badge } from "@/components/ui";
import type { QuestionDTO } from "@/lib/types";

type Mode = "attempt" | "review";

export default function QuestionView({
  question,
  mode,
  selectedKey,
  onSelect,
  bookmarked,
  onToggleBookmark,
}: {
  question: QuestionDTO;
  mode: Mode;
  selectedKey?: string | null;
  onSelect?: (key: string) => void;
  bookmarked?: boolean;
  onToggleBookmark?: () => void;
}) {
  const [showSolution, setShowSolution] = useState(false);
  const isMC = question.part === "MC";

  return (
    <section
      id={`cau-${question.order}`}
      className="scroll-mt-24 rounded-2xl border border-slate-200/70 bg-white/80 p-5 shadow-sm"
    >
      <div className="mb-3 flex flex-wrap items-center gap-2">
        <span className="font-bold text-slate-800">Câu {question.order}</span>
        <Badge>{isMC ? "Trắc nghiệm" : "Tự luận"}</Badge>
        <Badge className={DIFFICULTY_BADGE[question.difficulty]}>
          {difficultyLabel(question.difficulty)}
        </Badge>
        <Badge className="border-slate-200 bg-slate-50 text-slate-500">
          {topicLabel(question.topic)}
        </Badge>
        {onToggleBookmark && (
          <button
            type="button"
            onClick={onToggleBookmark}
            title="Đánh dấu để xem lại"
            className={cn(
              "ml-auto rounded-lg px-2.5 py-1 text-sm font-medium transition",
              bookmarked
                ? "bg-amber-100 text-amber-700"
                : "text-slate-400 hover:bg-slate-100 hover:text-amber-600"
            )}
          >
            {bookmarked ? "🔖 Đã đánh dấu" : "🔖 Đánh dấu"}
          </button>
        )}
      </div>

      <MathContent html={question.stem} />

      {isMC && (
        <div className="mt-4 grid gap-2 sm:grid-cols-2">
          {question.choices.map((c) => {
            const selected = selectedKey === c.key;
            const isAnswer = question.correctKey === c.key;

            let tone =
              "border-slate-200 bg-white hover:border-indigo-300 hover:bg-indigo-50/40";
            if (mode === "attempt" && selected)
              tone = "border-indigo-500 bg-indigo-50 ring-1 ring-indigo-300";
            if (mode === "review") {
              if (isAnswer) tone = "border-emerald-400 bg-emerald-50";
              else if (selected) tone = "border-rose-400 bg-rose-50";
              else tone = "border-slate-200 bg-white";
            }

            return (
              <button
                key={c.key}
                type="button"
                disabled={mode === "review"}
                onClick={() => onSelect?.(c.key)}
                className={cn(
                  "flex items-start gap-2.5 rounded-xl border px-3.5 py-2.5 text-left transition",
                  tone,
                  mode === "review" && "cursor-default"
                )}
              >
                <span
                  className={cn(
                    "mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full text-xs font-bold",
                    selected || (mode === "review" && isAnswer)
                      ? "bg-white/80 text-slate-700"
                      : "bg-slate-100 text-slate-500"
                  )}
                >
                  {c.key}
                </span>
                <span className="flex-1">
                  <MathContent html={c.text} />
                </span>
                {mode === "review" && isAnswer && (
                  <span className="text-emerald-600">✓</span>
                )}
                {mode === "review" && selected && !isAnswer && (
                  <span className="text-rose-500">✗</span>
                )}
              </button>
            );
          })}
        </div>
      )}

      {!isMC && mode === "attempt" && (
        <p className="mt-4 rounded-xl bg-slate-50 px-4 py-3 text-sm text-slate-500">
          ✍️ Em trình bày lời giải ra giấy. Sau khi nộp bài có thể xem lời giải
          chi tiết để đối chiếu.
        </p>
      )}

      {!isMC && mode === "review" && question.solution && (
        <div className="mt-4">
          <button
            type="button"
            onClick={() => setShowSolution((s) => !s)}
            className="rounded-xl bg-indigo-50 px-4 py-2 text-sm font-medium text-indigo-700 transition hover:bg-indigo-100"
          >
            {showSolution ? "Ẩn lời giải" : "Xem lời giải"}
          </button>
          {showSolution && (
            <div className="mt-3 rounded-xl border border-indigo-100 bg-indigo-50/40 p-4">
              <MathContent html={question.solution} solution />
            </div>
          )}
        </div>
      )}
    </section>
  );
}
