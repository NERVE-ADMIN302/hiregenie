import { 
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
  { label: 'Career Mentor', path: '/student/career-mentor', icon: MessageSquare },
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