from fastapi import APIRouter, Depends
from app.models.job import ApplicationCreate, ApplicationUpdate
from app.services.job_service import JobService
from app.core.security import get_current_user, require_role

router = APIRouter()
job_service = JobService()

@router.post("/")
def apply(data: ApplicationCreate, user: dict = Depends(get_current_user)):
    return job_service.apply_to_job(user['id'], data.job_id, data.cover_letter_id)

@router.get("/me")
def get_my_applications(user: dict = Depends(get_current_user)):
    return job_service.get_applications(user_id=user['id'])

@router.get("/job/{id}")
def get_job_applications(id: str, user: dict = Depends(require_role("recruiter", "admin"))):
    return job_service.get_applications(job_id=id)

@router.put("/{id}/status")
def update_status(id: str, data: ApplicationUpdate, user: dict = Depends(require_role("recruiter", "admin"))):
    return job_service.update_status(id, data.status)
