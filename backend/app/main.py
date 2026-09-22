from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings

from app.api.routes.auth import router as auth_router
from app.api.routes.users import router as users_router
from app.api.routes.resumes import router as resumes_router
from app.api.routes.ai import router as ai_router
from app.api.routes.jobs import router as jobs_router
from app.api.routes.applications import router as applications_router
from app.api.routes.analytics import router as analytics_router
from app.api.routes.recruiter import router as recruiter_router
from app.api.routes.placement import router as placement_router
from app.api.routes.admin import router as admin_router

app = FastAPI(title="HireGenie AI Backend")

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router, prefix="/api/auth", tags=["auth"])
app.include_router(users_router, prefix="/api/users", tags=["users"])
app.include_router(resumes_router, prefix="/api/resumes", tags=["resumes"])
app.include_router(ai_router, prefix="/api/ai", tags=["ai"])
app.include_router(jobs_router, prefix="/api/jobs", tags=["jobs"])
app.include_router(applications_router, prefix="/api/applications", tags=["applications"])
app.include_router(analytics_router, prefix="/api/analytics", tags=["analytics"])
app.include_router(recruiter_router, prefix="/api/recruiter", tags=["recruiter"])
app.include_router(placement_router, prefix="/api/placement", tags=["placement"])
app.include_router(admin_router, prefix="/api/admin", tags=["admin"])

@app.get("/api/health")
def health_check():
    return {"status": "ok"}
