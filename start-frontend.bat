@echo off
echo ========================================
echo Starting WeatherAI Frontend Server
echo ========================================
echo.

cd /d "%~dp0frontend"

if not exist "node_modules" (
    echo Error: Node modules not found!
    echo Please run: npm install
    pause
    exit /b 1
)

echo Starting Vite dev server...
echo Frontend will be available at: http://localhost:5173
echo.
echo Press Ctrl+C to stop the server
echo.

cmd /c "npm run dev"
