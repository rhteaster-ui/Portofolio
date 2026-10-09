import { useEffect, useRef, useState } from 'react';
import { Mark } from './Primitives';
export default function SplashScreen() {
  const dialog = useRef<HTMLDialogElement>(null);
  const [show, setShow] = useState(false); const [leaving, setLeaving] = useState(false); const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  function finish() { setLeaving(true); try { sessionStorage.setItem('rhmt-intro-v22','seen'); } catch {} timer.current = setTimeout(() => setShow(false), 650); }
  useEffect(() => {
    let seen = false; try { seen = sessionStorage.getItem('rhmt-intro-v22') === 'seen'; } catch {}
    if (seen || location.hash || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    setShow(true); const end = setTimeout(finish, 2300);
    return () => { clearTimeout(end); if (timer.current) clearTimeout(timer.current); };
  }, []);
  useEffect(() => { if (!show) return; const focused = document.activeElement as HTMLElement | null; const old = document.body.style.overflow; document.body.style.overflow = 'hidden'; dialog.current?.showModal(); return () => { document.body.style.overflow = old; focused?.focus({ preventScroll: true }); }; }, [show]);
  if (!show) return null;
  return <dialog ref={dialog} onCancel={e => { e.preventDefault(); finish(); }} className={`intro-screen ${leaving ? 'intro-leaving' : ''}`} aria-label="Intro R_HMT"><div className="intro-horizon"/><div className="intro-orbit" aria-hidden="true"><i/><i/><i/></div><div className="intro-center"><Mark/><p>R_HMT / PERSONAL ARCHIVE</p><h2><span>Learning</span><span>in Progress.</span></h2><div className="intro-sequence" aria-hidden="true"><span>IDEAS</span><span>EXPERIMENTS</span><span>STILL LEARNING</span></div></div><button className="intro-skip" onClick={finish}>Lewati intro ↗</button><span className="intro-label">WELCOME TO MY CORNER OF THE INTERNET</span></dialog>;
}
