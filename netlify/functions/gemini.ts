// netlify/functions/gemini.ts
import type { Handler } from "@netlify/functions";

const GEMINI_KEY = process.env.GEMINI_API_KEY;
const API_BASE = "https://generativelanguage.googleapis.com/v1beta";

async function callGemini(model: string, system: string, user: string) {
  if (!GEMINI_KEY) throw new Error("Cheia API pentru Gemini nu este configurată pe server.");
  
  const url = `${API_BASE}/models/${model}:generateContent?key=${GEMINI_KEY}`;
  const body = {
    contents: [{ role: "user", parts: [{ text: user }] }],
    systemInstruction: { role: "system", parts: [{ text: system }] },
    generationConfig: { temperature: 0.5, topP: 0.9, maxOutputTokens: 2048 },
    safetySettings: [ { category: "HARM_CATEGORY_HARASSMENT", threshold: "BLOCK_NONE" }, { category: "HARM_CATEGORY_HATE_SPEECH", threshold: "BLOCK_NONE" }, { category: "HARM_CATEGORY_SEXUALLY_EXPLICIT", threshold: "BLOCK_NONE" }, { category: "HARM_CATEGORY_DANGEROUS_CONTENT", threshold: "BLOCK_NONE" } ]
  };

  const res = await fetch(url, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
  if (!res.ok) throw new Error(`Eroare API Gemini ${res.status}: ${await res.text()}`);
  const data = await res.json();
  return data?.candidates?.[0]?.content?.parts?.[0]?.text ?? "";
}

const SYSTEM_PROMPTS = {
  mentor: `Ești "Mentor", un asistent AI prietenos, specializat în pregătirea candidaților pentru admiterea la școlile militare din România...`,
  summarize: "Ești un asistent de învățare precis...",
  explain: "Ești un mentor prietenos. Explică pe scurt...",
  quiz: "Generează întrebări grilă dificile... Returnează un array JSON valid...",
  flashcards: "Extrage concepte cheie... Returnează un array JSON valid...",
  ask: "Răspunde la întrebare strict pe baza textului oferit...",
  adaptive: `Ești un tutore AI pentru admiterea la școlile militare. Rolul tău este să alegi cea mai bună întrebare pentru a ajuta utilizatorul să învețe. Primești ca input ultima întrebare la care a răspuns utilizatorul și dacă a răspuns corect sau greșit. Primești și o listă de întrebări disponibile. **Logica ta:** Dacă utilizatorul a răspuns GREȘIT, alege o altă întrebare din ACEEAȘI categorie/subiect. Dacă a răspuns CORECT, alege o întrebare dintr-o categorie DIFERITĂ. Dacă este prima întrebare (input-ul este null), alege o întrebare de dificultate medie. **Output:** Răspunde DOAR cu obiectul JSON al întrebării alese, fără alte explicații sau text.`,
};

export const handler: Handler = async (event) => {
  if (event.httpMethod !== "POST") return { statusCode: 405, body: "Metodă nepermisă" };

  try {
    const { action, ...payload } = JSON.parse(event.body || "{}");
    if (!action || !SYSTEM_PROMPTS[action]) return { statusCode: 400, body: "Acțiune invalidă." };

    let userPrompt;
    if (action === 'adaptive') {
      const { lastQuestion, wasCorrect, availableQuestions } = payload;
      userPrompt = `Ultima întrebare: ${JSON.stringify(lastQuestion)}. Răspuns corect: ${wasCorrect}. Alege următoarea întrebare din lista: ${JSON.stringify(availableQuestions)}`;
    } else {
      const { text, question, n } = payload;
      userPrompt = text;
      if(action === 'ask') userPrompt = `Context:\n${text}\n\nÎntrebare:\n${question}`;
      if(action === 'quiz' || action === 'flashcards') userPrompt = `Text:\n${text}\n\nCreează ${n || 5} itemi.`;
    }

    const result = await callGemini("gemini-1.5-flash-latest", SYSTEM_PROMPTS[action], userPrompt);
    
    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: result.trim() }),
    };
  } catch (e: any) {
    return { statusCode: 500, body: JSON.stringify({ error: e.message }) };
  }
};