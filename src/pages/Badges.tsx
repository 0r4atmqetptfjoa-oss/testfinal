import React from "react";
import usePageTitle from '@/hooks/usePageTitle';
import { loadGame, BADGES } from "@/lib/game";

/**
 * Badges page – afișează toate insignele posibile și starea lor (deblocat sau nu).
 * Utilizează structurile definite în lib/game.ts pentru a obține insignele câștigate.
 */
export default function Badges(){
  // Set page title
  usePageTitle('Insigne');
  const game = loadGame();
  return (
    <div className="min-h-screen bg-black text-gray-200 p-4 max-w-2xl mx-auto pb-24 space-y-4">
      <h1 className="text-2xl font-bold">Insigne</h1>
      <p className="text-sm text-muted">Câștigă XP și finalizează teste pentru a debloca insigne!</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {Object.values(BADGES).map(b => {
          const unlocked = game.badges.includes(b.id);
          return (
            <div key={b.id} className={`rounded-2xl border p-4 flex items-center gap-4 ${unlocked ? 'border-accent bg-green-600/10' : 'border-ui bg-card'}`}>
              <span className="text-3xl">{b.icon}</span>
              <div className="flex-1">
                <div className="font-semibold">{b.title}</div>
                <div className="text-xs text-muted">{b.desc}</div>
                {!unlocked && <div className="text-[10px] text-yellow-500 mt-1">Neobținut</div>}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}