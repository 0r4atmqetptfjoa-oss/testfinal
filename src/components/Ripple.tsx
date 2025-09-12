
import React, { useRef } from "react";

export default function Ripple({ children, className="", ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>){
  const ref = useRef<HTMLButtonElement>(null);
  function onClick(e: React.MouseEvent<HTMLButtonElement>){
    const btn = ref.current!;
    const r = btn.getBoundingClientRect();
    const circle = document.createElement("span");
    const d = Math.max(r.width, r.height);
    circle.style.width = circle.style.height = d + "px";
    circle.style.left = e.clientX - r.left - d/2 + "px";
    circle.style.top = e.clientY - r.top - d/2 + "px";
    circle.className = "ripple";
    const old = btn.getElementsByClassName("ripple")[0];
    if (old) old.remove();
    btn.appendChild(circle);
    props.onClick?.(e);
  }
  return (
    <button ref={ref} {...props} onClick={onClick} className={`relative overflow-hidden ${className}`}>
      {children}
      <style>{`.ripple{ position:absolute; border-radius:50%; transform:scale(0); animation:ripple 600ms linear; background:rgba(var(--accent-rgb),0.35); }
      @keyframes ripple{ to{ transform:scale(4); opacity:0; } }`}</style>
    </button>
  );
}
