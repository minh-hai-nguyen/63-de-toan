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

      <div className="grid gap-3 sm:grid-cols-2">
        <StatCard label="Số đề đã làm" value={summary.count} hover />
        <StatCard
          label="Tỉ lệ đúng trung bình"
          value={`${Math.round(summary.avgPct * 100)}%`}
          hover
        />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <Card className="p-5" hover>
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

        <Card className="flex flex-col p-5" hover>
          <h2 className="font-semibold text-slate-800">Câu đã đánh dấu 🔖</h2>
          <p className="mt-1 text-sm text-slate-500">
            Những câu em lưu lại để xem khi cần.
          </p>
          <p className="mt-4 text-4xl font-extrabold text-indigo-600">
            {bookmarkIds.length}
            <span className="ml-1 text-base font-medium text-slate-400">câu</span>
          </p>
          <div className="mt-auto pt-4">
            <LinkButton href={ROUTES.review} className="w-full">
              Xem chi tiết →
            </LinkButton>
          </div>
        </Card>
      </div>

      <div className="mt-6">
        <h2 className="mb-3 text-lg font-semibold text-slate-800">
          Thống kê các đề đã làm
        </h2>
        <AttemptsTable attempts={attempts} />
      </div>
    </Container>
  );
}
