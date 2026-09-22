import React from 'react';
import { CheckCircle2, ShieldCheck, Search } from 'lucide-react';
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

export function EligibleStudents() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div>
        <h2 className="text-2xl font-bold text-slate-100 flex items-center gap-2">
          <ShieldCheck className="w-6 h-6 text-emerald-400" /> Drive Eligibility Roster Filter
        </h2>
        <p className="text-sm text-slate-400">Generate verified candidate rosters matching specific recruiter eligibility requirements.</p>
      </div>

      <motion.div 
        whileHover={{ y: -4, scale: 1.02, boxShadow: '0 0 30px rgba(99,102,241,0.15)' }}
        className="glass-card p-6 grid grid-cols-1 md:grid-cols-3 gap-4"
      >
        <div>
          <label className="text-xs font-bold text-slate-400">Minimum CGPA Filter</label>
          <select className="input-field mt-1"><option>7.5+ CGPA</option><option>8.0+ CGPA</option><option>8.5+ CGPA</option></select>
        </div>
        <div>
          <label className="text-xs font-bold text-slate-400">Department</label>
          <select className="input-field mt-1"><option>All Departments</option><option>Computer Science</option><option>Information Tech</option></select>
        </div>
        <div>
          <label className="text-xs font-bold text-slate-400">Active Backlogs</label>
          <select className="input-field mt-1"><option>0 Active Backlogs Only</option><option>Allow Up To 1 Backlog</option></select>
        </div>
      </motion.div>

      <motion.div 
        variants={staggerContainer}
        initial="hidden"
        animate="show"
        whileHover={{ y: -4, scale: 1.02, boxShadow: '0 0 30px rgba(99,102,241,0.15)' }}
        className="glass-card p-6 space-y-3"
      >
        <h3 className="font-bold text-emerald-400 text-sm flex items-center gap-2"><CheckCircle2 className="w-4 h-4" /> Filtered Eligible Candidates (3 Students)</h3>
        {['Hari Prasad (CSE, 8.8 CGPA)', 'Priya Sharma (IT, 9.1 CGPA)', 'Ananya Roy (CSE, 9.4 CGPA)'].map((name, i) => (
          <motion.div 
            variants={fadeInUp}
            key={i} 
            className="p-3 rounded-lg bg-slate-900/60 border border-white/10 text-xs font-bold text-slate-200 flex items-center justify-between"
          >
            <span>{name}</span>
            <span className="px-2.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[11px]">ELIGIBLE</span>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}
