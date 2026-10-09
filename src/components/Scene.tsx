import { useEffect, useRef, useState } from 'react';
import { Pause, Play } from 'lucide-react';
import { useMotion } from '../hooks/useMotion';
import { Mark } from './Primitives';
import IdentityAssembly from './IdentityAssembly';
export const ORBIT_NODES = [{ name: 'ChatGPT', short: '✳', group: 0 }, { name: 'Codex', short: '</>', group: 1 }, { name: 'Vercel', short: '▲', group: 2 }, { name: 'Termux', short: '>_', group: 3 }];
export default function Scene({ mode, onSelect, paused: externalPause = false }: { mode: 'hero' | 'orbit'; onSelect?: (group: number) => void; paused?: boolean }) {
  const host = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const reduced = useMotion();
  const pauseRef = useRef(false); pauseRef.current = paused || externalPause;
  useEffect(() => {
    if (reduced || !host.current || !canvas.current) return;
    const connection = (navigator as any).connection;
    if (connection?.saveData || ((navigator as any).deviceMemory && (navigator as any).deviceMemory <= 2)) return;
    let stopped = false;
    let cleanup: (() => void) | undefined;
    const observer = new IntersectionObserver(async entries => {
      if (!entries[0].isIntersecting || cleanup) return;
      observer.disconnect();
      try {
        const { mountScene } = await import('../scenes/engine');
        if (stopped || !canvas.current || !host.current) return;
        cleanup = mountScene(canvas.current, host.current, mode, () => pauseRef.current, () => { setFailed(true); setReady(false); });
        setReady(true);
      } catch { if (!stopped) setFailed(true); }
    }, { rootMargin: '120px' });
    observer.observe(host.current);
    return () => { stopped = true; observer.disconnect(); cleanup?.(); setReady(false); };
  }, [mode, reduced]);
  return <div ref={host} className={`scene scene-${mode} ${ready && !failed ? 'scene-ready' : ''} ${paused || externalPause || reduced ? 'scene-paused' : ''}`}>
    {mode === 'hero' ? <IdentityAssembly still={paused || externalPause || reduced}/> : <div className="orbit-poster" aria-hidden="true"><svg viewBox="0 0 600 520"><ellipse cx="300" cy="260" rx="255" ry="120" transform="rotate(-28 300 260)"/><ellipse cx="300" cy="260" rx="245" ry="108" transform="rotate(40 300 260)"/><ellipse cx="300" cy="260" rx="215" ry="145" transform="rotate(90 300 260)"/></svg><span><Mark/>R_HMT</span></div>}
    <div ref={canvas} className="scene-canvas" aria-hidden="true"/>
    {mode === 'orbit' && <div className="orbit-nodes">{ORBIT_NODES.map((node, i) => <button type="button" key={node.name} data-orbit-node={i} className={`orbit-node orbit-node-${i}`} onClick={() => onSelect?.(node.group)} onFocus={() => onSelect?.(node.group)} aria-label={`Lihat ${node.name} dan kelompok ${['AI Tools', 'Builders', 'Infrastructure', 'Environment'][i]}`}><span aria-hidden="true">{node.short}</span><small>{node.name}</small></button>)}</div>}
    <div className="scene-footnote"><span>{mode === 'hero' ? 'FIG. 01 — THE ORIGIN / R_HMT' : 'FIG. 02 — A CONNECTED ECOSYSTEM'}</span>{!reduced && (mode === 'hero' || (ready && !failed)) ? <button className="motion-toggle" onClick={() => setPaused(x => !x)} aria-label={paused ? 'Lanjutkan animasi' : 'Jeda animasi'} aria-pressed={paused}>{paused ? <Play size={12}/> : <Pause size={12}/>}<span>{paused ? 'Play' : 'Pause'}</span></button> : <span className="static-label">STATIC VIEW</span>}</div>
  </div>;
}
