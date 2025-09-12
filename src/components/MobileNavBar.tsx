
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Home, BookOpen, Shield, User } from "lucide-react";

const TABS = [
  { icon: <Home size={18}/>, label: "Acasă", route: "/home" },
  { icon: <BookOpen size={18}/>, label: "Învățare", route: "/learning" },
  { icon: <Shield size={18}/>, label: "Examen", route: "/exam" },
  { icon: <User size={18}/>, label: "Profil", route: "/progress" },
];

export default function MobileNavBar(){
  const nav = useNavigate();
  const loc = useLocation();
  return (
    <nav className="fixed bottom-0 left-0 right-0 border-t border-gray-800 bg-black/80 backdrop-blur safe-bottom z-40">
      <div className="grid grid-cols-4">
        {TABS.map(t => {
          const active = loc.pathname.startsWith(t.route);
          return (
            <button key={t.route}
              onClick={()=> nav(t.route)}
              className={`py-2 text-xs flex flex-col items-center ${active ? "text-[color:var(--accent)]" : "text-gray-500"}`}
            >
              <div className={`mb-1 ${active ? "text-[color:var(--accent)]" : ""}`}>{t.icon}</div>
              {t.label}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
