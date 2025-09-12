
import React, { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function BottomSheet({ open, onClose, children, title }: { open: boolean; onClose: ()=>void; children: React.ReactNode; title?: string }){
  useEffect(()=>{
    function onEsc(e: KeyboardEvent){ if(e.key === "Escape") onClose(); }
    document.addEventListener("keydown", onEsc);
    return ()=> document.removeEventListener("keydown", onEsc);
  }, [onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div className="fixed inset-0 z-50" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <div className="absolute inset-0 bg-black/50" onClick={onClose} />
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", stiffness: 280, damping: 28 }}
            className="absolute bottom-0 left-0 right-0 rounded-t-2xl border border-ui bg-card p-4 safe-bottom"
          >
            {title && <div className="text-muted text-sm mb-2">{title}</div>}
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
