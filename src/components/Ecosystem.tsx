import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, Pause, Play, RotateCcw } from 'lucide-react';
import { ECOSYSTEM, PROJECTS } from '../data';
import { Chapter, Mark } from './Primitives';
import ToolIcon from './ToolIcon';
import { useMotion } from '../hooks/useMotion';
const nodes = ECOSYSTEM.flatMap((g, group) => g.items.map((t, order) => ({ ...t, group, order, count: g.items.length })));
export default function Ecosystem({ paused }: { paused: boolean }) {
  const [group, setGroup] = useState(0); const [selected, select] = useState<string | null>(null); const [localPause, setLocalPause] = useState(false);
  const host = useRef<HTMLDivElement>(null); const angle = useRef(0); const drag = useRef<{ x: number; angle: number } | null>(null); const freeze = useRef(false); const reduced = useMotion();
  const stopped = useRef(false); stopped.current = paused || localPause || reduced;
  const tool = nodes.find(n => n.name === selected);
  const related = tool ? PROJECTS.filter(p => p.ecosystem.some(t => t.toLowerCase() === tool.name.toLowerCase())) : [];
  useEffect(() => {
    const el = host.current; if (!el) return;
    const buttons = Array.from(el.querySelectorAll<HTMLElement>('[data-node]'));
    let frame = 0, previous = 0, visible = false, painted = -Infinity;
    const paint = () => buttons.forEach((button, i) => {
      const n = nodes[i], a = angle.current * (n.group % 2 ? -.72 : 1) + n.order / n.count * Math.PI * 2 + n.group * .52;
      const radius = [20, 29, 38, 46][n.group];
      const x = Math.cos(a) * radius, y = Math.sin(a) * radius * .77;
      button.style.left = `${50 + x}%`; button.style.top = `${48 + y}%`;
      button.style.setProperty('--depth', String(.86 + (Math.sin(a) + 1) * .1));
      button.style.zIndex = String(10 + Math.round(Math.sin(a) * 5));
    });
    const tick = (now: number) => { frame = 0; if (!visible || document.hidden) return;
      if (!stopped.current && !freeze.current && !drag.current) angle.current += Math.min(now - (previous || now), 40) * .00012;
      previous = now; if (painted !== angle.current) { paint(); painted = angle.current; } frame = requestAnimationFrame(tick);
    };
    const start = () => { if (!frame && visible && !document.hidden) { previous = 0; frame = requestAnimationFrame(tick); } };
    const io = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; if (visible) start(); else { cancelAnimationFrame(frame); frame = 0; } });
    const visibility = () => { if (document.hidden) { cancelAnimationFrame(frame); frame = 0; } else start(); };
    paint(); io.observe(el); document.addEventListener('visibilitychange', visibility);
    return () => { cancelAnimationFrame(frame); io.disconnect(); document.removeEventListener('visibilitychange', visibility); };
  }, []);
  function choose(name: string, index: number) { select(name); setGroup(index); }
  return <section className="ecosystem section-pad" id="ecosystem" aria-labelledby="ecosystem-title"><div className="wrap">
    <Chapter number="03">THE ORBIT / 19 TOOLS</Chapter><div className="section-heading"><h2 id="ecosystem-title">Different tools.<br/><em>Masih eksplorasi.</em></h2><p>i cukup sering mencoba tools baru. Belum tentu semuanya dikuasai; yang dicari biasanya relevansi dan implementasinya dalam workflow.</p></div>
    <div className="ecosystem-layout"><div className="orbit-experience"><div ref={host} className="tool-universe" aria-label="Orbit interaktif 19 tools" onPointerEnter={() => { freeze.current = true; }} onPointerLeave={() => { freeze.current = false; }} onFocusCapture={() => { freeze.current = true; }} onBlurCapture={e => { if (!e.currentTarget.contains(e.relatedTarget)) freeze.current = false; }} onPointerDown={e => { if ((e.target as HTMLElement).closest('button')) return; drag.current = { x: e.clientX, angle: angle.current }; e.currentTarget.setPointerCapture(e.pointerId); }} onPointerMove={e => { if (drag.current) angle.current = drag.current.angle + (e.clientX - drag.current.x) * .012; }} onPointerUp={() => { drag.current = null; }} onPointerCancel={() => { drag.current = null; }}>
      {[0,1,2,3].map(i => <div key={i} className={`orbit-lane lane-${i} ${group === i ? 'lane-active' : ''}`} aria-hidden="true"/>)}
      <div className="orbit-heart" aria-hidden="true"><Mark/><span>R_HMT</span></div>
      {nodes.map((node, i) => <button data-node={i} key={node.name} className={`planet ${selected === node.name ? 'planet-selected' : ''} ${group === node.group ? 'planet-category' : ''}`} style={{ left: `${50 + Math.cos(node.order / node.count * Math.PI * 2 + node.group * .52) * [20,29,38,46][node.group]}%`, top: `${48 + Math.sin(node.order / node.count * Math.PI * 2 + node.group * .52) * [20,29,38,46][node.group] * .77}%` }} onClick={() => choose(node.name, node.group)} aria-label={`Jelajahi ${node.name}`} aria-pressed={selected === node.name}><ToolIcon name={node.name}/><span>{node.name}</span></button>)}
    </div><div className="orbit-controls"><span>DRAG TO ORBIT · TAP TO EXPLORE</span><button onClick={() => setLocalPause(v => !v)} aria-label={localPause ? 'Putar orbit' : 'Jeda orbit'} aria-pressed={localPause}>{localPause ? <Play size={15}/> : <Pause size={15}/>}</button><button onClick={() => { angle.current = 0; select(null); }} aria-label="Reset posisi orbit"><RotateCcw size={15}/></button></div></div>
    <div className="ecosystem-panel"><div className="ecosystem-tabs" role="tablist" aria-label="Kelompok teknologi">{ECOSYSTEM.map((g, i) => <button key={g.category} id={`group-tab-${i}`} role="tab" aria-selected={group === i} aria-controls="tool-panel" tabIndex={group === i ? 0 : -1} onClick={() => { setGroup(i); select(null); }} onKeyDown={e => { if (['ArrowLeft','ArrowRight','Home','End'].includes(e.key)) { e.preventDefault(); const n = e.key === 'Home' ? 0 : e.key === 'End' ? 3 : (i + (e.key === 'ArrowLeft' ? 3 : 1)) % 4; setGroup(n); select(null); document.getElementById(`group-tab-${n}`)?.focus(); } }}>{g.category}</button>)}</div>
      {tool && <div className="tool-focus" key={tool.name} aria-live="polite"><ToolIcon name={tool.name}/><div><span className="eyebrow">SELECTED / {ECOSYSTEM[tool.group].category}</span><h3>{tool.name}</h3><p>{tool.description}</p>{related.length > 0 && <div className="tool-projects"><small>TERCATAT DI ARSIP</small>{related.map(p => <a key={p.id} href={`#work-${p.id}`}>{p.name}<ArrowUpRight size={12}/></a>)}</div>}</div></div>}
      <div className="tool-list" id="tool-panel" role="tabpanel" aria-labelledby={`group-tab-${group}`}>{ECOSYSTEM[group].items.map(t => <button className={`tool-row ${selected === t.name ? 'tool-row-selected' : ''}`} key={t.name} onClick={() => select(t.name)}><span className="tool-glyph"><ToolIcon name={t.name}/></span><span><h3>{t.name}</h3><p>{t.description}</p></span><ArrowUpRight size={14}/></button>)}</div><p className="ecosystem-caption">4 kategori · 19 tools. Pilih ikon untuk melihat perannya.</p>
    </div></div>
  </div></section>;
}
