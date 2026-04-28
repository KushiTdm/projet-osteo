// PATH: src/components/About.tsx
import { useEffect, useRef } from 'react';
import { CheckCircle2 } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SectionLabel, SectionHeading, Divider } from './ui/SectionHeading';

gsap.registerPlugin(ScrollTrigger);

const highlights = [
  'Diplômée du Collège Ostéopathique Européen (D.O.)',
  "Membre de la Chambre Nationale des Ostéopathes",
  'Spécialisée en ostéopathie pédiatrique & du sportif',
  'Formation continue en ostéopathie crânio-sacrée',
  "Plus de 10 ans d'expérience clinique à Paris",
];

const credentials = [
  { label: "Diplôme d'État", value: "D.O. – 2013" },
  { label: 'Spécialisation', value: 'Pédiatrie & Sport' },
  { label: 'Langues', value: 'Français, Anglais' },
];

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Parallax on image
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1.5,
        onUpdate: (self) => {
          if (imgRef.current) {
            const img = imgRef.current.querySelector('img');
            if (img) gsap.set(img, { y: (self.progress - 0.5) * 60 });
          }
        },
      });

      // Text reveal
      gsap.from('[data-about-text] > *', {
        opacity: 0,
        x: 40,
        duration: 0.8,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '[data-about-text]',
          start: 'top 80%',
          once: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="propos" ref={sectionRef} className="bg-stone-50 overflow-hidden">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 min-h-[75vh]">
        {/* Image */}
        <div ref={imgRef} className="relative h-80 md:h-auto overflow-hidden">
          <img
            src="/assets/Osteopathe_arthur.png"
            alt="Dr Arthur Pales, ostéopathe à Paris"
            className="absolute inset-0 w-full h-full object-cover object-top"
          />
          {/* Subtle tint */}
          <div className="absolute inset-0 bg-[var(--color-sage)]/10" />

          {/* Credential cards */}
          <div className="absolute bottom-6 right-6 space-y-2 hidden md:block">
            {credentials.map((c) => (
              <div
                key={c.label}
                className="bg-white/92 backdrop-blur-sm px-4 py-3 text-right shadow-sm"
              >
                <p
                  className="text-[9px] uppercase tracking-widest text-stone-400"
                  style={{ fontFamily: 'var(--font-body)' }}
                >
                  {c.label}
                </p>
                <p
                  className="text-sm text-[var(--color-ink)]"
                  style={{ fontFamily: 'var(--font-display)', fontWeight: 500 }}
                >
                  {c.value}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Text */}
        <div
          data-about-text
          className="flex flex-col justify-center px-8 md:px-14 py-20"
        >
          <SectionLabel>Votre ostéopathe</SectionLabel>
          <SectionHeading className="text-4xl md:text-5xl mt-1">
            Bonjour, je suis{' '}
            <em
              className="font-semibold not-italic"
              style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic' }}
            >
              Arthur Pales
            </em>
          </SectionHeading>

          <Divider />

          <p
            className="text-stone-500 text-sm leading-relaxed mb-4"
            style={{ fontFamily: 'var(--font-body)', fontWeight: 300 }}
          >
            Convaincue que chaque corps possède une capacité naturelle d'autorégulation, j'ai
            fondé ce cabinet avec une vision holistique du soin : traiter l'individu dans sa
            globalité, et non le simple symptôme.
          </p>
          <p
            className="text-stone-500 text-sm leading-relaxed mb-8"
            style={{ fontFamily: 'var(--font-body)', fontWeight: 300 }}
          >
            Mon approche conjugue techniques structurelles, crâniennes et viscérales. Chaque
            consultation commence par une anamnèse approfondie, car comprendre votre histoire
            est la première étape vers une guérison durable.
          </p>

          <ul className="space-y-2.5 mb-10">
            {highlights.map((h) => (
              <li
                key={h}
                className="flex items-start gap-3 text-[13px] text-stone-600"
                style={{ fontFamily: 'var(--font-body)' }}
              >
                <CheckCircle2
                  size={15}
                  className="mt-0.5 shrink-0"
                  style={{ color: 'var(--color-sage)' }}
                />
                {h}
              </li>
            ))}
          </ul>

          <a
            href="#contact"
            className="inline-block self-start bg-[var(--color-ink)] text-[var(--color-cream)] text-[11px] px-8 py-4 uppercase tracking-widest hover:bg-stone-700 transition-colors"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            Prendre rendez-vous
          </a>
        </div>
      </div>
    </section>
  );
}