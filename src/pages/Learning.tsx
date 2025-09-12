
import React, { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, BookOpen } from "lucide-react";
import ListRow from "@/components/ListRow";
import PageHeader from "@/components/PageHeader";

type Chapter = { id: string; title: string; summary: string; content: string };

const sampleChapters: Chapter[] = [
  { id: "cap-1", title: "Instituții-cheie în domeniul apărării", summary: "Președintele, CSAT, Parlamentul, Guvernul / MApN – roluri și responsabilități",
    content: `# Instituții-cheie\n- **Președintele României** — comandant al forțelor armate; prezidează CSAT.\n- **CSAT** — organ consultativ pentru apărare și securitate.\n- **Parlamentul** — control democratic; adoptă legi.\n- **Guvernul / MApN** — execută legile, organizează apărarea.` },
  { id: "cap-2", title: "Logistica operațiilor întrunite", summary: "Principii, aprovizionare, transport, mentenanță",
    content: `# Logistica operațiilor întrunite\n- **Principii**: focalizare pe necesarul operației.\n- **Aprovizionare**: asigurarea resurselor la timp și locul potrivit.\n- **Transport**: planificare și execuție.\n- **Mentenanță**: menținerea capacității de luptă.` },
];

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
        {active ? (
          <button onClick={()=> setActive(null)} className="rounded-xl border border-gray-700 bg-gray-900 px-3 py-2 hover:border-violet-500">
            <div className="flex items-center gap-2 text-sm"><ArrowLeft size={16}/> Înapoi la listă</div>
          </button>
        ) : null}
        <PageHeader title={title} />
      </div>

      <AnimatePresence mode="wait">
        {!active ? (
          <motion.div key="list" initial={{opacity:0, y:8}} animate={{opacity:1, y:0}} exit={{ opacity: 0, x: -20 }} className="space-y-2">
            {sampleChapters.map((c)=> (
              <ListRow key={c.id} icon={<BookOpen size={20}/>} title={c.title} subtitle={c.summary} onClick={()=> setActive(c)} />
            ))}
          </motion.div>
        ) : (
          <motion.article key={active.id} initial={slide.in} animate={slide.center} exit={slide.out}
            className="prose prose-invert max-w-none rounded-2xl border border-gray-700 bg-gray-900 p-4">
            <h2>{active.title}</h2>
            <pre className="whitespace-pre-wrap leading-relaxed text-gray-200">{active.content}</pre>
          </motion.article>
        )}
      </AnimatePresence>
    </div>
  );
}
