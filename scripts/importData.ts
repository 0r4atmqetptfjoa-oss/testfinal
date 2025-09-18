// =======================================================
// FILE: scripts/importData.ts
// A utility for seeding Firestore with data from the local
// JSON files. This script reads the JSON files from
// `public/data/v12` and uploads their contents into
// Firestore collections. To run this script, ensure you
// have created a Firebase service account key and placed
// it next to this file as `serviceAccountKey.json`. Run
// `ts-node scripts/importData.ts` or compile to JS.
// =======================================================

import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import * as fs from 'fs/promises';
import * as path from 'path';

// NOTE: Do not commit your service account key to source
// control. This import assumes that you have created
// `serviceAccountKey.json` via the Firebase console and
// saved it in the same directory as this script.
import serviceAccount from './serviceAccountKey.json' assert { type: 'json' };

// Initialize Firebase Admin with the service account
initializeApp({ credential: cert(serviceAccount as any) });

const db = getFirestore();

/**
 * Uploads an array of objects to the given collection. If
 * an item has an `id` property, it will be used as the
 * document ID; otherwise Firestore will generate one.
 */
async function uploadCollection(collectionName: string, data: any[]) {
  const collectionRef = db.collection(collectionName);
  const batch = db.batch();
  data.forEach((item) => {
    const docRef = item.id ? collectionRef.doc(item.id) : collectionRef.doc();
    batch.set(docRef, item);
  });
  await batch.commit();
  console.log(`✅ ${data.length} documente încărcate în colecția '${collectionName}'.`);
}

async function main() {
  console.log('🚀 Se pregătește încărcarea datelor în Firestore...');
  // Example: import legislation questions
  const legislationPath = path.resolve(__dirname, '../public/data/v12/legislation.json');
  const legislationJson = JSON.parse(await fs.readFile(legislationPath, 'utf-8'));
  if (legislationJson.questions) {
    await uploadCollection('questions_legislation', legislationJson.questions);
  }
  // You can add additional collections here, such as
  // specialties or learning content, by reading more
  // files and calling uploadCollection().
  console.log('✨ Operațiune finalizată!');
}

main().catch((err) => console.error(err));