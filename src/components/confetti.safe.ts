// SAFE PATCH: null-safety for canvas 2D context
export function safeClear(ctx: CanvasRenderingContext2D | null, w: number, h: number){
  if(!ctx) return;
  ctx.clearRect(0,0,w,h);
}
export function safeFillSquare(ctx: CanvasRenderingContext2D | null, x:number,y:number,s:number, color:string){
  if(!ctx) return;
  (ctx as CanvasRenderingContext2D).fillStyle = color;
  ctx.fillRect(x,y,s,s);
}
