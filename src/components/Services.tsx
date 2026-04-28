// PATH: src/components/Services.tsx
import { useEffect, useRef, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { X, ArrowRight, ChevronLeft, ChevronRight, Star, Baby, HeartHandshake, Dumbbell, Home, Clock, Euro } from 'lucide-react';
import { SectionLabel } from './ui/SectionHeading';

gsap.registerPlugin(ScrollTrigger);

// ─── Types ──────────────────────────────────────────────────────────────────

type Consultation = {
  id: string;
  number: string;
  icon: React.ElementType;
  title: string;
  shortTitle: string;
  tag: string;
  price: string;
  duration: string;
  keywords: string;
  description: string;
  details: string[];
  image: string;
  popular?: boolean;
  size: 'large' | 'medium' | 'small';
};

// ─── Data ───────────────────────────────────────────────────────────────────

const consultations: Consultation[] = [
  {
    id: 'adulte',
    number: '01',
    icon: Star,
    title: "Consultation d'ostéopathie adulte",
    shortTitle: 'Adulte',
    tag: 'Douleurs & mobilité',
    price: '80 €',
    duration: '45 – 60 min',
    keywords: 'mal de dos · cervicalgie · lombalgie · posture · stress',
    description:
      "Destinée aux adultes souffrant de douleurs du dos, cervicales, lombaires, de tensions musculaires chroniques ou de troubles posturaux liés au travail et au stress. Chaque consultation commence par une anamnèse approfondie pour identifier les causes profondes et non les simples symptômes. Notre approche conjugue techniques structurelles, crâniennes et viscérales pour une prise en charge globale.",
    details: [
      'Douleurs lombaires et dorsales',
      'Cervicalgies et tensions de nuque',
      'Troubles posturaux (télétravail, sédentarité)',
      'Stress et fatigue chronique',
      'Séquelles de traumatismes (chutes, accidents)',
    ],
    image: '/assets/Osteopathie_adulte.png',
    popular: true,
    size: 'large',
  },
  {
    id: 'sportif',
    number: '04',
    icon: Dumbbell,
    title: "Consultation d'ostéopathie du sportif",
    shortTitle: 'Sportif',
    tag: 'Sport & performance',
    price: '80 €',
    duration: '45 – 60 min',
    keywords: 'récupération sportive · prévention blessure · performance',
    description:
      "Prise en charge spécialisée des sportifs amateurs et de compétition pour la récupération, la prévention des blessures, les douleurs articulaires et les déséquilibres mécaniques liés à l'entraînement. Un bilan biomécanique complet est réalisé pour optimiser vos performances et votre récupération.",
    details: [
      'Prévention et récupération après blessure',
      'Tendinopathies et douleurs articulaires',
      'Déséquilibres mécaniques et asymétries',
      'Optimisation des amplitudes de mouvement',
      'Suivi pré et post-compétition',
    ],
    image: '/assets/Osteopathie_sportif.png',
    popular: true,
    size: 'large',
  },
  {
    id: 'nourrisson',
    number: '02',
    icon: Baby,
    title: "Consultation d'ostéopathie enfant & nourrisson",
    shortTitle: 'Enfant & nourrisson',
    tag: 'Pédiatrie',
    price: '70 €',
    duration: '30 – 45 min',
    keywords: 'nourrisson · bébé · enfant · croissance',
    description:
      "Séance douce et adaptée aux nourrissons, enfants et adolescents pour accompagner les tensions liées à la naissance, à la croissance ou à certains déséquilibres fonctionnels. Les techniques utilisées sont entièrement non invasives et parfaitement tolérées dès les premiers jours de vie.",
    details: [
      'Tensions crâniennes post-accouchement',
      'Coliques, régurgitations et troubles du sommeil',
      'Plagiocéphalie (tête plate)',
      'Déséquilibres posturaux liés à la croissance',
      "Suivi de l'adolescent (scoliose, sport intensif)",
    ],
    image: '/assets/Osteopathie_enfant.png',
    size: 'medium',
  },
  {
    id: 'grossesse',
    number: '03',
    icon: HeartHandshake,
    title: "Consultation d'ostéopathie femme enceinte",
    shortTitle: 'Grossesse',
    tag: 'Grossesse & périnatal',
    price: '70 €',
    duration: '45 min',
    keywords: 'grossesse · douleur bassin · périnatal',
    description:
      "Accompagnement ostéopathique tout au long de la grossesse pour soulager les tensions du dos, du bassin, de la cage thoracique et les inconforts liés aux changements physiologiques du corps. Un suivi post-partum est également proposé pour accompagner la récupération après l'accouchement.",
    details: [
      'Douleurs lombaires et pubiennes (SPP)',
      'Tensions du bassin et du diaphragme',
      'Sciatalgies et névralgies gravidiques',
      "Préparation du bassin à l'accouchement",
      'Suivi post-partum et rééquilibrage pelvien',
    ],
    image: '/assets/Osteopathie_femme-enceinte.png',
    size: 'medium',
  },
  {
    id: 'domicile',
    number: '05',
    icon: Home,
    title: "Consultation d'ostéopathie à domicile",
    shortTitle: 'À domicile',
    tag: 'À domicile · Paris',
    price: '100 €',
    duration: '60 min',
    keywords: 'domicile · mobilité réduite · déplacement',
    description:
      "Consultation réalisée directement au domicile du patient, idéale pour les personnes à mobilité réduite, les jeunes parents ou les situations nécessitant un déplacement du praticien. La qualité de soin est identique à celle du cabinet, dans le confort de votre environnement.",
    details: [
      'Personnes à mobilité réduite ou hospitalisées',
      'Nourrissons et jeunes parents',
      'Convalescents post-opératoires',
      'Personnes âgées ou dépendantes',
      'Disponible sur Paris et proche banlieue',
    ],
    image: '/assets/Osteopathie_domicile.png',
    size: 'small',
  },
];

// ─── Calendar helpers ─────────────────────────────────────────────────────────

const DAYS = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];
const MONTHS = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
const SLOTS = ['9h00', '10h00', '11h00', '14h00', '15h00', '16h00', '17h00', '18h00'];

function getAvailableDays(year: number, month: number): number[] {
  const today = new Date();
  const days: number[] = [];
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  for (let d = 1; d <= daysInMonth; d++) {
    const date = new Date(year, month, d);
    const dow = date.getDay();
    if (dow >= 1 && dow <= 6 && date > today) {
      if ((d * 7 + month * 3) % 5 !== 0) days.push(d);
    }
  }
  return days;
}

// ─── Particle hook ────────────────────────────────────────────────────────────

const GLOW_COLOR = '138, 158, 138';

function useParticleCard(ref: React.RefObject<HTMLDivElement>, enabled: boolean) {
  const particlesRef = useRef<HTMLDivElement[]>([]);
  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([]);
  const isHovered = useRef(false);

  const clearParticles = useCallback(() => {
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
    particlesRef.current.forEach(p => {
      gsap.to(p, { scale: 0, opacity: 0, duration: 0.25, onComplete: () => p.parentNode?.removeChild(p) });
    });
    particlesRef.current = [];
  }, []);

  useEffect(() => {
    if (!enabled || !ref.current) return;
    const el = ref.current;

    const onEnter = () => {
      isHovered.current = true;
      const { width, height } = el.getBoundingClientRect();
      for (let i = 0; i < 8; i++) {
        const tid = setTimeout(() => {
          if (!isHovered.current || !ref.current) return;
          const p = document.createElement('div');
          p.style.cssText = `position:absolute;width:3px;height:3px;border-radius:50%;background:rgba(${GLOW_COLOR},0.9);box-shadow:0 0 6px rgba(${GLOW_COLOR},0.5);pointer-events:none;z-index:10;left:${Math.random() * width}px;top:${Math.random() * height}px;`;
          el.appendChild(p);
          particlesRef.current.push(p);
          gsap.fromTo(p, { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.3 });
          gsap.to(p, { x: (Math.random() - 0.5) * 80, y: (Math.random() - 0.5) * 80, repeat: -1, yoyo: true, duration: 2 + Math.random() * 2 });
          gsap.to(p, { opacity: 0.2, repeat: -1, yoyo: true, duration: 1.5 });
        }, i * 80);
        timeoutsRef.current.push(tid);
      }
    };

    const onLeave = () => {
      isHovered.current = false;
      clearParticles();
    };

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      el.style.setProperty('--glow-x', `${(x / rect.width) * 100}%`);
      el.style.setProperty('--glow-y', `${(y / rect.height) * 100}%`);
      el.style.setProperty('--glow-intensity', '1');
    };

    const onOut = () => el.style.setProperty('--glow-intensity', '0');

    el.addEventListener('mouseenter', onEnter);
    el.addEventListener('mouseleave', onLeave);
    el.addEventListener('mousemove', onMove);
    el.addEventListener('mouseleave', onOut);

    return () => {
      el.removeEventListener('mouseenter', onEnter);
      el.removeEventListener('mouseleave', onLeave);
      el.removeEventListener('mousemove', onMove);
      el.removeEventListener('mouseleave', onOut);
      clearParticles();
    };
  }, [enabled, ref, clearParticles]);
}

// ─── BentoCard ────────────────────────────────────────────────────────────────

function BentoCard({ consultation, onOpen }: { consultation: Consultation; onOpen: (c: Consultation) => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const Icon = consultation.icon;
  useParticleCard(ref, true);

  return (
    <article
      ref={ref}
      className="bento-card group cursor-pointer relative overflow-hidden"
      style={{ '--glow-x': '50%', '--glow-y': '50%', '--glow-intensity': '0' } as React.CSSProperties}
      onClick={() => onOpen(consultation)}
      role="button"
      tabIndex={0}
      onKeyDown={e => e.key === 'Enter' && onOpen(consultation)}
      aria-label={`Ouvrir ${consultation.title}`}
    >
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={consultation.image}
          alt={consultation.title}
          className="w-full h-full object-cover object-[center_left] transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1a1208]/95 via-[#1a1208]/55 to-[#1a1208]/5" />
      </div>

      {/* Border glow */}
      <div className="bento-glow-border" />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-between p-4 md:p-6">
        {/* Top */}
        <div className="flex items-start justify-between gap-2">
          <span
            className="text-[9px] uppercase tracking-[0.22em] px-2.5 py-1 border border-white/15 text-white/60 backdrop-blur-sm leading-none"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            {consultation.tag}
          </span>
          <div className="w-7 h-7 flex items-center justify-center shrink-0" style={{ background: 'rgba(138,158,138,0.2)', border: '1px solid rgba(138,158,138,0.35)' }}>
            <Icon size={13} style={{ color: 'var(--color-sage-light)' }} />
          </div>
        </div>

        {/* Bottom */}
        <div>
          {consultation.popular && (
            <p className="text-[8px] uppercase tracking-[0.3em] mb-1.5" style={{ fontFamily: 'var(--font-body)', color: 'var(--color-sage-light)' }}>
              ✦ Plus demandé
            </p>
          )}
          <h2
            className="text-white leading-tight mb-2.5"
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 400,
              fontSize: consultation.size === 'large' ? 'clamp(1.15rem, 2.2vw, 1.55rem)' : 'clamp(0.95rem, 1.6vw, 1.2rem)',
            }}
          >
            {consultation.title}
          </h2>
          <div className="flex items-center gap-3 mb-3">
            <span className="flex items-center gap-1 text-[10px] text-stone-400" style={{ fontFamily: 'var(--font-body)' }}>
              <Euro size={9} /> {consultation.price}
            </span>
            <span className="w-px h-3 bg-stone-700" />
            <span className="flex items-center gap-1 text-[10px] text-stone-400" style={{ fontFamily: 'var(--font-body)' }}>
              <Clock size={9} /> {consultation.duration}
            </span>
          </div>
          <div
            className="flex items-center gap-1.5 text-[10px] uppercase tracking-widest transition-all duration-300 opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0"
            style={{ fontFamily: 'var(--font-body)', color: 'var(--color-sage-light)' }}
          >
            Voir & réserver <ArrowRight size={9} />
          </div>
        </div>
      </div>
    </article>
  );
}

// ─── Booking Calendar ─────────────────────────────────────────────────────────

function BookingCalendar({ consultation, onClose }: { consultation: Consultation; onClose: () => void }) {
  const now = new Date();
  const [year, setYear] = useState(now.getFullYear());
  const [month, setMonth] = useState(now.getMonth());
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [booked, setBooked] = useState(false);

  const available = getAvailableDays(year, month);
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDow = new Date(year, month, 1).getDay();
  const offset = firstDow === 0 ? 6 : firstDow - 1;

  const prevMonth = () => { month === 0 ? (setMonth(11), setYear(y => y - 1)) : setMonth(m => m - 1); setSelectedDay(null); setSelectedSlot(null); };
  const nextMonth = () => { month === 11 ? (setMonth(0), setYear(y => y + 1)) : setMonth(m => m + 1); setSelectedDay(null); setSelectedSlot(null); };

  const availableSlots = selectedDay ? SLOTS.filter((_, i) => (selectedDay + i) % 3 !== 0) : [];

  if (booked) {
    return (
      <div className="flex flex-col items-center justify-center py-10 text-center">
        <div className="w-14 h-14 rounded-full flex items-center justify-center mb-5" style={{ background: 'var(--color-sage-light)' }}>
          <span className="text-xl" style={{ color: 'var(--color-sage)' }}>✓</span>
        </div>
        <h3 className="text-xl text-stone-800 mb-2" style={{ fontFamily: 'var(--font-display)', fontWeight: 500 }}>
          Demande envoyée !
        </h3>
        <p className="text-stone-500 text-sm" style={{ fontFamily: 'var(--font-body)' }}>
          {consultation.shortTitle} — {selectedDay} {MONTHS[month]} à {selectedSlot}
        </p>
        <p className="text-stone-400 text-xs mt-2" style={{ fontFamily: 'var(--font-body)' }}>
          Confirmation par email dans les 2h.
        </p>
        <button onClick={onClose} className="mt-6 text-[10px] uppercase tracking-widest text-stone-400 hover:text-stone-700 transition-colors" style={{ fontFamily: 'var(--font-body)' }}>
          Fermer ×
        </button>
      </div>
    );
  }

  return (
    <div>
      {/* Selected soin */}
      <div className="flex items-center gap-3 p-3 mb-5 bg-stone-50 border border-stone-100">
        <div className="w-8 h-8 flex items-center justify-center shrink-0" style={{ background: 'var(--color-sage-light)' }}>
          <consultation.icon size={13} style={{ color: 'var(--color-sage)' }} />
        </div>
        <div>
          <p className="text-[9px] uppercase tracking-widest text-stone-400" style={{ fontFamily: 'var(--font-body)' }}>Soin sélectionné</p>
          <p className="text-sm text-stone-700" style={{ fontFamily: 'var(--font-display)', fontWeight: 500 }}>{consultation.shortTitle} — {consultation.price}</p>
        </div>
      </div>

      {/* Month nav */}
      <div className="flex items-center justify-between mb-3">
        <button onClick={prevMonth} className="p-2 hover:bg-stone-100 transition-colors">
          <ChevronLeft size={15} className="text-stone-500" />
        </button>
        <p className="text-sm text-stone-700" style={{ fontFamily: 'var(--font-display)', fontWeight: 500 }}>
          {MONTHS[month]} {year}
        </p>
        <button onClick={nextMonth} className="p-2 hover:bg-stone-100 transition-colors">
          <ChevronRight size={15} className="text-stone-500" />
        </button>
      </div>

      {/* Day headers */}
      <div className="grid grid-cols-6 gap-1 mb-1">
        {DAYS.map(d => (
          <div key={d} className="text-center text-[9px] uppercase tracking-widest text-stone-400 py-1" style={{ fontFamily: 'var(--font-body)' }}>{d}</div>
        ))}
      </div>

      {/* Days */}
      <div className="grid grid-cols-6 gap-1 mb-5">
        {Array.from({ length: offset }).map((_, i) => <div key={`pad-${i}`} />)}
        {Array.from({ length: daysInMonth }).map((_, i) => {
          const day = i + 1;
          const dow = new Date(year, month, day).getDay();
          const isSun = dow === 0;
          const isAvail = available.includes(day);
          const isSel = selectedDay === day;
          return (
            <button
              key={day}
              disabled={!isAvail || isSun}
              onClick={() => { setSelectedDay(day); setSelectedSlot(null); }}
              className={`aspect-square text-[11px] flex items-center justify-center transition-all duration-150 ${
                isSel ? 'text-white' : isAvail ? 'text-stone-700 hover:bg-stone-100' : 'text-stone-300 cursor-not-allowed'
              }`}
              style={{ fontFamily: 'var(--font-body)', background: isSel ? 'var(--color-ink)' : undefined }}
            >
              {day}
            </button>
          );
        })}
      </div>

      {/* Time slots */}
      {selectedDay && (
        <div className="mb-5">
          <p className="text-[9px] uppercase tracking-widest text-stone-400 mb-2.5" style={{ fontFamily: 'var(--font-body)' }}>
            Créneaux — {selectedDay} {MONTHS[month]}
          </p>
          <div className="grid grid-cols-4 gap-1.5">
            {availableSlots.map(slot => (
              <button
                key={slot}
                onClick={() => setSelectedSlot(slot)}
                className={`py-2 text-[10px] border transition-all duration-150 ${
                  selectedSlot === slot
                    ? 'border-[var(--color-ink)] bg-[var(--color-ink)] text-white'
                    : 'border-stone-200 text-stone-600 hover:border-stone-400 hover:bg-stone-50'
                }`}
                style={{ fontFamily: 'var(--font-body)' }}
              >
                {slot}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* CTA */}
      <button
        disabled={!selectedDay || !selectedSlot}
        onClick={() => setBooked(true)}
        className={`w-full py-3.5 text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 transition-all duration-200 ${
          selectedDay && selectedSlot
            ? 'bg-[var(--color-ink)] text-[var(--color-cream)] hover:bg-stone-700'
            : 'bg-stone-100 text-stone-400 cursor-not-allowed'
        }`}
        style={{ fontFamily: 'var(--font-body)' }}
      >
        <ArrowRight size={11} />
        {selectedDay && selectedSlot
          ? `Confirmer — ${selectedDay} ${MONTHS[month]} à ${selectedSlot}`
          : 'Choisissez une date et un créneau'}
      </button>
    </div>
  );
}

// ─── Modal ────────────────────────────────────────────────────────────────────

function ConsultationModal({ consultation, onClose }: { consultation: Consultation; onClose: () => void }) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const [showBooking, setShowBooking] = useState(false);
  const Icon = consultation.icon;

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    gsap.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3 });
    gsap.fromTo(panelRef.current, { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, ease: 'power3.out' });
    return () => { document.body.style.overflow = ''; };
  }, []);

  const handleClose = useCallback(() => {
    gsap.to(overlayRef.current, { opacity: 0, duration: 0.2 });
    gsap.to(panelRef.current, { y: 40, opacity: 0, duration: 0.25, onComplete: onClose });
  }, [onClose]);

  // Close on overlay click
  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === overlayRef.current) handleClose();
  };

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[200] flex items-end md:items-center justify-center p-0 md:p-6"
      style={{ background: 'rgba(28,22,16,0.8)', backdropFilter: 'blur(6px)' }}
      onClick={handleOverlayClick}
    >
      <div
        ref={panelRef}
        className="relative w-full max-w-4xl overflow-hidden flex flex-col md:flex-row"
        style={{ background: 'var(--color-cream)', maxHeight: '95vh' }}
      >
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 z-30 w-9 h-9 flex items-center justify-center bg-white/90 backdrop-blur-sm hover:bg-white transition-colors shadow-sm"
          aria-label="Fermer"
        >
          <X size={15} className="text-stone-600" />
        </button>

        {/* Left panel — image + meta */}
        <div className="relative md:w-[45%] shrink-0 h-56 md:h-auto overflow-hidden">
          <img
            src={consultation.image}
            alt={consultation.title}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1a1208]/90 via-[#1a1208]/30 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6">
            {consultation.popular && (
              <p className="text-[8px] uppercase tracking-[0.3em] mb-2" style={{ fontFamily: 'var(--font-body)', color: 'var(--color-sage-light)' }}>
                ✦ Soin le plus demandé
              </p>
            )}
            <h2 className="text-white text-lg md:text-2xl leading-tight mb-3" style={{ fontFamily: 'var(--font-display)', fontWeight: 400 }}>
              {consultation.title}
            </h2>
            <div className="flex flex-wrap gap-2">
              {[
                { icon: Euro, label: consultation.price },
                { icon: Clock, label: consultation.duration },
              ].map(({ icon: I, label }) => (
                <span key={label} className="flex items-center gap-1.5 text-[10px] text-stone-300 bg-white/10 backdrop-blur-sm px-2.5 py-1.5" style={{ fontFamily: 'var(--font-body)' }}>
                  <I size={9} /> {label}
                </span>
              ))}
              <span className="flex items-center gap-1.5 text-[10px] text-stone-300 bg-white/10 backdrop-blur-sm px-2.5 py-1.5" style={{ fontFamily: 'var(--font-body)' }}>
                <Icon size={9} /> {consultation.tag}
              </span>
            </div>
          </div>
        </div>

        {/* Right panel — content / booking */}
        <div className="flex-1 overflow-y-auto p-5 md:p-8">
          {!showBooking ? (
            <>
              <p className="text-[9px] uppercase tracking-widest text-stone-400 mb-3" style={{ fontFamily: 'var(--font-body)' }}>
                Description
              </p>
              <p className="text-stone-600 text-sm leading-relaxed mb-5" style={{ fontFamily: 'var(--font-body)', fontWeight: 300 }}>
                {consultation.description}
              </p>

              <p className="text-[9px] uppercase tracking-widest text-stone-400 mb-3" style={{ fontFamily: 'var(--font-body)' }}>
                Indications
              </p>
              <ul className="space-y-2 mb-7">
                {consultation.details.map(d => (
                  <li key={d} className="flex items-start gap-2.5 text-[13px] text-stone-600" style={{ fontFamily: 'var(--font-body)' }}>
                    <span className="w-1 h-1 rounded-full mt-2 shrink-0" style={{ background: 'var(--color-sage)' }} />
                    {d}
                  </li>
                ))}
              </ul>

              <div className="flex flex-col sm:flex-row gap-2.5">
                <button
                  onClick={() => setShowBooking(true)}
                  className="flex-1 bg-[var(--color-ink)] text-[var(--color-cream)] text-[10px] py-4 px-5 uppercase tracking-widest hover:bg-stone-700 transition-colors flex items-center justify-center gap-2"
                  style={{ fontFamily: 'var(--font-body)' }}
                >
                  <ArrowRight size={11} />
                  Prendre rendez-vous
                </button>
                <a
                  href="tel:+33142345678"
                  className="flex-1 border border-stone-200 text-stone-600 text-[10px] py-4 px-5 uppercase tracking-widest hover:bg-stone-50 transition-colors text-center"
                  style={{ fontFamily: 'var(--font-body)' }}
                >
                  01 42 34 56 78
                </a>
              </div>
            </>
          ) : (
            <>
              <button
                onClick={() => setShowBooking(false)}
                className="flex items-center gap-1.5 text-[10px] uppercase tracking-widest text-stone-400 hover:text-stone-700 transition-colors mb-5"
                style={{ fontFamily: 'var(--font-body)' }}
              >
                <ChevronLeft size={12} /> Retour
              </button>
              <BookingCalendar consultation={consultation} onClose={handleClose} />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const [selected, setSelected] = useState<Consultation | null>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from('.bento-card', {
        opacity: 0,
        y: 44,
        duration: 0.7,
        stagger: { each: 0.1, from: 'start' },
        ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', once: true },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <>
      <style>{`
        /* ── Card base ── */
        .bento-card {
          --glow-x: 50%;
          --glow-y: 50%;
          --glow-intensity: 0;
          background: #12100d;
          border: 1px solid rgba(255,255,255,0.07);
          transition: box-shadow 0.3s ease, transform 0.25s ease;
        }
        .bento-card:hover {
          box-shadow:
            0 12px 40px rgba(0,0,0,0.5),
            0 0 0 1px rgba(138,158,138,0.2),
            0 0 40px rgba(138,158,138,0.08);
          transform: translateY(-3px);
        }
        /* ── Border glow ── */
        .bento-glow-border {
          position: absolute;
          inset: 0;
          padding: 1px;
          background: radial-gradient(
            350px circle at var(--glow-x) var(--glow-y),
            rgba(138,158,138,calc(var(--glow-intensity)*0.7)) 0%,
            transparent 65%
          );
          border-radius: inherit;
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          mask-composite: exclude;
          pointer-events: none;
          z-index: 6;
        }

        /* ── Ripple on click ── */
        .bento-card:active { transform: translateY(-1px) scale(0.995); }

        /* ── Grid — mobile first ── */
        .bento-grid {
          display: grid;
          gap: 8px;
          grid-template-columns: 1fr;
        }
        .bento-card { min-height: 210px; }

        /* ── Tablet ── */
        @media (min-width: 600px) {
          .bento-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          /* adulte: most popular spans full width on tablet */
          .bento-card:nth-child(1) {
            grid-column: span 2;
            min-height: 260px;
          }
          .bento-card:nth-child(2),
          .bento-card:nth-child(3),
          .bento-card:nth-child(4),
          .bento-card:nth-child(5) {
            min-height: 220px;
          }
        }

        /* ── Desktop ── */
        @media (min-width: 1024px) {
          .bento-grid {
            grid-template-columns: repeat(12, 1fr);
            grid-template-rows: 300px 240px;
            gap: 10px;
          }
          /* adulte: large, 7 cols, row 1 */
          .bento-card:nth-child(1) {
            grid-column: 1 / span 7;
            grid-row: 1;
            min-height: unset;
          }
          /* sportif: popular, 5 cols, row 1 */
          .bento-card:nth-child(2) {
            grid-column: 8 / span 5;
            grid-row: 1;
            min-height: unset;
          }
          /* Row 2: 3 equal cards */
          .bento-card:nth-child(3) {
            grid-column: 1 / span 4;
            grid-row: 2;
            min-height: unset;
          }
          .bento-card:nth-child(4) {
            grid-column: 5 / span 4;
            grid-row: 2;
            min-height: unset;
          }
          .bento-card:nth-child(5) {
            grid-column: 9 / span 4;
            grid-row: 2;
            min-height: unset;
          }
        }
      `}</style>

      <section id="soins" ref={sectionRef} className="py-20 md:py-28" style={{ background: 'var(--color-ink)' }}>
        <div className="max-w-6xl mx-auto px-4 md:px-6">

          {/* Header */}
          <div className="mb-10 md:mb-12">
            <SectionLabel light>Nos consultations</SectionLabel>
            <h2
              className="text-4xl md:text-5xl lg:text-6xl font-light text-stone-100 leading-tight mt-2"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Des soins adaptés à{' '}
              <em className="font-semibold italic" style={{ color: 'var(--color-sage-light)' }}>
                chaque patient
              </em>
            </h2>
            <p
              className="mt-3 text-stone-500 text-sm max-w-md leading-relaxed"
              style={{ fontFamily: 'var(--font-body)', fontWeight: 300 }}
            >
              Cliquez sur une consultation pour découvrir les détails et réserver votre créneau directement.
            </p>
          </div>

          {/* Grid */}
          <div className="bento-grid">
            {consultations.map((c) => (
              <BentoCard key={c.id} consultation={c} onOpen={setSelected} />
            ))}
          </div>

          <p
            className="mt-5 text-center text-[10px] text-stone-600 uppercase tracking-widest"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            Mutuelles · Paiement CB · Facture fournie à chaque consultation
          </p>
        </div>
      </section>

      {selected && (
        <ConsultationModal consultation={selected} onClose={() => setSelected(null)} />
      )}
    </>
  );
}