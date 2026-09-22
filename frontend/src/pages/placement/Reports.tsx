import React from 'react';
import { BarChart3, Download, TrendingUp } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

export function Reports() {
  const reportData = [
    { company: 'Google', hired: 12 },
    { company: 'Microsoft', hired: 18 },
    { company: 'Amazon', hired: 25 },
    { company: 'Zomato', hired: 15 },
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
            <BarChart3 className="w-6 h-6 text-blue-400" /> Placement Performance Reports
          </h2>
          <p className="text-sm text-slate-400">Institutional recruitment summaries and corporate partner hiring analytics.</p>
        </div>
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => alert('Report Downloaded as PDF!')} 
          className="btn-primary text-xs flex items-center gap-2"
        >
          <Download className="w-4 h-4" /> Download PDF Report
        </motion.button>
      </div>

      <motion.div 
        whileHover={{ y: -4, scale: 1.02, boxShadow: '0 0 30px rgba(99,102,241,0.15)' }}
        className="glass-card p-6"
      >
        <h3 className="font-bold text-slate-200 text-sm mb-4">Company-wise Recruitment Volume</h3>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={reportData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="company" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px' }} />
              <Bar dataKey="hired" fill="#3b82f6" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </motion.div>
    </motion.div>
  );
}
