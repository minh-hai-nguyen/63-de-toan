import "server-only";
import { prisma } from "@/lib/prisma";

/** Bật/tắt đánh dấu "xem lại" cho một câu hỏi. Trả về trạng thái mới. */
export async function toggleBookmark(
  userId: string,
  questionId: string
): Promise<{ bookmarked: boolean }> {
  const existing = await prisma.bookmark.findUnique({
    where: { userId_questionId: { userId, questionId } },
  });
  if (existing) {
    await prisma.bookmark.delete({ where: { id: existing.id } });
    return { bookmarked: false };
  }
  await prisma.bookmark.create({ data: { userId, questionId } });
  return { bookmarked: true };
}

/** Tập hợp id câu hỏi đã đánh dấu của một học sinh. */
export async function getBookmarkedQuestionIds(
  userId: string
): Promise<string[]> {
  const rows = await prisma.bookmark.findMany({
    where: { userId },
    select: { questionId: true },
  });
  return rows.map((r) => r.questionId);
}

/** Danh sách câu đã đánh dấu (kèm đề) để hiển thị trang ôn lại. */
export async function listBookmarks(userId: string) {
  return prisma.bookmark.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
    include: {
      question: {
        include: { exam: { select: { number: true, title: true } } },
      },
    },
  });
}
