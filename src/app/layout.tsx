import type { Metadata } from "next";
import { Be_Vietnam_Pro } from "next/font/google";
import "./globals.css";
import MathJaxProvider from "@/components/MathJaxProvider";
import SiteHeader from "@/components/SiteHeader";
import AiTutor from "@/components/ai/AiTutor";
import { auth } from "@/auth";
import { aiConfigured } from "@/lib/ai";
import { APP } from "@/lib/config";

const beVietnam = Be_Vietnam_Pro({
  variable: "--font-be-vietnam",
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: `${APP.name} — ${APP.tagline}`,
    template: `%s · ${APP.name}`,
  },
  description: APP.tagline,
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const session = await auth();
  const showAi = !!session?.user && aiConfigured();

  return (
    <html lang="vi" className={`${beVietnam.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">
        <MathJaxProvider>
          <SiteHeader />
          <main className="flex-1 py-8">{children}</main>
          <footer className="border-t border-slate-200/70 py-6 text-center text-sm text-slate-400">
            {APP.name} · {APP.tagline}
          </footer>
          {showAi && <AiTutor />}
        </MathJaxProvider>
      </body>
    </html>
  );
}
