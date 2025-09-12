
export function shareText(title: string, text: string){
  try{
    if (navigator.share) return navigator.share({ title, text });
  }catch{}
  return Promise.resolve();
}

export async function keepScreenAwake(enable=true){
  try{
    // Screen Wake Lock API (supported on many Android browsers)
    // @ts-ignore
    if ("wakeLock" in navigator){
      // @ts-ignore
      return enable ? await navigator.wakeLock.request("screen") : null;
    }
  }catch{}
  return null;
}
