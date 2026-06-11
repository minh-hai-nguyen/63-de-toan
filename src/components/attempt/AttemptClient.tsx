"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import QuestionView from "@/components/QuestionView";
import { useBookmarks } from "@/components/useBookmarks";
import { Button, Card, Container } from "@/components/ui";
import { cn } from "@/lib/cn";
import { ROUTES } from "@/lib/config";
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
  const [essays, setEssays] = useState<Record<string, string>>({});
  const bm = useBookmarks(initialBookmarks);
  const [secondsLeft, setSecondsLeft] = useState(totalSec);
  const [submitting, setSubmitting] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const submittedRef = useRef(false);

  const mcQuestions = useMemo(
    () => exam.questions.filter((q) => q.part === "MC"),
    [exam.questions]
  );
  const essayQuestions = useMemo(
    () => exam.questions.filter((q) => q.part === "ESSAY"),
    [exam.questions]
  );

  const mcAnswered = mcQuestions.filter((q) => answers[q.id]).length;
  const essayAnswered = essayQuestions.filter((q) =>
    (essays[q.id] ?? "").trim()
  ).length;
  const doneCount = mcAnswered + essayAnswered;
  const remaining = exam.questions.length - doneCount;

  const isAnswered = useCallback(
    (qid: string, part: string) =>
      part === "MC" ? !!answers[qid] : !!(essays[qid] ?? "").trim(),
    [answers, essays]
  );

  const performSubmit = useCallback(async () => {
    if (submittedRef.current) return;
    submittedRef.current = true;
    setSubmitting(true);
    setShowConfirm(false);
    try {
      const elapsed = Math.min(totalSec, totalSec - secondsLeft);
      const res = await fetch("/api/attempts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          examNumber: exam.number,
          answers,
          essayAnswers: essays,
          durationSec: elapsed,
        }),
      });
      if (!res.ok) throw new Error("submit failed");
      const { attemptId } = await res.json();
      router.push(ROUTES.result(exam.number, attemptId));
    } catch {
      submittedRef.current = false;
      setSubmitting(false);
      alert("Có lỗi khi nộp bài, em thử lại nhé.");
    }
  }, [answers, essays, exam.number, router, secondsLeft, totalSec]);

  // Đồng hồ đếm ngược + tự nộp khi hết giờ
  useEffect(() => {
    const id = setInterval(() => {
      setSecondsLeft((s) => {
        if (s <= 1) {
          clearInterval(id);
          void performSubmit();
          return 0;
        }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [performSubmit]);

  // Callbacks ổn định để QuestionView (memo) không re-render mỗi giây
  const onSelect = useCallback(
    (qid: string, key: string) =>
      setAnswers((a) => ({ ...a, [qid]: key })),
    []
  );
  const onEssayChange = useCallback(
    (qid: string, text: string) =>
      setEssays((e) => ({ ...e, [qid]: text })),
    []
  );

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
              onSelect={onSelect}
              essayValue={essays[q.id] ?? ""}
              onEssayChange={onEssayChange}
              bookmarked={bm.has(q.id)}
              onToggleBookmark={bm.toggle}
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
              <div className="mt-3 space-y-0.5 text-sm text-slate-500">
                <p>
                  Trắc nghiệm:{" "}
                  <span className="font-semibold text-indigo-600">
                    {mcAnswered}/{mcQuestions.length}
                  </span>
                </p>
                <p>
                  Tự luận:{" "}
                  <span className="font-semibold text-indigo-600">
                    {essayAnswered}/{essayQuestions.length}
                  </span>
                </p>
              </div>
            </Card>

            <Card className="p-4">
              <p className="mb-2 text-sm font-medium text-slate-600">
                Danh sách câu
              </p>
              <div className="grid grid-cols-5 gap-2">
                {exam.questions.map((q) => {
                  const answered = isAnswered(q.id, q.part);
                  const marked = bm.has(q.id);
                  return (
                    <button
                      key={q.id}
                      type="button"
                      onClick={() => scrollTo(q.order)}
                      className={cn(
                        "relative grid h-9 place-items-center overflow-hidden rounded-lg border text-sm font-medium transition",
                        answered
                          ? "border-indigo-500 bg-indigo-500 text-white"
                          : "border-slate-200 bg-white text-slate-600 hover:border-indigo-300"
                      )}
                    >
                      {q.order}
                      {marked && (
                        <span
                          className="absolute right-0 top-0 border-t-[14px] border-l-[14px] border-t-amber-400 border-l-transparent"
                          aria-hidden
                        />
                      )}
                    </button>
                  );
                })}
              </div>
              <div className="mt-3 space-y-1 text-xs text-slate-400">
                <p>
                  <span className="mr-1 inline-block h-3 w-3 rounded bg-indigo-500 align-middle" />
                  Đã làm ·{" "}
                  <span className="mr-1 ml-1 inline-block h-3 w-3 rounded border border-slate-300 bg-white align-middle" />
                  Chưa làm
                </p>
                <p>
                  <span className="mr-1 inline-block h-3 w-3 rounded-sm bg-amber-400 align-middle" />
                  Câu đã đánh dấu (góc vàng)
                </p>
              </div>
            </Card>

            <Button
              variant="success"
              size="lg"
              className="w-full"
              disabled={submitting}
              onClick={() => setShowConfirm(true)}
            >
              {submitting ? "Đang nộp..." : "Nộp bài"}
            </Button>
          </div>
        </aside>
      </div>

      {/* Modal xác nhận nộp bài */}
      {showConfirm && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-slate-900/40 p-4">
          <Card className="w-full max-w-sm p-6">
            <h3 className="text-lg font-bold text-slate-800">Nộp bài</h3>
            <p className="mt-2 text-sm text-slate-600">
              {remaining > 0
                ? `Em còn ${remaining}/${exam.questions.length} câu chưa hoàn thành. Em chắc chắn muốn nộp bài chứ?`
                : "Em đã hoàn thành tất cả các câu. Nộp bài và xem kết quả nhé?"}
            </p>
            <div className="mt-5 flex flex-col gap-2">
              <Button
                variant="success"
                size="lg"
                onClick={performSubmit}
                disabled={submitting}
              >
                Quyết định nộp bài
              </Button>
              <Button
                variant="ghost"
                size="lg"
                onClick={() => setShowConfirm(false)}
                disabled={submitting}
              >
                Tiếp tục làm bài
              </Button>
            </div>
          </Card>
        </div>
      )}
    </Container>
  );
}
