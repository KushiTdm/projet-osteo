// PATH: src/components/Hero.tsx
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowDown } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: '+2 400', label: 'Patients accompagnés' },
  { value: '10 ans', label: "D'expérience clinique" },
  { value: '98 %', label: 'Taux de satisfaction' },
];

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Staggered entrance
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.from('[data-hero-label]', { opacity: 0, y: 16, duration: 0.7 })
        .from('[data-hero-title] .line-inner', { opacity: 0, y: '100%', duration: 1, stagger: 0.15 }, '-=0.3')
        .from('[data-hero-desc]', { opacity: 0, y: 20, duration: 0.8 }, '-=0.5')
        .from('[data-hero-btns]', { opacity: 0, y: 16, duration: 0.7 }, '-=0.5')
        .from('[data-hero-stats] .stat-item', { opacity: 0, y: 20, duration: 0.6, stagger: 0.1 }, '-=0.4')
        .from(imageRef.current, { opacity: 0, scale: 1.04, duration: 1.4, ease: 'power2.out' }, '-=1.2')
        .from(overlayRef.current, { opacity: 0, x: 30, duration: 0.7 }, '-=0.4');

      // Parallax on image
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: 1,
        onUpdate: (self) => {
          if (imageRef.current) {
            gsap.set(imageRef.current.querySelector('img'), {
              y: self.progress * 80,
            });
          }
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="accueil"
      ref={sectionRef}
      className="relative bg-[var(--color-cream)] overflow-hidden"
    >
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 min-h-[90vh]">
        {/* Text side */}
        <div className="flex flex-col justify-center px-8 py-20 md:py-32 md:pr-16 order-2 md:order-1">
          <p
            data-hero-label
            className="text-[10px] tracking-[0.35em] uppercase text-[var(--color-sage)] mb-5"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            Ostéopathie · Santé · Bien-être
          </p>

          <h1
            data-hero-title
            className="text-5xl md:text-6xl lg:text-7xl leading-[1.05] mb-7"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            <div className="line-reveal"><span className="line-inner inline-block">Retrouvez</span></div>
            <div className="line-reveal"><span className="line-inner inline-block font-semibold italic">l'équilibre</span></div>
            <div className="line-reveal"><span className="line-inner inline-block font-light text-stone-500">de votre corps</span></div>
          </h1>

          <p
            data-hero-desc
            className="text-stone-500 leading-relaxed mb-10 max-w-sm text-sm md:text-[15px]"
            style={{ fontFamily: 'var(--font-body)', fontWeight: 300 }}
          >
            Soins ostéopathiques d'excellence au cœur de Paris. Une écoute attentive,
            des techniques douces et précises pour soulager durablement vos douleurs
            et restaurer votre plein potentiel.
          </p>

          <div data-hero-btns className="flex flex-wrap gap-4 mb-14">
            <a
              href="#contact"
              className="bg-[var(--color-ink)] text-[var(--color-cream)] text-[11px] px-8 py-4 uppercase tracking-widest hover:bg-stone-700 transition-colors"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              Prendre rendez-vous
            </a>
            <a
              href="#soins"
              className="border border-stone-300 text-stone-600 text-[11px] px-8 py-4 uppercase tracking-widest hover:bg-stone-100 transition-colors"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              Découvrir nos soins
            </a>
          </div>

          {/* Stats */}
          <div data-hero-stats className="flex flex-wrap gap-8 border-t border-stone-200 pt-8">
            {stats.map((s) => (
              <div key={s.label} className="stat-item">
                <p
                  className="text-2xl text-[var(--color-ink)] mb-0.5"
                  style={{ fontFamily: 'var(--font-display)', fontWeight: 500 }}
                >
                  {s.value}
                </p>
                <p
                  className="text-[11px] text-stone-400 uppercase tracking-widest"
                  style={{ fontFamily: 'var(--font-body)' }}
                >
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Image side */}
        <div ref={imageRef} className="relative order-1 md:order-2 h-72 md:h-auto overflow-hidden">
          <img
            src="/assets/osteopathie-lille_verticale.png"
            alt="Consultation ostéopathique – cabinet OstéoParis"
            className="absolute inset-0 w-full h-full object-cover"
            style={{ transformOrigin: 'center center' }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-ink)]/20 to-transparent" />

          {/* Floating card */}
          <div
            ref={overlayRef}
            className="absolute bottom-8 left-8 bg-white/92 backdrop-blur-sm p-5 shadow-xl hidden md:block border-l-2 border-[var(--color-sage)]"
          >
            <p
              className="text-[10px] uppercase tracking-[0.25em] text-stone-400 mb-1"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              Ouvert du lundi au samedi
            </p>
            <p
              className="text-xl text-[var(--color-ink)]"
              style={{ fontFamily: 'var(--font-display)', fontWeight: 600 }}
            >
              9h – 19h
            </p>
            <p
              className="text-[11px] text-stone-500 mt-1"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              Consultation sur rendez-vous
            </p>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2 text-stone-400">
        <span className="text-[9px] uppercase tracking-widest" style={{ fontFamily: 'var(--font-body)' }}>
          Défiler
        </span>
        <ArrowDown size={14} className="animate-bounce" />
      </div>
    </section>
  );
}