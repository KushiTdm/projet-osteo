// PATH: src/components/Footer.tsx
import { Phone, Mail, MapPin } from 'lucide-react';

const navLinks = [
  { label: 'Accueil', href: '#accueil' },
  { label: 'À propos', href: '#propos' },
  { label: 'Nos soins', href: '#soins' },
  { label: 'Pathologies traitées', href: '#conditions' },
  { label: 'Contact & RDV', href: '#contact' },
];

const soinsLinks = [
  "Consultation d'ostéopathie adulte",
  "Consultation d'ostéopathie du sportif",
  "Consultation d'ostéopathie enfant & nourrisson",
  "Consultation d'ostéopathie femme enceinte",
  "Consultation d'ostéopathie à domicile",
];

export default function Footer() {
  return (
    <footer className="bg-[var(--color-ink)] text-stone-400 pt-16 pb-8">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-10 mb-14">
          {/* Brand */}
          <div className="md:col-span-1">
            <p
              className="text-2xl tracking-widest text-white uppercase mb-4"
              style={{ fontFamily: 'var(--font-display)', fontWeight: 300 }}
            >
              Ostéo<span style={{ fontWeight: 600 }}>Paris</span>
            </p>
            <p
              className="text-[12px] leading-relaxed text-stone-500 mb-5"
              style={{ fontFamily: 'var(--font-body)', fontWeight: 300 }}
            >
              Cabinet d'ostéopathie au cœur du 5e arrondissement.
              Une approche globale et personnalisée pour retrouver l'équilibre de votre corps.
            </p>
            <div
              className="text-[10px] uppercase tracking-[0.25em] text-stone-600"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              Membre de la Chambre<br />Nationale des Ostéopathes
            </div>
          </div>

          {/* Navigation */}
          <div>
            <p
              className="text-[10px] uppercase tracking-widest text-stone-400 mb-4"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              Navigation
            </p>
            <ul className="space-y-2.5">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-[12px] text-stone-500 hover:text-stone-200 transition-colors"
                    style={{ fontFamily: 'var(--font-body)' }}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Soins */}
          <div>
            <p
              className="text-[10px] uppercase tracking-widest text-stone-400 mb-4"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              Nos soins
            </p>
            <ul className="space-y-2.5">
              {soinsLinks.map((item) => (
                <li key={item}>
                  <a
                    href="#soins"
                    className="text-[12px] text-stone-500 hover:text-stone-200 transition-colors"
                    style={{ fontFamily: 'var(--font-body)' }}
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p
              className="text-[10px] uppercase tracking-widest text-stone-400 mb-4"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              Contact
            </p>
            <ul className="space-y-3.5">
              <li className="flex items-start gap-2.5">
                <MapPin size={12} className="mt-0.5 shrink-0 text-stone-500" />
                <span
                  className="text-[12px] text-stone-500 leading-relaxed"
                  style={{ fontFamily: 'var(--font-body)' }}
                >
                  12 Rue de la Santé<br />75005 Paris – Métro Glacière
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone size={12} className="shrink-0 text-stone-500" />
                <a
                  href="tel:+33142345678"
                  className="text-[12px] text-stone-500 hover:text-stone-200 transition-colors"
                  style={{ fontFamily: 'var(--font-body)' }}
                >
                  01 42 34 56 78
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail size={12} className="shrink-0 text-stone-500" />
                <a
                  href="mailto:contact@osteeoparis.fr"
                  className="text-[12px] text-stone-500 hover:text-stone-200 transition-colors"
                  style={{ fontFamily: 'var(--font-body)' }}
                >
                  contact@osteeoparis.fr
                </a>
              </li>
            </ul>

            <a
              href="#contact"
              className="inline-block mt-6 bg-white/10 hover:bg-white/15 transition-colors text-white text-[10px] px-5 py-2.5 uppercase tracking-widest border border-white/10"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              Prendre RDV →
            </a>
          </div>
        </div>

        <div className="border-t border-stone-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p
            className="text-[11px] text-stone-600"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            © 2026 OstéoParis – Dr Arthur Pales. Tous droits réservés.
          </p>
          <div className="flex gap-6">
            {['Mentions légales', 'Politique de confidentialité', 'RGPD'].map((link) => (
              <a
                key={link}
                href="#"
                className="text-[11px] text-stone-600 hover:text-stone-400 transition-colors"
                style={{ fontFamily: 'var(--font-body)' }}
              >
                {link}
              </a>
            ))}
          </div>
        </div>

        {/* Neuraweb credit */}
        <div className="mt-6 text-center">
          <p
            className="text-[10px] text-stone-700 uppercase tracking-widest"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            Site réalisé par{' '}
            <a
              href="https://neuraweb.tech"
              target="_blank"
              rel="noopener noreferrer"
              className="text-stone-500 hover:text-stone-400 transition-colors"
            >
              Neuraweb.tech
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}