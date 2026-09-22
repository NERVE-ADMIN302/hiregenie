import React from 'react';
import { cn } from '@/lib/utils';

export function Badge({ children, variant = 'neutral' }: any) {
  const variants = {
    success: 'bg-emerald-500/10 text-emerald-500',
    warning: 'bg-amber-500/10 text-amber-500',
    danger: 'bg-rose-500/10 text-rose-500',
    info: 'bg-blue-500/10 text-blue-500',
    neutral: 'bg-[var(--surface)] text-[var(--text-muted)] border border-[var(--border)]',
  };
  const vClass = (variants as Record<string, string>)[variant] || variants.neutral;
  return <span className={cn("px-2.5 py-0.5 rounded-full text-xs font-medium", vClass)}>{children}</span>;
}