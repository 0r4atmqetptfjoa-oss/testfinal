
import React from "react";

const Tank = () => (
  <svg width="28" height="28" viewBox="0 0 64 64" fill="none">
    <rect x="6" y="28" width="40" height="10" rx="3" fill="currentColor"/><rect x="14" y="24" width="18" height="6" rx="2" fill="currentColor"/>
    <rect x="2" y="36" width="52" height="8" rx="3" fill="currentColor"/><rect x="46" y="29" width="14" height="4" rx="2" fill="currentColor"/>
  </svg>
);
const Infantry = () => (
  <svg width="28" height="28" viewBox="0 0 64 64" fill="none">
    <circle cx="20" cy="14" r="6" fill="currentColor"/><rect x="16" y="22" width="8" height="14" rx="3" fill="currentColor"/>
    <rect x="10" y="36" width="20" height="6" rx="3" fill="currentColor"/><rect x="30" y="26" width="22" height="4" rx="2" fill="currentColor"/>
  </svg>
);
const Mountain = () => (
  <svg width="28" height="28" viewBox="0 0 64 64" fill="none">
    <path d="M8 48L26 24l10 14 6-8 14 18H8z" fill="currentColor"/>
  </svg>
);
const Artillery = () => (
  <svg width="28" height="28" viewBox="0 0 64 64" fill="none">
    <rect x="8" y="36" width="36" height="8" rx="3" fill="currentColor"/><rect x="44" y="34" width="10" height="4" rx="2" fill="currentColor"/>
    <rect x="12" y="30" width="24" height="4" rx="2" fill="currentColor"/>
  </svg>
);
const Engineer = () => (
  <svg width="28" height="28" viewBox="0 0 64 64" fill="none">
    <rect x="10" y="34" width="28" height="8" rx="3" fill="currentColor"/><rect x="22" y="26" width="16" height="6" rx="2" fill="currentColor"/>
    <rect x="40" y="28" width="14" height="4" rx="2" fill="currentColor"/>
  </svg>
);
const Radio = () => (
  <svg width="28" height="28" viewBox="0 0 64 64" fill="none">
    <rect x="12" y="28" width="28" height="10" rx="3" fill="currentColor"/><rect x="20" y="20" width="12" height="8" rx="2" fill="currentColor"/>
    <rect x="42" y="18" width="4" height="20" rx="2" fill="currentColor"/>
  </svg>
);
const Logistics = () => (
  <svg width="28" height="28" viewBox="0 0 64 64" fill="none">
    <rect x="8" y="30" width="24" height="12" rx="3" fill="currentColor"/><rect x="32" y="26" width="20" height="8" rx="2" fill="currentColor"/>
    <circle cx="18" cy="46" r="4" fill="currentColor"/><circle cx="44" cy="46" r="4" fill="currentColor"/>
  </svg>
);
const Medical = () => (
  <svg width="28" height="28" viewBox="0 0 64 64" fill="none">
    <rect x="28" y="14" width="8" height="36" fill="currentColor"/><rect x="14" y="28" width="36" height="8" fill="currentColor"/>
  </svg>
);

export default function BranchIcon({ name }: { name: string }){
  const n = name.toLowerCase();
  const color = "currentColor";
  const style = { color };
  if (/tanc/.test(n)) return <div style={style}><Tank/></div>;
  if (/infanterie/.test(n)) return <div style={style}><Infantry/></div>;
  if (/munte|vânători/.test(n)) return <div style={style}><Mountain/></div>;
  if (/geniu|engineer/.test(n)) return <div style={style}><Engineer/></div>;
  if (/artilerie|dca/.test(n)) return <div style={style}><Artillery/></div>;
  if (/comunic/.test(n)) return <div style={style}><Radio/></div>;
  if (/logistic/.test(n)) return <div style={style}><Logistics/></div>;
  if (/medical|sanitar/.test(n)) return <div style={style}><Medical/></div>;
  return <div style={style}><Infantry/></div>;
}
