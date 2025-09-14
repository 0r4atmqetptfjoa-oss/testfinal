
import { getSounds } from "./prefs";
let ctx: AudioContext | null = null;
function tone(freq:number, dur=0.12){
  if(!getSounds()) return;
  try{
    ctx = ctx || new (window.AudioContext || (window as any).webkitAudioContext)();
    const o = ctx.createOscillator(); const g = ctx.createGain();
    o.connect(g); g.connect(ctx.destination);
    o.frequency.value = freq; g.gain.setValueAtTime(0.0001, ctx.currentTime);
    g.gain.exponentialRampToValueAtTime(0.15, ctx.currentTime + 0.01);
    g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + dur);
    o.start(); o.stop(ctx.currentTime + dur);
  }catch{}
}
export const sound = {
  ui(){ tone(520, 0.07); },
  correct(){ tone(760, 0.12); setTimeout(()=>tone(880,0.1), 90); },
  wrong(){ tone(240, 0.14); },
  finish(){ tone(660,0.12); setTimeout(()=>tone(880,0.12),100); setTimeout(()=>tone(990,0.12),220); }
};
