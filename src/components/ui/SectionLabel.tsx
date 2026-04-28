// PATH: src/components/ui/SectionLabel.tsx
interface SectionLabelProps {
  children: React.ReactNode;
  light?: boolean;
}

export function SectionLabel({ children, light = false }: SectionLabelProps) {
  return (
    <p
      className={`text-[10px] uppercase tracking-[0.3em] mb-3 font-body ${
        light ? 'text-stone-400/70' : 'text-stone-400'
      }`}
      style={{ fontFamily: 'var(--font-body)', letterSpacing: '0.3em' }}
    >
      {children}
    </p>
  );
}

// PATH: src/components/ui/SectionHeading.tsx
interface SectionHeadingProps {
  children: React.ReactNode;
  light?: boolean;
  className?: string;
}

export function SectionHeading({ children, light = false, className = '' }: SectionHeadingProps) {
  return (
    <h2
      className={`font-display font-light leading-tight ${
        light ? 'text-stone-100' : 'text-stone-800'
      } ${className}`}
      style={{ fontFamily: 'var(--font-display)' }}
    >
      {children}
    </h2>
  );
}

export function Divider({ light = false }: { light?: boolean }) {
  return (
    <div
      className={`w-12 h-px my-5 ${light ? 'bg-stone-600' : 'bg-stone-300'}`}
    />
  );
}