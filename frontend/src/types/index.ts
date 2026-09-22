export type UserRole = 'student' | 'recruiter' | 'placement_officer' | 'admin';

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