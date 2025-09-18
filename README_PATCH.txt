PATCH: Filiera Indirectă – extindere completă arme + mapping + JSON șablon

Ce include:
- src/pages/Onboarding.tsx               (forțează filiera=indirecta; listă de arme extinsă)
- src/utils/contentLoader.ts             (mapări extinse -> fișiere JSON specialty)
- src/pages/ModuleHome.tsx               (subtitlu dinamic + card 'Ghid Filiera Indirectă')
- src/pages/ExamSim.tsx                  (compoziție examen per armă; Engleză eliminatorie unde e cazul)
- src/pages/GuideIndirecta.tsx           (pagină ghid; placeholder)
- src/App.tsx                            (rută /ghid)
- public/data/specialty/*.json           (fișiere pentru TOATE armele pe filiera indirectă – întrebări minime)

Instrucțiuni:
1) Dezarhivează la rădăcina proiectului și acceptă overwrite.
2) Confirmă că există `public/data/v12/legislation.json` și (opțional) `public/data/v12/logistics.json`.
3) Rulează: npm i && npm run dev
4) Onboarding: alege rol + armă (filiera e fixată la 'indirecta').
5) Simulare Examen: distribuția se ajustează automat (RAA=90L/0S; Medical=10L/80S; Logistică=30L/60S; altfel 30/60).

Notă:
- Fișierele JSON specialty sunt **șabloane**: conțin cel puțin 1 întrebare; extinde-le ușor adăugând itemi în același format.
- Dacă anumite denumiri de arme diferă în sesiunea curentă, ajustează string-urile-cheie în MAP (contentLoader.ts).
