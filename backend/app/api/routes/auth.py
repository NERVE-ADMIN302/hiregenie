from fastapi import APIRouter, Depends, HTTPException, status
from app.models.user import UserCreate
from pydantic import BaseModel
from app.core.database import get_supabase_admin

router = APIRouter()

class Login(BaseModel):
    email: str
    password: str

@router.post("/signup")
def signup(user: UserCreate):
    db = get_supabase_admin()
    try:
        res = db.auth.sign_up({
            "email": user.email,
            "password": user.password
        })
        if res.user:
            db.table('users').insert({
                "id": res.user.id,
                "email": user.email,
                "full_name": user.full_name,
                "role": user.role
            }).execute()
        return res
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.post("/login")
def login(creds: Login):
    db = get_supabase_admin()
    try:
        res = db.auth.sign_in_with_password({
            "email": creds.email,
            "password": creds.password
        })
        return res
    except Exception as e:
        raise HTTPException(status_code=401, detail="Invalid credentials")

@router.post("/logout")
def logout():
    return {"message": "Logged out successfully"}

@router.post("/refresh")
def refresh():
    return {"message": "Token refreshed"}
