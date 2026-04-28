// PATH: src/components/ui/index.tsx
import React from 'react';

interface SectionLabelProps {
  children: React.ReactNode;
  light?: boolean;
}

export function SectionLabel({ children, light = false }: SectionLabelProps) {
  return (
    <p
      className={`text-[10px] uppercase mb-3 ${light ? 'text-stone-500' : 'text-stone-400'}`}
      style={{ fontFamily: 'var(--font-body)', letterSpacing: '0.3em' }}
    >
      {children}
    </p>
  );
}

interface SectionHeadingProps {
  children: React.ReactNode;
  light?: boolean;
  className?: string;
}

export function SectionHeading({ children, light = false, className = '' }: SectionHeadingProps) {
  return (
    <h2
      className={`font-light leading-tight ${light ? 'text-stone-100' : 'text-stone-800'} ${className}`}
      style={{ fontFamily: 'var(--font-display)' }}
    >
      {children}
    </h2>
  );
}

export function Divider({ light = false }: { light?: boolean }) {
  return (
    <div className={`w-12 h-px my-5 ${light ? 'bg-stone-600' : 'bg-stone-300'}`} />
  );
}