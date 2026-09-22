from fastapi import APIRouter, Depends
from app.core.security import require_role

router = APIRouter()

@router.get("/dashboard")
def get_dashboard(user: dict = Depends(require_role("placement_officer"))):
    return {"message": "Placement dashboard"}

@router.get("/students")
def get_students(user: dict = Depends(require_role("placement_officer"))):
    return []

@router.get("/eligible")
def get_eligible(user: dict = Depends(require_role("placement_officer"))):
    return []

@router.get("/reports/department")
def report_department(user: dict = Depends(require_role("placement_officer"))):
    return []

@router.get("/reports/company")
def report_company(user: dict = Depends(require_role("placement_officer"))):
    return []
