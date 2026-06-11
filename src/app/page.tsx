import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { ROUTES } from "@/lib/config";

/**
 * Trang gốc: vào là chuyển ngay tới nơi cần đến.
 * - Đã đăng nhập → danh sách đề.
 * - Chưa đăng nhập → màn đăng nhập (không qua bước trung gian).
 */
export default async function HomePage() {
  const session = await auth();
  redirect(session?.user ? ROUTES.exams : ROUTES.login);
}
