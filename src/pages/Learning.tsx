
import React from "react";
import { useSearchParams } from "react-router-dom";
export default function Learning(){
  const [sp] = useSearchParams(); const mod = sp.get("module") || "legislation";
  return (
    <div className="min-h-screen bg-black text-gray-200 p-4 max-w-2xl mx-auto pb-24">
      <h1 className="text-xl font-bold mb-1">Învățare – {mod}</h1>
      <p className="text-sm text-muted mb-3">Conținutul pentru modulul selectat.</p>
      <div className="rounded-2xl border border-ui bg-card p-4">TODO: Afișează capitole, notițe și test rapid.</div>
    </div>
  );
}
