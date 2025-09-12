import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Shield, User, ArrowRight, ChevronsRight, Footprints, Search, LocateFixed, Construction,
    Biohazard, Signal, UserCog, Plane, TowerControl, Rocket, Ship, Warehouse, Landmark,
    Truck, Gavel, Building, Brain, Bike, Car, Archive, Database, Wrench, LucideIcon
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// --- Componenta UI reutilizabilă pentru cardurile de selecție ---
interface SelectionCardProps {
  icon: React.ReactNode;
  title: string;
  onClick: () => void;
}

function SelectionCard({ icon, title, onClick }: SelectionCardProps) {
  return (
    <motion.button
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="w-full p-4 bg-gray-900 rounded-lg flex items-center gap-4 text-left border border-gray-700 hover:border-violet-500 transition-colors"
    >
      <div className="bg-gray-800 p-3 rounded-lg">
        {icon}
      </div>
      <div>
        <p className="font-semibold text-lg text-gray-200">{title}</p>
      </div>
    </motion.button>
  );
}

// --- Structura de date cu toate armele și specialitățile ---
type Step = 'category' | 'track' | 'branch';
type Category = 'ofiter' | 'subofiter';
type Track = 'directa' | 'indirecta';

const branches: Record<Category, Record<Track, { name: string; icon: LucideIcon }>> = {
  ofiter: {
    directa: [
      { name: 'Infanterie', icon: Footprints }, { name: 'Cercetare', icon: Search },
      { name: 'Artilerie și Rachete Terestre', icon: LocateFixed }, { name: 'Geniu', icon: Construction },
      { name: 'Apărare CBRN', icon: Biohazard }, { name: 'Aviație Piloți', icon: Plane },
      { name: 'Controlor Trafic Aerian', icon: TowerControl }, { name: 'Rachete și Artilerie Antiaeriană', icon: Rocket },
      { name: 'Forțe Navale', icon: Ship }, { name: 'Comunicații și Informatică', icon: Signal },
      { name: 'Intendență', icon: Warehouse }, { name: 'Finanțe-Contabilitate', icon: Landmark },
      { name: 'Logistică', icon: Truck }, { name: 'Poliție Militară', icon: UserCog },
    ],
    indirecta: [
      { name: 'Finanțe-Contabilitate', icon: Landmark }, { name: 'Justiție Militară', icon: Gavel },
      { name: 'Construcții', icon: Building }, { name: 'Psihologie', icon: Brain },
      { name: 'Intendență', icon: Warehouse }, { name: 'Educație Fizică', icon: Bike },
      { name: 'Comunicații și Informatică', icon: Signal },
    ]
  },
  subofiter: {
    directa: [
        { name: 'Infanterie', icon: Footprints }, { name: 'Auto', icon: Car },
        { name: 'Geniu', icon: Construction }, { name: 'Apărare CBRN', icon: Biohazard },
        { name: 'Artilerie și Rachete', icon: LocateFixed }, { name: 'Comunicații și Informatică', icon: Signal },
        { name: 'Aeronave și Motoare', icon: Wrench }, { name: 'Forțe Navale', icon: Ship },
        { name: 'Logistică', icon: Truck },
    ],
    indirecta: [
      { name: 'Construcții', icon: Building }, { name: 'Auto', icon: Car },
      { name: 'Geniu', icon: Construction }, { name: 'Gestionar', icon: Archive },
      { name: 'Apărare CBRN', icon: Biohazard }, { name: 'Infanterie', icon: Footprints },
      { name: 'Cercetare', icon: Search }, { name: 'Artilerie și Rachete', icon: LocateFixed },
      { name: 'Informații Militare', icon: Database }, { name: 'Poliție Militară', icon: UserCog },
    ]
  }
};

// --- Componenta principală Onboarding ---
export default function Onboarding() {
  const nav = useNavigate();
  const iconProps = { size: 28, className: "text-violet-400" };

  const [step, setStep] = useState<Step>('category');
  const [selection, setSelection] = useState({ category: '', track: '', branch: '' });

  const handleSelect = (key: keyof typeof selection, value: string) => {
    const newSelection = { ...selection, [key]: value };
    setSelection(newSelection);

    if (key === 'category') setStep('track');
    if (key === 'track') setStep('branch');
    if (key === 'branch') {
        localStorage.setItem('userSelection', JSON.stringify(newSelection));
        nav('/home');
    }
  };

  const renderStepContent = () => {
    switch (step) {
      case 'category':
        return (
          <>
            <h1 className="text-3xl font-bold text-gray-100">Bun venit!</h1>
            <p className="text-gray-400">Selectează corpul de militari pentru care te pregătești.</p>
            <div className="space-y-3 pt-4">
              <SelectionCard icon={<Shield {...iconProps} />} title="Ofițeri" onClick={() => handleSelect('category', 'ofiter')} />
              <SelectionCard icon={<User {...iconProps} />} title="Subofițeri" onClick={() => handleSelect('category', 'subofiter')} />
            </div>
          </>
        );
      case 'track':
        return (
          <>
            <h1 className="text-3xl font-bold text-gray-100">Alege filiera</h1>
            <p className="text-gray-400">Pregătirea se face prin filieră directă sau indirectă.</p>
            <div className="space-y-3 pt-4">
              <SelectionCard icon={<ArrowRight {...iconProps} />} title="Filiera Directă" onClick={() => handleSelect('track', 'directa')} />
              <SelectionCard icon={<ChevronsRight {...iconProps} />} title="Filiera Indirectă" onClick={() => handleSelect('track', 'indirecta')} />
            </div>
          </>
        );
      case 'branch':
        const availableBranches = branches[selection.category as Category]?.[selection.track as Track] || [];
        return (
            <>
                <h1 className="text-3xl font-bold text-gray-100">Alege specialitatea</h1>
                <p className="text-gray-400">Selectează arma pentru care candidezi.</p>
                <div className="space-y-3 pt-4">
                    {availableBranches.map(branch => (
                        <SelectionCard
                            key={branch.name}
                            icon={React.createElement(branch.icon, iconProps)}
                            title={branch.name}
                            onClick={() => handleSelect('branch', branch.name)}
                        />
                    ))}
                </div>
            </>
        );
      default:
        return null;
    }
  }
  
  return (
    <div className="p-4 flex flex-col items-center justify-center min-h-screen text-center">
        <AnimatePresence mode="wait">
            <motion.div
                key={step}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
                className="w-full max-w-md space-y-2"
            >
                {renderStepContent()}
            </motion.div>
        </AnimatePresence>
    </div>
  )
}