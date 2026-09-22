from app.services.ai_service import AIService
from app.core.database import get_supabase_admin

class ATSService:
    def __init__(self):
        self.ai_service = AIService()
        self.db = get_supabase_admin()

    def run_analysis(self, user_id: str, resume_text: str, job_description: str = ""):
        result = self.ai_service.analyze_ats(resume_text, job_description)
        # Store history
        self.db.table('ats_history').insert({
            "user_id": user_id,
            "job_description": job_description,
            "match_score": result.get("match_score", 0),
            "details": result
        }).execute()
        return result

    def get_history(self, user_id: str):
        res = self.db.table('ats_history').select('*').eq('user_id', user_id).execute()
        return res.data
