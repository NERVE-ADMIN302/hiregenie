import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { KeyRound, Mail, ArrowRight, CheckCircle2 } from 'lucide-react';

export function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
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
          <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center mx-auto mb-4">
            <KeyRound className="w-6 h-6" />
          </div>
          <h1 className="text-3xl font-extrabold gradient-text mb-2">Reset Password</h1>
          <p className="text-sm text-slate-400">Enter your email to receive a password reset link.</p>
        </div>

        {sent ? (
          <div className="text-center space-y-4">
            <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
            <h3 className="font-bold text-slate-100">Reset Link Sent!</h3>
            <p className="text-xs text-slate-400">We have sent instructions to {email}.</p>
            <Link to="/login" className="btn-primary w-full inline-block py-3 text-xs">Return to Login</Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-slate-400 uppercase">Email Address</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} required className="input-field mt-1" placeholder="you@domain.com" />
            </div>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              type="submit" 
              className="btn-primary w-full py-3 flex items-center justify-center gap-2 text-xs font-bold"
            >
              Send Reset Link <ArrowRight className="w-4 h-4" />
            </motion.button>
          </form>
        )}

        <p className="text-center text-xs text-slate-400 mt-6">
          Remember password? <Link to="/login" className="text-blue-400 hover:underline font-semibold">Sign In</Link>
        </p>
      </motion.div>
    </motion.div>
  );
}
