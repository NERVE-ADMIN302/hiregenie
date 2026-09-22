import os

base_dir = "C:/Users/HARIPRASAD K/Desktop/PROJECT-AFTERHOURS/hiregenie-ai"

schema_sql = """-- schema.sql
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    role VARCHAR(50) DEFAULT 'student',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE resumes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    profile_id UUID REFERENCES profiles(id),
    content TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Placeholder for other tables as requested
CREATE TABLE jobs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255),
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
"""

files_to_write = {
    f"{base_dir}/database/schema.sql": schema_sql,
    f"{base_dir}/backend/requirements.txt": "fastapi\nuvicorn\npydantic\npydantic-settings\nsupabase\npython-jose\npython-multipart\ngoogle-generativeai\nhttpx\n",
    f"{base_dir}/backend/.env.example": "SUPABASE_URL=YOUR_SUPABASE_URL\nSUPABASE_KEY=YOUR_SUPABASE_KEY\nGEMINI_API_KEY=YOUR_GEMINI_API_KEY\nSECRET_KEY=YOUR_SECRET_KEY\n",
    f"{base_dir}/backend/Procfile": "web: uvicorn app.main:app --host 0.0.0.0 --port $PORT",
    f"{base_dir}/backend/app/__init__.py": "",
    f"{base_dir}/backend/app/core/__init__.py": "",
    f"{base_dir}/backend/app/api/__init__.py": "",
    f"{base_dir}/backend/app/api/routes/__init__.py": "",
    f"{base_dir}/backend/app/models/__init__.py": "",
    f"{base_dir}/backend/app/services/__init__.py": "",
    
    f"{base_dir}/backend/app/core/config.py": """from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    SUPABASE_URL: str = "placeholder_url"
    SUPABASE_KEY: str = "placeholder_key"
    GEMINI_API_KEY: str = "placeholder_gemini"
    SECRET_KEY: str = "placeholder_secret"
    
    class Config:
        env_file = ".env"

settings = Settings()
""",
    f"{base_dir}/backend/app/main.py": """from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.routes import auth, users, resumes, ai, jobs, applications, analytics, recruiter, placement, admin

app = FastAPI(title="HireGenie AI Backend")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def health_check():
    return {"status": "ok"}
""",
    f"{base_dir}/backend/app/api/routes/auth.py": """from fastapi import APIRouter
router = APIRouter()
@router.post("/login")
def login():
    return {"token": "fake-jwt-token"}
""",
    f"{base_dir}/backend/app/api/routes/users.py": "from fastapi import APIRouter\nrouter = APIRouter()\n",
    f"{base_dir}/backend/app/api/routes/resumes.py": "from fastapi import APIRouter\nrouter = APIRouter()\n",
    f"{base_dir}/backend/app/api/routes/ai.py": "from fastapi import APIRouter\nrouter = APIRouter()\n",
    f"{base_dir}/backend/app/api/routes/jobs.py": "from fastapi import APIRouter\nrouter = APIRouter()\n",
    f"{base_dir}/backend/app/api/routes/applications.py": "from fastapi import APIRouter\nrouter = APIRouter()\n",
    f"{base_dir}/backend/app/api/routes/analytics.py": "from fastapi import APIRouter\nrouter = APIRouter()\n",
    f"{base_dir}/backend/app/api/routes/recruiter.py": "from fastapi import APIRouter\nrouter = APIRouter()\n",
    f"{base_dir}/backend/app/api/routes/placement.py": "from fastapi import APIRouter\nrouter = APIRouter()\n",
    f"{base_dir}/backend/app/api/routes/admin.py": "from fastapi import APIRouter\nrouter = APIRouter()\n",
}

for path, content in files_to_write.items():
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, "w", encoding="utf-8") as f:
        f.write(content)

print("Files generated successfully.")
