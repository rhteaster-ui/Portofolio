import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { JOURNEY_STEPS } from '../data';
import { Chapter } from './Primitives';
export default function Journey() {
  const [phase, setPhase] = useState(0);
  const current = JOURNEY_STEPS[phase];
  return <section className="journey section-pad" id="journey" aria-labelledby="journey-title"><div className="wrap"><Chapter number="02">THE EVOLUTION / 6 CHAPTERS</Chapter><div className="section-heading"><h2 id="journey-title">Dari tugas sekolah.<br/><em>Lalu keterusan.</em></h2><p>Pilih titik perjalanan untuk membuka konteksnya.<br/>Masih banyak yang perlu dipelajari.</p></div><div className="journey-layout">
    <aside className="journey-art"><div className="journey-device" data-spatial="journey" data-phase={phase}><div className="spatial-fallback journey-fallback"><div className="fallback-phone"><span>chapter / 0{phase + 1}</span><strong>{current.techKeywords[0]}</strong><small>still learning();</small></div></div></div><div className="journey-route" aria-label="Pilih fase perjalanan">{JOURNEY_STEPS.map((j, i) => <button key={j.phase} onClick={() => setPhase(i)} aria-label={`Fase ${i + 1}: ${j.title}`} aria-pressed={phase === i}>{String(i + 1).padStart(2,'0')}</button>)}</div><div className="journey-device-note"><span>OPPO A3S / PERANGKAT AWAL</span><a className="text-link" href={phase < 3 ? '#ecosystem' : '#archive'}>{phase < 3 ? 'Jelajahi tools yang dicoba' : 'Lihat arsip eksperimen'}<ArrowRight size={15}/></a></div></aside>
    <div className="journey-timeline">{JOURNEY_STEPS.map((j, i) => <details key={j.phase} className={`journey-step ${phase === i ? 'journey-selected' : ''}`} open={phase === i}><summary onClick={e => { e.preventDefault(); setPhase(i); }}><span className="phase-number">0{i + 1}</span><span><small>{j.phase.split('—')[1]?.trim() || j.phase}</small><h3>{j.title}</h3></span><span className="details-plus">+</span></summary><div className="journey-details"><p className="journey-subtitle">{j.subtitle}</p><p>{j.description}</p><div className="tag-list">{j.techKeywords.map(t => <span key={t}>{t}</span>)}</div>{j.environment && <p className="device-note">Perangkat awal: {j.environment.device} · {j.environment.learning}</p>}</div></details>)}</div>
  </div></div></section>;
}
