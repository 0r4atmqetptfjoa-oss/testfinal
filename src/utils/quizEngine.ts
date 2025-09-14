
export type Item = { id?: string; module: 'legislation'|'specialty'|'english'|'psychology'|string; question: string; choices: string[]; answer: number };
export function shuffle<T>(arr:T[], seed:number){ let a=arr.slice(); let s=seed||1; for(let i=a.length-1;i>0;i--){ s=(s*9301+49297)%233280; const r=s/233280; const j=Math.floor(r*(i+1)); [a[i],a[j]]=[a[j],a[i]]; } return a; }
export function buildExam(pool: Item[], opts: { limit: number; seed: number }){ return shuffle(pool, opts.seed).slice(0, Math.min(opts.limit, pool.length)); }
