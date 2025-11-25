'use client';

import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

export function Card({ children, className = '', onClick }: CardProps) {
  return (
    <div
      onClick={onClick}
      className={`glass p-6 rounded-xl transition-all duration-300 hover:shadow-glow-lg ${className}`}
    >
      {children}
    </div>
  );
}

export function CardHeader({ children }: { children: ReactNode }) {
  return <div className="mb-4">{children}</div>;
}

export function CardTitle({ children }: { children: ReactNode }) {
  return <h3 className="text-xl font-semibold text-white">{children}</h3>;
}

export function CardContent({ children }: { children: ReactNode }) {
  return <div className="text-white/80">{children}</div>;
}
