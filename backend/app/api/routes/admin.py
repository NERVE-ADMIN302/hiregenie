from fastapi import APIRouter, Depends
from app.core.security import require_role
from app.core.database import get_supabase_admin

router = APIRouter()

@router.get("/dashboard")
def get_dashboard(user: dict = Depends(require_role("admin"))):
    return {"message": "Admin dashboard"}

@router.get("/users")
def get_users(user: dict = Depends(require_role("admin"))):
    db = get_supabase_admin()
    res = db.table('users').select('*').execute()
    return res.data

@router.get("/logs")
def get_logs(user: dict = Depends(require_role("admin"))):
    return []

@router.get("/jobs")
def get_jobs(user: dict = Depends(require_role("admin"))):
    db = get_supabase_admin()
    res = db.table('jobs').select('*').execute()
    return res.data

@router.put("/users/{id}/role")
def update_user_role(id: str, data: dict, user: dict = Depends(require_role("admin"))):
    db = get_supabase_admin()
    res = db.table('users').update({"role": data.get("role")}).eq('id', id).execute()
    return res.data[0] if res.data else None

@router.delete("/users/{id}")
def delete_user(id: str, user: dict = Depends(require_role("admin"))):
    db = get_supabase_admin()
    db.table('users').delete().eq('id', id).execute()
    return {"message": "User deleted"}
