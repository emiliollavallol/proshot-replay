import Link from "next/link";
import { PropsWithChildren } from "react";

export default function CTAButton({ href, children }: PropsWithChildren<{ href: string }>) {
  return (
    <Link
      href={href}
      className="inline-flex w-full items-center justify-center rounded-md bg-emerald-500 px-5 py-3 text-center text-base font-semibold text-slate-900 shadow-lg shadow-emerald-500/25 transition hover:-translate-y-0.5 hover:bg-emerald-400 sm:w-auto"
    >
      {children}
    </Link>
  );
}
