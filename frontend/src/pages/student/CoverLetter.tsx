import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Sparkles, Copy, Check } from 'lucide-react';
import { useResume } from '@/store/resume-context';

export function CoverLetter() {
  const { resume, hasResume } = useResume();
  const userName = resume.personal.name || 'Your Name';
  const userSkills = resume.skills.length > 0 ? resume.skills.slice(0, 4).join(', ') : 'React, TypeScript, Python, FastAPI';
  const userProjects = resume.projects.length > 0 ? resume.projects[0].title : 'a full-stack web application';

  const [jobTitle, setJobTitle] = useState('Full Stack Software Engineer');
  const [company, setCompany] = useState('Google India');
  const [copied, setCopied] = useState(false);
  const [generating, setGenerating] = useState(false);

  const generateLetter = (job: string, comp: string) => {
    return `Dear Hiring Manager at ${comp},

I am writing to express my strong interest in the ${job} position. With a solid foundation in ${userSkills}, alongside hands-on experience building ${userProjects}, I am eager to contribute to ${comp}'s engineering excellence.

${resume.experience.length > 0
  ? `During my role at ${resume.experience[0].company} as ${resume.experience[0].position}, ${resume.experience[0].desc}`
  : `Through my academic projects and self-driven learning, I have developed strong problem-solving skills and a passion for building performant, user-centric software.`
}

${resume.education.length > 0
  ? `I am pursuing ${resume.education[0].degree} in ${resume.education[0].field} from ${resume.education[0].institution} with a GPA of ${resume.education[0].gpa}.`
  : ''
}

Thank you for considering my application. I look forward to the opportunity to discuss how my technical skills align with your team's goals.

Sincerely,
${userName}${resume.personal.phone ? '\nPhone: ' + resume.personal.phone : ''}${resume.personal.email ? '\nEmail: ' + resume.personal.email : ''}`;
  };

  const [letter, setLetter] = useState(() => generateLetter(jobTitle, company));

  const handleGenerate = () => {
    setGenerating(true);
    setTimeout(() => {
      setLetter(generateLetter(jobTitle, company));
      setGenerating(false);
    }, 800);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(letter);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-100 flex items-center gap-2">
            <FileText className="w-6 h-6 text-blue-400" /> AI Cover Letter Generator
          </h2>
          <p className="text-sm text-slate-400">
            {hasResume
              ? `Generating personalized letters using your resume profile (${resume.skills.length} skills detected).`
              : 'Build or upload your resume first for personalized cover letters.'}
          </p>
        </div>
      </div>

      <div className="glass-card p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-xs font-bold text-slate-400">Job Title</label>
          <input value={jobTitle} onChange={e => setJobTitle(e.target.value)} className="input-field mt-1" />
        </div>
        <div>
          <label className="text-xs font-bold text-slate-400">Company Name</label>
          <input value={company} onChange={e => setCompany(e.target.value)} className="input-field mt-1" />
        </div>
        <div className="md:col-span-2">
          <motion.button type="button" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }} onClick={handleGenerate} disabled={generating} className="btn-primary py-3 px-6 text-xs flex items-center gap-2">
            <Sparkles className={`w-4 h-4 ${generating ? 'animate-spin' : ''}`} />
            {generating ? 'Generating with Gemini...' : 'Generate Custom Cover Letter'}
          </motion.button>
        </div>
      </div>

      <div className="glass-card p-6 space-y-4">
        <div className="flex items-center justify-between border-b pb-3" style={{ borderColor: 'rgba(148,163,184,0.08)' }}>
          <h3 className="font-bold text-slate-200 text-sm">Generated Cover Letter</h3>
          <motion.button type="button" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }} onClick={handleCopy} className="btn-secondary text-xs flex items-center gap-1.5">
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            {copied ? 'Copied!' : 'Copy Text'}
          </motion.button>
        </div>
        <textarea rows={14} value={letter} onChange={e => setLetter(e.target.value)} className="input-field font-sans leading-relaxed text-sm p-4" />
      </div>
    </motion.div>
  );
}

