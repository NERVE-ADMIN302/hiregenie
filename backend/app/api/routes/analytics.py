from fastapi import APIRouter, Depends
from app.core.security import get_current_user, require_role

router = APIRouter()

@router.get("/student")
def student_analytics(user: dict = Depends(require_role("student"))):
    return {"message": "Student analytics data"}

@router.get("/placement")
def placement_analytics(user: dict = Depends(require_role("placement_officer"))):
    return {"message": "Placement analytics data"}

@router.get("/system")
def system_analytics(user: dict = Depends(require_role("admin"))):
    return {"message": "System analytics data"}
