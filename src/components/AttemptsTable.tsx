import Link from "next/link";
import { ROUTES } from "@/lib/config";
import { formatDateTime, formatDuration, formatScore } from "@/lib/scoring";
import { EmptyState } from "@/components/ui";

export type AttemptRow = {
  id: string;
  mcScore: number;
  mcMax: number;
  durationSec: number;
  submittedAt: Date | string | null;
  exam: { number: number; title: string };
};

export default function AttemptsTable({ attempts }: { attempts: AttemptRow[] }) {
  if (attempts.length === 0)
    return (
      <EmptyState
        icon="📭"
        title="Chưa có bài làm nào"
        hint="Hãy chọn một đề và bắt đầu luyện tập."
      />
    );

  return (
    <div className="overflow-x-auto rounded-2xl border border-slate-200/70 bg-white/80">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-slate-200 text-left text-slate-500">
            <th className="px-4 py-3 font-medium">Đề</th>
            <th className="px-4 py-3 font-medium">Điểm TN</th>
            <th className="px-4 py-3 font-medium">Thời gian</th>
            <th className="hidden px-4 py-3 font-medium sm:table-cell">Ngày làm</th>
            <th className="px-4 py-3" />
          </tr>
        </thead>
        <tbody>
          {attempts.map((a) => {
            const pct =
              a.mcMax > 0 ? Math.round((a.mcScore / a.mcMax) * 100) : 0;
            return (
              <tr
                key={a.id}
                className="border-b border-slate-100 last:border-0 hover:bg-slate-50/60"
              >
                <td className="px-4 py-3 font-medium text-slate-700">
                  {a.exam.title}
                </td>
                <td className="px-4 py-3 tabular-nums">
                  {formatScore(a.mcScore)}/{formatScore(a.mcMax)}{" "}
                  <span className="text-slate-400">({pct}%)</span>
                </td>
                <td className="px-4 py-3 tabular-nums text-slate-500">
                  {formatDuration(a.durationSec)}
                </td>
                <td className="hidden px-4 py-3 text-slate-500 sm:table-cell">
                  {a.submittedAt ? formatDateTime(a.submittedAt) : "—"}
                </td>
                <td className="px-4 py-3 text-right">
                  <Link
                    href={ROUTES.result(a.exam.number, a.id)}
                    className="font-medium text-indigo-600 hover:underline"
                  >
                    Xem lại
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
