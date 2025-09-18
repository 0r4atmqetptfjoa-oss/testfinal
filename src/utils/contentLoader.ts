// ===============================================
// FILE: src/utils/contentLoader.ts
// CHANGE: mapping extins pentru specialități filiera indirectă + fallback
// ===============================================
import type { Item } from "./quizEngine";
type Profile = { role?: 'ofiter'|'subofiter'; filiera?: 'directa'|'indirecta'; branch?: string };
function getProfile(): Profile { try { return JSON.parse(localStorage.getItem("user_profile_v2") || localStorage.getItem("profile") || "{}"); } catch { return {}; } }

const MAP: Record<string, string> = {
  'logistica': '/data/v12/logistics.json',
  'intendenta': '/data/v12/logistics.json',

  // existente / de bază
  'infanterie': '/data/specialty/subofiter_indirecta_infanterie.json',
  'geniu': '/data/specialty/subofiter_indirecta_geniu.json',
  'cbrn': '/data/specialty/subofiter_indirecta_cbrn.json',
  'medical': '/data/specialty/subofiter_indirecta_medical.json',
  'sanitar': '/data/specialty/subofiter_indirecta_medical.json',

  // extinderi
  'vanatori': '/data/specialty/subofiter_indirecta_vanatori_munte.json',
  'tancuri': '/data/specialty/subofiter_indirecta_tancuri.json',
  'artilerie & rachete': '/data/specialty/subofiter_indirecta_artilerie_terestra.json',
  'artilerie': '/data/specialty/subofiter_indirecta_artilerie_terestra.json',
  'rachete': '/data/specialty/subofiter_indirecta_artilerie_terestra.json',
  'antiaerian': '/data/specialty/subofiter_indirecta_raa.json',
  'cercetare cbrn': '/data/specialty/subofiter_indirecta_cercetare_cbrn.json',
  'cercetare': '/data/specialty/subofiter_indirecta_cercetare.json',
  'informatii': '/data/specialty/subofiter_indirecta_informatii_militare.json',
  'politie militara': '/data/specialty/subofiter_indirecta_politie_militara.json',
  'forte speciale': '/data/specialty/subofiter_indirecta_forte_speciale.json',
  'auto': '/data/specialty/subofiter_indirecta_auto.json',
  'administratie': '/data/specialty/subofiter_indirecta_administratie.json',
  'construc': '/data/specialty/subofiter_indirecta_constructii.json',
  'cai ferate': '/data/specialty/ofiter_indirecta_cai_ferate.json',
  'muzici militare': '/data/specialty/subofiter_indirecta_muzici_militare.json',
  'infanterie marina': '/data/specialty/subofiter_indirecta_infanterie_marina.json',
  'comunicatii': '/data/specialty/subofiter_indirecta_comunicatii.json',
};

export async function loadSpecialtyQuestions(): Promise<Item[]> {
  const p = getProfile();
  const arma = (p.branch || (p as any).arma || '').toString().toLowerCase();
  const key = Object.keys(MAP).find(k => arma.includes(k));
  const url = key ? MAP[key] : '/data/v12/logistics.json';
  const data = await fetch(url).then(r => r.json()).catch(()=>null);
  // normalizăm pentru compatibilitate {options, answerIndex}
  const arr = (data?.questions || []).map((q:any)=> ({
    id: q.id,
    module: q.module||'specialty',
    question: q.question||q.stem,
    choices: q.choices||q.options,
    answer: typeof q.answer==='number'?q.answer:q.answerIndex
  }));
  return arr;
}
