
import React from "react";
import { sound } from "../lib/sound";
export default function Exam(){
  return (
    <div className="min-h-screen bg-black text-gray-200 p-4 max-w-2xl mx-auto pb-24">
      <h1 className="text-xl font-bold mb-2">Examen</h1>
      <p className="text-sm text-muted">Simulare cronometrată.</p>
      <button className="btn btn-primary mt-3" onClick={()=> sound.finish()}>Test sound finish</button>
    </div>
  );
}
