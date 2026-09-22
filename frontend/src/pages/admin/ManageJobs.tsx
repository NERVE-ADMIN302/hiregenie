import React, { useState } from 'react';
import { Briefcase, ToggleLeft, ToggleRight } from 'lucide-react';
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

export function ManageJobs() {
  const [jobs, setJobs] = useState([
    { id: 1, title: 'Full Stack Engineer', company: 'Google India', active: true },
    { id: 2, title: 'Frontend Developer', company: 'Microsoft', active: true },
    { id: 3, title: 'Backend Dev', company: 'Zomato', active: false },
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
          <Briefcase className="w-6 h-6 text-amber-400" /> Platform Job Listings Moderation
        </h2>
        <p className="text-sm text-slate-400">Admin oversight and activation control for recruiter job postings.</p>
      </div>

      <motion.div 
        variants={staggerContainer}
        initial="hidden"
        animate="show"
        whileHover={{ y: -4, scale: 1.02, boxShadow: '0 0 30px rgba(99,102,241,0.15)' }}
        className="glass-card p-6 space-y-3"
      >
        {jobs.map(j => (
          <motion.div 
            variants={fadeInUp}
            key={j.id} 
            className="p-4 rounded-xl bg-slate-900/60 border border-white/10 flex items-center justify-between"
          >
            <div>
              <h4 className="font-bold text-slate-100 text-sm">{j.title}</h4>
              <p className="text-xs text-slate-400">{j.company}</p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => {
                const copy = [...jobs];
                const target = copy.find(item => item.id === j.id);
                if (target) target.active = !target.active;
                setJobs(copy);
              }}
              className="flex items-center gap-2 text-xs font-semibold"
            >
              {j.active ? <ToggleRight className="w-6 h-6 text-emerald-400" /> : <ToggleLeft className="w-6 h-6 text-slate-500" />}
              <span className={j.active ? "text-emerald-400" : "text-slate-500"}>{j.active ? "Active" : "Hidden"}</span>
            </motion.button>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}
