
import React, { useEffect, useLayoutEffect, useState } from "react";

type Step = { selector: string; title: string; text: string };
const KEY = "tour_seen";

export default function GuidedTour({ steps, maxRuns=1 }: { steps: Step[]; maxRuns?: number }){
  const [idx, setIdx] = useState(0);
  const [show, setShow] = useState(false);
  const [rect, setRect] = useState<{x:number;y:number;w:number;h:number}>({x:0,y:0,w:0,h:0});

  useEffect(()=>{
    const seen = parseInt(localStorage.getItem(KEY) || "0", 10) || 0;
    if (seen < maxRuns){ setShow(true); position(); }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useLayoutEffect(()=> { position(); }, [idx]);

  function position(){
    const step = steps[idx]; if (!step) return;
    const el = document.querySelector(step.selector) as HTMLElement | null;
    if (el){
      const r = el.getBoundingClientRect();
      setRect({ x: r.left + window.scrollX, y: r.top + window.scrollY, w: r.width, h: r.height });
    }
  }

  function next(){
    if (idx+1 < steps.length){ setIdx(idx+1); }
    else { setShow(false); localStorage.setItem(KEY, String((parseInt(localStorage.getItem(KEY)||"0",10)||0)+1)); }
  }

  if (!show) return null;
  const step = steps[idx];

  return (
    <div className="fixed inset-0 z-50 pointer-events-none">
      <div className="absolute inset-0 bg-black/60"></div>
      <div
        className="absolute rounded-xl pointer-events-auto"
        style={{
          left: rect.x, top: rect.y, width: rect.w, height: rect.h,
          boxShadow: "0 0 0 2px rgba(255,255,255,0.25), 0 0 0 9999px rgba(0,0,0,0.6)"
        }}
      />
      <div className="absolute pointer-events-auto max-w-xs rounded-2xl border border-[color:var(--border)] bg-[color:var(--card)] p-3"
           style={{ top: rect.y + rect.h + 8, left: rect.x }}>
        <div className="text-sm font-semibold text-gray-200">{step.title}</div>
        <div className="text-xs text-gray-400">{step.text}</div>
        <div className="flex items-center justify-end gap-2 mt-2">
          <button onClick={()=> setShow(false)} className="text-xs text-gray-400">Sari</button>
          <button onClick={next} className="text-xs rounded btn-accent px-3 py-1">Continuă</button>
        </div>
      </div>
    </div>
  );
}
