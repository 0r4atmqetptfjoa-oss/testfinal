
import React from "react";
import { useNavigate } from "react-router-dom";

export default function Hub(){
  const nav = useNavigate();
  return (
    <div className="min-h-screen bg-black text-gray-200 p-4 max-w-2xl mx-auto pb-24">
      <h1 className="text-xl font-bold mb-2">Hub</h1>
      <div className="grid grid-cols-2 gap-3">
        <button onClick={()=> nav("/onboarding")} className="rounded-2xl border border-ui bg-card p-4 text-left active:scale-[0.99]">
          <div className="text-sm font-medium">Relansează Onboarding</div>
          <div className="text-xs text-muted">Schimbă rol/filieră/armă</div>
        </button>
        <button onClick={()=> nav("/settings")} className="rounded-2xl border border-ui bg-card p-4 text-left active:scale-[0.99]">
          <div className="text-sm font-medium">Teme & Preferințe</div>
          <div className="text-xs text-muted">Accent, palete, PWA</div>
        </button>
      </div>
    </div>
  );
}
