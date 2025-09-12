
import React, { useEffect, useRef, useState } from "react";

export default function EdgeTimer({ seconds, onComplete }: { seconds: number; onComplete?: ()=>void }){
  const [left, setLeft] = useState(seconds);
  const ref = useRef<number | null>(null);
  useEffect(()=>{
    const t0 = performance.now();
    function tick(t: number){
      const dt = (t - t0) / 1000;
      const rem = Math.max(0, seconds - dt);
      setLeft(rem);
      if (rem > 0) ref.current = requestAnimationFrame(tick);
      else onComplete?.();
    }
    ref.current = requestAnimationFrame(tick);
    return ()=> { if (ref.current) cancelAnimationFrame(ref.current); };
  }, [seconds, onComplete]);

  const pct = Math.round((left / seconds) * 100);
  return (
    <>
      <div className="fixed top-0 left-0 right-0 h-1.5 z-40">
        <div className="h-full" style={{
          background: `linear-gradient(90deg, var(--accent) ${pct}%, rgba(255,255,255,0.08) ${pct}%)`
        }} />
      </div>
      <div className="fixed top-2 right-3 z-40 text-xs px-2 py-1 rounded bg-[color:var(--card)] border border-[color:var(--border)]">
        {Math.ceil(left)}s
      </div>
    </>
  );
}
