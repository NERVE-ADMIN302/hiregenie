@echo off
title HireGenie AI - Backend
cd /d "%~dp0backend"
echo Starting HireGenie AI Backend...
call venv\Scripts\activate.bat
uvicorn app.main:app --reload --port 8000 --host 127.0.0.1
pause
