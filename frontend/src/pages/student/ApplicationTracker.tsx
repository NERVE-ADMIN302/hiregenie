import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Layers, Clock, CheckCircle2, ChevronRight, MapPin, Building2 } from 'lucide-react';

export function ApplicationTracker() {

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

  const [view, setView] = useState<'kanban' | 'list'>('kanban');

  const columns = [
    { title: 'Applied', status: 'applied', color: 'border-blue-500/30 bg-blue-500/5' },
    { title: 'Shortlisted', status: 'shortlisted', color: 'border-violet-500/30 bg-violet-500/5' },
    { title: 'Interviewing', status: 'interview', color: 'border-amber-500/30 bg-amber-500/5' },
    { title: 'Offered', status: 'offered', color: 'border-emerald-500/30 bg-emerald-500/5' },
  ];

  const applications = [
    { id: 1, title: 'Full Stack Engineer', company: 'Google India', status: 'shortlisted', date: '2026-02-01' },
    { id: 2, title: 'Frontend Developer', company: 'Microsoft', status: 'interview', date: '2026-01-28' },
    { id: 3, title: 'Backend SDE Intern', company: 'Zomato', status: 'applied', date: '2026-02-02' },
    { id: 4, title: 'AI Specialist', company: 'Amazon', status: 'offered', date: '2026-01-20' },
  ];

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-100 flex items-center gap-2">
            <Layers className="w-6 h-6 text-blue-400" /> Application Kanban Tracker
          </h2>
          <p className="text-sm text-slate-400">Track your job applications across every recruitment stage.</p>
        </div>
        <div className="flex bg-slate-900 border border-white/10 rounded-xl p-1">
          <motion.button type="button" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }} onClick={() => setView('kanban')} className={`px-4 py-1.5 rounded-lg text-xs font-semibold ${view === 'kanban' ? 'bg-blue-600 text-white' : 'text-slate-400'}`}>Kanban Board</motion.button>
          <motion.button type="button" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }} onClick={() => setView('list')} className={`px-4 py-1.5 rounded-lg text-xs font-semibold ${view === 'list' ? 'bg-blue-600 text-white' : 'text-slate-400'}`}>List View</motion.button>
        </div>
      </div>

      {view === 'kanban' ? (
        <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {columns.map(col => {
            const items = applications.filter(a => a.status === col.status);
            return (
              <div key={col.status} className={`glass-card p-4 border ${col.color} flex flex-col space-y-4`}>
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <h3 className="font-bold text-slate-200 text-sm">{col.title}</h3>
                  <span className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-xs font-bold text-slate-300">{items.length}</span>
                </div>

                <div className="space-y-3 flex-1">
                  {items.map(app => (
                    <div key={app.id} className="p-4 rounded-xl bg-slate-900/80 border border-white/10 space-y-2 hover:border-blue-500/40 transition-all">
                      <div className="font-bold text-slate-100 text-sm">{app.title}</div>
                      <div className="text-xs text-slate-400 flex items-center gap-1"><Building2 className="w-3.5 h-3.5" /> {app.company}</div>
                      <div className="text-[11px] text-slate-500 flex items-center gap-1 pt-2 border-t border-white/5"><Clock className="w-3 h-3" /> {app.date}</div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </motion.div>
      ) : (
        <motion.div variants={fadeInUp} whileHover={{ y: -4, scale: 1.02, boxShadow: '0 0 30px rgba(99,102,241,0.15)' }} className="glass-card p-6 space-y-3">
          {applications.map(app => (
            <div key={app.id} className="p-4 rounded-xl bg-slate-900/60 border border-white/10 flex items-center justify-between">
              <div>
                <h4 className="font-bold text-slate-100 text-sm">{app.title}</h4>
                <p className="text-xs text-slate-400">{app.company} • Applied on {app.date}</p>
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-bold capitalize bg-blue-500/10 text-blue-400 border border-blue-500/20">{app.status}</span>
            </div>
          ))}
        </motion.div>
      )}
    </motion.div>
  );
}

