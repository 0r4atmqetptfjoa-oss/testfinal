
import React, { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import MobileNavBar from "./MobileNavBar";
import ProfileSwitchButton from "./ProfileSwitchButton";

export default function Shell(){
  const loc = useLocation(); const nav = useNavigate();
  const isOnboarding = /onboarding/i.test(loc.pathname);
  useEffect(()=>{
    const done = localStorage.getItem("onboarding_completed") === "1";
    if (!done && !isOnboarding){ nav("/onboarding", { replace: true }); }
  }, [loc.pathname]);
  return (
    <div className="min-h-screen bg-black text-gray-200">
      {!isOnboarding && <ProfileSwitchButton/>}
      <main className="max-w-2xl mx-auto pb-24 px-4">
        <Outlet/>
      </main>
      {!isOnboarding && <MobileNavBar/>}
    </div>
  );
}
