from fastapi import APIRouter, Depends, UploadFile, File
from app.core.security import get_current_user
from app.services.resume_service import ResumeService

router = APIRouter()
resume_service = ResumeService()

@router.post("/upload")
def upload_resume(file: UploadFile = File(...), user: dict = Depends(get_current_user)):
    return resume_service.upload_file(user['id'], file)

@router.get("/me")
def get_my_resume(user: dict = Depends(get_current_user)):
    return resume_service.get_user_resume(user['id'])

@router.put("/me")
def update_my_resume(data: dict, user: dict = Depends(get_current_user)):
    resume = resume_service.get_user_resume(user['id'])
    if not resume:
        return resume_service.create_resume(user['id'], data)
    return resume_service.update_resume(resume['id'], data)

@router.post("/me/{section}")
def add_section_item(section: str, data: dict, user: dict = Depends(get_current_user)):
    return resume_service.add_section_item(section, data)

@router.delete("/{section}/{item_id}")
def delete_section_item(section: str, item_id: str, user: dict = Depends(get_current_user)):
    return resume_service.delete_section_item(section, item_id)
