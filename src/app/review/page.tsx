import { requireUser } from "@/lib/session";
import { listBookmarks } from "@/server/services/bookmark.service";
import { Container, EmptyState, PageHeader } from "@/components/ui";
import ReviewList from "@/components/ReviewList";
import type { ChoiceDTO, QuestionDTO } from "@/lib/types";

export const metadata = { title: "Câu cần xem lại" };

function parseChoices(raw: string | null): ChoiceDTO[] {
  if (!raw) return [];
  try {
    return JSON.parse(raw) as ChoiceDTO[];
  } catch {
    return [];
  }
}

export default async function ReviewPage() {
  const user = await requireUser();
  const bookmarks = await listBookmarks(user.id);

  const questions: QuestionDTO[] = bookmarks.map((b) => ({
    id: b.question.id,
    part: b.question.part as "MC" | "ESSAY",
    order: b.question.order,
    stem: b.question.stem,
    choices: parseChoices(b.question.choices),
    correctKey: b.question.correctKey,
    hint: b.question.hint,
    solution: b.question.solution,
    topic: b.question.topic,
    difficulty: b.question.difficulty,
    points: b.question.points,
  }));

  const subtitleById = Object.fromEntries(
    bookmarks.map((b) => [b.question.id, b.question.exam.title])
  );
  const initialBookmarks = questions.map((q) => q.id);

  return (
    <Container>
      <PageHeader
        title="Câu cần xem lại"
        subtitle="Những câu em đã đánh dấu 🔖 trong lúc làm bài."
      />
      {questions.length === 0 ? (
        <EmptyState
          icon="🔖"
          title="Chưa có câu nào được đánh dấu"
          hint="Trong lúc làm bài, bấm “Đánh dấu” ở câu khó để lưu vào đây."
        />
      ) : (
        <ReviewList
          questions={questions}
          initialBookmarks={initialBookmarks}
          subtitleById={subtitleById}
          canBookmark
        />
      )}
    </Container>
  );
}
