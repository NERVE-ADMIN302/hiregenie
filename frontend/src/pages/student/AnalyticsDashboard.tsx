import React from 'react';
import { motion } from 'framer-motion';
import { BarChart3, TrendingUp, Award, Zap } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

export function AnalyticsDashboard() {

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

  const atsHistory = [
    { date: 'Jan 01', score: 62 },
    { date: 'Jan 15', score: 70 },
    { date: 'Feb 01', score: 78 },
    { date: 'Feb 15', score: 85 },
  ];

  const skillDistribution = [
    { name: 'Frontend', score: 90 },
    { name: 'Backend', score: 85 },
    { name: 'Database', score: 78 },
    { name: 'DevOps', score: 65 },
    { name: 'AI/LLM', score: 88 },
  ];

  const applicationStatus = [
    { name: 'In Review', value: 4, color: '#3b82f6' },
    { name: 'Shortlisted', value: 3, color: '#8b5cf6' },
    { name: 'Interviews', value: 2, color: '#10b981' },
    { name: 'Offers', value: 1, color: '#f59e0b' },
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
            <BarChart3 className="w-6 h-6 text-blue-400" /> Career Analytics Dashboard
          </h2>
          <p className="text-sm text-slate-400">Track your ATS growth, application pipeline, and skill readiness metrics over time.</p>
        </div>
      </div>

      <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* ATS Progress Over Time */}
        <motion.div variants={fadeInUp} whileHover={{ y: -4, scale: 1.02, boxShadow: '0 0 30px rgba(99,102,241,0.15)' }} className="glass-card p-6">
          <h3 className="text-base font-bold text-slate-200 mb-4 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-emerald-400" /> ATS Score Growth Trajectory
          </h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={atsHistory}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="date" stroke="#94a3b8" />
                <YAxis domain={[0, 100]} stroke="#94a3b8" />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px' }} />
                <Line type="monotone" dataKey="score" stroke="#10b981" strokeWidth={3} dot={{ r: 5, fill: '#10b981' }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Skill Category Distribution */}
        <motion.div variants={fadeInUp} whileHover={{ y: -4, scale: 1.02, boxShadow: '0 0 30px rgba(99,102,241,0.15)' }} className="glass-card p-6">
          <h3 className="text-base font-bold text-slate-200 mb-4 flex items-center gap-2">
            <Zap className="w-4 h-4 text-violet-400" /> Technical Domain Proficiency (%)
          </h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={skillDistribution}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="name" stroke="#94a3b8" />
                <YAxis domain={[0, 100]} stroke="#94a3b8" />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px' }} />
                <Bar dataKey="score" fill="#8b5cf6" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </motion.div>

      {/* Application Status Donut */}
      <motion.div variants={fadeInUp} whileHover={{ y: -4, scale: 1.02, boxShadow: '0 0 30px rgba(99,102,241,0.15)' }} className="glass-card p-6 grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        <div>
          <h3 className="text-base font-bold text-slate-200 mb-2">Application Funnel Distribution</h3>
          <p className="text-xs text-slate-400 leading-relaxed mb-4">
            You have active applications across 4 hiring stages. Your interview conversion rate is currently top 10% in your batch.
          </p>
          <div className="space-y-2">
            {applicationStatus.map((st, i) => (
              <div key={i} className="flex items-center justify-between text-xs font-semibold">
                <span className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full" style={{ backgroundColor: st.color }} /> {st.name}
                </span>
                <span className="text-slate-300">{st.value} Applications</span>
              </div>
            ))}
          </div>
        </div>

        <div className="h-64 w-full flex items-center justify-center">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={applicationStatus} dataKey="value" innerRadius={60} outerRadius={80} paddingAngle={5}>
                {applicationStatus.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px' }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </motion.div>
    </motion.div>
  );
}

