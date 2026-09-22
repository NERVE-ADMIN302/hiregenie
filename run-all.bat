@echo off
title HireGenie AI Launcher
echo Launching HireGenie AI Backend and Frontend in separate terminals...
start "HireGenie AI - Backend" cmd /k "%~dp0run-backend.bat"
start "HireGenie AI - Frontend" cmd /k "%~dp0run-frontend.bat"
echo Done! Both servers are starting up.
