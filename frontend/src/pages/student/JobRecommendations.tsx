import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Briefcase, MapPin, DollarSign, Sparkles, Heart, CheckCircle2, Search, Filter } from 'lucide-react';

export function JobRecommendations() {

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

  const [search, setSearch] = useState('');
  const [bookmarked, setBookmarked] = useState<number[]>([]);
  const [applied, setApplied] = useState<number[]>([]);

  const jobs = [
    { id: 1, title: 'Full Stack Engineer Intern', company: 'Google India', location: 'Bengaluru / Remote', salary: '$40,000 - $55,000/yr', match: 96, type: 'Full-Time' },
    { id: 2, title: 'Frontend React Developer', company: 'Microsoft', location: 'Hyderabad, India', salary: '$35,000 - $48,000/yr', match: 91, type: 'Full-Time' },
    { id: 3, title: 'Python FastAPI Backend Dev', company: 'Zomato Tech', location: 'Gurugram / Remote', salary: '$25,000 - $35,000/yr', match: 88, type: 'Full-Time' },
    { id: 4, title: 'AI Software Engineer', company: 'Amazon Web Services', location: 'Bengaluru, India', salary: '$50,000 - $70,000/yr', match: 84, type: 'Internship' },
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
            <Briefcase className="w-6 h-6 text-blue-400" /> AI Job Recommendations
          </h2>
          <p className="text-sm text-slate-400">Jobs matched specifically to your verified skills and resume ATS profile.</p>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <motion.div variants={fadeInUp} whileHover={{ y: -4, scale: 1.02, boxShadow: '0 0 30px rgba(99,102,241,0.15)' }} className="glass-card p-4 flex flex-col md:flex-row items-center gap-4">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search job title, skills, or company..."
            className="input-field pl-10"
          />
        </div>
        <select className="input-field md:w-48">
          <option>All Job Types</option>
          <option>Full-Time</option>
          <option>Internship</option>
        </select>
      </motion.div>

      {/* Job Cards Grid */}
      <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {jobs.filter(j => j.title.toLowerCase().includes(search.toLowerCase()) || j.company.toLowerCase().includes(search.toLowerCase())).map(job => {
          const isApplied = applied.includes(job.id);
          const isBookmarked = bookmarked.includes(job.id);

          return (
            <motion.div variants={fadeInUp} whileHover={{ y: -4, scale: 1.02, boxShadow: '0 0 30px rgba(99,102,241,0.15)' }} key={job.id} className="glass-card p-6 flex flex-col justify-between space-y-4 hover:border-blue-500/40 transition-all">
              <div>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-blue-600 to-violet-600 font-bold text-lg flex items-center justify-center text-white">
                      {job.company[0]}
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-100 text-base">{job.title}</h3>
                      <p className="text-xs text-slate-400">{job.company}</p>
                    </div>
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-500/20 text-blue-400 border border-blue-500/30 flex items-center gap-1">
                    <Sparkles className="w-3 h-3" /> {job.match}% Match
                  </span>
                </div>

                <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-slate-400">
                  <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-slate-500" /> {job.location}</span>
                  <span className="flex items-center gap-1"><DollarSign className="w-3.5 h-3.5 text-slate-500" /> {job.salary}</span>
                  <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-slate-300">{job.type}</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-white/10">
                <motion.button type="button" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}
                  onClick={() => setBookmarked(prev => isBookmarked ? prev.filter(id => id !== job.id) : [...prev, job.id])}
                  className={`p-2.5 rounded-lg border transition-all ${isBookmarked ? 'border-rose-500 text-rose-400 bg-rose-500/10' : 'border-white/10 text-slate-400 hover:border-white/20'}`}
                >
                  <Heart className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
                </motion.button>

                <motion.button type="button" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}
                  disabled={isApplied}
                  onClick={() => setApplied(prev => [...prev, job.id])}
                  className={`btn-primary text-xs py-2.5 px-6 flex items-center gap-1.5 ${isApplied ? 'bg-emerald-600/80 cursor-default' : ''}`}
                >
                  {isApplied ? <><CheckCircle2 className="w-4 h-4" /> Applied</> : 'Apply Now'}
                </motion.button>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </motion.div>
  );
}

