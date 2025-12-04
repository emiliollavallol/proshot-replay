"use client";

import { useState } from "react";

export default function RefreshStatusButton({ id }: { id: string }) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  async function checkStatus() {
    setLoading(true);
    setMessage(null);
    const res = await fetch(`/api/highlights/${id}/refresh-status`, { method: "POST" });
    const data = await res.json();
    setLoading(false);
    if (!res.ok) {
      setMessage(data.error || "Unable to refresh status");
      return;
    }
    setMessage(`Status updated: ${data.highlight.status}`);
    window.location.reload();
  }

  return (
    <div className="space-y-3">
      <button
        onClick={checkStatus}
        disabled={loading}
        className="w-full rounded-md bg-emerald-500 px-4 py-2 font-semibold text-slate-900 transition hover:bg-emerald-400 disabled:opacity-70 sm:w-auto"
      >
        {loading ? "Checking..." : "Check for update"}
      </button>
      {message && <p className="text-sm text-slate-200">{message}</p>}
    </div>
  );
}
