import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ListRow from '@/components/ListRow';
import { BookOpen, Globe, Shield, Library, Brain, Activity, BrainCircuit } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Home() {
  const nav = useNavigate();
  const [selection, setSelection] = useState<any>(null);

  useEffect(() => {
    const userSelection = localStorage.getItem('userSelection');
    if (userSelection) {
      setSelection(JSON.parse(userSelection));
    } else {
      nav('/');
    }
  }, [nav]);
  
  const iconProps = { size: 24, className: "text-violet-400" };

  const modules = [
    { to: '/learning', icon: <BookOpen {...iconProps} />, title: 'Mod Învățare', subtitle: 'Tematică și rezumate' },
    { to: '/adaptive-learning', icon: <BrainCircuit {...iconProps} />, title: 'Antrenament Inteligent', subtitle: 'Sesiune de învățare adaptivă' },
    { to: '/exam', icon: <Shield {...iconProps} />, title: 'Simulare Examen', subtitle: 'Testează-ți cunoștințele' },
    { to: '/all-tests', icon: <Library {...iconProps} />, title: 'Teste Generale', subtitle: 'Exersează pe module' },
    { to: '/english', icon: <Globe {...iconProps} />, title: 'Teste Engleză', subtitle: 'Îmbunătățește-ți vocabularul' },
    { to: '/psychology', icon: <Brain {...iconProps} />, title: 'Evaluare Psihologică', subtitle: 'Teste de perspicacitate' },
    { to: '/fitness', icon: <Activity {...iconProps} />, title: 'Pregătire Fizică', subtitle: 'Monitorizează-ți performanța' },
  ];

  return (
    <div className="p-4 space-y-6">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-bold text-gray-100">Salut, Aspirant!</h1>
        {selection && (
          <p className="text-gray-400 mt-1">Modul tău activ: <span className="font-semibold text-violet-400">{selection.branch}</span></p>
        )}
      </motion.div>

      <div className="space-y-3">
        {modules.map((mod, index) => (
          <ListRow 
            key={mod.to}
            to={mod.to}
            icon={mod.icon}
            title={mod.title}
            subtitle={mod.subtitle}
            delay={0.1 * index}
          />
        ))}
      </div>
    </div>
  );
}