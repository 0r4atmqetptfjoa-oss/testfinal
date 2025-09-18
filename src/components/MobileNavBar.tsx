
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Home, Settings, BarChart3, Bot } from "lucide-react";
import { branchSlug, getProfile } from "../lib/profile";

export default function MobileNavBar(){
  const nav = useNavigate(); const loc = useLocation();
  const p = getProfile(); const moduleRoute = p?.branch ? `/module/${branchSlug(p.branch)}` : "/home";
  // Afisăm doar patru elemente în bara de navigare: modul (acasă), Mentor AI, Dashboard și Setări.
  // Alte secțiuni, precum examenele, învățarea sau insignele, sunt accesibile direct din pagina modulului.
  const tabs = [
    { icon: <Home size={26}/>, label: "Acasă", route: moduleRoute },
    { icon: <Bot size={26}/>, label: "Mentor AI", route: "/mentor" },
    { icon: <BarChart3 size={26}/>, label: "Dashboard", route: "/dashboard" },
    { icon: <Settings size={26}/>, label: "Setări", route: "/settings" },
  ];
  return (
    <nav className="fixed bottom-0 left-0 right-0 border-t border-ui bg-black/80 backdrop-blur safe-bottom z-40">
      <div className="grid" style={{ gridTemplateColumns: `repeat(${tabs.length}, minmax(0, 1fr))` }}>
        {tabs.map(t => {
          const active = loc.pathname === '/' ? t.route === moduleRoute : loc.pathname.startsWith(t.route);
          return (
            <button
              key={t.route}
              onClick={() => nav(t.route)}
              className={`py-2 text-[11px] flex flex-col items-center transition-colors duration-200 ${active ? 'text-accent' : 'text-muted'}`}
            >
              <div className={`mb-1 ${active ? 'animate-bounce text-accent' : ''}`}>{t.icon}</div>
              {t.label}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
