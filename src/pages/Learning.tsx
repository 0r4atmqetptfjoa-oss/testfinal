
import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ArrowLeft, BookOpen } from "lucide-react";

type Chapter = { id: string; title: string; summary: string; content: string };

// Sample data; in production load from your data layer
const sampleChapters: Chapter[] = [
  {
    id: "cap-1",
    title: "Instituții-cheie în domeniul apărării",
    summary: "Președintele, CSAT, Parlamentul, Guvernul / MApN – roluri și responsabilități",
    content: `# Instituții-cheie
- **Președintele României** — comandant al forțelor armate; prezidează CSAT.
- **CSAT** — organ consultativ pentru apărare și securitate.
- **Parlamentul** — control democratic; adoptă legi.
- **Guvernul / MApN** — execută legile, organizează apărarea.`,
  },
  {
    id: "cap-2",
    title: "Logistica operațiilor întrunite",
    summary: "Principii, aprovizionare, transport, mentenanță",
    content: `# Logistica operațiilor întrunite
- **Principii**: focalizare pe necesarul operației.
- **Aprovizionare**: asigurarea resurselor la timp și locul potrivit.
- **Transport**: planificare și execuție.
- **Mentenanță**: menținerea capacității de luptă.`,
  },
];

const listVariants = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0, transition: { staggerChildren: 0.06 } },
};
const rowVariants = {
  hidden: { opacity: 0, y: 6 },
  show: { opacity: 1, y: 0 },
};
const slide = {
  in: { opacity: 0, x: 40 },
  center: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 300, damping: 26 } },
  out: { opacity: 0, x: -40 },
};

export default function Learning(){
  const [active, setActive] = useState<Chapter | null>(null);
  const title = useMemo(()=> `Tematică - Intendență`, []);

  return (
    <div className="min-h-screen bg-gray-950 text-gray-200 p-4 max-w-3xl mx-auto">
      <div className="mb-4 flex items-center gap-3">
        {active && (
          <button onClick={()=> setActive(null)} className="rounded-xl border border-gray-700 bg-gray-900 px-3 py-2 hover:border-violet-500">
            <div className="flex items-center gap-2 text-sm"><ArrowLeft size={16}/> Înapoi la listă</div>
          </button>
        )}
        <h1 className="text-2xl font-bold">{title}</h1>
      </div>

      <AnimatePresence mode="wait">
        {!active ? (
          <motion.div
            key="list"
            variants={listVariants}
            initial="hidden"
            animate="show"
            exit={{ opacity: 0, x: -20 }}
            className="space-y-2"
          >
            {sampleChapters.map((c)=> (
              <motion.button
                key={c.id}
                variants={rowVariants}
                whileHover={{ scale: 1.03 }}
                onClick={()=> setActive(c)}
                className="w-full rounded-2xl border border-gray-700 bg-gray-900 p-4 text-left hover:border-violet-500"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-gray-800 border border-gray-700"><BookOpen size={20}/></div>
                  <div className="flex-1">
                    <div className="font-medium">{c.title}</div>
                    <div className="text-gray-400 text-sm">{c.summary}</div>
                  </div>
                  <ChevronRight className="text-gray-500" />
                </div>
              </motion.button>
            ))}
          </motion.div>
        ) : (
          <motion.article
            key={active.id}
            initial={slide.in}
            animate={slide.center}
            exit={slide.out}
            className="prose prose-invert max-w-none rounded-2xl border border-gray-700 bg-gray-900 p-4"
          >
            <h2>{active.title}</h2>
            <pre className="whitespace-pre-wrap leading-relaxed text-gray-200">{active.content}</pre>
          </motion.article>
        )}
      </AnimatePresence>
    </div>
  );
}
