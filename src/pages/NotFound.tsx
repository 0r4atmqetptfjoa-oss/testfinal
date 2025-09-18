// ==============================================================
// FILE: src/pages/NotFound.tsx
// A user‑friendly 404 page to display when a route is not found.
// Contains a simple message and a link back to the home page.
// ==============================================================

import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center p-4">
      <h1 className="text-6xl font-bold text-primary">404</h1>
      <p className="text-2xl mt-4">Oops! Pagina nu a fost găsită.</p>
      <p className="mt-2">Se pare că te-ai rătăcit. E ca atunci când cauți cheile și ele sunt în mâna ta.</p>
      <Link to="/home" className="btn btn-primary mt-6">
        Înapoi acasă
      </Link>
    </div>
  );
}