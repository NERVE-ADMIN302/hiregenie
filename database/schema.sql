-- HireGenie AI — Complete PostgreSQL Schema for Supabase
-- Run this in the Supabase SQL Editor

-- ============================================
-- PROFILES
-- ============================================
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT NOT NULL DEFAULT '',
  role TEXT NOT NULL DEFAULT 'student' CHECK (role IN ('student','recruiter','placement_officer','admin')),
  avatar_url TEXT,
  phone TEXT,
  department TEXT,
  university TEXT,
  graduation_year INT,
  cgpa NUMERIC(4,2),
  bio TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_profiles_role ON profiles(role);
CREATE INDEX IF NOT EXISTS idx_profiles_email ON profiles(email);

-- ============================================
-- RESUMES
-- ============================================
CREATE TABLE IF NOT EXISTS resumes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL DEFAULT 'My Resume',
  summary TEXT DEFAULT '',
  template TEXT NOT NULL DEFAULT 'modern',
  is_primary BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_resumes_user ON resumes(user_id);

CREATE TABLE IF NOT EXISTS education (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  resume_id UUID NOT NULL REFERENCES resumes(id) ON DELETE CASCADE,
  institution TEXT NOT NULL,
  degree TEXT NOT NULL,
  field_of_study TEXT,
  start_date DATE,
  end_date DATE,
  gpa NUMERIC(4,2),
  description TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_education_resume ON education(resume_id);

CREATE TABLE IF NOT EXISTS experience (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  resume_id UUID NOT NULL REFERENCES resumes(id) ON DELETE CASCADE,
  company TEXT NOT NULL,
  position TEXT NOT NULL,
  location TEXT,
  start_date DATE,
  end_date DATE,
  is_current BOOLEAN DEFAULT false,
  description TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_experience_resume ON experience(resume_id);

CREATE TABLE IF NOT EXISTS projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  resume_id UUID NOT NULL REFERENCES resumes(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  technologies TEXT[] DEFAULT '{}',
  url TEXT,
  github_url TEXT,
  start_date DATE,
  end_date DATE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_projects_resume ON projects(resume_id);

CREATE TABLE IF NOT EXISTS skills (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  resume_id UUID NOT NULL REFERENCES resumes(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  category TEXT DEFAULT 'general',
  proficiency_level INT NOT NULL DEFAULT 3 CHECK (proficiency_level >= 1 AND proficiency_level <= 5),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_skills_resume ON skills(resume_id);

CREATE TABLE IF NOT EXISTS certifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  resume_id UUID NOT NULL REFERENCES resumes(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  issuer TEXT,
  issue_date DATE,
  expiry_date DATE,
  credential_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_certifications_resume ON certifications(resume_id);

CREATE TABLE IF NOT EXISTS achievements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  resume_id UUID NOT NULL REFERENCES resumes(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  date DATE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_achievements_resume ON achievements(resume_id);

CREATE TABLE IF NOT EXISTS languages_known (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  resume_id UUID NOT NULL REFERENCES resumes(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  proficiency TEXT DEFAULT 'intermediate' CHECK (proficiency IN ('beginner','intermediate','advanced','native')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_languages_resume ON languages_known(resume_id);

-- ============================================
-- ATS & ANALYSIS
-- ============================================
CREATE TABLE IF NOT EXISTS ats_analyses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  resume_id UUID REFERENCES resumes(id) ON DELETE SET NULL,
  overall_score INT DEFAULT 0,
  ats_score INT DEFAULT 0,
  grammar_score INT DEFAULT 0,
  formatting_score INT DEFAULT 0,
  keyword_score INT DEFAULT 0,
  impact_score INT DEFAULT 0,
  missing_keywords TEXT[] DEFAULT '{}',
  suggestions JSONB DEFAULT '[]',
  job_description TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_ats_user ON ats_analyses(user_id);

CREATE TABLE IF NOT EXISTS skill_gap_analyses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  target_role TEXT NOT NULL,
  matched_skills TEXT[] DEFAULT '{}',
  missing_skills TEXT[] DEFAULT '{}',
  roadmap JSONB DEFAULT '[]',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_skillgap_user ON skill_gap_analyses(user_id);

CREATE TABLE IF NOT EXISTS career_readiness_scores (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  overall_score INT DEFAULT 0,
  resume_score INT DEFAULT 0,
  projects_score INT DEFAULT 0,
  experience_score INT DEFAULT 0,
  skills_score INT DEFAULT 0,
  certifications_score INT DEFAULT 0,
  suggestions JSONB DEFAULT '[]',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_readiness_user ON career_readiness_scores(user_id);

-- ============================================
-- JOBS
-- ============================================
CREATE TABLE IF NOT EXISTS jobs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  recruiter_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  company TEXT NOT NULL,
  description TEXT,
  requirements TEXT[] DEFAULT '{}',
  location TEXT,
  salary_min INT,
  salary_max INT,
  job_type TEXT DEFAULT 'full_time' CHECK (job_type IN ('full_time','part_time','internship','contract')),
  experience_level TEXT DEFAULT 'entry',
  is_active BOOLEAN NOT NULL DEFAULT true,
  deadline DATE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_jobs_recruiter ON jobs(recruiter_id);
CREATE INDEX IF NOT EXISTS idx_jobs_active ON jobs(is_active);

CREATE TABLE IF NOT EXISTS job_applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  job_id UUID NOT NULL REFERENCES jobs(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  status TEXT NOT NULL DEFAULT 'applied' CHECK (status IN ('applied','viewed','shortlisted','interview','technical','hr','offered','rejected')),
  cover_letter_id UUID,
  applied_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(job_id, user_id)
);
CREATE INDEX IF NOT EXISTS idx_applications_user ON job_applications(user_id);
CREATE INDEX IF NOT EXISTS idx_applications_job ON job_applications(job_id);

CREATE TABLE IF NOT EXISTS bookmarked_jobs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  job_id UUID NOT NULL REFERENCES jobs(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(job_id, user_id)
);
CREATE INDEX IF NOT EXISTS idx_bookmarks_user ON bookmarked_jobs(user_id);

-- ============================================
-- COMPANIES
-- ============================================
CREATE TABLE IF NOT EXISTS companies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  industry TEXT,
  description TEXT,
  website TEXT,
  logo_url TEXT,
  location TEXT,
  size TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ============================================
-- MOCK INTERVIEWS
-- ============================================
CREATE TABLE IF NOT EXISTS mock_interviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  interview_type TEXT NOT NULL CHECK (interview_type IN ('hr','technical','behavioral')),
  status TEXT NOT NULL DEFAULT 'in_progress' CHECK (status IN ('in_progress','completed')),
  overall_score INT,
  feedback TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_interviews_user ON mock_interviews(user_id);

CREATE TABLE IF NOT EXISTS interview_questions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  interview_id UUID NOT NULL REFERENCES mock_interviews(id) ON DELETE CASCADE,
  question TEXT NOT NULL,
  question_type TEXT,
  difficulty TEXT DEFAULT 'medium'
);
CREATE INDEX IF NOT EXISTS idx_questions_interview ON interview_questions(interview_id);

CREATE TABLE IF NOT EXISTS interview_responses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  question_id UUID NOT NULL REFERENCES interview_questions(id) ON DELETE CASCADE,
  answer TEXT,
  score INT,
  feedback TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ============================================
-- AI GENERATED CONTENT
-- ============================================
CREATE TABLE IF NOT EXISTS cover_letters (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  job_id UUID REFERENCES jobs(id) ON DELETE SET NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_coverletters_user ON cover_letters(user_id);

CREATE TABLE IF NOT EXISTS generated_emails (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  email_type TEXT NOT NULL,
  subject TEXT,
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_emails_user ON generated_emails(user_id);

CREATE TABLE IF NOT EXISTS ai_chat_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK (role IN ('user','assistant')),
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_chat_user ON ai_chat_history(user_id);

-- ============================================
-- NOTIFICATIONS & LOGS
-- ============================================
CREATE TABLE IF NOT EXISTS notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  message TEXT,
  type TEXT DEFAULT 'info',
  is_read BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_notifications_user ON notifications(user_id);
CREATE INDEX IF NOT EXISTS idx_notifications_unread ON notifications(user_id, is_read);

CREATE TABLE IF NOT EXISTS system_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  action TEXT NOT NULL,
  details JSONB DEFAULT '{}',
  ip_address TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_logs_user ON system_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_logs_action ON system_logs(action);

-- ============================================
-- AUTO-UPDATE TIMESTAMPS TRIGGER
-- ============================================
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER tr_profiles_updated BEFORE UPDATE ON profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER tr_resumes_updated BEFORE UPDATE ON resumes FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER tr_jobs_updated BEFORE UPDATE ON jobs FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER tr_applications_updated BEFORE UPDATE ON job_applications FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ============================================
-- AUTO-CREATE PROFILE ON SIGNUP
-- ============================================
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO profiles (id, email, full_name, role)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
    COALESCE(NEW.raw_user_meta_data->>'role', 'student')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- ============================================
-- ROW LEVEL SECURITY
-- ============================================
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE resumes ENABLE ROW LEVEL SECURITY;
ALTER TABLE education ENABLE ROW LEVEL SECURITY;
ALTER TABLE experience ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE certifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE languages_known ENABLE ROW LEVEL SECURITY;
ALTER TABLE ats_analyses ENABLE ROW LEVEL SECURITY;
ALTER TABLE jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE job_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookmarked_jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

-- Profiles: users can read all profiles, update own
CREATE POLICY "Profiles are viewable by everyone" ON profiles FOR SELECT USING (true);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);

-- Resumes: own only
CREATE POLICY "Users can view own resumes" ON resumes FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own resumes" ON resumes FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own resumes" ON resumes FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own resumes" ON resumes FOR DELETE USING (auth.uid() = user_id);

-- Resume sub-tables follow resume ownership
CREATE POLICY "Education follows resume access" ON education FOR ALL USING (
  EXISTS (SELECT 1 FROM resumes WHERE resumes.id = education.resume_id AND resumes.user_id = auth.uid())
);
CREATE POLICY "Experience follows resume access" ON experience FOR ALL USING (
  EXISTS (SELECT 1 FROM resumes WHERE resumes.id = experience.resume_id AND resumes.user_id = auth.uid())
);
CREATE POLICY "Projects follows resume access" ON projects FOR ALL USING (
  EXISTS (SELECT 1 FROM resumes WHERE resumes.id = projects.resume_id AND resumes.user_id = auth.uid())
);
CREATE POLICY "Skills follows resume access" ON skills FOR ALL USING (
  EXISTS (SELECT 1 FROM resumes WHERE resumes.id = skills.resume_id AND resumes.user_id = auth.uid())
);
CREATE POLICY "Certifications follows resume access" ON certifications FOR ALL USING (
  EXISTS (SELECT 1 FROM resumes WHERE resumes.id = certifications.resume_id AND resumes.user_id = auth.uid())
);
CREATE POLICY "Achievements follows resume access" ON achievements FOR ALL USING (
  EXISTS (SELECT 1 FROM resumes WHERE resumes.id = achievements.resume_id AND resumes.user_id = auth.uid())
);
CREATE POLICY "Languages follows resume access" ON languages_known FOR ALL USING (
  EXISTS (SELECT 1 FROM resumes WHERE resumes.id = languages_known.resume_id AND resumes.user_id = auth.uid())
);

-- ATS: own only
CREATE POLICY "Users can view own ATS" ON ats_analyses FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own ATS" ON ats_analyses FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Jobs: everyone can read active, recruiters can manage own
CREATE POLICY "Active jobs are viewable" ON jobs FOR SELECT USING (is_active = true);
CREATE POLICY "Recruiters can insert jobs" ON jobs FOR INSERT WITH CHECK (auth.uid() = recruiter_id);
CREATE POLICY "Recruiters can update own jobs" ON jobs FOR UPDATE USING (auth.uid() = recruiter_id);
CREATE POLICY "Recruiters can delete own jobs" ON jobs FOR DELETE USING (auth.uid() = recruiter_id);

-- Applications: users see own, recruiters see for their jobs
CREATE POLICY "Users can view own applications" ON job_applications FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can apply" ON job_applications FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Bookmarks: own only
CREATE POLICY "Users can manage own bookmarks" ON bookmarked_jobs FOR ALL USING (auth.uid() = user_id);

-- Notifications: own only
CREATE POLICY "Users can view own notifications" ON notifications FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update own notifications" ON notifications FOR UPDATE USING (auth.uid() = user_id);
