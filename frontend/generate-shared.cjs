const fs = require('fs');
const path = require('path');

const sharedComponents = {
  'LoadingSkeleton.tsx': `import React from 'react';

export function LoadingSkeleton() {
  return (
    <div className="space-y-4">
      <div className="skeleton h-8 w-1/3 rounded-lg"></div>
      <div className="skeleton h-32 w-full rounded-lg"></div>
      <div className="skeleton h-32 w-full rounded-lg"></div>
    </div>
  );
}`,
  'EmptyState.tsx': `import React from 'react';
import { motion } from 'framer-motion';

export function EmptyState({ title, description, icon: Icon }: any) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center justify-center p-12 text-center glass-card">
      {Icon && <Icon className="w-16 h-16 text-[var(--text-muted)] mb-4" />}
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-[var(--text-muted)]">{description}</p>
    </motion.div>
  );
}`,
  'Badge.tsx': `import React from 'react';
import { cn } from '@/lib/utils';

export function Badge({ children, variant = 'neutral' }: any) {
  const variants = {
    success: 'bg-emerald-500/10 text-emerald-500',
    warning: 'bg-amber-500/10 text-amber-500',
    danger: 'bg-rose-500/10 text-rose-500',
    info: 'bg-blue-500/10 text-blue-500',
    neutral: 'bg-[var(--surface)] text-[var(--text-muted)] border border-[var(--border)]',
  };
  return <span className={cn("px-2.5 py-0.5 rounded-full text-xs font-medium", variants[variant])}>{children}</span>;
}`,
  'Modal.tsx': `import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

export function Modal({ isOpen, onClose, children, title }: any) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50" onClick={onClose} />
          <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }} className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg z-50 p-6 glass-card shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">{title}</h2>
              <button onClick={onClose} className="p-2 hover:bg-[var(--border)] rounded-full transition-colors"><X className="w-5 h-5" /></button>
            </div>
            {children}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}`,
  'DataTable.tsx': `import React from 'react';

export function DataTable({ columns, data }: any) {
  return (
    <div className="w-full overflow-x-auto rounded-lg border border-[var(--border)] bg-[var(--surface)]">
      <table className="w-full text-left text-sm">
        <thead className="bg-[var(--bg)] border-b border-[var(--border)]">
          <tr>{columns.map((col: any) => <th key={col.key} className="px-6 py-4 font-medium text-[var(--text-muted)]">{col.label}</th>)}</tr>
        </thead>
        <tbody>
          {data.map((row: any, i: number) => (
            <tr key={i} className="border-b border-[var(--border)] last:border-0 hover:bg-[var(--border)] transition-colors">
              {columns.map((col: any) => <td key={col.key} className="px-6 py-4">{row[col.key]}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}`
};

for (const [file, content] of Object.entries(sharedComponents)) {
  const fullPath = path.join(__dirname, 'src', 'components', 'shared', file);
  fs.writeFileSync(fullPath, content.trim() + '\\n');
  console.log("Created shared/" + file);
}
