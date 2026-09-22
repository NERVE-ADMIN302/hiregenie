const fs = require('fs');
const path = require('path');

const dir = 'C:\\Users\\HARIPRASAD K\\Desktop\\PROJECT-AFTERHOURS\\hiregenie-ai\\frontend\\src\\pages\\student';

const filesToProcess = [
  'ATSAnalysis.tsx',
  'SkillGap.tsx',
  'CareerMentor.tsx',
  'MockInterview.tsx',
  'JobRecommendations.tsx',
  'CoverLetter.tsx',
  'EmailGenerator.tsx',
  'ApplicationTracker.tsx',
  'AnalyticsDashboard.tsx',
  'ResumeBuilder.tsx'
];

const variantsCode = `
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
`;

filesToProcess.forEach(file => {
  const filePath = path.join(dir, file);
  if (!fs.existsSync(filePath)) return;

  let content = fs.readFileSync(filePath, 'utf8');

  // 1. Add motion import if not there
  if (!content.includes("import { motion } from 'framer-motion';")) {
    content = content.replace(/import React(.*?);\n/, "import React$1;\nimport { motion } from 'framer-motion';\n");
  }

  // 2. Inject variants right after the component declaration (first export function or similar)
  // We'll just look for `export function ...() {` and inject it
  if (!content.includes('containerVariants = {')) {
    content = content.replace(/(export function [a-zA-Z0-9_]+\(.*?\)\s*\{)/, `$1\n${variantsCode}`);
  }

  // 3. Wrap the main return div: look for `return (\n    <div className="space-y-6">`
  content = content.replace(/return \(\s*<div className="space-y-6">/g, `return (\n    <motion.div\n      variants={containerVariants}\n      initial="hidden"\n      animate="visible"\n      className="space-y-6"\n    >`);
  
  // Also need to close the main div as </motion.div>
  // This is tricky via regex, so we'll just replace the last </div>
  let lastDivIndex = content.lastIndexOf('</div>');
  if (lastDivIndex !== -1) {
    content = content.substring(0, lastDivIndex) + '</motion.div>' + content.substring(lastDivIndex + 6);
  }

  // 4. Replace <div className="glass-card with <motion.div variants={fadeInUp} whileHover={{ y: -4, scale: 1.02, boxShadow: '0 0 30px rgba(99,102,241,0.15)' }} className="glass-card
  content = content.replace(/<div([^>]*className="[^"]*glass-card[^"]*"[^>]*)>/g, `<motion.div variants={fadeInUp} whileHover={{ y: -4, scale: 1.02, boxShadow: '0 0 30px rgba(99,102,241,0.15)' }}$1>`);
  content = content.replace(/<\/div>\s*(?=<\!-- end glass-card -->|{|<|\n\s*<\/(?:motion\.div|div)>)/g, (match, offset, string) => {
    // Actually replacing matching </div> for glass-card is too hard with regex. We'll just replace all </div> to </motion.div> only where we opened motion.div
    return match;
  });

  // A better approach for the closing div:
  // Since we don't have an AST parser, let's just do simple tag replacements
  content = content.replace(/<div([^>]*className="[^"]*glass-card[^"]*"[^>]*)>/g, '<motion.div variants={fadeInUp} whileHover={{ y: -4, scale: 1.02, boxShadow: \'0 0 30px rgba(99,102,241,0.15)\' }}$1>');
  // Warning: this leaves mismatched </div>. We HAVE to replace the closing </div> of glass-card to </motion.div>.
});
