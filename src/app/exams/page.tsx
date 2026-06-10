import { requireUser } from "@/lib/session";
import { listExams } from "@/server/services/exam.service";
import { APP } from "@/lib/config";
import { Container, PageHeader } from "@/components/ui";
import ExamCard from "@/components/ExamCard";

export const metadata = { title: "Danh sách đề thi" };

export default async function ExamsPage() {
  await requireUser();
  const exams = await listExams();
  const readyCount = exams.filter(
    (e) => e.isPublished && e.mcCount + e.essayCount > 0
  ).length;

  return (
    <Container>
      <PageHeader
        title="Danh sách đề thi"
        subtitle={`Đã có nội dung ${readyCount}/${APP.totalExams} đề · các đề còn lại sẽ được cập nhật dần`}
      />
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {exams.map((exam) => (
          <ExamCard key={exam.number} exam={exam} />
        ))}
      </div>
    </Container>
  );
}
