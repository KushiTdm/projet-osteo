// PATH: src/components/Contact.tsx
import { useState, useRef, useEffect } from 'react';
import { Phone, Mail, MapPin, Clock, Send, ChevronDown } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SectionLabel, SectionHeading } from './ui/SectionHeading';

gsap.registerPlugin(ScrollTrigger);

const hours = [
  { day: 'Lun – Ven', time: '9h00 – 19h00', open: true },
  { day: 'Samedi', time: '9h00 – 13h00', open: true },
  { day: 'Dimanche', time: 'Fermé', open: false },
];

const contactInfos = [
  {
    icon: MapPin,
    label: 'Adresse',
    content: '12 Rue de la Santé\n75005 Paris – Métro Glacière (L6)',
    href: 'https://maps.google.com/?q=12+Rue+de+la+Santé+75005+Paris',
  },
  {
    icon: Phone,
    label: 'Téléphone',
    content: '01 42 34 56 78',
    href: 'tel:+33142345678',
  },
  {
    icon: Mail,
    label: 'Email',
    content: 'contact@osteeoparis.fr',
    href: 'mailto:contact@osteeoparis.fr',
  },
];

const motifs = [
  'Douleurs du dos / lombalgies',
  'Cervicalgies / maux de tête / migraines',
  'Troubles digestifs',
  'Douleurs articulaires (épaule, genou…)',
  'Stress / troubles du sommeil',
  'Suivi nourrisson / pédiatrie',
  'Grossesse / post-partum',
  'Bilan sportif / performance',
  'Bilan général / prévention',
  'Autre',
];

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [mobileTab, setMobileTab] = useState<'info' | 'form'>('info');
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from('[data-contact-info]', {
        opacity: 0, x: -40, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: '[data-contact-info]', start: 'top 82%', once: true },
      });
      gsap.from('[data-contact-form]', {
        opacity: 0, x: 40, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: '[data-contact-form]', start: 'top 82%', once: true },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="bg-stone-50"
      style={{ minHeight: '100dvh', display: 'flex', flexDirection: 'column' }}
    >
      {/* ── Mobile layout ── */}
      <div className="md:hidden flex flex-col" style={{ flex: 1 }}>
        {/* Header */}
        <div className="px-5 pt-8 pb-4">
          <SectionLabel>Contact & Rendez-vous</SectionLabel>
          <h2
            className="leading-tight text-stone-800 mt-1"
            style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.8rem, 7vw, 2.5rem)' }}
          >
            Prenez{' '}
            <em style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic' }}>rendez-vous</em>
          </h2>
        </div>

        {/* Tab switcher */}
        <div className="flex mx-5 mb-4 border border-stone-200 overflow-hidden">
          {(['info', 'form'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setMobileTab(tab)}
              className="flex-1 py-2.5 text-xs md:text-[10px] uppercase tracking-widest transition-colors"
              style={{
                fontFamily: 'var(--font-body)',
                background: mobileTab === tab ? 'var(--color-ink)' : 'transparent',
                color: mobileTab === tab ? 'var(--color-cream)' : '#78716c',
              }}
            >
              {tab === 'info' ? 'Infos & Horaires' : 'Formulaire'}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <div className="flex-1 overflow-y-auto px-5 pb-6">
          {mobileTab === 'info' ? (
            <div>
              <p
                className="text-stone-500 text-[13px] leading-relaxed mb-5"
                style={{ fontFamily: 'var(--font-body)', fontWeight: 300 }}
              >
                Contactez le cabinet par téléphone ou via le formulaire. Confirmation sous 24h.
              </p>

              {/* Contact infos */}
              <div className="space-y-4 mb-5">
                {contactInfos.map(({ icon: Icon, label, content, href }) => (
                  <div key={label} className="flex items-start gap-3">
                    <div
                      className="w-9 h-9 flex items-center justify-center shrink-0 border border-stone-200"
                      style={{ background: 'var(--color-cream)' }}
                    >
                      <Icon size={13} className="text-stone-600" />
                    </div>
                    <div>
                      <p className="text-xs md:text-[9px] uppercase tracking-widest text-stone-400 mb-0.5" style={{ fontFamily: 'var(--font-body)' }}>
                        {label}
                      </p>
                      <a
                        href={href}
                        className="text-[13px] text-stone-700 hover:text-stone-900 transition-colors whitespace-pre-line"
                        style={{ fontFamily: 'var(--font-body)' }}
                      >
                        {content}
                      </a>
                    </div>
                  </div>
                ))}
              </div>

              {/* Hours */}
              <div className="flex items-start gap-3 mb-5">
                <div
                  className="w-9 h-9 flex items-center justify-center shrink-0 border border-stone-200"
                  style={{ background: 'var(--color-cream)' }}
                >
                  <Clock size={13} className="text-stone-600" />
                </div>
                <div className="flex-1">
                  <p className="text-xs md:text-[9px] uppercase tracking-widest text-stone-400 mb-2" style={{ fontFamily: 'var(--font-body)' }}>
                    Horaires
                  </p>
                  {hours.map((h) => (
                    <div key={h.day} className="flex justify-between text-[13px] mb-1" style={{ fontFamily: 'var(--font-body)' }}>
                      <span className="text-stone-600">{h.day}</span>
                      <span className={h.open ? 'text-stone-800 font-medium' : 'text-stone-400 italic'}>{h.time}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA to form */}
              <button
                onClick={() => setMobileTab('form')}
                className="w-full bg-[var(--color-ink)] text-[var(--color-cream)] text-xs md:text-[10px] py-4 uppercase tracking-widest"
                style={{ fontFamily: 'var(--font-body)' }}
              >
                Envoyer un message →
              </button>
            </div>
          ) : (
            <div>
              {submitted ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div
                    className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-5"
                    style={{ background: 'var(--color-sage-light)' }}
                  >
                    <Send size={22} style={{ color: 'var(--color-sage)' }} />
                  </div>
                  <h3 className="text-2xl text-stone-800 mb-3" style={{ fontFamily: 'var(--font-display)', fontWeight: 500 }}>
                    Message envoyé !
                  </h3>
                  <p className="text-stone-500 text-sm" style={{ fontFamily: 'var(--font-body)', fontWeight: 300 }}>
                    Nous vous confirmerons votre rendez-vous dans les 24 heures.
                  </p>
                </div>
              ) : (
                <form className="space-y-3.5" onSubmit={handleSubmit}>
                  <div className="grid grid-cols-2 gap-3">
                    {['Prénom', 'Nom'].map((label) => (
                      <div key={label}>
                        <label className="block text-xs md:text-[9px] uppercase tracking-widest text-stone-400 mb-1" style={{ fontFamily: 'var(--font-body)' }}>
                          {label}
                        </label>
                        <input
                          type="text"
                          className="w-full border border-stone-200 bg-[var(--color-cream)] px-3 py-2.5 text-sm text-stone-700 focus:outline-none focus:border-stone-400"
                          placeholder={label === 'Prénom' ? 'Arthur' : 'Pales'}
                          style={{ fontFamily: 'var(--font-body)' }}
                        />
                      </div>
                    ))}
                  </div>

                  <div>
                    <label className="block text-xs md:text-[9px] uppercase tracking-widest text-stone-400 mb-1" style={{ fontFamily: 'var(--font-body)' }}>Email</label>
                    <input
                      type="email"
                      required
                      className="w-full border border-stone-200 bg-[var(--color-cream)] px-3 py-2.5 text-sm text-stone-700 focus:outline-none focus:border-stone-400"
                      placeholder="sophie@exemple.fr"
                      style={{ fontFamily: 'var(--font-body)' }}
                    />
                  </div>

                  <div>
                    <label className="block text-xs md:text-[9px] uppercase tracking-widest text-stone-400 mb-1" style={{ fontFamily: 'var(--font-body)' }}>Téléphone</label>
                    <input
                      type="tel"
                      className="w-full border border-stone-200 bg-[var(--color-cream)] px-3 py-2.5 text-sm text-stone-700 focus:outline-none focus:border-stone-400"
                      placeholder="06 XX XX XX XX"
                      style={{ fontFamily: 'var(--font-body)' }}
                    />
                  </div>

                  <div>
                    <label className="block text-xs md:text-[9px] uppercase tracking-widest text-stone-400 mb-1" style={{ fontFamily: 'var(--font-body)' }}>Motif</label>
                    <div className="relative">
                      <select
                        className="w-full border border-stone-200 bg-[var(--color-cream)] px-3 py-2.5 text-sm text-stone-700 focus:outline-none focus:border-stone-400 appearance-none pr-8"
                        style={{ fontFamily: 'var(--font-body)' }}
                      >
                        <option value="">Choisissez un motif</option>
                        {motifs.map((m) => <option key={m}>{m}</option>)}
                      </select>
                      <ChevronDown size={13} className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 pointer-events-none" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs md:text-[9px] uppercase tracking-widest text-stone-400 mb-1" style={{ fontFamily: 'var(--font-body)' }}>Message</label>
                    <textarea
                      rows={3}
                      className="w-full border border-stone-200 bg-[var(--color-cream)] px-3 py-2.5 text-sm text-stone-700 focus:outline-none focus:border-stone-400 resize-none"
                      placeholder="Décrivez brièvement votre problème et vos disponibilités..."
                      style={{ fontFamily: 'var(--font-body)' }}
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[var(--color-ink)] text-[var(--color-cream)] text-xs md:text-[10px] py-4 uppercase tracking-widest flex items-center justify-center gap-2"
                    style={{ fontFamily: 'var(--font-body)' }}
                  >
                    <Send size={12} /> Envoyer ma demande
                  </button>

                  <p className="text-center text-xs md:text-[10px] text-stone-400" style={{ fontFamily: 'var(--font-body)' }}>
                    Données traitées conformément au RGPD.
                  </p>
                </form>
              )}
            </div>
          )}
        </div>
      </div>

      {/* ── Desktop layout (unchanged) ── */}
      <div className="hidden md:block py-28">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16">
            <div data-contact-info>
              <SectionLabel>Contact & Rendez-vous</SectionLabel>
              <SectionHeading className="text-4xl md:text-5xl mt-1 mb-5">
                Prenez{' '}
                <em style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic' }}>rendez-vous</em>
              </SectionHeading>
              <p className="text-stone-500 text-sm leading-relaxed mb-10" style={{ fontFamily: 'var(--font-body)', fontWeight: 300 }}>
                Contactez le cabinet par téléphone ou via le formulaire.
                Nous vous rappelons dans les 24 heures pour confirmer votre créneau.
                Consultations sur rendez-vous uniquement.
              </p>

              <div className="space-y-5 mb-10">
                {contactInfos.map(({ icon: Icon, label, content, href }) => (
                  <div key={label} className="flex items-start gap-4">
                    <div className="w-10 h-10 flex items-center justify-center shrink-0 border border-stone-200" style={{ background: 'var(--color-cream)' }}>
                      <Icon size={15} className="text-stone-600" />
                    </div>
                    <div>
                      <p className="text-xs md:text-[11px] uppercase tracking-widest text-stone-400 mb-1" style={{ fontFamily: 'var(--font-body)' }}>{label}</p>
                      <a href={href} className="text-sm text-stone-700 hover:text-stone-900 transition-colors whitespace-pre-line" style={{ fontFamily: 'var(--font-body)' }}>
                        {content}
                      </a>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 flex items-center justify-center shrink-0 border border-stone-200" style={{ background: 'var(--color-cream)' }}>
                  <Clock size={15} className="text-stone-600" />
                </div>
                <div className="flex-1">
                  <p className="text-xs md:text-[11px] uppercase tracking-widest text-stone-400 mb-2" style={{ fontFamily: 'var(--font-body)' }}>Horaires</p>
                  {[
                    { day: 'Lundi – Vendredi', time: '9h00 – 19h00', open: true },
                    { day: 'Samedi', time: '9h00 – 13h00', open: true },
                    { day: 'Dimanche', time: 'Fermé', open: false },
                  ].map((h) => (
                    <div key={h.day} className="flex justify-between text-sm mb-1.5" style={{ fontFamily: 'var(--font-body)' }}>
                      <span className="text-stone-600">{h.day}</span>
                      <span className={h.open ? 'text-stone-800 font-medium' : 'text-stone-400 italic'}>{h.time}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 h-40 bg-stone-200 overflow-hidden relative">
                <img
                  src="https://images.pexels.com/photos/3617500/pexels-photo-3617500.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Quartier du cabinet – Paris 5e"
                  className="w-full h-full object-cover opacity-60"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <a
                    href="https://maps.google.com/?q=12+Rue+de+la+Santé+75005+Paris"
                    target="_blank" rel="noopener noreferrer"
                    className="bg-white/90 backdrop-blur-sm px-5 py-2.5 text-xs md:text-[11px] uppercase tracking-widest text-stone-700 hover:bg-white transition-colors shadow-sm"
                    style={{ fontFamily: 'var(--font-body)' }}
                  >
                    Voir sur Google Maps
                  </a>
                </div>
              </div>
            </div>

            <div data-contact-form>
              <div className="bg-white p-8 border border-stone-100 shadow-sm">
                {submitted ? (
                  <div className="text-center py-12">
                    <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-5" style={{ background: 'var(--color-sage-light)' }}>
                      <Send size={22} style={{ color: 'var(--color-sage)' }} />
                    </div>
                    <h3 className="text-2xl text-stone-800 mb-3" style={{ fontFamily: 'var(--font-display)', fontWeight: 500 }}>Message envoyé !</h3>
                    <p className="text-stone-500 text-sm" style={{ fontFamily: 'var(--font-body)', fontWeight: 300 }}>
                      Nous vous confirmerons votre rendez-vous dans les 24 heures.
                    </p>
                  </div>
                ) : (
                  <>
                    <h3 className="text-2xl text-stone-800 mb-6" style={{ fontFamily: 'var(--font-display)', fontWeight: 500 }}>Envoyer un message</h3>
                    <form className="space-y-4" onSubmit={handleSubmit}>
                      <div className="grid grid-cols-2 gap-4">
                        {['Prénom', 'Nom'].map((label) => (
                          <div key={label}>
                            <label className="block text-xs md:text-[10px] uppercase tracking-widest text-stone-400 mb-1.5" style={{ fontFamily: 'var(--font-body)' }}>{label}</label>
                            <input type="text" className="w-full border border-stone-200 bg-[var(--color-cream)] px-4 py-3 text-sm text-stone-700 focus:outline-none focus:border-stone-400" placeholder={label === 'Prénom' ? 'Arthur' : 'Pales'} style={{ fontFamily: 'var(--font-body)' }} />
                          </div>
                        ))}
                      </div>
                      <div>
                        <label className="block text-xs md:text-[10px] uppercase tracking-widest text-stone-400 mb-1.5" style={{ fontFamily: 'var(--font-body)' }}>Email</label>
                        <input type="email" required className="w-full border border-stone-200 bg-[var(--color-cream)] px-4 py-3 text-sm text-stone-700 focus:outline-none focus:border-stone-400" placeholder="sophie@exemple.fr" style={{ fontFamily: 'var(--font-body)' }} />
                      </div>
                      <div>
                        <label className="block text-xs md:text-[10px] uppercase tracking-widest text-stone-400 mb-1.5" style={{ fontFamily: 'var(--font-body)' }}>Téléphone</label>
                        <input type="tel" className="w-full border border-stone-200 bg-[var(--color-cream)] px-4 py-3 text-sm text-stone-700 focus:outline-none focus:border-stone-400" placeholder="06 XX XX XX XX" style={{ fontFamily: 'var(--font-body)' }} />
                      </div>
                      <div>
                        <label className="block text-xs md:text-[10px] uppercase tracking-widest text-stone-400 mb-1.5" style={{ fontFamily: 'var(--font-body)' }}>Motif de consultation</label>
                        <select className="w-full border border-stone-200 bg-[var(--color-cream)] px-4 py-3 text-sm text-stone-700 focus:outline-none focus:border-stone-400" style={{ fontFamily: 'var(--font-body)' }}>
                          <option value="">Choisissez un motif</option>
                          {motifs.map((m) => <option key={m}>{m}</option>)}
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs md:text-[10px] uppercase tracking-widest text-stone-400 mb-1.5" style={{ fontFamily: 'var(--font-body)' }}>Message</label>
                        <textarea rows={4} className="w-full border border-stone-200 bg-[var(--color-cream)] px-4 py-3 text-sm text-stone-700 focus:outline-none focus:border-stone-400 resize-none" placeholder="Décrivez brièvement votre problème et vos disponibilités..." style={{ fontFamily: 'var(--font-body)' }} />
                      </div>
                      <button type="submit" className="w-full bg-[var(--color-ink)] text-[var(--color-cream)] text-xs md:text-[11px] px-8 py-4 uppercase tracking-widest hover:bg-stone-700 transition-colors flex items-center justify-center gap-3" style={{ fontFamily: 'var(--font-body)' }}>
                        <Send size={13} /> Envoyer ma demande
                      </button>
                      <p className="text-center text-xs md:text-[11px] text-stone-400" style={{ fontFamily: 'var(--font-body)' }}>
                        Vos données sont traitées conformément au RGPD et ne sont jamais transmises à des tiers.
                      </p>
                    </form>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}