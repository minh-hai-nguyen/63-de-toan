import { redirect } from "next/navigation";
import { auth } from "@/auth";

/** Lấy session hiện tại (có thể null). */
export async function getSession() {
  return auth();
}

/** Bắt buộc đăng nhập, nếu chưa thì chuyển về /login. */
export async function requireUser() {
  const session = await auth();
  if (!session?.user) redirect("/login");
  return session.user;
}

/** Bắt buộc là giáo viên, nếu không thì chuyển hướng phù hợp. */
export async function requireTeacher() {
  const session = await auth();
  if (!session?.user) redirect("/login");
  if (session.user.role !== "TEACHER") redirect("/exams");
  return session.user;
}
