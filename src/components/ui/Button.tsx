'use client';

import React, { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  children: ReactNode;
  loading?: boolean;
  fullWidth?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      children,
      loading = false,
      fullWidth = false,
      disabled,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      'font-semibold transition-all duration-300 flex items-center justify-center gap-2 rounded-lg focus-ring disabled:opacity-50 disabled:cursor-not-allowed';

    const variants = {
      primary:
        'bg-gradient-to-r from-primary-cyan to-primary-teal text-primary-dark hover:shadow-glow-lg hover:scale-105',
      secondary:
        'bg-white/10 border border-white/20 text-white hover:bg-white/20 hover:border-white/40 hover:shadow-glow',
      ghost: 'text-white hover:bg-white/10 hover:border hover:border-white/20',
      danger: 'bg-red-500/20 border border-red-500/50 text-red-300 hover:bg-red-500/30',
    };

    const sizes = {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2 text-base',
      lg: 'px-6 py-3 text-lg',
    };

    return (
      <button
        ref={ref}
        className={cn(
          baseStyles,
          variants[variant],
          sizes[size],
          fullWidth && 'w-full',
          className
        )}
        disabled={disabled || loading}
        {...props}
      >
        {loading && (
          <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
export default Button;
