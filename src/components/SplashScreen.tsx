import { useEffect, useRef, useState } from 'react';
import { Mark } from './Primitives';
export default function SplashScreen() {
  const dialog=useRef<HTMLDialogElement>(null),closed=useRef(false),exit=useRef<ReturnType<typeof setTimeout>|undefined>(undefined);
  const [show,setShow]=useState(true),[leaving,setLeaving]=useState(false),[loaded,setLoaded]=useState(0);
  function finish(){if(closed.current)return;closed.current=true;setLeaving(true);exit.current=setTimeout(()=>{setShow(false);document.documentElement.removeAttribute('data-intro');window.dispatchEvent(new Event('rhmt:intro-complete'));},matchMedia('(prefers-reduced-motion: reduce)').matches?80:520);}
  useEffect(()=>{
    let active=true;closed.current=false;setShow(true);setLoaded(0);setLeaving(false);document.documentElement.dataset.intro='on';
    const start=performance.now(),reduced=matchMedia('(prefers-reduced-motion: reduce)');
    const theme=document.documentElement.dataset.theme==='light'?'light':'dark';
    const images=['/images/pp.webp','/images/pp-dev.webp',`/images/glass/${theme}-960.webp`];
    let delay:ReturnType<typeof setTimeout>|undefined;
    const load=(src:string)=>new Promise<void>(resolve=>{const image=new Image();image.onload=image.onerror=()=>resolve();image.src=src;});
    Promise.all([...images.map(load),document.fonts.ready].map(piece=>Promise.resolve(piece).then(()=>{if(active)setLoaded(n=>n+1);}))).then(()=>{if(active)delay=setTimeout(finish,Math.max(0,(reduced.matches?300:1700)-(performance.now()-start)));});
    const deadline=setTimeout(finish,4000);
    return()=>{active=false;clearTimeout(deadline);clearTimeout(delay);clearTimeout(exit.current);document.documentElement.removeAttribute('data-intro');};
  },[]);
  useEffect(()=>{if(!show)return;const old=document.body.style.overflow,focus=document.activeElement as HTMLElement|null;document.body.style.overflow='hidden';dialog.current?.close();dialog.current?.showModal();return()=>{dialog.current?.close();document.body.style.overflow=old;focus?.focus({preventScroll:true});};},[show]);
  if(!show)return null;
  return <dialog open ref={dialog} className={`intro-screen ${leaving?'intro-leaving':''}`} aria-label="Intro R_HMT" onCancel={e=>{e.preventDefault();finish();}}><div className="intro-stage" aria-hidden="true"><span className="intro-panel intro-panel-one"/><span className="intro-panel intro-panel-two"/><span className="intro-panel intro-panel-three"/><div className="intro-identity"><Mark/></div><span className="intro-orbit"/></div><div className="intro-copy"><p className="eyebrow">R_HMT / PERSONAL ARCHIVE</p><h2>Learning <em>in Progress.</em></h2><div className="intro-load" role="progressbar" aria-label="Memuat aset utama" aria-valuemin={0} aria-valuemax={4} aria-valuenow={loaded}><span style={{transform:`scaleX(${loaded/4})`}}/></div><span>MEMBUKA RUANG EKSPLORASI.</span></div><button className="intro-skip" onClick={finish}>Lewati intro ↗</button></dialog>;
}
