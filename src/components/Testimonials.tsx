const testimonials = [
  {
    name: 'Marie L.',
    role: 'Patiente depuis 3 ans',
    quote:
      'Après des années de lombalgies invalidantes, j\'ai enfin trouvé un soulagement durable grâce au cabinet. L\'approche globale de Dr Martin fait toute la différence.',
  },
  {
    name: 'Thomas R.',
    role: 'Sportif amateur',
    quote:
      'Suivi régulier en tant que coureur. Les séances m\'ont permis de reprendre l\'entraînement sans douleur après une blessure à la cheville. Je recommande vivement.',
  },
  {
    name: 'Camille D.',
    role: 'Jeune maman',
    quote:
      'J\'ai amené mon bébé de 3 mois pour des coliques. Résultats visibles dès la première séance. Un cabinet de confiance, à l\'écoute et très professionnel.',
  },
];

export default function Testimonials() {
  return (
    <section className="py-24 bg-stone-800 text-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-xs uppercase tracking-[0.25em] text-stone-400 mb-3">Témoignages</p>
          <h2 className="text-3xl md:text-4xl font-light">
            Ce que disent{' '}
            <span className="font-semibold italic">nos patients</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t) => (
            <div key={t.name} className="bg-stone-700/40 p-8 border border-stone-700">
              <div className="flex gap-1 mb-5">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-amber-400 text-sm">★</span>
                ))}
              </div>
              <p className="text-stone-300 text-sm leading-relaxed mb-6 italic">"{t.quote}"</p>
              <div>
                <p className="text-white font-semibold text-sm">{t.name}</p>
                <p className="text-stone-400 text-xs mt-0.5">{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
