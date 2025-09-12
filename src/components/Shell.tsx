// src/components/Shell.tsx
import React from 'react'
import { Outlet, Link, useLocation } from 'react-router-dom'
import { Home, Bot, Settings, BarChart3 } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'; // Importăm uneltele pentru animație

// Definim animația
const pageVariants = {
  initial: { opacity: 0, y: 15 },
  in: { opacity: 1, y: 0 },
  out: { opacity: 0, y: -15 }
};

const pageTransition = {
  type: "tween",
  ease: "easeInOut",
  duration: 0.3
};

export default function Shell(){
  const loc = useLocation()
  return (
    <div className="min-h-screen bg-transparent text-text"> {/* Fundalul va fi cel din body */}
      <header className="sticky top-0 z-10 backdrop-blur bg-card/80 border-b border-border">
        <div className="max-w-screen-sm mx-auto px-4 py-3 flex items-center gap-3">
          <h1 className="text-lg font-bold">Mentor ANA</h1>
        </div>
      </header>
      <main className="max-w-screen-sm mx-auto px-4 py-4 overflow-x-hidden">
        {/* Învelim conținutul paginii în AnimatePresence pentru a detecta schimbările */}
        <AnimatePresence mode="wait">
          <motion.div
            key={loc.pathname} // Animația se re-declanșează când calea se schimbă
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
          >
            <Outlet/>
          </motion.div>
        </AnimatePresence>
      </main>
      <nav className="fixed bottom-0 inset-x-0 bg-card border-t border-border">
        <div className="max-w-screen-sm mx-auto px-2 py-1 grid grid-cols-4 gap-2 text-xs">
          <NavItem to="/" icon={<Home size={26}/>} active={loc.pathname==='/'} label="Hub"/>
          <NavItem to="/progress" icon={<BarChart3 size={26}/>} active={loc.pathname.startsWith('/progress')} label="Progres"/>
          <NavItem to="/mentor" icon={<Bot size={26}/>} active={loc.pathname.startsWith('/mentor')} label="Mentor"/>
          <NavItem to="/settings" icon={<Settings size={26}/>} active={loc.pathname.startsWith('/settings')} label="Setări"/>
        </div>
      </nav>
      <div className="h-16"></div>
    </div>
  )
}

function NavItem({to, icon, label, active}:{to:string, icon:React.ReactNode, label:string, active?:boolean}){
  return <Link to={to} className={"flex flex-col items-center justify-center rounded-xl py-2 "+(active?"text-primary":"text-muted")}>
    <div className="mb-0.5">{icon}</div>
    <div className="text-[11px]">{label}</div>
  </Link>
}