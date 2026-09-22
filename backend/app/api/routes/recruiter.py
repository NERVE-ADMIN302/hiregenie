from fastapi import APIRouter, Depends
from app.core.security import require_role

router = APIRouter()

@router.get("/dashboard")
def get_dashboard(user: dict = Depends(require_role("recruiter"))):
    return {"message": "Recruiter dashboard"}

@router.get("/candidates")
def get_candidates(user: dict = Depends(require_role("recruiter"))):
    return []

@router.post("/shortlist")
def shortlist_candidate(data: dict, user: dict = Depends(require_role("recruiter"))):
    return {"message": "Shortlisted"}
