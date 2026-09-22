import React from 'react';
import { StatCard } from '@/components/shared/StatCard';
import { Building2, GraduationCap, Award, TrendingUp } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
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

export function PlacementDashboard() {
  const deptData = [
    { dept: 'Computer Science', placed: 88 },
    { dept: 'Information Tech', placed: 84 },
    { dept: 'ECE', placed: 75 },
    { dept: 'EEE', placed: 68 },
    { dept: 'Mechanical', placed: 60 },
  ];

  const packageData = [
    { range: '15+ LPA', count: 18, color: '#10b981' },
    { range: '10-15 LPA', count: 42, color: '#3b82f6' },
    { range: '6-10 LPA', count: 120, color: '#8b5cf6' },
    { range: '< 6 LPA', count: 65, color: '#f59e0b' },
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
            <Building2 className="w-6 h-6 text-emerald-400" /> Institutional Placement Dashboard
          </h2>
          <p className="text-sm text-slate-400">Real-time campus placement analytics, department statistics, and corporate recruitment tracking.</p>
        </div>
      </div>

      <motion.div 
        variants={staggerContainer}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        <motion.div variants={fadeInUp} whileHover={{ y: -4, scale: 1.02, boxShadow: '0 0 30px rgba(99,102,241,0.15)' }}><StatCard title="Total Students" value="450" icon={GraduationCap} /></motion.div>
        <motion.div variants={fadeInUp} whileHover={{ y: -4, scale: 1.02, boxShadow: '0 0 30px rgba(99,102,241,0.15)' }}><StatCard title="Total Placed" value="345" icon={Award} trend={18} /></motion.div>
        <motion.div variants={fadeInUp} whileHover={{ y: -4, scale: 1.02, boxShadow: '0 0 30px rgba(99,102,241,0.15)' }}><StatCard title="Placement Rate" value="76.6%" icon={TrendingUp} trend={8} /></motion.div>
        <motion.div variants={fadeInUp} whileHover={{ y: -4, scale: 1.02, boxShadow: '0 0 30px rgba(99,102,241,0.15)' }}><StatCard title="Avg Salary Package" value="8.5 LPA" icon={Building2} trend={14} /></motion.div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Department Placement Bar Chart */}
        <motion.div 
          whileHover={{ y: -4, scale: 1.02, boxShadow: '0 0 30px rgba(99,102,241,0.15)' }}
          className="glass-card p-6"
        >
          <h3 className="text-base font-bold text-slate-200 mb-4">Department-wise Placement %</h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={deptData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="dept" stroke="#94a3b8" tick={{ fontSize: 11 }} />
                <YAxis domain={[0, 100]} stroke="#94a3b8" />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px' }} />
                <Bar dataKey="placed" fill="#10b981" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Salary Package Pie Chart */}
        <motion.div 
          whileHover={{ y: -4, scale: 1.02, boxShadow: '0 0 30px rgba(99,102,241,0.15)' }}
          className="glass-card p-6"
        >
          <h3 className="text-base font-bold text-slate-200 mb-4">Salary Package Range Distribution</h3>
          <div className="h-64 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={packageData} dataKey="count" nameKey="range" innerRadius={60} outerRadius={80} paddingAngle={5}>
                  {packageData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
