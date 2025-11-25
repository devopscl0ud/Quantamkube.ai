'use client';

import { ReactNode } from 'react';

export interface DialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: ReactNode;
}

export interface DialogContentProps {
  children: ReactNode;
  className?: string;
}

export interface DialogHeaderProps {
  children: ReactNode;
  className?: string;
}

export interface DialogTitleProps {
  children: ReactNode;
  className?: string;
}

export function Dialog({ open, onOpenChange, children }: DialogProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
        onClick={() => onOpenChange(false)}
      />
      <div className="relative z-50">{children}</div>
    </div>
  );
}

export function DialogContent({ children, className = '' }: DialogContentProps) {
  return (
    <div className={`glass p-6 rounded-xl max-w-md w-full mx-4 ${className}`}>
      {children}
    </div>
  );
}

export function DialogHeader({ children, className = '' }: DialogHeaderProps) {
  return <div className={`mb-4 ${className}`}>{children}</div>;
}

export function DialogTitle({ children, className = '' }: DialogTitleProps) {
  return <h2 className={`text-2xl font-bold gradient-text-cyan ${className}`}>{children}</h2>;
}
