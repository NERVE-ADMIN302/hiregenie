import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Target, CheckCircle2, XCircle, BookOpen, Award, ArrowRight, Sparkles, AlertTriangle } from 'lucide-react';
import { useResume } from '@/store/resume-context';

export function SkillGap() {
  const { getSkillGap, hasResume } = useResume();
  const [targetRole, setTargetRole] = useState('Full Stack Web Engineer');

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

  const skillGapData = useMemo(() => getSkillGap(targetRole), [getSkillGap, targetRole]);

  if (!hasResume) {
    return (
      <div className="flex flex-col items-center justify-center h-full space-y-4 py-12">
        <AlertTriangle className="w-12 h-12 text-amber-400" />
        <h2 className="text-xl font-bold text-slate-100">Please build or upload your resume first to see skill gaps.</h2>
      </div>
    );
  }

  const { matched, missing, roadmap } = skillGapData;

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
            <Target className="w-6 h-6 text-violet-400" /> Skill Gap Analysis
          </h2>
          <p className="text-sm text-slate-400">Compare your skills against target job roles and get a personalized learning roadmap.</p>
        </div>
      </div>

      <motion.div variants={fadeInUp} whileHover={{ y: -4, scale: 1.02, boxShadow: '0 0 30px rgba(99,102,241,0.15)' }} className="glass-card p-6 flex flex-col md:flex-row items-center gap-4">
        <label className="text-sm font-bold text-slate-300 whitespace-nowrap">Select Target Career Role:</label>
        <select value={targetRole} onChange={e => setTargetRole(e.target.value)} className="input-field max-w-md">
          <option>Full Stack Web Engineer</option>
          <option>Frontend React Specialist</option>
          <option>Backend Python / FastAPI Engineer</option>
          <option>Data Scientist & AI Specialist</option>
          <option>DevOps & Cloud Engineer</option>
        </select>
        <motion.button type="button" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }} className="btn-primary text-xs py-3 px-6 whitespace-nowrap flex items-center gap-2">
          <Sparkles className="w-4 h-4" /> Recalculate Roadmap
        </motion.button>
      </motion.div>

      <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div variants={fadeInUp} whileHover={{ y: -4, scale: 1.02, boxShadow: '0 0 30px rgba(99,102,241,0.15)' }} className="glass-card p-6 border-emerald-500/20">
          <h3 className="text-base font-bold text-emerald-400 mb-4 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5" /> Skills You Already Possess ({matched.length})
          </h3>
          <div className="flex flex-wrap gap-2">
            {matched.map((s, i) => (
              <span key={i} className="px-3 py-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold">
                ✓ {s}
              </span>
            ))}
            {matched.length === 0 && <span className="text-slate-400 text-sm">No matched skills.</span>}
          </div>
        </motion.div>

        <motion.div variants={fadeInUp} whileHover={{ y: -4, scale: 1.02, boxShadow: '0 0 30px rgba(99,102,241,0.15)' }} className="glass-card p-6 border-rose-500/20">
          <h3 className="text-base font-bold text-rose-400 mb-4 flex items-center gap-2">
            <XCircle className="w-5 h-5" /> Required Skills To Learn ({missing.length})
          </h3>
          <div className="flex flex-wrap gap-2">
            {missing.map((s, i) => (
              <span key={i} className="px-3 py-1.5 rounded-lg bg-rose-500/10 text-rose-400 border border-rose-500/20 text-xs font-semibold">
                + {s}
              </span>
            ))}
            {missing.length === 0 && <span className="text-slate-400 text-sm">You have all required skills!</span>}
          </div>
        </motion.div>
      </motion.div>

      {/* Learning Roadmap Timeline */}
      <motion.div variants={fadeInUp} whileHover={{ y: -4, scale: 1.02, boxShadow: '0 0 30px rgba(99,102,241,0.15)' }} className="glass-card p-6">
        <h3 className="text-lg font-bold text-slate-100 mb-6 flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-blue-400" /> Recommended 4-Week Learning Roadmap
        </h3>

        <div className="space-y-6 relative before:absolute before:inset-0 before:left-4 before:w-0.5 before:bg-white/10">
          {roadmap.map((item, i) => (
            <div key={i} className="relative pl-10">
              <div className="absolute left-2.5 top-1.5 -translate-x-1/2 w-3.5 h-3.5 rounded-full bg-blue-500 border-2 border-slate-900 shadow-md shadow-blue-500/50" />
              <div className="p-4 rounded-xl bg-slate-900/60 border border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <div className="text-xs font-bold text-blue-400 uppercase tracking-wider">{item.week}</div>
                  <h4 className="font-bold text-slate-200 text-sm mt-0.5">{item.title}</h4>
                  <p className="text-xs text-slate-400 mt-1">{item.desc}</p>
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-violet-500/10 text-violet-400 border border-violet-500/20 whitespace-nowrap self-start md:self-auto">
                  {item.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}

