
import React, { useRef } from "react";

export default function TiltCard({ children, glow=false, className="", max=10 }: { children: React.ReactNode; glow?: boolean; className?: string; max?: number }){
  const ref = useRef<HTMLDivElement>(null);
  function handleMove(e: React.MouseEvent){
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    const rx = (py - 0.5) * -max;
    const ry = (px - 0.5) * max;
    el.style.transform = `perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg)`;
  }
  function reset(){
    const el = ref.current;
    if (el) el.style.transform = `perspective(800px) rotateX(0deg) rotateY(0deg)`;
  }
  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      className={`rounded-2xl border border-gray-800 bg-gray-900 p-4 transition-transform will-change-transform ${glow ? "hover:shadow-[0_0_0_2px_rgba(139,92,246,0.35)]" : ""} ${className}`}
    >
      {children}
    </div>
  );
}
