import { CheckCircle } from 'lucide-react';

const highlights = [
  'Diplômé du Collège Ostéopathique Européen',
  'Membre de l\'Institut Français d\'Ostéopathie',
  'Spécialisé en ostéopathie pédiatrique et sportive',
  'Plus de 10 ans d\'expérience clinique',
];

export default function About() {
  return (
    <section id="propos" className="bg-stone-50 overflow-hidden">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 min-h-[70vh]">
        {/* Image */}
        <div className="relative h-80 md:h-auto">
          <img
            src="https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg?auto=compress&cs=tinysrgb&w=900"
            alt="Votre ostéopathe"
            className="absolute inset-0 w-full h-full object-cover object-top"
          />
        </div>

        {/* Text */}
        <div className="flex flex-col justify-center px-8 md:px-16 py-20">
          <p className="text-xs uppercase tracking-[0.25em] text-stone-400 mb-3">
            Votre ostéopathe
          </p>
          <h2 className="text-3xl md:text-4xl font-light text-stone-800 mb-2">
            Bonjour, je suis{' '}
            <span className="font-semibold italic">Dr Sophie Martin</span>
          </h2>
          <div className="w-10 h-0.5 bg-stone-300 my-5" />
          <p className="text-stone-500 text-sm leading-relaxed mb-5">
            Passionnée par la santé globale de mes patients, j'ai fondé ce cabinet avec la conviction
            que chaque corps possède une capacité naturelle d'auto-guérison qu'il convient de stimuler.
          </p>
          <p className="text-stone-500 text-sm leading-relaxed mb-8">
            Mon approche combine techniques structurelles, crâniennes et viscérales pour traiter
            non seulement le symptôme, mais aussi ses causes profondes. Chaque consultation est
            un temps d'écoute et d'échange dédié à votre mieux-être.
          </p>

          <ul className="space-y-3 mb-10">
            {highlights.map((h) => (
              <li key={h} className="flex items-start gap-3 text-sm text-stone-600">
                <CheckCircle size={16} className="text-stone-400 mt-0.5 shrink-0" />
                {h}
              </li>
            ))}
          </ul>

          <a
            href="#contact"
            className="inline-block self-start bg-stone-800 text-white text-xs px-8 py-4 uppercase tracking-widest hover:bg-stone-700 transition-colors"
          >
            Prendre rendez-vous
          </a>
        </div>
      </div>
    </section>
  );
}
