
export type HapticKind = "light"|"success"|"error"|"impact"|"perfect";
export function vibrate(pattern: HapticKind = "light"){
  try{
    if (!("vibrate" in navigator)) return;
    const map: Record<HapticKind, number[]> = {
      light: [10],
      success: [15,20,15],
      error: [30,60,30],
      impact: [20],
      perfect: [15, 100, 15] // scurt-lung-scurt
    };
    navigator.vibrate(map[pattern] || [10]);
  }catch{}
}
