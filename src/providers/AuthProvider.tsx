// =======================================================
// FILE: src/providers/AuthProvider.tsx
// Context provider for authentication. This component
// subscribes to Firebase auth state changes and makes the
// current user object and a loading flag available to any
// descendant via the `useAuth` hook. Wrap your app with
// this provider in main.tsx.
// =======================================================

import React, { createContext, useContext, useEffect, useState } from 'react';
import type { User } from 'firebase/auth';
import { onAuthChange } from '@/lib/auth';

// The shape of the auth context
interface AuthContextValue {
  user: User | null;
  loading: boolean;
}

// Create a React context with default values. These values
// will be overwritten by the provider once mounted.
const AuthContext = createContext<AuthContextValue>({ user: null, loading: true });

// Provider component that manages the auth state. It listens
// for auth changes and updates context values accordingly.
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    // Subscribe to auth changes. onAuthChange returns an
    // unsubscribe function that we invoke on cleanup.
    const unsubscribe = onAuthChange((u) => {
      setUser(u);
      setLoading(false);
    });
    return unsubscribe;
  }, []);
  return <AuthContext.Provider value={{ user, loading }}>{children}</AuthContext.Provider>;
};

// Custom hook to access the auth context. Use this in
// components to get the current user and loading state.
export const useAuth = () => useContext(AuthContext);