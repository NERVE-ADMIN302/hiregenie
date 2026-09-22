# HireGenie AI

> AI-Powered Placement Preparation, Resume Intelligence, Career Guidance, and Recruitment Platform

## 🏗️ Architecture

- **Frontend**: React 19 + TypeScript + Vite + Tailwind CSS v4 + shadcn/ui
- **Backend**: FastAPI (Python) + Supabase + Google Gemini AI
- **Database**: PostgreSQL (Supabase)
- **Auth**: Supabase Auth (JWT)
- **AI**: Google Gemini 2.0 Flash

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- Python 3.11+
- Supabase account
- Google Gemini API key

### 1. Database Setup
1. Create a Supabase project at [supabase.com](https://supabase.com)
2. Run `database/schema.sql` in the Supabase SQL Editor

### 2. Backend Setup
```bash
cd backend
python -m venv venv
venv\Scripts\activate  # Windows
pip install -r requirements.txt
cp .env.example .env
# Edit .env with your Supabase and Gemini credentials
uvicorn app.main:app --reload
```

### 3. Frontend Setup
```bash
cd frontend
npm install
cp .env.example .env
# Edit .env with your Supabase credentials
npm run dev
```

### 4. Access
- Frontend: http://localhost:5173
- Backend API: http://localhost:8000
- API Docs: http://localhost:8000/docs

## 📦 Modules

### Student Features
- 📝 AI Resume Builder (multi-step wizard)
- 📄 Resume Upload & AI Parsing
- 📊 ATS Analysis & Scoring
- 🎯 Skill Gap Analysis
- 🏆 Career Readiness Score
- 🤖 AI Career Mentor (Chat)
- 🎤 AI Mock Interviews
- ✉️ Cover Letter Generator
- 📧 Email Generator
- 💼 Job Recommendations
- 🏢 Company Recommendations
- ✅ Eligibility Checker
- 📋 Application Tracker
- 📈 Analytics Dashboard

### Recruiter Features
- 📊 Recruiter Dashboard
- 📝 Job Posting
- 🔍 Student Search
- 👥 Candidate Management

### Placement Officer Features
- 📊 Placement Dashboard
- 👨‍🎓 Student Management
- ✅ Eligibility Reports
- 📈 Department & Company Reports

### Admin Features
- 🖥️ System Dashboard
- 👤 User Management
- 📋 Job Oversight
- 📝 System Logs

## 🔑 Environment Variables

### Frontend (.env)
```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
VITE_API_URL=http://localhost:8000/api
```

### Backend (.env)
```
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
SUPABASE_JWT_SECRET=your-jwt-secret
GEMINI_API_KEY=your-gemini-api-key
CORS_ORIGINS=http://localhost:5173
```

## 📄 License

MIT
