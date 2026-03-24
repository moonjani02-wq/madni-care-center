@echo off
chcp 65001 >nul
cd /d "%~dp0"
echo.
echo === Backend with CORS ^(* = koi bhi website se API^) ===
echo React/static site agar localhost:8080 se ALAAG domain par ho ^(Netlify etc.^)
echo to yeh script use karein. Phir .env.production mein VITE_API_BASE_URL = is machine ka public API URL.
echo.
echo SECURITY: production mein * ki jagah sirf apni site ka URL dein:
echo   powershell -File server.ps1 -CorsOrigin "https://aapki-site.netlify.app"
echo.
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0server.ps1" -CorsOrigin "*"
pause
