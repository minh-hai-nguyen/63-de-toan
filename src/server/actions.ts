"use server";

import { AuthError } from "next-auth";
import { signIn } from "@/auth";
import { ROUTES } from "@/lib/config";
import { registerStudent } from "./services/user.service";

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

// Nộp bài & đánh dấu đã chuyển sang API route:
//   POST /api/attempts , POST /api/bookmarks
// (gọi bằng fetch — nhanh, không gây router refresh ngầm).
