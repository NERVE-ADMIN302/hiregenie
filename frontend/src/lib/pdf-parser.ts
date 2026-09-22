import * as pdfjsLib from 'pdfjs-dist';

// Use the bundled worker
pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url
).toString();

/**
 * Extract raw text from a PDF file.
 * Handles text-based PDFs. For image-based/scanned PDFs, falls back to
 * returning whatever sparse text is available.
 */
export async function extractTextFromPDF(file: File): Promise<string> {
  const arrayBuffer = await file.arrayBuffer();
  const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;

  const pages: string[] = [];
  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const textContent = await page.getTextContent();

    // Group text items by their vertical position (y coordinate) to reconstruct lines
    const items = textContent.items as any[];
    const lineMap = new Map<number, { x: number; str: string }[]>();

    for (const item of items) {
      if (!item.str || !item.str.trim()) continue;
      // Round Y to group items on the same visual line (within 3px)
      const y = Math.round(item.transform[5] / 3) * 3;
      if (!lineMap.has(y)) lineMap.set(y, []);
      lineMap.get(y)!.push({ x: item.transform[4], str: item.str });
    }

    // Sort lines top-to-bottom (higher Y = higher on page in PDF coords)
    const sortedYs = [...lineMap.keys()].sort((a, b) => b - a);
    const pageLines: string[] = [];
    for (const y of sortedYs) {
      const lineItems = lineMap.get(y)!.sort((a, b) => a.x - b.x);
      // Join items on the same line, add space between items that are far apart
      let line = '';
      for (let j = 0; j < lineItems.length; j++) {
        if (j > 0 && lineItems[j].x - lineItems[j - 1].x > 10) {
          line += ' ';
        }
        line += lineItems[j].str;
      }
      pageLines.push(line.trim());
    }
    pages.push(pageLines.join('\n'));
  }

  return pages.join('\n\n');
}

// ──────────────────────────────────────────────────────────────────────────────
// SECTION-BASED RESUME PARSER
// ──────────────────────────────────────────────────────────────────────────────

/** Recognized resume section headers */
const SECTION_HEADERS = [
  { key: 'education', patterns: [/^educations?$/i, /^academic/i, /^qualification/i] },
  { key: 'experience', patterns: [/^(?:work\s*)?experiences?$/i, /^employment/i, /^work\s*history/i, /^professional\s*experience/i, /^career\s*history/i] },
  { key: 'skills', patterns: [/^(?:technical\s*)?skills?$/i, /^expertise/i, /^technologies/i, /^competenc/i, /^proficienc/i, /^tools?\s*(?:&|and)\s*technolog/i] },
  { key: 'projects', patterns: [/^projects?$/i, /^portfolio/i, /^personal\s*projects/i, /^academic\s*projects/i] },
  { key: 'certifications', patterns: [/^certifications?$/i, /^licenses?/i, /^courses?$/i, /^training/i] },
  { key: 'achievements', patterns: [/^achievements?$/i, /^awards?$/i, /^honors?$/i, /^accomplishments?$/i] },
  { key: 'summary', patterns: [/^(?:professional\s*)?summary$/i, /^(?:career\s*)?objectives?$/i, /^about\s*me$/i, /^profile$/i] },
  { key: 'interests', patterns: [/^interests?$/i, /^hobbies?$/i, /^activities?$/i] },
  { key: 'languages', patterns: [/^languages?$/i] },
  { key: 'references', patterns: [/^references?$/i] },
  { key: 'contact', patterns: [/^contact\s*(?:info|information|details)?$/i, /^personal\s*(?:info|information|details)?$/i] },
];

function identifySection(line: string): string | null {
  const clean = line.replace(/[:\-–—|•●■□▪▸►▹→]/g, '').trim();
  if (clean.length > 40 || clean.length < 3) return null;
  for (const sec of SECTION_HEADERS) {
    for (const pat of sec.patterns) {
      if (pat.test(clean)) return sec.key;
    }
  }
  return null;
}

/**
 * Split resume text into sections based on detected headers.
 * Returns a map of sectionKey -> array of lines under that section.
 * Lines before any detected header go into 'header' (usually name/contact info).
 */
function splitIntoSections(text: string): Record<string, string[]> {
  const lines = text.split('\n').map(l => l.trim()).filter(l => l.length > 0);
  const sections: Record<string, string[]> = { header: [] };
  let currentSection = 'header';

  for (const line of lines) {
    const sectionKey = identifySection(line);
    if (sectionKey) {
      currentSection = sectionKey;
      if (!sections[currentSection]) sections[currentSection] = [];
    } else {
      if (!sections[currentSection]) sections[currentSection] = [];
      sections[currentSection].push(line);
    }
  }

  return sections;
}

// ──────────────────────────────────────────────────────────────────────────────
// FIELD EXTRACTORS
// ──────────────────────────────────────────────────────────────────────────────

function extractEmail(text: string): string {
  const m = text.match(/[\w.+-]+@[\w-]+\.[\w.]+/);
  return m ? m[0] : '';
}

function extractPhone(text: string): string {
  // Match international and local phone formats
  const patterns = [
    /\+?\d{1,3}[-.\s]?\(?\d{2,4}\)?[-.\s]?\d{3,4}[-.\s]?\d{3,4}/,
    /\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/,
    /\d{5}[-.\s]?\d{5}/,  // Indian 10-digit mobile
    /\d{10}/,
  ];
  for (const pat of patterns) {
    const m = text.match(pat);
    if (m) return m[0];
  }
  return '';
}

function extractName(headerLines: string[], fullText: string): string {
  const email = extractEmail(fullText);
  const phone = extractPhone(fullText);

  // Try header lines first — the name is usually in the first few non-contact lines
  for (const line of headerLines.slice(0, 8)) {
    const clean = line.trim();

    // Skip lines that are clearly not names
    if (clean.includes('@')) continue;  // email
    if (/^\+?\d[\d\s\-().]{6,}$/.test(clean)) continue;  // phone
    if (/^https?:\/\/|^www\./i.test(clean)) continue;  // URL
    if (/^linkedin|^github|^portfolio/i.test(clean)) continue;
    if (clean.length < 3 || clean.length > 50) continue;

    // Skip if it's a known section header
    if (identifySection(clean)) continue;

    // Skip if it matches the email or phone we already found
    if (email && clean.includes(email)) continue;
    if (phone && clean.includes(phone)) continue;

    // Skip common non-name header text
    if (/^(resume|curriculum|vitae|cv|address|contact)/i.test(clean)) continue;

    // Good candidate: mostly letters, possibly with spaces/dots/hyphens
    if (/^[A-Za-z\s.\-']{2,40}$/.test(clean)) {
      // Title-case it
      return clean.replace(/\b\w/g, c => c.toUpperCase());
    }

    // ALL CAPS name (common in resumes)
    if (/^[A-Z\s.\-']{3,40}$/.test(clean)) {
      return clean.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(' ');
    }
  }

  return '';
}

function extractLocation(headerLines: string[], fullText: string): string {
  // Look for patterns like "City, State" or "City, Country" or full addresses
  const combined = [...headerLines, fullText].join('\n');
  const patterns = [
    /\d+\s+[\w\s]+(?:St|Street|Ave|Avenue|Rd|Road|Blvd|Lane|Drive|Dr)\.?[,\s]+[\w\s]+/i,
    /([\w\s]+,\s*[\w\s]+,\s*[\w\s]+)/,  // City, State, Country
    /([\w\s]+,\s*(?:India|USA|UK|Canada|Australia|Germany|France|Singapore|Dubai|UAE|Japan|China|South Korea|Brazil|Mexico|Netherlands))/i,
    /((?:Chennai|Mumbai|Bangalore|Bengaluru|Delhi|Hyderabad|Pune|Kolkata|Ahmedabad|Jaipur|New York|San Francisco|London|Berlin|Tokyo|Sydney|Toronto|Dubai|Singapore)[\w\s,]*)/i,
  ];

  for (const pat of patterns) {
    const m = combined.match(pat);
    if (m) return m[0].trim().slice(0, 60);
  }
  return '';
}

// ──────────────────────────────────────────────────────────────────────────────
// SKILLS EXTRACTION — comprehensive keyword list + freeform parsing
// ──────────────────────────────────────────────────────────────────────────────

const KNOWN_SKILLS = [
  // Programming Languages
  'JavaScript', 'TypeScript', 'Python', 'Java', 'C++', 'C#', 'C', 'Go', 'Rust', 'Ruby',
  'PHP', 'Kotlin', 'Swift', 'Dart', 'Scala', 'R', 'MATLAB', 'Perl', 'Lua', 'Haskell',
  'Assembly', 'Objective-C', 'Groovy', 'Visual Basic', 'Shell', 'Bash', 'PowerShell',
  // Frontend
  'React', 'React.js', 'Angular', 'Vue', 'Vue.js', 'Next.js', 'Nuxt.js', 'Svelte',
  'HTML', 'HTML5', 'CSS', 'CSS3', 'SASS', 'SCSS', 'Less', 'Tailwind', 'Tailwind CSS',
  'Bootstrap', 'Material UI', 'Chakra UI', 'Ant Design', 'jQuery', 'Redux', 'Zustand',
  'Framer Motion', 'Three.js', 'D3.js', 'Chart.js', 'Webpack', 'Vite', 'Babel',
  // Backend
  'Node.js', 'Express', 'Express.js', 'FastAPI', 'Django', 'Flask', 'Spring', 'Spring Boot',
  'Laravel', 'Rails', 'Ruby on Rails', 'ASP.NET', '.NET', 'NestJS', 'Koa', 'Hapi',
  'Gin', 'Fiber', 'Echo', 'Actix', 'Rocket',
  // Databases
  'SQL', 'MySQL', 'PostgreSQL', 'MongoDB', 'Redis', 'Firebase', 'Supabase', 'SQLite',
  'Oracle', 'DynamoDB', 'Cassandra', 'Elasticsearch', 'Neo4j', 'CouchDB', 'MariaDB',
  'MSSQL', 'SQL Server', 'Prisma', 'Sequelize', 'Mongoose', 'TypeORM', 'SQLAlchemy',
  // Cloud & DevOps
  'AWS', 'Azure', 'GCP', 'Google Cloud', 'Docker', 'Kubernetes', 'K8s', 'Terraform',
  'Ansible', 'Jenkins', 'GitHub Actions', 'GitLab CI', 'CircleCI', 'Travis CI',
  'Nginx', 'Apache', 'Linux', 'Ubuntu', 'CI/CD', 'Heroku', 'Vercel', 'Netlify',
  'DigitalOcean', 'Cloudflare', 'Lambda', 'S3', 'EC2', 'RDS', 'CloudFormation',
  // AI/ML/Data
  'TensorFlow', 'PyTorch', 'Keras', 'Scikit-learn', 'Pandas', 'NumPy', 'SciPy',
  'OpenCV', 'NLTK', 'SpaCy', 'Hugging Face', 'LangChain', 'OpenAI', 'GPT',
  'Machine Learning', 'Deep Learning', 'NLP', 'Computer Vision', 'Data Science',
  'Neural Networks', 'Reinforcement Learning', 'Data Analysis', 'Data Engineering',
  'Jupyter', 'Matplotlib', 'Seaborn', 'Tableau', 'Power BI', 'Apache Spark', 'Hadoop',
  'Kafka', 'Airflow', 'ETL', 'Data Warehouse',
  // Mobile
  'React Native', 'Flutter', 'SwiftUI', 'Jetpack Compose', 'Kotlin Multiplatform',
  'Ionic', 'Xamarin', 'Expo', 'Android', 'iOS',
  // Testing
  'Jest', 'Mocha', 'Cypress', 'Selenium', 'Playwright', 'JUnit', 'Pytest', 'RSpec',
  'Postman', 'Insomnia', 'Unit Testing', 'Integration Testing', 'E2E Testing', 'TDD',
  // Tools & Concepts
  'Git', 'GitHub', 'GitLab', 'Bitbucket', 'VS Code', 'IntelliJ', 'Vim',
  'REST', 'REST API', 'REST APIs', 'GraphQL', 'WebSocket', 'gRPC', 'Microservices',
  'Agile', 'Scrum', 'Kanban', 'JIRA', 'Trello', 'Slack', 'Figma', 'Photoshop',
  'Canva', 'Notion', 'Confluence',
  'OOP', 'SOLID', 'Design Patterns', 'System Design', 'Data Structures', 'Algorithms',
  'DBMS', 'Operating Systems', 'Computer Networks', 'Cybersecurity', 'Blockchain',
  'Web Development', 'API Development', 'DevOps', 'Cloud Computing',
  'Excel', 'Word', 'PowerPoint',
];

function extractSkills(fullText: string, skillSectionLines: string[]): string[] {
  const foundSet = new Set<string>();

  // 1. Parse skill section lines — skills are often comma/pipe/bullet separated
  for (const line of skillSectionLines) {
    // Split by common delimiters
    const parts = line.split(/[,|•●■□▪▸►▹→·;]\s*/).map(s => s.trim()).filter(s => s.length > 0 && s.length < 40);
    for (const part of parts) {
      // Check against known skills (case-insensitive)
      const match = KNOWN_SKILLS.find(k => k.toLowerCase() === part.toLowerCase() || part.toLowerCase().includes(k.toLowerCase()));
      if (match) {
        foundSet.add(match);
      } else if (part.length >= 2 && part.length <= 30 && /^[A-Za-z]/.test(part)) {
        // Add as-is if it looks like a skill (not a full sentence)
        if (part.split(' ').length <= 4) {
          foundSet.add(part);
        }
      }
    }
  }

  // 2. Scan full text for known skills not found in skill section
  for (const skill of KNOWN_SKILLS) {
    if (foundSet.has(skill)) continue;
    const escaped = skill.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const re = new RegExp(`\\b${escaped}\\b`, 'i');
    if (re.test(fullText)) {
      foundSet.add(skill);
    }
  }

  // Normalize: React.js → React, Vue.js → Vue, etc. (keep the clean version)
  const normalized = new Set<string>();
  for (const s of foundSet) {
    const clean = s.replace(/\.js$/i, '').trim();
    // Don't add single-char "C" if "C++" or "C#" already present
    if (clean === 'C' && (foundSet.has('C++') || foundSet.has('C#'))) continue;
    normalized.add(s);
  }

  return [...normalized];
}

// ──────────────────────────────────────────────────────────────────────────────
// EDUCATION EXTRACTION
// ──────────────────────────────────────────────────────────────────────────────

function extractEducation(lines: string[]): Array<{ institution: string; degree: string; field: string; start: string; end: string; gpa: string }> {
  if (lines.length === 0) return [];

  const entries: Array<{ institution: string; degree: string; field: string; start: string; end: string; gpa: string }> = [];
  const block = lines.join('\n');

  // Find degree patterns
  const degreePatterns = [
    /(?:Bachelor|Master|Doctor|Associate|Diploma)\s*(?:of|in|'s)?\s*(?:Science|Arts|Engineering|Technology|Business|Commerce|Computer|Informatics|Administration|Fine Arts)[\w\s]*/gi,
    /\b(?:B\.?Tech|B\.?E|B\.?Sc|B\.?A|B\.?Com|B\.?B\.?A|B\.?C\.?A|M\.?Tech|M\.?E|M\.?Sc|M\.?A|M\.?Com|M\.?B\.?A|M\.?C\.?A|Ph\.?D|M\.?S|B\.?S)\b[\s.\-]?(?:in\s+)?[\w\s]*/gi,
    /\b(?:High School|Secondary|HSC|SSC|CBSE|ICSE|10th|12th|Intermediate|Diploma)\b[\w\s]*/gi,
  ];

  // Find institution patterns
  const institutionPatterns = [
    /[\w\s]+(?:University|Institute|College|School|Academy|Universitas|IIT|NIT|IIIT|VIT|SRM|BITS)[\w\s]*/gi,
  ];

  // Find date ranges
  const dateRanges = [...block.matchAll(/\b((?:19|20)\d{2})\s*[-–—to]\s*((?:19|20)\d{2}|Present|Current|Ongoing)\b/gi)];

  // Find GPA/CGPA
  const gpaMatch = block.match(/(?:GPA|CGPA|CPI|Percentage|Grade)[:\s]*(\d+\.?\d*)(?:\s*[/]\s*(?:10|4|100))?/i);
  const gpa = gpaMatch ? gpaMatch[1] : '';

  // Collect all degree mentions
  const degrees: string[] = [];
  for (const pat of degreePatterns) {
    const matches = block.matchAll(pat);
    for (const m of matches) {
      degrees.push(m[0].trim().replace(/\s+/g, ' ').slice(0, 60));
    }
  }

  // Collect institution mentions
  const institutions: string[] = [];
  for (const pat of institutionPatterns) {
    const matches = block.matchAll(pat);
    for (const m of matches) {
      const inst = m[0].trim().replace(/\s+/g, ' ').slice(0, 60);
      if (inst.length > 3) institutions.push(inst);
    }
  }

  // Build education entries
  const count = Math.max(degrees.length, institutions.length, 1);
  for (let i = 0; i < count && i < 5; i++) {
    const degree = degrees[i] || '';
    const institution = institutions[i] || '';
    if (!degree && !institution) continue;

    const dateRange = dateRanges[i];
    entries.push({
      institution: institution || 'Institution not detected',
      degree: degree || 'Degree not detected',
      field: extractFieldFromDegree(degree),
      start: dateRange ? dateRange[1] : '',
      end: dateRange ? dateRange[2] : '',
      gpa,
    });
  }

  // If nothing was parsed via patterns, try line-by-line heuristic
  if (entries.length === 0 && lines.length > 0) {
    // Group consecutive lines as one education block
    entries.push({
      institution: lines[0].slice(0, 60),
      degree: lines.length > 1 ? lines[1].slice(0, 60) : '',
      field: '',
      start: dateRanges[0] ? dateRanges[0][1] : '',
      end: dateRanges[0] ? dateRanges[0][2] : '',
      gpa,
    });
  }

  return entries;
}

function extractFieldFromDegree(degree: string): string {
  const fieldMatch = degree.match(/(?:in|of)\s+([\w\s]+)/i);
  if (fieldMatch) return fieldMatch[1].trim().slice(0, 30);
  return '';
}

// ──────────────────────────────────────────────────────────────────────────────
// EXPERIENCE EXTRACTION
// ──────────────────────────────────────────────────────────────────────────────

function extractExperience(lines: string[]): Array<{ company: string; position: string; location: string; start: string; end: string; desc: string }> {
  if (lines.length === 0) return [];

  const entries: Array<{ company: string; position: string; location: string; start: string; end: string; desc: string }> = [];
  const block = lines.join('\n');

  // Common job title keywords
  const titlePattern = /\b((?:Senior|Junior|Lead|Principal|Staff|Associate|Chief|Head)?\s*(?:Software|Frontend|Backend|Full[- ]?Stack|Web|Mobile|Data|ML|AI|Cloud|DevOps|QA|Test|UI\/UX|Product|Project|Marketing|Sales|Business|Systems?|Network|Database|Security|Research)\s*(?:Developer|Engineer|Architect|Analyst|Scientist|Designer|Manager|Consultant|Specialist|Administrator|Intern|Trainee|Lead|Officer|Coordinator))\b/gi;

  // Find all date ranges in the block
  const datePattern = /\b((?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[\w]*\.?\s*\d{0,4}\s*[-–—to]+\s*(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[\w]*\.?\s*\d{0,4}|(?:19|20)\d{2}\s*[-–—to]+\s*(?:(?:19|20)\d{2}|Present|Current|Ongoing|Till Date|Now))\b/gi;

  // Try to split into experience blocks.
  // Heuristic: a new experience block starts when we see a date range or a job title
  const titleMatches = [...block.matchAll(titlePattern)];
  const dateMatches = [...block.matchAll(datePattern)];

  if (titleMatches.length > 0) {
    // For each title, try to find surrounding context
    for (let i = 0; i < titleMatches.length && i < 10; i++) {
      const title = titleMatches[i][0].trim();
      const titleIndex = titleMatches[i].index || 0;

      // Look for company name near the title (usually on adjacent line)
      let company = '';
      const nearbyText = block.substring(Math.max(0, titleIndex - 100), titleIndex + title.length + 100);
      const companyPatterns = [
        /(?:at|@)\s+([\w\s&.,'-]+)/i,
        /([\w\s&]+(?:Inc|LLC|Ltd|Pvt|Corp|Company|Co|Solutions|Technologies|Tech|Systems|Consulting|Labs|Software|Digital|Services|Group|Agency|Studio|Foundation|Organization)[\w\s.]*)/i,
      ];
      for (const cp of companyPatterns) {
        const cm = nearbyText.match(cp);
        if (cm) { company = cm[1].trim().slice(0, 50); break; }
      }

      // If no company pattern matched, look at the line before or after the title
      if (!company) {
        const linesArr = block.split('\n');
        for (let li = 0; li < linesArr.length; li++) {
          if (linesArr[li].includes(title)) {
            // Check adjacent lines for company name
            if (li > 0 && linesArr[li - 1].trim().length > 2 && linesArr[li - 1].trim().length < 50) {
              company = linesArr[li - 1].trim();
            } else if (li < linesArr.length - 1 && linesArr[li + 1].trim().length > 2 && linesArr[li + 1].trim().length < 50) {
              company = linesArr[li + 1].trim();
            }
            break;
          }
        }
      }

      // Find the closest date range
      let start = '', end = '';
      if (dateMatches.length > i) {
        const dateParts = dateMatches[i][0].split(/[-–—]|to/i).map(s => s.trim());
        start = dateParts[0] || '';
        end = dateParts[1] || 'Present';
      }

      // Collect description lines (bullets after the title)
      let desc = '';
      const linesAfterTitle = block.substring(titleIndex + title.length).split('\n').slice(0, 5);
      const descLines = linesAfterTitle
        .map(l => l.replace(/^[•●■□▪▸►▹→\-*]\s*/, '').trim())
        .filter(l => l.length > 10 && l.length < 200 && !titlePattern.test(l));
      desc = descLines.slice(0, 3).join(' ');

      entries.push({
        company: company || 'Company',
        position: title,
        location: '',
        start,
        end,
        desc: desc || `Worked as ${title}.`,
      });
    }
  }

  // Fallback: if no job titles were detected, treat each line group as an entry
  if (entries.length === 0 && lines.length >= 2) {
    entries.push({
      company: lines[0].slice(0, 50),
      position: lines.length > 1 ? lines[1].slice(0, 50) : 'Role',
      location: '',
      start: dateMatches[0] ? dateMatches[0][0].split(/[-–—]/)[0].trim() : '',
      end: dateMatches[0] ? dateMatches[0][0].split(/[-–—]/)[1]?.trim() || '' : '',
      desc: lines.slice(2).join(' ').slice(0, 200),
    });
  }

  return entries;
}

// ──────────────────────────────────────────────────────────────────────────────
// PROJECTS EXTRACTION
// ──────────────────────────────────────────────────────────────────────────────

function extractProjects(lines: string[], skills: string[]): Array<{ title: string; desc: string; tech: string }> {
  if (lines.length === 0) return [];

  const projects: Array<{ title: string; desc: string; tech: string }> = [];

  // Heuristic: project titles are shorter lines, descriptions are longer
  let currentProject: { title: string; desc: string; tech: string } | null = null;

  for (const line of lines) {
    const clean = line.replace(/^[•●■□▪▸►▹→\-*]\s*/, '').trim();
    if (!clean) continue;

    // Short line = likely a project title
    if (clean.length <= 60 && !clean.includes('.') && projects.length < 10) {
      if (currentProject) projects.push(currentProject);
      currentProject = { title: clean, desc: '', tech: '' };
    } else if (currentProject) {
      // Longer line = description
      if (!currentProject.desc) {
        currentProject.desc = clean.slice(0, 200);
      } else {
        currentProject.desc += ' ' + clean.slice(0, 100);
      }
    }
  }
  if (currentProject) projects.push(currentProject);

  // Add tech from detected skills
  const techStr = skills.slice(0, 5).join(', ');
  for (const p of projects) {
    if (!p.tech) p.tech = techStr;
  }

  return projects;
}

// ──────────────────────────────────────────────────────────────────────────────
// MAIN PARSER — ties everything together
// ──────────────────────────────────────────────────────────────────────────────

export function parseResumeText(text: string) {
  if (!text || text.trim().length < 10) {
    return {
      personal: { name: '', email: '', phone: '', location: '', summary: '' },
      education: [],
      experience: [],
      projects: [],
      skills: [],
    };
  }

  const sections = splitIntoSections(text);

  // ── Personal Info (from header + full text) ──
  const headerLines = sections['header'] || [];
  const name = extractName(headerLines, text);
  const email = extractEmail(text);
  const phone = extractPhone(text);
  const location = extractLocation(headerLines, text);

  // ── Skills ──
  const skillLines = sections['skills'] || [];
  const skills = extractSkills(text, skillLines);

  // ── Education ──
  const eduLines = sections['education'] || [];
  const education = extractEducation(eduLines);

  // ── Experience ──
  const expLines = sections['experience'] || [];
  const experience = extractExperience(expLines);

  // ── Projects ──
  const projLines = sections['projects'] || [];
  const projects = extractProjects(projLines, skills);

  // ── Summary ──
  const summaryLines = sections['summary'] || [];
  let summary = summaryLines.join(' ').slice(0, 300);
  if (!summary && skills.length > 0) {
    const expTitle = experience.length > 0 ? experience[0].position : '';
    summary = `${expTitle ? expTitle + ' with' : 'Professional with'} expertise in ${skills.slice(0, 5).join(', ')}.`;
  }

  return {
    personal: { name, email, phone, location, summary },
    education,
    experience,
    projects,
    skills,
  };
}
