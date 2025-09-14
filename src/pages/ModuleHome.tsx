
import React from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function ModuleHome(){
  const { slug } = useParams();
  const nav = useNavigate();
  return (
    <div className="min-h-screen bg-black text-gray-200 p-4 max-w-2xl mx-auto pb-24">
      <h1 className="text-xl font-bold mb-1">Modul: {slug}</h1>
      <p className="text-sm text-muted mb-3">Carduri rapide spre tematică, examen și antrenament.</p>
      <div className="grid grid-cols-2 gap-3">
        <button onClick={()=> nav("/learning")} className="rounded-2xl border border-ui bg-card p-4 text-left active:scale-[0.99]">
          <div className="text-sm font-medium">Tematică</div>
          <div className="text-xs text-muted">Capitole & conținut</div>
        </button>
        <button onClick={()=> nav("/exam")} className="rounded-2xl border border-ui bg-card p-4 text-left active:scale-[0.99]">
          <div className="text-sm font-medium">Examen</div>
          <div className="text-xs text-muted">Simulare cronometrată</div>
        </button>
      </div>
    </div>
  );
}
