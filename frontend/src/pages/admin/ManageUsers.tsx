import React, { useState } from 'react';
import { Users, ShieldCheck, UserCheck, Trash2 } from 'lucide-react';
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

export function ManageUsers() {
  const [users, setUsers] = useState([
    { id: 1, name: 'Hari Prasad', email: 'hari@gmail.com', role: 'student' },
    { id: 2, name: 'Sarah Tech', email: 'sarah@google.com', role: 'recruiter' },
    { id: 3, name: 'Dr. Placement', email: 'officer@univ.edu', role: 'placement_officer' },
  ]);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div>
        <h2 className="text-2xl font-bold text-slate-100 flex items-center gap-2">
          <Users className="w-6 h-6 text-amber-400" /> User Access Control
        </h2>
        <p className="text-sm text-slate-400">Admin management of system users and role permissions.</p>
      </div>

      <motion.div 
        variants={staggerContainer}
        initial="hidden"
        animate="show"
        whileHover={{ y: -4, scale: 1.02, boxShadow: '0 0 30px rgba(99,102,241,0.15)' }}
        className="glass-card p-6 space-y-3"
      >
        {users.map(u => (
          <motion.div 
            variants={fadeInUp}
            key={u.id} 
            className="p-4 rounded-xl bg-slate-900/60 border border-white/10 flex items-center justify-between"
          >
            <div>
              <h4 className="font-bold text-slate-100 text-sm">{u.name}</h4>
              <p className="text-xs text-slate-400">{u.email}</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 rounded-full text-xs font-bold uppercase bg-amber-500/10 text-amber-400 border border-amber-500/20">{u.role}</span>
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setUsers(users.filter(usr => usr.id !== u.id))} 
                className="text-xs text-rose-400 hover:underline"
              >
                Remove
              </motion.button>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}
