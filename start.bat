@echo off
echo ========================================
echo   Chat Bot Setup - Powered by Groq
echo ========================================
echo.

REM Check if .env.local exists
if not exist .env.local (
    echo [WARNING] .env.local file not found!
    echo.
    echo Please create .env.local file with:
    echo GROQ_API_KEY=gsk_your_api_key_here
    echo.
    echo Get your FREE API key at: https://console.groq.com
    echo.
    pause
    exit /b 1
)

echo [1/2] Installing dependencies...
call npm install

if %ERRORLEVEL% NEQ 0 (
    echo.
    echo [ERROR] Failed to install dependencies
    pause
    exit /b 1
)

echo.
echo [2/2] Starting development server...
echo.
echo ========================================
echo   Chat Bot is starting!
echo   Open: http://localhost:3000
echo   Press Ctrl+C to stop
echo ========================================
echo.

call npm run dev
