import React from 'react';
import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/store/auth-context';
import { STUDENT_NAV, RECRUITER_NAV, PLACEMENT_NAV, ADMIN_NAV } from '@/lib/constants';
import { LogOut, Menu, ChevronLeft, Sparkles } from 'lucide-react';
import { cn, getInitials } from '@/lib/utils';

export function Sidebar({ collapsed, setCollapsed }: { collapsed: boolean; setCollapsed: (v: boolean) => void }) {
  const { user, logout } = useAuth();

  const navItems = user?.role === 'admin' ? ADMIN_NAV :
                   user?.role === 'recruiter' ? RECRUITER_NAV :
                   user?.role === 'placement_officer' ? PLACEMENT_NAV : STUDENT_NAV;

  return (
    <motion.aside
      animate={{ width: collapsed ? 80 : 280 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className="h-screen flex flex-col sticky top-0 z-40 shrink-0 border-r"
      style={{
        background: 'linear-gradient(180deg, rgba(15, 23, 42, 0.95) 0%, rgba(3, 7, 18, 0.98) 100%)',
        borderColor: 'rgba(148, 163, 184, 0.06)',
        backdropFilter: 'blur(24px)',
      }}
    >
      {/* Logo Header */}
      <div className="h-[72px] flex items-center justify-between px-5 border-b" style={{ borderColor: 'rgba(148, 163, 184, 0.06)' }}>
        <AnimatePresence mode="wait">
          {!collapsed && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="flex items-center gap-2.5"
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center shadow-lg shadow-indigo-500/20">
                <Sparkles className="w-4.5 h-4.5 text-white" />
              </div>
              <span className="text-lg font-bold gradient-text font-['Outfit'] tracking-tight">HireGenie AI</span>
            </motion.div>
          )}
        </AnimatePresence>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setCollapsed(!collapsed)}
          className="p-2 hover:bg-white/5 rounded-xl transition-colors ml-auto"
        >
          {collapsed ? <Menu className="w-5 h-5 text-slate-400" /> : <ChevronLeft className="w-5 h-5 text-slate-400" />}
        </motion.button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4 px-3 flex flex-col gap-0.5">
        {navItems.map((item, index) => (
          <NavLink
            key={item.path} to={item.path}
            className={({ isActive }) => cn(
              "flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group relative",
              isActive
                ? "bg-indigo-500/10 text-indigo-400"
                : "text-slate-500 hover:bg-white/[0.03] hover:text-slate-300"
            )}
            title={collapsed ? item.label : undefined}
          >
            {({ isActive }) => (
              <>
                <motion.div
                  whileHover={{ scale: 1.15, rotate: 5 }}
                  transition={{ type: 'spring', stiffness: 400 }}
                >
                  <item.icon className={cn("w-5 h-5 shrink-0 transition-colors", isActive && "drop-shadow-[0_0_6px_rgba(129,140,248,0.5)]")} />
                </motion.div>
                <AnimatePresence>
                  {!collapsed && (
                    <motion.span
                      initial={{ opacity: 0, x: -5 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -5 }}
                      className="font-medium whitespace-nowrap text-sm"
                    >
                      {item.label}
                    </motion.span>
                  )}
                </AnimatePresence>
                {isActive && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-6 rounded-r-full"
                    style={{
                      background: 'linear-gradient(180deg, #818cf8, #6366f1)',
                      boxShadow: '0 0 12px rgba(129, 140, 248, 0.4)',
                    }}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* User Profile Footer */}
      <div className="p-4 border-t flex items-center gap-3" style={{ borderColor: 'rgba(148, 163, 184, 0.06)' }}>
        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 to-pink-500 flex items-center justify-center text-white font-bold text-sm shrink-0 shadow-lg shadow-indigo-500/15">
          {getInitials(user?.name || 'U')}
        </div>
        <AnimatePresence>
          {!collapsed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex-1 min-w-0"
            >
              <p className="text-sm font-semibold truncate text-slate-200">{user?.name}</p>
              <p className="text-[11px] text-slate-500 truncate capitalize">{user?.role?.replace('_', ' ')}</p>
            </motion.div>
          )}
        </AnimatePresence>
        <AnimatePresence>
          {!collapsed && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={logout}
              className="p-2 hover:bg-rose-500/10 hover:text-rose-400 rounded-xl transition-colors text-slate-500"
            >
              <LogOut className="w-4.5 h-4.5" />
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </motion.aside>
  );
}