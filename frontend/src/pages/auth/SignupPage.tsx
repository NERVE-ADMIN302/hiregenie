import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/store/auth-context';
import { motion } from 'framer-motion';
import { Sparkles, Mail, Lock, User, GraduationCap, Briefcase, Building2, ArrowRight } from 'lucide-react';

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

export function SignupPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'student' | 'recruiter' | 'placement_officer'>('student');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    login({ email, role, name: name || email.split('@')[0] });
    navigate(`/${role}/dashboard`);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.5 }}
      className="min-h-screen w-full flex items-center justify-center p-4 mesh-gradient relative overflow-hidden"
    >
      <motion.div 
        whileHover={{ y: -4, scale: 1.02, boxShadow: '0 0 30px rgba(99,102,241,0.15)' }}
        className="glass-card max-w-md w-full p-8 relative z-10"
      >
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold gradient-text mb-2">Create Account</h1>
          <p className="text-sm text-slate-400">Join HireGenie AI career ecosystem</p>
        </div>

        <form onSubmit={handleSignup} className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-slate-400 uppercase">Full Name</label>
            <input value={name} onChange={e => setName(e.target.value)} required className="input-field mt-1" placeholder="John Doe" />
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-400 uppercase">Email Address</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} required className="input-field mt-1" placeholder="you@domain.com" />
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-400 uppercase">Password</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} required className="input-field mt-1" placeholder="••••••••" />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-400 uppercase">Select Role</label>
            <motion.div 
              variants={staggerContainer}
              initial="hidden"
              animate="show"
              className="grid grid-cols-3 gap-2 mt-1"
            >
              {[
                { id: 'student', title: 'Student', icon: GraduationCap },
                { id: 'recruiter', title: 'Recruiter', icon: Briefcase },
                { id: 'placement_officer', title: 'Placement', icon: Building2 },
              ].map(r => (
                <motion.button
                  variants={fadeInUp}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  key={r.id}
                  type="button"
                  onClick={() => setRole(r.id as any)}
                  className={`p-2.5 rounded-lg border text-xs font-medium flex flex-col items-center gap-1 transition-all ${role === r.id ? 'border-blue-500 bg-blue-500/10 text-white' : 'border-white/10 text-slate-400'}`}
                >
                  <r.icon className="w-4 h-4 text-blue-400" />
                  {r.title}
                </motion.button>
              ))}
            </motion.div>
          </div>

          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            type="submit" 
            className="btn-primary w-full py-3 mt-2 flex items-center justify-center gap-2"
          >
            Create Account <ArrowRight className="w-4 h-4" />
          </motion.button>
        </form>

        <p className="text-center text-xs text-slate-400 mt-6">
          Already have an account? <Link to="/login" className="text-blue-400 hover:underline font-semibold">Sign In</Link>
        </p>
      </motion.div>
    </motion.div>
  );
}
