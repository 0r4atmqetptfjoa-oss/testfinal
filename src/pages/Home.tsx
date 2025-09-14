
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getProfile, branchSlug } from "../lib/profile";

export default function Home(){
  const nav = useNavigate();
  useEffect(()=>{
    const p = getProfile();
    if (p?.branch){
      nav(`/module/${branchSlug(p.branch)}`, { replace: true });
    }
  }, []);
  return (
    <div className="min-h-screen bg-black text-gray-200 p-4 max-w-2xl mx-auto pb-24">
      <h1 className="text-xl font-bold mb-2">Acasă</h1>
      <p className="text-sm text-muted">Selectează un modul din Onboarding sau mergi în Hub.</p>
    </div>
  );
}
