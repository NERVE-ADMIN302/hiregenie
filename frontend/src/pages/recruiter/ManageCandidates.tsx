import React, { useState } from 'react';
import { Users, Search, CheckCircle2, ChevronRight } from 'lucide-react';
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

export function ManageCandidates() {
  const [candidates, setCandidates] = useState([
    { id: 1, name: 'Hari Prasad', role: 'Full Stack Engineer', status: 'Shortlisted', ats: 92 },
    { id: 2, name: 'Priya Sharma', role: 'Frontend React Dev', status: 'In Review', ats: 88 },
    { id: 3, name: 'Rahul Verma', role: 'Backend Python Dev', status: 'Interview Scheduled', ats: 84 },
  ]);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div>
        <h2 className="text-2xl font-bold text-slate-100 flex items-center gap-2">
          <Users className="w-6 h-6 text-violet-400" /> Manage Candidate Applications
        </h2>
        <p className="text-sm text-slate-400">Review ATS scores, advance candidates through recruitment stages, and update statuses.</p>
      </div>

      <motion.div 
        variants={staggerContainer}
        initial="hidden"
        animate="show"
        whileHover={{ y: -4, scale: 1.02, boxShadow: '0 0 30px rgba(99,102,241,0.15)' }}
        className="glass-card p-6 space-y-4"
      >
        {candidates.map(cand => (
          <motion.div 
            variants={fadeInUp}
            key={cand.id} 
            className="p-4 rounded-xl bg-slate-900/60 border border-white/10 flex items-center justify-between"
          >
            <div>
              <h4 className="font-bold text-slate-100 text-sm">{cand.name}</h4>
              <p className="text-xs text-slate-400">{cand.role} • ATS Score: {cand.ats}%</p>
            </div>

            <div className="flex items-center gap-3">
              <select
                value={cand.status}
                onChange={e => {
                  const copy = [...candidates];
                  const target = copy.find(c => c.id === cand.id);
                  if (target) target.status = e.target.value;
                  setCandidates(copy);
                }}
                className="input-field text-xs py-1.5 px-3"
              >
                <option>In Review</option>
                <option>Shortlisted</option>
                <option>Interview Scheduled</option>
                <option>Offered</option>
                <option>Rejected</option>
              </select>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}
