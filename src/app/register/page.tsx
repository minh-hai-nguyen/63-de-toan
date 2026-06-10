import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { ROUTES } from "@/lib/config";
import { Card, Container } from "@/components/ui";
import { RegisterForm } from "@/components/auth/AuthForms";

export const metadata = { title: "Đăng ký" };

export default async function RegisterPage() {
  const session = await auth();
  if (session?.user) redirect(ROUTES.exams);

  return (
    <Container className="max-w-md">
      <Card className="p-7">
        <h1 className="mb-1 text-2xl font-bold text-slate-800">Tạo tài khoản</h1>
        <p className="mb-5 text-sm text-slate-500">
          Đăng ký để lưu kết quả và theo dõi tiến bộ của em.
        </p>
        <RegisterForm />
      </Card>
    </Container>
  );
}
