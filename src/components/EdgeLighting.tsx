
import React, { useEffect, useRef } from "react";

type Status = "idle" | "correct" | "wrong" | "progress" | "done";

export default function EdgeLighting({ status = "idle" }: { status?: Status }){
  const ref = useRef<HTMLDivElement>(null);
  useEffect(()=>{
    const c = {
      idle: "rgba(var(--accent-rgb),0.0)",
      progress: "rgba(var(--accent-rgb),0.35)",
      correct: "rgba(34,197,94,0.45)",  // green-500
      wrong: "rgba(239,68,68,0.45)",    // red-500
      done: "rgba(34,211,238,0.45)"     // cyan-400
    } as Record<Status,string>;
    if (ref.current){
      ref.current.style.setProperty("--edge-color", c[status]);
      ref.current.style.animation = status === "progress" ? "edgePulse 1.4s infinite" : "edgeFlash 420ms ease";
    }
  }, [status]);
  return (
    <div ref={ref} className="pointer-events-none fixed inset-0 z-40">
      <div className="absolute inset-y-0 left-0 w-1 bg-gradient-to-r from-[var(--edge-color)] to-transparent"></div>
      <div className="absolute inset-y-0 right-0 w-1 bg-gradient-to-l from-[var(--edge-color)] to-transparent"></div>
      <style>{`
        @keyframes edgePulse{ 0%{opacity:.6} 50%{opacity:.9} 100%{opacity:.6} }
        @keyframes edgeFlash{ 0%{opacity:.0} 20%{opacity:.9} 100%{opacity:.0} }
      `}</style>
    </div>
  );
}
