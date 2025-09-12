import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import IconTile from '@/components/IconTile';
import { 
    Shield, User, ArrowRight, ChevronsRight, Footprints, Search, LocateFixed, Construction, 
    Biohazard, Signal, UserCog, Plane, TowerControl, Rocket, Ship, Warehouse, Landmark, 
    Truck, Gavel, Building, Brain, Bike, Car, Archive, Database, Wrench, LucideIcon 
} from 'lucide-react';

type Step = 'category' | 'track' | 'branch';
type Category = 'ofiter' | 'subofiter';
type Track = 'directa' | 'indirecta';

// Structura de date cu toate armele si specialitățile
const branches: Record<Category, Record<Track, { name: string; icon: LucideIcon }>> = {
  ofiter: {
    directa: [
      { name: 'Infanterie', icon: Footprints },
      { name: 'Cercetare', icon: Search },
      { name: 'Artilerie și Rachete Terestre', icon: LocateFixed },
      { name: 'Geniu', icon: Construction },
      { name: 'Apărare CBRN', icon: Biohazard },
      { name: 'Aviație Piloți', icon: Plane },
      { name: 'Controlor Trafic Aerian', icon: TowerControl },
      { name: 'Rachete și Artilerie Antiaeriană', icon: Rocket },
      { name: 'Forțe Navale', icon: Ship },
      { name: 'Comunicații și Informatică', icon: Signal },
      { name: 'Intendență', icon: Warehouse },
      { name: 'Finanțe-Contabilitate', icon: Landmark },
      { name: 'Logistică', icon: Truck },
      { name: 'Poliție Militară', icon: UserCog },
    ],
    indirecta: [
      { name: 'Finanțe-Contabilitate', icon: Landmark },
      { name: 'Justiție Militară', icon: Gavel },
      { name: 'Construcții', icon: Building },
      { name: 'Psihologie', icon: Brain },
      { name: 'Intendență', icon: Warehouse },
      { name: 'Educație Fizică', icon: Bike },
      { name: 'Comunicații și Informatică', icon: Signal },
    ]
  },
  subofiter: {
    directa: [
        { name: 'Infanterie', icon: Footprints },
        { name: 'Auto', icon: Car },
        { name: 'Geniu', icon: Construction },
        { name: 'Apărare CBRN', icon: Biohazard },
        { name: 'Artilerie și Rachete', icon: LocateFixed },
        { name: 'Comunicații și Informatică', icon: Signal },
        { name: 'Aeronave și Motoare', icon: Wrench },
        { name: 'Forțe Navale', icon: Ship },
        { name: 'Logistică', icon: Truck },
    ],
    indirecta: [
      { name: 'Construcții', icon: Building },
      { name: 'Auto', icon: Car },
      { name: 'Geniu', icon: Construction },
      { name: 'Gestionar', icon: Archive },
      { name: 'Apărare CBRN', icon: Biohazard },
      { name: 'Infanterie', icon: Footprints },
      { name: 'Cercetare', icon: Search },
      { name: 'Artilerie și Rachete', icon: LocateFixed },
      { name: 'Informații Militare', icon: Database },
      { name: 'Poliție Militară', icon: UserCog },
    ]
  }
};


export default function Onboarding() {
  const nav = useNavigate();
  const iconProps = { size: 36, strokeWidth: 2.2 } as any;

  const [step, setStep] = useState<Step>('category');
  const [selection, setSelection] = useState({
    category: '',
    track: '',
    branch: ''
  });

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

  const renderStep = () => {
    switch (step) {
      case 'category':
        return (
          <>
            <h1 className="text-2xl font-bold text-center">Bun venit!</h1>
            <p className="text-center text-gray-500 mb-6">Selectează corpul de militari.</p>
            <IconTile icon={<Shield {...iconProps} />} title="Ofițeri" onClick={() => handleSelect('category', 'ofiter')} />
            <IconTile icon={<User {...iconProps} />} title="Subofițeri" onClick={() => handleSelect('category', 'subofiter')} />
          </>
        );
      case 'track':
        return (
          <>
             <h1 className="text-2xl font-bold text-center">Selectează filiera</h1>
             <p className="text-center text-gray-500 mb-6">Corp: {selection.category}</p>
             <IconTile icon={<ArrowRight {...iconProps} />} title="Filiera Directă" onClick={() => handleSelect('track', 'directa')} />
             <IconTile icon={<ChevronsRight {...iconProps} />} title="Filiera Indirectă" onClick={() => handleSelect('track', 'indirecta')} />
          </>
        );
      case 'branch':
        // Aici se afișează dinamic specialitățile
        const availableBranches = branches[selection.category as Category]?.[selection.track as Track] || [];
        return (
            <>
                <h1 className="text-2xl font-bold text-center">Selectează arma / specialitatea</h1>
                <p className="text-center text-gray-500 mb-6">Corp: {selection.category}, Filiera: {selection.track}</p>
                <div className="grid grid-cols-2 gap-3">
                    {availableBranches.map(branch => (
                        <IconTile 
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
  };
  
  return (
    <div className="p-4">
        <div className="space-y-3">
            {renderStep()}
        </div>
    </div>
  )
}