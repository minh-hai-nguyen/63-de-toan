"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import QuestionView from "@/components/QuestionView";
import { useBookmarks } from "@/components/useBookmarks";
import { Button, Card, Container } from "@/components/ui";
import { cn } from "@/lib/cn";
import { ROUTES } from "@/lib/config";
import { submitAttemptAction } from "@/server/actions";
import type { ExamWithQuestionsDTO } from "@/lib/types";

function fmt(sec: number) {
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
}

export default function AttemptClient({
  exam,
  initialBookmarks,
}: {
  exam: ExamWithQuestionsDTO;
  initialBookmarks: string[];
}) {
  const router = useRouter();
  const totalSec = exam.durationMin * 60;

  const [answers, setAnswers] = useState<Record<string, string | null>>({});
  const bm = useBookmarks(initialBookmarks);
  const [secondsLeft, setSecondsLeft] = useState(totalSec);
  const [submitting, setSubmitting] = useState(false);
  const submittedRef = useRef(false);

  const mcQuestions = useMemo(
    () => exam.questions.filter((q) => q.part === "MC"),
    [exam.questions]
  );
  const answeredCount = mcQuestions.filter((q) => answers[q.id]).length;

  const doSubmit = useCallback(
    async (auto: boolean) => {
      if (submittedRef.current) return;
      if (!auto) {
        const remaining = mcQuestions.length - answeredCount;
        const msg =
          remaining > 0
            ? `Em còn ${remaining} câu trắc nghiệm chưa trả lời. Vẫn nộp bài?`
            : "Nộp bài và xem kết quả?";
        if (!window.confirm(msg)) return;
      }
      submittedRef.current = true;
      setSubmitting(true);
      try {
        const elapsed = Math.min(totalSec, totalSec - secondsLeft);
        const { attemptId } = await submitAttemptAction({
          examNumber: exam.number,
          answers,
          durationSec: elapsed,
        });
        router.push(ROUTES.result(exam.number, attemptId));
      } catch {
        submittedRef.current = false;
        setSubmitting(false);
        alert("Có lỗi khi nộp bài, em thử lại nhé.");
      }
    },
    [answers, answeredCount, exam.number, mcQuestions.length, router, secondsLeft, totalSec]
  );

  // Đồng hồ đếm ngược + tự nộp khi hết giờ
  useEffect(() => {
    const id = setInterval(() => {
      setSecondsLeft((s) => {
        if (s <= 1) {
          clearInterval(id);
          void doSubmit(true);
          return 0;
        }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [doSubmit]);

  const onSelect = (qid: string, key: string) =>
    setAnswers((a) => ({ ...a, [qid]: key }));

  const scrollTo = (order: number) =>
    document
      .getElementById(`cau-${order}`)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });

  const lowTime = secondsLeft <= 300;

  return (
    <Container>
      <div className="grid gap-6 lg:grid-cols-[1fr_300px]">
        {/* Cột làm bài */}
        <div className="space-y-4 lg:order-1">
          <h1 className="text-xl font-bold text-slate-800">{exam.title}</h1>
          {exam.questions.map((q) => (
            <QuestionView
              key={q.id}
              question={q}
              mode="attempt"
              selectedKey={answers[q.id] ?? null}
              onSelect={(key) => onSelect(q.id, key)}
              bookmarked={bm.has(q.id)}
              onToggleBookmark={() => bm.toggle(q.id)}
            />
          ))}
        </div>

        {/* Bảng điều khiển */}
        <aside className="lg:order-2">
          <div className="sticky top-20 space-y-4">
            <Card className="p-4">
              <p className="text-sm text-slate-500">Thời gian còn lại</p>
              <p
                className={cn(
                  "mt-0.5 text-3xl font-bold tabular-nums",
                  lowTime ? "text-rose-600" : "text-slate-800"
                )}
              >
                {fmt(secondsLeft)}
              </p>
              <div className="mt-3 text-sm text-slate-500">
                Đã trả lời{" "}
                <span className="font-semibold text-indigo-600">
                  {answeredCount}/{mcQuestions.length}
                </span>{" "}
                câu trắc nghiệm
              </div>
            </Card>

            <Card className="p-4">
              <p className="mb-2 text-sm font-medium text-slate-600">
                Danh sách câu
              </p>
              <div className="grid grid-cols-5 gap-2">
                {exam.questions.map((q) => {
                  const answered = q.part === "MC" && !!answers[q.id];
                  const marked = bm.has(q.id);
                  return (
                    <button
                      key={q.id}
                      type="button"
                      onClick={() => scrollTo(q.order)}
                      className={cn(
                        "relative grid h-9 place-items-center rounded-lg border text-sm font-medium transition",
                        answered
                          ? "border-indigo-500 bg-indigo-500 text-white"
                          : q.part === "MC"
                            ? "border-slate-200 bg-white text-slate-600 hover:border-indigo-300"
                            : "border-slate-200 bg-slate-50 text-slate-400 hover:border-indigo-300"
                      )}
                    >
                      {q.order}
                      {marked && (
                        <span className="absolute -right-1 -top-1 text-xs">
                          🔖
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
              <div className="mt-3 space-y-1 text-xs text-slate-400">
                <p>
                  <span className="mr-1 inline-block h-3 w-3 rounded bg-indigo-500 align-middle" />
                  Đã trả lời ·{" "}
                  <span className="mr-1 ml-1 inline-block h-3 w-3 rounded border border-slate-300 bg-white align-middle" />
                  Chưa làm
                </p>
                <p>🔖 Câu đã đánh dấu xem lại</p>
              </div>
            </Card>

            <Button
              variant="success"
              size="lg"
              className="w-full"
              disabled={submitting}
              onClick={() => doSubmit(false)}
            >
              {submitting ? "Đang nộp..." : "Nộp bài"}
            </Button>
          </div>
        </aside>
      </div>
    </Container>
  );
}
