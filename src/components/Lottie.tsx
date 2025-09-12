
import React, { useEffect, useRef } from "react";

export default function Lottie({ src, loop=false, autoplay=true, style }: { src: any; loop?: boolean; autoplay?: boolean; style?: React.CSSProperties }){
  const ref = useRef<HTMLDivElement>(null);
  useEffect(()=>{
    let anim: any;
    (async()=>{
      try{
        const lottie = (await import('lottie-web')).default;
        anim = lottie.loadAnimation({ container: ref.current!, renderer: 'svg', loop, autoplay, animationData: src });
      }catch{
        // fallback: just show emoji
        if (ref.current) ref.current.innerHTML = "<div style='font-size:28px'>🏅</div>";
      }
    })();
    return ()=> { try{ anim?.destroy?.(); }catch{} };
  }, [src, loop, autoplay]);
  return <div ref={ref} style={style} />;
}
