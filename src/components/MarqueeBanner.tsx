// PATH: src/components/Services.tsx
import { useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SectionLabel, SectionHeading } from './ui/SectionHeading';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    number: '01',
    title: 'Ostéopathie structurelle',
    description:
      "Traitement précis des restrictions articulaires, musculaires et ligamentaires. Indiqué pour les lombalgies, cervicalgies, douleurs dorsales et séquelles de traumatismes. La mobilisation ciblée des vertèbres et des articulations périphériques restaure le mouvement et libère les tensions.",
    image:
      'https://images.pexels.com/photos/8436489/pexels-photo-8436489.jpeg?auto=compress&cs=tinysrgb&w=800',
    tag: 'Douleurs & mobilité',
  },
  {
    number: '02',
    title: 'Ostéopathie crânio-sacrée',
    description:
      "Approche infiniment douce agissant sur les membranes méningées et les rythmes du liquide céphalo-rachidien. Particulièrement efficace pour les migraines chroniques, le stress profond, les troubles du sommeil et les suites de chocs émotionnels ou physiques.",
    image:
      'https://images.pexels.com/photos/5699514/pexels-photo-5699514.jpeg?auto=compress&cs=tinysrgb&w=800',
    tag: 'Système nerveux & détente',
  },
  {
    number: '03',
    title: 'Ostéopathie viscérale',
    description:
      "Travail manuel sur les organes digestifs, respiratoires et génitaux et leurs attaches ligamentaires. Soulage les troubles fonctionnels intestinaux, les reflux, les constipations chroniques et participe à la régulation hormonale et immunitaire.",
    image:
      'https://images.pexels.com/photos/6551173/pexels-photo-6551173.jpeg?auto=compress&cs=tinysrgb&w=800',
    tag: 'Digestion & organes',
  },
];

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Header reveal
      gsap.from('[data-services-header]', {
        opacity: 0,
        y: 30,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: { trigger: '[data-services-header]', start: 'top 85%', once: true },
      });

      // Cards stagger
      gsap.from('.service-card', {
        opacity: 0,
        y: 50,
        duration: 0.85,
        stagger: 0.18,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.service-card',
          start: 'top 88%',
          once: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="soins" ref={sectionRef} className="py-28 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div data-services-header className="text-center mb-18">
          <SectionLabel>Nos soins</SectionLabel>
          <SectionHeading className="text-4xl md:text-5xl max-w-xl mx-auto mt-3">
            Des soins adaptés à{' '}
            <em className="font-semibold not-italic" style={{ fontFamily: 'var(--font-display)' }}>
              chaque patient
            </em>
          </SectionHeading>
          <p
            className="mt-5 text-stone-400 text-sm max-w-md mx-auto leading-relaxed"
            style={{ fontFamily: 'var(--font-body)', fontWeight: 300 }}
          >
            Trois approches complémentaires pour traiter non seulement la douleur,
            mais aussi ses causes profondes.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mt-14">
          {services.map((s) => (
            <div key={s.title} className="service-card group flex flex-col">
              {/* Image */}
              <div className="relative overflow-hidden h-64">
                <img
                  src={s.image}
                  alt={s.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-ink)]/40 to-transparent" />
                <span
                  className="absolute top-4 right-4 bg-[var(--color-cream)]/90 text-[10px] px-3 py-1.5 uppercase tracking-widest text-stone-600"
                  style={{ fontFamily: 'var(--font-body)' }}
                >
                  {s.tag}
                </span>
                <span
                  className="absolute bottom-4 left-4 text-stone-300/50 text-5xl font-display font-light leading-none"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  {s.number}
                </span>
              </div>

              {/* Content */}
              <div className="border border-stone-100 border-t-0 p-6 flex flex-col flex-1 bg-[var(--color-cream)]">
                <h3
                  className="text-xl text-stone-800 mb-3"
                  style={{ fontFamily: 'var(--font-display)', fontWeight: 500 }}
                >
                  {s.title}
                </h3>
                <p
                  className="text-[13px] text-stone-500 leading-relaxed flex-1"
                  style={{ fontFamily: 'var(--font-body)', fontWeight: 300 }}
                >
                  {s.description}
                </p>
                <a
                  href="#contact"
                  className="mt-5 inline-flex items-center gap-2 text-[11px] uppercase tracking-widest text-stone-600 hover:text-stone-900 transition-colors group/link"
                  style={{ fontFamily: 'var(--font-body)' }}
                >
                  Prendre rendez-vous
                  <ArrowRight
                    size={12}
                    className="group-hover/link:translate-x-1 transition-transform"
                  />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}