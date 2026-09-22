import React from 'react';
import { Outlet } from 'react-router-dom';
import { motion } from 'framer-motion';

export function AuthLayout() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center relative overflow-hidden mesh-gradient">
      {/* Animated Floating Orbs */}
      <motion.div 
        animate={{ y: [0, -50, 0], scale: [1, 1.2, 1] }} 
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-[var(--color-primary)] rounded-full mix-blend-screen filter blur-[128px] opacity-50"
      />
      <motion.div 
        animate={{ y: [0, 50, 0], scale: [1, 1.5, 1] }} 
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-1/4 right-1/4 w-[30rem] h-[30rem] bg-[var(--color-secondary)] rounded-full mix-blend-screen filter blur-[128px] opacity-30"
      />

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="glass-card w-full max-w-md p-8 relative z-10 mx-4 shadow-2xl border-[var(--border)]"
      >
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold font-['Outfit'] gradient-text mb-2 tracking-tight">HireGenie AI</h1>
          <p className="text-[var(--text-muted)] text-sm">Empowering your career journey</p>
        </div>
        <Outlet />
      </motion.div>
    </div>
  );
}
