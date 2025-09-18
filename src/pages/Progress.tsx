
import React from "react";
import usePageTitle from '@/hooks/usePageTitle';
export default function Progress(){
  // Set page title
  usePageTitle('Profil & Progres');
  return (
    <div className="min-h-screen bg-black text-gray-200 p-4 max-w-2xl mx-auto pb-24">
      <h1 className="text-xl font-bold mb-2">Profil & Progres</h1>
      <p className="text-sm text-muted">Nivel, badge-uri, grafice.</p>
    </div>
  );
}
