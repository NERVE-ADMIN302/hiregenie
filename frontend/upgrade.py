import os
import re

dir_path = r'C:\Users\HARIPRASAD K\Desktop\PROJECT-AFTERHOURS\hiregenie-ai\frontend\src\pages\student'
files = [
    'ATSAnalysis.tsx', 'SkillGap.tsx', 'CareerMentor.tsx', 'MockInterview.tsx',
    'JobRecommendations.tsx', 'CoverLetter.tsx', 'EmailGenerator.tsx',
    'ApplicationTracker.tsx', 'AnalyticsDashboard.tsx', 'ResumeBuilder.tsx',
    'StudentDashboard.tsx'
]

variants_code = """
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
"""

for f in files:
    fp = os.path.join(dir_path, f)
    if not os.path.exists(fp):
        continue
        
    with open(fp, 'r', encoding='utf-8') as file:
        content = file.read()
        
    if "import { motion } from 'framer-motion';" in content:
        continue # Already processed
        
    # Add import
    content = re.sub(r"(import React.*?;\n)", r"\1import { motion } from 'framer-motion';\n", content, count=1)
    
    # Inject variants
    content = re.sub(r"(export function [a-zA-Z0-9_]+\(.*?\)\s*\{)", r"\1\n" + variants_code, content, count=1)
    
    # Replace outer div
    content = re.sub(r'(return\s*\(\s*)<div className="space-y-6">', r'\1<motion.div\n      variants={containerVariants}\n      initial="hidden"\n      animate="visible"\n      className="space-y-6"\n    >', content, count=1)
    
    # We will just replace all `className="glass-card` divs. Because balancing tags in python without a library is tricky, we'll do a simple trick:
    # We find `<div` and `</div>`, keep track of depth.
    
    tokens = re.split(r'(<div[^>]*>|</div>)', content)
    out = []
    stack = []
    
    for token in tokens:
        if token.startswith('<div'):
            if 'className="glass-card' in token:
                token = token.replace('<div', '<motion.div variants={fadeInUp} whileHover={{ y: -4, scale: 1.02, boxShadow: \'0 0 30px rgba(99,102,241,0.15)\' }}', 1)
                stack.append('motion.div')
            elif 'className="grid' in token:
                token = token.replace('<div', '<motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}', 1)
                stack.append('motion.div')
            else:
                stack.append('div')
            out.append(token)
        elif token == '</div>':
            if stack:
                tag = stack.pop()
                out.append(f'</{tag}>')
            else:
                # Could be the final closing div from the space-y-6 replacement
                out.append('</motion.div>')
        else:
            out.append(token)
            
    content = "".join(out)
    
    # Buttons
    content = re.sub(r'<button([^>]*)>', r'<motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}\1>', content)
    content = content.replace('</button>', '</motion.button>')
    
    # Progress bars / scores (just a basic fadeInUp for anything that looks like a stat)
    # Replaces some specific things if needed.
    
    with open(fp, 'w', encoding='utf-8') as file:
        file.write(content)
        
print("Done")
