#!/bin/bash

echo "Starting AI Chatbot..."
echo

echo "Installing Python dependencies..."
pip install -r requirements.txt

echo
echo "Installing Node.js dependencies..."
npm install

echo
echo "Starting backend server..."
cd backend && python main.py &
BACKEND_PID=$!

echo
echo "Waiting 5 seconds for backend to start..."
sleep 5

echo
echo "Starting frontend..."
npm start &
FRONTEND_PID=$!

echo
echo "Both servers are starting up!"
echo "Backend: http://localhost:8000"
echo "Frontend: http://localhost:3000"
echo
echo "Press Ctrl+C to stop both servers"

# Function to cleanup background processes
cleanup() {
    echo
    echo "Stopping servers..."
    kill $BACKEND_PID 2>/dev/null
    kill $FRONTEND_PID 2>/dev/null
    exit 0
}

# Trap Ctrl+C
trap cleanup SIGINT

# Wait for user to stop
wait
