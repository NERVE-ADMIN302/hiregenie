from pydantic import BaseModel
from typing import List, Optional

class ATSRequest(BaseModel):
    resume_id: str
    job_description: Optional[str] = None

class ATSResponse(BaseModel):
    match_score: int
    matched_keywords: List[str]
    missing_keywords: List[str]
    suggestions: List[str]

class SkillGapRequest(BaseModel):
    target_role: str

class SkillGapResponse(BaseModel):
    target_role: str
    current_skills: List[str]
    missing_skills: List[str]
    learning_path: List[str]

class CareerReadinessResponse(BaseModel):
    score: int
    strengths: List[str]
    areas_for_improvement: List[str]
    next_steps: List[str]

class ChatRequest(BaseModel):
    message: str

class ChatResponse(BaseModel):
    reply: str

class InterviewStartRequest(BaseModel):
    type: str
    role: str

class InterviewEvalRequest(BaseModel):
    question_id: str
    answer: str

class CoverLetterRequest(BaseModel):
    job_id: str

class EmailRequest(BaseModel):
    email_type: str
    company: str
    role: str
    details: Optional[str] = None
