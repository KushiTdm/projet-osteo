import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function Hero() {
  const textRef = useRef(null);
  const imageRef = useRef(null);
  const taglineRef = useRef(null);
  const titleRef = useRef(null);
  const descRef = useRef(null);
  const buttonsRef = useRef(null);
  const cardRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      tl.from(taglineRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.8,
      })
        .from(
          titleRef.current,
          {
            opacity: 0,
            y: 30,
            duration: 1,
          },
          '-=0.4'
        )
        .from(
          descRef.current,
          {
            opacity: 0,
            y: 20,
            duration: 0.8,
          },
          '-=0.5'
        )
        .from(
          buttonsRef.current,
          {
            opacity: 0,
            y: 20,
            duration: 0.8,
          },
          '-=0.5'
        )
        .from(
          imageRef.current,
          {
            opacity: 0,
            scale: 0.95,
            duration: 1.2,
          },
          '-=1'
        )
        .from(
          cardRef.current,
          {
            opacity: 0,
            x: -30,
            duration: 0.8,
          },
          '-=0.6'
        );
    }, textRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="accueil" className="relative bg-stone-50 overflow-hidden" ref={textRef}>
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 min-h-[88vh]">
        {/* Text side */}
        <div className="flex flex-col justify-center px-8 py-20 md:py-32 md:pr-16 order-2 md:order-1">
          <p ref={taglineRef} className="text-xs tracking-[0.25em] uppercase text-stone-400 mb-4">
            Ostéopathie · Santé · Bien-être
          </p>
          <h1 ref={titleRef} className="text-4xl md:text-5xl lg:text-6xl font-light text-stone-800 leading-tight mb-6">
            Le cabinet
            <br />
            <span className="font-semibold italic">d'ostéopathie</span>
            <br />
            de référence à Paris
          </h1>
          <p ref={descRef} className="text-stone-500 leading-relaxed mb-10 max-w-md text-sm md:text-base">
            Nous offrons des soins ostéopathiques personnalisés pour soulager vos douleurs,
            restaurer votre mobilité et optimiser votre bien-être. Une approche globale,
            douce et efficace adaptée à chaque patient.
          </p>
          <div ref={buttonsRef} className="flex flex-wrap gap-4">
            <a
              href="#contact"
              className="bg-stone-800 text-white text-xs px-8 py-4 uppercase tracking-widest hover:bg-stone-700 transition-colors"
            >
              Prendre rendez-vous
            </a>
            <a
              href="#soins"
              className="border border-stone-300 text-stone-700 text-xs px-8 py-4 uppercase tracking-widest hover:bg-stone-100 transition-colors"
            >
              Nos soins
            </a>
          </div>
        </div>

        {/* Image side */}
        <div ref={imageRef} className="relative order-1 md:order-2 h-72 md:h-auto">
          <img
            src="https://images.pexels.com/photos/7516352/pexels-photo-7516352.jpeg?auto=compress&cs=tinysrgb&w=1200"
            alt="Cabinet d'ostéopathie"
            className="absolute inset-0 w-full h-full object-cover"
          />
          {/* Subtle overlay card */}
          <div ref={cardRef} className="absolute bottom-8 left-8 bg-white/90 backdrop-blur-sm p-5 shadow-lg max-w-[220px] hidden md:block">
            <p className="text-xs uppercase tracking-widest text-stone-400 mb-1">Depuis 2015</p>
            <p className="text-2xl font-semibold text-stone-800">+2 400</p>
            <p className="text-xs text-stone-500 mt-1">patients accompagnés</p>
          </div>
        </div>
      </div>
    </section>
  );
}
