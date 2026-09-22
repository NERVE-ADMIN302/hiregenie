const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src');

const files = {
  // === TYPES ===
  'types/index.ts': `export type UserRole = 'student' | 'recruiter' | 'placement_officer' | 'admin';

export interface User {
  id: string;
  email: string;
  role: UserRole;
  name: string;
  avatar_url?: string;
  created_at: string;
}

export interface Education {
  institution: string;
  degree: string;
  field: string;
  start_date: string;
  end_date: string;
  gpa?: number;
}

export interface Experience {
  company: string;
  role: string;
  start_date: string;
  end_date: string;
  description: string;
}

export interface Project {
  title: string;
  description: string;
  link?: string;
  technologies: string[];
}

export interface Skill {
  name: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
}

export interface Certification {
  name: string;
  issuer: string;
  date: string;
  url?: string;
}

export interface Achievement {
  title: string;
  date: string;
  description: string;
}

export interface Language {
  name: string;
  proficiency: string;
}

export interface Resume {
  id: string;
  user_id: string;
  education: Education[];
  experience: Experience[];
  projects: Project[];
  skills: Skill[];
  certifications: Certification[];
  achievements: Achievement[];
  languages: Language[];
}

export interface Job {
  id: string;
  title: string;
  company_id: string;
  company_name: string;
  location: string;
  type: string;
  description: string;
  requirements: string[];
  skills_required: string[];
  salary_range?: string;
  posted_at: string;
  status: 'active' | 'closed';
}

export interface JobApplication {
  id: string;
  job_id: string;
  user_id: string;
  status: 'applied' | 'viewed' | 'shortlisted' | 'interview' | 'technical' | 'hr' | 'offered' | 'rejected';
  applied_at: string;
}

export interface ATSAnalysis {
  score: number;
  missing_keywords: string[];
  suggestions: string[];
  categories: { name: string; score: number }[];
}

export interface SkillGapAnalysis {
  role: string;
  matched_skills: string[];
  missing_skills: string[];
  roadmap: string[];
}

export interface CareerReadiness {
  score: number;
  dimensions: { name: string; score: number }[];
  suggestions: string[];
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

export interface InterviewQuestion {
  id: string;
  question: string;
  type: string;
}

export interface InterviewResponse {
  question_id: string;
  answer: string;
  score: number;
  feedback: string;
}

export interface Notification {
  id: string;
  user_id: string;
  title: string;
  message: string;
  read: boolean;
  created_at: string;
}

export interface Company {
  id: string;
  name: string;
  industry: string;
  size: string;
  website?: string;
  description?: string;
}
`,
  // === UTILS ===
  'lib/utils.ts': `import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(dateString: string) {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  }).format(new Date(dateString));
}

export function formatCurrency(amount: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0
  }).format(amount);
}

export function getInitials(name: string) {
  return name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);
}

export function truncateText(text: string, length: number) {
  if (text.length <= length) return text;
  return text.substring(0, length) + '...';
}
`,
  'lib/constants.ts': `import { 
  LayoutDashboard, FileText, Upload, BarChart, TrendingUp, 
  Target, MessageSquare, Mic, FileSignature, Mail, 
  Briefcase, Building2, CheckSquare, KanbanSquare, PieChart,
  Users, Search, Users2, Building, Settings, ListPlus, Activity
} from 'lucide-react';

export const STUDENT_NAV = [
  { label: 'Dashboard', path: '/student/dashboard', icon: LayoutDashboard },
  { label: 'Resume Builder', path: '/student/resume-builder', icon: FileText },
  { label: 'Upload Resume', path: '/student/resume-upload', icon: Upload },
  { label: 'ATS Analysis', path: '/student/ats-analysis', icon: BarChart },
  { label: 'Skill Gap', path: '/student/skill-gap', icon: TrendingUp },
  { label: 'Career Readiness', path: '/student/career-readiness', icon: Target },
  { label: 'Career Mentor', path: '/student/mentor', icon: MessageSquare },
  { label: 'Mock Interview', path: '/student/mock-interview', icon: Mic },
  { label: 'Cover Letter', path: '/student/cover-letter', icon: FileSignature },
  { label: 'Email Generator', path: '/student/email-generator', icon: Mail },
  { label: 'Job Recommendations', path: '/student/jobs', icon: Briefcase },
  { label: 'Companies', path: '/student/companies', icon: Building2 },
  { label: 'Eligibility Checker', path: '/student/eligibility', icon: CheckSquare },
  { label: 'Application Tracker', path: '/student/applications', icon: KanbanSquare },
  { label: 'Analytics', path: '/student/analytics', icon: PieChart },
];

export const RECRUITER_NAV = [
  { label: 'Dashboard', path: '/recruiter/dashboard', icon: LayoutDashboard },
  { label: 'Post Job', path: '/recruiter/post-job', icon: ListPlus },
  { label: 'Search Students', path: '/recruiter/search', icon: Search },
  { label: 'Manage Candidates', path: '/recruiter/candidates', icon: Users },
];

export const PLACEMENT_NAV = [
  { label: 'Dashboard', path: '/placement/dashboard', icon: LayoutDashboard },
  { label: 'Manage Students', path: '/placement/students', icon: Users2 },
  { label: 'Eligible Students', path: '/placement/eligible', icon: CheckSquare },
  { label: 'Reports', path: '/placement/reports', icon: BarChart },
];

export const ADMIN_NAV = [
  { label: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
  { label: 'Manage Users', path: '/admin/users', icon: Users },
  { label: 'Manage Jobs', path: '/admin/jobs', icon: Briefcase },
  { label: 'System Logs', path: '/admin/logs', icon: Activity },
];

export const CHART_COLORS = ['#6366f1', '#ec4899', '#8b5cf6', '#14b8a6', '#f59e0b', '#ef4444'];
`,
  'lib/supabase.ts': `import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder-key';

export const supabase = createClient(supabaseUrl, supabaseKey);
`,
  'lib/api.ts': `const API_URL = import.meta.env.VITE_API_URL || '/api';

export async function fetchApi(endpoint: string, options: RequestInit = {}) {
  const token = localStorage.getItem('token');
  const headers = {
    'Content-Type': 'application/json',
    ...(token && { Authorization: "Bearer " + token }),
    ...options.headers,
  };

  const response = await fetch(API_URL + endpoint, { ...options, headers });
  if (!response.ok) {
    throw new Error('API request failed');
  }
  return response.json();
}
`,

  // === PROVIDERS ===
  'store/auth-context.tsx': `import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '@/types';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (data: any) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null, loading: false, login: () => {}, logout: () => {}
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock user for now
    const stored = localStorage.getItem('user');
    if (stored) {
      setUser(JSON.parse(stored));
    }
    setLoading(false);
  }, []);

  const login = (data: any) => {
    const mockUser: User = { id: '1', email: data.email, name: 'Test User', role: data.role || 'student', created_at: new Date().toISOString() };
    setUser(mockUser);
    localStorage.setItem('user', JSON.stringify(mockUser));
  };
  const logout = () => { setUser(null); localStorage.removeItem('user'); };

  return <AuthContext.Provider value={{ user, loading, login, logout }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
`,
  'store/theme-context.tsx': `import React, { createContext, useContext, useState, useEffect } from 'react';

type Theme = 'dark' | 'light';
interface ThemeContextType { theme: Theme; toggleTheme: () => void; }

const ThemeContext = createContext<ThemeContextType>({ theme: 'dark', toggleTheme: () => {} });

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<Theme>('dark');

  useEffect(() => {
    const stored = localStorage.getItem('theme') as Theme;
    if (stored) {
      setTheme(stored);
      document.documentElement.setAttribute('data-theme', stored);
    } else {
      document.documentElement.setAttribute('data-theme', 'dark');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => useContext(ThemeContext);
`,

  // === SHARED COMPONENTS ===
  'components/shared/StatCard.tsx': `import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: number;
  className?: string;
}

export function StatCard({ title, value, icon: Icon, trend, className }: StatCardProps) {
  return (
    <motion.div 
      whileHover={{ y: -4, scale: 1.02 }}
      className={cn("glass-card p-6 flex items-start justify-between", className)}
    >
      <div>
        <p className="text-sm text-[var(--text-muted)] font-medium mb-1">{title}</p>
        <h3 className="text-2xl font-bold text-[var(--text)]">{value}</h3>
        {trend !== undefined && (
          <p className={cn("text-xs mt-2 font-medium", trend >= 0 ? "text-emerald-500" : "text-rose-500")}>
            {trend >= 0 ? '+' : ''}{trend}% from last month
          </p>
        )}
      </div>
      <div className="p-3 bg-[var(--surface)] rounded-xl border border-[var(--border)]">
        <Icon className="w-6 h-6 text-[var(--color-primary)]" />
      </div>
    </motion.div>
  );
}
`,
  'components/shared/ScoreRing.tsx': `import React from 'react';
import { motion } from 'framer-motion';

interface ScoreRingProps {
  score: number;
  size?: number;
  strokeWidth?: number;
}

export function ScoreRing({ score, size = 120, strokeWidth = 10 }: ScoreRingProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDashoffset = circumference - (score / 100) * circumference;
  
  const getColor = (s: number) => {
    if (s >= 80) return '#10b981'; // emerald
    if (s >= 60) return '#f59e0b'; // amber
    return '#ef4444'; // rose
  };

  return (
    <div className="relative flex items-center justify-center score-ring" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="transform -rotate-90">
        <circle
          cx={size / 2} cy={size / 2} r={radius}
          fill="none" stroke="var(--border)" strokeWidth={strokeWidth}
        />
        <motion.circle
          cx={size / 2} cy={size / 2} r={radius}
          fill="none" stroke={getColor(score)} strokeWidth={strokeWidth}
          strokeLinecap="round" strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />
      </svg>
      <div className="absolute flex flex-col items-center justify-center">
        <span className="text-3xl font-bold font-['Outfit']" style={{ color: getColor(score) }}>{score}</span>
      </div>
    </div>
  );
}
`,

  // === LAYOUT COMPONENTS ===
  'components/layout/Sidebar.tsx': `import React from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '@/store/auth-context';
import { STUDENT_NAV, RECRUITER_NAV, PLACEMENT_NAV, ADMIN_NAV } from '@/lib/constants';
import { LogOut, Menu } from 'lucide-react';
import { cn, getInitials } from '@/lib/utils';

export function Sidebar({ collapsed, setCollapsed }: { collapsed: boolean; setCollapsed: (v: boolean) => void }) {
  const { user, logout } = useAuth();
  
  const navItems = user?.role === 'admin' ? ADMIN_NAV :
                   user?.role === 'recruiter' ? RECRUITER_NAV :
                   user?.role === 'placement_officer' ? PLACEMENT_NAV : STUDENT_NAV;

  return (
    <motion.aside 
      animate={{ width: collapsed ? 80 : 260 }}
      className="h-screen bg-[var(--surface)] border-r border-[var(--border)] flex flex-col sticky top-0 z-40 backdrop-blur-xl shrink-0"
    >
      <div className="h-16 flex items-center justify-between px-4 border-b border-[var(--border)]">
        {!collapsed && <span className="text-xl font-bold gradient-text font-['Outfit']">HireGenie AI</span>}
        <button onClick={() => setCollapsed(!collapsed)} className="p-2 hover:bg-[var(--border)] rounded-lg transition-colors ml-auto">
          <Menu className="w-5 h-5" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto py-4 px-3 flex flex-col gap-1 custom-scrollbar">
        {navItems.map((item) => (
          <NavLink
            key={item.path} to={item.path}
            className={({ isActive }) => cn(
              "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group relative",
              isActive ? "bg-[var(--color-primary)]/10 text-[var(--color-primary)]" : "text-[var(--text-muted)] hover:bg-[var(--border)] hover:text-[var(--text)]"
            )}
            title={collapsed ? item.label : undefined}
          >
            {({ isActive }) => (
              <>
                <item.icon className={cn("w-5 h-5 shrink-0", isActive ? "text-[var(--color-primary)]" : "")} />
                {!collapsed && <span className="font-medium whitespace-nowrap">{item.label}</span>}
                {isActive && !collapsed && (
                  <motion.div layoutId="activeNav" className="absolute left-0 w-1 h-6 bg-[var(--color-primary)] rounded-r-full" />
                )}
              </>
            )}
          </NavLink>
        ))}
      </div>

      <div className="p-4 border-t border-[var(--border)] flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[var(--color-primary)] to-[var(--color-secondary)] flex items-center justify-center text-white font-bold shrink-0">
          {getInitials(user?.name || 'U')}
        </div>
        {!collapsed && (
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate text-[var(--text)]">{user?.name}</p>
            <p className="text-xs text-[var(--text-muted)] truncate capitalize">{user?.role}</p>
          </div>
        )}
        {!collapsed && (
          <button onClick={logout} className="p-2 hover:bg-rose-500/10 hover:text-rose-500 rounded-lg transition-colors">
            <LogOut className="w-5 h-5" />
          </button>
        )}
      </div>
    </motion.aside>
  );
}
`,
  'components/layout/Topbar.tsx': `import React from 'react';
import { Bell, Search, Sun, Moon } from 'lucide-react';
import { useTheme } from '@/store/theme-context';
import { useLocation } from 'react-router-dom';

export function Topbar() {
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const pageTitle = location.pathname.split('/').pop()?.replace(/-/g, ' ') || 'Dashboard';

  return (
    <header className="h-16 bg-[var(--surface)]/50 backdrop-blur-lg border-b border-[var(--border)] sticky top-0 z-30 flex items-center justify-between px-6">
      <h1 className="text-xl font-semibold capitalize font-['Outfit'] text-[var(--text)]">{pageTitle}</h1>
      
      <div className="flex items-center gap-4">
        <div className="relative hidden md:block">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
          <input 
            type="text" 
            placeholder="Search..." 
            className="pl-9 pr-4 py-2 bg-[var(--bg)] border border-[var(--border)] rounded-full text-sm focus:outline-none focus:border-[var(--color-primary)] transition-colors w-64"
          />
        </div>
        
        <button className="relative p-2 hover:bg-[var(--border)] rounded-full transition-colors text-[var(--text-muted)] hover:text-[var(--text)]">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full pulse-dot"></span>
        </button>

        <button onClick={toggleTheme} className="p-2 hover:bg-[var(--border)] rounded-full transition-colors text-[var(--text-muted)] hover:text-[var(--text)]">
          {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>
      </div>
    </header>
  );
}
`,
  'components/layout/DashboardLayout.tsx': `import React, { useState } from 'react';
import { Outlet, Navigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Sidebar } from './Sidebar';
import { Topbar } from './Topbar';
import { useAuth } from '@/store/auth-context';

export function DashboardLayout({ allowedRole }: { allowedRole: string }) {
  const [collapsed, setCollapsed] = useState(false);
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) return <div className="h-screen w-full flex items-center justify-center bg-[var(--bg)]"><div className="w-8 h-8 border-4 border-[var(--color-primary)] border-t-transparent rounded-full animate-spin" /></div>;
  if (!user) return <Navigate to="/login" replace />;
  if (user.role !== allowedRole) return <Navigate to={"/" + user.role + "/dashboard"} replace />;

  return (
    <div className="flex h-screen bg-[var(--bg)] overflow-hidden">
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Topbar />
        <main className="flex-1 overflow-auto p-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
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
`,

  // === STUDENT PAGES ===
  'pages/student/StudentDashboard.tsx': `import React from 'react';
import { StatCard } from '@/components/shared/StatCard';
import { ScoreRing } from '@/components/shared/ScoreRing';
import { FileText, Briefcase, Eye, Target } from 'lucide-react';
import { motion } from 'framer-motion';

export function StudentDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[var(--text)]">Welcome back, Student! 👋</h2>
          <p className="text-[var(--text-muted)]">Here is your career progress overview.</p>
        </div>
        <button className="btn-primary">Find Jobs</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Applications Sent" value="12" icon={Briefcase} trend={15} />
        <StatCard title="Profile Views" value="48" icon={Eye} trend={32} />
        <StatCard title="Resume Score" value="85%" icon={FileText} trend={5} />
        <StatCard title="Interview Prep" value="6/10" icon={Target} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 glass-card p-6">
          <h3 className="text-lg font-semibold mb-4">Recent Applications</h3>
          <div className="space-y-4">
            {[1,2,3].map(i => (
              <div key={i} className="flex items-center justify-between p-4 rounded-lg bg-[var(--bg)] border border-[var(--border)]">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-[var(--surface)] flex items-center justify-center font-bold">C{i}</div>
                  <div>
                    <h4 className="font-medium">Software Engineer Intern</h4>
                    <p className="text-sm text-[var(--text-muted)]">Tech Company {i}</p>
                  </div>
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-amber-500/10 text-amber-500">In Review</span>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-card p-6 flex flex-col items-center justify-center text-center">
          <h3 className="text-lg font-semibold mb-6 self-start w-full text-left">Career Readiness</h3>
          <ScoreRing score={78} size={160} strokeWidth={12} />
          <p className="mt-6 text-sm text-[var(--text-muted)]">You are 78% ready for the current job market. Improve your skills to reach 90%+!</p>
          <button className="mt-4 text-[var(--color-primary)] font-medium text-sm hover:underline">View full analysis</button>
        </div>
      </div>
    </div>
  );
}
`,

  // === MAIN ===
  'App.tsx': `import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './store/theme-context';
import { AuthProvider } from './store/auth-context';
import { DashboardLayout } from './components/layout/DashboardLayout';
import { StudentDashboard } from './pages/student/StudentDashboard';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<div className="min-h-screen flex items-center justify-center mesh-gradient"><div className="glass-card p-8 w-96 text-center"><h1 className="text-3xl font-bold mb-6 gradient-text">HireGenie AI</h1><button onClick={() => { localStorage.setItem('user', JSON.stringify({ id:'1', name:'Test', role:'student' })); window.location.href='/student/dashboard'; }} className="btn-primary w-full">Login as Student</button></div></div>} />
            
            {/* Student Routes */}
            <Route path="/student" element={<DashboardLayout allowedRole="student" />}>
              <Route path="dashboard" element={<StudentDashboard />} />
              <Route path="*" element={<div className="glass-card p-12 text-center text-xl text-[var(--text-muted)]">Page Coming Soon</div>} />
            </Route>

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
`,
  'main.tsx': `import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
`
};

for (const [relativePath, content] of Object.entries(files)) {
  const fullPath = path.join(srcDir, relativePath);
  fs.mkdirSync(path.dirname(fullPath), { recursive: true });
  fs.writeFileSync(fullPath, content.trim() + '\\n');
  console.log("Created " + relativePath);
}
