@echo off
echo Starting AI Chatbot...
echo.

echo Installing Python dependencies...
pip install -r requirements.txt

echo.
echo Installing Node.js dependencies...
npm install

echo.
echo Starting backend server...
start "Backend Server" cmd /k "cd backend && python main.py"

echo.
echo Waiting 5 seconds for backend to start...
timeout /t 5 /nobreak > nul

echo.
echo Starting frontend...
start "Frontend Server" cmd /k "npm start"

echo.
echo Both servers are starting up!
echo Backend: http://localhost:8000
echo Frontend: http://localhost:3000
echo.
echo Press any key to exit...
pause > nul
