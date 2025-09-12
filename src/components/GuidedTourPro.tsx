
import React, { useEffect, useLayoutEffect, useState } from "react";

type Step = { selector: string; title: string; text: string };
type Pos = { x: number; y: number; w: number; h: number };

function within(v: number, min: number, max: number){ return Math.max(min, Math.min(max, v)); }

export default function GuidedTourPro({ steps, maxRuns=1 }: { steps: Step[]; maxRuns?: number }){
  const KEY = "tour_pro_seen";
  const [idx, setIdx] = useState(0);
  const [show, setShow] = useState(false);
  const [rect, setRect] = useState<Pos>({x:0,y:0,w:0,h:0});
  const [anchor, setAnchor] = useState<"top"|"bottom"|"left"|"right">("bottom");

  useEffect(()=>{
    const seen = parseInt(localStorage.getItem(KEY) || "0", 10) || 0;
    if (seen < maxRuns){ setShow(true); position(); }
    const onResize = ()=> position();
    const onScroll = ()=> position();
    window.addEventListener("resize", onResize);
    window.addEventListener("scroll", onScroll, { passive: true });
    return ()=>{ window.removeEventListener("resize", onResize); window.removeEventListener("scroll", onScroll as any); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idx]);

  useLayoutEffect(()=> { position(); }, [idx]);

  function position(){
    const step = steps[idx]; if (!step) return;
    const el = document.querySelector(step.selector) as HTMLElement | null;
    if (el){
      const r = el.getBoundingClientRect();
      const pos: Pos = { x: r.left + window.scrollX, y: r.top + window.scrollY, w: r.width, h: r.height };
      setRect(pos);
      // Auto-anchor: prefer bottom; if out of viewport, try top; else left/right.
      const vh = window.innerHeight, vw = window.innerWidth;
      const spaceBelow = vh - (r.top + r.height);
      const spaceAbove = r.top;
      const spaceRight = vw - (r.left + r.width);
      const spaceLeft = r.left;
      let a: typeof anchor = "bottom";
      if (spaceBelow < 120 && spaceAbove > spaceBelow) a = "top";
      if ((a === "bottom" || a === "top") && Math.max(spaceLeft, spaceRight) < 160){
        a = spaceRight > spaceLeft ? "right" : "left";
      }
      setAnchor(a);
    }
  }

  function next(){
    if (idx+1 < steps.length){ setIdx(idx+1); }
    else { setShow(false); localStorage.setItem("tour_pro_seen", String((parseInt(localStorage.getItem("tour_pro_seen")||"0",10)||0)+1)); }
  }

  if (!show) return null;
  const step = steps[idx];
  const offset = 10;
  const tipW = 280, tipH = 120;
  let tipX = rect.x, tipY = rect.y + rect.h + offset;
  if (anchor === "top") tipY = rect.y - tipH - offset;
  if (anchor === "right") { tipX = rect.x + rect.w + offset; tipY = rect.y; }
  if (anchor === "left") { tipX = rect.x - tipW - offset; tipY = rect.y; }
  tipX = within(tipX, 8 + window.scrollX, window.scrollX + window.innerWidth - tipW - 8);
  tipY = within(tipY, 8 + window.scrollY, window.scrollY + window.innerHeight - tipH - 8);

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
      <div className="absolute pointer-events-auto rounded-2xl border border-[color:var(--border)] bg-[color:var(--card)] p-3"
           style={{ top: tipY, left: tipX, width: tipW, height: tipH }}>
        <div className="text-sm font-semibold text-gray-200 mb-1">{step.title}</div>
        <div className="text-xs text-gray-400">{step.text}</div>
        <div className="flex items-center justify-end gap-2 mt-3">
          <button onClick={()=> setShow(false)} className="text-xs text-gray-400">Sari</button>
          <button onClick={next} className="text-xs rounded btn-accent px-3 py-1">Continuă</button>
        </div>
      </div>
    </div>
  );
}
