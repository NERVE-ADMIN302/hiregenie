from fastapi import APIRouter, Depends
from app.models.ai import ATSRequest, SkillGapRequest, ChatRequest, InterviewStartRequest, InterviewEvalRequest, CoverLetterRequest, EmailRequest
from app.services.ai_service import AIService
from app.services.ats_service import ATSService
from app.core.security import get_current_user

router = APIRouter()
ai_service = AIService()
ats_service = ATSService()

@router.post("/parse-resume")
def parse_resume(data: dict, user: dict = Depends(get_current_user)):
    return ai_service.parse_resume_text(data.get('text', ''))

@router.post("/ats-analysis")
def ats_analysis(req: ATSRequest, user: dict = Depends(get_current_user)):
    return ats_service.run_analysis(user['id'], "Resume text mock", req.job_description)

@router.post("/skill-gap")
def skill_gap(req: SkillGapRequest, user: dict = Depends(get_current_user)):
    return ai_service.analyze_skill_gap("Resume text mock", req.target_role)

@router.post("/career-readiness")
def career_readiness(user: dict = Depends(get_current_user)):
    return ai_service.calculate_career_readiness("Resume text mock")

@router.post("/career-mentor")
def career_mentor(req: ChatRequest, user: dict = Depends(get_current_user)):
    return ai_service.career_mentor_chat(req.message)

@router.post("/mock-interview/start")
def mock_interview_start(req: InterviewStartRequest, user: dict = Depends(get_current_user)):
    return ai_service.generate_interview_questions(req.type, req.role)

@router.post("/mock-interview/evaluate")
def mock_interview_evaluate(req: InterviewEvalRequest, user: dict = Depends(get_current_user)):
    return ai_service.evaluate_interview_answer("Sample Question?", req.answer)

@router.post("/cover-letter")
def cover_letter(req: CoverLetterRequest, user: dict = Depends(get_current_user)):
    return ai_service.generate_cover_letter("Resume text mock", "Job description mock")

@router.post("/email")
def generate_email(req: EmailRequest, user: dict = Depends(get_current_user)):
    return ai_service.generate_email(req.email_type, req.company, req.role, req.details or "")
