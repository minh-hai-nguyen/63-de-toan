import { notFound } from "next/navigation";
import { requireTeacher } from "@/lib/session";
import { getStudentDetail } from "@/server/services/analytics.service";
import { ROUTES } from "@/lib/config";
import {
  Card,
  Container,
  PageHeader,
  StatCard,
} from "@/components/ui";
import TopicStats from "@/components/TopicStats";
import AttemptsTable from "@/components/AttemptsTable";

export default async function StudentDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await requireTeacher();
  const { id } = await params;
  const data = await getStudentDetail(id);
  if (!data) notFound();

  const { student, attempts, topicStats } = data;
  const avgPct =
    attempts.length === 0
      ? 0
      : attempts.reduce(
          (s, a) => s + (a.mcMax > 0 ? a.mcScore / a.mcMax : 0),
          0
        ) / attempts.length;

  return (
    <Container>
      <p className="mb-2 text-sm text-slate-500">
        <a href={ROUTES.teacher} className="hover:text-indigo-600">
          ← Quản lý lớp
        </a>
      </p>
      <PageHeader
        title={student.displayName}
        subtitle={`@${student.username}${student.className ? ` · Lớp ${student.className}` : ""}`}
      />

      <div className="grid gap-3 sm:grid-cols-2">
        <StatCard label="Số đề đã làm" value={attempts.length} />
        <StatCard
          label="Tỉ lệ đúng trung bình"
          value={`${Math.round(avgPct * 100)}%`}
        />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_340px]">
        <div className="lg:order-1">
          <h2 className="mb-3 text-lg font-semibold text-slate-800">
            Lịch sử làm bài
          </h2>
          <AttemptsTable attempts={attempts} />
        </div>
        <aside className="lg:order-2">
          <Card className="sticky top-20 p-5">
            <h3 className="mb-3 font-semibold text-slate-800">
              Kết quả theo thể loại
            </h3>
            <TopicStats stats={topicStats} />
          </Card>
        </aside>
      </div>
    </Container>
  );
}
