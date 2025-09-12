
import React from "react";
import { motion } from "framer-motion";

export default function PageHeader({ title, subtitle, right }: { title: string; subtitle?: React.ReactNode; right?: React.ReactNode }){
  return (
    <motion.header
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.28 }}
      className="mb-4 flex items-start justify-between gap-3"
    >
      <div className="space-y-1">
        <h1 className="text-2xl font-bold text-gray-200">{title}</h1>
        {subtitle && <div className="text-sm text-gray-400">{subtitle}</div>}
      </div>
      {right}
    </motion.header>
  );
}
