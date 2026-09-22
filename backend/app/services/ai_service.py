import json
from app.core.config import settings

class AIService:
    def __init__(self):
        self.api_key = settings.GEMINI_API_KEY
        if self.api_key:
            import google.generativeai as genai
            genai.configure(api_key=self.api_key)
            self.model = genai.GenerativeModel('gemini-1.5-flash')
        else:
            self.model = None

    def _call_gemini(self, prompt: str, default_mock_data: dict) -> dict:
        if not self.model:
            return default_mock_data
        try:
            response = self.model.generate_content(prompt)
            # Find JSON in response
            text = response.text
            start = text.find('{')
            end = text.rfind('}') + 1
            if start != -1 and end != 0:
                return json.loads(text[start:end])
            return default_mock_data
        except Exception as e:
            print(f"Gemini API Error: {e}")
            return default_mock_data

    def parse_resume_text(self, text: str) -> dict:
        prompt = f"Parse the following resume text into structured JSON format with education, experience, skills, and projects.\n\n{text}"
        mock = {"skills": [], "experience": [], "education": []}
        return self._call_gemini(prompt, mock)

    def analyze_ats(self, resume_text: str, job_description: str = "") -> dict:
        prompt = f"Analyze resume against job description for ATS score.\nResume: {resume_text}\nJob: {job_description}\nReturn JSON with match_score (0-100), matched_keywords (list), missing_keywords (list), suggestions (list)."
        mock = {"match_score": 75, "matched_keywords": [], "missing_keywords": [], "suggestions": []}
        return self._call_gemini(prompt, mock)

    def analyze_skill_gap(self, resume_text: str, target_role: str) -> dict:
        prompt = f"Analyze skill gap for target role: {target_role} given resume: {resume_text}.\nReturn JSON with target_role, current_skills (list), missing_skills (list), learning_path (list)."
        mock = {"target_role": target_role, "current_skills": [], "missing_skills": ["API Design"], "learning_path": ["Take a course"]}
        return self._call_gemini(prompt, mock)

    def calculate_career_readiness(self, resume_text: str) -> dict:
        prompt = f"Calculate career readiness score based on resume: {resume_text}.\nReturn JSON with score (0-100), strengths (list), areas_for_improvement (list), next_steps (list)."
        mock = {"score": 80, "strengths": [], "areas_for_improvement": [], "next_steps": []}
        return self._call_gemini(prompt, mock)

    def career_mentor_chat(self, message: str) -> dict:
        prompt = f"You are a career mentor. User says: {message}. Return JSON with 'reply'."
        mock = {"reply": "That's a great question about your career!"}
        return self._call_gemini(prompt, mock)

    def generate_interview_questions(self, interview_type: str, role: str) -> dict:
        prompt = f"Generate 3 interview questions for a {interview_type} interview for {role} role. Return JSON with 'questions' as a list of dicts with 'id' and 'text'."
        mock = {"questions": [{"id": "1", "text": "Tell me about yourself."}]}
        return self._call_gemini(prompt, mock)

    def evaluate_interview_answer(self, question: str, answer: str) -> dict:
        prompt = f"Evaluate this interview answer.\nQuestion: {question}\nAnswer: {answer}\nReturn JSON with 'score' (0-10), 'feedback', 'better_answer'."
        mock = {"score": 7, "feedback": "Good attempt", "better_answer": "Elaborate more."}
        return self._call_gemini(prompt, mock)

    def generate_cover_letter(self, resume_text: str, job_description: str) -> dict:
        prompt = f"Generate a cover letter based on resume and job description.\nResume: {resume_text}\nJob: {job_description}\nReturn JSON with 'cover_letter'."
        mock = {"cover_letter": "Dear Hiring Manager..."}
        return self._call_gemini(prompt, mock)

    def generate_email(self, email_type: str, company: str, role: str, details: str) -> dict:
        prompt = f"Generate a {email_type} email for {role} at {company}. Details: {details}.\nReturn JSON with 'subject' and 'body'."
        mock = {"subject": "Application", "body": "Dear team..."}
        return self._call_gemini(prompt, mock)
