import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { Sparkles, FileText, Target, Brain, Briefcase, Zap, ShieldCheck, ArrowRight, Users, Star, Play, ChevronRight } from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1, y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

function AnimatedCounter({ target, suffix = '' }: { target: string; suffix?: string }) {
  return (
    <motion.span
      className="text-4xl font-black gradient-text font-['Outfit']"
      initial={{ opacity: 0, scale: 0.5 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ type: 'spring', stiffness: 200, damping: 15 }}
    >
      {target}{suffix}
    </motion.span>
  );
}

function FeatureCard({ icon: Icon, title, desc, index }: { icon: any; title: string; desc: string; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="glass-card p-8 group cursor-default relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <motion.div
        whileHover={{ rotate: 10, scale: 1.1 }}
        className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 relative z-10"
        style={{
          background: 'linear-gradient(135deg, rgba(129, 140, 248, 0.12), rgba(244, 114, 182, 0.08))',
          border: '1px solid rgba(129, 140, 248, 0.15)',
        }}
      >
        <Icon className="w-6 h-6 text-indigo-400" />
      </motion.div>
      <h3 className="text-xl font-bold mb-3 text-slate-100 relative z-10">{title}</h3>
      <p className="text-slate-400 text-sm leading-relaxed relative z-10">{desc}</p>
      <div className="mt-4 flex items-center gap-1.5 text-indigo-400 text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity relative z-10">
        Learn more <ChevronRight className="w-3.5 h-3.5" />
      </div>
    </motion.div>
  );
}

export function LandingPage() {
  return (
    <div className="min-h-screen text-slate-100 overflow-hidden noise-overlay" style={{ background: '#030712' }}>
      {/* ── Floating Navbar ── */}
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="fixed top-0 left-0 right-0 z-50"
      >
        <div className="max-w-7xl mx-auto px-6 mt-4">
          <div
            className="h-16 rounded-2xl flex items-center justify-between px-6"
            style={{
              background: 'rgba(3, 7, 18, 0.7)',
              backdropFilter: 'blur(20px) saturate(180%)',
              border: '1px solid rgba(148, 163, 184, 0.06)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
            }}
          >
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center shadow-lg shadow-indigo-500/25">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <span className="text-lg font-bold gradient-text font-['Outfit'] tracking-tight">HireGenie AI</span>
            </div>

            <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-400">
              <a href="#features" className="hover:text-slate-200 transition-colors">Features</a>
              <a href="#stats" className="hover:text-slate-200 transition-colors">Stats</a>
            </div>

            <div className="flex items-center gap-3">
              <Link to="/login" className="px-4 py-2 rounded-xl text-sm font-medium text-slate-400 hover:text-slate-200 transition-colors">
                Sign In
              </Link>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link to="/signup" className="btn-primary text-sm py-2.5 px-5 flex items-center gap-2 shadow-lg shadow-indigo-500/20">
                  Get Started <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* ── Hero Section ── */}
      <section className="pt-44 pb-32 px-6 relative mesh-gradient">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Column */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold mb-8"
              style={{
                background: 'linear-gradient(135deg, rgba(129, 140, 248, 0.1), rgba(244, 114, 182, 0.05))',
                border: '1px solid rgba(129, 140, 248, 0.15)',
                color: '#a5b4fc',
              }}
            >
              <Sparkles className="w-3.5 h-3.5" /> Powered by Gemini 2.0 Flash AI Engine
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-5xl lg:text-[3.5rem] font-black leading-[1.1] mb-6 font-['Outfit'] tracking-tight"
            >
              Launch Your Career
              <br />
              With <span className="gradient-text">AI Intelligence</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg text-slate-400 mb-10 max-w-lg leading-relaxed"
            >
              Automate resume optimization, bypass ATS filters, practice realistic AI interviews,
              and get matched with top recruiters — all in one platform.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-wrap items-center gap-4"
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link to="/login" className="btn-primary py-4 px-8 text-base shadow-xl shadow-indigo-500/25 flex items-center gap-3">
                  Try Student Demo <ArrowRight className="w-5 h-5" />
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link to="/login" className="btn-secondary py-4 px-6 text-base flex items-center gap-2">
                  <Play className="w-4 h-4" /> Watch Demo
                </Link>
              </motion.div>
            </motion.div>

            {/* Stats Row */}
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-14 flex items-center gap-10 pt-8 border-t"
              style={{ borderColor: 'rgba(148, 163, 184, 0.08)' }}
            >
              {[
                { value: '98.4%', label: 'ATS Pass Rate' },
                { value: '10,000+', label: 'Students Placed' },
                { value: '500+', label: 'Hiring Partners' },
              ].map((stat, i) => (
                <div key={i}>
                  <AnimatedCounter target={stat.value} />
                  <div className="text-xs text-slate-500 font-medium mt-1.5">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right Column — Live Dashboard Preview */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/20 to-pink-500/10 rounded-3xl blur-3xl -z-10" />

            <div
              className="rounded-2xl p-6 relative z-10"
              style={{
                background: 'linear-gradient(145deg, rgba(15, 23, 42, 0.9), rgba(30, 41, 59, 0.7))',
                border: '1px solid rgba(148, 163, 184, 0.08)',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 60px -20px rgba(129, 140, 248, 0.1)',
              }}
            >
              {/* Window Chrome */}
              <div className="flex items-center justify-between pb-4 mb-4 border-b" style={{ borderColor: 'rgba(148,163,184,0.06)' }}>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  <span className="text-[11px] text-slate-600 font-mono ml-2">hiregenie-ai — dashboard</span>
                </div>
                <motion.span
                  animate={{ opacity: [1, 0.5, 1] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="px-3 py-1 rounded-full text-[11px] font-semibold"
                  style={{ background: 'rgba(52, 211, 153, 0.1)', color: '#34d399', border: '1px solid rgba(52, 211, 153, 0.2)' }}
                >
                  ● Live Score: 95/100
                </motion.span>
              </div>

              {/* Dashboard Metrics */}
              <div className="space-y-3">
                {[
                  { label: 'ATS Compatibility Score', value: 92, color: '#818cf8', icon: Target },
                  { label: 'Career Readiness Radar', value: 88, color: '#c084fc', icon: Zap },
                ].map((metric, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + i * 0.15 }}
                    className="p-4 rounded-xl"
                    style={{ background: 'rgba(15, 23, 42, 0.6)', border: '1px solid rgba(148,163,184,0.06)' }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-semibold flex items-center gap-2 text-slate-300">
                        <metric.icon className="w-4 h-4" style={{ color: metric.color }} /> {metric.label}
                      </span>
                      <span className="text-sm font-bold" style={{ color: metric.color }}>{metric.value}%</span>
                    </div>
                    <div className="w-full rounded-full h-2" style={{ background: 'rgba(148,163,184,0.06)' }}>
                      <motion.div
                        className="h-2 rounded-full"
                        style={{ background: `linear-gradient(90deg, ${metric.color}, ${metric.color}88)` }}
                        initial={{ width: 0 }}
                        animate={{ width: `${metric.value}%` }}
                        transition={{ duration: 1.2, delay: 0.8 + i * 0.15, ease: [0.4, 0, 0.2, 1] }}
                      />
                    </div>
                  </motion.div>
                ))}

                {/* Job Match */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.9 }}
                  className="p-4 rounded-xl flex items-center justify-between"
                  style={{ background: 'rgba(15, 23, 42, 0.6)', border: '1px solid rgba(148,163,184,0.06)' }}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center text-emerald-400 font-bold text-xs"
                      style={{ background: 'rgba(52, 211, 153, 0.1)' }}>
                      AI
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-slate-200">Senior Frontend Engineer</div>
                      <div className="text-xs text-slate-500">Google India • ₹45,00,000/yr</div>
                    </div>
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs font-bold"
                    style={{ background: 'rgba(129, 140, 248, 0.1)', color: '#a5b4fc', border: '1px solid rgba(129, 140, 248, 0.2)' }}>
                    96% Match
                  </span>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Features Grid ── */}
      <section id="features" className="py-32 px-6 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <h2 className="text-4xl font-black mb-5 font-['Outfit'] tracking-tight">
            Everything You Need To Get <span className="gradient-text">Hired Faster</span>
          </h2>
          <p className="text-slate-400 text-base leading-relaxed">
            Comprehensive AI-powered tools for students, placement officers, and recruiters.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { icon: FileText, title: 'AI Resume Builder', desc: '9-step wizard generating ATS-optimized PDF templates with real-time preview.' },
            { icon: Target, title: 'ATS Analysis Engine', desc: 'Instant keyword gap analysis, formatting metrics, and impact scoring.' },
            { icon: Brain, title: 'AI Career Mentor', desc: '24/7 Gemini-powered chat for personalized career coaching and roadmaps.' },
            { icon: Users, title: 'AI Mock Interviews', desc: 'Simulated HR, Technical & Behavioral rounds with AI-generated feedback.' },
            { icon: Briefcase, title: 'Smart Job Matching', desc: 'AI matches your verified skills with top openings and shows selection %.' },
            { icon: ShieldCheck, title: 'Campus Analytics', desc: 'Placement dashboards, department reports, and company recruitment insights.' },
          ].map((feat, i) => (
            <FeatureCard key={i} icon={feat.icon} title={feat.title} desc={feat.desc} index={i} />
          ))}
        </div>
      </section>

      {/* ── Stats / Social Proof ── */}
      <section id="stats" className="py-20 px-6 border-y" style={{ borderColor: 'rgba(148,163,184,0.06)' }}>
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { icon: Star, value: '4.9', label: 'Average Rating' },
            { icon: Users, value: '10,000+', label: 'Active Students' },
            { icon: Briefcase, value: '500+', label: 'Partner Companies' },
            { icon: Target, value: '98.4%', label: 'ATS Pass Rate' },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex flex-col items-center"
            >
              <item.icon className="w-6 h-6 text-indigo-400 mb-3" />
              <div className="text-3xl font-black gradient-text font-['Outfit']">{item.value}</div>
              <div className="text-xs text-slate-500 font-medium mt-1">{item.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── CTA Footer ── */}
      <section className="py-32 px-6 mesh-gradient text-center relative">
        <div className="max-w-4xl mx-auto relative z-10">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl lg:text-5xl font-black mb-6 font-['Outfit'] tracking-tight"
          >
            Ready to Experience <span className="gradient-text">HireGenie AI</span>?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="text-slate-400 mb-10 max-w-2xl mx-auto text-lg"
          >
            Sign in now to explore the full interactive dashboard with all 20+ AI-powered modules.
          </motion.p>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link to="/login" className="btn-primary py-4 px-10 text-lg shadow-2xl shadow-indigo-500/30 inline-flex items-center gap-3">
              Open Interactive App <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="py-8 px-6 border-t text-center" style={{ borderColor: 'rgba(148,163,184,0.06)' }}>
        <p className="text-xs text-slate-600">
          © 2026 HireGenie AI — Built with Gemini 2.0 Flash, React, TypeScript & Supabase
        </p>
      </footer>
    </div>
  );
}
