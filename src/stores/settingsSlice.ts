// =======================================================
// FILE: src/stores/settingsSlice.ts
// This slice encapsulates all user settings such as theme,
// haptics and sound effects. Splitting the store into
// slices makes the state management more modular and
// easier to extend in the future.
// =======================================================

import type { StateCreator } from 'zustand';

// Define the shape of the settings slice. You can extend
// this interface in the future to include more settings.
export interface SettingsSlice {
  /** Current UI theme (light or dark) */
  theme: 'light' | 'dark';
  /** Switch the active theme */
  setTheme: (theme: 'light' | 'dark') => void;
  /** Enable or disable haptics feedback */
  haptics: boolean;
  setHaptics: (enabled: boolean) => void;
  /** Toggle sound effects throughout the app */
  soundEffects: boolean;
  setSoundEffects: (enabled: boolean) => void;
  /** Global scaling factor for typography */
  scale: 1 | 1.1 | 1.2;
  setScale: (scale: 1 | 1.1 | 1.2) => void;
}

// Factory function creating a settings slice. It receives
// the `set` function from Zustand and returns the slice's
// state and actions. When adding new slices, combine them
// in `src/store.ts`.
export const createSettingsSlice: StateCreator<SettingsSlice> = (set) => ({
  theme: 'light',
  setTheme: (theme) => {
    set({ theme });
    // Immediately apply the selected theme to the document
    document.documentElement.setAttribute('data-theme', theme);
  },
  haptics: true,
  setHaptics: (enabled) => set({ haptics: enabled }),
  soundEffects: true,
  setSoundEffects: (enabled) => set({ soundEffects: enabled }),
  scale: 1,
  setScale: (scale) => {
    set({ scale });
    // Apply the scaling factor to the root element. We
    // leverage a CSS variable so that tailwind classes
    // referencing it will automatically adjust.
    document.body.style.setProperty('--scale-factor', `${scale}`);
  },
});