# Modificări sugerate pentru players (ExamPlayer.tsx & QuizPlayer.tsx)
- Înlocuiește
  ```ts
  import { vibrate } from "@/lib/haptics";
  import { sfxCorrect, sfxWrong, sfxFinish } from "@/lib/sound";
  ```
  cu
  ```ts
  import { haptics } from "@/lib/haptics";
  import { sound } from "@/lib/sound";
  ```
- Apoi în cod folosește:
  ```ts
  haptics.light?.();
  sound.ui?.();
  ```
  sau adaptează la API-ul real al fișierelor tale.
