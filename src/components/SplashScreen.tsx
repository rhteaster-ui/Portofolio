import { useEffect, useRef, useState } from 'react';
import { Mark } from './Primitives';
export default function SplashScreen() {
  const dialog = useRef<HTMLDialogElement>(null); const closed = useRef(false);
  const loadTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined); const exitTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const deadline = useRef<ReturnType<typeof setTimeout> | undefined>(undefined); const stopReadiness = useRef<(() => void) | undefined>(undefined);
  const [show, setShow] = useState(false); const [leaving, setLeaving] = useState(false); const [loaded, setLoaded] = useState(0);
  function finish() {
    if (closed.current) return; closed.current = true; clearTimeout(loadTimer.current);clearTimeout(deadline.current);stopReadiness.current?.();setLeaving(true);
    try { sessionStorage.setItem('rhmt-intro-v23','seen'); } catch {}
    exitTimer.current = setTimeout(() => { setShow(false); document.documentElement.removeAttribute('data-intro'); window.dispatchEvent(new Event('rhmt:intro-complete')); }, 650);
  }
  useEffect(() => {
    let seen = false; try { seen = sessionStorage.getItem('rhmt-intro-v23') === 'seen'; } catch {}
    if (seen || location.hash || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    closed.current = false;
    let active = true; const start = performance.now();setLoaded(0);setLeaving(false);setShow(true); document.documentElement.dataset.intro = 'on';
    const image = (src: string) => new Promise<void>(resolve => { const i = new Image(); i.onload = i.onerror = () => resolve(); i.src = src; });
    const spatialReady=new Promise<void>(resolve=>{
      const root=document.documentElement;const observer=new MutationObserver(check);
      function done(){observer.disconnect();resolve();}
      function check(){if(['ready','unavailable'].includes(root.dataset.spatial||''))done();}
      stopReadiness.current=done;observer.observe(root,{attributes:true,attributeFilter:['data-spatial']});check();
    });
    const pieces = [image('/images/pp.webp'),image('/images/pp-dev.webp'),document.fonts.ready,spatialReady];
    Promise.all(pieces.map(p => Promise.resolve(p).then(() => { if (active&&!closed.current) setLoaded(n => n + 1); }))).then(() => {
      if (active&&!closed.current)loadTimer.current=setTimeout(finish,Math.max(1500,2800-(performance.now()-start)));
    });
    deadline.current = setTimeout(finish, 6000);
    return () => { active = false;stopReadiness.current?.();clearTimeout(deadline.current);clearTimeout(loadTimer.current);clearTimeout(exitTimer.current);document.documentElement.removeAttribute('data-intro'); };
  }, []);
  useEffect(() => {
    if (!show) return;
    const old = document.body.style.overflow; const focused = document.activeElement as HTMLElement | null;
    document.body.style.overflow = 'hidden'; dialog.current?.showModal();
    return () => { dialog.current?.close(); document.body.style.overflow = old; focused?.focus({ preventScroll: true }); };
  }, [show]);
  if (!show) return null;
  return <dialog ref={dialog} className={`intro-screen ${leaving ? 'intro-leaving' : ''}`} aria-label="Intro R_HMT" onCancel={e => { e.preventDefault(); finish(); }}><div className="intro-stage" data-spatial="intro" data-leaving={leaving}><div className="spatial-fallback intro-fallback"><Mark/></div></div><div className="intro-copy"><p className="eyebrow">R_HMT / PERSONAL ARCHIVE</p><h2>Learning <em>in Progress.</em></h2><div className="intro-load" role="progressbar" aria-label="Memuat aset utama dan scene" aria-valuemin={0} aria-valuemax={4} aria-valuenow={loaded}><span style={{ transform: `scaleX(${loaded / 4})` }}/></div><span>OPENING A SPACE FOR IDEAS.</span></div><button className="intro-skip" onClick={finish}>Lewati intro ↗</button></dialog>;
}
