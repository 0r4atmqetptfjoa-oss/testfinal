
import React from "react";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";

export default function ListRow({
  icon, title, subtitle, onClick, right
}: { icon?: React.ReactNode; title: string; subtitle?: string; onClick?: ()=>void; right?: React.ReactNode }){
  return (
    <motion.button
      whileHover={{ scale: 1.03 }}
      onClick={onClick}
      className="w-full rounded-2xl border border-gray-700 bg-gray-900 p-4 text-left hover:border-violet-500 transition-colors"
    >
      <div className="flex items-center gap-3">
        {icon && <div className="p-2 rounded-lg bg-gray-800 border border-gray-700">{icon}</div>}
        <div className="flex-1">
          <div className="font-medium text-gray-200">{title}</div>
          {subtitle && <div className="text-gray-400 text-sm">{subtitle}</div>}
        </div>
        {right ?? <ChevronRight className="text-gray-500" />}
      </div>
    </motion.button>
  );
}
