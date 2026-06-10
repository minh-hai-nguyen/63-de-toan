import Link from "next/link";
import { ROUTES } from "@/lib/config";
import { cn } from "@/lib/cn";
import { Badge } from "@/components/ui";
import type { ExamSummaryDTO } from "@/lib/types";

export default function ExamCard({ exam }: { exam: ExamSummaryDTO }) {
  const ready = exam.isPublished && exam.mcCount + exam.essayCount > 0;

  const inner = (
    <div
      className={cn(
        "group flex h-full flex-col rounded-2xl border bg-white/80 p-4 shadow-sm transition",
        ready
          ? "border-slate-200/70 hover:-translate-y-0.5 hover:border-indigo-300 hover:shadow-md"
          : "border-dashed border-slate-200 opacity-70"
      )}
    >
      <div className="flex items-start justify-between">
        <span className="grid h-11 w-11 place-items-center rounded-xl bg-indigo-50 text-lg font-bold text-indigo-600">
          {String(exam.number).padStart(2, "0")}
        </span>
        {ready ? (
          <Badge className="border-emerald-200 bg-emerald-50 text-emerald-700">
            Sẵn sàng
          </Badge>
        ) : (
          <Badge>Đang cập nhật</Badge>
        )}
      </div>
      <h3 className="mt-3 font-semibold text-slate-800">{exam.title}</h3>
      {ready ? (
        <p className="mt-1 text-sm text-slate-500">
          {exam.mcCount} câu trắc nghiệm · {exam.essayCount} câu tự luận
        </p>
      ) : (
        <p className="mt-1 text-sm text-slate-400">Chưa có nội dung</p>
      )}
      {ready && (
        <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-indigo-600 group-hover:gap-2">
          Vào làm bài →
        </span>
      )}
    </div>
  );

  if (!ready) return inner;
  return (
    <Link href={ROUTES.exam(exam.number)} className="block h-full">
      {inner}
    </Link>
  );
}
