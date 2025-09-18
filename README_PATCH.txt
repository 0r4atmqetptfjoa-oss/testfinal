PATCH: Filiera Indirectă + Examene pe Arme + Ghid

Conținut:
- src/pages/Onboarding.tsx               (forțează filiera=indirecta, simplifică onboarding)
- src/pages/ModuleHome.tsx               (subtitlu dinamic + card 'Ghid Filiera Indirectă')
- src/pages/ExamSim.tsx                  (compoziție examen per armă; engleză eliminatorie indicată)
- src/utils/contentLoader.ts             (mapări specialitate; fallback)
- src/pages/GuideIndirecta.tsx           (pagină cu ghidul complet)
- src/App.tsx                            (rută /ghid)
- public/data/specialty/subofiter_indirecta_medical.json  (banc inițial Sanitar/Medical)

Instrucțiuni:
1) Dezarhivează la rădăcina proiectului și acceptă overwrite.
2) Asigură-te că există `public/data/v12/legislation.json` și (opțional) `public/data/v12/logistics.json`.
3) rulează:
   npm i
   npm run dev
4) Onboarding:
   - alege Ofițer/Subofițer și arma (filiera e deja 'indirecta')
5) Verifică 'Ghid Filiera Indirectă' în modulul principal și distribuția 'Simulare Examen'.

Notă:
- am folosit iconițe din 'lucide-react' (deja în proiect).
- bancul Medical este starter (20 întrebări). Poți extinde fișierul JSON oricând.
