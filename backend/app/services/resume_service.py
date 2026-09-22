from app.core.database import get_supabase_admin
from fastapi import UploadFile

class ResumeService:
    def __init__(self):
        self.db = get_supabase_admin()

    def create_resume(self, user_id: str, data: dict):
        res = self.db.table('resumes').insert({"user_id": user_id, **data}).execute()
        return res.data[0] if res.data else None

    def get_user_resume(self, user_id: str):
        res = self.db.table('resumes').select('*').eq('user_id', user_id).execute()
        return res.data[0] if res.data else None

    def update_resume(self, resume_id: str, data: dict):
        res = self.db.table('resumes').update(data).eq('id', resume_id).execute()
        return res.data[0] if res.data else None

    def add_section_item(self, table: str, data: dict):
        res = self.db.table(table).insert(data).execute()
        return res.data[0] if res.data else None

    def delete_section_item(self, table: str, item_id: str):
        self.db.table(table).delete().eq('id', item_id).execute()
        return True

    def upload_file(self, user_id: str, file: UploadFile):
        # Mock file upload
        return {"url": "https://example.com/resume.pdf"}
