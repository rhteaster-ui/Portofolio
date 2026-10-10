import { useRef, useState, type PointerEvent } from 'react';
import { Layers3 } from 'lucide-react';
import ToolIcon from './ToolIcon';
const technologies=[
  {name:'React',icon:'react',role:'INTERFACE',detail:'Komponen, state interaksi, dan hydration dari HTML yang sudah diprerender.'},
  {name:'Vite',icon:'vite',role:'BUILD',detail:'Build produksi, bundling modul, dan pemrosesan aset portofolio.'},
  {name:'TypeScript',icon:'typescript',role:'TYPES',detail:'Tipe untuk komponen, data proyek, dan interaksi frontend.'},
  {name:'CSS + SVG',icon:null,role:'MOTION',detail:'Perspektif, material kaca, choreography scroll, dan jalur orbit tanpa WebGL di runtime.'},
  {name:'Upstash',icon:'upstash',role:'RATINGS',detail:'Redis melalui REST untuk rating, komentar, dan pembatasan spam saat dikonfigurasi.'},
  {name:'Node.js',icon:'nodedotjs',role:'FUNCTIONS',detail:'Fungsi serverless untuk endpoint chat dan rating, serta script build/prerender.'},
  {name:'Vercel',icon:'vercel',role:'DEPLOY',detail:'Target deployment untuk frontend statis dan fungsi API portofolio.'},
  {name:'REST API',icon:null,role:'RELAY',detail:'Fetch ke API chat dan rating; integrasi provider lewat endpoint sederhana.'}
];
export default function TechnologyStack({paused}:{paused:boolean}){
  const host=useRef<HTMLDivElement>(null),[selected,setSelected]=useState<number|null>(null),[expanded,setExpanded]=useState(false);
  function tilt(e:PointerEvent<HTMLDivElement>){if(paused||e.pointerType!=='mouse')return;const r=e.currentTarget.getBoundingClientRect();host.current?.style.setProperty('--tech-rx',`${-(e.clientY-r.top-r.height/2)/r.height*5}deg`);host.current?.style.setProperty('--tech-ry',`${(e.clientX-r.left-r.width/2)/r.width*6}deg`);}
  function reset(){host.current?.style.setProperty('--tech-rx','0deg');host.current?.style.setProperty('--tech-ry','0deg');}
  return <div className={`technology-stack ${expanded?'tech-stack-expanded':''}`} data-paused={paused}>
    <div className="tech-stage" ref={host} onPointerMove={tilt} onPointerLeave={reset}>
      <div className="tech-assembly">
        <div className="tech-substrate" aria-hidden="true"><span/><span/><span/></div>
        <svg className="tech-traces" viewBox="0 0 400 430" aria-hidden="true">{technologies.map((_,i)=>{const x=i<4?80:320,y=78+(i%4)*86;return <g key={i} className={selected===i?'tech-trace-selected':''} style={{animationDelay:`${-i*.7}s`}}><path d={`M200 205H${i<4?142:258}V${y}H${x}`} className="tech-trace-base"/><path d={`M200 205H${i<4?142:258}V${y}H${x}`} className="tech-trace-signal"/></g>;})}</svg>
        <div className="tech-hub"><div className="tech-hub-layers" aria-hidden="true"><span/><span/></div><a href="https://github.com/rahmat-369" target="_blank" rel="noopener noreferrer" aria-label="Profil GitHub R_HMT"><ToolIcon name="GitHub"/><strong>GitHub</strong><span>SOURCE / R_HMT</span></a></div>
        {technologies.map((t,i)=><button className={`tech-tile ${selected===i?'tech-selected':''}`} key={t.name} style={{left:`${i<4?20:80}%`,top:`${(78+i%4*86)/430*100}%`,animationDelay:`${-i*.9}s`}} onClick={()=>setSelected(v=>v===i?null:i)} aria-pressed={selected===i} aria-label={`Peran ${t.name}`}>
          {t.icon?<ToolIcon name={t.icon==='nodedotjs'?'nodedotjs':t.name}/>:<svg className="tech-code-symbol" viewBox="0 0 32 32" aria-hidden="true">{i===3?<><path d="m11 8-7 8 7 8m10-16 7 8-7 8M18 5l-4 22"/></>:<><path d="M5 9h22M5 16h22M5 23h22"/><circle cx="10" cy="9" r="3"/><circle cx="23" cy="16" r="3"/><circle cx="14" cy="23" r="3"/></>}</svg>}
          <span>{t.name}</span><small>{t.role}</small>
        </button>)}
        <div className="tech-pipeline" aria-label="Alur: Source, Build, Deploy"><span>01 / SOURCE</span><span>02 / BUILD</span><span>03 / DEPLOY</span></div>
      </div>
    </div>
    <div className="tech-stack-footer"><span>BUILT INTO THIS PORTFOLIO</span><button onClick={()=>setExpanded(v=>!v)} aria-pressed={expanded}><Layers3 size={14}/>{expanded?'Rapatkan layer':'Pisahkan layer'}</button></div>
    <div className="tech-description" aria-live="polite"><strong>{selected===null?'Under the glass.':technologies[selected].name}</strong><p>{selected===null?'Pilih teknologi untuk melihat perannya. Stack implementasi ini berbeda dari daftar tools yang pernah aku eksplorasi.':technologies[selected].detail}</p></div>
  </div>;
}
