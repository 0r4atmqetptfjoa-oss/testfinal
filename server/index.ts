
import express from "express";
import cors from "cors";
import fs from "fs";
import path from "path";

const app = express();
app.use(cors());
app.use(express.json());

const DB = path.join(process.cwd(), "server_db.json");
function readDB(){
  try{ return JSON.parse(fs.readFileSync(DB, "utf-8")); }catch{ return { profile: {}, game: {} }; }
}
function writeDB(data: any){ fs.writeFileSync(DB, JSON.stringify(data, null, 2), "utf-8"); }

// Merge pentru game state (conflict resolution offline)
function mergeGameStates(server: any, incoming: any){
  const out = { ...server };
  out.xp = Math.max(server.xp||0, incoming.xp||0);
  out.streak = Math.max(server.streak||0, incoming.streak||0);
  out.lastActive = [server.lastActive, incoming.lastActive].filter(Boolean).sort().slice(-1)[0] || null;
  out.badges = Array.from(new Set([...(server.badges||[]), ...(incoming.badges||[])]));
  out.activity = { ...(server.activity||{}) };
  for (const k of Object.keys(incoming.activity||{})){
    // sum pe zi (sau max, după preferință)
    const sv = out.activity[k] || 0;
    out.activity[k] = Math.max(sv, incoming.activity[k]);
  }
  return out;
}

// Profile (tema)
app.get("/api/profile", (req, res)=>{
  const db = readDB(); res.json(db.profile||{});
});
app.post("/api/profile", (req, res)=>{
  const db = readDB(); db.profile = { ...(db.profile||{}), ...(req.body||{}) }; writeDB(db);
  res.json({ ok: true });
});

// Game (XP/Streak/Badges/Activity) – fetch & save direct
app.get("/api/game", (req, res)=>{
  const db = readDB(); res.json(db.game||{});
});
app.post("/api/game", (req, res)=>{
  const db = readDB(); db.game = mergeGameStates(db.game||{}, req.body||{}); writeDB(db);
  res.json({ ok: true, game: db.game });
});

// Batch sync – primește items [{ id, ts, type, payload }]
app.post("/api/sync", (req, res)=>{
  const db = readDB();
  const items = (req.body?.items || []) as any[];
  for (const it of items){
    if (it.type === "theme"){
      db.profile = { ...(db.profile||{}), ...(it.payload||{}) };
    } else if (it.type === "game"){
      db.game = mergeGameStates(db.game||{}, it.payload||{});
    }
  }
  writeDB(db);
  res.json({ ok: true });
});

const PORT = process.env.PORT || 5175;
app.listen(PORT, ()=> console.log("Server up on http://localhost:"+PORT));
