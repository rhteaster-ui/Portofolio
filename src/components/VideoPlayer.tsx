import { useEffect, useRef, useState } from 'react';
import { Maximize, Pause, Play, RotateCcw, Volume2, VolumeX, LoaderCircle, ExternalLink } from 'lucide-react';
import { VIDEO } from '../data/anime';
const time = (n: number) => `${Math.floor(n / 60)}:${String(Math.floor(n % 60)).padStart(2, '0')}`;
export default function VideoPlayer() {
  const video = useRef<HTMLVideoElement>(null); const frame = useRef<HTMLDivElement>(null);
  const [playing, setPlaying] = useState(false); const [started, setStarted] = useState(false); const [muted, setMuted] = useState(true);
  const [loading, setLoading] = useState(false); const [error, setError] = useState(''); const [duration, setDuration] = useState(0); const [current, setCurrent] = useState(0); const [expanded, setExpanded] = useState(false);
  useEffect(() => {
    const el = video.current; const io = new IntersectionObserver(entries => { if (!entries[0].isIntersecting && el && !el.paused) el.pause(); }, { threshold: 0 }); if (frame.current) io.observe(frame.current);
    const change = () => { if (document.hidden) el?.pause(); }; document.addEventListener('visibilitychange', change);
    const escape = (e: KeyboardEvent) => { if (e.key === 'Escape') setExpanded(false); }; window.addEventListener('keydown', escape);
    return () => { io.disconnect(); document.removeEventListener('visibilitychange', change); window.removeEventListener('keydown', escape); };
  }, []);
  useEffect(() => { if (!expanded) return; const old = document.body.style.overflow; document.body.style.overflow = 'hidden'; return () => { document.body.style.overflow = old; }; }, [expanded]);
  async function toggle() {
    const el = video.current; if (!el) return;
    if (!el.paused) { el.pause(); return; }
    setError(''); setStarted(true); setLoading(true);
    try { if (!el.getAttribute('src')) { el.src = VIDEO.url; el.load(); } await el.play(); }
    catch { setLoading(false); setError('Video belum dapat diputar. Coba lagi atau buka video asli.'); }
  }
  async function fullscreen() {
    if (document.fullscreenElement) { await document.exitFullscreen(); return; }
    try { if (frame.current?.requestFullscreen) await frame.current.requestFullscreen(); else setExpanded(x => !x); }
    catch { setExpanded(x => !x); }
  }
  function retry() { setError(''); const el = video.current; if (el) { el.removeAttribute('src'); el.load(); } void toggle(); }
  return <div className={`video-player ${expanded ? 'video-expanded' : ''}`} ref={frame}>
    <div className="cote-frame">
      <img className={`video-poster ${started && !error ? 'poster-hidden' : ''}`} src={VIDEO.poster} alt="Adegan Classroom of the Elite dari video pilihan R_HMT" width="1280" height="720" loading="lazy"/>
      <video ref={video} className="cote-video" style={{ transform: `translate(-50%, -50%) rotate(${VIDEO.rotation}deg)` }} playsInline muted={muted} preload="none" aria-label="Video fan edit Classroom of the Elite" onPlaying={() => { setPlaying(true); setLoading(false); }} onPause={() => setPlaying(false)} onWaiting={() => setLoading(true)} onLoadedMetadata={e => setDuration(e.currentTarget.duration)} onTimeUpdate={e => setCurrent(e.currentTarget.currentTime)} onEnded={() => { setPlaying(false); setLoading(false); }} onError={() => { setError('Video sedang tidak tersedia. Coba lagi atau buka video asli.'); setLoading(false); setPlaying(false); }}/>
      {!playing && !error && <button className="video-play" aria-label="Putar video Classroom of the Elite" onClick={toggle}>{loading ? <LoaderCircle className="spin" size={28}/> : <Play size={26} fill="currentColor"/>}</button>}
      {error && <div className="video-error" role="alert"><p>{error}</p><button className="button" onClick={retry}><RotateCcw size={16}/>Coba lagi</button><a href={VIDEO.url} target="_blank" rel="noopener noreferrer">Buka video asli <ExternalLink size={14}/></a></div>}
      <span className="video-caption">PERSONAL CUT / COTE</span>
    </div>
    <div className="video-controls"><button onClick={toggle} aria-label={playing ? 'Jeda video' : 'Putar video'}>{playing ? <Pause size={17}/> : <Play size={17}/>}</button><button onClick={() => setMuted(x => !x)} aria-label={muted ? 'Aktifkan suara' : 'Bisukan suara'}>{muted ? <VolumeX size={17}/> : <Volume2 size={17}/>}</button><label className="video-seek"><span className="sr-only">Posisi video</span><input type="range" min="0" max={duration || 1} step="0.1" value={current} disabled={!duration} onChange={e => { if (video.current) { video.current.currentTime = Number(e.target.value); setCurrent(Number(e.target.value)); } }}/></label><span className="video-time">{time(current)} / {time(duration)}</span><button onClick={fullscreen} aria-label="Layar penuh"><Maximize size={17}/></button>{expanded && <button onClick={() => setExpanded(false)} aria-label="Tutup layar penuh">×</button>}</div>
  </div>;
}
