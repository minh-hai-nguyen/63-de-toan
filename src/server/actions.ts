"use server";

import { revalidatePath } from "next/cache";
import { AuthError } from "next-auth";
import { auth, signIn } from "@/auth";
import { ROUTES } from "@/lib/config";
import { registerStudent } from "./services/user.service";
import { submitAttempt } from "./services/attempt.service";
import { toggleBookmark } from "./services/bookmark.service";

export type RegisterState = { ok: boolean; error?: string };
export type LoginState = { error?: string };

/** Đăng nhập bằng tài khoản (Credentials). Chuyển hướng khi thành công. */
export async function loginAction(
  _prev: LoginState,
  formData: FormData
): Promise<LoginState> {
  try {
    await signIn("credentials", {
      username: String(formData.get("username") ?? ""),
      password: String(formData.get("password") ?? ""),
      redirectTo: ROUTES.exams,
    });
    return {};
  } catch (err) {
    if (err instanceof AuthError) {
      return { error: "Sai tên đăng nhập hoặc mật khẩu." };
    }
    throw err; // gồm cả redirect của Next — phải ném tiếp
  }
}

/** Đăng ký học sinh (dùng với useActionState trong form). */
export async function registerAction(
  _prev: RegisterState,
  formData: FormData
): Promise<RegisterState> {
  const res = await registerStudent({
    username: String(formData.get("username") ?? ""),
    displayName: String(formData.get("displayName") ?? ""),
    password: String(formData.get("password") ?? ""),
    className: String(formData.get("className") ?? ""),
  });
  return res.ok ? { ok: true } : { ok: false, error: res.error };
}

/** Nộp bài: chấm trắc nghiệm, lưu kết quả, trả về id lượt làm. */
export async function submitAttemptAction(input: {
  examNumber: number;
  answers: Record<string, string | null>;
  durationSec: number;
}): Promise<{ attemptId: string }> {
  const session = await auth();
  if (!session?.user) throw new Error("Bạn cần đăng nhập.");
  const { attemptId } = await submitAttempt({
    userId: session.user.id,
    examNumber: input.examNumber,
    answers: input.answers,
    durationSec: input.durationSec,
  });
  revalidatePath(ROUTES.dashboard);
  return { attemptId };
}

/** Bật/tắt đánh dấu xem lại cho 1 câu hỏi. */
export async function toggleBookmarkAction(
  questionId: string
): Promise<{ bookmarked: boolean }> {
  const session = await auth();
  if (!session?.user) throw new Error("Bạn cần đăng nhập.");
  const res = await toggleBookmark(session.user.id, questionId);
  revalidatePath(ROUTES.review);
  revalidatePath(ROUTES.dashboard);
  return res;
}
