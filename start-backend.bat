@echo off
chcp 65001 >nul
cd /d "%~dp0"
echo.
echo === Madni backend (PowerShell) ===
echo URL: http://localhost:8080
echo API: http://localhost:8080/api/pricing-overrides  (GET)
echo      http://localhost:8080/api/user-products      (GET)
echo Admin (HTML): http://localhost:8080/admin
echo.
echo React app alag se chalayein: dev.bat  ^(npm run dev^)
echo — Vite :5173 se /api/* yahi server par proxy ho jata hai.
echo.
echo Band karne ke liye is window mein Ctrl+C dabayein.
echo.
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0server.ps1"
pause
