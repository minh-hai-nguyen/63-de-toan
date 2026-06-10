import { auth } from "@/auth";
import { APP, ROUTES } from "@/lib/config";
import { Card, Container, LinkButton } from "@/components/ui";

const FEATURES = [
  {
    icon: "📝",
    title: "63 đề thi tuyển sinh",
    desc: "Trắc nghiệm chấm điểm tự động, tự luận có lời giải chi tiết.",
  },
  {
    icon: "⏱️",
    title: "Luyện như thi thật",
    desc: "Đồng hồ đếm giờ, bảng theo dõi câu đã làm và câu cần xem lại.",
  },
  {
    icon: "📊",
    title: "Biết mình yếu phần nào",
    desc: "Thống kê theo thể loại giúp em tập trung ôn đúng chỗ.",
  },
];

export default async function HomePage() {
  const session = await auth();
  const loggedIn = !!session?.user;

  return (
    <Container>
      <section className="mx-auto max-w-3xl py-10 text-center">
        <span className="inline-flex items-center rounded-full border border-indigo-100 bg-indigo-50 px-3 py-1 text-sm font-medium text-indigo-700">
          Toán · Tuyển sinh lớp 10
        </span>
        <h1 className="mt-5 text-4xl font-extrabold tracking-tight text-slate-800 sm:text-5xl">
          Ôn luyện <span className="text-indigo-600">63 đề thi</span> mọi lúc
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-lg text-slate-500">
          {APP.name} giúp em luyện đề, tự chấm điểm và theo dõi tiến bộ một cách
          nhẹ nhàng, thân thiện.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {loggedIn ? (
            <LinkButton href={ROUTES.exams} size="lg">
              Vào luyện đề →
            </LinkButton>
          ) : (
            <>
              <LinkButton href={ROUTES.register} size="lg">
                Bắt đầu miễn phí
              </LinkButton>
              <LinkButton href={ROUTES.login} size="lg" variant="soft">
                Đã có tài khoản
              </LinkButton>
            </>
          )}
        </div>
      </section>

      <section className="grid gap-4 py-6 sm:grid-cols-3">
        {FEATURES.map((f) => (
          <Card key={f.title} className="p-6">
            <div className="text-3xl">{f.icon}</div>
            <h3 className="mt-3 font-semibold text-slate-800">{f.title}</h3>
            <p className="mt-1 text-sm text-slate-500">{f.desc}</p>
          </Card>
        ))}
      </section>
    </Container>
  );
}
