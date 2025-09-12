import { Question } from '../public/data/v12/types';

// O interfață simplă pentru selecția utilizatorului
interface UserSelection {
  category: string;
  track: string;
  branch: string;
}

/**
 * Construiește calea către fișierul JSON pe baza selecției utilizatorului.
 * Numele fișierului este normalizat (litere mici, fără diacritice, spații înlocuite cu '_').
 * @param selection - Obiectul cu selecția utilizatorului.
 * @returns Calea către fișierul JSON relevant.
 */
function getQuestionFilePath(selection: UserSelection): string {
  // Normalizăm numele pentru a corespunde cu denumirea fișierelor
  // Asigură-te că numele generate aici corespund exact cu numele fișierelor tale JSON
  const normalizedBranch = selection.branch
    .toLowerCase()
    .replace(/ă/g, 'a').replace(/â/g, 'a').replace(/î/g, 'i').replace(/ș/g, 's').replace(/ț/g, 't')
    .replace(/\s+/g, '').replace(/și/g, ''); // Am scos spatiile si "si" pentru a se potrivi cu "comunicatiisiiinformatica"

  const fileName = `${selection.category}_${selection.track}_${normalizedBranch}.json`;
  
  // IMPORTANT: Asigură-te că acest folder este corect!
  return `/data/specialties/${fileName}`; 
}

/**
 * Încarcă întrebările de specialitate pe baza selecției utilizatorului.
 * @returns Un array de întrebări sau un array gol în caz de eroare.
 */
export const loadSpecialtyQuestions = async (): Promise<Question[]> => {
  const selectionString = localStorage.getItem('userSelection');
  if (!selectionString) {
    console.error("Nicio selecție a utilizatorului nu a fost găsită.");
    return [];
  }

  try {
    const selection: UserSelection = JSON.parse(selectionString);
    const filePath = getQuestionFilePath(selection);
    
    console.log(`Încerc să încarc întrebări de la: ${filePath}`);
    
    const response = await fetch(filePath);
    if (!response.ok) {
      throw new Error(`Fișierul de date nu a putut fi încărcat: ${response.statusText}`);
    }
    
    const data: Question[] = await response.json();
    return data;
  } catch (error) {
    console.error("Eroare la încărcarea întrebărilor de specialitate:", error);
    // Poți afișa un mesaj de eroare utilizatorului aici
    return [];
  }
};