"use client";

import { memo, useState } from "react";
import MathContent from "@/components/MathContent";
import { cn } from "@/lib/cn";
import { difficultyLabel, topicLabel, DIFFICULTY_BADGE } from "@/lib/taxonomy";
import { Badge } from "@/components/ui";
import type { QuestionDTO } from "@/lib/types";

type Mode = "attempt" | "review";

type Props = {
  question: QuestionDTO;
  mode: Mode;
  selectedKey?: string | null;
  onSelect?: (questionId: string, key: string) => void;
  essayValue?: string; // attempt: nội dung đang nhập
  onEssayChange?: (questionId: string, text: string) => void;
  studentEssay?: string | null; // review: bài làm đã nộp
  aiEnabled?: boolean; // review: cho phép "Nhờ AI nhận xét"
  bookmarked?: boolean;
  onToggleBookmark?: (questionId: string) => void;
};

/** Nút "Nhờ AI nhận xét" cho bài tự luận (chế độ xem lại). */
function AiFeedback({
  questionId,
  studentAnswer,
}: {
  questionId: string;
  studentAnswer: string;
}) {
  const [state, setState] = useState<"idle" | "loading" | "done" | "error">(
    "idle"
  );
  const [text, setText] = useState("");

  async function run() {
    setState("loading");
    try {
      const res = await fetch("/api/ai/essay-feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ questionId, studentAnswer }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Lỗi");
      setText(data.feedback);
      setState("done");
    } catch (e) {
      setText((e as Error).message || "AI tạm thời bận, thử lại sau.");
      setState("error");
    }
  }

  return (
    <div className="mt-3">
      <button
        type="button"
        onClick={run}
        disabled={state === "loading"}
        className="rounded-xl bg-violet-50 px-3 py-1.5 text-sm font-medium text-violet-700 transition hover:bg-violet-100 disabled:opacity-50"
      >
        {state === "loading" ? "AI đang xem…" : "🤖 Nhờ AI nhận xét"}
      </button>
      {state === "done" && (
        <div className="mt-2 rounded-xl border border-violet-100 bg-violet-50/50 p-3">
          <MathContent html={text} solution />
          <p className="mt-2 text-xs text-slate-400">
            * Nhận xét của AI chỉ mang tính tham khảo.
          </p>
        </div>
      )}
      {state === "error" && (
        <p className="mt-2 text-sm text-rose-600">{text}</p>
      )}
    </div>
  );
}

/** Khối hướng dẫn + lời giải (chỉ ở chế độ xem lại). */
function SolutionToggles({ question }: { question: QuestionDTO }) {
  const [showHint, setShowHint] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  if (!question.hint && !question.solution) return null;
  return (
    <div className="flex flex-col gap-3">
      {question.hint && (
        <div>
          <button
            type="button"
            onClick={() => setShowHint((s) => !s)}
            className="rounded-xl bg-amber-50 px-4 py-2 text-sm font-medium text-amber-700 transition hover:bg-amber-100"
          >
            {showHint ? "Ẩn hướng dẫn" : "💡 Hướng dẫn giải"}
          </button>
          {showHint && (
            <div className="mt-2 rounded-xl border border-amber-100 bg-amber-50/50 p-4">
              <MathContent html={question.hint} solution />
            </div>
          )}
        </div>
      )}
      {question.solution && (
        <div>
          <button
            type="button"
            onClick={() => setShowSolution((s) => !s)}
            className="rounded-xl bg-indigo-50 px-4 py-2 text-sm font-medium text-indigo-700 transition hover:bg-indigo-100"
          >
            {showSolution ? "Ẩn lời giải" : "📖 Lời giải chi tiết"}
          </button>
          {showSolution && (
            <div className="mt-2 rounded-xl border border-indigo-100 bg-indigo-50/40 p-4">
              <MathContent html={question.solution} solution />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function QuestionView({
  question,
  mode,
  selectedKey,
  onSelect,
  essayValue,
  onEssayChange,
  studentEssay,
  aiEnabled,
  bookmarked,
  onToggleBookmark,
}: Props) {
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
            onClick={() => onToggleBookmark(question.id)}
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

      {/* ── Trắc nghiệm ── */}
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
                onClick={() => onSelect?.(question.id, c.key)}
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
          {mode === "review" && <div className="sm:col-span-2"><SolutionToggles question={question} /></div>}
        </div>
      )}

      {/* ── Tự luận: đang làm bài ── */}
      {!isMC && mode === "attempt" && (
        <div className="mt-4">
          <label className="mb-1 block text-sm font-medium text-slate-600">
            Bài làm của em (có thể trình bày ra giấy rồi nhập tóm tắt vào đây):
          </label>
          <textarea
            value={essayValue ?? ""}
            onChange={(e) => onEssayChange?.(question.id, e.target.value)}
            rows={5}
            placeholder="Nhập lời giải của em..."
            className="w-full rounded-xl border border-slate-200 bg-white p-3 text-slate-800 outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
          />
        </div>
      )}

      {/* ── Tự luận: xem lại ── */}
      {!isMC &&
        mode === "review" &&
        (studentEssay !== undefined ? (
          // Có bối cảnh bài làm: hiển thị song song bài làm | lời giải
          <div className="mt-4 grid gap-3 lg:grid-cols-2">
            <div className="rounded-xl border border-slate-200 bg-slate-50/60 p-4">
              <p className="mb-2 text-sm font-semibold text-slate-600">
                📝 Bài làm của em
              </p>
              {studentEssay ? (
                <p className="whitespace-pre-line text-slate-700">
                  {studentEssay}
                </p>
              ) : (
                <p className="text-sm italic text-slate-400">
                  (Em chưa nhập bài làm cho câu này)
                </p>
              )}
              {aiEnabled && studentEssay && (
                <AiFeedback
                  questionId={question.id}
                  studentAnswer={studentEssay}
                />
              )}
            </div>
            <div className="rounded-xl border border-indigo-100 bg-indigo-50/30 p-4">
              <p className="mb-2 text-sm font-semibold text-slate-600">
                ✅ Hướng dẫn & lời giải
              </p>
              <SolutionToggles question={question} />
            </div>
          </div>
        ) : (
          // Không có bối cảnh bài làm (vd trang Xem lại): chỉ hiện lời giải
          <div className="mt-4">
            <SolutionToggles question={question} />
          </div>
        ))}
    </section>
  );
}

export default memo(QuestionView);
