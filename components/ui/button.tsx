'use client';

import * as React from 'react';
import { tv } from 'tailwind-variants';

const buttonStyles = tv({
  base: 'inline-flex items-center justify-center rounded-md text-sm transition-colors focus-ring disabled:opacity-60 disabled:pointer-events-none',
  variants: {
    variant: {
      default: 'bg-white/10 hover:bg-white/15 text-white border border-white/10',
      ghost: 'bg-transparent hover:bg-white/5 text-white border border-white/10'
    },
    size: {
      md: 'h-9 px-4',
      lg: 'h-10 px-5'
    }
  },
  defaultVariants: {
    variant: 'default',
    size: 'md'
  }
});

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
  variant?: 'default' | 'ghost';
  size?: 'md' | 'lg';
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return <button ref={ref} className={buttonStyles({ variant, size, className })} {...props} />;
  }
);
Button.displayName = 'Button';


