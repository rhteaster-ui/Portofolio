import { useRef, useState, type PointerEvent } from 'react';
import { ArrowUpRight, Braces, Layers3 } from 'lucide-react';
export default function Scene({paused=false}:{mode?:'hero';paused?:boolean}) {
  const ref=useRef<HTMLDivElement>(null),[expanded,setExpanded]=useState(false);
  function tilt(e:PointerEvent<HTMLDivElement>){if(paused||e.pointerType!=='mouse')return;const r=e.currentTarget.getBoundingClientRect();ref.current?.style.setProperty('--tilt-x',`${-(e.clientY-r.top-r.height/2)/r.height*8}deg`);ref.current?.style.setProperty('--tilt-y',`${(e.clientX-r.left-r.width/2)/r.width*10}deg`);}
  function reset(){ref.current?.style.setProperty('--tilt-x','0deg');ref.current?.style.setProperty('--tilt-y','0deg');}
  return <div className={`scene scene-hero ${expanded?'stack-open':''}`} ref={ref} onPointerMove={tilt} onPointerLeave={reset} data-paused={paused}>
    <div className="portrait-assembly">
      <a href="#archive" className="portrait-backplate backplate-work"><img src="/components/works/repo-flow.svg" width="820" height="500" alt=""/><span>16 KARYA<ArrowUpRight size={13}/></span></a>
      <a href="#universe" className="portrait-backplate backplate-personal"><img src="/images/anime-v22/elaina.jpg" width="600" height="900" alt="Elaina" loading="lazy"/><span>MY UNIVERSE<ArrowUpRight size={13}/></span></a>
      <figure className="portrait-glass"><div className="portrait-window"><img src="/images/pp.webp" alt="Foto asli R_HMT dengan kacamata dan hoodie hitam" width="762" height="960" fetchPriority="high"/></div><figcaption><strong>R_HMT</strong><span>Student · Developer · Explorer</span></figcaption><span className="glass-corner corner-one"/><span className="glass-corner corner-two"/></figure>
      <div className="portrait-exploring"><Braces size={18}/><div><small>CURRENTLY EXPLORING</small><span>Web development<br/>& AI creative tech</span></div><ArrowUpRight size={15}/></div>
      <div className="portrait-location"><span aria-hidden="true" className="indonesia-flag"/><div><strong>INDONESIA</strong><span>Learning by building.</span></div></div>
      <span className="portrait-signature" aria-hidden="true">R_hmt.</span>
    </div>
    <div className="stack-controls"><button className="stack-toggle" onClick={()=>setExpanded(v=>!v)} aria-pressed={expanded}><Layers3 size={15}/>{expanded?'Rapatkan stack':'Buka stack'}<span aria-hidden="true">{expanded?'−':'+'}</span></button></div>
  </div>;
}
