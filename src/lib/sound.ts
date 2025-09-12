
export function playTone(freq: number = 880, durationMs: number = 140){
  try{
    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.type = "sine";
    o.frequency.setValueAtTime(freq, ctx.currentTime);
    g.gain.setValueAtTime(0.001, ctx.currentTime);
    g.gain.exponentialRampToValueAtTime(0.2, ctx.currentTime + 0.01);
    g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + durationMs/1000);
    o.connect(g); g.connect(ctx.destination);
    o.start(); o.stop(ctx.currentTime + durationMs/1000 + 0.02);
  }catch{}
}
export const playCorrect = () => playTone(880, 150);
export const playWrong   = () => playTone(220, 180);
