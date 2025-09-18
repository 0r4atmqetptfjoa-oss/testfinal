// ===============================================
// FILE: src/pages/GuideIndirecta.tsx
// NEW: pagină cu ghidul complet (placeholder pentru text complet)
// ===============================================
import React from "react";

const content = `Ghid Complet pentru Cariera Militară în MApN pe Filiera Indirectă: Ofițeri și Subofițeri
(Înlocuiește acest text cu varianta completă din documentul tău – sau mută-l într-un .md în /public/data/guide/ și fă fetch.)`;

export default function GuideIndirecta(){
  return (
    <div className="min-h-screen bg-black text-gray-200 p-4 max-w-2xl mx-auto pb-24">
      <h1 className="text-xl font-bold mb-2">Ghid – Filiera Indirectă</h1>
      <div className="text-xs text-muted mb-4">Versiune inițială. Actualizări ulterioare vor include bibliografie specifică pe arme.</div>
      <div className="space-y-4">
        <details className="rounded-2xl border border-ui bg-card p-4" open>
          <summary className="cursor-pointer font-semibold">Cuprins & Introducere</summary>
          <div className="mt-3 whitespace-pre-wrap leading-relaxed text-sm text-gray-200">{content}</div>
        </details>
      </div>
    </div>
  );
}
