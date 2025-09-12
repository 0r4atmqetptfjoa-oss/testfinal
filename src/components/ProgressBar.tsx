
import React from "react";
import { motion } from "framer-motion";

export default function ProgressBar({ percent }: { percent: number }){
  return (
    <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden border border-gray-700">
      <motion.div
        className="h-full bg-gradient-to-r from-violet-500 to-purple-500"
        initial={{ width: 0 }}
        animate={{ width: `${Math.max(0, Math.min(100, percent))}%` }}
        transition={{ type: "tween", duration: 0.3 }}
      />
    </div>
  );
}
