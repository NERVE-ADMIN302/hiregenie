import React from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { LucideIcon, TrendingUp, TrendingDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: number;
  className?: string;
  color?: string;
}

export function StatCard({ title, value, icon: Icon, trend, className, color = 'indigo' }: StatCardProps) {
  const colorMap: Record<string, { bg: string; text: string; glow: string }> = {
    indigo: { bg: 'rgba(129, 140, 248, 0.1)', text: '#818cf8', glow: 'rgba(129, 140, 248, 0.15)' },
    emerald: { bg: 'rgba(52, 211, 153, 0.1)', text: '#34d399', glow: 'rgba(52, 211, 153, 0.15)' },
    pink: { bg: 'rgba(244, 114, 182, 0.1)', text: '#f472b6', glow: 'rgba(244, 114, 182, 0.15)' },
    amber: { bg: 'rgba(251, 191, 36, 0.1)', text: '#fbbf24', glow: 'rgba(251, 191, 36, 0.15)' },
  };
  const c = colorMap[color] || colorMap.indigo;

  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.03 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className={cn("glass-card p-6 flex items-start justify-between group cursor-default", className)}
      style={{ '--card-glow': c.glow } as React.CSSProperties}
    >
      <div className="space-y-1">
        <p className="text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider">{title}</p>
        <motion.h3
          className="text-3xl font-bold text-[var(--text)] font-['Outfit']"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.4 }}
        >
          {value}
        </motion.h3>
        {trend !== undefined && (
          <div className={cn("flex items-center gap-1 text-xs font-semibold mt-1", trend >= 0 ? "text-emerald-400" : "text-rose-400")}>
            {trend >= 0 ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
            {trend >= 0 ? '+' : ''}{trend}% from last month
          </div>
        )}
      </div>

      <motion.div
        className="p-3.5 rounded-2xl border border-transparent group-hover:border-[var(--border)] transition-all duration-300"
        style={{ background: c.bg }}
        whileHover={{ rotate: 8 }}
      >
        <Icon className="w-6 h-6" style={{ color: c.text }} />
      </motion.div>
    </motion.div>
  );
}