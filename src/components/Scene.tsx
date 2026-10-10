import { useRef, useState } from 'react';
import { ArrowUpRight, Layers3 } from 'lucide-react';
export default function Scene({ paused = false }: { mode?: 'hero'; paused?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const [expanded, setExpanded] = useState(false);
  return <div className={`scene scene-hero ${expanded ? 'stack-open' : ''}`} ref={ref} data-spatial="hero" data-expanded={expanded} data-paused={paused}>
    <div className="spatial-fallback hero-fallback"><img src="/images/pp.webp" width="864" height="1088" alt="Foto asli R_HMT dengan kacamata dan hoodie hitam, bersama editor kode" fetchPriority="high"/></div>
    <span className="scene-coordinate">R_HMT / ORIGIN<br/>HUMAN × AI</span>
    <div className="scene-readout" aria-hidden="true"><span className="signal-dot"/><div><small>CURRENTLY EXPLORING</small><span>Vibe coding</span></div><span className="readout-corner">↗</span></div>
    <div className="stack-controls"><button className="stack-toggle" onClick={() => setExpanded(v => !v)} aria-pressed={expanded}><Layers3 size={16}/>{expanded ? 'Rapatkan stack' : 'Buka stack'}<span aria-hidden="true">{expanded ? '−' : '+'}</span></button>{expanded && <div className="stack-destinations"><a href="#journey">Perjalanan<ArrowUpRight size={15}/></a><a href="#ecosystem">19 tools<ArrowUpRight size={15}/></a><a href="#archive">16 karya<ArrowUpRight size={15}/></a></div>}</div>
    <span className="scene-footnote">01 / THE HUMAN BEHIND THE CODE</span>
  </div>;
}
