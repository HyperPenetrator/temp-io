@echo off
echo ========================================
echo WeatherAI - Initial Setup
echo ========================================
echo.

echo [1/3] Setting up Backend...
cd /d "%~dp0backend"

if not exist ".venv" (
    echo Creating virtual environment...
    python -m venv .venv
    if errorlevel 1 (
        echo Error: Failed to create virtual environment
        pause
        exit /b 1
    )
)

echo Installing Python dependencies...
.venv\Scripts\python.exe -m pip install --upgrade pip
.venv\Scripts\python.exe -m pip install -r requirements.txt
if errorlevel 1 (
    echo Error: Failed to install Python dependencies
    pause
    exit /b 1
)

echo.
echo [2/3] Setting up Frontend...
cd /d "%~dp0frontend"

if not exist "node_modules" (
    echo Installing Node dependencies...
    cmd /c "npm install"
    if errorlevel 1 (
        echo Error: Failed to install Node dependencies
        pause
        exit /b 1
    )
)

echo.
echo [3/3] Creating data directory...
cd /d "%~dp0"
if not exist "data" mkdir data

echo.
echo ========================================
echo Setup Complete!
echo ========================================
echo.
echo To start the application:
echo   1. Run: start-backend.bat
echo   2. Run: start-frontend.bat (in a new terminal)
echo   3. Open: http://localhost:5173
echo.
echo Optional: Add OpenAI API key to backend\.env for AI features
echo.
pause
