from app.core.database import get_supabase_admin

class JobService:
    def __init__(self):
        self.db = get_supabase_admin()

    def create_job(self, data: dict, created_by: str):
        res = self.db.table('jobs').insert({"created_by": created_by, **data}).execute()
        return res.data[0] if res.data else None

    def list_jobs(self, filters: dict = None):
        query = self.db.table('jobs').select('*')
        if filters:
            for k, v in filters.items():
                if v: query = query.eq(k, v)
        res = query.execute()
        return res.data

    def get_job(self, job_id: str):
        res = self.db.table('jobs').select('*').eq('id', job_id).execute()
        return res.data[0] if res.data else None

    def update_job(self, job_id: str, data: dict):
        res = self.db.table('jobs').update(data).eq('id', job_id).execute()
        return res.data[0] if res.data else None

    def delete_job(self, job_id: str):
        self.db.table('jobs').delete().eq('id', job_id).execute()
        return True

    def get_recommended(self, user_id: str):
        return self.list_jobs()

    def toggle_bookmark(self, user_id: str, job_id: str):
        return True

    def apply_to_job(self, user_id: str, job_id: str, cover_letter_id: str = None):
        res = self.db.table('applications').insert({
            "user_id": user_id, "job_id": job_id, "cover_letter_id": cover_letter_id, "status": "applied"
        }).execute()
        return res.data[0] if res.data else None

    def get_applications(self, user_id: str = None, job_id: str = None):
        query = self.db.table('applications').select('*')
        if user_id: query = query.eq('user_id', user_id)
        if job_id: query = query.eq('job_id', job_id)
        res = query.execute()
        return res.data

    def update_status(self, application_id: str, status: str):
        res = self.db.table('applications').update({"status": status}).eq('id', application_id).execute()
        return res.data[0] if res.data else None
