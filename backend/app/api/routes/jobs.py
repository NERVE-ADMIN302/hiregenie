from fastapi import APIRouter, Depends
from app.models.job import JobCreate, JobUpdate
from app.services.job_service import JobService
from app.core.security import get_current_user, require_role

router = APIRouter()
job_service = JobService()

@router.get("/")
def list_jobs():
    return job_service.list_jobs()

@router.post("/")
def create_job(data: JobCreate, user: dict = Depends(require_role("recruiter", "admin"))):
    return job_service.create_job(data.model_dump(), user['id'])

@router.get("/recommended")
def get_recommended(user: dict = Depends(get_current_user)):
    return job_service.get_recommended(user['id'])

@router.get("/bookmarks")
def get_bookmarks(user: dict = Depends(get_current_user)):
    return []

@router.get("/{id}")
def get_job(id: str):
    return job_service.get_job(id)

@router.put("/{id}")
def update_job(id: str, data: JobUpdate, user: dict = Depends(require_role("recruiter", "admin"))):
    return job_service.update_job(id, data.model_dump(exclude_unset=True))

@router.delete("/{id}")
def delete_job(id: str, user: dict = Depends(require_role("recruiter", "admin"))):
    return job_service.delete_job(id)

@router.post("/{id}/bookmark")
def bookmark_job(id: str, user: dict = Depends(get_current_user)):
    return job_service.toggle_bookmark(user['id'], id)
