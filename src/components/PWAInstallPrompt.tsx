
import React, { useEffect, useState } from "react";

export default function PWAInstallPrompt(){
  const [deferred, setDeferred] = useState<any>(null);
  const [show, setShow] = useState(false);

  useEffect(()=>{
    function handler(e: any){
      e.preventDefault();
      setDeferred(e); setShow(true);
    }
    window.addEventListener('beforeinstallprompt', handler);
    return ()=> window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  if (!show) return null;

  return (
    <div className="fixed bottom-16 left-0 right-0 px-4 z-40">
      <div className="rounded-2xl border border-gray-800 bg-gray-900 p-3 flex items-center justify-between">
        <div className="text-sm text-gray-200">Instalează aplicația pe ecranul de start</div>
        <div className="flex items-center gap-2">
          <button className="text-xs text-gray-500" onClick={()=> setShow(false)}>Mai târziu</button>
          <button
            className="text-xs rounded bg-[color:var(--accent)] text-white px-3 py-1"
            onClick={async ()=>{ await deferred.prompt(); setShow(false); }}
          >Instalează</button>
        </div>
      </div>
    </div>
  );
}
