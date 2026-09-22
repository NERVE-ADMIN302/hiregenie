import React, { useState } from 'react';
import { CheckCircle2, XCircle, ShieldCheck, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

export function EligibilityChecker() {
  const [cgpa] = useState('8.8');
  const [backlogs] = useState('0');

  const criteria = [
    { label: 'Minimum CGPA Criteria (7.5+ Required)', status: true, detail: 'Your CGPA is 8.8 (Passed)' },
    { label: 'Active Arrears / Backlogs Criteria (0 Allowed)', status: true, detail: 'You have 0 active backlogs (Passed)' },
    { label: 'Required Skill Match (React, Python)', status: true, detail: 'Your verified skills match 100%' },
    { label: 'Department Requirement (CSE / IT / ECE)', status: true, detail: 'Computer Science (Passed)' },
  ];

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.5, staggerChildren: 0.07 } 
    }
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
  };

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      <motion.div variants={fadeInUp}>
        <h2 className="text-2xl font-bold text-slate-100 flex items-center gap-2">
          <ShieldCheck className="w-6 h-6 text-emerald-400" /> Placement Eligibility Verification
        </h2>
        <p className="text-sm text-slate-400">Verify your criteria against institutional placement rules and company cutoffs.</p>
      </motion.div>

      <motion.div 
        variants={fadeInUp}
        whileHover={{ y: -4, scale: 1.02, boxShadow: '0 0 30px rgba(99,102,241,0.15)' }}
        className="glass-card p-6 border-emerald-500/30 bg-emerald-500/5 flex items-center justify-between"
      >
        <div className="flex items-center gap-4">
          <CheckCircle2 className="w-12 h-12 text-emerald-400" />
          <div>
            <h3 className="text-xl font-bold text-slate-100">Overall Status: FULLY ELIGIBLE</h3>
            <p className="text-xs text-slate-400">You meet all academic & technical criteria for Tier-1 hiring drives.</p>
          </div>
        </div>
        <span className="px-4 py-2 rounded-xl text-xs font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">VERIFIED</span>
      </motion.div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="glass-card p-6 space-y-4"
      >
        <h3 className="font-bold text-slate-200 text-sm border-b border-white/10 pb-3">Detailed Criteria Evaluation</h3>
        {criteria.map((c, i) => (
          <motion.div 
            key={i} 
            variants={fadeInUp}
            whileHover={{ y: -2, scale: 1.01 }}
            className="p-4 rounded-xl bg-slate-900/60 border border-white/10 flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              {c.status ? <CheckCircle2 className="w-5 h-5 text-emerald-400" /> : <XCircle className="w-5 h-5 text-rose-400" />}
              <div>
                <div className="font-bold text-slate-200 text-sm">{c.label}</div>
                <div className="text-xs text-slate-400">{c.detail}</div>
              </div>
            </div>
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">PASS</span>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}

