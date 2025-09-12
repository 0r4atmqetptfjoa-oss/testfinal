// scripts/importData.ts
import * as admin from 'firebase-admin';
import * as fs from 'fs';
import * as path from 'path';

// --- PASUL 1: CONFIGURAREA ---
// Descarcă cheia privată din Firebase și pune-o în folderul 'scripts'
// Vezi instrucțiunile de sub acest bloc de cod!
import serviceAccount from './serviceAccountKey.json' with { type: 'json' };
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();
const specialtiesDir = path.resolve(__dirname, '../public/data/specialties');

// --- PASUL 2: FUNCȚIA DE IMPORT ---
async function importData() {
  console.log('Încep operațiunea de import în Firestore...');

  try {
    const files = fs.readdirSync(specialtiesDir);

    for (const file of files) {
      if (path.extname(file) === '.json') {
        const filePath = path.join(specialtiesDir, file);
        const fileContent = fs.readFileSync(filePath, 'utf-8');
        const data = JSON.parse(fileContent);

        // Extragem detaliile din numele fișierului
        const [category, track, ...branchParts] = file.replace('.json', '').split('_');
        const branch = branchParts.join(' '); // Refacem numele specialității dacă are spații

        // Creăm un ID unic pentru document
        const docId = `${category}_${track}_${branchParts.join('')}`;
        
        console.log(`Procesez: ${file} -> Document ID: ${docId}`);

        const specialtyRef = db.collection('specialties').doc(docId);

        // Setăm datele principale ale specialității
        await specialtyRef.set({
          category: category,
          track: track,
          branch: branch,
          lastUpdated: new Date()
        });

        // Adăugăm întrebările în sub-colecția 'questions'
        if (data.questions && Array.isArray(data.questions)) {
          const questionsCollection = specialtyRef.collection('questions');
          for (const question of data.questions) {
            // Adăugăm fiecare întrebare ca un document separat
            await questionsCollection.add(question);
          }
          console.log(`> Am adăugat ${data.questions.length} întrebări pentru ${branch}.`);
        }

        // Aici vom adăuga logica pentru rezumate (summaries) în viitor
      }
    }
    console.log('Operațiunea de import a fost finalizată cu succes!');
  } catch (error) {
    console.error('Eroare critică în timpul importului:', error);
  }
}

// --- PASUL 3: RULAREA SCRIPTULUI ---
importData();