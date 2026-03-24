@echo off
chcp 65001 >nul
cd /d "%~dp0"

where node >nul 2>nul
if errorlevel 1 (
  echo [ERROR] Node.js nahi mila. Install: https://nodejs.org ^(LTS^)
  pause
  exit /b 1
)

if not exist "node_modules\" (
  echo npm install...
  call npm install
  if errorlevel 1 exit /b 1
)

echo.
echo === Production build ^(npm run build^) ===
echo.
echo GitHub Pages ^(project site^): pehle .env.production bana kar likhein:
echo   VITE_BASE=/YourRepoName/
echo phir yeh script dubara chalayein.
echo.
echo Live API alag domain par ho to .env.production:
echo   VITE_API_BASE_URL=https://api.aapka-domain.com
echo ^(trailing slash na ho^)
echo.
call npm run build
if errorlevel 1 (
  echo [ERROR] Build fail.
  pause
  exit /b 1
)

echo.
echo === Tayar ===
echo Folder ^"dist^" ki poori files host par upload karein ^(Netlify/Vercel/cPanel^).
echo Netlify/Vercel: repo connect karein ^(netlify.toml / vercel.json pehle se hain^).
echo.
pause
