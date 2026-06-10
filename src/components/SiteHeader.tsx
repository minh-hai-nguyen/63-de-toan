import Link from "next/link";
import { auth, signOut } from "@/auth";
import { APP, ROLES, ROUTES } from "@/lib/config";
import { Container, LinkButton } from "@/components/ui";

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="rounded-lg px-3 py-1.5 text-sm font-medium text-slate-600 transition hover:bg-white hover:text-indigo-700"
    >
      {children}
    </Link>
  );
}

export default async function SiteHeader() {
  const session = await auth();
  const user = session?.user;
  const isTeacher = user?.role === ROLES.TEACHER;

  return (
    <header className="sticky top-0 z-20 border-b border-slate-200/70 bg-white/70 backdrop-blur">
      <Container className="flex h-16 items-center justify-between gap-4">
        <Link href={ROUTES.home} className="flex items-center gap-2">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-indigo-600 text-lg text-white">
            ∑
          </span>
          <span className="font-bold text-slate-800">{APP.name}</span>
        </Link>

        <nav className="flex items-center gap-1">
          {user ? (
            <>
              <NavLink href={ROUTES.exams}>Đề thi</NavLink>
              {isTeacher ? (
                <NavLink href={ROUTES.teacher}>Quản lý lớp</NavLink>
              ) : (
                <>
                  <NavLink href={ROUTES.dashboard}>Tiến bộ</NavLink>
                  <NavLink href={ROUTES.review}>Xem lại</NavLink>
                </>
              )}
              <span className="ml-2 hidden text-sm text-slate-500 sm:inline">
                {user.name}
                {isTeacher && " (GV)"}
              </span>
              <form
                action={async () => {
                  "use server";
                  await signOut({ redirectTo: ROUTES.home });
                }}
              >
                <button className="ml-1 rounded-lg px-3 py-1.5 text-sm font-medium text-slate-500 transition hover:bg-rose-50 hover:text-rose-600">
                  Đăng xuất
                </button>
              </form>
            </>
          ) : (
            <>
              <NavLink href={ROUTES.login}>Đăng nhập</NavLink>
              <LinkButton href={ROUTES.register} size="sm">
                Đăng ký
              </LinkButton>
            </>
          )}
        </nav>
      </Container>
    </header>
  );
}
