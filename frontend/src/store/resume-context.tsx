import React, { createContext, useContext, useState, useCallback } from 'react';

// ─── Types ───
export interface ResumeData {
  personal: {
    name: string;
    email: string;
    phone: string;
    location: string;
    summary: string;
  };
  education: Array<{
    institution: string;
    degree: string;
    field: string;
    start: string;
    end: string;
    gpa: string;
  }>;
  experience: Array<{
    company: string;
    position: string;
    location: string;
    start: string;
    end: string;
    desc: string;
  }>;
  projects: Array<{
    title: string;
    desc: string;
    tech: string;
  }>;
  skills: string[];
  uploadedFileName?: string;
  lastUpdated: string;
}

export interface ATSResult {
  overallScore: number;
  metrics: Array<{ subject: string; score: number }>;
  missingKeywords: string[];
  improvements: Array<{ title: string; desc: string }>;
  passStatus: string;
}

// ─── Default empty state ───
const emptyResume: ResumeData = {
  personal: { name: '', email: '', phone: '', location: '', summary: '' },
  education: [],
  experience: [],
  projects: [],
  skills: [],
  lastUpdated: '',
};

export const demoResume: ResumeData = {
  personal: {
    name: 'Aarav Sharma',
    email: 'aarav.sharma@hiregenie.ai',
    phone: '+91 98765 43210',
    location: 'Bengaluru, India',
    summary: 'Proactive Full Stack & AI Developer with strong background in React, TypeScript, Python, FastAPI, and PostgreSQL. Passionate about engineering high-impact web apps and scalable microservices.',
  },
  education: [
    {
      institution: 'Indian Institute of Information Technology',
      degree: 'B.Tech',
      field: 'Computer Science & Engineering',
      start: '2022',
      end: '2026',
      gpa: '8.8',
    },
  ],
  experience: [
    {
      company: 'TechCorp Solutions',
      position: 'Software Engineering Intern',
      location: 'Bengaluru, India',
      start: 'May 2024',
      end: 'July 2024',
      desc: 'Engineered RESTful services using FastAPI & PostgreSQL, cutting response latency by 35%. Built modern React UI components serving 15,000+ active users.',
    },
  ],
  projects: [
    {
      title: 'HireGenie AI Platform',
      desc: 'Full-stack AI placement platform featuring resume intelligence, ATS keyword scoring, and simulated mock interviews.',
      tech: 'React 19, TypeScript, FastAPI, PostgreSQL, Gemini AI',
    },
    {
      title: 'Cloud Realtime Canvas',
      desc: 'Collaborative digital whiteboard with multi-cursor sync and low latency WebSockets streaming.',
      tech: 'React, Node.js, WebSockets, Tailwind CSS',
    },
  ],
  skills: ['React', 'TypeScript', 'Node.js', 'Python', 'FastAPI', 'PostgreSQL', 'Docker', 'REST APIs', 'Git', 'Tailwind CSS'],
  lastUpdated: new Date().toISOString(),
};

// ─── Context ───
interface ResumeContextType {
  resume: ResumeData;
  atsResult: ATSResult | null;
  hasResume: boolean;
  updateResume: (data: Partial<ResumeData>) => void;
  setFullResume: (data: ResumeData) => void;
  runATSAnalysis: (jobDescription?: string) => ATSResult;
  getSkillGap: (targetRole: string) => { matched: string[]; missing: string[]; roadmap: any[] };
  getCareerReadiness: () => { score: number; dimensions: any[] };
  loadDemoData: () => void;
  clearResume: () => void;
}

const ResumeContext = createContext<ResumeContextType>({} as ResumeContextType);

// ─── ATS Scoring Engine ───
function calculateATSScore(resume: ResumeData, jobDesc?: string): ATSResult {
  const r = resume;
  let keywordScore = 0, grammarScore = 0, formatScore = 0, impactScore = 0, relevanceScore = 0;

  // Keywords — check how many skills exist
  const skillCount = r.skills.length;
  keywordScore = Math.min(95, 40 + skillCount * 5);

  // Grammar — based on summary length and quality
  const summaryLen = r.personal.summary.length;
  grammarScore = summaryLen > 100 ? 95 : summaryLen > 50 ? 85 : summaryLen > 10 ? 70 : 40;

  // Formatting — based on completeness of sections
  let sectionsFilled = 0;
  if (r.personal.name) sectionsFilled++;
  if (r.education.length > 0) sectionsFilled++;
  if (r.experience.length > 0) sectionsFilled++;
  if (r.projects.length > 0) sectionsFilled++;
  if (r.skills.length > 0) sectionsFilled++;
  formatScore = Math.min(95, sectionsFilled * 18);

  // Impact — based on quantified achievements in descriptions
  const allDescs = [...r.experience.map(e => e.desc), ...r.projects.map(p => p.desc)].join(' ');
  const hasNumbers = (allDescs.match(/\d+%|\d+x|\d+ users|\d+ projects/gi) || []).length;
  impactScore = Math.min(95, 50 + hasNumbers * 15);

  // Relevance — skills match against job description keywords
  if (jobDesc) {
    const jdLower = jobDesc.toLowerCase();
    const matchCount = r.skills.filter(s => jdLower.includes(s.toLowerCase())).length;
    relevanceScore = Math.min(95, 40 + matchCount * 10);
  } else {
    relevanceScore = Math.min(90, 50 + skillCount * 4);
  }

  const overall = Math.round((keywordScore + grammarScore + formatScore + impactScore + relevanceScore) / 5);

  // Missing keywords — common industry keywords not in skills
  const commonKeywords = ['Docker', 'Kubernetes', 'CI/CD', 'AWS', 'System Design', 'REST APIs',
    'GraphQL', 'Redis', 'Unit Testing', 'Microservices', 'Agile', 'Git', 'Linux', 'TypeScript',
    'React', 'Python', 'Node.js', 'SQL', 'MongoDB', 'TDD'];
  const normalizedSkills = r.skills.map(s => s.toLowerCase());
  const missing = commonKeywords.filter(kw => !normalizedSkills.some(s =>
    s.includes(kw.toLowerCase()) || kw.toLowerCase().includes(s)
  ));

  // Improvement suggestions based on actual gaps
  const improvements: Array<{ title: string; desc: string }> = [];
  if (impactScore < 70) improvements.push({ title: 'Quantify Accomplishments', desc: 'Add numerical metrics to experience descriptions (e.g., "Reduced load time by 40%").' });
  if (r.experience.length === 0) improvements.push({ title: 'Add Work Experience', desc: 'Include internships, freelance work, or open-source contributions.' });
  if (r.projects.length < 2) improvements.push({ title: 'Add More Projects', desc: 'Showcase at least 2-3 projects with different tech stacks.' });
  if (summaryLen < 80) improvements.push({ title: 'Expand Professional Summary', desc: 'Write a compelling 2-3 sentence summary highlighting your unique value.' });
  if (r.skills.length < 6) improvements.push({ title: 'List More Technical Skills', desc: 'Include programming languages, frameworks, databases, and tools you know.' });
  if (missing.length > 5) improvements.push({ title: 'Add Industry Keywords', desc: `Keywords like "${missing.slice(0, 3).join(', ')}" are commonly expected by ATS systems.` });

  const passStatus = overall >= 80 ? 'PASSED — Ready for Top Recruiters' :
                     overall >= 60 ? 'NEEDS IMPROVEMENT — Fix key issues' :
                     'LOW SCORE — Significant revision needed';

  return {
    overallScore: overall,
    metrics: [
      { subject: 'ATS Keywords', score: keywordScore },
      { subject: 'Grammar', score: grammarScore },
      { subject: 'Formatting', score: formatScore },
      { subject: 'Impact Score', score: impactScore },
      { subject: 'Relevance', score: relevanceScore },
    ],
    missingKeywords: missing.slice(0, 8),
    improvements: improvements.length > 0 ? improvements : [{ title: 'Looking Great!', desc: 'Your resume meets all major ATS criteria. Keep it updated.' }],
    passStatus,
  };
}

// ─── Skill Gap Engine ───
function calculateSkillGap(resume: ResumeData, targetRole: string) {
  const roleRequirements: Record<string, string[]> = {
    'Full Stack Web Engineer': ['React', 'TypeScript', 'Node.js', 'Python', 'PostgreSQL', 'Docker', 'AWS', 'REST APIs', 'Git', 'CI/CD', 'Redis', 'GraphQL'],
    'Frontend React Specialist': ['React', 'TypeScript', 'Next.js', 'Tailwind CSS', 'Redux', 'Framer Motion', 'Storybook', 'Jest', 'Webpack', 'Accessibility'],
    'Backend Python / FastAPI Engineer': ['Python', 'FastAPI', 'PostgreSQL', 'Redis', 'Docker', 'Celery', 'SQLAlchemy', 'Pytest', 'AWS Lambda', 'REST APIs'],
    'Data Scientist & AI Specialist': ['Python', 'TensorFlow', 'PyTorch', 'Pandas', 'NumPy', 'Scikit-learn', 'SQL', 'Jupyter', 'Statistics', 'NLP'],
    'DevOps & Cloud Engineer': ['Docker', 'Kubernetes', 'AWS', 'Terraform', 'CI/CD', 'Linux', 'Ansible', 'Prometheus', 'Git', 'Bash'],
  };

  const required = roleRequirements[targetRole] || roleRequirements['Full Stack Web Engineer'];
  const normalizedSkills = resume.skills.map(s => s.toLowerCase());

  const matched = required.filter(r => normalizedSkills.some(s => s.includes(r.toLowerCase()) || r.toLowerCase().includes(s)));
  const missing = required.filter(r => !normalizedSkills.some(s => s.includes(r.toLowerCase()) || r.toLowerCase().includes(s)));

  const roadmap = missing.slice(0, 4).map((skill, i) => ({
    week: `Week ${i + 1}`,
    title: `Learn ${skill}`,
    desc: `Master the fundamentals of ${skill} through hands-on projects and documentation study.`,
    status: i === 0 ? 'High Priority' : i < 2 ? 'Medium Priority' : 'Recommended',
  }));

  return { matched, missing, roadmap };
}

// ─── Career Readiness Engine ───
function calculateCareerReadiness(resume: ResumeData, atsScore?: number) {
  const skillScore = Math.min(95, 30 + resume.skills.length * 6);
  const projectScore = Math.min(95, 30 + resume.projects.length * 20);
  const academicScore = resume.education.length > 0 ?
    Math.min(95, parseFloat(resume.education[0].gpa || '0') * 10) : 30;
  const experienceScore = Math.min(95, 30 + resume.experience.length * 25);
  const atsVal = atsScore || 50;

  const dimensions = [
    { label: 'Technical Skills', score: skillScore, color: 'bg-blue-500' },
    { label: 'ATS Resume Score', score: atsVal, color: 'bg-emerald-500' },
    { label: 'Project Portfolio', score: projectScore, color: 'bg-violet-500' },
    { label: 'Academic Standing', score: academicScore, color: 'bg-amber-500' },
    { label: 'Work Experience', score: experienceScore, color: 'bg-pink-500' },
  ];

  const overall = Math.round(dimensions.reduce((sum, d) => sum + d.score, 0) / dimensions.length);

  return { score: overall, dimensions };
}

// ─── Provider ───
export const ResumeProvider = ({ children }: { children: React.ReactNode }) => {
  const [resume, setResume] = useState<ResumeData>(() => {
    try {
      const stored = localStorage.getItem('resume_data');
      return stored ? JSON.parse(stored) : emptyResume;
    } catch { return emptyResume; }
  });

  const [atsResult, setAtsResult] = useState<ATSResult | null>(null);

  const hasResume = !!(resume.personal.name || resume.skills.length > 0 || resume.uploadedFileName);

  const save = (data: ResumeData) => {
    localStorage.setItem('resume_data', JSON.stringify(data));
  };

  const updateResume = useCallback((partial: Partial<ResumeData>) => {
    setResume(prev => {
      const updated = { ...prev, ...partial, lastUpdated: new Date().toISOString() };
      save(updated);
      return updated;
    });
  }, []);

  const setFullResume = useCallback((data: ResumeData) => {
    const updated = { ...data, lastUpdated: new Date().toISOString() };
    setResume(updated);
    save(updated);
  }, []);

  const runATSAnalysis = useCallback((jobDesc?: string) => {
    const result = calculateATSScore(resume, jobDesc);
    setAtsResult(result);
    return result;
  }, [resume]);

  const getSkillGap = useCallback((targetRole: string) => {
    return calculateSkillGap(resume, targetRole);
  }, [resume]);

  const getCareerReadiness = useCallback(() => {
    return calculateCareerReadiness(resume, atsResult?.overallScore);
  }, [resume, atsResult]);

  const loadDemoData = useCallback(() => {
    setResume(demoResume);
    save(demoResume);
    const result = calculateATSScore(demoResume);
    setAtsResult(result);
  }, []);

  const clearResume = useCallback(() => {
    setResume(emptyResume);
    setAtsResult(null);
    localStorage.removeItem('resume_data');
  }, []);

  return (
    <ResumeContext.Provider value={{ resume, atsResult, hasResume, updateResume, setFullResume, runATSAnalysis, getSkillGap, getCareerReadiness, loadDemoData, clearResume }}>
      {children}
    </ResumeContext.Provider>
  );
};

export const useResume = () => useContext(ResumeContext);
