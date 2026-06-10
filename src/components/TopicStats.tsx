import { topicLabel } from "@/lib/taxonomy";
import { ProgressBar } from "@/components/ui";
import type { TopicStat } from "@/lib/scoring";

/** Danh sách tỉ lệ đúng theo thể loại (sắp từ yếu → mạnh). */
export default function TopicStats({
  stats,
  emptyHint = "Chưa có dữ liệu — em hãy làm vài đề để xem thống kê nhé.",
}: {
  stats: TopicStat[];
  emptyHint?: string;
}) {
  if (stats.length === 0)
    return <p className="text-sm text-slate-400">{emptyHint}</p>;

  return (
    <ul className="space-y-3">
      {stats.map((s) => (
        <li key={s.topic}>
          <div className="mb-1 flex items-baseline justify-between gap-2 text-sm">
            <span className="font-medium text-slate-700">
              {topicLabel(s.topic)}
            </span>
            <span className="tabular-nums text-slate-500">
              {s.correct}/{s.total} · {Math.round(s.accuracy * 100)}%
            </span>
          </div>
          <ProgressBar value={s.accuracy} />
        </li>
      ))}
    </ul>
  );
}
