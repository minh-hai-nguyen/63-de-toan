import "server-only";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

export type RegisterInput = {
  username: string;
  displayName: string;
  password: string;
  className?: string;
};

/** Đăng ký tài khoản học sinh mới. Trả về lỗi (string) nếu không hợp lệ. */
export async function registerStudent(
  input: RegisterInput
): Promise<{ ok: true } | { ok: false; error: string }> {
  const username = input.username.trim().toLowerCase();
  const displayName = input.displayName.trim();
  const password = input.password;

  if (username.length < 3)
    return { ok: false, error: "Tên đăng nhập phải có ít nhất 3 ký tự." };
  if (!/^[a-z0-9_.]+$/.test(username))
    return {
      ok: false,
      error: "Tên đăng nhập chỉ gồm chữ thường, số, dấu chấm hoặc gạch dưới.",
    };
  if (!displayName)
    return { ok: false, error: "Vui lòng nhập họ tên." };
  if (password.length < 6)
    return { ok: false, error: "Mật khẩu phải có ít nhất 6 ký tự." };

  const existing = await prisma.user.findUnique({ where: { username } });
  if (existing) return { ok: false, error: "Tên đăng nhập đã tồn tại." };

  const passwordHash = await bcrypt.hash(password, 10);
  await prisma.user.create({
    data: {
      username,
      displayName,
      passwordHash,
      role: "STUDENT",
      className: input.className?.trim() || null,
    },
  });
  return { ok: true };
}
