import React, { useMemo } from 'react';
import { ScoreRing } from '@/components/shared/ScoreRing';
import { Zap, CheckCircle2, TrendingUp, AlertTriangle } from 'lucide-react';
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';
import { useResume } from '@/store/resume-context';

export function CareerReadiness() {
  const { getCareerReadiness, hasResume } = useResume();
  const readinessData = useMemo(() => getCareerReadiness(), [getCareerReadiness]);

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

  if (!hasResume) {
    return (
      <div className="flex flex-col items-center justify-center h-full space-y-4 py-12">
        <AlertTriangle className="w-12 h-12 text-amber-400" />
        <h2 className="text-xl font-bold text-slate-100">Please build or upload your resume first to view career readiness.</h2>
      </div>
    );
  }

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      <motion.div variants={fadeInUp}>
        <h2 className="text-2xl font-bold text-slate-100 flex items-center gap-2">
          <Zap className="w-6 h-6 text-violet-400" /> Career Readiness Radar
        </h2>
        <p className="text-sm text-slate-400">Composite engineering readiness evaluated across 5 hiring dimensions.</p>
      </motion.div>

      <motion.div variants={containerVariants} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div 
          variants={fadeInUp}
          whileHover={{ y: -4, scale: 1.02, boxShadow: '0 0 30px rgba(99,102,241,0.15)' }}
          className="glass-card p-6 flex flex-col items-center justify-center text-center"
        >
          <ScoreRing score={readinessData.score} size={180} strokeWidth={14} />
          <h3 className="text-lg font-bold text-slate-200 mt-4">Overall Readiness: {readinessData.score}%</h3>
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mt-2">
            Top {Math.max(1, 100 - readinessData.score)}% Candidate Pool
          </span>
        </motion.div>

        <motion.div 
          variants={fadeInUp}
          whileHover={{ y: -4, scale: 1.02, boxShadow: '0 0 30px rgba(99,102,241,0.15)' }}
          className="glass-card p-6 lg:col-span-2"
        >
          <h3 className="text-base font-bold text-slate-200 mb-4">5-Dimension Radar Profile</h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={readinessData.dimensions}>
                <PolarGrid stroke="#334155" />
                <PolarAngleAxis dataKey="subject" stroke="#94a3b8" tick={{ fill: '#94a3b8', fontSize: 12 }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#475569" />
                <Radar name="Readiness Score" dataKey="score" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.3} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

