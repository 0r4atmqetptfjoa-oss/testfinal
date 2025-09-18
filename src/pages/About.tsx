import React from "react";
import usePageTitle from '@/hooks/usePageTitle';

/**
 * Pagina Despre – descrie scopul și structura aplicației Mentor ANA.
 * Este destinată utilizatorilor finali care doresc să înțeleagă rapid ce oferă aplicația
 * și cum sunt structurate modulele. Informațiile sunt prezentate într‑un limbaj accesibil.
 */
export default function About() {
  // Set page title
  usePageTitle('Despre Mentor ANA');
  return (
    <div className="min-h-screen bg-black text-gray-200 p-4 max-w-2xl mx-auto pb-24 space-y-6">
      <h1 className="text-2xl font-bold">Despre Mentor ANA</h1>
      <p className="text-sm text-muted">
        Mentor ANA este un ghid interactiv de învățare și simulare a examenelor pentru candidații la cariera militară pe filiera indirectă (ofițeri și subofițeri). Aplicația te ajută să navighezi toate etapele procesului: de la înțelegerea criteriilor de admitere până la pregătirea propriu‑zisă prin teste grilă și antrenamente adaptate.
      </p>
      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Module principale</h2>
        <ul className="space-y-2 list-disc ml-5 text-sm">
          <li>
            <span className="font-medium">Ghid Filiera Indirectă:</span> rezumă procesul de recrutare, selecție, admitere și formare, explicând criteriile și pașii obligatorii.
          </li>
          <li>
            <span className="font-medium">Mod învățare:</span> conține capitole tematice care acoperă legislația, logistica și psihologia; poți studia materialele oficiale în ritmul tău.
          </li>
          <li>
            <span className="font-medium">Simulare Examen:</span> generează teste grilă din legislație și specialitate, cu număr adaptat pe arma aleasă; verifică‑ți cunoștințele înainte de admitere.
          </li>
          <li>
            <span className="font-medium">Teste Engleză:</span> seturi oficiale pentru proba eliminatorie de limba engleză.
          </li>
          <li>
            <span className="font-medium">Evaluare Psihologică:</span> baterii de întrebări pentru evaluarea aptitudinilor generale.
          </li>
          <li>
            <span className="font-medium">Teste Generale:</span> combină întrebări din toate tematicile într‑un singur examen.
          </li>
          <li>
            <span className="font-medium">Învățare adaptivă:</span> modul AI care îți propune întrebări succesive pe baza răspunsurilor tale pentru o pregătire personalizată.
          </li>
          <li>
            <span className="font-medium">Insigne:</span> colecționează badge‑uri pentru a‑ți urmări progresul și a te motiva.
          </li>
          <li>
            <span className="font-medium">Dashboard:</span> vizualizează statistici despre testele finalizate, întrebările rezolvate, răspunsuri corecte, nivelul atins și activitatea din ultimele 7 zile.
          </li>
          <li>
            <span className="font-medium">Mentor AI:</span> pune întrebări și primește răspunsuri instant de la un asistent inteligent despre tematică, examene și tactici.
          </li>
          <li>
            <span className="font-medium">Setări:</span> personalizează tema, paleta de culori, variantele vizuale, vibrațiile, sunetele și scara UI.
          </li>
        </ul>
      </section>
      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Optimizare pentru mobil</h2>
        <p className="text-sm text-muted">
          Interfața este gândită să funcționeze perfect pe dispozitive Android: butoanele au dimensiuni mari pentru atingere confortabilă, fonturile sunt lizibile iar navigarea este simplificată printr‑o bară inferioară cu patru butoane esențiale (Acasă, Mentor AI, Dashboard, Setări). Toate celelalte opțiuni sunt disponibile în ecranul modulului selectat.
        </p>
      </section>
    </div>
  );
}