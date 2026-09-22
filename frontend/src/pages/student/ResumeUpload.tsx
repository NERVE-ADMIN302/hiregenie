import React, { useState } from 'react';
import { Upload, FileText, CheckCircle2, Sparkles, AlertTriangle, RefreshCw } from 'lucide-react';
import { motion } from 'framer-motion';
import { useResume } from '@/store/resume-context';
import { extractTextFromPDF, parseResumeText } from '@/lib/pdf-parser';

export function ResumeUpload() {
  const { resume, setFullResume } = useResume();
  const [file, setFile] = useState<File | null>(null);
  const [parsed, setParsed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [rawText, setRawText] = useState('');
  const [error, setError] = useState('');

  const handleParse = async () => {
    if (!file) return;
    setLoading(true);
    setError('');

    try {
      // Actually extract text from the PDF
      const text = await extractTextFromPDF(file);
      setRawText(text);

      if (!text.trim()) {
        setError('Could not extract text from this PDF. It may be image-based (scanned). Try a text-based PDF.');
        setLoading(false);
        return;
      }

      // Parse the extracted text into structured resume data
      const parsed = parseResumeText(text);

      setFullResume({
        personal: {
          name: parsed.personal.name || file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' '),
          email: parsed.personal.email || '',
          phone: parsed.personal.phone || '',
          location: parsed.personal.location || '',
          summary: parsed.personal.summary || '',
        },
        education: parsed.education.length > 0 ? parsed.education : [],
        experience: parsed.experience.length > 0 ? parsed.experience : [],
        projects: parsed.projects.length > 0 ? parsed.projects : [],
        skills: parsed.skills,
        uploadedFileName: file.name,
        lastUpdated: new Date().toISOString(),
      });

      setParsed(true);
    } catch (err: any) {
      console.error('PDF parsing error:', err);
      setError(`Error reading PDF: ${err.message || 'Unknown error'}. Make sure it is a valid PDF file.`);
    } finally {
      setLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, staggerChildren: 0.07 } }
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
  };

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-6">
      <motion.div variants={fadeInUp}>
        <h2 className="text-2xl font-bold text-slate-100 flex items-center gap-2">
          <Upload className="w-6 h-6 text-blue-400" /> Resume Upload & AI Parsing
        </h2>
        <p className="text-sm text-slate-400">Upload your PDF resume — we'll extract the actual text and detect your skills, education, and experience.</p>
      </motion.div>

      {/* Drop Zone */}
      <motion.div
        variants={fadeInUp}
        whileHover={{ y: -4, scale: 1.01 }}
        className="glass-card p-12 text-center border-2 border-dashed border-white/20 hover:border-blue-500/50 transition-all cursor-pointer"
      >
        <Upload className="w-16 h-16 text-blue-400 mx-auto mb-4 animate-bounce" />
        <h3 className="text-lg font-bold text-slate-100">Drag & Drop Your Resume File Here</h3>
        <p className="text-xs text-slate-400 mt-1 mb-4">Supports PDF files, Canva exports, and PNG/JPG images (with OCR text recognition)</p>
        <input type="file" accept=".pdf,.png,.jpg,.jpeg,.webp" onChange={e => { e.target.files && setFile(e.target.files[0]); setParsed(false); setError(''); }} className="hidden" id="fileUp" />
        <motion.label whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }} htmlFor="fileUp" className="btn-secondary text-xs px-6 py-2.5 inline-block cursor-pointer">
          Browse File (PDF / Image)
        </motion.label>
        {file && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-4 text-xs text-emerald-400 font-semibold">📄 Selected: {file.name} ({(file.size / 1024).toFixed(1)} KB)</motion.div>}
      </motion.div>

      {/* Error Display */}
      {error && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass-card p-4 border-amber-500/20 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-bold text-amber-400">Parsing Issue</p>
            <p className="text-xs text-slate-400 mt-1">{error}</p>
          </div>
        </motion.div>
      )}

      {/* Parse Button */}
      {file && !parsed && (
        <motion.div variants={fadeInUp} className="text-center">
          <motion.button type="button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            onClick={handleParse}
            disabled={loading}
            className="btn-primary py-3 px-8 text-xs inline-flex items-center gap-2"
          >
            <Sparkles className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            {loading ? 'Reading PDF & Extracting Data...' : 'Parse Resume PDF'}
          </motion.button>
        </motion.div>
      )}

      {/* Parsed Results */}
      {parsed && (
        <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="space-y-4">
          <div className="glass-card p-6 space-y-4">
            <h3 className="font-bold text-emerald-400 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5" /> Resume Parsed Successfully
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              {/* Name */}
              <motion.div variants={fadeInUp} whileHover={{ y: -2 }} className="p-3 bg-slate-900/60 rounded-lg border border-white/10">
                <span className="text-slate-400 font-semibold">Name:</span>
                <div className="font-bold text-slate-200 mt-1">{resume.personal.name || <span className="text-amber-400">Not detected</span>}</div>
              </motion.div>

              {/* Email */}
              <motion.div variants={fadeInUp} whileHover={{ y: -2 }} className="p-3 bg-slate-900/60 rounded-lg border border-white/10">
                <span className="text-slate-400 font-semibold">Email:</span>
                <div className="font-bold text-slate-200 mt-1">{resume.personal.email || <span className="text-amber-400">Not detected</span>}</div>
              </motion.div>

              {/* Phone */}
              <motion.div variants={fadeInUp} whileHover={{ y: -2 }} className="p-3 bg-slate-900/60 rounded-lg border border-white/10">
                <span className="text-slate-400 font-semibold">Phone:</span>
                <div className="font-bold text-slate-200 mt-1">{resume.personal.phone || <span className="text-amber-400">Not detected</span>}</div>
              </motion.div>

              {/* Location */}
              <motion.div variants={fadeInUp} whileHover={{ y: -2 }} className="p-3 bg-slate-900/60 rounded-lg border border-white/10">
                <span className="text-slate-400 font-semibold">Location:</span>
                <div className="font-bold text-slate-200 mt-1">{resume.personal.location || <span className="text-amber-400">Not detected</span>}</div>
              </motion.div>
            </div>

            {/* Education */}
            <div>
              <span className="text-slate-400 font-semibold text-xs">Education ({resume.education.length}):</span>
              {resume.education.length > 0 ? (
                <div className="space-y-2 mt-2">
                  {resume.education.map((edu, i) => (
                    <div key={i} className="p-3 bg-slate-900/60 rounded-lg border border-white/10 text-xs">
                      <div className="font-bold text-slate-200">{edu.degree}{edu.field ? ` — ${edu.field}` : ''}</div>
                      <div className="text-slate-400">{edu.institution}{edu.start || edu.end ? ` (${edu.start}–${edu.end})` : ''}{edu.gpa ? ` • GPA: ${edu.gpa}` : ''}</div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-xs text-amber-400 mt-1">No education detected</div>
              )}
            </div>

            {/* Experience */}
            <div>
              <span className="text-slate-400 font-semibold text-xs">Experience ({resume.experience.length}):</span>
              {resume.experience.length > 0 ? (
                <div className="space-y-2 mt-2">
                  {resume.experience.map((exp, i) => (
                    <div key={i} className="p-3 bg-slate-900/60 rounded-lg border border-white/10 text-xs">
                      <div className="font-bold text-slate-200">{exp.position} at {exp.company}</div>
                      <div className="text-slate-400">{exp.start && exp.end ? `${exp.start} – ${exp.end}` : ''}</div>
                      {exp.desc && <div className="text-slate-500 mt-1">{exp.desc.slice(0, 150)}</div>}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-xs text-amber-400 mt-1">No experience detected</div>
              )}
            </div>

            {/* Projects */}
            {resume.projects.length > 0 && (
              <div>
                <span className="text-slate-400 font-semibold text-xs">Projects ({resume.projects.length}):</span>
                <div className="space-y-2 mt-2">
                  {resume.projects.map((proj, i) => (
                    <div key={i} className="p-3 bg-slate-900/60 rounded-lg border border-white/10 text-xs">
                      <div className="font-bold text-slate-200">{proj.title}</div>
                      {proj.desc && <div className="text-slate-500 mt-1">{proj.desc.slice(0, 120)}</div>}
                      {proj.tech && <div className="text-indigo-400 mt-1">Tech: {proj.tech}</div>}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Skills */}
            <div>
              <span className="text-slate-400 font-semibold text-xs">Skills Detected ({resume.skills.length}):</span>
              <div className="flex flex-wrap gap-2 mt-2">
                {resume.skills.length > 0 ? resume.skills.map((skill, i) => (
                  <motion.span
                    key={skill}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.03 }}
                    className="px-3 py-1.5 rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 text-xs font-semibold"
                  >
                    {skill}
                  </motion.span>
                )) : (
                  <span className="text-xs text-amber-400">No skills detected — ensure your resume is text-based (not a scanned image)</span>
                )}
              </div>
            </div>

            {/* Summary */}
            {resume.personal.summary && (
              <div>
                <span className="text-slate-400 font-semibold text-xs">Summary:</span>
                <div className="text-xs text-slate-300 mt-1 p-3 bg-slate-900/60 rounded-lg border border-white/10">{resume.personal.summary}</div>
              </div>
            )}
          </div>

          {/* Raw Text Preview */}
          <details className="glass-card p-4">
            <summary className="text-xs font-bold text-slate-400 cursor-pointer hover:text-slate-300">
              📋 View Raw Extracted Text ({rawText.length} characters)
            </summary>
            <pre className="mt-3 text-xs text-slate-500 whitespace-pre-wrap max-h-64 overflow-auto p-3 bg-slate-900/60 rounded-lg border border-white/5">
              {rawText || 'No text extracted'}
            </pre>
          </details>

          {/* Re-upload */}
          <div className="text-center">
            <motion.button type="button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => { setFile(null); setParsed(false); setRawText(''); setError(''); }}
              className="btn-secondary text-xs py-2.5 px-6 inline-flex items-center gap-2"
            >
              <RefreshCw className="w-4 h-4" /> Upload Different Resume
            </motion.button>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}

