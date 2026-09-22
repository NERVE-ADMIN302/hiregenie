import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/store/auth-context';
import { motion } from 'framer-motion';
import { Sparkles, Mail, Lock, ArrowRight, ShieldCheck, Briefcase, GraduationCap, Building2 } from 'lucide-react';

import { useResume, demoResume } from '@/store/resume-context';

const roles = [
  { id: 'student', title: 'Student', icon: GraduationCap, color: '#6366f1' },
  { id: 'recruiter', title: 'Recruiter', icon: Briefcase, color: '#a855f7' },
  { id: 'placement_officer', title: 'Placement', icon: Building2, color: '#10b981' },
  { id: 'admin', title: 'Admin', icon: ShieldCheck, color: '#f59e0b' },
] as const;

export function LoginPage() {
  const [email, setEmail] = useState('student@hiregenie.ai');
  const [password, setPassword] = useState('password123');
  const [selectedRole, setSelectedRole] = useState<string>('student');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleCustomLogin = (e: React.FormEvent) => {
    e.preventDefault();
    login({ email, role: selectedRole as any, name: email.split('@')[0] });
    navigate(`/${selectedRole}/dashboard`);
  };

  const handleQuickDemo = (role: string) => {
    if (role === 'student' && !localStorage.getItem('resume_data')) {
      localStorage.setItem('resume_data', JSON.stringify(demoResume));
    }
    login({ email: `${role}@hiregenie.ai`, role: role as any, name: `${role.replace('_', ' ').replace(/\b\w/g, c => c.toUpperCase())} Demo` });
    navigate(`/${role}/dashboard`);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 bg-[#030712] relative overflow-hidden">
      {/* Premium Background Effects */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[100px] pointer-events-none" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-md w-full bg-[#0a0f1c]/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8 relative z-10 shadow-2xl shadow-black/50"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-indigo-500/10 text-indigo-400 mb-4 border border-indigo-500/20">
            <Sparkles className="w-6 h-6" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">Welcome Back</h1>
          <p className="text-slate-400 text-sm">Sign in to continue to HireGenie AI</p>
        </div>

        {/* Form */}
        <form onSubmit={handleCustomLogin} className="space-y-5">
          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Role</label>
            <div className="grid grid-cols-2 gap-3">
              {roles.map(r => (
                <button
                  key={r.id}
                  type="button"
                  onClick={() => setSelectedRole(r.id)}
                  className={`flex items-center gap-2 p-3 rounded-xl text-sm font-medium transition-all ${
                    selectedRole === r.id 
                      ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-500/25 border-transparent' 
                      : 'bg-white/5 text-slate-300 border border-white/10 hover:bg-white/10'
                  }`}
                >
                  <r.icon className={`w-4 h-4 ${selectedRole === r.id ? 'text-white' : 'text-slate-400'}`} />
                  {r.title}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Email Address</label>
            <div className="relative">
              <Mail className="w-5 h-5 absolute left-3 top-3 text-slate-500" />
              <input 
                type="email" 
                value={email} 
                onChange={e => setEmail(e.target.value)} 
                required 
                className="w-full bg-[#030712]/50 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all"
                placeholder="you@domain.com" 
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Password</label>
            <div className="relative">
              <Lock className="w-5 h-5 absolute left-3 top-3 text-slate-500" />
              <input 
                type="password" 
                value={password} 
                onChange={e => setPassword(e.target.value)} 
                required 
                className="w-full bg-[#030712]/50 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all"
                placeholder="••••••••" 
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-semibold rounded-xl py-3.5 mt-2 flex items-center justify-center gap-2 transition-all shadow-lg shadow-indigo-500/25"
          >
            Sign In <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Divider */}
        <div className="relative my-8 text-center">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/10"></div>
          </div>
          <span className="relative z-10 bg-[#0a0f1c] px-4 text-xs font-semibold text-slate-500 uppercase tracking-widest">
            Quick Demo
          </span>
        </div>

        {/* Quick Demo Buttons */}
        <div className="grid grid-cols-2 gap-3">
          {roles.map(r => (
            <button
              key={r.id}
              type="button"
              onClick={() => handleQuickDemo(r.id)}
              className="py-2.5 rounded-xl bg-white/5 border border-white/5 text-slate-400 text-xs font-medium hover:bg-white/10 hover:text-white transition-all flex justify-center items-center gap-1.5"
            >
              {r.title} Demo
            </button>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-8 text-center flex items-center justify-between text-sm">
          <a href="#" className="text-slate-400 hover:text-white transition-colors">Forgot password?</a>
          <Link to="/signup" className="text-indigo-400 hover:text-indigo-300 font-medium">Create account</Link>
        </div>
      </motion.div>
    </div>
  );
}
