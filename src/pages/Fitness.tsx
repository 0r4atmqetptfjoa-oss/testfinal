import React, { useEffect, useMemo, useRef, useState } from "react";
import usePageTitle from '@/hooks/usePageTitle';

export default function FitnessSimple(){
  // Set page title
  usePageTitle('Pregătire fizică');
  const [t, setT] = useState(0);
  const [running, setRunning] = useState(false);
  useEffect(()=>{
    let h:any=null; if(running) h=setInterval(()=> setT(x=>x+1),1000); return ()=> clearInterval(h);
  },[running]);
  const mm = Math.floor(t/60).toString().padStart(2,'0');
  const ss = (t%60).toString().padStart(2,'0');
  return (
    <main className="min-h-screen bg-black text-gray-200 p-4 max-w-2xl mx-auto pb-24">
      <section className="card text-center space-y-2">
        <div className="text-lg font-semibold">Pregătire Fizică — Cronometru</div>
        <div className="text-4xl font-mono">{mm}:{ss}</div>
        <div className="flex gap-3 justify-center">
          <button className="btn btn-primary" onClick={()=> setRunning(r=>!r)}>{running ? "Pauză" : "Start"}</button>
          <button className="btn btn-ghost" onClick={()=> { setT(0); setRunning(false); }}>Reset</button>
        </div>
      </section>
      <p className="text-xs text-gray-500 mt-4">Notă: în versiunea completă se activează GPS + hartă Google/Leaflet.</p>
    </main>
  );
}
