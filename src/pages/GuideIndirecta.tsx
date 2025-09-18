// ===============================================
// FILE: src/pages/GuideIndirecta.tsx
// NEW: pagină cu ghidul complet (placeholder pentru text complet)
// ===============================================
import React from "react";

import React, { useEffect, useState } from "react";

/**
 * Ghidul complet pentru filiera indirectă este salvat într-un fișier Markdown
 * la public/data/guide/filiera_indirecta.md. Această pagină îl încarcă
 * la prima randare și îl afișează. În cazul în care fișierul nu este
 * disponibil, se afișează un mesaj placeholder.
 */
export default function GuideIndirecta(){
  const [text, setText] = useState<string | null>(null);
  useEffect(()=>{
    fetch("/data/guide/filiera_indirecta.md").then(r => {
      if(r.ok) return r.text();
      throw new Error('missing');
    }).then(setText).catch(()=>{
      setText(null);
    });
  },[]);
  return (
    <div className="min-h-screen bg-black text-gray-200 p-4 max-w-2xl mx-auto pb-24">
      <h1 className="text-xl font-bold mb-2">Ghid – Filiera Indirectă</h1>
      <div className="text-xs text-muted mb-4">Această secțiune explică procesul de recrutare, selecție, admitere și formare pe filiera indirectă.</div>
      {text === null ? (
        <p className="text-sm text-muted">Nu am găsit fișierul ghidului. Contactează administratorul aplicației pentru a-l adăuga.</p>
      ) : (
        <div className="prose prose-sm prose-invert" dangerouslySetInnerHTML={{ __html: markdownToHtml(text) }}></div>
      )}
    </div>
  );
}

// Convert Markdown to HTML. A very light-weight converter for basic Markdown
// features (headings, paragraphs, lists). For complex documents, consider
// importing a dedicated Markdown parser. Here we implement minimal conversion
// manually to avoid adding a dependency.
function markdownToHtml(md: string): string {
  // Escape HTML
  let html = md.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  // Headings
  html = html.replace(/^# (.*)$/gm, '<h1>$1</h1>');
  html = html.replace(/^## (.*)$/gm, '<h2>$1</h2>');
  html = html.replace(/^### (.*)$/gm, '<h3>$1</h3>');
  // Bold
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  // Italic
  html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');
  // Unordered lists
  html = html.replace(/^- (.*)$/gm, '<li>$1</li>');
  html = html.replace(/(<li>.*<\/li>\n?)+/g, match => {
    const items = match.trim().split(/\n/).join('');
    return '<ul>' + items + '</ul>';
  });
  // Line breaks to paragraphs
  html = html.replace(/\n\n+/g, '</p><p>');
  html = '<p>' + html + '</p>';
  return html;
}
