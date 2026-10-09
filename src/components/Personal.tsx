import { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { ANIME } from '../data/anime';
import { Chapter, ExternalLink, Modal } from './Primitives';
import VideoPlayer from './VideoPlayer';
export default function Personal() {
  const [active, setActive] = useState<(typeof ANIME)[number] | null>(null);
  return <section className="personal section-pad" id="universe" aria-labelledby="universe-title"><div className="wrap">
    <Chapter number="07">THE PERSONAL UNIVERSE</Chapter>
    <div className="section-heading"><h2 id="universe-title">Beyond the code.<br/><em>A little more me.</em></h2><p>Selain teknologi, i juga suka anime, terutama Classroom of the Elite. Elaina jadi favorit utama, bareng Arisu Sakayanagi dan Hiyori Shiina.</p></div>
    <div className="anime-gallery">{ANIME.map((a, i) => <button className={`anime-card anime-${a.id}`} key={a.id} onClick={() => setActive(a)} aria-label={`Tentang ${a.name}`}><div className="anime-watermark" aria-hidden="true">{a.id === 'elaina' ? '旅' : a.id === 'arisu' ? '知' : '静'}</div><span className="anime-number">0{i + 1} / {i === 0 ? 'THE FAVORITE' : 'THE COLLECTION'}</span><img src={a.image} alt={`${a.name} — referensi pilihan R_HMT`} loading="lazy" width="600" height="900"/><div className="anime-label"><span>{a.label}</span><h3>{a.name}</h3><p>{a.origin}</p></div><span className="anime-arrow"><ArrowUpRight size={19}/></span></button>)}</div>
    <figure className="royal-scene"><img src="/images/anime-v22/duo.jpg" alt="Ayanokouji dan Arisu Sakayanagi — referensi visual Kings & Queen" width="1200" height="675" loading="lazy"/><figcaption><span className="eyebrow">THE PERSONAL COLLECTION / COTE</span><h3>Kings <em>&</em> Queen.</h3><p>Ayanokouji × Arisu Sakayanagi</p><a href="https://id.pinterest.com/pin/1090363759772416739/" target="_blank" rel="noopener noreferrer">Referensi pilihan ↗</a></figcaption><span className="chess-piece chess-king" aria-hidden="true">♚</span><span className="chess-piece chess-queen" aria-hidden="true">♛</span></figure>
    <div className="video-section"><div className="video-story"><p className="eyebrow">ON REPEAT / FAVORITE ANIME</p><h3>Classroom<br/>of the <em>Elite.</em></h3><p>Salah satu edit COTE yang i suka. Diputar otomatis dan berulang; suara bisa diaktifkan lewat kontrol video.</p><span className="micro-note">FAN EDIT / VIDEO PILIHAN PRIBADI</span></div><VideoPlayer/></div>
    <p className="art-credit">Referensi visual pilihan dari Pinterest; karakter: <a href="https://majotabi.jp/" target="_blank" rel="noopener noreferrer">Majo no Tabitabi</a> & <a href="https://you-zitsu.com/character.html" target="_blank" rel="noopener noreferrer">Classroom of the Elite</a>. Hak karakter dan ilustrasi tetap pada kreator masing-masing.</p>
    {active && <Modal label={active.name} onClose={() => setActive(null)} className="anime-modal"><img src={active.image} alt={active.name} width="600" height="900"/><div><p className="eyebrow">{active.origin}</p><h2>{active.name}</h2><p>{active.note}</p><ExternalLink href={active.source} className="text-link">Sumber referensi gambar</ExternalLink></div></Modal>}
  </div></section>;
}
