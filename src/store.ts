import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { SettingsSlice } from './stores/settingsSlice';
import { createSettingsSlice } from './stores/settingsSlice';

// Compose all state slices into a single application state.
// At the moment we only have SettingsSlice, but additional
// slices (e.g. user, progress) can be merged here using
// object spread syntax. See createStore usage below.
type AppState = SettingsSlice;

// Create the Zustand store with persistence. We combine
// slices by spreading their factory functions. The
// persistence middleware saves state to localStorage and
// rehydrates it on startup.
export const useStore = create<AppState>()(
  persist(
    (...args) => ({
      ...createSettingsSlice(...args),
      // Additional slices can be added here
    }),
    {
      name: 'mentor-ana-storage',
      storage: createJSONStorage(() => localStorage),
      // When the store is rehydrated from storage, apply any
      // side effects such as theme and scale changes.
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.setTheme(state.theme);
          state.setScale(state.scale);
        }
      },
    }
  )
);

// Immediately apply persisted theme and scale on module load.
useStore.getState().setTheme(useStore.getState().theme);
useStore.getState().setScale(useStore.getState().scale);