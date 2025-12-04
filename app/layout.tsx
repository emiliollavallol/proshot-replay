import "./globals.css";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ProShot Replay",
  description: "Turn your golf shots into TV-style highlights",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-950 text-slate-100">
        <div className="mx-auto max-w-6xl px-4">
          <header className="flex items-center justify-between py-6">
            <Link href="/" className="flex items-center gap-2 text-lg font-semibold">
              <span className="h-8 w-8 rounded-full bg-gradient-to-br from-emerald-400 to-cyan-500" />
              <span>ProShot Replay</span>
            </Link>
            <nav className="flex items-center gap-4 text-sm font-medium text-slate-200">
              <Link href="/login" className="hover:text-white">
                Log in
              </Link>
              <Link
                href="/signup"
                className="rounded-md bg-emerald-500 px-4 py-2 text-slate-900 transition hover:bg-emerald-400"
              >
                Sign up
              </Link>
            </nav>
          </header>
          <main className="pb-12">{children}</main>
        </div>
      </body>
    </html>
  );
}
