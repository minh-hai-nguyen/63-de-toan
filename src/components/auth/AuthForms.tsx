"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useActionState, useEffect, type ReactNode } from "react";
import { loginAction, registerAction } from "@/server/actions";
import { ROUTES } from "@/lib/config";
import { Button } from "@/components/ui";

function Field({
  label,
  name,
  type = "text",
  placeholder,
  autoComplete,
  required = true,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  autoComplete?: string;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-sm font-medium text-slate-600">
        {label}
      </span>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        autoComplete={autoComplete}
        required={required}
        className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-slate-800 outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
      />
    </label>
  );
}

function Alert({ children, kind = "error" }: { children: ReactNode; kind?: "error" | "ok" }) {
  const cls =
    kind === "error"
      ? "border-rose-200 bg-rose-50 text-rose-700"
      : "border-emerald-200 bg-emerald-50 text-emerald-700";
  return (
    <div className={`rounded-xl border px-3.5 py-2.5 text-sm ${cls}`}>
      {children}
    </div>
  );
}

export function LoginForm({ justRegistered }: { justRegistered?: boolean }) {
  const [state, formAction, pending] = useActionState(loginAction, {});
  return (
    <form action={formAction} className="space-y-4">
      {justRegistered && (
        <Alert kind="ok">Đăng ký thành công! Mời em đăng nhập.</Alert>
      )}
      {state.error && <Alert>{state.error}</Alert>}
      <Field label="Tên đăng nhập" name="username" autoComplete="username" />
      <Field
        label="Mật khẩu"
        name="password"
        type="password"
        autoComplete="current-password"
      />
      <Button type="submit" size="lg" className="w-full" disabled={pending}>
        {pending ? "Đang đăng nhập..." : "Đăng nhập"}
      </Button>
      <p className="text-center text-sm text-slate-500">
        Chưa có tài khoản?{" "}
        <Link href={ROUTES.register} className="font-medium text-indigo-600">
          Đăng ký ngay
        </Link>
      </p>
    </form>
  );
}

export function RegisterForm() {
  const router = useRouter();
  const [state, formAction, pending] = useActionState(registerAction, {
    ok: false,
  });

  useEffect(() => {
    if (state.ok) router.push(`${ROUTES.login}?registered=1`);
  }, [state.ok, router]);

  return (
    <form action={formAction} className="space-y-4">
      {state.error && <Alert>{state.error}</Alert>}
      <Field label="Họ và tên" name="displayName" placeholder="Nguyễn Văn A" />
      <Field
        label="Tên đăng nhập"
        name="username"
        placeholder="vd: nguyenvana"
        autoComplete="username"
      />
      <Field
        label="Lớp (không bắt buộc)"
        name="className"
        placeholder="vd: 9A1"
        required={false}
      />
      <Field
        label="Mật khẩu"
        name="password"
        type="password"
        placeholder="ít nhất 6 ký tự"
        autoComplete="new-password"
      />
      <Button type="submit" size="lg" className="w-full" disabled={pending}>
        {pending ? "Đang tạo tài khoản..." : "Tạo tài khoản"}
      </Button>
      <p className="text-center text-sm text-slate-500">
        Đã có tài khoản?{" "}
        <Link href={ROUTES.login} className="font-medium text-indigo-600">
          Đăng nhập
        </Link>
      </p>
    </form>
  );
}
