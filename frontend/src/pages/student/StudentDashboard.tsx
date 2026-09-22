import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { StatCard } from '@/components/shared/StatCard';
import { ScoreRing } from '@/components/shared/ScoreRing';
import { FileText, Briefcase, Eye, Target, ArrowRight, Sparkles, Upload } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '@/store/auth-context';
import { useResume } from '@/store/resume-context';

export function StudentDashboard() {
  const { user } = useAuth();
  const { resume, hasResume, runATSAnalysis, getCareerReadiness, atsResult } = useResume();

  React.useEffect(() => {
    if (!atsResult && hasResume) {
      runATSAnalysis();
    }
  }, [atsResult, hasResume, runATSAnalysis]);

  const readiness = useMemo(() => getCareerReadiness(), [getCareerReadiness]);
  const ats = atsResult || { overallScore: 0, missingKeywords: [] as string[] };

  const userName = resume.personal.name || user?.name || 'Student';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[var(--text)]">Welcome back, {userName}! 👋</h2>
          <p className="text-[var(--text-muted)] text-sm">
            {hasResume ? 'Here is your career progress overview.' : 'Get started by building or uploading your resume.'}
          </p>
        </div>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Link to="/student/jobs" className="btn-primary flex items-center gap-2">Find Jobs <ArrowRight className="w-4 h-4" /></Link>
        </motion.div>
      </div>

      {/* Quick Start Banner (shows when no resume) */}
      {!hasResume && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-card p-6 flex flex-col md:flex-row items-center justify-between gap-4"
          style={{ border: '1px solid rgba(129, 140, 248, 0.2)', background: 'linear-gradient(135deg, rgba(129, 140, 248, 0.05), rgba(244, 114, 182, 0.03))' }}
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-indigo-400" />
            </div>
            <div>
              <h3 className="font-bold text-slate-100">Start by building your resume</h3>
              <p className="text-xs text-slate-400">Your ATS score, skill gap analysis, and career readiness will auto-calculate once you add your details.</p>
            </div>
          </div>
          <div className="flex gap-3">
            <Link to="/student/resume-builder" className="btn-primary text-xs py-2.5 px-5 flex items-center gap-2">
              <FileText className="w-4 h-4" /> Build Resume
            </Link>
            <Link to="/student/resume-upload" className="btn-secondary text-xs py-2.5 px-5 flex items-center gap-2">
              <Upload className="w-4 h-4" /> Upload PDF
            </Link>
          </div>
        </motion.div>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="ATS Resume Score" value={`${ats.overallScore}%`} icon={FileText} trend={hasResume ? 5 : undefined} color="indigo" />
        <StatCard title="Skills Tracked" value={resume.skills.length} icon={Target} color="emerald" />
        <StatCard title="Projects Listed" value={resume.projects.length} icon={Briefcase} color="pink" />
        <StatCard title="Career Readiness" value={`${readiness.score}%`} icon={Eye} color="amber" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Skills Overview */}
        <div className="lg:col-span-2 glass-card p-6">
          <h3 className="text-base font-bold mb-4 text-slate-200">Your Skills Profile</h3>
          {resume.skills.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {resume.skills.map((skill, i) => (
                <motion.span
                  key={skill}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.05 }}
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20"
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          ) : (
            <p className="text-sm text-slate-500">No skills added yet. <Link to="/student/resume-builder" className="text-indigo-400 hover:underline">Build your resume</Link> to see your skills here.</p>
          )}

          {/* ATS Missing Keywords */}
          {ats.missingKeywords.length > 0 && hasResume && (
            <div className="mt-6 pt-4 border-t" style={{ borderColor: 'rgba(148,163,184,0.08)' }}>
              <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Missing ATS Keywords (Add These)</h4>
              <div className="flex flex-wrap gap-2">
                {ats.missingKeywords.slice(0, 6).map((kw, i) => (
                  <span key={i} className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20">
                    + {kw}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Career Readiness Ring */}
        <motion.div
          whileHover={{ y: -4 }}
          className="glass-card p-6 flex flex-col items-center justify-center text-center"
        >
          <h3 className="text-base font-bold mb-6 self-start w-full text-left text-slate-200">Career Readiness</h3>
          <ScoreRing score={readiness.score} size={160} strokeWidth={12} />
          <p className="mt-6 text-sm text-slate-400">
            {readiness.score >= 80
              ? `You are ${readiness.score}% ready — excellent! Focus on ATS keywords to go higher.`
              : `You are ${readiness.score}% ready. Build your resume and add projects to improve.`}
          </p>
          <Link to="/student/career-readiness" className="mt-3 text-indigo-400 font-medium text-xs hover:underline flex items-center gap-1">
            View full analysis <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
}
