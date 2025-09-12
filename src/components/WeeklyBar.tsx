
import React from "react";

export default function WeeklyBar({ values }: { values: number[] }){
  const max = Math.max(1, ...values);
  const days = ["L", "M", "M", "J", "V", "S", "D"];
  return (
    <div className="flex items-end justify-between gap-2">
      {values.map((v, i)=>{
        const h = Math.round((v / max) * 64);
        return (
          <div key={i} className="flex flex-col items-center gap-1">
            <div className="w-6 rounded bg-cyan-400/20 border border-cyan-400/40 overflow-hidden" style={{ height: 66 }}>
              <div className="w-full bg-cyan-400" style={{ height: h }} />
            </div>
            <div className="text-[10px] text-gray-500">{days[i]}</div>
          </div>
        );
      })}
    </div>
  );
}
