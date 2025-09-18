// =======================================================
// FILE: src/lib/auth.ts
// Helper functions for client‑side Firebase authentication.
// This module wraps the core Firebase auth calls, making it
// easy to sign in with Google, sign out, and subscribe to
// changes in the authentication state. Import and call
// these functions from your components as needed.
// =======================================================

import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged, type User } from 'firebase/auth';
import { app } from './firebase';

// Initialize the Firebase Auth instance using the shared app
export const auth = getAuth(app);

// Configure a Google sign‑in provider. Additional providers
// can be added as needed (e.g. email/password or GitHub).
const provider = new GoogleAuthProvider();

/**
 * Initiates the Google sign‑in flow. This will open a popup
 * asking the user to select a Google account. The returned
 * promise resolves with the authentication result.
 */
export function signInWithGoogle() {
  return signInWithPopup(auth, provider);
}

/**
 * Signs out the current user. Returns a promise that
 * resolves once the operation completes.
 */
export function logOut() {
  return signOut(auth);
}

/**
 * Subscribes to changes in the authentication state. The
 * provided callback will be called whenever the user logs
 * in or out. Returns an unsubscribe function. Note that
 * this should be called from within a useEffect hook.
 */
export function onAuthChange(callback: (user: User | null) => void) {
  return onAuthStateChanged(auth, callback);
}