import { useEffect } from 'react';
/** Native scrolling drives scene transforms. Pointer work is limited to the touched component. */
export function useExperience(enabled:boolean) {
  useEffect(()=>{
    const root=document.documentElement;root.dataset.motion=enabled?'on':'off';
    const hero=document.querySelector<HTMLElement>('.hero'),journey=document.querySelector<HTMLElement>('.journey');
    let frame=0,lastY=scrollY,lastAt=performance.now();
    const update=()=>{frame=0;const total=root.scrollHeight-innerHeight;root.style.setProperty('--read-progress',String(total>0?scrollY/total:0));if(!enabled)return;
      const now=performance.now(),velocity=Math.max(-1,Math.min(1,(scrollY-lastY)/Math.max(1,now-lastAt)/4));lastY=scrollY;lastAt=now;
      const rect=hero?.getBoundingClientRect();if(rect&&rect.bottom>0){const progress=Math.min(1,Math.max(0,-rect.top/rect.height));hero?.style.setProperty('--hero-scroll',String(progress));hero?.style.setProperty('--hero-shift',`${progress*45}px`);hero?.style.setProperty('--hero-scroll-turn',`${progress*-4}deg`);}
      const jr=journey?.getBoundingClientRect();if(jr&&jr.bottom>0&&jr.top<innerHeight){const progress=Math.min(1,Math.max(0,(innerHeight*.65-jr.top)/jr.height));journey?.style.setProperty('--journey-progress',String(progress));journey?.style.setProperty('--journey-turn',`${(progress-.5)*14}deg`);journey?.style.setProperty('--journey-float',`${(progress-.5)*-28}px`);journey?.style.setProperty('--scroll-velocity',`${velocity*2}deg`);}
    };
    const request=()=>{if(!frame)frame=requestAnimationFrame(update);};window.addEventListener('scroll',request,{passive:true});window.addEventListener('resize',request);update();
    const visibility=()=>{root.dataset.pageHidden=document.hidden?'true':'false';};document.addEventListener('visibilitychange',visibility);visibility();
    const activity=new IntersectionObserver(entries=>entries.forEach(entry=>entry.target.classList.toggle('motion-outside',!entry.isIntersecting)),{rootMargin:'60px'});document.querySelectorAll('main section').forEach(el=>activity.observe(el));
    const cards=Array.from(document.querySelectorAll<HTMLElement>('[data-depth]'));
    const tilt=(event:PointerEvent)=>{if(!enabled||event.pointerType!=='mouse')return;const el=event.currentTarget as HTMLElement,r=el.getBoundingClientRect();el.style.setProperty('--card-x',`${-(event.clientY-r.top-r.height/2)/r.height*6}deg`);el.style.setProperty('--card-y',`${(event.clientX-r.left-r.width/2)/r.width*8}deg`);};
    const reset=(event:PointerEvent)=>{const el=event.currentTarget as HTMLElement;el.style.setProperty('--card-x','0deg');el.style.setProperty('--card-y','0deg');};
    if(enabled)cards.forEach(card=>{card.addEventListener('pointermove',tilt);card.addEventListener('pointerleave',reset);});
    return()=>{cancelAnimationFrame(frame);activity.disconnect();document.removeEventListener('visibilitychange',visibility);window.removeEventListener('scroll',request);window.removeEventListener('resize',request);cards.forEach(card=>{card.removeEventListener('pointermove',tilt);card.removeEventListener('pointerleave',reset);card.style.removeProperty('--card-x');card.style.removeProperty('--card-y');});};
  },[enabled]);
}
