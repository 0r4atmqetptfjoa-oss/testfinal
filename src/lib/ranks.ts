
export type RankInfo = { code: string; name: string; minXP: number };
export const RANKS: RankInfo[] = [
  { code: "sold", name: "Soldat", minXP: 0 },
  { code: "frt", name: "Fruntaș", minXP: 150 },
  { code: "cpl", name: "Caporal", minXP: 400 },
  { code: "sgt", name: "Sergent", minXP: 800 },
  { code: "sgm", name: "Sergent Major", minXP: 1300 },
  { code: "plt", name: "Plutonier", minXP: 1900 },
  { code: "plm", name: "Plutonier Major", minXP: 2600 },
  { code: "adj", name: "Plutonier Adjutant", minXP: 3400 },
  { code: "sl",  name: "Sublocotenent", minXP: 4300 },
  { code: "lt",  name: "Locotenent", minXP: 5300 },
  { code: "cpt", name: "Căpitan", minXP: 6400 },
  { code: "maj", name: "Maior", minXP: 7600 },
  { code: "lct", name: "Locotenent-colonel", minXP: 8900 },
  { code: "col", name: "Colonel", minXP: 10300 },
  { code: "gb",  name: "General de brigadă", minXP: 11800 },
  { code: "gm",  name: "General-maior", minXP: 13400 },
  { code: "gl",  name: "General-locotenent", minXP: 15100 },
  { code: "gen", name: "General", minXP: 16900 },
];
export function rankFromXP(xp: number){
  const list = [...RANKS].sort((a,b)=> a.minXP - b.minXP);
  let cur = list[0]; let next = null as RankInfo | null;
  for (let i=0;i<list.length;i++){
    if (xp >= list[i].minXP){ cur = list[i]; next = list[i+1] || null; }
  }
  const progress = next ? (xp - cur.minXP) / Math.max(1, (next.minXP - cur.minXP)) : 1;
  return { current: cur, next, progress: Math.max(0, Math.min(1, progress)) };
}
