// PATH: src/components/Services.tsx
import { useEffect, useRef, useState } from 'react';
import { ArrowRight, ChevronDown, Star, Baby, HeartHandshake, Dumbbell, Home } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SectionLabel, SectionHeading } from './ui/SectionHeading';

gsap.registerPlugin(ScrollTrigger);

// ─── Data ───────────────────────────────────────────────────────────────────

const consultations = [
  {
    id: 'adulte',
    number: '01',
    icon: Star,
    title: "Consultation d’ostéopathie adulte",
    tag: 'Douleurs & mobilité',
    price: '70 – 80 €',
    duration: '45 – 60 min',
    keywords: 'mal de dos · cervicalgie · lombalgie · posture · stress',
    description:
      'Destinée aux adultes souffrant de douleurs du dos, cervicales, lombaires, de tensions musculaires chroniques ou de troubles posturaux liés au travail et au stress. Chaque consultation commence par une anamnèse approfondie pour identifier les causes profondes et non les simples symptômes.',
    details: [
      'Douleurs lombaires et dorsales',
      'Cervicalgies et tensions de nuque',
      'Troubles posturaux (télétravail, sédentarité)',
      'Stress et fatigue chronique',
      'Séquelles de traumatismes (chutes, accidents)',
    ],
    image:
      'https://images.pexels.com/photos/8436489/pexels-photo-8436489.jpeg?auto=compress&cs=tinysrgb&w=900',
  },
  {
    id: 'nourrisson',
    number: '02',
    icon: Baby,
    title: "Consultation d’ostéopathie enfant & nourrisson",
    tag: 'Pédiatrie',
    price: '55 – 70 €',
    duration: '30 – 45 min',
    keywords: 'nourrisson · bébé · enfant · croissance · troubles fonctionnels',
    description:
      'Séance douce et adaptée aux nourrissons, enfants et adolescents pour accompagner les tensions liées à la naissance, à la croissance ou à certains déséquilibres fonctionnels. Les techniques utilisées sont entièrement non invasives et parfaitement tolérées dès les premiers jours de vie.',
    details: [
      'Tensions crâniennes post-accouchement',
      'Coliques, régurgitations et troubles du sommeil',
      'Plagiocéphalie (tête plate)',
      'Déséquilibres posturaux liés à la croissance',
      "Suivi de l’adolescent (scoliose, sport intensif)",
    ],
    image:
      'https://images.pexels.com/photos/35537/child-children-girl-happy.jpg?auto=compress&cs=tinysrgb&w=900',
  },
  {
    id: 'grossesse',
    number: '03',
    icon: HeartHandshake,
    title: "Consultation d’ostéopathie femme enceinte",
    tag: 'Grossesse & périnatal',
    price: '60 – 70 €',
    duration: '45 min',
    keywords: 'grossesse · douleur bassin · lombalgie grossesse · ostéopathie périnatale',
    description:
      'Accompagnement ostéopathique tout au long de la grossesse pour soulager les tensions du dos, du bassin, de la cage thoracique et les inconforts liés aux changements physiologiques du corps. Un suivi post-partum est également proposé pour accompagner la récupération après l’accouchement.',
    details: [
      'Douleurs lombaires et pubiennes (SPP)',
      'Tensions du bassin et du diaphragme',
      'Sciatalgies et névralgies gravidiques',
      "Préparation du bassin à l’accouchement",
      'Suivi post-partum et rééquilibrage pelvien',
    ],
    image:
      'https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg?auto=compress&cs=tinysrgb&w=900',
  },
  {
    id: 'sportif',
    number: '04',
    icon: Dumbbell,
    title: "Consultation d’ostéopathie du sportif",
    tag: 'Sport & performance',
    price: '70 – 80 €',
    duration: '45 – 60 min',
    keywords: 'récupération sportive · prévention blessure · performance · douleur articulaire',
    description:
      'Prise en charge spécialisée des sportifs amateurs et de compétition pour la récupération, la prévention des blessures, les douleurs articulaires et les déséquilibres mécaniques liés à l’entraînement. Un bilan biomécanique complet est réalisé pour optimiser vos performances.',
    details: [
      'Prévention et récupération après blessure',
      'Tendinopathies et douleurs articulaires',
      'Déséquilibres mécaniques et asymétries',
      'Optimisation des amplitudes de mouvement',
      'Suivi pré et post-compétition',
    ],
    image:
      'https://images.pexels.com/photos/6551173/pexels-photo-6551173.jpeg?auto=compress&cs=tinysrgb&w=900',
  },
  {
    id: 'domicile',
    number: '05',
    icon: Home,
    title: "Consultation d’ostéopathie à domicile",
    tag: 'À domicile · Paris',
    price: '90 – 100 €',
    duration: '60 min',
    keywords: 'ostéopathe à domicile Paris · consultation mobile · déplacement',
    description:
      'Consultation réalisée directement au domicile du patient, idéale pour les personnes à mobilité réduite, les jeunes parents ou les situations nécessitant un déplacement du praticien. La qualité de soin est identique à celle du cabinet, dans le confort de votre environnement.',
    details: [
      'Personnes à mobilité réduite ou hospitalisées',
      'Nourrissons et jeunes parents',
      'Convalescents post-opératoires',
      'Personnes âgées ou dépendantes',
      'Disponible sur Paris et proche banlieue',
    ],
    image:
      'https://images.pexels.com/photos/7516352/pexels-photo-7516352.jpeg?auto=compress&cs=tinysrgb&w=900',
  },
];

const faqs = [
  {
    q: "Une consultation d’ostéopathie est-elle remboursée par la Sécurité sociale ?",
    a: "L’ostéopathie n'est pas remboursée par l’Assurance maladie. Cependant, de nombreuses mutuelles prennent en charge tout ou partie des consultations. Nous vous délivrons une facture nominative à transmettre à votre complémentaire santé.",
  },
  {
    q: 'Combien de séances sont nécessaires ?',
    a: "Chaque patient est différent. Dans la majorité des cas, 1 à 3 consultations suffisent pour traiter un problème aigu. Pour les affections chroniques ou le suivi de bien-être, un rendez-vous trimestriel est généralement recommandé.",
  },
  {
    q: 'Doit-on apporter des examens médicaux (IRM, radio) ?',
    a: "Ce n’est pas obligatoire mais fortement conseillé si vous en disposez. Ces examens permettent d'affiner le diagnostic et d'adapter les techniques utilisées, notamment pour exclure toute contre-indication.",
  },
  {
    q: 'L’ostéopathie est-elle compatible avec un traitement médical en cours ?',
    a: "Oui, l’ostéopathie est complémentaire à la médecine conventionnelle. Le Dr Martin travaille en lien avec les médecins traitants, rhumatologues et kinésithérapeutes pour une prise en charge globale et cohérente.",
  },
  {
    q: 'À partir de quel âge peut-on consulter un ostéopathe ?',
    a: "Dès la naissance. Les nourrissons peuvent être pris en charge dès les premiers jours de vie. Les techniques utilisées sont adaptées à chaque tranche d'âge, des plus douces pour les bébés aux approches structurelles pour les adultes.",
  },
];

// ─── Sub-components ──────────────────────────────────────────────────────────

function FaqItem({ faq, index }: { faq: typeof faqs[0]; index: number }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-stone-200 last:border-0">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-start justify-between gap-4 py-5 text-left group"
        aria-expanded={open}
      >
        <span
          className="text-sm md:text-[15px] text-stone-700 group-hover:text-stone-900 transition-colors leading-snug"
          style={{ fontFamily: 'var(--font-body)' }}
        >
          <span
            className="mr-3 text-[10px] tracking-widest text-stone-300 uppercase"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            0{index + 1}
          </span>
          {faq.q}
        </span>
        <ChevronDown
          size={16}
          className={`shrink-0 mt-0.5 text-stone-400 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${open ? 'max-h-60 pb-5' : 'max-h-0'}`}
      >
        <p
          className="text-sm text-stone-500 leading-relaxed pl-7"
          style={{ fontFamily: 'var(--font-body)', fontWeight: 300 }}
        >
          {faq.a}
        </p>
      </div>
    </div>
  );
}

// ─── Main Component ──────────────────────────────────────────────────────────

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeCard, setActiveCard] = useState<string | null>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from('[data-services-header] > *', {
        opacity: 0,
        y: 30,
        duration: 0.9,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: { trigger: '[data-services-header]', start: 'top 85%', once: true },
      });

      gsap.from('.consult-card', {
        opacity: 0,
        y: 50,
        duration: 0.8,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.consult-card', start: 'top 90%', once: true },
      });

      gsap.from('[data-tarifs]', {
        opacity: 0,
        y: 40,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: { trigger: '[data-tarifs]', start: 'top 85%', once: true },
      });

      gsap.from('[data-faq]', {
        opacity: 0,
        y: 40,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: { trigger: '[data-faq]', start: 'top 85%', once: true },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="soins" ref={sectionRef}>

      {/* ── Hero intro ─────────────────────────────────────────────────── */}
      {/* H1 SEO: "Ostéopathe à Paris" */}
      <div className="bg-[var(--color-ink)] py-20 md:py-28 px-6">
        <div className="max-w-4xl mx-auto text-center" data-services-header>
          <SectionLabel light>Cabinet OstéoParis · Paris 5e</SectionLabel>

          {/* H1 — SEO principal */}
          <h1
            className="text-4xl sm:text-5xl md:text-6xl font-light text-stone-100 leading-tight mt-2"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Ostéopathe à{' '}
            <em
              className="font-semibold"
              style={{ fontStyle: 'italic' }}
            >
              Paris
            </em>
          </h1>

          <div className="w-12 h-px bg-stone-600 mx-auto my-6" />

          <p
            className="text-stone-400 text-sm md:text-[15px] max-w-xl mx-auto leading-relaxed"
            style={{ fontFamily: 'var(--font-body)', fontWeight: 300 }}
          >
            Le Dr Sophie Martin vous reçoit au cœur du 5e arrondissement pour des
            consultations d’ostéopathie personnalisées, adaptées à chaque âge de la vie
            et à chaque situation clinique.
          </p>
        </div>
      </div>

      {/* ── Consultations ──────────────────────────────────────────────── */}
      <div className="bg-white py-20 md:py-28 px-6">
        <div className="max-w-6xl mx-auto">

          {/* Cards grid */}
          <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {consultations.map((c) => {
              const Icon = c.icon;
              const isActive = activeCard === c.id;

              return (
                <article
                  key={c.id}
                  id={c.id}
                  className="consult-card group flex flex-col bg-[var(--color-cream)] border border-stone-100 overflow-hidden hover:shadow-md transition-shadow duration-300"
                >
                  {/* Image */}
                  <div className="relative h-52 overflow-hidden">
                    <img
                      src={c.image}
                      alt={c.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-ink)]/50 to-transparent" />

                    {/* Tag */}
                    <span
                      className="absolute top-4 right-4 bg-[var(--color-cream)]/90 text-[9px] px-3 py-1.5 uppercase tracking-widest text-stone-600"
                      style={{ fontFamily: 'var(--font-body)' }}
                    >
                      {c.tag}
                    </span>

                    {/* Number */}
                    <span
                      className="absolute bottom-4 left-4 text-white/20 text-5xl font-light leading-none select-none"
                      style={{ fontFamily: 'var(--font-display)' }}
                    >
                      {c.number}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="flex flex-col flex-1 p-6 md:p-7">
                    {/* Icon + Title — H2 pour SEO */}
                    <div className="flex items-start gap-3 mb-3">
                      <div
                        className="w-8 h-8 flex items-center justify-center shrink-0 mt-0.5"
                        style={{ background: 'var(--color-sage-light)' }}
                      >
                        <Icon size={14} style={{ color: 'var(--color-sage)' }} />
                      </div>
                      <h2
                        className="text-base md:text-lg text-stone-800 leading-snug"
                        style={{ fontFamily: 'var(--font-display)', fontWeight: 500 }}
                      >
                        {c.title}
                      </h2>
                    </div>

                    {/* Keywords hint */}
                    <p
                      className="text-[10px] text-stone-400 mb-3 tracking-wide"
                      style={{ fontFamily: 'var(--font-body)' }}
                    >
                      {c.keywords}
                    </p>

                    {/* Description */}
                    <p
                      className="text-[13px] text-stone-500 leading-relaxed flex-1"
                      style={{ fontFamily: 'var(--font-body)', fontWeight: 300 }}
                    >
                      {c.description}
                    </p>

                    {/* Expandable detail list */}
                    <div
                      className={`overflow-hidden transition-all duration-500 ${
                        isActive ? 'max-h-64 mt-4' : 'max-h-0'
                      }`}
                    >
                      <ul className="space-y-1.5 border-t border-stone-200 pt-4">
                        {c.details.map((d: string) => (
                          <li
                            key={d}
                            className="flex items-start gap-2 text-[12px] text-stone-600"
                            style={{ fontFamily: 'var(--font-body)' }}
                          >
                            <span
                              className="w-1 h-1 rounded-full mt-1.5 shrink-0"
                              style={{ background: 'var(--color-sage)' }}
                            />
                            {d}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Footer */}
                    <div className="mt-5 pt-4 border-t border-stone-100 flex flex-wrap items-center justify-between gap-3">
                      <div>
                        <p
                          className="text-[9px] uppercase tracking-widest text-stone-400"
                          style={{ fontFamily: 'var(--font-body)' }}
                        >
                          Tarif indicatif
                        </p>
                        <p
                          className="text-lg text-[var(--color-ink)]"
                          style={{ fontFamily: 'var(--font-display)', fontWeight: 500 }}
                        >
                          {c.price}
                        </p>
                        <p
                          className="text-[10px] text-stone-400"
                          style={{ fontFamily: 'var(--font-body)' }}
                        >
                          {c.duration}
                        </p>
                      </div>

                      <div className="flex flex-col gap-1.5 items-end">
                        <button
                          onClick={() => setActiveCard(isActive ? null : c.id)}
                          className="text-[10px] uppercase tracking-widest text-stone-400 hover:text-stone-700 transition-colors flex items-center gap-1"
                          style={{ fontFamily: 'var(--font-body)' }}
                        >
                          {isActive ? 'Réduire' : 'Détails'}
                          <ChevronDown
                            size={11}
                            className={`transition-transform duration-300 ${isActive ? 'rotate-180' : ''}`}
                          />
                        </button>
                        <a
                          href="#contact"
                          className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-widest text-stone-700 hover:text-stone-900 transition-colors group/link"
                          style={{ fontFamily: 'var(--font-body)' }}
                        >
                          Prendre RDV
                          <ArrowRight
                            size={11}
                            className="group-hover/link:translate-x-1 transition-transform"
                          />
                        </a>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── Tarifs ─────────────────────────────────────────────────────── */}
      {/* H2 SEO: "Tarifs" */}
      <div className="bg-stone-50 py-20 md:py-28 px-6" data-tarifs>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <SectionLabel>Honoraires</SectionLabel>
            <h2
              className="text-3xl md:text-4xl font-light text-stone-800 mt-1"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Tarifs des{' '}
              <em style={{ fontStyle: 'italic', fontWeight: 500 }}>
                consultations
              </em>
            </h2>
            <p
              className="mt-4 text-stone-400 text-sm max-w-md mx-auto leading-relaxed"
              style={{ fontFamily: 'var(--font-body)', fontWeight: 300 }}
            >
              Tarifs indicatifs établis conformément aux recommandations du Registre
              des Ostéopathes de France. Paiement par espèces, chèque ou carte bancaire.
            </p>
          </div>

          <div className="bg-white border border-stone-100 shadow-sm overflow-hidden">
            {/* Header row */}
            <div className="grid grid-cols-3 bg-[var(--color-ink)] px-6 md:px-8 py-3">
              {['Consultation', 'Durée', 'Tarif'].map((h) => (
                <p
                  key={h}
                  className="text-[9px] uppercase tracking-widest text-stone-400"
                  style={{ fontFamily: 'var(--font-body)' }}
                >
                  {h}
                </p>
              ))}
            </div>

            {/* Rows */}
            {consultations.map((c, i) => (
              <div
                key={c.id}
                className={`grid grid-cols-3 items-center px-6 md:px-8 py-4 gap-2 ${
                  i % 2 === 0 ? 'bg-white' : 'bg-stone-50/60'
                } border-b border-stone-100 last:border-0`}
              >
                <div className="flex items-center gap-2 md:gap-3 min-w-0">
                  <div
                    className="w-6 h-6 flex-shrink-0 flex items-center justify-center hidden sm:flex"
                    style={{ background: 'var(--color-sage-light)' }}
                  >
                    <c.icon size={11} style={{ color: 'var(--color-sage)' }} />
                  </div>
                  <a
                    href={`#${c.id}`}
                    className="text-[12px] md:text-[13px] text-stone-700 hover:text-stone-900 transition-colors leading-snug truncate"
                    style={{ fontFamily: 'var(--font-body)' }}
                    title={c.title}
                  >
                    {c.title.replace("Consultation d’ostéopathie ", "")}
                  </a>
                </div>
                <p
                  className="text-[12px] text-stone-400"
                  style={{ fontFamily: 'var(--font-body)' }}
                >
                  {c.duration}
                </p>
                <p
                  className="text-[14px] md:text-[15px] text-[var(--color-ink)]"
                  style={{ fontFamily: 'var(--font-display)', fontWeight: 500 }}
                >
                  {c.price}
                </p>
              </div>
            ))}
          </div>

          {/* Mutuelle note */}
          <p
            className="mt-5 text-center text-[11px] text-stone-400 leading-relaxed"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            Non remboursé par l’Assurance maladie · Prise en charge fréquente par les mutuelles · Facture fournie à chaque consultation
          </p>
        </div>
      </div>

      {/* ── FAQ ────────────────────────────────────────────────────────── */}
      {/* H2 SEO: "Questions fréquentes" */}
      <div className="bg-white py-20 md:py-28 px-6" data-faq>
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <SectionLabel>FAQ</SectionLabel>
            <SectionHeading className="text-3xl md:text-4xl mt-1">
              Questions{' '}
              <em style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontWeight: 500 }}>
                fréquentes
              </em>
            </SectionHeading>
          </div>

          <div className="divide-y divide-stone-200 border-t border-stone-200">
            {faqs.map((faq, i) => (
              <FaqItem key={i} faq={faq} index={i} />
            ))}
          </div>

          {/* CTA */}
          <div className="mt-12 text-center">
            <p
              className="text-stone-400 text-sm mb-5"
              style={{ fontFamily: 'var(--font-body)', fontWeight: 300 }}
            >
              Vous avez une autre question ? N’hésitez pas à nous contacter.
            </p>
            <a
              href="#contact"
              className="inline-flex items-center gap-3 bg-[var(--color-ink)] text-[var(--color-cream)] text-[11px] px-8 py-4 uppercase tracking-widest hover:bg-stone-700 transition-colors"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              Prendre rendez-vous
              <ArrowRight size={12} />
            </a>
          </div>
        </div>
      </div>

    </section>
  );
}