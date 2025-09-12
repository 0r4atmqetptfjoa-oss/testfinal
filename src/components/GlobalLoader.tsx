
import React, { createContext, useContext, useState } from "react";

const Ctx = createContext<{ show: (s?: boolean)=>void }>({ show: ()=>{} });

export function useGlobalLoader(){ return useContext(Ctx); }

export default function GlobalLoaderProvider({ children }: { children: React.ReactNode }){
  const [visible, setVisible] = useState(false);
  const show = (s=true)=> setVisible(s);
  return (
    <Ctx.Provider value={{ show }}>
      {children}
      {visible && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center">
          <div className="rounded-xl border border-gray-800 bg-gray-900 p-4">
            <div className="w-52 h-2 rounded bg-gray-800 overflow-hidden">
              <div className="h-full w-1/3 bg-[color:var(--accent)] animate-[loader_1.1s_infinite]" />
            </div>
            <style>{`@keyframes loader{0%{transform:translateX(-100%)}100%{transform:translateX(300%)} }`}</style>
            <div className="text-xs text-gray-500 mt-2">Se încarcă...</div>
          </div>
        </div>
      )}
    </Ctx.Provider>
  );
}
