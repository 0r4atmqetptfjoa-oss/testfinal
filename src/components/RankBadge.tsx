
import React from "react";
import { rankFromXP } from "@/lib/ranks";

export default function RankBadge({ xp }: { xp: number }){
  const r = rankFromXP(xp);
  return (
    <div className="rounded-xl border border-ui bg-card px-3 py-1 text-xs inline-flex items-center gap-2">
      <span>🎖️ {r.current.name}</span>
      {r.next && (
        <div className="flex items-center gap-1">
          <div className="w-20 h-1.5 rounded bg-white/10 overflow-hidden">
            <div className="h-full bg-[color:var(--accent)]" style={{ width: `${Math.round(r.progress*100)}%` }} />
          </div>
          <span className="text-muted">→ {r.next.name}</span>
        </div>
      )}
    </div>
  );
}
