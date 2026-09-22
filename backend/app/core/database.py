from supabase import create_client, Client
from app.core.config import settings
from typing import Optional
import logging

logger = logging.getLogger(__name__)

def get_supabase_admin() -> Optional[Client]:
    if not settings.SUPABASE_URL or not settings.SUPABASE_SERVICE_ROLE_KEY:
        logger.warning("Supabase URL or Service Role Key missing.")
        return None
    try:
        return create_client(settings.SUPABASE_URL, settings.SUPABASE_SERVICE_ROLE_KEY)
    except Exception as e:
        logger.error(f"Error initializing Supabase admin client: {e}")
        return None

def get_supabase_client(token: str) -> Optional[Client]:
    if not settings.SUPABASE_URL or not settings.SUPABASE_ANON_KEY:
        logger.warning("Supabase URL or Anon Key missing.")
        return None
    try:
        client = create_client(settings.SUPABASE_URL, settings.SUPABASE_ANON_KEY)
        client.postgrest.auth(token)
        return client
    except Exception as e:
        logger.error(f"Error initializing Supabase client: {e}")
        return None
