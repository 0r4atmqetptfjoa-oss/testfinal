
import React from "react";

export default function Stat({ label, value }: { label: string; value: string }){
  return (
    <div className="rounded-xl border border-gray-800 bg-gray-900 p-3 text-center">
      <div className="text-xs text-gray-500">{label}</div>
      <div className="text-lg font-semibold text-gray-200">{value}</div>
    </div>
  );
}
