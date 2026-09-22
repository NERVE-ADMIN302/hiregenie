import React from 'react';
import { motion } from 'framer-motion';

export function EmptyState({ title, description, icon: Icon }: any) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center justify-center p-12 text-center glass-card">
      {Icon && <Icon className="w-16 h-16 text-[var(--text-muted)] mb-4" />}
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-[var(--text-muted)]">{description}</p>
    </motion.div>
  );
}