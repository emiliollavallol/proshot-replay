import Link from "next/link";
import { getCurrentUser } from "@/lib/auth";
import CTAButton from "@/components/cta-button";

export default async function HomePage() {
  const user = await getCurrentUser();

  return (
    <div className="grid gap-12 py-10 lg:grid-cols-2 lg:items-center">
      <div className="space-y-6">
        <p className="inline-flex items-center rounded-full bg-slate-800/60 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-emerald-200">
          New • Mocked AI flow
        </p>
        <h1 className="text-4xl font-bold leading-tight sm:text-5xl">
          Turn your golf shots into TV-style highlights
        </h1>
        <p className="text-lg text-slate-300">
          Describe your shot. AI does the rest. ProShot Replay crafts cinematic hole intros and delivers a
          broadcast-ready highlight video.
        </p>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <CTAButton href={user ? "/new" : "/signup"}>Create your first highlight</CTAButton>
          <Link href="/highlights" className="inline-flex items-center gap-2 text-sm text-slate-300 hover:text-white">
            <span>View my highlights</span>
            <span aria-hidden>→</span>
          </Link>
        </div>
        <div className="flex gap-4 text-sm text-slate-400">
          <div>
            <span className="block text-xl font-semibold text-white">100%</span>
            Mocked AI + video pipeline
          </div>
          <div>
            <span className="block text-xl font-semibold text-white">Minutes</span>
            to create your first highlight
          </div>
        </div>
      </div>
      <div className="relative overflow-hidden rounded-2xl border border-slate-800 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800 p-6 shadow-xl">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(16,185,129,0.2),transparent_35%),radial-gradient(circle_at_80%_20%,rgba(34,211,238,0.16),transparent_35%)]" />
        <div className="relative space-y-4">
          <p className="text-sm uppercase tracking-wide text-emerald-200">Preview</p>
          <h2 className="text-2xl font-semibold text-white">AI-crafted highlight reel</h2>
          <div className="aspect-video overflow-hidden rounded-xl border border-slate-800 bg-black/40">
            <video src="/sample-highlight.mp4" poster="/sample-thumbnail.jpg" autoPlay muted loop playsInline className="h-full w-full object-cover" />
          </div>
          <p className="text-sm text-slate-300">
            Fully mocked end-to-end. Swap in your favorite LLM and video provider when ready.
          </p>
        </div>
      </div>
    </div>
  );
}
