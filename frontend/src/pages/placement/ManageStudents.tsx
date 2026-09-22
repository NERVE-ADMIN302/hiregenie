import React from 'react';
import { GraduationCap, Search, Download } from 'lucide-react';
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

export function ManageStudents() {
  const students = [
    { name: 'Hari Prasad', dept: 'CSE', cgpa: '8.8', status: 'Placed (Google)', ats: 92 },
    { name: 'Priya Sharma', dept: 'IT', cgpa: '9.1', status: 'Eligible', ats: 88 },
    { name: 'Rahul Verma', dept: 'ECE', cgpa: '8.5', status: 'Eligible', ats: 84 },
    { name: 'Ananya Roy', dept: 'CSE', cgpa: '9.4', status: 'Placed (Microsoft)', ats: 95 },
  ];

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
            <GraduationCap className="w-6 h-6 text-emerald-400" /> Campus Student Roster
          </h2>
          <p className="text-sm text-slate-400">Institutional management of student academic performance and placement status.</p>
        </div>
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => alert('Roster exported as CSV!')} 
          className="btn-secondary text-xs flex items-center gap-1.5"
        >
          <Download className="w-4 h-4" /> Export Roster (CSV)
        </motion.button>
      </div>

      <motion.div 
        variants={staggerContainer}
        initial="hidden"
        animate="show"
        whileHover={{ y: -4, scale: 1.02, boxShadow: '0 0 30px rgba(99,102,241,0.15)' }}
        className="glass-card p-6 space-y-3"
      >
        {students.map((s, i) => (
          <motion.div 
            variants={fadeInUp}
            key={i} 
            className="p-4 rounded-xl bg-slate-900/60 border border-white/10 flex items-center justify-between"
          >
            <div>
              <h4 className="font-bold text-slate-100 text-sm">{s.name}</h4>
              <p className="text-xs text-slate-400">{s.dept} • CGPA: {s.cgpa} • ATS: {s.ats}%</p>
            </div>
            <span className={`px-3 py-1 rounded-full text-xs font-bold border ${s.status.includes('Placed') ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-blue-500/10 text-blue-400 border-blue-500/20'}`}>
              {s.status}
            </span>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}
