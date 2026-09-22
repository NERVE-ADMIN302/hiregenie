import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Send, Bot, User, Sparkles, RefreshCcw, AlertTriangle, FileText, Upload } from 'lucide-react';
import { useResume } from '@/store/resume-context';

export function CareerMentor() {
  const { resume, hasResume, loadDemoData } = useResume();
  const userName = resume?.personal?.name?.split(' ')[0] || 'User';

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

  const [messages, setMessages] = useState([
    { sender: 'ai', text: `Hello ${userName}! I am your HireGenie AI Career Mentor. I have analyzed your resume and skills. How can I help you accelerate your job preparation today?` },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = input;
    setMessages(prev => [...prev, { sender: 'user', text: userMsg }]);
    setInput('');
    setLoading(true);

    setTimeout(() => {
      const topSkills = resume?.skills?.slice(0, 2).join(' & ') || 'your core technologies';
      
      setMessages(prev => [
        ...prev,
        { sender: 'ai', text: `Based on your profile and skills in ${topSkills}, to prepare for ${userMsg}, I recommend focusing 60% of your prep on System Design & Data Structures, and 40% on live coding projects.` }
      ]);
      setLoading(false);
    }, 1000);
  };

  if (!hasResume) {
    return (
      <div className="glass-card flex flex-col items-center justify-center p-12 space-y-5 text-center max-w-xl mx-auto my-12 border border-white/10">
        <div className="w-14 h-14 rounded-2xl bg-amber-500/10 flex items-center justify-center border border-amber-500/20">
          <Bot className="w-8 h-8 text-amber-400" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-slate-100">Activate Your AI Career Mentor</h2>
          <p className="text-xs text-slate-400 mt-2 leading-relaxed">
            The mentor provides customized interview preparation, role suggestions, and keyword advice based on your resume profile.
          </p>
        </div>
        <div className="flex flex-wrap gap-3 justify-center pt-2">
          <button
            type="button"
            onClick={() => loadDemoData()}
            className="btn-primary text-xs py-2.5 px-5 flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4" /> Load Demo Profile
          </button>
          <Link
            to="/student/resume-builder"
            className="btn-secondary text-xs py-2.5 px-5 flex items-center gap-2"
          >
            <FileText className="w-4 h-4" /> Build Resume
          </Link>
          <Link
            to="/student/resume-upload"
            className="btn-secondary text-xs py-2.5 px-5 flex items-center gap-2"
          >
            <Upload className="w-4 h-4" /> Upload PDF
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-100 flex items-center gap-2">
            <Bot className="w-6 h-6 text-blue-400" /> AI Career Mentor Chat
          </h2>
          <p className="text-sm text-slate-400">Ask anything about resume tweaks, interview questions, or career strategy.</p>
        </div>
      </div>

      <motion.div variants={fadeInUp} whileHover={{ y: -4, scale: 1.02, boxShadow: '0 0 30px rgba(99,102,241,0.15)' }} className="glass-card flex-1 p-6 flex flex-col justify-between overflow-hidden">
        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto space-y-4 pr-2">
          {messages.map((msg, i) => (
            <div key={i} className={`flex items-start gap-3 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${msg.sender === 'user' ? 'bg-blue-600 text-white' : 'bg-gradient-to-tr from-blue-600 to-violet-600 text-white'}`}>
                {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>
              <div className={`p-4 rounded-2xl max-w-xl text-sm leading-relaxed ${msg.sender === 'user' ? 'bg-blue-600 text-white rounded-tr-none' : 'bg-slate-900/80 border border-white/10 text-slate-200 rounded-tl-none'}`}>
                {msg.text}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex items-center gap-3">
               <div className="w-8 h-8 rounded-full bg-violet-600 text-white flex items-center justify-center">
                 <Bot className="w-4 h-4 animate-pulse" />
               </div>
               <div className="p-4 rounded-2xl bg-slate-900/80 border border-white/10 text-slate-400 text-xs flex items-center gap-2">
                 <Sparkles className="w-3.5 h-3.5 animate-spin text-blue-400" /> Mentor is thinking...
               </div>
            </div>
          )}
        </div>

        {/* Prompt Suggestions */}
        <div className="flex items-center gap-2 my-3 overflow-x-auto pb-1">
          {['Review my resume keywords', 'How to answer "Tell me about yourself"?', 'What projects to add for SDE-1?'].map((prompt, i) => (
            <motion.button type="button" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }} key={i} onClick={() => setInput(prompt)} className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-slate-300 text-xs font-medium hover:border-blue-500/40 whitespace-nowrap transition-all">
              💡 {prompt}
            </motion.button>
          ))}
        </div>

        {/* Input Bar */}
        <form onSubmit={handleSend} className="flex gap-2 pt-2 border-t border-white/10">
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Type your career question here..."
            className="input-field"
          />
          <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }} type="submit" className="btn-primary px-6 flex items-center gap-2">
            <Send className="w-4 h-4" /> Send
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}

