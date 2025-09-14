
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Home, BookOpen, Shield, Settings, LayoutGrid } from "lucide-react";
import { branchSlug, getProfile } from "../lib/profile";

export default function MobileNavBar(){
  const nav = useNavigate();
  const loc = useLocation();
  const p = getProfile();
  const moduleRoute = p?.branch ? `/module/${branchSlug(p.branch)}` : "/home";
  const tabs = [
    { icon: <LayoutGrid size={18}/>, label: "Hub", route: "/hub" },
    { icon: <Home size={18}/>, label: "Acasă", route: moduleRoute },
    { icon: <BookOpen size={18}/>, label: "Învățare", route: "/learning" },
    { icon: <Shield size={18}/>, label: "Examen", route: "/exam" },
    { icon: <Settings size={18}/>, label: "Setări", route: "/settings" },
  ];
  return (
    <nav className="fixed bottom-0 left-0 right-0 border-t border-ui bg-black/80 backdrop-blur safe-bottom z-40">
      <div className="grid grid-cols-5">
        {tabs.map(t => {
          const active = loc.pathname.startsWith(t.route);
          return (
            <button key={t.route}
              onClick={()=> nav(t.route)}
              className={`py-2 text-[11px] flex flex-col items-center ${active ? "text-accent" : "text-muted"}`}
            >
              <div className={`mb-1 ${active ? "text-accent" : ""}`}>{t.icon}</div>
              {t.label}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
