// PATH: src/App.tsx
import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Header from './components/Header';
import Hero from './components/Hero';
import MarqueeBanner from './components/MarqueeBanner';
import About from './components/About';
import Conditions from './components/Conditions';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';

gsap.registerPlugin(ScrollTrigger);

function App() {
  useEffect(() => {
    // Global ScrollTrigger refresh after all components mount
    setTimeout(() => ScrollTrigger.refresh(), 300);
    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, []);

  return (
    <div
      className="min-h-screen antialiased text-stone-800"
      style={{ backgroundColor: 'var(--color-cream)', fontFamily: 'var(--font-body)' }}
    >
      <Header />
      <main>
        <Hero />
        <MarqueeBanner />
        <About />
        <Conditions />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;