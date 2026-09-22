from pydantic import BaseModel
from typing import List, Optional
from datetime import date

class EducationBase(BaseModel):
    institution: str
    degree: str
    field_of_study: str
    start_date: date
    end_date: Optional[date] = None
    grade: Optional[str] = None
    description: Optional[str] = None

class EducationCreate(EducationBase):
    pass

class EducationResponse(EducationBase):
    id: str

class ExperienceBase(BaseModel):
    title: str
    company: str
    location: Optional[str] = None
    start_date: date
    end_date: Optional[date] = None
    is_current: bool = False
    description: str

class ExperienceCreate(ExperienceBase):
    pass

class ExperienceResponse(ExperienceBase):
    id: str

class ProjectBase(BaseModel):
    title: str
    description: str
    link: Optional[str] = None
    technologies: List[str] = []
    start_date: Optional[date] = None
    end_date: Optional[date] = None

class ProjectCreate(ProjectBase):
    pass

class ProjectResponse(ProjectBase):
    id: str

class SkillBase(BaseModel):
    name: str
    level: str = "Intermediate"
    category: Optional[str] = None

class SkillCreate(SkillBase):
    pass

class SkillResponse(SkillBase):
    id: str

class CertificationBase(BaseModel):
    name: str
    issuing_organization: str
    issue_date: date
    expiration_date: Optional[date] = None
    credential_id: Optional[str] = None
    credential_url: Optional[str] = None

class CertificationCreate(CertificationBase):
    pass

class CertificationResponse(CertificationBase):
    id: str

class AchievementBase(BaseModel):
    title: str
    date: Optional[date] = None
    description: Optional[str] = None

class AchievementCreate(AchievementBase):
    pass

class AchievementResponse(AchievementBase):
    id: str

class LanguageBase(BaseModel):
    name: str
    proficiency: str

class LanguageCreate(LanguageBase):
    pass

class LanguageResponse(LanguageBase):
    id: str

class ResumeBase(BaseModel):
    title: str
    summary: Optional[str] = None
    template: str = "default"

class ResumeCreate(ResumeBase):
    pass

class ResumeUpdate(ResumeBase):
    pass

class ResumeFullResponse(ResumeBase):
    id: str
    user_id: str
    education: List[EducationResponse] = []
    experience: List[ExperienceResponse] = []
    projects: List[ProjectResponse] = []
    skills: List[SkillResponse] = []
    certifications: List[CertificationResponse] = []
    achievements: List[AchievementResponse] = []
    languages: List[LanguageResponse] = []
    created_at: str
    updated_at: str
