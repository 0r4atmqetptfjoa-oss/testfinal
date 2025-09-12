
import { on } from "@/lib/bus";
import { loadGame } from "@/lib/game";

type SyncItem = { id: string; ts: number; type: "theme"|"game"; payload: any };
const KEY = "sync_queue_v1";

function getQueue(): SyncItem[]{ try{ return JSON.parse(localStorage.getItem(KEY) || "[]"); }catch{return [];} }
function setQueue(q: SyncItem[]){ try{ localStorage.setItem(KEY, JSON.stringify(q)); }catch{} }

async function sendBatch(items: SyncItem[]){
  try{
    await fetch("/api/sync", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items })
    });
    return true;
  }catch{ return false; }
}

export function initSync(){
  on("theme:change", (payload)=> enqueue({ type: "theme", payload }));
  on("game:update", ()=> enqueue({ type: "game", payload: loadGame() }));

  window.addEventListener("online", flush);
  flush();
}

function enqueue(partial: Omit<SyncItem, "id"|"ts">){
  const it: SyncItem = { id: crypto.randomUUID(), ts: Date.now(), ...partial };
  const q = getQueue(); q.push(it); setQueue(q);
  if (navigator.onLine) flush();
}

async function flush(){
  const q = getQueue();
  if (q.length === 0) return;
  const ok = await sendBatch(q.slice(0, 50));
  if (ok){
    const rest = q.slice(50);
    setQueue(rest);
    if (rest.length > 0) setTimeout(flush, 200);
  }
}
