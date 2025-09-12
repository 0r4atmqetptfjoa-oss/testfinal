
import React from "react";

export default function ShimmerButton({ children, className="", ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>){
  return (
    <button
      {...props}
      className={`relative overflow-hidden rounded-xl bg-violet-500 text-white px-4 py-2 hover:opacity-95 transition ${className}`}
    >
      <span className="relative z-10">{children}</span>
      <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent animate-[shimmer_1.4s_infinite]"/>
      <style>{`@keyframes shimmer{0%{transform:translateX(-100%)}100%{transform:translateX(100%)}}`}</style>
    </button>
  );
}
