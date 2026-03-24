@echo off
chcp 65001 >nul
cd /d "%~dp0"

where node >nul 2>nul
if errorlevel 1 (
  echo.
  echo [ERROR] Node.js nahi mila. Pehle install karein: https://nodejs.org  ^(LTS^)
  echo.
  pause
  exit /b 1
)

if not exist "node_modules\" (
  echo npm install chal raha hai ^(pehli dafa thoda time lag sakta hai^)...
  call npm install
  if errorlevel 1 (
    echo [ERROR] npm install fail ho gaya.
    pause
    exit /b 1
  )
)

echo.
echo === Vite ^(React^) start ho raha hai ===
echo Browser: http://localhost:5173
echo.
echo BACKEND: Pehle "start-backend.bat" chalayein ^(port 8080^), warna /api/* sync nahi hoga.
echo          Vite /api ko automatically 8080 par bhej deta hai.
echo.
echo NOTE: index.html direct / Live Server se mat chalayein.
echo.
call npm run dev
pause
