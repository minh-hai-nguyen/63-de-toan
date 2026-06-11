import { notFound } from "next/navigation";
import { requireUser } from "@/lib/session";
import { getAttemptDetail } from "@/server/services/attempt.service";
import { getExamByNumber } from "@/server/services/exam.service";
import { getBookmarkedQuestionIds } from "@/server/services/bookmark.service";
import { aggregateTopicStats, formatDuration, formatScore } from "@/lib/scoring";
import { ROLES, ROUTES } from "@/lib/config";
import {
  Card,
  Container,
  LinkButton,
  PageHeader,
  StatCard,
} from "@/components/ui";
import TopicStats from "@/components/TopicStats";
import ReviewList from "@/components/ReviewList";

export const metadata = { title: "Kết quả bài làm" };

export default async function ResultPage({
  params,
}: {
  params: Promise<{ number: string; attemptId: string }>;
}) {
  const user = await requireUser();
  const { number, attemptId } = await params;

  const attempt = await getAttemptDetail(attemptId);
  if (!attempt || attempt.exam.number !== Number(number)) notFound();

  const isOwner = attempt.userId === user.id;
  const isTeacher = user.role === ROLES.TEACHER;
  if (!isOwner && !isTeacher) notFound();

  const exam = await getExamByNumber(attempt.exam.number);
  if (!exam) notFound();

  const selected: Record<string, string | null> = {};
  const essayById: Record<string, string | null> = {};
  for (const a of attempt.answers) {
    selected[a.questionId] = a.selectedKey;
    essayById[a.questionId] = a.essayText;
  }

  const topicById = new Map(exam.questions.map((q) => [q.id, q.topic]));
  const topicStats = aggregateTopicStats(
    attempt.answers.map((a) => ({
      topic: topicById.get(a.questionId) ?? "?",
      isCorrect: a.isCorrect,
    }))
  );

  const initialBookmarks = isOwner
    ? await getBookmarkedQuestionIds(user.id)
    : [];
  const pct =
    attempt.mcMax > 0 ? Math.round((attempt.mcScore / attempt.mcMax) * 100) : 0;

  return (
    <Container>
      <PageHeader
        title={`Kết quả · ${exam.title}`}
        subtitle={
          isOwner ? undefined : `Học sinh: ${attempt.user.displayName}`
        }
        action={
          isOwner && (
            <LinkButton href={ROUTES.attempt(exam.number)} variant="soft">
              Làm lại
            </LinkButton>
          )
        }
      />

      <div className="grid gap-3 sm:grid-cols-3">
        <StatCard
          label="Điểm trắc nghiệm"
          value={`${formatScore(attempt.mcScore)}/${formatScore(attempt.mcMax)}`}
          hint={`Đúng ${pct}%`}
        />
        <StatCard label="Tỉ lệ đúng" value={`${pct}%`} />
        <StatCard
          label="Thời gian làm"
          value={formatDuration(attempt.durationSec)}
        />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_320px]">
        <div className="lg:order-1">
          <h2 className="mb-3 text-lg font-semibold text-slate-800">
            Chi tiết & lời giải
          </h2>
          <ReviewList
            questions={exam.questions}
            selected={selected}
            essayById={essayById}
            initialBookmarks={initialBookmarks}
            canBookmark={isOwner}
          />
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
