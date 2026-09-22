import React, { useState, useRef } from 'react';
import { Bell, Search, Sun, Moon, Command } from 'lucide-react';
import { useTheme } from '@/store/theme-context';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

export function Topbar() {
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const [searchFocused, setSearchFocused] = useState(false);
  const pageTitle = location.pathname.split('/').pop()?.replace(/-/g, ' ') || 'Dashboard';

  return (
    <header
      className="h-[72px] sticky top-0 z-30 flex items-center justify-between px-6 border-b"
      style={{
        background: 'rgba(3, 7, 18, 0.6)',
        backdropFilter: 'blur(20px) saturate(180%)',
        borderColor: 'rgba(148, 163, 184, 0.06)',
      }}
    >
      <motion.h1
        key={pageTitle}
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        className="text-lg font-semibold capitalize font-['Outfit'] text-slate-200 tracking-tight"
      >
        {pageTitle}
      </motion.h1>

      <div className="flex items-center gap-3">
        {/* Search */}
        <motion.div
          animate={{ width: searchFocused ? 320 : 240 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="relative hidden md:block"
        >
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            placeholder="Search anything..."
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
            className="w-full pl-10 pr-12 py-2.5 rounded-xl text-sm transition-all duration-300 focus:outline-none"
            style={{
              background: 'rgba(15, 23, 42, 0.6)',
              border: `1px solid ${searchFocused ? 'rgba(129, 140, 248, 0.3)' : 'rgba(148, 163, 184, 0.08)'}`,
              boxShadow: searchFocused ? '0 0 20px -5px rgba(129, 140, 248, 0.1)' : 'none',
              color: '#e2e8f0',
            }}
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 text-slate-600 text-[10px] font-mono">
            <Command className="w-3 h-3" />K
          </div>
        </motion.div>

        {/* Notifications */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="relative p-2.5 hover:bg-white/[0.04] rounded-xl transition-colors text-slate-500 hover:text-slate-300"
        >
          <Bell className="w-5 h-5" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full pulse-dot" />
        </motion.button>

        {/* Theme Toggle */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9, rotate: 180 }}
          onClick={toggleTheme}
          className="p-2.5 hover:bg-white/[0.04] rounded-xl transition-colors text-slate-500 hover:text-slate-300"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={theme}
              initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              exit={{ opacity: 0, rotate: 90, scale: 0.5 }}
              transition={{ duration: 0.15 }}
            >
              {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </motion.div>
          </AnimatePresence>
        </motion.button>
      </div>
    </header>
  );
}