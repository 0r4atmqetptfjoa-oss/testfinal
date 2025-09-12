
// src/lib/game.ts
export type GameState = {
  xp: number;
  streak: number;           // consecutive active days
  lastActive: string|null;  // ISO date (YYYY-MM-DD)
  badges: string[];
  activity: Record<string, number>; // date (YYYY-MM-DD) -> XP gained that day
};

const KEY = "gameState_v2";

function todayISO(d = new Date()){
  const z = new Date(d.getTime() - d.getTimezoneOffset()*60000);
  return z.toISOString().slice(0,10);
}

export function loadGame(): GameState {
  try{
    const raw = localStorage.getItem(KEY);
    if (raw) return JSON.parse(raw);
  }catch{}
  const init: GameState = { xp: 0, streak: 0, lastActive: null, badges: [], activity: {} };
  saveGame(init);
  return init;
}
export function saveGame(s: GameState){
  try{ localStorage.setItem(KEY, JSON.stringify(s)); }catch{}
}

export function addActivityXP(s: GameState, amount: number, dateISO = todayISO()){
  if (!s.activity[dateISO]) s.activity[dateISO] = 0;
  s.activity[dateISO] += amount;
}

export function touchStreak(s: GameState, date = new Date()){
  const t = todayISO(date);
  if (s.lastActive === t) return; // already counted
  if (!s.lastActive){
    s.streak = 1;
  } else {
    const prev = new Date(s.lastActive+"T00:00:00");
    const diff = Math.round((date.getTime() - prev.getTime())/86400000);
    if (diff === 1) s.streak += 1;
    else if (diff > 1) s.streak = 1; // reset
  }
  s.lastActive = t;
}

export function awardXP(amount: number, reason: string = "generic"){
  const s = loadGame();
  const today = todayISO();
  s.xp += amount;
  addActivityXP(s, amount, today);
  touchStreak(s, new Date());
  const newly = checkBadges(s, reason);
  saveGame(s);
  return { state: s, newlyUnlocked: newly };
}

// Level model: level n starts at 100*(n-1)^2 and ends before 100*n^2
export function levelFromXP(xp: number){
  const lvl = Math.floor(Math.sqrt(Math.max(0, xp)/100))+1;
  const start = 100*(lvl-1)*(lvl-1);
  const next = 100*lvl*lvl;
  const cur = xp - start;
  const need = next - start;
  const pct = need>0 ? Math.max(0, Math.min(1, cur/need)) : 1;
  return { level: lvl, start, next, cur, need, pct };
}

export function last7DaysActivity(): { day: string; xp: number }[] {
  const s = loadGame();
  const days: { day: string; xp: number }[] = [];
  for (let i=6;i>=0;i--){
    const d = new Date(); d.setDate(d.getDate()-i);
    const k = d.toISOString().slice(0,10);
    days.push({ day: k, xp: s.activity[k] || 0 });
  }
  return days;
}

export function last30DaysActivity(): { date: string; xp: number }[] {
  const s = loadGame();
  const out: { date: string; xp: number }[] = [];
  for (let i=29;i>=0;i--){
    const d = new Date(); d.setDate(d.getDate()-i);
    const k = d.toISOString().slice(0,10);
    out.push({ date: k, xp: s.activity[k] || 0 });
  }
  return out;
}

// Badges
export type Badge = { id: string; title: string; desc: string; icon: string };

export const BADGES: Record<string, Badge> = {
  first_test: { id: "first_test", title: "Primul zbor", desc: "Finalizează primul test", icon: "🎖️" },
  perfect_10: { id: "perfect_10", title: "Perfect 10", desc: "Obține scor maxim într-un test", icon: "🏅" },
  streak_7:   { id: "streak_7", title: "Foc continuu", desc: "Menține un streak de 7 zile", icon: "🔥" },
};

export function checkBadges(s: GameState, reason?: string){
  const unlocked: string[] = [];
  // streak 7
  if (s.streak >= 7 && !s.badges.includes("streak_7")) { s.badges.push("streak_7"); unlocked.push("streak_7"); }
  // first test
  if (reason === "test_complete_first" && !s.badges.includes("first_test")) { s.badges.push("first_test"); unlocked.push("first_test"); }
  // perfect
  if (reason === "test_perfect" && !s.badges.includes("perfect_10")) { s.badges.push("perfect_10"); unlocked.push("perfect_10"); }
  return unlocked.map(id => BADGES[id]);
}

// Haptics
export function haptic(pattern: "light"|"success"|"error"|"impact" = "light"){
  try{
    if (!("vibrate" in navigator)) return;
    const m = {
      light: [10],
      success: [15, 30, 15],
      error: [30, 60, 30],
      impact: [20]
    } as Record<string, number[]>;
    navigator.vibrate(m[pattern] || [10]);
  }catch{}
}
