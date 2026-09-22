import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Sparkles, Copy, Check } from 'lucide-react';
import { useResume } from '@/store/resume-context';

export function EmailGenerator() {
  const { resume, hasResume } = useResume();
  const userName = resume.personal.name || 'Your Name';
  const userRole = resume.experience.length > 0 ? resume.experience[0].position : 'Software Engineer';

  const [emailType, setEmailType] = useState('application');
  const [copied, setCopied] = useState(false);

  const templates: Record<string, { subject: string; body: string }> = {
    application: {
      subject: `Application for ${userRole} Position — ${userName}`,
      body: `Dear Hiring Manager,\n\nI am writing to formally submit my application for the ${userRole} position. ${resume.skills.length > 0 ? `As a professional skilled in ${resume.skills.slice(0, 3).join(', ')}, ` : ''}I have built production-level applications${resume.projects.length > 0 ? ` including ${resume.projects[0].title}` : ''}.\n\nAttached is my resume for your review. I would welcome the opportunity to discuss how my skills align with your engineering goals.\n\nBest regards,\n${userName}${resume.personal.phone ? '\n' + resume.personal.phone : ''}`,
    },
    followup: {
      subject: `Following Up — ${userRole} Application — ${userName}`,
      body: `Dear Hiring Manager,\n\nI hope this message finds you well. I am writing to follow up on my application for the ${userRole} position submitted last week.\n\nI remain very interested in this opportunity and would appreciate any updates on the hiring timeline.\n\nThank you for your time.\n\nBest regards,\n${userName}`,
    },
    thankyou: {
      subject: `Thank You — ${userRole} Interview — ${userName}`,
      body: `Dear Interviewer,\n\nThank you for taking the time to interview me for the ${userRole} position today. I enjoyed learning more about your team and the exciting projects ahead.\n\n${resume.skills.length > 0 ? `I am confident that my expertise in ${resume.skills.slice(0, 3).join(', ')} aligns well with your needs. ` : ''}I look forward to hearing from you.\n\nBest regards,\n${userName}`,
    },
    negotiation: {
      subject: `Offer Discussion — ${userName}`,
      body: `Dear HR Team,\n\nThank you for extending the offer for the ${userRole} position. I am thrilled about the opportunity to join your team.\n\nI would like to discuss the compensation package further. Based on my ${resume.skills.length > 0 ? `skills in ${resume.skills.slice(0, 3).join(', ')} and ` : ''}experience, I believe there may be room for adjustment.\n\nI look forward to our conversation.\n\nBest regards,\n${userName}`,
    },
  };

  const currentTemplate = templates[emailType] || templates.application;
  const [subject, setSubject] = useState(currentTemplate.subject);
  const [body, setBody] = useState(currentTemplate.body);

  const handleTypeChange = (type: string) => {
    setEmailType(type);
    const t = templates[type];
    if (t) { setSubject(t.subject); setBody(t.body); }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(`Subject: ${subject}\n\n${body}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-100 flex items-center gap-2">
          <Mail className="w-6 h-6 text-blue-400" /> AI Email Generator
        </h2>
        <p className="text-sm text-slate-400">
          {hasResume
            ? `Drafting emails personalized for ${userName} (${resume.skills.length} skills detected).`
            : 'Build your resume first for personalized emails.'}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { id: 'application', label: 'Job Application' },
          { id: 'followup', label: 'Follow-up' },
          { id: 'thankyou', label: 'Thank You' },
          { id: 'negotiation', label: 'Offer Discussion' },
        ].map(t => (
          <motion.button type="button"
            key={t.id}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => handleTypeChange(t.id)}
            className={`p-4 rounded-xl border text-xs font-bold transition-all text-center ${emailType === t.id ? 'border-blue-500 bg-blue-500/10 text-blue-400' : 'border-white/10 text-slate-400 hover:border-white/20'}`}
          >
            {t.label}
          </motion.button>
        ))}
      </div>

      <div className="glass-card p-6 space-y-4">
        <div className="flex items-center justify-between border-b pb-3" style={{ borderColor: 'rgba(148,163,184,0.08)' }}>
          <h3 className="font-bold text-slate-200 text-sm">Generated Email Draft</h3>
          <motion.button type="button" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }} onClick={handleCopy} className="btn-secondary text-xs flex items-center gap-1.5">
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            {copied ? 'Copied!' : 'Copy All'}
          </motion.button>
        </div>
        <div>
          <label className="text-xs font-bold text-slate-400">Subject Line</label>
          <input value={subject} onChange={e => setSubject(e.target.value)} className="input-field mt-1" />
        </div>
        <div>
          <label className="text-xs font-bold text-slate-400">Email Body</label>
          <textarea rows={10} value={body} onChange={e => setBody(e.target.value)} className="input-field mt-1 leading-relaxed text-sm" />
        </div>
      </div>
    </motion.div>
  );
}

