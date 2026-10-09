import { useEffect } from 'react';

/** Event-driven motion: no continuous page-level render loop or scroll hijacking. */
export function useExperience(enabled: boolean) {
  useEffect(() => {
    const root = document.documentElement;
    root.dataset.motion = enabled ? 'on' : 'off';
    const hero = document.querySelector<HTMLElement>('.hero');
    const journey = document.querySelector<HTMLElement>('.journey');
    let frame = 0;
    const update = () => {
      frame = 0;
      const range = root.scrollHeight - innerHeight;
      root.style.setProperty('--read-progress', `${range > 0 ? scrollY / range : 0}`);
      if (!enabled) return;
      const rect = hero?.getBoundingClientRect();
      hero?.style.setProperty('--hero-scroll', String(Math.min(1, Math.max(0, -(rect?.top || 0) / (rect?.height || 1)))));
      const jr = journey?.getBoundingClientRect();
      if (jr) journey?.style.setProperty('--journey-progress', String(Math.min(1, Math.max(0, (innerHeight * .65 - jr.top) / jr.height))));
    };
    const request = () => { if (!frame) frame = requestAnimationFrame(update); };
    window.addEventListener('scroll', request, { passive: true });
    window.addEventListener('resize', request);
    update();
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (entry.isIntersecting) { entry.target.classList.add('is-revealed'); observer.unobserve(entry.target); }
      }
    }, { threshold: .08 });
    const targets = document.querySelectorAll('.section-heading, .about-grid, .journey-step, .lab-layout, .anime-gallery, .ethos blockquote');
    if (enabled) targets.forEach(el => { el.classList.add('reveal-ready'); observer.observe(el); });
    return () => {
      cancelAnimationFrame(frame); observer.disconnect();
      window.removeEventListener('scroll', request); window.removeEventListener('resize', request);
      targets.forEach(el => el.classList.remove('reveal-ready'));
    };
  }, [enabled]);
}
