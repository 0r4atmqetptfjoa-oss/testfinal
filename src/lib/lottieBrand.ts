
/**
 * Tint a Lottie JSON to a given HEX color (overriding fills/strokes).
 * Non-destructive: returns a deep-cloned object.
 */
export function tintLottie(animationData: any, hex: string){
  function hexToRGBA01(h: string): [number, number, number, number]{
    const m = h.replace('#','');
    const n = m.length===3
      ? m.split('').map(c => parseInt(c+c, 16))
      : [parseInt(m.slice(0,2),16), parseInt(m.slice(2,4),16), parseInt(m.slice(4,6),16)];
    return [n[0]/255, n[1]/255, n[2]/255, 1];
  }
  const target = hexToRGBA01(hex);
  const data = JSON.parse(JSON.stringify(animationData));
  function walk(o: any){
    if (!o || typeof o !== 'object') return;
    if (o.ty === 'fl' && o.c && o.c.k){ o.c.k = target; }
    if (o.ty === 'st' && o.c && o.c.k){ o.c.k = target; }
    for (const k in o) walk(o[k]);
  }
  walk(data);
  return data;
}
