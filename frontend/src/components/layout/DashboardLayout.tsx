import React, { useState } from 'react';
import { Outlet, Navigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Sidebar } from './Sidebar';
import { Topbar } from './Topbar';
import { useAuth } from '@/store/auth-context';

export function DashboardLayout({ allowedRole }: { allowedRole: string }) {
  const [collapsed, setCollapsed] = useState(false);
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="h-screen w-full flex items-center justify-center" style={{ background: '#030712' }}>
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-[3px] border-indigo-500/30 border-t-indigo-400 rounded-full animate-spin" />
          <span className="text-sm text-slate-500 font-medium">Loading dashboard...</span>
        </div>
      </div>
    );
  }

  if (!user) return <Navigate to="/login" replace />;
  if (user.role !== allowedRole) return <Navigate to={`/${user.role}/dashboard`} replace />;

  return (
    <div className="flex h-screen overflow-hidden noise-overlay" style={{ background: '#030712', color: '#e2e8f0' }}>
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        {/* Subtle background gradient orbs */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-1/4 -right-1/4 w-[600px] h-[600px] rounded-full opacity-[0.03]"
            style={{ background: 'radial-gradient(circle, #818cf8, transparent 70%)' }} />
          <div className="absolute -bottom-1/4 -left-1/4 w-[500px] h-[500px] rounded-full opacity-[0.02]"
            style={{ background: 'radial-gradient(circle, #f472b6, transparent 70%)' }} />
        </div>

        <Topbar />
        <main className="flex-1 overflow-auto p-6 relative z-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 16, filter: 'blur(4px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -8, filter: 'blur(4px)' }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-7xl mx-auto space-y-6"
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}