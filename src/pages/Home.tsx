import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import IconTile from '@/components/IconTile'
import { BookOpen, Globe, Shield, Library, Brain, Activity, Play, BrainCircuit } from 'lucide-react'

export default function Home(){
  const nav = useNavigate()
  const iconProps = { size: 36, strokeWidth: 2.2 } as any
  const [h, setH] = useState<number>(140)
  const [selection, setSelection] = useState<any>(null);

  useEffect(() => {
    // Citim selecția din localStorage
    const userSelection = localStorage.getItem('userSelection');
    if (userSelection) {
      setSelection(JSON.parse(userSelection));
    } else {
      // Dacă nu există nicio selecție, trimitem utilizatorul înapoi la început (Onboarding)
      nav('/');
    }
  }, [nav]);

  useEffect(()=>{
    function recalc(){
      const header = (document.querySelector('header') as HTMLElement)?.offsetHeight || 56
      const navH = (document.querySelector('nav') as HTMLElement)?.offsetHeight || 64
      const padding = 16*2
      const gap = 12
      const count = 7
      const free = window.innerHeight - header - navH - padding - (gap*(count-1))
      const tile = Math.max(96, Math.floor(free / count))
      setH(tile)
    }
    recalc()
    window.addEventListener('resize', recalc)
    return ()=> window.removeEventListener('resize', recalc)
  }, [])

  return (
    <div className="space-y-3">
        {selection && (
            <div className="p-4 bg-gray-100 rounded-lg text-center mb-4">
                <p className="font-semibold">Modul tău de pregătire:</p>
                <p className="text-sm">{selection.category} / Filiera {selection.track} / {selection.branch}</p>
            </div>
        )}
      <div className="grid grid-cols-1 gap-3">
        <IconTile icon={<BrainCircuit {...iconProps}/>} title="Antrenament Inteligent" subtitle="Sesiune de învățare adaptivă, ghidată de AI" onClick={()=>nav('/adaptive-learning')} gradient="from-cyan-400/20 to-blue-400/10" style={{height:h}}/>
        {/* ... restul componentelor IconTile ... */}
        <IconTile icon={<BookOpen {...iconProps}/>} title="Mod învățare" subtitle="Rezumate și tematica completă" onClick={()=>nav('/learning')} style={{height:h}}/>
        <IconTile icon={<Globe {...iconProps}/>} title="Teste Engleză" subtitle="Exersează cu teste dedicate" onClick={()=>nav('/english')} gradient="from-emerald-400/25 to-cyan-400/15" style={{height:h}}/>
        <IconTile icon={<Shield {...iconProps}/>} title="Simulare Examen" subtitle="30 legislație + 60 specialitate" onClick={()=>nav('/exam')} gradient="from-lime-400/25 to-amber-300/15" style={{height:h}}/>
        <IconTile icon={<Library {...iconProps}/>} title="Teste Generale" subtitle="Filtre pe module și număr de itemi" onClick={()=>nav('/all-tests')} gradient="from-sky-400/20 to-indigo-400/10" style={{height:h}}/>
        <IconTile icon={<Brain {...iconProps}/>} title="Evaluare Psihologică" subtitle="Cognitive, Situațional, Personalitate" onClick={()=>nav('/psychology')} gradient="from-pink-400/20 to-purple-400/10" style={{height:h}}/>
        <IconTile icon={<Activity {...iconProps}/>} title="Pregătire Fizică" subtitle="Cronometru & GPS pentru proba de 2km" onClick={()=>nav('/fitness')} gradient="from-rose-400/20 to-orange-400/10" style={{height:h}} quickAction={<button onClick={(e)=>{e.stopPropagation(); nav('/fitness')}} className='rounded-full bg-primary text-white px-3 py-2 flex items-center gap-1 text-xs shadow'><Play size={14}/> Start</button>}/>
      </div>
    </div>
  )
}