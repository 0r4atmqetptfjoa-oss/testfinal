
import React, { useEffect, useState } from "react";

const KEY = "coach_seen_count";

export default function Coachmarks(){
  const [step, setStep] = useState<number>(0);
  const [visible, setVisible] = useState<boolean>(false);

  useEffect(()=>{
    let seen = 0;
    try{ seen = parseInt(localStorage.getItem(KEY) || "0", 10) || 0; }catch{}
    if (seen < 3){ setVisible(true); }
  }, []);

  function next(){
    setStep(s => {
      const n = s + 1;
      if (n >= 3){
        try{ localStorage.setItem(KEY, String((parseInt(localStorage.getItem(KEY)||"0",10)||0) + 1)); }catch{}
        setVisible(false);
      }
      return n;
    });
  }

  if (!visible) return null;

  const tips = [
    { title: "Schimbă accentul & tema", text: "Apasă pe butonul „Temă” pentru a alege accentul și paleta (desert/naval/alpine).", pos: "top-16 right-4" },
    { title: "Căutare rapidă", text: "Butonul 🔍 deschide paleta de comenzi: caută module, lecții și teste instant.", pos: "bottom-24 right-4" },
    { title: "Misiunea zilei", text: "Începe de aici – obiectiv zilnic, XP rapid și păstrezi streak-ul.", pos: "top-28 left-4" },
  ];
  const t = tips[Math.min(step, tips.length-1)];

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/60" onClick={next}></div>
      <div className={`absolute ${t.pos} max-w-xs rounded-2xl border border-ui bg-card p-3`}>
        <div className="text-sm font-semibold text-gray-200">{t.title}</div>
        <div className="text-xs text-muted">{t.text}</div>
        <div className="flex items-center justify-end gap-2 mt-2">
          <button onClick={()=>{ localStorage.setItem(KEY,"3"); setVisible(false); }} className="text-xs text-muted">Sari</button>
          <button onClick={next} className="text-xs btn-accent rounded px-3 py-1">Înțeles</button>
        </div>
      </div>
    </div>
  );
}
