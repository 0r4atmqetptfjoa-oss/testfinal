
import React, { useEffect, useRef, useState } from "react";

export default function PullToRefresh({ onRefresh, children }: { onRefresh: ()=>Promise<void>|void, children: React.ReactNode }){
  const ref = useRef<HTMLDivElement>(null);
  const [y, setY] = useState(0);
  const [drag, setDrag] = useState(false);
  const TH = 68;

  useEffect(()=>{
    const el = ref.current!;
    let startY = 0, active = false;
    function onTouchStart(e: TouchEvent){
      if (window.scrollY > 0) return;
      active = true; startY = e.touches[0].clientY; setDrag(true);
    }
    function onTouchMove(e: TouchEvent){
      if (!active) return;
      const dy = e.touches[0].clientY - startY;
      if (dy > 0){ e.preventDefault(); setY(Math.min(TH*1.5, dy*0.6)); }
    }
    async function onTouchEnd(){
      if (!active) return;
      active = false;
      if (y >= TH){
        setY(TH);
        try{ await onRefresh(); }finally{ setY(0); setDrag(false); }
      }else{
        setY(0); setDrag(false);
      }
    }
    el.addEventListener("touchstart", onTouchStart, { passive: true });
    el.addEventListener("touchmove", onTouchMove, { passive: false });
    el.addEventListener("touchend", onTouchEnd);
    return ()=>{
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchmove", onTouchMove as any);
      el.removeEventListener("touchend", onTouchEnd);
    };
  }, [y, onRefresh]);

  return (
    <div ref={ref} className="relative">
      <div className="absolute top-0 left-0 right-0" style={{ transform: `translateY(${y-TH}px)` }}>
        <div className="flex items-center justify-center text-xs text-muted">
          <div className="w-6 h-6 rounded-full border-2" style={{ borderColor: 'var(--accent)', borderTopColor: 'transparent', animation: drag ? 'spin .8s linear infinite' : 'none' }} />
          <span className="ml-2">{y>=TH ? "Eliberează pentru refresh" : "Trage în jos..."}</span>
        </div>
      </div>
      <div style={{ transform: `translateY(${y}px)` }}>
        {children}
      </div>
      <style>{`@keyframes spin{to{transform:rotate(1turn)}}`}</style>
    </div>
  );
}
