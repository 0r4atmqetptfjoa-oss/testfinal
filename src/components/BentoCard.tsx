
import React from "react";
import { motion } from "framer-motion";

export default function BentoCard({
  children, onClick, className = "", glow = false
}: { children: React.ReactNode; onClick?: ()=>void; className?: string; glow?: boolean }){
  return (
    <motion.div
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      className={`rounded-2xl border border-gray-800 bg-gray-900 p-4 ${glow ? "hover:shadow-[0_0_0_2px_rgba(139,92,246,0.35)]" : ""} cursor-default ${className}`}
    >
      {children}
    </motion.div>
  );
}
