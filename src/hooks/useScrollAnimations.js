import { useEffect } from 'react';

export function useScrollAnimations() {
  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) return undefined;

    let gsapContext;
    let cancelled = false;
    let idleId;
    let timerId;

    const runAnimations = async () => {
      const [{ default: gsap }, scrollModule] = await Promise.all([import('gsap'), import('gsap/ScrollTrigger')]);
      if (cancelled) return;

      const ScrollTrigger = scrollModule.ScrollTrigger;
      gsap.registerPlugin(ScrollTrigger);

      gsapContext = gsap.context(() => {
        gsap.utils.toArray('[data-reveal]').forEach((element) => {
          gsap.fromTo(
            element,
            { autoAlpha: 0, y: 42, filter: 'blur(10px)' },
            {
              autoAlpha: 1,
              y: 0,
              filter: 'blur(0px)',
              duration: 0.9,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: element,
                start: 'top 82%',
                once: true,
              },
            },
          );
        });

        gsap.utils.toArray('[data-meter-card]').forEach((element) => {
          ScrollTrigger.create({
            trigger: element,
            start: 'top 84%',
            once: true,
            onEnter: () => element.classList.add('meter-ready'),
          });
        });

        gsap.utils.toArray('[data-timeline-item]').forEach((element, index) => {
          gsap.fromTo(
            element,
            { autoAlpha: 0, x: index % 2 === 0 ? -42 : 42 },
            {
              autoAlpha: 1,
              x: 0,
              duration: 0.85,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: element,
                start: 'top 78%',
                once: true,
              },
            },
          );
        });
      });
    };

    if ('requestIdleCallback' in window) {
      idleId = window.requestIdleCallback(runAnimations, { timeout: 1600 });
    } else {
      timerId = window.setTimeout(runAnimations, 900);
    }

    return () => {
      cancelled = true;
      if (idleId) window.cancelIdleCallback(idleId);
      if (timerId) window.clearTimeout(timerId);
      gsapContext?.revert();
    };
  }, []);
}
