
// src/lib/sound.ts
function beep(freq=880, durMs=120, type: OscillatorType = "sine"){
  try{
    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.type = type;
    o.frequency.setValueAtTime(freq, ctx.currentTime);
    g.gain.setValueAtTime(0.0001, ctx.currentTime);
    g.gain.exponentialRampToValueAtTime(0.2, ctx.currentTime + 0.01);
    g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + durMs/1000);
    o.connect(g); g.connect(ctx.destination);
    o.start(); o.stop(ctx.currentTime + durMs/1000 + 0.02);
  }catch{}
}
export const sfxCorrect = () => beep(880, 130, "triangle");
export const sfxWrong   = () => beep(220, 160, "sawtooth");
export const sfxFinish  = () => { beep(660,100,"sine"); setTimeout(()=>beep(990,140,"sine"),110); };
export const sfxBadge   = () => { beep(700,90,"square"); setTimeout(()=>beep(1100,120,"square"),100); };
