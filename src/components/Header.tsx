import { Phone, Mail, MapPin, Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="w-full">
      {/* Top bar */}
      <div className="bg-stone-100 border-b border-stone-200 py-2 px-6">
        <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-2 text-xs text-stone-500">
          <a href="mailto:contact@cabinet-osteo.fr" className="flex items-center gap-1.5 hover:text-stone-700 transition-colors">
            <Mail size={12} />
            contact@cabinet-osteo.fr
          </a>
          <a href="tel:+33612345678" className="flex items-center gap-1.5 hover:text-stone-700 transition-colors">
            <Phone size={12} />
            06 12 34 56 78
          </a>
          <span className="flex items-center gap-1.5">
            <MapPin size={12} />
            12 Rue de la Santé, Paris 75005
          </span>
        </div>
      </div>

      {/* Main nav */}
      <nav className="bg-white border-b border-stone-100 px-6 py-4 sticky top-0 z-50 shadow-sm">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <a href="#" className="text-2xl font-light tracking-widest text-stone-800 uppercase">
            Ostéo<span className="font-semibold">Paris</span>
          </a>

          {/* Desktop nav */}
          <ul className="hidden md:flex items-center gap-8 text-sm text-stone-600 tracking-wide">
            {['Accueil', 'À propos', 'Soins', 'Conditions', 'Contact'].map((item) => (
              <li key={item}>
                <a
                  href={`#${item.toLowerCase().replace('à ', '')}`}
                  className="hover:text-stone-900 hover:border-b hover:border-stone-900 pb-0.5 transition-all"
                >
                  {item}
                </a>
              </li>
            ))}
            <li>
              <a
                href="#contact"
                className="bg-stone-800 text-white text-xs px-5 py-2.5 uppercase tracking-widest hover:bg-stone-700 transition-colors"
              >
                Prendre RDV
              </a>
            </li>
          </ul>

          {/* Mobile toggle */}
          <button className="md:hidden text-stone-700" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-stone-100 pt-4">
            <ul className="flex flex-col gap-4 text-sm text-stone-600">
              {['Accueil', 'À propos', 'Soins', 'Conditions', 'Contact'].map((item) => (
                <li key={item}>
                  <a
                    href={`#${item.toLowerCase()}`}
                    className="hover:text-stone-900 transition-colors"
                    onClick={() => setMenuOpen(false)}
                  >
                    {item}
                  </a>
                </li>
              ))}
              <li>
                <a href="#contact" className="inline-block bg-stone-800 text-white text-xs px-5 py-2.5 uppercase tracking-widest hover:bg-stone-700 transition-colors">
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
