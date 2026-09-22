import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ScoreRing } from '@/components/shared/ScoreRing';
import { Target, CheckCircle2, AlertTriangle, FileText, Sparkles, RefreshCw, Layers } from 'lucide-react';
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer } from 'recharts';
import { useResume } from '@/store/resume-context';

export function ATSAnalysis() {
  const { resume, hasResume, runATSAnalysis, atsResult } = useResume();
  const [analyzing, setAnalyzing] = useState(false);
  const [jobDesc, setJobDesc] = useState('');

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

  useEffect(() => {
    if (hasResume && !atsResult) {
      runATSAnalysis();
    }
  }, [hasResume, atsResult, runATSAnalysis]);

  const handleRunAnalysis = () => {
    setAnalyzing(true);
    setTimeout(() => {
      runATSAnalysis(jobDesc);
      setAnalyzing(false);
    }, 1500);
  };

  if (!hasResume) {
    return (
      <div className="flex flex-col items-center justify-center h-full space-y-4 py-12">
        <AlertTriangle className="w-12 h-12 text-amber-400" />
        <h2 className="text-xl font-bold text-slate-100">Please build or upload your resume first to run ATS analysis.</h2>
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
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-100 flex items-center gap-2">
            <Target className="w-6 h-6 text-blue-400" /> ATS Resume Analysis
          </h2>
          <p className="text-sm text-slate-400">AI-powered evaluation of your resume against industry standards.</p>
        </div>
        <motion.button type="button" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }} onClick={handleRunAnalysis} disabled={analyzing} className="btn-primary text-xs flex items-center gap-2 shadow-lg shadow-blue-500/25">
          <RefreshCw className={`w-4 h-4 ${analyzing ? 'animate-spin' : ''}`} />
          {analyzing ? 'Analyzing with Gemini...' : 'Re-Run ATS Scan'}
        </motion.button>
      </div>

      {/* Optional Job Description */}
      <motion.div variants={fadeInUp} className="glass-card p-4">
        <label className="text-xs font-semibold text-slate-400 mb-2 block">Target Job Description (Optional for better context)</label>
        <textarea
          rows={3}
          placeholder="Paste job description here to get a tailored ATS score..."
          value={jobDesc}
          onChange={(e) => setJobDesc(e.target.value)}
          className="input-field"
        />
      </motion.div>

      {/* Main Score Overview */}
      {atsResult && (
        <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <motion.div variants={fadeInUp} whileHover={{ y: -4, scale: 1.02, boxShadow: '0 0 30px rgba(99,102,241,0.15)' }} className="glass-card p-6 flex flex-col items-center justify-center text-center">
            <h3 className="text-base font-bold text-slate-200 mb-6 self-start">Overall ATS Score</h3>
            <ScoreRing score={atsResult.overallScore} size={180} strokeWidth={14} />
            <div className={`mt-6 px-3 py-1 rounded-full text-xs font-semibold border ${atsResult.passStatus ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-amber-500/10 text-amber-400 border-amber-500/20'}`}>
              {atsResult.passStatus ? 'PASSED — Ready for Top Tech Recruiters' : 'NEEDS IMPROVEMENT — Check suggestions'}
            </div>
          </motion.div>

          <motion.div variants={fadeInUp} whileHover={{ y: -4, scale: 1.02, boxShadow: '0 0 30px rgba(99,102,241,0.15)' }} className="glass-card p-6 lg:col-span-2">
            <h3 className="text-base font-bold text-slate-200 mb-4">Metric Breakdown (Radar Evaluation)</h3>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={atsResult.metrics}>
                  <PolarGrid stroke="#334155" />
                  <PolarAngleAxis dataKey="subject" stroke="#94a3b8" tick={{ fill: '#94a3b8', fontSize: 12 }} />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#475569" />
                  <Radar name="Resume Score" dataKey="score" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.3} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Missing Keywords & Actionable Recommendations */}
      {atsResult && (
        <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <motion.div variants={fadeInUp} whileHover={{ y: -4, scale: 1.02, boxShadow: '0 0 30px rgba(99,102,241,0.15)' }} className="glass-card p-6">
            <h3 className="text-base font-bold text-slate-200 mb-4 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-amber-400" /> Missing Industry Keywords
            </h3>
            <p className="text-xs text-slate-400 mb-4">Adding these keywords to your projects or skills section will boost your score.</p>
            <div className="flex flex-wrap gap-2">
              {atsResult.missingKeywords.map((kw, i) => (
                <span key={i} className="px-3 py-1.5 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20 text-xs font-semibold">
                  + {kw}
                </span>
              ))}
              {atsResult.missingKeywords.length === 0 && (
                <span className="text-sm text-emerald-400">All major keywords detected!</span>
              )}
            </div>
          </motion.div>

          <motion.div variants={fadeInUp} whileHover={{ y: -4, scale: 1.02, boxShadow: '0 0 30px rgba(99,102,241,0.15)' }} className="glass-card p-6">
            <h3 className="text-base font-bold text-slate-200 mb-4 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" /> Recommended Improvements
            </h3>
            <div className="space-y-3">
              {atsResult.improvements.map((tip, i) => (
                <div key={i} className="p-3 rounded-lg bg-slate-900/50 border border-white/5 flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center text-xs font-bold mt-0.5">{i+1}</div>
                  <div>
                    <div className="text-xs font-bold text-slate-200">{tip.title}</div>
                    <div className="text-xs text-slate-400">{tip.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
}

