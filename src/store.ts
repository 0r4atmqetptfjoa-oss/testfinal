import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

type Theme = 'light' | 'dark';
type Scale = 1 | 1.1 | 1.2;

interface AppState {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  scale: Scale;
  setScale: (scale: Scale) => void;
  haptics: boolean;
  setHaptics: (haptics: boolean) => void;
  soundEffects: boolean;
  setSoundEffects: (enabled: boolean) => void;
}

export const useStore = create<AppState>()(
  persist(
    (set) => ({
      theme: 'light',
      setTheme: (theme) => {
        set({ theme });
        document.documentElement.setAttribute('data-theme', theme);
      },
      scale: 1,
      setScale: (scale) => {
        set({ scale });
        // Aplicăm scala direct pe elementul body pentru a afecta tot textul
        document.body.style.setProperty('--scale-factor', `${scale}`);
      },
      haptics: true,
      setHaptics: (haptics) => set({ haptics }),
      soundEffects: true,
      setSoundEffects: (enabled) => set({ soundEffects: enabled }),
    }),
    {
      name: 'mentor-ana-storage',
      storage: createJSONStorage(() => localStorage),
      // Funcție care se asigură că setările sunt aplicate la încărcarea aplicației
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.setTheme(state.theme);
          state.setScale(state.scale);
        }
      },
    }
  )
);

// Inițializăm starea la prima încărcare
useStore.getState().setTheme(useStore.getState().theme);
useStore.getState().setScale(useStore.getState().scale);