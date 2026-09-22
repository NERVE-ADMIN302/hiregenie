import React from 'react';
import { Activity, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';

const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.07 }
  }
};

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export function SystemLogs() {
  const logs = [
    { id: 1, action: 'AUTH_SIGNUP', user: 'student@hiregenie.ai', ip: '192.168.1.1', time: '2026-02-03 14:20:00' },
    { id: 2, action: 'ATS_ANALYSIS_RUN', user: 'hari@gmail.com', ip: '192.168.1.4', time: '2026-02-03 14:15:30' },
    { id: 3, action: 'JOB_POSTED', user: 'recruiter@google.com', ip: '192.168.1.12', time: '2026-02-03 14:00:10' },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div>
        <h2 className="text-2xl font-bold text-slate-100 flex items-center gap-2">
          <Activity className="w-6 h-6 text-amber-400" /> System Audit Logs
        </h2>
        <p className="text-sm text-slate-400">Security audit trail of user actions, API calls, and authentication events.</p>
      </div>

      <motion.div 
        variants={staggerContainer}
        initial="hidden"
        animate="show"
        whileHover={{ y: -4, scale: 1.02, boxShadow: '0 0 30px rgba(99,102,241,0.15)' }}
        className="glass-card p-6 space-y-3"
      >
        {logs.map(l => (
          <motion.div 
            variants={fadeInUp}
            key={l.id} 
            className="p-4 rounded-xl bg-slate-900/60 border border-white/10 flex items-center justify-between font-mono text-xs"
          >
            <div>
              <span className="text-amber-400 font-bold">{l.action}</span>
              <span className="text-slate-400 ml-3">{l.user}</span>
            </div>
            <div className="text-slate-500">IP: {l.ip} • {l.time}</div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}
