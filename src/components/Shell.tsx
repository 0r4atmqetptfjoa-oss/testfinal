
import React, { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import MobileNavBar from "./MobileNavBar";
import ProfileSwitchButton from "./ProfileSwitchButton";
import { Info } from "lucide-react";
// Import the command palette so it is available globally. It uses
// a keyboard shortcut (Ctrl+K) to open. You can trigger it by
// pressing Ctrl+K on your keyboard.
import CommandPalette from './CommandPalette';
// Import the toast provider from react-hot-toast. This will render a toaster
// at the top of the page and can be used from anywhere in the app by calling
// toast.success/ toast.error etc. (see README for usage examples)
import { Toaster } from "react-hot-toast";

export default function Shell(){
  const loc = useLocation(); const nav = useNavigate();
  const isOnboarding = /onboarding/i.test(loc.pathname);
  useEffect(()=>{
    const done = localStorage.getItem("onboarding_completed") === "1";
    if (!done && !isOnboarding){ nav("/onboarding", { replace: true }); }
  }, [loc.pathname]);
  return (
    <div className="min-h-screen bg-black text-gray-200">
      {/* Global toast provider; notifications can be triggered from anywhere */}
      <Toaster position="top-center" reverseOrder={false} />
      {/* Command palette modal; opens with Ctrl+K */}
      <CommandPalette />
      {!isOnboarding && <ProfileSwitchButton/>}
      <main className="max-w-2xl mx-auto pb-24 px-4">
        <Outlet/>
      </main>
      {!isOnboarding && <MobileNavBar/>}
      {/* Buton About fixat în colțul din dreapta jos pentru a deschide pagina de prezentare */}
      {!isOnboarding && (
        <button
          onClick={() => nav("/about")}
          className="fixed bottom-24 right-4 bg-accent text-black p-3 rounded-full shadow-lg flex items-center justify-center"
          aria-label="Despre aplicație"
        >
          <Info size={20} />
        </button>
      )}
    </div>
  );
}
