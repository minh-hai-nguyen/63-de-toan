import { notFound } from "next/navigation";
import { requireUser } from "@/lib/session";
import { getExamByNumber } from "@/server/services/exam.service";
import { ROUTES } from "@/lib/config";
import { topicLabel } from "@/lib/taxonomy";
import { Badge, Card, Container, LinkButton, StatCard } from "@/components/ui";

export default async function ExamIntroPage({
  params,
}: {
  params: Promise<{ number: string }>;
}) {
  await requireUser();
  const { number } = await params;
  const exam = await getExamByNumber(Number(number));
  if (!exam || !exam.isPublished || exam.questions.length === 0) notFound();

  const topics = Array.from(new Set(exam.questions.map((q) => q.topic)));

  return (
    <Container className="max-w-3xl">
      <p className="mb-2 text-sm text-slate-500">
        <a href={ROUTES.exams} className="hover:text-indigo-600">
          ← Danh sách đề
        </a>
      </p>
      <Card className="p-7">
        <h1 className="text-2xl font-bold text-slate-800 sm:text-3xl">
          {exam.title}
        </h1>
        <p className="mt-1 text-slate-500">Toán · Tuyển sinh lớp 10</p>

        <div className="mt-5 grid grid-cols-3 gap-3">
          <StatCard label="Thời gian" value={`${exam.durationMin}′`} />
          <StatCard label="Trắc nghiệm" value={exam.mcCount} hint="× 0,25đ" />
          <StatCard label="Tự luận" value={exam.essayCount} hint="câu" />
        </div>

        <div className="mt-5">
          <p className="mb-2 text-sm font-medium text-slate-600">
            Các thể loại trong đề:
          </p>
          <div className="flex flex-wrap gap-2">
            {topics.map((t) => (
              <Badge key={t}>{topicLabel(t)}</Badge>
            ))}
          </div>
        </div>

        <div className="mt-6 rounded-xl bg-indigo-50/60 p-4 text-sm text-slate-600">
          <p className="font-medium text-slate-700">Cách làm:</p>
          <ul className="mt-1 list-disc space-y-0.5 pl-5">
            <li>Phần trắc nghiệm sẽ được chấm điểm tự động khi nộp bài.</li>
            <li>Phần tự luận em làm ra giấy, sau đó đối chiếu lời giải chi tiết.</li>
            <li>Có thể đánh dấu 🔖 câu khó để xem lại sau.</li>
          </ul>
        </div>

        <div className="mt-6">
          <LinkButton href={ROUTES.attempt(exam.number)} size="lg">
            Bắt đầu làm bài →
          </LinkButton>
        </div>
      </Card>
    </Container>
  );
}
