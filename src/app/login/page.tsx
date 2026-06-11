import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { ROUTES } from "@/lib/config";
import { Card, Container } from "@/components/ui";
import { LoginForm } from "@/components/auth/AuthForms";

export const metadata = { title: "Đăng nhập" };

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ registered?: string }>;
}) {
  const session = await auth();
  if (session?.user) redirect(ROUTES.exams);
  const sp = await searchParams;

  return (
    <Container className="max-w-md">
      <div className="mb-6 text-center">
        <div className="mx-auto mb-3 grid h-16 w-16 place-items-center rounded-2xl bg-indigo-600 text-3xl text-white shadow-sm">
          ∑
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-800 sm:text-4xl">
          Luyện thi Toán
        </h1>
        <p className="mt-1 text-xl font-semibold text-indigo-600">
          Tuyển sinh lớp 10
        </p>
      </div>

      <Card className="p-7">
        <h2 className="mb-1 text-lg font-bold text-slate-800">Đăng nhập</h2>
        <p className="mb-5 text-sm text-slate-500">
          Chào mừng em quay lại luyện đề 👋
        </p>
        <LoginForm justRegistered={sp.registered === "1"} />
      </Card>
    </Container>
  );
}
