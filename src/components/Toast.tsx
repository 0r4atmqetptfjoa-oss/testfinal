
import React from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function Toast({ text, show }: { text: string; show: boolean }){
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="toast"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.2 }}
          className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50"
        >
          <div className="px-4 py-2 rounded-xl border border-gray-800 bg-gray-900/95 text-gray-200 shadow-lg backdrop-blur-md">
            {text}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
