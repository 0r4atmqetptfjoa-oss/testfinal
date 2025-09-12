
import React, { useMemo } from "react";
import PageHeader from "@/components/PageHeader";
import BentoCard from "@/components/BentoCard";
import { loadGame, levelFromXP, last30DaysActivity, BADGES } from "@/lib/game";
import { AvatarFallback, AvatarImage } from "./_stubs"; // local stub if no avatar component
import { Progress as TProgress } from "./_stubs"; // simple progress stub
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from "recharts";

export default function Progress(){
  const s = loadGame();
  const lvl = levelFromXP(s.xp);
  const data = useMemo(()=> last30DaysActivity().map(d=>({ date: d.date.slice(5), xp: d.xp })), []);

  return (
    <div className="min-h-screen bg-black text-gray-200 p-4 max-w-5xl mx-auto space-y-4">
      <PageHeader title="Profil & Progres" subtitle="Nivel, XP, badge-uri și activitate" />

      {/* Header Profile */}
      <BentoCard className="">
        <div className="flex items-center gap-4">
          <div className="h-14 w-14 rounded-full bg-gray-800 border border-gray-700 flex items-center justify-center text-xl">R</div>
          <div className="flex-1">
            <div className="text-lg font-semibold">Răzvan Ureche</div>
            <div className="text-sm text-gray-500">Nivel {lvl.level} • {s.xp} XP total</div>
          </div>
        </div>
        <div className="mt-3">
          <div className="text-xs text-gray-500 mb-1">Progres către nivelul următor</div>
          <div className="w-full h-3 bg-gray-800 rounded-full overflow-hidden border border-gray-800">
            <div className="h-full bg-cyan-400" style={{ width: `${Math.round(lvl.pct*100)}%` }} />
          </div>
        </div>
      </BentoCard>

      {/* Badges */}
      <BentoCard>
        <div className="text-sm text-gray-500 mb-2">Badge-uri deblocate</div>
        <div className="flex flex-wrap gap-3">
          {s.badges.length === 0 && <div className="text-gray-500">Încă nu ai badge-uri. Completează misiuni și teste pentru a le debloca.</div>}
          {s.badges.map(id => {
            const b = BADGES[id];
            return (
              <div key={id} className="rounded-xl border border-gray-800 bg-gray-900 px-3 py-2 flex items-center gap-2">
                <span className="text-xl">{b.icon}</span><div>
                  <div className="text-sm font-medium">{b.title}</div>
                  <div className="text-xs text-gray-500">{b.desc}</div>
                </div>
              </div>
            );
          })}
          {/* silhouettes for locked */}
          {Object.keys(BADGES).filter(id=>!s.badges.includes(id)).map(id => {
            const b = BADGES[id];
            return (
              <div key={id} className="rounded-xl border border-gray-900 bg-gray-900/50 px-3 py-2 flex items-center gap-2 opacity-50">
                <span className="text-xl">{b.icon}</span><div>
                  <div className="text-sm font-medium">{b.title}</div>
                  <div className="text-xs text-gray-500">{b.desc}</div>
                </div>
              </div>
            );
          })}
        </div>
      </BentoCard>

      {/* Chart: XP daily last 30 days */}
      <BentoCard>
        <div className="text-sm text-gray-500 mb-2">Activitate (XP pe zi – 30 zile)</div>
        <div className="h-56 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 10, right: 10, bottom: 0, left: 0 }}>
              <defs>
                <linearGradient id="gradCyan" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#22d3ee" stopOpacity={0.9}/>
                  <stop offset="100%" stopColor="#22d3ee" stopOpacity={0.1}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="date" hide/>
              <YAxis hide domain={[0, 'dataMax + 10']} />
              <Tooltip contentStyle={{ background:'#0a0a0a', border:'1px solid #1f2937', color:'#e5e7eb' }} />
              <Area type="monotone" dataKey="xp" stroke="#22d3ee" fill="url(#gradCyan)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </BentoCard>
    </div>
  );
}

// simple local stubs to avoid dependency noise if you don't have a design system
export function Avatar(){ return null as any; }
