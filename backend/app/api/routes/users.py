from fastapi import APIRouter, Depends
from app.core.security import get_current_user
from app.models.user import UserUpdate
from app.core.database import get_supabase_admin

router = APIRouter()

@router.get("/me")
def get_me(user: dict = Depends(get_current_user)):
    return user

@router.put("/me")
def update_me(data: UserUpdate, user: dict = Depends(get_current_user)):
    db = get_supabase_admin()
    update_data = {k: v for k, v in data.model_dump().items() if v is not None}
    res = db.table('users').update(update_data).eq('id', user['id']).execute()
    return res.data[0] if res.data else None

@router.get("/{user_id}")
def get_user(user_id: str):
    db = get_supabase_admin()
    res = db.table('users').select('*').eq('id', user_id).execute()
    return res.data[0] if res.data else None
