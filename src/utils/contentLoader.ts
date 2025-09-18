// ===============================================
// FILE: src/utils/contentLoader.ts
// CHANGE: mapping pentru Medical/Sanitar + fallback
// ===============================================
import type { Item } from "./quizEngine";
type Profile = { role?: 'ofiter'|'subofiter'; filiera?: 'directa'|'indirecta'; branch?: string };
function getProfile(): Profile { try { return JSON.parse(localStorage.getItem("user_profile_v2") || localStorage.getItem("profile") || "{}"); } catch { return {}; } }
const MAP: Record<string, string> = {
  'logistica': '/data/v12/logistics.json',
  'intendenta': '/data/v12/logistics.json',
  'infanterie': '/data/specialty/subofiter_indirecta_infanterie.json',
  'geniu': '/data/specialty/subofiter_indirecta_geniu.json',
  'cbrn': '/data/specialty/subofiter_indirecta_cbrn.json',
  'medical': '/data/specialty/subofiter_indirecta_medical.json',
  'sanitar': '/data/specialty/subofiter_indirecta_medical.json',
};
export async function loadSpecialtyQuestions(): Promise<Item[]> {
  const p = getProfile();
  const arma = (p.branch || (p as any).arma || '').toString().toLowerCase();
  const key = Object.keys(MAP).find(k => arma.includes(k));
  const url = key ? MAP[key] : '/data/v12/logistics.json';
  const data = await fetch(url).then(r => r.json()).catch(()=>null);
  // normalizăm pentru compatibilitate {options, answerIndex}
  const arr = (data?.questions || []).map((q:any)=> ({ id:q.id, module:q.module||'specialty', question:q.question||q.stem, choices:q.choices||q.options, answer: typeof q.answer==='number'?q.answer:q.answerIndex }));
  return arr;
}
