from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class UserCreate(BaseModel):
    email: str
    password: str
    full_name: str
    role: str = "student"

class UserUpdate(BaseModel):
    full_name: Optional[str] = None
    phone: Optional[str] = None
    department: Optional[str] = None
    university: Optional[str] = None
    graduation_year: Optional[int] = None
    cgpa: Optional[float] = None
    bio: Optional[str] = None
    avatar_url: Optional[str] = None

class UserResponse(BaseModel):
    id: str
    email: str
    full_name: str
    role: str
    phone: Optional[str] = None
    department: Optional[str] = None
    university: Optional[str] = None
    graduation_year: Optional[int] = None
    cgpa: Optional[float] = None
    bio: Optional[str] = None
    avatar_url: Optional[str] = None
    created_at: datetime
