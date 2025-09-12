import React, { useEffect, useState } from 'react';
import { useStore } from '@/store';
import { haptics } from '@/lib/haptics';
import { Volume2, VolumeX } from 'lucide-react';

type Counts = { legislation:number, logistics:number, psychology:number, englishTests:number };
type Scale = 1 | 1.1 | 1.2;

async function loadCounts(): Promise<Counts>{
  try{
    const [leg, log, psy, eng] = await Promise.all([
      fetch("/data/v12/legislation.json").then(r=>r.json()).catch(()=>({})),
      fetch("/data/v12/logistics.json").then(r=>r.json()).catch(()=>({})),
      fetch("/data/v12/psychology.json").then(r=>r.json()).catch(()=>({})),
      fetch("/data/v12/english.json").then(r=>r.json()).catch(()=>({})),
    ]);
    const cLeg = leg?.meta?.count ?? leg?.questions?.length ?? 0;
    const cLog = log?.meta?.count ?? log?.questions?.length ?? 0;
    const cPsy = psy?.meta?.count ?? psy?.questions?.length ?? 0;
    const cEng = eng?.meta?.testsCount ?? (eng?.tests?.length ?? 0);
    return { legislation:cLeg, logistics:cLog, psychology:cPsy, englishTests:cEng };
  }catch{ return { legislation:0, logistics:0, psychology:0, englishTests:0 }; }
}

const THEMES = [
  { id: 'light', label: 'Day' },
  { id: 'dark', label: 'Night' },
] as const;

export default function Settings(){
  const [counts, setCounts] = useState<Counts>({legislation:0, logistics:0, psychology:0, englishTests:0});
  useEffect(()=>{ loadCounts().then(setCounts) }, []);

  const { theme, setTheme, scale, setScale, haptics: appHaptics, setHaptics, soundEffects, setSoundEffects } = useStore();

  return (
    <div className="p-4 space-y-4">
      <section className="card">
        <h2 className="text-lg font-semibold mb-3">Temă vizuală</h2>
        <div className="flex gap-2">
          {THEMES.map(t => (
            <button key={t.id} onClick={() => setTheme(t.id)}
              className={`btn flex-1 ${theme === t.id ? 'btn-primary' : 'btn-ghost'}`}>
              {t.label}
            </button>
          ))}
        </div>
      </section>

      <section className="card">
        <h2 className="text-lg font-semibold mb-3">Preferințe</h2>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="font-medium">Efecte sonore</span>
            <button onClick={() => setSoundEffects(!soundEffects)} className="btn btn-ghost p-2 h-10 w-10">
              {soundEffects ? <Volume2 size={20}/> : <VolumeX size={20}/>}
            </button>
          </div>
          <div className="flex items-center justify-between">
            <span className="font-medium">Vibrații (Haptics)</span>
            <button onClick={() => { setHaptics(!appHaptics); if(!appHaptics) haptics.light(); }}
              className={`btn btn-ghost w-24 ${appHaptics ? 'text-primary' : ''}`}>
              {appHaptics ? 'Activat' : 'Inactiv'}
            </button>
          </div>
        </div>
      </section>

      <section className="card">
        <h2 className="text-lg font-semibold mb-3">Scală Text</h2>
        <div className="flex gap-2">
          {[1, 1.1, 1.2].map(s => (
            <button key={s} onClick={() => setScale(s as Scale)}
              className={`btn flex-1 ${scale === s ? 'btn-primary' : 'btn-ghost'}`}>
              {s * 100}%
            </button>
          ))}
        </div>
      </section>

      <section className="card">
        <h2 className="text-lg font-semibold mb-2">Statistici Date Locale</h2>
        <div className="text-sm text-muted space-y-1">
          <div>Legislație: {counts.legislation} întrebări</div>
          <div>Specialitate: {counts.logistics} întrebări</div>
          <div>Psihologie: {counts.psychology} întrebări</div>
          <div>Engleză: {counts.englishTests} teste</div>
        </div>
      </section>
    </div>
  );
}