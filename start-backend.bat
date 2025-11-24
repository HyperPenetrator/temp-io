@echo off
echo ========================================
echo Starting WeatherAI Backend Server
echo ========================================
echo.

cd /d "%~dp0backend"

if not exist ".venv\Scripts\python.exe" (
    echo Error: Virtual environment not found!
    echo Please run setup first.
    pause
    exit /b 1
)

echo Starting FastAPI server on http://localhost:8000
echo API Documentation: http://localhost:8000/docs
echo.
echo Press Ctrl+C to stop the server
echo.

.venv\Scripts\python.exe -m uvicorn main:app --reload --port 8000
