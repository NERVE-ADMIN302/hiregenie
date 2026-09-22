import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Code, Brain, Play, CheckCircle2, Award, Clock, Sparkles } from 'lucide-react';
import { ScoreRing } from '@/components/shared/ScoreRing';

export function MockInterview() {

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

  const [phase, setPhase] = useState<'select' | 'interview' | 'results'>('select');
  const [type, setType] = useState<'technical' | 'hr' | 'behavioral'>('technical');
  const [answer, setAnswer] = useState('');

  const questions = [
    "Explain the difference between Client-Side Rendering (CSR) and Server-Side Rendering (SSR) in React apps.",
    "How do you optimize slow database queries in PostgreSQL?",
    "Describe a challenging technical bug you encountered in a recent project and how you resolved it.",
  ];
  const [qIndex, setQIndex] = useState(0);

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
            <Users className="w-6 h-6 text-emerald-400" /> AI Mock Interview Simulator
          </h2>
          <p className="text-sm text-slate-400">Practice real-time technical and HR interview rounds with instant feedback.</p>
        </div>
      </div>

      {phase === 'select' && (
        <div className="space-y-6">
          <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { id: 'technical', title: 'Technical Round', icon: Code, desc: 'Data structures, system design, coding & frameworks.' },
              { id: 'hr', title: 'HR Round', icon: Users, desc: 'Cultural fit, leadership, salary negotiation, career goals.' },
              { id: 'behavioral', title: 'Behavioral Round', icon: Brain, desc: 'STAR method questions on teamwork and problem solving.' },
            ].map(item => (
              <div
                key={item.id}
                onClick={() => setType(item.id as any)}
                className={`glass-card p-6 cursor-pointer border-2 transition-all ${type === item.id ? 'border-emerald-500 bg-emerald-500/10' : 'border-white/10 hover:border-white/20'}`}
              >
                <item.icon className="w-8 h-8 text-emerald-400 mb-4" />
                <h3 className="text-lg font-bold text-slate-100 mb-2">{item.title}</h3>
                <p className="text-xs text-slate-400">{item.desc}</p>
              </div>
            ))}
          </motion.div>

          <motion.div variants={fadeInUp} whileHover={{ y: -4, scale: 1.02, boxShadow: '0 0 30px rgba(99,102,241,0.15)' }} className="glass-card p-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h4 className="font-bold text-slate-200 text-sm">Ready to Start Your Simulated Interview?</h4>
              <p className="text-xs text-slate-400">You will be asked 3 questions. Your answers will be evaluated by Gemini AI.</p>
            </div>
            <motion.button type="button" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }} onClick={() => setPhase('interview')} className="btn-primary py-3 px-8 text-sm flex items-center gap-2 shadow-lg shadow-emerald-500/25">
              <Play className="w-4 h-4 fill-current" /> Start Interview Session
            </motion.button>
          </motion.div>
        </div>
      )}

      {phase === 'interview' && (
        <motion.div variants={fadeInUp} whileHover={{ y: -4, scale: 1.02, boxShadow: '0 0 30px rgba(99,102,241,0.15)' }} className="glass-card p-8 space-y-6">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              Question {qIndex + 1} of {questions.length}
            </span>
            <span className="flex items-center gap-1.5 text-xs text-amber-400 font-mono">
              <Clock className="w-4 h-4" /> Time Limit: 3:00
            </span>
          </div>

          <div>
            <h3 className="text-xl font-bold text-slate-100 mb-2">{questions[qIndex]}</h3>
            <p className="text-xs text-slate-400">Provide a structured, clear response covering key concepts and examples.</p>
          </div>

          <textarea
            rows={6}
            value={answer}
            onChange={e => setAnswer(e.target.value)}
            placeholder="Type your response here..."
            className="input-field"
          />

          <div className="flex items-center justify-between pt-4">
            <motion.button type="button" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }} onClick={() => setPhase('select')} className="btn-secondary text-xs">Cancel Session</motion.button>
            <motion.button type="button" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}
              onClick={() => {
                if (qIndex < questions.length - 1) {
                  setQIndex(qIndex + 1);
                  setAnswer('');
                } else {
                  setPhase('results');
                }
              }}
              className="btn-primary text-xs px-6 py-3 flex items-center gap-2"
            >
              {qIndex < questions.length - 1 ? 'Next Question' : 'Submit for Evaluation'}
            </motion.button>
          </div>
        </motion.div>
      )}

      {phase === 'results' && (
        <motion.div variants={fadeInUp} whileHover={{ y: -4, scale: 1.02, boxShadow: '0 0 30px rgba(99,102,241,0.15)' }} className="glass-card p-8 space-y-6 text-center">
          <h3 className="text-2xl font-bold text-slate-100">Interview Performance Evaluation</h3>
          <p className="text-xs text-slate-400">Evaluated by Gemini AI based on technical clarity and communication.</p>

          <div className="flex justify-center py-4">
            <ScoreRing score={88} size={180} strokeWidth={14} />
          </div>

          <div className="p-4 rounded-xl bg-slate-900/60 border border-white/10 text-left max-w-xl mx-auto space-y-2">
            <h4 className="font-bold text-sm text-emerald-400 flex items-center gap-2">
              <Sparkles className="w-4 h-4" /> Gemini AI Feedback Summary:
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              "Great technical depth regarding CSR vs SSR tradeoffs. Clear explanation of virtual DOM reconciliation. Suggest adding code example syntax in future answers."
            </p>
          </div>

          <motion.button type="button" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }} onClick={() => { setPhase('select'); setQIndex(0); setAnswer(''); }} className="btn-primary text-xs px-8 py-3">
            Start Another Mock Interview
          </motion.button>
        </motion.div>
      )}
    </motion.div>
  );
}

