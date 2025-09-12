
import React, { useEffect } from "react";
import { animate, useMotionValue } from "framer-motion";

export default function AnimatedCounter({ value, className="" }: { value: number; className?: string }){
  const mv = useMotionValue(0);
  useEffect(()=>{
    const controls = animate(mv, value, { duration: 0.6 });
    return ()=> controls.stop();
  }, [value]);
  const [display, setDisplay] = React.useState(0);
  useEffect(()=> mv.on("change", v=> setDisplay(Math.round(v))), [mv]);
  return <span className={className}>{display}</span>;
}
