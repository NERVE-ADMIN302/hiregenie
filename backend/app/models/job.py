from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime

class JobBase(BaseModel):
    title: str
    company: str
    description: str
    requirements: List[str]
    location: str
    salary_min: Optional[int] = None
    salary_max: Optional[int] = None
    job_type: str
    experience_level: str
    deadline: Optional[datetime] = None

class JobCreate(JobBase):
    pass

class JobUpdate(BaseModel):
    title: Optional[str] = None
    company: Optional[str] = None
    description: Optional[str] = None
    requirements: Optional[List[str]] = None
    location: Optional[str] = None
    salary_min: Optional[int] = None
    salary_max: Optional[int] = None
    job_type: Optional[str] = None
    experience_level: Optional[str] = None
    deadline: Optional[datetime] = None

class JobResponse(JobBase):
    id: str
    created_by: str
    created_at: datetime
    updated_at: datetime

class ApplicationCreate(BaseModel):
    job_id: str
    cover_letter_id: Optional[str] = None

class ApplicationUpdate(BaseModel):
    status: str

class ApplicationResponse(BaseModel):
    id: str
    job_id: str
    user_id: str
    status: str
    cover_letter_id: Optional[str] = None
    applied_at: datetime
