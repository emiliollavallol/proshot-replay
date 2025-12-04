"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function NewHighlightPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [checkedAuth, setCheckedAuth] = useState(false);

  useEffect(() => {
    async function checkAuth() {
      const res = await fetch("/api/me");
      const data = await res.json();
      if (!data.user) {
        router.replace("/login");
      } else {
        setCheckedAuth(true);
      }
    }
    checkAuth();
  }, [router]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setLoading(true);
    const formData = new FormData(event.currentTarget);
    const payload = Object.fromEntries(formData.entries());

    const res = await fetch("/api/highlights", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    setLoading(false);

    if (!res.ok) {
      setError(data.error || "Failed to create highlight");
      return;
    }

    router.push(`/highlights/${data.highlight.id}`);
  }

  if (!checkedAuth) return null;

  return (
    <div className="mx-auto max-w-3xl space-y-6 rounded-2xl border border-slate-800 bg-slate-900/60 p-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-semibold">Describe your shot</h1>
        <p className="text-sm text-slate-300">We&apos;ll generate a cinematic prompt and mock video for you.</p>
      </div>
      {error && <div className="rounded-md border border-red-500/60 bg-red-500/10 px-4 py-3 text-sm text-red-200">{error}</div>}
      <form className="grid gap-4 md:grid-cols-2" onSubmit={handleSubmit}>
        <label className="space-y-2 text-sm">
          <span className="font-medium">Course Name</span>
          <input name="courseName" className="w-full rounded-md border px-3 py-2 text-slate-100 outline-none focus:border-emerald-500" />
        </label>
        <label className="space-y-2 text-sm">
          <span className="font-medium">Hole Number</span>
          <input name="holeNumber" type="number" min={1} className="w-full rounded-md border px-3 py-2 text-slate-100 outline-none focus:border-emerald-500" />
        </label>
        <label className="space-y-2 text-sm">
          <span className="font-medium">Par</span>
          <select name="par" className="w-full rounded-md border px-3 py-2 text-slate-100 outline-none focus:border-emerald-500">
            <option value="">Select</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </label>
        <label className="space-y-2 text-sm">
          <span className="font-medium">Yardage</span>
          <input name="yardage" type="number" className="w-full rounded-md border px-3 py-2 text-slate-100 outline-none focus:border-emerald-500" />
        </label>
        <label className="space-y-2 text-sm">
          <span className="font-medium">Club</span>
          <input name="club" className="w-full rounded-md border px-3 py-2 text-slate-100 outline-none focus:border-emerald-500" />
        </label>
        <label className="space-y-2 text-sm">
          <span className="font-medium">Weather</span>
          <select name="weather" className="w-full rounded-md border px-3 py-2 text-slate-100 outline-none focus:border-emerald-500">
            <option value="">Select</option>
            <option value="sunny">Sunny</option>
            <option value="cloudy">Cloudy</option>
            <option value="windy">Windy</option>
            <option value="sunset">Sunset</option>
          </select>
        </label>
        <label className="space-y-2 text-sm">
          <span className="font-medium">Lie</span>
          <select name="lie" className="w-full rounded-md border px-3 py-2 text-slate-100 outline-none focus:border-emerald-500">
            <option value="">Select</option>
            <option value="tee">Tee</option>
            <option value="fairway">Fairway</option>
            <option value="rough">Rough</option>
            <option value="bunker">Bunker</option>
          </select>
        </label>
        <label className="space-y-2 text-sm">
          <span className="font-medium">Emotion</span>
          <select name="emotion" className="w-full rounded-md border px-3 py-2 text-slate-100 outline-none focus:border-emerald-500">
            <option value="">Select</option>
            <option value="clutch">Clutch</option>
            <option value="miracle">Miracle</option>
            <option value="lucky">Lucky</option>
            <option value="heartbreak">Heartbreak</option>
          </select>
        </label>
        <label className="space-y-2 text-sm md:col-span-2">
          <span className="font-medium">Description</span>
          <textarea
            name="description"
            required
            rows={4}
            className="w-full rounded-md border px-3 py-2 text-slate-100 outline-none focus:border-emerald-500"
            placeholder="E.g. high fade 7-iron over water"
          />
        </label>
        <button
          type="submit"
          disabled={loading}
          className="md:col-span-2 rounded-md bg-emerald-500 px-4 py-3 text-lg font-semibold text-slate-900 transition hover:bg-emerald-400 disabled:opacity-70"
        >
          {loading ? "Creating highlight..." : "Generate highlight"}
        </button>
      </form>
    </div>
  );
}
