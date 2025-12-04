import Link from "next/link";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import RefreshStatusButton from "@/components/refresh-status-button";

interface Params {
  params: { id: string };
}

export default async function HighlightDetailPage({ params }: Params) {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const highlight = await prisma.shotHighlight.findUnique({ where: { id: params.id } });
  if (!highlight || highlight.userId !== user.id) redirect("/highlights");

  const metaItems = [
    { label: "Course", value: highlight.courseName },
    { label: "Hole", value: highlight.holeNumber },
    { label: "Par", value: highlight.par },
    { label: "Yardage", value: highlight.yardage ? `${highlight.yardage} yds` : undefined },
    { label: "Club", value: highlight.club },
    { label: "Weather", value: highlight.weather },
    { label: "Emotion", value: highlight.emotion },
    { label: "Lie", value: highlight.lie },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm uppercase tracking-wide text-emerald-200">{highlight.status}</p>
          <h1 className="text-3xl font-semibold">{highlight.courseName || "Shot highlight"}</h1>
          <p className="text-slate-300">{highlight.description}</p>
        </div>
        <Link href="/highlights" className="text-sm text-emerald-200 hover:text-emerald-100">
          ← Back to highlights
        </Link>
      </div>

      {highlight.status === "completed" ? (
        <div className="space-y-4 rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
          <div className="aspect-video overflow-hidden rounded-xl border border-slate-800 bg-black/40">
            <video src={highlight.videoUrl || undefined} poster={highlight.thumbnailUrl || undefined} controls className="h-full w-full object-cover" />
          </div>
          <div className="flex flex-wrap gap-3 text-sm text-slate-200">
            {metaItems
              .filter((item) => item.value !== undefined && item.value !== null)
              .map((item) => (
                <span key={item.label} className="rounded-full bg-slate-800 px-3 py-1 text-slate-100">
                  {item.label}: {item.value as string}
                </span>
              ))}
          </div>
          <div className="space-y-2 text-sm text-slate-200">
            <p className="font-semibold text-white">Hole description</p>
            <p className="text-slate-300">{highlight.llmHoleDescription}</p>
            <p className="font-semibold text-white">Your notes</p>
            <p className="text-slate-300">{highlight.description}</p>
          </div>
          <div className="flex gap-3">
            {highlight.videoUrl && (
              <a
                href={highlight.videoUrl}
                download
                className="rounded-md bg-emerald-500 px-4 py-2 font-semibold text-slate-900 transition hover:bg-emerald-400"
              >
                Download video
              </a>
            )}
            <Link
              href="/highlights"
              className="rounded-md border border-slate-700 px-4 py-2 text-sm text-slate-100 transition hover:border-emerald-500"
            >
              Back to highlights
            </Link>
          </div>
        </div>
      ) : (
        <div className="space-y-4 rounded-2xl border border-slate-800 bg-slate-900/60 p-6 text-center">
          <p className="text-lg font-semibold text-white">Your video is being prepared</p>
          <p className="text-sm text-slate-300">We&apos;re mocking the pipeline. Click below to refresh the status.</p>
          <RefreshStatusButton id={highlight.id} />
          <div className="mt-4 flex flex-wrap justify-center gap-3 text-xs text-slate-300">
            {metaItems
              .filter((item) => item.value !== undefined && item.value !== null)
              .map((item) => (
                <span key={item.label} className="rounded-full bg-slate-800 px-3 py-1">
                  {item.label}: {item.value as string}
                </span>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}
