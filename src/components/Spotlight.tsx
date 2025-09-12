
import React, { useEffect, useRef } from "react";

export default function Spotlight(){
  const ref = useRef<HTMLDivElement>(null);
  useEffect(()=>{
    function onMove(e: MouseEvent){
      const el = ref.current;
      if (!el) return;
      const x = e.clientX;
      const y = e.clientY;
      el.style.setProperty("--spot-x", x + "px");
      el.style.setProperty("--spot-y", y + "px");
      el.style.setProperty("--spot2-x", (x*0.6) + "px");
      el.style.setProperty("--spot2-y", (y*0.8) + "px");
    }
    window.addEventListener("mousemove", onMove);
    return ()=> window.removeEventListener("mousemove", onMove);
  }, []);
  return (
    <div ref={ref} aria-hidden className="pointer-events-none fixed inset-0 -z-10">
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(600px circle at var(--spot-x) var(--spot-y), rgba(139,92,246,0.12), transparent 40%),
                       radial-gradient(500px circle at var(--spot2-x) var(--spot2-y), rgba(34,211,238,0.10), transparent 35%)`
        }}
      />
    </div>
  );
}
