// Helper to advance Step without TS complaints
export type Step = 0|1|2|3;
export function nextStep(s: Step): Step { const n = s + 1; return (n>2?2:n) as Step; }
export function prevStep(s: Step): Step { const p = s - 1; return (p<0?0:p) as Step; }
