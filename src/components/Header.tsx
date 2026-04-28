// PATH: src/components/Header.tsx
import { Phone, Mail, MapPin, Menu, X } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';

const navLinks = [
  { label: 'Accueil', href: '#accueil' },
  { label: 'À propos', href: '#propos' },
  { label: 'Soins', href: '#soins' },
  { label: 'Contact', href: '#contact' },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const lastScrollY = useRef(0);
  const navRef = useRef<HTMLElement>(null);
  const topBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      const currentY = window.scrollY;
      const delta = currentY - lastScrollY.current;

      // Sticky trigger
      setScrolled(currentY > 60);

      // Hide on scroll down > 120px, show on scroll up
      if (currentY > 120 && delta > 4) {
        setHidden(true);
      } else if (delta < -4) {
        setHidden(false);
      }

      lastScrollY.current = currentY;
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Animate top bar out when scrolled
  useEffect(() => {
    if (!topBarRef.current) return;
    gsap.to(topBarRef.current, {
      height: scrolled ? 0 : 'auto',
      opacity: scrolled ? 0 : 1,
      duration: 0.35,
      ease: 'power2.inOut',
      overflow: 'hidden',
    });
  }, [scrolled]);

  return (
    <header className="w-full sticky top-0 z-50">
      {/* Top info bar */}
      <div
        ref={topBarRef}
        className="bg-[#2C2825] overflow-hidden"
        style={{ willChange: 'height, opacity' }}
      >
        <div className="py-2 px-6">
          <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-2 text-[11px] text-stone-400">
            <a
              href="mailto:contact@osteeoparis.fr"
              className="flex items-center gap-1.5 hover:text-stone-200 transition-colors"
            >
              <Mail size={11} />
              <span className="hidden sm:inline">contact@osteeoparis.fr</span>
            </a>
            <a
              href="tel:+33142345678"
              className="flex items-center gap-1.5 hover:text-stone-200 transition-colors"
            >
              <Phone size={11} />
              01 42 34 56 78
            </a>
            <span className="hidden md:flex items-center gap-1.5">
              <MapPin size={11} />
              12 Rue de la Santé, Paris 5e
            </span>
          </div>
        </div>
      </div>

      {/* Main nav */}
      <nav
        ref={navRef}
        className="px-4 md:px-6 transition-all duration-300"
        style={{
          background: scrolled
            ? 'rgba(247,244,239,0.92)'
            : 'var(--color-cream)',
          backdropFilter: scrolled ? 'blur(16px) saturate(1.4)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(16px) saturate(1.4)' : 'none',
          borderBottom: '1px solid',
          borderColor: scrolled ? 'rgba(44,40,37,0.10)' : 'rgba(44,40,37,0.08)',
          boxShadow: scrolled
            ? '0 2px 24px rgba(44,40,37,0.09), 0 1px 0 rgba(255,255,255,0.6) inset'
            : 'none',
          padding: scrolled ? '10px 16px' : '16px',
          transform: hidden ? 'translateY(-100%)' : 'translateY(0)',
          transition: 'transform 0.35s cubic-bezier(0.32,0,0.15,1), background 0.3s ease, box-shadow 0.3s ease, padding 0.3s ease',
        }}
      >
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <a
            href="#accueil"
            className="text-[var(--color-ink)] transition-all duration-300"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            <span
              className="uppercase tracking-widest"
              style={{
                fontSize: scrolled ? '1.1rem' : '1.35rem',
                transition: 'font-size 0.3s ease',
                fontWeight: 300,
              }}
            >
              Ostéo<span style={{ fontWeight: 600 }}>Paris</span>
            </span>
          </a>

          {/* Desktop nav */}
          <ul className="hidden md:flex items-center gap-6 lg:gap-8">
            {navLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="text-[11px] text-stone-500 tracking-widest uppercase hover:text-stone-900 transition-colors relative group"
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
                className="text-[10px] px-5 py-2.5 uppercase tracking-widest transition-all duration-200"
                style={{
                  fontFamily: 'var(--font-body)',
                  background: 'var(--color-ink)',
                  color: 'var(--color-cream)',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.background = '#44403c';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.background = 'var(--color-ink)';
                }}
              >
                Prendre RDV
              </a>
            </li>
          </ul>

          {/* Mobile toggle */}
          <button
            className="md:hidden text-stone-700 p-2 -mr-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile menu */}
        <div
          className="md:hidden overflow-hidden transition-all duration-300"
          style={{
            maxHeight: menuOpen ? '320px' : '0px',
            opacity: menuOpen ? 1 : 0,
          }}
        >
          <div className="pt-4 pb-5 border-t border-stone-200 mt-3">
            <ul className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="block py-2.5 px-2 text-sm text-stone-600 tracking-widest uppercase hover:text-stone-900 hover:bg-stone-50 transition-colors"
                    style={{ fontFamily: 'var(--font-body)' }}
                    onClick={() => setMenuOpen(false)}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li className="pt-2">
                <a
                  href="#contact"
                  className="block text-center bg-[var(--color-ink)] text-[var(--color-cream)] text-[10px] px-6 py-3.5 uppercase tracking-widest"
                  style={{ fontFamily: 'var(--font-body)' }}
                  onClick={() => setMenuOpen(false)}
                >
                  Prendre RDV
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}