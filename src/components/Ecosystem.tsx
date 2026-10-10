import { useRef, useState } from 'react';
import { ArrowUpRight, Pause, Play, RotateCcw } from 'lucide-react';
import { ECOSYSTEM, PROJECTS } from '../data';
import { Chapter, Mark } from './Primitives';
import ToolIcon from './ToolIcon';
const nodes = ECOSYSTEM.flatMap((g, group) => g.items.map(t => ({ ...t, group })));
export default function Ecosystem({ paused }: { paused: boolean }) {
  const [group, setGroup] = useState(0); const [selected, select] = useState<string | null>(null); const [localPause, setLocalPause] = useState(false); const [reset, setReset] = useState(0);
  const host = useRef<HTMLDivElement>(null);
  const tool = nodes.find(n => n.name === selected);
  const related = tool ? PROJECTS.filter(p => p.ecosystem.some(t => t.toLowerCase() === tool.name.toLowerCase())) : [];
  const choose = (name: string, index: number) => { select(current => current === name ? null : name); setGroup(index); };
  return <section className="ecosystem section-pad" id="ecosystem" aria-labelledby="ecosystem-title"><div className="wrap">
    <Chapter number="03">THE ORBIT / 19 TOOLS</Chapter><div className="section-heading"><h2 id="ecosystem-title">Different tools.<br/><em>Masih eksplorasi.</em></h2><p>i cukup sering mencoba tools baru. Belum tentu semuanya dikuasai; yang dicari biasanya relevansi dan implementasinya dalam workflow.</p></div>
    <div className="ecosystem-layout"><div className="orbit-experience"><div ref={host} className="tool-universe" data-spatial="orbit" data-selected={selected || ''} data-group={group} data-paused={paused || localPause} data-reset={reset} aria-label="Orbit 3D interaktif 19 tools" onKeyDown={e => { if(e.key==='Escape')select(null); }}>
      <div className="orbit-fallback-core spatial-fallback"><Mark/><span>19 tools</span></div>
      {nodes.map((node, i) => <button data-node={i} key={node.name} className={`planet ${selected === node.name ? 'planet-selected' : ''}`} onClick={() => choose(node.name, node.group)} aria-label={`Jelajahi ${node.name}`} aria-pressed={selected === node.name}><ToolIcon name={node.name}/><span>{node.name}</span></button>)}
    </div><div className="orbit-controls"><span>DRAG TO ORBIT · TAP TO EXPLORE</span><button onClick={() => setLocalPause(v => !v)} aria-label={localPause ? 'Putar orbit' : 'Jeda orbit'} aria-pressed={localPause}>{localPause ? <Play size={15}/> : <Pause size={15}/>}</button><button onClick={() => { setReset(v => v + 1); select(null); }} aria-label="Reset posisi orbit"><RotateCcw size={15}/></button></div></div>
    <div className="ecosystem-panel"><div className="ecosystem-tabs" role="tablist" aria-label="Kelompok teknologi">{ECOSYSTEM.map((g, i) => <button key={g.category} id={`group-tab-${i}`} role="tab" aria-selected={group === i} aria-controls="tool-panel" tabIndex={group === i ? 0 : -1} onClick={() => { setGroup(i); select(null); }} onKeyDown={e => { if (['ArrowLeft','ArrowRight','Home','End'].includes(e.key)) { e.preventDefault(); const n = e.key === 'Home' ? 0 : e.key === 'End' ? 3 : (i + (e.key === 'ArrowLeft' ? 3 : 1)) % 4; setGroup(n); select(null); document.getElementById(`group-tab-${n}`)?.focus(); } }}>{g.category}</button>)}</div>
      {tool && <div className="tool-focus" key={tool.name} aria-live="polite"><ToolIcon name={tool.name}/><div><span className="eyebrow">SELECTED / {ECOSYSTEM[tool.group].category}</span><h3>{tool.name}</h3><p>{tool.description}</p>{related.length > 0 && <div className="tool-projects"><small>TERCATAT DI ARSIP</small>{related.map(p => <a key={p.id} href={`#work-${p.id}`}>{p.name}<ArrowUpRight size={12}/></a>)}</div>}</div></div>}
      <div className="tool-list" id="tool-panel" role="tabpanel" aria-labelledby={`group-tab-${group}`}>{ECOSYSTEM[group].items.map(t => <button className={`tool-row ${selected === t.name ? 'tool-row-selected' : ''}`} key={t.name} onClick={() => choose(t.name,group)}><span className="tool-glyph"><ToolIcon name={t.name}/></span><span><h3>{t.name}</h3><p>{t.description}</p></span><ArrowUpRight size={14}/></button>)}</div><p className="ecosystem-caption">4 kategori · 19 tools. Pilih ikon untuk melihat perannya.</p>
    </div></div>
  </div></section>;
}
