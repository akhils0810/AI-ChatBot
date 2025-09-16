# AI Chatbot (Google Gemini)

FastAPI + React chatbot powered by Google Gemini.

## Quick Start

1) Setup
```bash
pip install -r requirements.txt
npm install
cp env.example .env  # then set GEMINI_API_KEY
```

2) Run
```bash
# Backend
cd backend && python main.py

# Frontend (new terminal)
npm start
```

## API

- POST `/chat`
```json
{
  "messages": [{"role": "user", "content": "Hello"}],
  "model": "gemini-1.5-flash",
  "temperature": 0.7,
  "max_tokens": 1000
}
```

## Env

- `GEMINI_API_KEY` (required)
- `HOST` (default 0.0.0.0)
- `PORT` (default 8000)

## Notes

- Default model: `gemini-1.5-flash`
- Update CORS in `backend/main.py` for production
