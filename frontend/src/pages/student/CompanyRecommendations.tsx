import React from 'react';
import { Building2, Sparkles, MapPin, Users, ArrowRight } from 'lucide-react';
import { ScoreRing } from '@/components/shared/ScoreRing';
import { motion } from 'framer-motion';

export function CompanyRecommendations() {
  const companies = [
    { name: 'Google India', probability: 94, industry: 'Cloud & Search Tech', size: '10,000+ employees', location: 'Bengaluru / Hyderabad' },
    { name: 'Microsoft', probability: 91, industry: 'Enterprise Software', size: '10,000+ employees', location: 'Hyderabad, India' },
    { name: 'Zomato Tech', probability: 88, industry: 'Consumer Tech', size: '5,000+ employees', location: 'Gurugram, India' },
    { name: 'Amazon Web Services', probability: 84, industry: 'Cloud Infrastructure', size: '10,000+ employees', location: 'Bengaluru, India' },
  ];

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

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      <motion.div variants={fadeInUp}>
        <h2 className="text-2xl font-bold text-slate-100 flex items-center gap-2">
          <Building2 className="w-6 h-6 text-blue-400" /> Target Company Probability Match
        </h2>
        <p className="text-sm text-slate-400">Companies ranked by selection probability based on your skill profile.</p>
      </motion.div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {companies.map((comp, i) => (
          <motion.div 
            key={i} 
            variants={fadeInUp}
            whileHover={{ y: -4, scale: 1.02, boxShadow: '0 0 30px rgba(99,102,241,0.15)' }}
            className="glass-card p-6 flex items-center justify-between hover:border-blue-500/40 transition-all"
          >
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-xl bg-blue-600/20 text-blue-400 font-bold flex items-center justify-center text-base">
                {comp.name[0]}
              </div>
              <h3 className="font-bold text-slate-100 text-base">{comp.name}</h3>
              <p className="text-xs text-slate-400">{comp.industry} • {comp.size}</p>
              <div className="text-xs text-slate-500 flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> {comp.location}</div>
            </div>

            <div className="flex flex-col items-center">
              <ScoreRing score={comp.probability} size={90} strokeWidth={8} />
              <span className="text-[11px] font-semibold text-emerald-400 mt-2">Selection Prob</span>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}

