// src/lib/contentLoader.ts

// ATENȚIE: Asigură-te că tipul 'Item' este importat corect.
// S-ar putea să fie nevoie să ajustezi calea în funcție de structura ta.
import { type Item } from '@/lib/quizEngine'; 

// O interfață simplă pentru selecția utilizatorului
interface UserSelection {
  category: string;
  track: string;
  branch: string;
}

/**
 * Construiește calea către fișierul JSON pe baza selecției utilizatorului.
 */
function getQuestionFilePath(selection: UserSelection): string {
  const normalizedBranch = selection.branch
    .toLowerCase()
    .replace(/ă/g, 'a').replace(/â/g, 'a').replace(/î/g, 'i').replace(/ș/g, 's').replace(/ț/g, 't')
    .replace(/\s*și\s*/g, '') // Elimină "și" și spațiile din jur
    .replace(/[\s-]+/g, '');   // Elimină spațiile și cratimele

  const fileName = `${selection.category}_${selection.track}_${normalizedBranch}.json`;
  
  // Calea către noua noastră "arhivă de informații"
  return `/data/specialties/${fileName}`; 
}

/**
 * Încarcă întrebările de specialitate pe baza selecției utilizatorului.
 */
export const loadSpecialtyQuestions = async (): Promise<Item[]> => {
  const selectionString = localStorage.getItem('userSelection');
  if (!selectionString) {
    console.error("Nicio selecție a utilizatorului nu a fost găsită.");
    return [];
  }

  try {
    const selection: UserSelection = JSON.parse(selectionString);
    const filePath = getQuestionFilePath(selection);
    
    console.log(`Solicitare de încărcare a informațiilor de la: ${filePath}`);
    
    const response = await fetch(filePath);
    if (!response.ok) {
      throw new Error(`Raport de eroare de la server: ${response.statusText}`);
    }
    
    const data = await response.json();
    // Presupunem că fișierele JSON au un array numit "questions"
    return data.questions || []; 
  } catch (error) {
    console.error("Misiune eșuată! Eroare la încărcarea testelor de specialitate:", error);
    return [];
  }
};