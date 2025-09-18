// ==============================================================
// FILE: src/hooks/useData.ts
// A generic hook to fetch data with loading and error states.
// This hook accepts an asynchronous function (`fetcher`) that
// returns a promise resolving to the desired data. It handles
// loading, error and unmount scenarios gracefully. Use it in
// pages to simplify data fetching logic.
// ==============================================================

import { useState, useEffect } from 'react';

export function useData<T>(fetcher: () => Promise<T>) {
  // Holds the resolved data once loaded
  const [data, setData] = useState<T | null>(null);
  // Loading flag set to true while waiting for the promise
  const [isLoading, setIsLoading] = useState(true);
  // Error message, if any
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      try {
        const result = await fetcher();
        if (isMounted) {
          setData(result);
        }
      } catch (err: any) {
        if (isMounted) {
          setError(err?.message || 'A apărut o eroare la încărcarea datelor.');
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };
    fetchData();
    return () => {
      isMounted = false;
    };
  }, [fetcher]);
  return { data, isLoading, error };
}