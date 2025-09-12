import { db } from './firebase';
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import type { Item } from '@/lib/quizEngine';

// Definim tipurile de date pe care le vom folosi
export interface Summary {
  id: string;
  title: string;
  icon: string;
  content: string; // Conținutul va fi direct aici
}

interface UserSelection {
  category: string;
  track: string;
  branch: string;
}

/**
 * Construiește ID-ul documentului de specialitate pe baza selecției.
 */
function getSpecialtyDocId(selection: UserSelection): string {
  const normalizedBranch = selection.branch
    .toLowerCase()
    .replace(/ă/g, 'a').replace(/â/g, 'a').replace(/î/g, 'i').replace(/ș/g, 's').replace(/ț/g, 't')
    .replace(/\s*și\s*/g, '')
    .replace(/[\s-]+/g, '');
  
  return `${selection.category}_${selection.track}_${normalizedBranch}`;
}

/**
 * Încarcă întrebările de specialitate direct din Firestore.
 */
export const loadSpecialtyQuestions = async (): Promise<Item[]> => {
  const selectionString = localStorage.getItem('userSelection');
  if (!selectionString) return [];

  try {
    const selection: UserSelection = JSON.parse(selectionString);
    const docId = getSpecialtyDocId(selection);
    
    const questionsCollectionRef = collection(db, "specialties", docId, "questions");
    const querySnapshot = await getDocs(questionsCollectionRef);

    if (querySnapshot.empty) return [];

    return querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id } as Item));
  } catch (error) {
    console.error("Eroare la încărcarea întrebărilor din Firestore:", error);
    return [];
  }
};

/**
 * Încarcă rezumatele de studiu pentru specialitatea selectată.
 */
export const loadSpecialtySummaries = async (): Promise<Summary[]> => {
  const selectionString = localStorage.getItem('userSelection');
  if (!selectionString) return [];

  try {
    const selection: UserSelection = JSON.parse(selectionString);
    const docId = getSpecialtyDocId(selection);

    const summariesCollectionRef = collection(db, "specialties", docId, "summaries");
    const q = query(summariesCollectionRef, orderBy("title")); 
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) return [];
    
    return querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id } as Summary));
  } catch (error) {
    console.error("Eroare la încărcarea rezumatelor din Firestore:", error);
    return [];
  }
};