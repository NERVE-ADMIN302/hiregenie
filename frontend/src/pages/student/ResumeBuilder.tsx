import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, Plus, Trash2, CheckCircle2, ArrowRight, ArrowLeft, Download, Sparkles, User, GraduationCap, Briefcase, Code, Award, Globe } from 'lucide-react';
import { useResume } from '@/store/resume-context';

export function ResumeBuilder() {
  const { resume, updateResume } = useResume();
  const [initialized, setInitialized] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.5, staggerChildren: 0.07 } 
    }
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
  };

  const [currentStep, setCurrentStep] = useState(1);
  const [template, setTemplate] = useState<'modern' | 'classic' | 'minimal'>('modern');

  // Form State — initialized from context (empty for new users, saved data for returning)
  const [personal, setPersonal] = useState(resume.personal);
  const [education, setEducation] = useState(resume.education.length > 0 ? resume.education : [{ institution: '', degree: '', field: '', start: '', end: '', gpa: '' }]);
  const [experience, setExperience] = useState(resume.experience.length > 0 ? resume.experience : [{ company: '', position: '', location: '', start: '', end: '', desc: '' }]);
  const [projects, setProjects] = useState(resume.projects.length > 0 ? resume.projects : [{ title: '', desc: '', tech: '' }]);
  const [skills, setSkills] = useState(resume.skills.length > 0 ? resume.skills : ['']);

  // Only sync to context AFTER the first render (avoid pushing empty data on mount)
  useEffect(() => {
    if (!initialized) {
      setInitialized(true);
      return;
    }
    // Only sync if user has actually entered something
    const hasData = personal.name.trim() || skills.some(s => s.trim()) || projects.some(p => p.title.trim());
    if (!hasData) return;

    const handler = setTimeout(() => {
      updateResume({
        personal,
        education: education.filter(e => e.institution.trim()),
        experience: experience.filter(e => e.company.trim()),
        projects: projects.filter(p => p.title.trim()),
        skills: skills.filter(s => s.trim()),
      });
    }, 500);
    return () => clearTimeout(handler);
  }, [personal, education, experience, projects, skills, initialized]);

  const steps = [
    { id: 1, title: 'Personal Info', icon: User },
    { id: 2, title: 'Education', icon: GraduationCap },
    { id: 3, title: 'Experience', icon: Briefcase },
    { id: 4, title: 'Projects', icon: Code },
    { id: 5, title: 'Skills', icon: Award },
    { id: 6, title: 'Live Preview', icon: FileText },
  ];

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-100 flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-blue-400" /> AI Resume Builder
          </h2>
          <p className="text-sm text-slate-400">Build ATS-compliant professional resumes in minutes.</p>
        </div>
        <div className="flex items-center gap-3">
          <motion.button type="button" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }} className="btn-secondary text-xs flex items-center gap-1.5" onClick={() => { setCurrentStep(6); setTimeout(() => window.print(), 300); }}>
            <Download className="w-4 h-4" /> Download / Print PDF
          </motion.button>
        </div>
      </div>

      {/* Step Indicator */}
      <motion.div variants={fadeInUp} whileHover={{ y: -4, scale: 1.02, boxShadow: '0 0 30px rgba(99,102,241,0.15)' }} className="glass-card p-4 flex items-center justify-between overflow-x-auto">
        {steps.map((step) => {
          const Icon = step.icon;
          const isActive = currentStep === step.id;
          const isDone = currentStep > step.id;
          return (
            <motion.button type="button" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}
              key={step.id}
              onClick={() => setCurrentStep(step.id)}
              className={`flex items-center gap-2.5 px-4 py-2 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
                isActive ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30' : isDone ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'text-slate-400 hover:bg-white/5'
              }`}
            >
              {isDone ? <CheckCircle2 className="w-4 h-4" /> : <Icon className="w-4 h-4" />}
              <span>{step.id}. {step.title}</span>
            </motion.button>
          );
        })}
      </motion.div>

      {/* Form Content / Preview */}
      <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className={currentStep === 6 ? "lg:col-span-5" : "lg:col-span-12"}>
          <motion.div variants={fadeInUp} whileHover={{ y: -4, scale: 1.02, boxShadow: '0 0 30px rgba(99,102,241,0.15)' }} className="glass-card p-6 space-y-6">
            {currentStep === 1 && (
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-slate-100 border-b border-white/10 pb-2">Personal & Contact Details</h3>
                <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-slate-400">Full Name</label>
                    <input value={personal.name} onChange={e => setPersonal({ ...personal, name: e.target.value })} className="input-field mt-1" />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-400">Email Address</label>
                    <input value={personal.email} onChange={e => setPersonal({ ...personal, email: e.target.value })} className="input-field mt-1" />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-400">Phone Number</label>
                    <input value={personal.phone} onChange={e => setPersonal({ ...personal, phone: e.target.value })} className="input-field mt-1" />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-400">Location</label>
                    <input value={personal.location} onChange={e => setPersonal({ ...personal, location: e.target.value })} className="input-field mt-1" />
                  </div>
                </motion.div>
                <div>
                  <label className="text-xs font-semibold text-slate-400">Professional Summary</label>
                  <textarea rows={3} value={personal.summary} onChange={e => setPersonal({ ...personal, summary: e.target.value })} className="input-field mt-1" />
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-white/10 pb-2">
                  <h3 className="text-lg font-bold text-slate-100">Education History</h3>
                  <motion.button type="button" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }} onClick={() => setEducation([...education, { institution: '', degree: '', field: '', start: '', end: '', gpa: '' }])} className="btn-secondary text-xs flex items-center gap-1">
                    <Plus className="w-3.5 h-3.5" /> Add Institution
                  </motion.button>
                </div>
                {education.map((edu, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-slate-900/60 border border-white/10 space-y-3">
                    <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <input placeholder="University / College" value={edu.institution} onChange={e => { const copy = [...education]; copy[idx].institution = e.target.value; setEducation(copy); }} className="input-field" />
                      <input placeholder="Degree (e.g. B.Tech)" value={edu.degree} onChange={e => { const copy = [...education]; copy[idx].degree = e.target.value; setEducation(copy); }} className="input-field" />
                      <input placeholder="Field of Study" value={edu.field} onChange={e => { const copy = [...education]; copy[idx].field = e.target.value; setEducation(copy); }} className="input-field" />
                      <input placeholder="CGPA / GPA" value={edu.gpa} onChange={e => { const copy = [...education]; copy[idx].gpa = e.target.value; setEducation(copy); }} className="input-field" />
                    </motion.div>
                  </div>
                ))}
              </div>
            )}

            {currentStep === 3 && (
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-white/10 pb-2">
                  <h3 className="text-lg font-bold text-slate-100">Work Experience</h3>
                  <motion.button type="button" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }} onClick={() => setExperience([...experience, { company: '', position: '', location: '', start: '', end: '', desc: '' }])} className="btn-secondary text-xs flex items-center gap-1">
                    <Plus className="w-3.5 h-3.5" /> Add Work
                  </motion.button>
                </div>
                {experience.map((exp, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-slate-900/60 border border-white/10 space-y-3">
                    <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <input placeholder="Company Name" value={exp.company} onChange={e => { const copy = [...experience]; copy[idx].company = e.target.value; setExperience(copy); }} className="input-field" />
                      <input placeholder="Job Position" value={exp.position} onChange={e => { const copy = [...experience]; copy[idx].position = e.target.value; setExperience(copy); }} className="input-field" />
                    </motion.div>
                    <textarea rows={2} placeholder="Description & achievements..." value={exp.desc} onChange={e => { const copy = [...experience]; copy[idx].desc = e.target.value; setExperience(copy); }} className="input-field" />
                  </div>
                ))}
              </div>
            )}

            {currentStep === 4 && (
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-white/10 pb-2">
                  <h3 className="text-lg font-bold text-slate-100">Key Projects</h3>
                  <motion.button type="button" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }} onClick={() => setProjects([...projects, { title: '', desc: '', tech: '' }])} className="btn-secondary text-xs flex items-center gap-1">
                    <Plus className="w-3.5 h-3.5" /> Add Project
                  </motion.button>
                </div>
                {projects.map((proj, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-slate-900/60 border border-white/10 space-y-3">
                    <input placeholder="Project Title" value={proj.title} onChange={e => { const copy = [...projects]; copy[idx].title = e.target.value; setProjects(copy); }} className="input-field" />
                    <textarea rows={2} placeholder="Project Description..." value={proj.desc} onChange={e => { const copy = [...projects]; copy[idx].desc = e.target.value; setProjects(copy); }} className="input-field" />
                    <input placeholder="Technologies used (comma separated)" value={proj.tech} onChange={e => { const copy = [...projects]; copy[idx].tech = e.target.value; setProjects(copy); }} className="input-field" />
                  </div>
                ))}
              </div>
            )}

            {currentStep === 5 && (
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-slate-100 border-b border-white/10 pb-2">Skills & Expertise</h3>
                <div className="flex flex-wrap gap-2 mb-4">
                  {skills.map((skill, i) => (
                    <span key={i} className="px-3 py-1.5 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-medium flex items-center gap-2">
                      {skill}
                      <motion.button type="button" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }} onClick={() => setSkills(skills.filter((_, idx) => idx !== i))} className="hover:text-red-400">×</motion.button>
                    </span>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input id="skillInput" placeholder="Add new skill (e.g. Next.js)" className="input-field" onKeyDown={e => {
                    if (e.key === 'Enter' && e.currentTarget.value) {
                      setSkills([...skills, e.currentTarget.value]);
                      e.currentTarget.value = '';
                    }
                  }} />
                </div>
              </div>
            )}

            {currentStep === 6 && (
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-slate-100 border-b border-white/10 pb-2">Choose Template</h3>
                <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid grid-cols-3 gap-3">
                  {(['modern', 'classic', 'minimal'] as const).map(t => (
                    <motion.button type="button" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }} key={t} onClick={() => setTemplate(t)} className={`p-3 rounded-xl border text-xs font-semibold capitalize transition-all ${template === t ? 'border-blue-500 bg-blue-500/10 text-blue-400' : 'border-white/10 text-slate-400'}`}>
                      {t}
                    </motion.button>
                  ))}
                </motion.div>
              </div>
            )}

            {/* Step Navigation Buttons */}
            <div className="flex items-center justify-between pt-4 border-t border-white/10">
              <motion.button type="button" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }} disabled={currentStep === 1} onClick={() => setCurrentStep(prev => prev - 1)} className="btn-secondary text-xs flex items-center gap-1 disabled:opacity-40">
                <ArrowLeft className="w-4 h-4" /> Back
              </motion.button>
              <motion.button type="button" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }} onClick={() => setCurrentStep(prev => Math.min(6, prev + 1))} className="btn-primary text-xs flex items-center gap-1">
                {currentStep === 6 ? 'Finalize & Preview' : 'Next Step'} <ArrowRight className="w-4 h-4" />
              </motion.button>
            </div>
          </motion.div>
        </div>

        {/* Live Resume Sheet Preview */}
        {(currentStep === 6 || window.innerWidth >= 1024) && (
          <div className={currentStep === 6 ? "lg:col-span-7" : "hidden lg:block lg:col-span-6"}>
            <div className="bg-white text-slate-900 p-8 rounded-xl shadow-2xl min-h-[600px] border border-slate-200 text-sm font-sans space-y-6">
              <div className="border-b-2 border-slate-900 pb-4">
                <h1 className="text-3xl font-bold uppercase tracking-tight text-slate-900">{personal.name || 'Your Name'}</h1>
                <div className="flex flex-wrap gap-4 text-xs font-medium text-slate-600 mt-2">
                  <span>{personal.email}</span> • <span>{personal.phone}</span> • <span>{personal.location}</span>
                </div>
              </div>

              {personal.summary && (
                <div>
                  <h2 className="text-xs font-bold uppercase tracking-wider text-blue-600 border-b border-slate-200 pb-1 mb-2">Professional Summary</h2>
                  <p className="text-xs text-slate-700 leading-relaxed">{personal.summary}</p>
                </div>
              )}

              {education.length > 0 && (
                <div>
                  <h2 className="text-xs font-bold uppercase tracking-wider text-blue-600 border-b border-slate-200 pb-1 mb-2">Education</h2>
                  {education.map((edu, i) => (
                    <div key={i} className="mb-2">
                      <div className="flex justify-between font-bold text-xs text-slate-900">
                        <span>{edu.institution} — {edu.degree} in {edu.field}</span>
                        <span>{edu.start} - {edu.end}</span>
                      </div>
                      <div className="text-xs text-slate-600">GPA: {edu.gpa}</div>
                    </div>
                  ))}
                </div>
              )}

              {experience.length > 0 && (
                <div>
                  <h2 className="text-xs font-bold uppercase tracking-wider text-blue-600 border-b border-slate-200 pb-1 mb-2">Experience</h2>
                  {experience.map((exp, i) => (
                    <div key={i} className="mb-3">
                      <div className="flex justify-between font-bold text-xs text-slate-900">
                        <span>{exp.position} @ {exp.company}</span>
                        <span>{exp.start} - {exp.end}</span>
                      </div>
                      <p className="text-xs text-slate-700 mt-1">{exp.desc}</p>
                    </div>
                  ))}
                </div>
              )}

              {projects.length > 0 && (
                <div>
                  <h2 className="text-xs font-bold uppercase tracking-wider text-blue-600 border-b border-slate-200 pb-1 mb-2">Projects</h2>
                  {projects.map((proj, i) => (
                    <div key={i} className="mb-2">
                      <div className="font-bold text-xs text-slate-900">{proj.title}</div>
                      <p className="text-xs text-slate-700">{proj.desc}</p>
                      <div className="text-[11px] text-blue-600 font-medium">Stack: {proj.tech}</div>
                    </div>
                  ))}
                </div>
              )}

              {skills.length > 0 && (
                <div>
                  <h2 className="text-xs font-bold uppercase tracking-wider text-blue-600 border-b border-slate-200 pb-1 mb-2">Technical Skills</h2>
                  <div className="flex flex-wrap gap-1.5">
                    {skills.map((s, i) => (
                      <span key={i} className="px-2 py-0.5 bg-slate-100 text-slate-800 rounded text-[11px] font-medium border border-slate-200">{s}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}


