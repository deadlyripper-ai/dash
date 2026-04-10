@echo off
REM Inception Dashboard — Windows Starter

setlocal enabledelayedexpansion
set PORT=3000

echo.
echo 🚀 Starting Inception Dashboard...
echo 📊 Opening dashboard at: http://localhost:%PORT%
echo.
echo This window will stay open while the dashboard runs.
echo Press Ctrl+C to stop when you're done.
echo.

REM Check if Node.js is available
where node >nul 2>nul
if %ERRORLEVEL% EQU 0 (
    echo ✅ Using Node.js
    call npm start -- -p %PORT%
    pause
    exit /b %ERRORLEVEL%
)

REM Check if Python is available
where python >nul 2>nul
if %ERRORLEVEL% EQU 0 (
    echo ✅ Using Python
    python -m http.server %PORT%
    pause
    exit /b %ERRORLEVEL%
)

REM If neither found
echo ❌ Error: Python not found
echo.
echo Solution: Open Command Prompt and run:
echo   python -m http.server 3000
echo.
echo Then open your browser to: http://localhost:3000
echo.
pause
exit /b 1
