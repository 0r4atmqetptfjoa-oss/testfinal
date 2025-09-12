
import React from "react";
import { motion } from "framer-motion";

export default function ProgressBar({ percent, accent = "violet" }: { percent: number; accent?: "violet" | "cyan" }){
  const color = accent === "cyan" ? "bg-cyan-400" : "bg-violet-500";
  return (
    <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden border border-gray-800">
      <motion.div
        className={`h-full ${color}`}
        initial={{ width: 0 }}
        animate={{ width: `${Math.max(0, Math.min(100, percent))}%` }}
        transition={{ type: "tween", duration: 0.3 }}
      />
    </div>
  );
}
