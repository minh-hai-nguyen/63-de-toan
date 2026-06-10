import { redirect } from "next/navigation";
import { requireUser } from "@/lib/session";
import { ROLES, ROUTES } from "@/lib/config";
import { topicLabel } from "@/lib/taxonomy";
import {
  getUserSummary,
  getUserTopicStats,
} from "@/server/services/analytics.service";
import { listUserAttempts } from "@/server/services/attempt.service";
import { getBookmarkedQuestionIds } from "@/server/services/bookmark.service";
import {
  Card,
  Container,
  LinkButton,
  PageHeader,
  StatCard,
} from "@/components/ui";
import TopicStats from "@/components/TopicStats";
import AttemptsTable from "@/components/AttemptsTable";

export const metadata = { title: "Tiến bộ của em" };

export default async function DashboardPage() {
  const user = await requireUser();
  if (user.role === ROLES.TEACHER) redirect(ROUTES.teacher);

  const [summary, topicStats, attempts, bookmarkIds] = await Promise.all([
    getUserSummary(user.id),
    getUserTopicStats(user.id),
    listUserAttempts(user.id),
    getBookmarkedQuestionIds(user.id),
  ]);

  const weakest = topicStats.slice(0, 3);

  return (
    <Container>
      <PageHeader
        title={`Chào ${user.name} 👋`}
        subtitle="Theo dõi kết quả và điểm cần cải thiện của em."
        action={
          <LinkButton href={ROUTES.exams} variant="soft">
            Luyện đề mới
          </LinkButton>
        }
      />

      <div className="grid gap-3 sm:grid-cols-3">
        <StatCard label="Số đề đã làm" value={summary.count} />
        <StatCard
          label="Tỉ lệ đúng trung bình"
          value={`${Math.round(summary.avgPct * 100)}%`}
        />
        <StatCard label="Câu đã đánh dấu" value={bookmarkIds.length} />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <Card className="p-5">
          <h2 className="mb-1 font-semibold text-slate-800">
            Kết quả theo thể loại
          </h2>
          <p className="mb-3 text-sm text-slate-500">
            Sắp xếp từ phần yếu nhất để em ưu tiên ôn tập.
          </p>
          <TopicStats stats={topicStats} />
          {weakest.length > 0 && (
            <div className="mt-4 rounded-xl bg-amber-50 p-3 text-sm text-amber-800">
              💡 Em nên ôn thêm:{" "}
              <span className="font-medium">
                {weakest.map((s) => topicLabel(s.topic)).join(", ")}
              </span>
            </div>
          )}
        </Card>

        <Card className="p-5">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="font-semibold text-slate-800">Ôn lại nhanh</h2>
            <LinkButton href={ROUTES.review} size="sm" variant="ghost">
              Xem tất cả →
            </LinkButton>
          </div>
          <p className="text-sm text-slate-500">
            Em có{" "}
            <span className="font-semibold text-indigo-600">
              {bookmarkIds.length}
            </span>{" "}
            câu đã đánh dấu để xem lại. Mở trang “Xem lại” để ôn cùng lời giải.
          </p>
        </Card>
      </div>

      <div className="mt-6">
        <h2 className="mb-3 text-lg font-semibold text-slate-800">
          Lịch sử làm bài
        </h2>
        <AttemptsTable attempts={attempts} />
      </div>
    </Container>
  );
}
