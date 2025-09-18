
import React, { useEffect, useRef } from "react";

export default function useConfetti(){
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  useEffect(()=>{
    const c = document.createElement("canvas");
    c.style.position = "fixed";
    c.style.inset = "0";
    c.style.pointerEvents = "none";
    c.style.zIndex = "60";
    document.body.appendChild(c);
    canvasRef.current = c;
    return ()=> { c.remove(); };
  }, []);

  function fire(durationMs = 900){
    const c = canvasRef.current;
    if (!c) return;
    const ctx = c.getContext("2d");
    if (!ctx) return;
    const w = c.width = window.innerWidth;
    const h = c.height = window.innerHeight;
    const N = 120;
    const parts = [...Array(N)].map(()=> ({
      x: Math.random()*w, y: -10, vy: (1+Math.random()*3),
      vx: (Math.random()-0.5)*2, s: 4+Math.random()*4, a: 1, hue: Math.random()>0.5 ? 270 : 190
    }));
    const start = performance.now();
    function tick(t: number){
      const dt = t - start;
      // Using optional chaining to satisfy TypeScript that ctx may be null
      ctx?.clearRect(0,0,w,h);
      parts.forEach(p=>{
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.03;
        p.a = Math.max(0, 1 - (dt/durationMs));
        if(ctx){
          ctx.fillStyle = `hsla(${p.hue}, 90%, 60%, ${p.a})`;
          ctx.fillRect(p.x, p.y, p.s, p.s);
        }
      });
      if (dt < durationMs) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }
  return fire;
}
