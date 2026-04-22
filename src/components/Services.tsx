import { ArrowRight } from 'lucide-react';

const services = [
  {
    title: 'Ostéopathie structurelle',
    description:
      'Traitement des dysfonctions articulaires, musculaires et squelettiques. Idéal pour les douleurs lombaires, cervicales et les tensions chroniques.',
    image:
      'https://images.pexels.com/photos/8436489/pexels-photo-8436489.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    title: 'Ostéopathie crânienne',
    description:
      'Approche douce agissant sur les membranes crâniennes et le liquide céphalo-rachidien. Indiquée pour les maux de tête, le stress et les troubles du sommeil.',
    image:
      'https://images.pexels.com/photos/5699514/pexels-photo-5699514.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    title: 'Suivi personnalisé',
    description:
      'Programme de soins adapté à votre mode de vie, avec exercices correctifs et conseils posturaux pour prolonger les bénéfices de chaque séance.',
    image:
      'https://images.pexels.com/photos/6551173/pexels-photo-6551173.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
];

export default function Services() {
  return (
    <section id="soins" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-xs uppercase tracking-[0.25em] text-stone-400 mb-3">Nos soins</p>
          <h2 className="text-3xl md:text-4xl font-light text-stone-800">
            Comment nous vous aidons à{' '}
            <span className="font-semibold italic">retrouver la santé</span>
          </h2>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {services.map((s) => (
            <div key={s.title} className="group flex flex-col">
              <div className="overflow-hidden h-60">
                <img
                  src={s.image}
                  alt={s.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="border border-stone-100 border-t-0 p-6 flex flex-col flex-1">
                <h3 className="text-base font-semibold text-stone-800 mb-3">{s.title}</h3>
                <p className="text-sm text-stone-500 leading-relaxed flex-1">{s.description}</p>
                <a
                  href="#contact"
                  className="mt-5 inline-flex items-center gap-2 text-xs uppercase tracking-widest text-stone-700 hover:text-stone-900 transition-colors group/link"
                >
                  En savoir plus
                  <ArrowRight size={13} className="group-hover/link:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
