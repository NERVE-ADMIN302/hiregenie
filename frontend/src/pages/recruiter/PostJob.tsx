import React, { useState } from 'react';
import { Briefcase, Sparkles, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export function PostJob() {
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    title: 'Senior React Developer',
    company: 'Google India',
    location: 'Bengaluru, India',
    salary: '$45,000 - $60,000/yr',
    type: 'Full-Time',
    desc: 'We are looking for an experienced React developer proficient in TypeScript and state management.',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => navigate('/recruiter/dashboard'), 1500);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-100 flex items-center gap-2">
            <Briefcase className="w-6 h-6 text-violet-400" /> Post a New Job Opportunity
          </h2>
          <p className="text-sm text-slate-400">Publish job postings to auto-match with qualified student ATS profiles.</p>
        </div>
      </div>

      {submitted ? (
        <motion.div 
          whileHover={{ y: -4, scale: 1.02, boxShadow: '0 0 30px rgba(99,102,241,0.15)' }}
          className="glass-card p-12 text-center space-y-4"
        >
          <CheckCircle2 className="w-16 h-16 text-emerald-400 mx-auto animate-bounce" />
          <h3 className="text-2xl font-bold text-slate-100">Job Posted Successfully!</h3>
          <p className="text-sm text-slate-400">Redirecting to your Recruiter Dashboard...</p>
        </motion.div>
      ) : (
        <motion.form 
          whileHover={{ y: -4, scale: 1.02, boxShadow: '0 0 30px rgba(99,102,241,0.15)' }}
          onSubmit={handleSubmit} 
          className="glass-card p-8 space-y-4 max-w-3xl"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-slate-400">Job Title</label>
              <input value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} required className="input-field mt-1" />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-400">Company Name</label>
              <input value={formData.company} onChange={e => setFormData({ ...formData, company: e.target.value })} required className="input-field mt-1" />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-400">Location</label>
              <input value={formData.location} onChange={e => setFormData({ ...formData, location: e.target.value })} required className="input-field mt-1" />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-400">Salary Range</label>
              <input value={formData.salary} onChange={e => setFormData({ ...formData, salary: e.target.value })} required className="input-field mt-1" />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-400">Job Description</label>
            <textarea rows={4} value={formData.desc} onChange={e => setFormData({ ...formData, desc: e.target.value })} required className="input-field mt-1" />
          </div>

          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            type="submit" 
            className="btn-primary py-3 px-8 text-xs flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4" /> Publish Job Listing
          </motion.button>
        </motion.form>
      )}
    </motion.div>
  );
}
