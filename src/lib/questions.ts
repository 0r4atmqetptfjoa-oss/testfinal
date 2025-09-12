import type { Item } from '@/lib/quizEngine';

// Cache simplu pentru a nu reîncărca fișierele de fiecare dată
let legislationCache: Item[] | null = null;
let englishCache: Item[] | null = null;
let psychologyCache: Item[] | null = null;

/**
 * O funcție generală pentru a încărca un fișier JSON de întrebări și a-l salva în cache.
 */
async function fetchQuestions(filePath: string, cache: Item[] | null): Promise<Item[]> {
    if (cache) {
        return cache;
    }
    try {
        const response = await fetch(filePath);
        if (!response.ok) {
            throw new Error(`Eroare la încărcarea fișierului: ${filePath}`);
        }
        const data = await response.json();
        const questions: Item[] = data.questions || [];
        return questions;
    } catch (error) {
        console.error(`Nu am putut încărca întrebările de la ${filePath}:`, error);
        return [];
    }
}

// Exportăm funcțiile de care paginile noastre au nevoie

export const getLegislationQuestions = async (): Promise<Item[]> => {
    if (!legislationCache) {
        legislationCache = await fetchQuestions('/data/v12/legislation.json', legislationCache);
    }
    return legislationCache;
};

export const getEnglishQuestions = async (): Promise<Item[]> => {
    if (!englishCache) {
        englishCache = await fetchQuestions('/data/v12/english.json', englishCache);
    }
    return englishCache;
};

export const getPsychologyQuestions = async (): Promise<Item[]> => {
    if (!psychologyCache) {
        psychologyCache = await fetchQuestions('/data/v12/psychology.json', psychologyCache);
    }
    return psychologyCache;
};