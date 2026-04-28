// PATH: src/components/Testimonials.tsx
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SectionLabel, SectionHeading } from './ui';

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    name: 'Marie L.',
    role: 'Patiente depuis 3 ans',
    quote:
      "Après des années de lombalgies invalidantes, j'ai enfin retrouvé une qualité de vie grâce au suivi du Dr Martin. Son approche globale, son écoute et sa précision font toute la différence. Je ne consulte plus qu'ici.",
    rating: 5,
  },
  {
    name: 'Thomas R.',
    role: 'Triathlète amateur',
    quote:
      "Suivi régulier en tant que sportif. Après une fracture de fatigue du tibia, les séances d'ostéopathie du sportif m'ont permis de reprendre l'entraînement plus tôt que prévu, et sans rechute. Expertise et bienveillance au rendez-vous.",
    rating: 5,
  },
  {
    name: 'Camille D.',
    role: 'Jeune maman, Paris 7e',
    quote:
      "J'ai amené mon fils de 2 mois pour des coliques persistantes. Les résultats ont été visibles dès la première séance. Le Dr Martin prend le temps d'expliquer chaque geste, ce qui est rassurant pour les parents.",
    rating: 5,
  },
  {
    name: 'Jean-Philippe M.',
    role: 'Cadre, télétravail intensif',
    quote:
      "Les douleurs cervicales dues au télétravail avaient envahi mon quotidien. Trois séances ont suffi pour retrouver une mobilité complète. Je recommande ce cabinet les yeux fermés à mes collègues.",
    rating: 5,
  },
];

export default function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Subtle parallax on background
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1,
        onUpdate: (self) => {
          if (bgRef.current) {
            gsap.set(bgRef.current, { y: (self.progress - 0.5) * 40 });
          }
        },
      });

      gsap.from('.testimonial-card', {
        opacity: 0,
        y: 40,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.testimonial-card',
          start: 'top 88%',
          once: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-28 bg-[var(--color-ink)] relative overflow-hidden">
      {/* Subtle background texture */}
      <div
        ref={bgRef}
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
        }}
      />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <SectionLabel light>Témoignages</SectionLabel>
          <SectionHeading light className="text-4xl md:text-5xl mt-1">
            Ce que disent{' '}
            <em
              className="font-semibold"
              style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic' }}
            >
              nos patients
            </em>
          </SectionHeading>
        </div>

        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-5">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="testimonial-card bg-white/5 border border-white/10 p-7 hover:bg-white/8 transition-colors"
            >
              <div className="flex gap-0.5 mb-5">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <span key={i} className="text-amber-400 text-sm">★</span>
                ))}
              </div>
              <p
                className="text-stone-300 text-[13px] leading-relaxed mb-6 italic"
                style={{ fontFamily: 'var(--font-display)', fontWeight: 400 }}
              >
                « {t.quote} »
              </p>
              <div className="border-t border-white/10 pt-4">
                <p
                  className="text-white text-[14px]"
                  style={{ fontFamily: 'var(--font-display)', fontWeight: 500 }}
                >
                  {t.name}
                </p>
                <p
                  className="text-stone-500 text-[11px] mt-0.5 uppercase tracking-widest"
                  style={{ fontFamily: 'var(--font-body)' }}
                >
                  {t.role}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Trust badge */}
        <div className="mt-14 text-center">
          <p
            className="text-stone-500 text-[12px] uppercase tracking-widest"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            Avis vérifiés · Google My Business · 4,9 / 5 — 186 avis
          </p>
        </div>
      </div>
    </section>
  );
}