import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from './store/theme-context';
import { AuthProvider } from './store/auth-context';
import { ResumeProvider } from './store/resume-context';
import { DashboardLayout } from './components/layout/DashboardLayout';

// Auth & Landing Pages
import { LandingPage } from './pages/landing/LandingPage';
import { LoginPage } from './pages/auth/LoginPage';
import { SignupPage } from './pages/auth/SignupPage';
import { ForgotPasswordPage } from './pages/auth/ForgotPasswordPage';

// Student Pages
import { StudentDashboard } from './pages/student/StudentDashboard';
import { ResumeBuilder } from './pages/student/ResumeBuilder';
import { ResumeUpload } from './pages/student/ResumeUpload';
import { ATSAnalysis } from './pages/student/ATSAnalysis';
import { SkillGap } from './pages/student/SkillGap';
import { CareerReadiness } from './pages/student/CareerReadiness';
import { CareerMentor } from './pages/student/CareerMentor';
import { MockInterview } from './pages/student/MockInterview';
import { CoverLetter } from './pages/student/CoverLetter';
import { EmailGenerator } from './pages/student/EmailGenerator';
import { JobRecommendations } from './pages/student/JobRecommendations';
import { CompanyRecommendations } from './pages/student/CompanyRecommendations';
import { EligibilityChecker } from './pages/student/EligibilityChecker';
import { ApplicationTracker } from './pages/student/ApplicationTracker';
import { AnalyticsDashboard } from './pages/student/AnalyticsDashboard';

// Recruiter Pages
import { RecruiterDashboard } from './pages/recruiter/RecruiterDashboard';
import { PostJob } from './pages/recruiter/PostJob';
import { SearchStudents } from './pages/recruiter/SearchStudents';
import { ManageCandidates } from './pages/recruiter/ManageCandidates';

// Placement Officer Pages
import { PlacementDashboard } from './pages/placement/PlacementDashboard';
import { ManageStudents } from './pages/placement/ManageStudents';
import { EligibleStudents } from './pages/placement/EligibleStudents';
import { Reports } from './pages/placement/Reports';

// Admin Pages
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { ManageUsers } from './pages/admin/ManageUsers';
import { ManageJobs } from './pages/admin/ManageJobs';
import { SystemLogs } from './pages/admin/SystemLogs';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AuthProvider>
          <ResumeProvider>
          <BrowserRouter>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/forgot-password" element={<ForgotPasswordPage />} />

              {/* Student Routes */}
              <Route path="/student" element={<DashboardLayout allowedRole="student" />}>
                <Route index element={<Navigate to="/student/dashboard" replace />} />
                <Route path="dashboard" element={<StudentDashboard />} />
                <Route path="resume-builder" element={<ResumeBuilder />} />
                <Route path="resume-upload" element={<ResumeUpload />} />
                <Route path="upload-resume" element={<Navigate to="/student/resume-upload" replace />} />
                <Route path="ats-analysis" element={<ATSAnalysis />} />
                <Route path="skill-gap" element={<SkillGap />} />
                <Route path="career-readiness" element={<CareerReadiness />} />
                <Route path="career-mentor" element={<CareerMentor />} />
                <Route path="mock-interview" element={<MockInterview />} />
                <Route path="cover-letter" element={<CoverLetter />} />
                <Route path="email-generator" element={<EmailGenerator />} />
                <Route path="jobs" element={<JobRecommendations />} />
                <Route path="companies" element={<CompanyRecommendations />} />
                <Route path="eligibility" element={<EligibilityChecker />} />
                <Route path="applications" element={<ApplicationTracker />} />
                <Route path="analytics" element={<AnalyticsDashboard />} />
              </Route>

              {/* Recruiter Routes */}
              <Route path="/recruiter" element={<DashboardLayout allowedRole="recruiter" />}>
                <Route index element={<Navigate to="/recruiter/dashboard" replace />} />
                <Route path="dashboard" element={<RecruiterDashboard />} />
                <Route path="post-job" element={<PostJob />} />
                <Route path="search" element={<SearchStudents />} />
                <Route path="candidates" element={<ManageCandidates />} />
              </Route>

              {/* Placement Officer Routes */}
              <Route path="/placement" element={<DashboardLayout allowedRole="placement_officer" />}>
                <Route index element={<Navigate to="/placement/dashboard" replace />} />
                <Route path="dashboard" element={<PlacementDashboard />} />
                <Route path="students" element={<ManageStudents />} />
                <Route path="eligible" element={<EligibleStudents />} />
                <Route path="reports" element={<Reports />} />
              </Route>

              {/* Admin Routes */}
              <Route path="/admin" element={<DashboardLayout allowedRole="admin" />}>
                <Route index element={<Navigate to="/admin/dashboard" replace />} />
                <Route path="dashboard" element={<AdminDashboard />} />
                <Route path="users" element={<ManageUsers />} />
                <Route path="jobs" element={<ManageJobs />} />
                <Route path="logs" element={<SystemLogs />} />
              </Route>

              {/* Catch All */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </BrowserRouter>
          </ResumeProvider>
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;