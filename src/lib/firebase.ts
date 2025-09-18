import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// --- ADAUGĂ CONFIGURAREA FIREBASE AICI ---
// Acesta este același obiect 'firebaseConfig' pe care l-ai salvat anterior.
const firebaseConfig = {
    // !!! ÎNLOCUIEȘTE COMPLET ACEST OBIECT CU 'firebaseConfig' AL TĂU !!!
    // Asigură-te că lipești aici cheile tale reale de la Firebase.
     apiKey: "AIzaSyCbx6Ce5PTs_Np3_b04LiT_5IAzlA-l0dQ",
  authDomain: "testfinal-razvan.firebaseapp.com",
  projectId: "testfinal-razvan",
  storageBucket: "testfinal-razvan.firebasestorage.app",
  messagingSenderId: "343403548490",
  appId: "1:343403548490:web:3f4b9e5731dc50d702fbb3"
};

// Inițializăm aplicația Firebase
// Exportăm și aplicația pentru ca modulele de autentificare
// să poată folosi același context Firebase. Dacă ai deja o
// aplicație existentă pe pagina web, initializeApp va returna
// aceeași instanță.
export const app = initializeApp(firebaseConfig);

// Exportăm instanța bazei de date pentru a o folosi în alte părți ale aplicației
export const db = getFirestore(app);