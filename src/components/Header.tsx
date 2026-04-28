// PATH: src/components/Header.tsx
import { Phone, Mail, MapPin, Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';

const navLinks = [
  { label: 'Accueil', href: '#accueil' },
  { label: 'À propos', href: '#propos' },
  { label: 'Soins', href: '#soins' },
  { label: 'Pathologies', href: '#conditions' },
  { label: 'Contact', href: '#contact' },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className="w-full">
      {/* Top info bar */}
      <div className="bg-[#2C2825] py-2 px-6">
        <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-2 text-[11px] text-stone-400">
          <a
            href="mailto:contact@osteeoparis.fr"
            className="flex items-center gap-1.5 hover:text-stone-200 transition-colors"
          >
            <Mail size={11} />
            contact@osteeoparis.fr
          </a>
          <a
            href="tel:+33142345678"
            className="flex items-center gap-1.5 hover:text-stone-200 transition-colors"
          >
            <Phone size={11} />
            01 42 34 56 78
          </a>
          <span className="flex items-center gap-1.5">
            <MapPin size={11} />
            12 Rue de la Santé, Paris 5e
          </span>
        </div>
      </div>

      {/* Main nav */}
      <nav
        className={`bg-[var(--color-cream)] px-6 py-4 sticky top-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'shadow-[0_2px_20px_rgba(44,40,37,0.08)] border-b border-stone-200'
            : 'border-b border-stone-200/60'
        }`}
      >
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <a
            href="#accueil"
            className="text-[var(--color-ink)]"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            <span className="text-2xl font-light tracking-widest uppercase">
              Ostéo<span className="font-semibold">Paris</span>
            </span>
          </a>

          {/* Desktop nav */}
          <ul className="hidden md:flex items-center gap-7">
            {navLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="text-[12px] text-stone-500 tracking-widest uppercase hover:text-stone-900 transition-colors relative group"
                  style={{ fontFamily: 'var(--font-body)' }}
                >
                  {link.label}
                  <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-stone-800 group-hover:w-full transition-all duration-300" />
                </a>
              </li>
            ))}
            <li>
              <a
                href="#contact"
                className="bg-[var(--color-ink)] text-[var(--color-cream)] text-[11px] px-6 py-3 uppercase tracking-widest hover:bg-stone-700 transition-colors"
                style={{ fontFamily: 'var(--font-body)' }}
              >
                Prendre RDV
              </a>
            </li>
          </ul>

          {/* Mobile toggle */}
          <button
            className="md:hidden text-stone-700"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-stone-200 pt-4">
            <ul className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-stone-600 tracking-widest uppercase hover:text-stone-900 transition-colors"
                    onClick={() => setMenuOpen(false)}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="#contact"
                  className="inline-block bg-[var(--color-ink)] text-[var(--color-cream)] text-[11px] px-6 py-3 uppercase tracking-widest"
                  onClick={() => setMenuOpen(false)}
                >
                  Prendre RDV
                </a>
              </li>
            </ul>
          </div>
        )}
      </nav>
    </header>
  );
}