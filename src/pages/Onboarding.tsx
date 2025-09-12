import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import IconTile from '@/components/IconTile';
import { Shield, User, ArrowRight, ChevronsRight, Anchor, CheckCircle } from 'lucide-react';

type Step = 'category' | 'track' | 'branch';

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

    // Trecem la pasul următor
    if (key === 'category') setStep('track');
    if (key === 'track') setStep('branch');
    if (key === 'branch') {
        // Am terminat, salvăm și navigăm
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
            <IconTile icon={<Shield {...iconProps} />} title="Ofițeri" onClick={() => handleSelect('category', 'Ofițer')} />
            <IconTile icon={<User {...iconProps} />} title="Subofițeri" onClick={() => handleSelect('category', 'Subofițer')} />
          </>
        );
      case 'track':
        return (
          <>
             <h1 className="text-2xl font-bold text-center">Selectează filiera</h1>
             <p className="text-center text-gray-500 mb-6">Corp: {selection.category}</p>
             <IconTile icon={<ArrowRight {...iconProps} />} title="Filiera Directă" onClick={() => handleSelect('track', 'Directă')} />
             <IconTile icon={<ChevronsRight {...iconProps} />} title="Filiera Indirectă" onClick={() => handleSelect('track', 'Indirectă')} />
          </>
        );
      case 'branch':
        return (
            <>
                <h1 className="text-2xl font-bold text-center">Selectează arma</h1>
                <p className="text-center text-gray-500 mb-6">Corp: {selection.category}, Filiera: {selection.track}</p>
                {/* Momentan avem doar Intendență, dar poți adăuga ușor și altele */}
                <IconTile icon={<Anchor {...iconProps} />} title="Intendență" onClick={() => handleSelect('branch', 'Intendență')} />
                <IconTile icon={<CheckCircle {...iconProps} />} title="Altă Armă (Exemplu)" onClick={() => handleSelect('branch', 'Altă Armă')} />
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