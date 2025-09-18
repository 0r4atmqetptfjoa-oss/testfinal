
import React, { useEffect } from "react";
import usePageTitle from "../hooks/usePageTitle";
import { useNavigate } from "react-router-dom";
import { getProfile, branchSlug } from "../lib/profile";
export default function Home(){
  const nav = useNavigate();
  // Set the page title when this component mounts
  usePageTitle("Acasă");
  useEffect(()=>{
    const p = getProfile();
    if (p?.branch){ nav(`/module/${branchSlug(p.branch)}`, { replace: true }); }
  }, []);
  return <div className="min-h-screen bg-black text-gray-200 p-4 max-w-2xl mx-auto pb-24">
    <h1 className="text-xl font-bold mb-1">Acasă</h1>
    <p className="text-sm text-muted">Finalizează onboarding sau alege modulul din profil.</p>
  </div>;
}
