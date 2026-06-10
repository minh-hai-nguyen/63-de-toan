import { notFound } from "next/navigation";
import { requireUser } from "@/lib/session";
import { getExamByNumber } from "@/server/services/exam.service";
import { getBookmarkedQuestionIds } from "@/server/services/bookmark.service";
import AttemptClient from "@/components/attempt/AttemptClient";

export const metadata = { title: "Làm bài" };

export default async function AttemptPage({
  params,
}: {
  params: Promise<{ number: string }>;
}) {
  const user = await requireUser();
  const { number } = await params;
  const exam = await getExamByNumber(Number(number));
  if (!exam || !exam.isPublished || exam.questions.length === 0) notFound();

  const bookmarks = await getBookmarkedQuestionIds(user.id);

  return <AttemptClient exam={exam} initialBookmarks={bookmarks} />;
}
