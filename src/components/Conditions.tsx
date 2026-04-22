import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

const conditions = [
  {
    name: 'Lombalgies & douleurs du dos',
    detail:
      'Douleurs lombaires aiguës ou chroniques, hernies discales, sciatiques, tensions musculaires profondes. L\'ostéopathie restaure la mobilité vertébrale et soulage les compressions nerveuses.',
  },
  {
    name: 'Cervicalgies & maux de tête',
    detail:
      'Raideur cervicale, migraines, céphalées de tension. Les manipulations douces libèrent les blocages et améliorent la circulation sanguine vers la tête.',
  },
  {
    name: 'Troubles digestifs',
    detail:
      'Colopathies fonctionnelles, reflux gastro-oesophagien, constipation. L\'ostéopathie viscérale agit sur les tensions des organes digestifs et leurs attaches ligamentaires.',
  },
  {
    name: 'Douleurs articulaires',
    detail:
      'Épaule, genou, cheville, hanche — blocages, entorses et douleurs chroniques. Le traitement mobilise les articulations et détend les tissus environnants.',
  },
  {
    name: 'Stress & troubles du sommeil',
    detail:
      'Fatigue chronique, anxiété, insomnie. L\'ostéopathie crânio-sacrée agit sur le système nerveux autonome pour induire un état de détente profonde.',
  },
  {
    name: 'Suivi de grossesse & bébés',
    detail:
      'Douleurs de grossesse (symphyse, sciatique), préparation à l\'accouchement. Pour les nourrissons : plagiocéphalies, coliques, troubles de l\'allaitement.',
  },
  {
    name: 'Ostéopathie du sportif',
    detail:
      'Prévention et récupération des blessures sportives, optimisation des performances, traitement des traumatismes répétitifs (tendinites, périostites, etc.).',
  },
];

export default function Conditions() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="conditions" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-start">
          {/* Left: accordion */}
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-stone-400 mb-3">
              Ce que nous traitons
            </p>
            <h2 className="text-3xl md:text-4xl font-light text-stone-800 mb-10">
              En savoir plus sur{' '}
              <span className="font-semibold italic">nos spécialités</span>
            </h2>

            <div className="divide-y divide-stone-100">
              {conditions.map((c, i) => (
                <div key={c.name}>
                  <button
                    className="w-full flex items-center justify-between py-4 text-left group"
                    onClick={() => setOpen(open === i ? null : i)}
                  >
                    <span className="text-sm font-medium text-stone-700 group-hover:text-stone-900 transition-colors">
                      {c.name}
                    </span>
                    {open === i ? (
                      <Minus size={16} className="text-stone-400 shrink-0 ml-4" />
                    ) : (
                      <Plus size={16} className="text-stone-400 shrink-0 ml-4" />
                    )}
                  </button>
                  {open === i && (
                    <p className="pb-5 text-sm text-stone-500 leading-relaxed pr-8">{c.detail}</p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Right: images mosaic */}
          <div className="grid grid-cols-2 gap-4 sticky top-24">
            <div className="col-span-2 h-52 overflow-hidden">
              <img
                src="https://images.pexels.com/photos/5699516/pexels-photo-5699516.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Soin ostéopathique"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="h-40 overflow-hidden">
              <img
                src="https://images.pexels.com/photos/8436582/pexels-photo-8436582.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Cabinet"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="h-40 overflow-hidden">
              <img
                src="https://images.pexels.com/photos/7615464/pexels-photo-7615464.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Consultation"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
