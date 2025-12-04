import Link from "next/link";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";

function formatSummary(highlight: any) {
  const bits = [highlight.club, highlight.yardage ? `${highlight.yardage}y` : null, highlight.par ? `Par ${highlight.par}` : null];
  return bits.filter(Boolean).join(" • ") || "Shot highlight";
}

export default async function HighlightsPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const highlights = await prisma.shotHighlight.findMany({ where: { userId: user.id }, orderBy: { createdAt: "desc" } });

  return (
    <div className="space-y-6">
      <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-3xl font-semibold">Your highlights</h1>
          <p className="text-slate-300">Mocked end-to-end pipeline to preview the experience.</p>
        </div>
        <Link
          href="/new"
          className="rounded-md bg-emerald-500 px-4 py-2 font-semibold text-slate-900 transition hover:bg-emerald-400"
        >
          New highlight
        </Link>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {highlights.map((highlight) => (
          <Link
            key={highlight.id}
            href={`/highlights/${highlight.id}`}
            className="flex gap-4 rounded-xl border border-slate-800 bg-slate-900/60 p-4 transition hover:border-emerald-500/70"
          >
            <div className="h-24 w-32 overflow-hidden rounded-lg bg-slate-800">
              {highlight.thumbnailUrl ? (
                <img src={highlight.thumbnailUrl} alt="thumbnail" className="h-full w-full object-cover" />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-xs text-slate-400">No thumbnail</div>
              )}
            </div>
            <div className="flex flex-1 flex-col justify-between">
              <div>
                <h3 className="text-lg font-semibold">{highlight.courseName || "Course"}</h3>
                <p className="text-sm text-slate-300">{formatSummary(highlight)}</p>
              </div>
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span className="rounded-full bg-slate-800 px-2 py-1 text-emerald-200">{highlight.status}</span>
                <span>{new Date(highlight.createdAt).toLocaleString()}</span>
              </div>
            </div>
          </Link>
        ))}
        {highlights.length === 0 && (
          <div className="rounded-xl border border-dashed border-slate-800 bg-slate-900/40 p-6 text-center text-slate-300">
            No highlights yet. Start by creating a new one.
          </div>
        )}
      </div>
    </div>
  );
}
