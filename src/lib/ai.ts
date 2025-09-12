// src/lib/ai.ts
import { Item } from "@/lib/quizEngine";

// Funcție generică pentru a apela backend-ul nostru securizat
async function callSecureApi(body: Record<string, any>) {
  const res = await fetch('/.netlify/functions/gemini', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error || "A apărut o eroare la server.");
  }
  return data.text;
}

// --- FUNCȚIE NOUĂ PENTRU ÎNVĂȚARE ADAPTIVĂ ---
export async function aiAdaptiveNextQuestion(lastQuestion: Item | null, wasCorrect: boolean | null): Promise<Item> {
    // Încărcăm un set relevant de întrebări pe care AI-ul le poate folosi
    const leg = await fetch('/data/v12/legislation.json').then(r => r.json());
    const spec = await fetch('/data/v12/logistics.json').then(r => r.json());
    const allQuestions = [...(leg.questions || []), ...(spec.questions || [])];

    // Apelăm funcția serverless cu contextul necesar
    const resultText = await callSecureApi({ 
        action: 'adaptive', 
        lastQuestion, 
        wasCorrect, 
        // Trimitem un subset de întrebări pentru a nu depăși limita de input a modelului
        availableQuestions: allQuestions.filter(q => q.id !== lastQuestion?.id).slice(0, 50) 
    });
    try {
        // AI-ul ar trebui să returneze un JSON valid, pe care îl parsăm
        return JSON.parse(resultText);
    } catch (e) {
        console.error("AI-ul a returnat un JSON invalid pentru întrebarea adaptivă:", resultText);
        // Ca măsură de siguranță, dacă AI-ul eșuează, returnăm o întrebare aleatorie
        return allQuestions[Math.floor(Math.random() * allQuestions.length)];
    }
}

// --- RESTUL FUNCȚIILOR EXISTENTE ---
export async function aiMentorChat(question: string) {
  return callSecureApi({ action: 'mentor', text: question });
}

export async function aiSummarize(text: string) {
  return callSecureApi({ action: 'summarize', text });
}

export async function aiExplain(text: string) {
  return callSecureApi({ action: 'explain', text });
}

export async function aiQuiz(text: string, n: number = 5) {
  const result = await callSecureApi({ action: 'quiz', text, n });
  try {
    const jsonStart = result.indexOf("[");
    const jsonEnd = result.lastIndexOf("]") + 1;
    return JSON.parse(result.slice(jsonStart, jsonEnd));
  } catch (e) {
    console.error("Eroare la parsarea JSON de la quiz:", result);
    return [{ question: "Eroare de formatare de la AI", choices: [], answer: '', why: '' }];
  }
}

export async function aiFlashcards(text: string, n: number = 10) {
  const result = await callSecureApi({ action: 'flashcards', text, n });
   try {
    const jsonStart = result.indexOf("[");
    const jsonEnd = result.lastIndexOf("]") + 1;
    return JSON.parse(result.slice(jsonStart, jsonEnd));
  } catch (e) {
    console.error("Eroare la parsarea JSON de la flashcards:", result);
    return [{ front: "Eroare", back: "Verifică consola serverului." }];
  }
}

export async function aiAsk(text: string, question: string) {
  return callSecureApi({ action: 'ask', text, question });
}