import React from 'react';
import { cn } from '@/lib/utils';

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'success' | 'error' | 'warning';
  children: React.ReactNode;
}

export const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant = 'default', children, ...props }, ref) => {
    const variants = {
      default: 'bg-nexa-600/20 text-nexa-300 border-nexa-600/30',
      success: 'bg-green-600/20 text-green-300 border-green-600/30',
      error: 'bg-red-600/20 text-red-300 border-red-600/30',
      warning: 'bg-yellow-600/20 text-yellow-300 border-yellow-600/30',
    };

    return (
      <div
        ref={ref}
        className={cn(
          'inline-flex items-center px-3 py-1 rounded-full border text-xs font-medium',
          variants[variant],
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Badge.displayName = 'Badge';
