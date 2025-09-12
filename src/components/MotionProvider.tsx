
import React from "react";
import { MotionConfig } from "framer-motion";

export default function MotionProvider({ children }: { children: React.ReactNode }){
  // Respectă preferința OS pentru "reduce motion"
  const prefersReduced = typeof window !== "undefined" && window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  return (
    <MotionConfig reducedMotion={prefersReduced ? "always" : "never"} transition={{ type: "spring", stiffness: 340, damping: 30 }}>
      {children}
    </MotionConfig>
  );
}
