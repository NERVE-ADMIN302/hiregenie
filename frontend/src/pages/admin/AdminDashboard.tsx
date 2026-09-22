import React from 'react';
import { StatCard } from '@/components/shared/StatCard';
import { ShieldCheck, Users, Briefcase, Activity, CheckCircle2 } from 'lucide-react';
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

export function AdminDashboard() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-100 flex items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-amber-400" /> Admin Command Center
          </h2>
          <p className="text-sm text-slate-400">System oversight, role management, API health, and security audit logs.</p>
        </div>
      </div>

      <motion.div 
        variants={staggerContainer}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        <motion.div variants={fadeInUp} whileHover={{ y: -4, scale: 1.02, boxShadow: '0 0 30px rgba(99,102,241,0.15)' }}><StatCard title="Total Registered Users" value="1,240" icon={Users} trend={24} /></motion.div>
        <motion.div variants={fadeInUp} whileHover={{ y: -4, scale: 1.02, boxShadow: '0 0 30px rgba(99,102,241,0.15)' }}><StatCard title="Active Job Postings" value="84" icon={Briefcase} trend={12} /></motion.div>
        <motion.div variants={fadeInUp} whileHover={{ y: -4, scale: 1.02, boxShadow: '0 0 30px rgba(99,102,241,0.15)' }}><StatCard title="AI Operations Today" value="3,420" icon={Activity} trend={45} /></motion.div>
        <motion.div variants={fadeInUp} whileHover={{ y: -4, scale: 1.02, boxShadow: '0 0 30px rgba(99,102,241,0.15)' }}><StatCard title="System Health" value="99.9%" icon={CheckCircle2} /></motion.div>
      </motion.div>

      <motion.div 
        whileHover={{ y: -4, scale: 1.02, boxShadow: '0 0 30px rgba(99,102,241,0.15)' }}
        className="glass-card p-6"
      >
        <h3 className="font-bold text-slate-200 text-base mb-4">Recent Audit Activity Logs</h3>
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          animate="show"
          className="space-y-3"
        >
          {[
            { action: 'User Signup', user: 'student@hiregenie.ai', role: 'student', time: '5 mins ago' },
            { action: 'Job Posted', user: 'recruiter@google.com', role: 'recruiter', time: '12 mins ago' },
            { action: 'ATS Analysis Run', user: 'hari@gmail.com', role: 'student', time: '25 mins ago' },
            { action: 'Role Modified', user: 'admin@hiregenie.ai', role: 'admin', time: '1 hour ago' },
          ].map((log, i) => (
            <motion.div 
              variants={fadeInUp}
              key={i} 
              className="p-3 rounded-lg bg-slate-900/60 border border-white/5 flex items-center justify-between text-xs"
            >
              <div className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-amber-400" />
                <span className="font-bold text-slate-200">{log.action}</span>
                <span className="text-slate-400">({log.user})</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="px-2 py-0.5 rounded bg-white/5 text-slate-400 uppercase tracking-wider text-[10px] font-bold">{log.role}</span>
                <span className="text-slate-500">{log.time}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
