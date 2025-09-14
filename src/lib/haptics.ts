
import { getHaptics } from "./prefs";
export const haptics = {
  light(){ if(!getHaptics()) return; try{ if('vibrate' in navigator) navigator.vibrate(10); }catch{} },
  success(){ if(!getHaptics()) return; try{ navigator.vibrate([10,20,10]); }catch{} },
  error(){ if(!getHaptics()) return; try{ navigator.vibrate([30,20,30]); }catch{} }
};
