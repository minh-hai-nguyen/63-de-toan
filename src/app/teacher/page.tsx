import Link from "next/link";
import { requireTeacher } from "@/lib/session";
import { getClassOverview } from "@/server/services/analytics.service";
import { ROUTES } from "@/lib/config";
import { topicLabel } from "@/lib/taxonomy";
import {
  Card,
  Container,
  EmptyState,
  PageHeader,
  StatCard,
} from "@/components/ui";
import TopicStats from "@/components/TopicStats";

export const metadata = { title: "Quản lý lớp" };

export default async function TeacherPage() {
  await requireTeacher();
  const { students, classTopicStats } = await getClassOverview();

  const totalAttempts = students.reduce((s, st) => s + st.attemptCount, 0);
  const active = students.filter((s) => s.attemptCount > 0);
  const classAvg =
    active.length === 0
      ? 0
      : active.reduce((s, st) => s + st.avgPct, 0) / active.length;

  return (
    <Container>
      <PageHeader
        title="Quản lý lớp"
        subtitle="Theo dõi tiến độ và điểm yếu của học sinh."
      />

      <div className="grid gap-3 sm:grid-cols-3">
        <StatCard label="Số học sinh" value={students.length} />
        <StatCard label="Tổng lượt làm bài" value={totalAttempts} />
        <StatCard
          label="Tỉ lệ đúng TB của lớp"
          value={`${Math.round(classAvg * 100)}%`}
        />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_340px]">
        <div className="lg:order-1">
          <h2 className="mb-3 text-lg font-semibold text-slate-800">
            Danh sách học sinh
          </h2>
          {students.length === 0 ? (
            <EmptyState
              icon="🧑‍🎓"
              title="Chưa có học sinh"
              hint="Học sinh tự đăng ký tài khoản sẽ hiển thị tại đây."
            />
          ) : (
            <div className="overflow-x-auto rounded-2xl border border-slate-200/70 bg-white/80">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-200 text-left text-slate-500">
                    <th className="px-4 py-3 font-medium">Học sinh</th>
                    <th className="px-4 py-3 font-medium">Lớp</th>
                    <th className="px-4 py-3 font-medium">Bài</th>
                    <th className="px-4 py-3 font-medium">Đúng TB</th>
                    <th className="px-4 py-3 font-medium">Yếu nhất</th>
                    <th className="px-4 py-3" />
                  </tr>
                </thead>
                <tbody>
                  {students.map((s) => (
                    <tr
                      key={s.id}
                      className="border-b border-slate-100 last:border-0 hover:bg-slate-50/60"
                    >
                      <td className="px-4 py-3">
                        <div className="font-medium text-slate-700">
                          {s.displayName}
                        </div>
                        <div className="text-xs text-slate-400">
                          @{s.username}
                        </div>
                      </td>
                      <td className="px-4 py-3 text-slate-500">
                        {s.className ?? "—"}
                      </td>
                      <td className="px-4 py-3 tabular-nums">{s.attemptCount}</td>
                      <td className="px-4 py-3 tabular-nums">
                        {s.attemptCount > 0
                          ? `${Math.round(s.avgPct * 100)}%`
                          : "—"}
                      </td>
                      <td className="px-4 py-3 text-slate-500">
                        {s.weakestTopic ? topicLabel(s.weakestTopic) : "—"}
                      </td>
                      <td className="px-4 py-3 text-right">
                        <Link
                          href={ROUTES.teacherStudent(s.id)}
                          className="font-medium text-indigo-600 hover:underline"
                        >
                          Chi tiết
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <aside className="lg:order-2">
          <Card className="sticky top-20 p-5">
            <h3 className="mb-1 font-semibold text-slate-800">
              Thể loại yếu của lớp
            </h3>
            <p className="mb-3 text-sm text-slate-500">
              Tính trên toàn bộ câu trắc nghiệm đã làm.
            </p>
            <TopicStats
              stats={classTopicStats}
              emptyHint="Chưa có dữ liệu làm bài."
            />
          </Card>
        </aside>
      </div>
    </Container>
  );
}
