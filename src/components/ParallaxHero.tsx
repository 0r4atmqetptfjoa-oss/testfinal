
import React, { useEffect, useRef } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";

export default function ParallaxHero({ title, subtitle, icon }: { title: string; subtitle: string; icon?: React.ReactNode }){
  const x = useMotionValue(0); const y = useMotionValue(0);
  const rotateX = useTransform(y, [-40, 40], [8, -8]);
  const rotateY = useTransform(x, [-40, 40], [-8, 8]);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(()=>{
    function onMove(e: MouseEvent){
      const r = ref.current?.getBoundingClientRect(); if (!r) return;
      const cx = r.left + r.width/2; const cy = r.top + r.height/2;
      x.set(Math.max(-40, Math.min(40, (e.clientX - cx)/8)));
      y.set(Math.max(-40, Math.min(40, (e.clientY - cy)/8)));
    }
    window.addEventListener("mousemove", onMove);
    return ()=> window.removeEventListener("mousemove", onMove);
  }, [x,y]);

  return (
    <motion.div ref={ref} style={{ rotateX, rotateY }} className="rounded-2xl border border-ui bg-card p-5 overflow-hidden relative">
      <div className="absolute -top-16 -left-16 w-56 h-56 rounded-full blur-3xl opacity-20" style={{ background: "radial-gradient(closest-side, var(--accent), transparent)" }} />
      <div className="absolute -bottom-16 -right-16 w-64 h-64 rounded-full blur-3xl opacity-15" style={{ background: "radial-gradient(closest-side, rgba(255,255,255,0.25), transparent)" }} />
      <div className="relative flex items-center gap-3">
        {icon && <div className="p-3 rounded-xl bg-black/30 border border-ui">{icon}</div>}
        <div>
          <div className="text-xs text-muted">{subtitle}</div>
          <div className="text-xl font-bold">{title}</div>
        </div>
      </div>
    </motion.div>
  );
}
