// PATH: src/hooks/useParallax.ts
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ParallaxOptions {
  speed?: number; // positive = slower than scroll, negative = faster
  direction?: 'y' | 'x';
}

export function useParallax<T extends HTMLElement>(options: ParallaxOptions = {}) {
  const ref = useRef<T>(null);
  const { speed = 0.3, direction = 'y' } = options;

  useEffect(() => {
    if (!ref.current) return;

    const el = ref.current;
    const distance = window.innerHeight * speed;

    const st = ScrollTrigger.create({
      trigger: el,
      start: 'top bottom',
      end: 'bottom top',
      scrub: true,
      onUpdate: (self) => {
        const progress = self.progress;
        const value = (progress - 0.5) * distance * 2;
        gsap.set(el, {
          [direction === 'y' ? 'y' : 'x']: value,
          ease: 'none',
        });
      },
    });

    return () => st.kill();
  }, [speed, direction]);

  return ref;
}

export function useScrollReveal() {
  useEffect(() => {
    const elements = document.querySelectorAll('[data-reveal]');

    elements.forEach((el) => {
      const delay = parseFloat((el as HTMLElement).dataset.delay || '0');
      const from = (el as HTMLElement).dataset.from || 'bottom';

      const fromVars: gsap.TweenVars = {
        opacity: 0,
        duration: 0.9,
        delay,
        ease: 'power3.out',
      };

      if (from === 'bottom') fromVars.y = 40;
      if (from === 'left') fromVars.x = -40;
      if (from === 'right') fromVars.x = 40;
      if (from === 'scale') { fromVars.scale = 0.95; fromVars.y = 20; }

      gsap.from(el, {
        ...fromVars,
        scrollTrigger: {
          trigger: el,
          start: 'top 88%',
          once: true,
        },
      });
    });
  }, []);
}