import { useEffect, useState } from 'react';
import { ArrowDown, ArrowRight, ArrowUpRight, Menu, X, Github, Send, Code2, Smartphone, Pause, Play } from 'lucide-react';
import { ECOSYSTEM, JOURNEY_STEPS, PROFILE, PROJECTS } from './data';
import { Chapter, ExternalLink, Mark, Modal } from './components/Primitives';
import Scene from './components/Scene';
import SpatialWorld from './components/SpatialWorld';
import RelayMark from './components/RelayMark';
import Ratings from './components/Ratings';
import Archive from './components/Archive';
import Ecosystem from './components/Ecosystem';
import Journey from './components/Journey';
import SplashScreen from './components/SplashScreen';
import AiSandbox from './components/AiSandbox';
import PeopleAndCommunities from './components/PeopleAndCommunities';
import Personal from './components/Personal';
import { useMotion } from './hooks/useMotion';
import { useExperience } from './hooks/useExperience';
const links = [{ id: 'about', name: 'Tentang' }, { id: 'journey', name: 'Perjalanan' }, { id: 'ecosystem', name: 'Ekosistem' }, { id: 'archive', name: 'Karya' }, { id: 'lab', name: 'Relay' }, { id: 'people', name: 'Jejaring' }, { id: 'universe', name: 'Personal' }];
export default function App() {
  const reduced = useMotion(); const [motionPaused, setMotionPaused] = useState(false);
  useExperience(!reduced && !motionPaused);
  const [menu, setMenu] = useState(false); const [current, setCurrent] = useState('home'); const [group, setGroup] = useState(0);
  useEffect(() => {
    const io = new IntersectionObserver(entries => { entries.forEach(e => { if (e.isIntersecting) { setCurrent(e.target.id); document.documentElement.dataset.chapter = e.target.id; } }); }, { rootMargin: '-15% 0px -60% 0px' });
    document.querySelectorAll('main section[id]').forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);
  return <><SpatialWorld/><SplashScreen/><a className="skip-link" href="#main">Lewati ke konten</a><header className="site-header"><div className="header-inner"><a href="#home" className="brand" aria-label="R_HMT, kembali ke awal"><Mark/><span>R_HMT<span className="brand-dot">V2.4.1</span></span></a><nav className="desktop-nav" aria-label="Navigasi utama">{links.filter(l => !['people', 'universe', 'ecosystem'].includes(l.id)).map(l => <a className={current === l.id ? 'nav-active' : ''} href={`#${l.id}`} key={l.id}>{l.name}</a>)}</nav><div className="header-actions"><button className="global-motion" aria-label={motionPaused ? "Aktifkan animasi halaman" : "Jeda animasi halaman"} aria-pressed={motionPaused} onClick={() => setMotionPaused(x => !x)}>{motionPaused ? <Play size={14}/> : <Pause size={14}/>}<span>Motion {motionPaused || reduced ? "off" : "on"}</span></button><a className="header-contact" href="#contact">Let’s connect<ArrowUpRight size={14}/></a><button className="menu-button" onClick={() => setMenu(true)} aria-label="Buka menu navigasi" aria-expanded={menu}><Menu size={21}/></button></div></div></header>
    {menu && <Modal label="Menu navigasi" onClose={() => setMenu(false)} className="navigation-modal"><p className="eyebrow">R_HMT / EXPLORE THE ARCHIVE</p><nav aria-label="Semua bagian">{links.map((l, i) => <a key={l.id} href={`#${l.id}`} onClick={() => setMenu(false)}><span>0{i + 1}</span>{l.name}<ArrowUpRight size={23}/></a>)}<a href="#contact" onClick={() => setMenu(false)}><span>08</span>Kontak<ArrowUpRight size={23}/></a></nav></Modal>}
    <main id="main"><section className="hero" id="home" aria-labelledby="hero-title"><div className="hero-room" aria-hidden="true"/><div className="wrap hero-grid"><div className="hero-copy"><p className="hero-eyebrow"><span className="tiny-square" aria-hidden="true"/>R_HMT / A PERSONAL DIGITAL ARCHIVE</p><h1 id="hero-title"><span>Learning</span><br/><em>in Progress.</em><span className="hero-title-period" aria-hidden="true">↗</span></h1><p className="hero-description">Aku R_HMT. Belajar web development lewat proyek, eksperimen, dan kolaborasi bersama AI. Masih mencari pendekatan yang paling masuk akal.</p><div className="hero-cta"><a className="button button-gold" href="#archive">Jelajahi karya<ArrowUpRight size={17}/></a><a href="#journey" className="text-link">Baca perjalanan<ArrowRight size={16}/></a></div><div className="hero-identity"><span className="identity-line"/><div><strong>SELF-TAUGHT. ALWAYS CURIOUS.</strong><span>Independent developer · Indonesia</span></div></div><div className="hero-inventory" aria-label="Isi portofolio"><a href="#archive"><strong>{PROJECTS.length}</strong><span>Karya & eksperimen</span></a><a href="#ecosystem"><strong>{ECOSYSTEM.reduce((total, category) => total + category.items.length, 0)}</strong><span>Tools yang dicoba</span></a><a href="#journey"><strong aria-hidden="true">∞</strong><span>Masih belajar<span className="sr-only">, perjalanan yang terus berlanjut</span></span></a></div></div><div className="hero-object"><Scene mode="hero" paused={motionPaused}/></div><a className="scroll-note" href="#about"><ArrowDown size={15}/><span>EXPLORE AT YOUR OWN PACE</span></a><span className="hero-corner">AN OPEN-ENDED WORK IN PROGRESS</span></div></section>
    <div className="manifesto-strip"><div className="wrap"><span>CURIOSITY</span><span>↗</span><span>CODE</span><span>↗</span><span>COLLABORATION</span><span>↗</span><span>CONTINUOUS LEARNING</span></div></div>
    <section className="about section-pad light-section" id="about" aria-labelledby="about-title"><div className="wrap about-grid"><div><Chapter number="01" light>BEYOND THE CODE</Chapter><h2 id="about-title">How it started.<br/><em>Sedikit konteks.</em></h2><span className="about-signature">R_hmt.</span></div><div className="about-copy"><p className="lead">{PROFILE.about}</p><p>{PROFILE.motivation}</p><p>{PROFILE.approach}</p><div className="about-values"><span><Smartphone size={18}/>Mobile beginnings</span><span><Code2 size={18}/>Learning by building</span><span><RelayMark/>Human × AI</span></div></div></div></section>
    <Journey/><Ecosystem paused={motionPaused}/>
    <Archive/><AiSandbox/><PeopleAndCommunities/><Personal/>
    <section className="ethos section-pad light-section" id="ethos" aria-labelledby="ethos-title"><div className="wrap"><Chapter number="08" light>THE ETHOS</Chapter><p className="eyebrow" id="ethos-title">A NOTE TO MYSELF</p><blockquote>“Masih belajar.<br/>Masih <em>mencoba.</em>”</blockquote><div className="ethos-bottom"><span className="about-signature">R_hmt.</span><p>{PROFILE.ethos}</p></div></div></section>
    <Ratings/><footer className="footer section-pad" id="contact"><div className="wrap"><p className="eyebrow">HAVE A THOUGHT, AN IDEA, OR JUST A HELLO?</p><div className="footer-heading"><h2>Let’s start<br/><em>a conversation.</em></h2><a href={PROFILE.socials[1].url} className="contact-circle" target="_blank" rel="noopener noreferrer" aria-label="Hubungi R_HMT melalui Telegram"><ArrowUpRight size={40}/></a></div><div className="footer-socials">{PROFILE.socials.map(s => <ExternalLink href={s.url} key={s.name}><span>{s.name}</span><small>{s.handle}</small></ExternalLink>)}</div><div className="footer-bottom"><a href="#home" className="brand"><Mark/><span>R_HMT</span></a><p>© {new Date().getFullYear()} R_HMT OFC.<br/>Catatan proyek dan proses belajar.</p><a href="#home" className="back-top">Kembali ke awal<ArrowUpRight size={16}/></a></div></div></footer>
    </main></>;
}
