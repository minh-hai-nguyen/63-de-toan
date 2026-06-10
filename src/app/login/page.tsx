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
      <Card className="p-7">
        <h1 className="mb-1 text-2xl font-bold text-slate-800">Đăng nhập</h1>
        <p className="mb-5 text-sm text-slate-500">
          Chào mừng em quay lại luyện đề 👋
        </p>
        <LoginForm justRegistered={sp.registered === "1"} />
      </Card>
    </Container>
  );
}
