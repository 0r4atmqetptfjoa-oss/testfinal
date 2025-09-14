
import React from "react";
import { useNavigate } from "react-router-dom";
export default function ProfileSwitchButton(){
  const nav = useNavigate();
  return (
    <button onClick={()=> nav("/onboarding")}
      className="fixed top-3 left-3 z-50 rounded-full border border-ui bg-black/70 backdrop-blur px-3 py-1 text-xs hover:opacity-90 active:scale-95">
      Schimbă profil
    </button>
  );
}
