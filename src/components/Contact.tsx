import { Phone, Mail, MapPin, Clock } from 'lucide-react';

const hours = [
  { day: 'Lundi – Vendredi', time: '9h00 – 19h00' },
  { day: 'Samedi', time: '9h00 – 13h00' },
  { day: 'Dimanche', time: 'Fermé' },
];

export default function Contact() {
  return (
    <section id="contact" className="py-24 bg-stone-50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16">
          {/* Info */}
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-stone-400 mb-3">Contact</p>
            <h2 className="text-3xl md:text-4xl font-light text-stone-800 mb-8">
              Prenez <span className="font-semibold italic">rendez-vous</span>
            </h2>
            <p className="text-stone-500 text-sm leading-relaxed mb-10">
              Contactez-nous par téléphone, email ou remplissez le formulaire. Nous vous répondrons
              dans les 24 heures pour confirmer votre consultation.
            </p>

            <div className="space-y-5 mb-10">
              <div className="flex items-start gap-4">
                <div className="bg-stone-200 p-2.5 rounded-sm mt-0.5">
                  <MapPin size={16} className="text-stone-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-stone-800">Adresse</p>
                  <p className="text-sm text-stone-500 mt-0.5">12 Rue de la Santé<br />75005 Paris</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-stone-200 p-2.5 rounded-sm mt-0.5">
                  <Phone size={16} className="text-stone-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-stone-800">Téléphone</p>
                  <a href="tel:+33612345678" className="text-sm text-stone-500 hover:text-stone-700 transition-colors mt-0.5 block">
                    06 12 34 56 78
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-stone-200 p-2.5 rounded-sm mt-0.5">
                  <Mail size={16} className="text-stone-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-stone-800">Email</p>
                  <a href="mailto:contact@cabinet-osteo.fr" className="text-sm text-stone-500 hover:text-stone-700 transition-colors mt-0.5 block">
                    contact@cabinet-osteo.fr
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-stone-200 p-2.5 rounded-sm mt-0.5">
                  <Clock size={16} className="text-stone-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-stone-800 mb-2">Horaires</p>
                  {hours.map((h) => (
                    <div key={h.day} className="flex justify-between gap-8 text-sm text-stone-500 mb-1">
                      <span>{h.day}</span>
                      <span className={h.time === 'Fermé' ? 'text-stone-400 italic' : ''}>{h.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="bg-white p-8 shadow-sm border border-stone-100">
            <h3 className="text-lg font-semibold text-stone-800 mb-6">Envoyer un message</h3>
            <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-stone-500 mb-1.5">Prénom</label>
                  <input
                    type="text"
                    className="w-full border border-stone-200 px-4 py-3 text-sm text-stone-700 focus:outline-none focus:border-stone-400 transition-colors"
                    placeholder="Sophie"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-stone-500 mb-1.5">Nom</label>
                  <input
                    type="text"
                    className="w-full border border-stone-200 px-4 py-3 text-sm text-stone-700 focus:outline-none focus:border-stone-400 transition-colors"
                    placeholder="Martin"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs uppercase tracking-wider text-stone-500 mb-1.5">Email</label>
                <input
                  type="email"
                  className="w-full border border-stone-200 px-4 py-3 text-sm text-stone-700 focus:outline-none focus:border-stone-400 transition-colors"
                  placeholder="sophie@exemple.fr"
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-wider text-stone-500 mb-1.5">Téléphone</label>
                <input
                  type="tel"
                  className="w-full border border-stone-200 px-4 py-3 text-sm text-stone-700 focus:outline-none focus:border-stone-400 transition-colors"
                  placeholder="06 XX XX XX XX"
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-wider text-stone-500 mb-1.5">Motif de consultation</label>
                <select className="w-full border border-stone-200 px-4 py-3 text-sm text-stone-700 focus:outline-none focus:border-stone-400 transition-colors bg-white">
                  <option value="">Choisissez un motif</option>
                  <option>Douleurs du dos / lombalgies</option>
                  <option>Cervicalgies / maux de tête</option>
                  <option>Troubles digestifs</option>
                  <option>Douleurs articulaires</option>
                  <option>Suivi nourrisson / pédiatrie</option>
                  <option>Bilan général / prévention</option>
                  <option>Autre</option>
                </select>
              </div>
              <div>
                <label className="block text-xs uppercase tracking-wider text-stone-500 mb-1.5">Message</label>
                <textarea
                  rows={4}
                  className="w-full border border-stone-200 px-4 py-3 text-sm text-stone-700 focus:outline-none focus:border-stone-400 transition-colors resize-none"
                  placeholder="Décrivez brièvement votre problème..."
                />
              </div>
              <button
                type="submit"
                className="w-full bg-stone-800 text-white text-xs px-8 py-4 uppercase tracking-widest hover:bg-stone-700 transition-colors"
              >
                Envoyer ma demande
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
