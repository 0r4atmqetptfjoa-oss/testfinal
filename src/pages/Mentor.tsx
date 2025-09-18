import React, { useState } from "react";
import usePageTitle from '@/hooks/usePageTitle';
// import decorative AI image for mentor header
import aiBrain from "@/assets/images/ai_brain.png";

type Msg = { id: string; user: "me"|"ai"; text: string };

export default function Mentor(){
  const [q, setQ] = useState("");
  const [msgs, setMsgs] = useState<Msg[]>([
    { id: "1", user: "ai", text: "Salut! Sunt Mentorul tău. Întreabă-mă orice despre tematică, examene sau tactică." }
  ]);

  const send = () => {
    if(!q.trim()) return;
    const me: Msg = { id: String(Date.now()), user:"me", text: q.trim() };
    setMsgs(m=> [...m, me, { id: String(Date.now()+1), user:"ai", text: "Răspuns demo — integrează backend/LLM aici." }]);
    setQ("");
  };

  // Set page title
  usePageTitle('Mentor AI');

  return (
    <main className="min-h-screen bg-black text-gray-200 p-4 max-w-2xl mx-auto pb-28">
      {/* Decorative header for Mentor AI */}
      <div className="mb-4">
        <img src={aiBrain} alt="AI Mentor" className="w-full h-40 object-cover rounded-xl shadow-md" />
      </div>
      <div className="space-y-3">
        {msgs.map((m) => (
          <div
            key={m.id}
            className={
              "w-full flex " + (m.user === 'me' ? 'justify-end' : 'justify-start')
            }
          >
            <div
              className={
                (m.user === 'me'
                  ? 'bg-violet-600 text-white'
                  : 'bg-gray-900 text-gray-200 border border-gray-800') +
                ' max-w-[85%] rounded-2xl px-3 py-2 whitespace-pre-wrap'
              }
            >
              {m.text}
            </div>
          </div>
        ))}
      </div>

      <div className="fixed left-0 right-0 bottom-16 mx-auto max-w-2xl p-3">
        <div className="rounded-2xl border border-gray-800 bg-gray-900 flex gap-2 px-3 py-2">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Scrie o întrebare..."
            className="bg-transparent outline-none flex-1"
          />
          <button className="btn btn-primary" onClick={send}>
            Trimite
          </button>
        </div>
      </div>
    </main>
  );
}
