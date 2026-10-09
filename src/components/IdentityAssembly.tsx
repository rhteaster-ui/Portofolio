import { useRef, type PointerEvent } from 'react';
import { Code2, ArrowUpRight } from 'lucide-react';

export default function IdentityAssembly({ still }: { still: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  function tilt(e: PointerEvent<HTMLDivElement>) {
    if (still || e.pointerType !== 'mouse') return;
    const rect = e.currentTarget.getBoundingClientRect();
    ref.current?.style.setProperty('--tilt-x', `${-(e.clientY - rect.top - rect.height / 2) / rect.height * 7}deg`);
    ref.current?.style.setProperty('--tilt-y', `${(e.clientX - rect.left - rect.width / 2) / rect.width * 9}deg`);
  }
  function reset() { ref.current?.style.setProperty('--tilt-x', '0deg'); ref.current?.style.setProperty('--tilt-y', '0deg'); }
  return <div className="identity-assembly" ref={ref} onPointerMove={tilt} onPointerLeave={reset}>
    <div className="assembly-coordinate" aria-hidden="true">PERSONAL ARCHIVE<br/>INDONESIA / IN PROGRESS</div>
    <div className="assembly-halo halo-one" aria-hidden="true"/><div className="assembly-halo halo-two" aria-hidden="true"/>
    <div className="assembly-stack">
      <div className="assembly-backplate backplate-two" aria-hidden="true"/>
      <div className="assembly-backplate backplate-one" aria-hidden="true"/>
      <figure className="identity-photo">
        <div className="photo-topline"><span><i/> R_HMT / THE HUMAN BEHIND THE CODE</span><ArrowUpRight size={14}/></div>
        <div className="portrait-window"><img src="/images/pp.webp" width="864" height="1088" alt="Foto asli R_HMT: potret dengan kacamata dan hoodie hitam di samping editor kode" fetchPriority="high"/></div>
        <figcaption><span>Curiosity is personal.</span><span>01 — ORIGIN</span></figcaption>
      </figure>
      <div className="assembly-code" aria-hidden="true"><Code2 size={19}/><span>learn. build.<br/><b>repeat.</b></span><small>HUMAN × AI</small></div>
      <a className="assembly-note" href="#journey"><span>FROM A PHONE<br/>TO AN OPEN WORLD.</span><ArrowUpRight size={17}/></a>
    </div>
    <span className="assembly-axis" aria-hidden="true">IDEA ─── ITERATION ─── IDENTITY</span>
  </div>;
}
