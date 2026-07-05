@echo off
setlocal EnableExtensions
title SportSphere Frontend - http://localhost:3000
cd /d "%~dp0"

echo ========================================
echo   SportSphere Frontend
echo ========================================
echo.

where npm >nul 2>&1
if errorlevel 1 (
    echo [ERROR] npm not found. Install Node.js: https://nodejs.org
    goto :end
)

if not exist "node_modules\" (
    echo Installing dependencies...
    call npm install
    if errorlevel 1 (
        echo [ERROR] npm install failed.
        goto :end
    )
    echo.
)

echo Checking port 3000...
set "PORT_PID="
for /f "tokens=5" %%a in ('netstat -ano ^| findstr ":3000" ^| findstr "LISTENING"') do (
    set "PORT_PID=%%a"
    goto :found_port
)

:found_port
if defined PORT_PID (
    echo Port 3000 is in use by PID %PORT_PID%. Stopping old process...
    taskkill /F /PID %PORT_PID% >nul 2>&1
    ping 127.0.0.1 -n 3 >nul
)

echo Opening browser in a few seconds...
start "" cmd /c "ping 127.0.0.1 -n 11 >nul && start http://localhost:3000"

echo.
echo Starting server at http://localhost:3000
echo Press Ctrl+C to stop.
echo.

call npm run dev
set "EXIT_CODE=%ERRORLEVEL%"

if not "%EXIT_CODE%"=="0" (
    echo.
    echo [ERROR] Frontend failed to start.
)

:end
echo.
pause
endlocal
