import { Phone, Mail, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-stone-900 text-stone-400 pt-16 pb-8">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <p className="text-xl font-light tracking-widest text-white uppercase mb-4">
              Ostéo<span className="font-semibold">Paris</span>
            </p>
            <p className="text-xs leading-relaxed text-stone-500">
              Cabinet d'ostéopathie au cœur de Paris. Une approche globale et personnalisée pour votre santé.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <p className="text-xs uppercase tracking-widest text-stone-300 mb-4">Navigation</p>
            <ul className="space-y-2 text-xs">
              {['Accueil', 'À propos', 'Nos soins', 'Conditions traitées', 'Contact'].map((item) => (
                <li key={item}>
                  <a href="#" className="hover:text-stone-200 transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Soins */}
          <div>
            <p className="text-xs uppercase tracking-widest text-stone-300 mb-4">Nos soins</p>
            <ul className="space-y-2 text-xs">
              {[
                'Ostéopathie structurelle',
                'Ostéopathie crânienne',
                'Ostéopathie viscérale',
                'Pédiatrie',
                'Ostéopathie du sportif',
              ].map((item) => (
                <li key={item}>
                  <a href="#soins" className="hover:text-stone-200 transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="text-xs uppercase tracking-widest text-stone-300 mb-4">Contact</p>
            <ul className="space-y-3 text-xs">
              <li className="flex items-start gap-2.5">
                <MapPin size={13} className="mt-0.5 shrink-0" />
                <span>12 Rue de la Santé<br />75005 Paris</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone size={13} className="shrink-0" />
                <a href="tel:+33612345678" className="hover:text-stone-200 transition-colors">06 12 34 56 78</a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail size={13} className="shrink-0" />
                <a href="mailto:contact@cabinet-osteo.fr" className="hover:text-stone-200 transition-colors">contact@cabinet-osteo.fr</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-stone-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-stone-600">
          <p>© 2026 OstéoParis. Tous droits réservés.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-stone-400 transition-colors">Mentions légales</a>
            <a href="#" className="hover:text-stone-400 transition-colors">Politique de confidentialité</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
