
import React, { useEffect, useState } from "react";

// The learning index file groups units with topics and titles. We will fetch it and
// display a list of topics and their associated sections. Selecting a unit could
// navigate to a detailed view in a future update.
type LearningUnit = {
  id: string;
  topic: string;
  title: string;
  body_html: string;
  word_count: number;
  reading_min: number;
  source?: string;
};

export default function Learning(){
  const [units, setUnits] = useState<LearningUnit[] | null>(null);
  const [query, setQuery] = useState<string>("");

  useEffect(()=>{
    fetch("/db/learning_index.json").then(r => r.json()).then((data: { units: LearningUnit[] }) => {
      setUnits(data.units);
    }).catch(()=>{
      // Fallback: no units available
      setUnits([]);
    });
  },[]);

  const filtered = units?.filter(u => {
    if(!query) return true;
    const q = query.toLowerCase();
    return u.topic.toLowerCase().includes(q) || u.title.toLowerCase().includes(q);
  }) || [];

  return (
    <div className="min-h-screen bg-black text-gray-200 p-4 max-w-2xl mx-auto pb-24 space-y-4">
      <h1 className="text-xl font-bold">Învățare</h1>
      <p className="text-sm text-muted">Tematică & capitole – mai jos sunt listate capitolele disponibile pentru studiu.</p>
      <input
        type="text"
        value={query}
        onChange={e => setQuery(e.target.value)}
        placeholder="Caută..."
        className="w-full p-2 rounded-lg border border-ui bg-card text-sm mb-3 focus:outline-none focus:border-accent"
      />
      {!units && <div>Se încarcă…</div>}
      {units && units.length===0 && <div className="text-muted">Momentan nu există lecții disponibile.</div>}
      {units && units.length>0 && (
        <div className="space-y-4">
          {filtered.map(u => (
            <details key={u.id} className="rounded-2xl border border-ui bg-card p-4">
              <summary className="cursor-pointer font-semibold">{u.topic} — {u.title}</summary>
              <div className="mt-3 prose prose-sm prose-invert" dangerouslySetInnerHTML={{ __html: u.body_html }}></div>
            </details>
          ))}
          {filtered.length===0 && <div className="text-muted text-sm">Niciun rezultat pentru „{query}”.</div>}
        </div>
      )}
    </div>
  );
}
