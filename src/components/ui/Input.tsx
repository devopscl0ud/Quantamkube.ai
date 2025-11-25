'use client';

import React, { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  icon?: ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, helperText, icon, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-white/90 mb-2">{label}</label>
        )}
        <div className="relative">
          {icon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50">
              {icon}
            </div>
          )}
          <input
            ref={ref}
            className={cn(
              'input-primary w-full',
              icon && 'pl-10',
              error && 'border-red-500 focus:ring-red-500 focus:border-red-500',
              className
            )}
            {...props}
          />
        </div>
        {error && <p className="text-red-400 text-sm mt-1">{error}</p>}
        {helperText && !error && <p className="text-white/50 text-sm mt-1">{helperText}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';
export default Input;
