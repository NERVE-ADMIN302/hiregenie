import React from 'react';
import { StatCard } from '@/components/shared/StatCard';
import { Briefcase, Users, CheckCircle2, Clock, Plus, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
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

export function RecruiterDashboard() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-100">Recruiter Portal Dashboard 💼</h2>
          <p className="text-sm text-slate-400">Manage active job postings, evaluate candidate ATS scores, and schedule interviews.</p>
        </div>
        <Link to="/recruiter/post-job">
          <motion.div 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="btn-primary text-xs py-3 px-5 flex items-center gap-2"
          >
            <Plus className="w-4 h-4" /> Post New Job
          </motion.div>
        </Link>
      </div>

      <motion.div 
        variants={staggerContainer}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        <motion.div variants={fadeInUp} whileHover={{ y: -4, scale: 1.02, boxShadow: '0 0 30px rgba(99,102,241,0.15)' }}><StatCard title="Active Jobs" value="6" icon={Briefcase} trend={12} /></motion.div>
        <motion.div variants={fadeInUp} whileHover={{ y: -4, scale: 1.02, boxShadow: '0 0 30px rgba(99,102,241,0.15)' }}><StatCard title="Total Applicants" value="142" icon={Users} trend={28} /></motion.div>
        <motion.div variants={fadeInUp} whileHover={{ y: -4, scale: 1.02, boxShadow: '0 0 30px rgba(99,102,241,0.15)' }}><StatCard title="Shortlisted" value="24" icon={CheckCircle2} trend={8} /></motion.div>
        <motion.div variants={fadeInUp} whileHover={{ y: -4, scale: 1.02, boxShadow: '0 0 30px rgba(99,102,241,0.15)' }}><StatCard title="Interviews Pending" value="8" icon={Clock} /></motion.div>
      </motion.div>

      <motion.div 
        whileHover={{ y: -4, scale: 1.02, boxShadow: '0 0 30px rgba(99,102,241,0.15)' }}
        className="glass-card p-6"
      >
        <div className="flex items-center justify-between mb-4 border-b border-white/10 pb-3">
          <h3 className="font-bold text-slate-200 text-base">Recent Candidate Applications</h3>
          <Link to="/recruiter/search" className="text-xs text-blue-400 hover:underline">Search All Candidates →</Link>
        </div>

        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          animate="show"
          className="space-y-3"
        >
          {[
            { name: 'Hari Prasad', role: 'Full Stack Engineer', ats: 92, status: 'Shortlisted', university: 'Anna University' },
            { name: 'Priya Sharma', role: 'Frontend React Specialist', ats: 88, status: 'In Review', university: 'IIT Madras' },
            { name: 'Rahul Verma', role: 'Backend Python Dev', ats: 84, status: 'In Review', university: 'NIT Trichy' },
          ].map((cand, i) => (
            <motion.div 
              variants={fadeInUp}
              key={i} 
              className="p-4 rounded-xl bg-slate-900/60 border border-white/10 flex items-center justify-between hover:bg-slate-800/60 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-violet-600/20 text-violet-400 font-bold flex items-center justify-center">
                  {cand.name[0]}
                </div>
                <div>
                  <h4 className="font-bold text-slate-100 text-sm">{cand.name}</h4>
                  <p className="text-xs text-slate-400">{cand.role} • {cand.university}</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-500/10 text-blue-400 border border-blue-500/20">
                  ATS: {cand.ats}%
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  {cand.status}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
