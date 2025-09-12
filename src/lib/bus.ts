
type Handler = (payload?: any) => void;

const listeners: Record<string, Handler[]> = {};

export function on(event: string, handler: Handler){
  (listeners[event] ||= []).push(handler);
  return () => off(event, handler);
}

export function off(event: string, handler: Handler){
  const arr = listeners[event];
  if (!arr) return;
  const i = arr.indexOf(handler);
  if (i >= 0) arr.splice(i, 1);
}

export function emit(event: string, payload?: any){
  (listeners[event] || []).forEach(h => {
    try{ h(payload); }catch{}
  });
}
