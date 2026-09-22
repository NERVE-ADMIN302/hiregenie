import React, { useState } from 'react';
import { Search, GraduationCap, CheckCircle2, Star, Sparkles } from 'lucide-react';
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

export function SearchStudents() {
  const [search, setSearch] = useState('');
  const [shortlisted, setShortlisted] = useState<number[]>([]);

  const students = [
    { id: 1, name: 'Hari Prasad', dept: 'Computer Science', cgpa: '8.8', ats: 92, skills: ['React', 'TypeScript', 'FastAPI', 'PostgreSQL'] },
    { id: 2, name: 'Priya Sharma', dept: 'Information Technology', cgpa: '9.1', ats: 88, skills: ['React', 'Python', 'Tailwind', 'AWS'] },
    { id: 3, name: 'Rahul Verma', dept: 'ECE', cgpa: '8.5', ats: 84, skills: ['Python', 'Django', 'Docker', 'Redis'] },
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
            <Search className="w-6 h-6 text-violet-400" /> Candidate Search & ATS Filter
          </h2>
          <p className="text-sm text-slate-400">Search student talent pool by verified ATS score, skills, and CGPA.</p>
        </div>
      </div>

      <motion.div 
        whileHover={{ y: -4, scale: 1.02, boxShadow: '0 0 30px rgba(99,102,241,0.15)' }}
        className="glass-card p-4 flex gap-4"
      >
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search candidate by name, skills, or department..." className="input-field" />
      </motion.div>

      <motion.div 
        variants={staggerContainer}
        initial="hidden"
        animate="show"
        className="space-y-4"
      >
        {students.filter(s => s.name.toLowerCase().includes(search.toLowerCase()) || s.skills.some(sk => sk.toLowerCase().includes(search.toLowerCase()))).map(s => {
          const isShortlisted = shortlisted.includes(s.id);
          return (
            <motion.div 
              variants={fadeInUp}
              whileHover={{ y: -4, scale: 1.02, boxShadow: '0 0 30px rgba(99,102,241,0.15)' }}
              key={s.id} 
              className="glass-card p-6 flex flex-col md:flex-row items-center justify-between gap-4"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-violet-600/20 text-violet-400 font-bold flex items-center justify-center text-lg">
                  {s.name[0]}
                </div>
                <div>
                  <h3 className="font-bold text-slate-100 text-base">{s.name}</h3>
                  <p className="text-xs text-slate-400">{s.dept} • CGPA: {s.cgpa}</p>
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {s.skills.map((sk, i) => (
                      <span key={i} className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-slate-300 text-[11px] font-medium">{sk}</span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <span className="px-3 py-1.5 rounded-full text-xs font-bold bg-blue-500/10 text-blue-400 border border-blue-500/20 flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" /> ATS Score: {s.ats}%
                </span>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setShortlisted(prev => isShortlisted ? prev.filter(id => id !== s.id) : [...prev, s.id])}
                  className={`btn-primary text-xs py-2.5 px-5 flex items-center gap-1.5 ${isShortlisted ? 'bg-emerald-600 cursor-default' : ''}`}
                >
                  {isShortlisted ? <><CheckCircle2 className="w-4 h-4" /> Shortlisted</> : 'Shortlist Candidate'}
                </motion.button>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </motion.div>
  );
}
