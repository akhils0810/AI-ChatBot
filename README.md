# AI Chatbot - ChatGPT-like Interface

A modern, responsive AI chatbot built with FastAPI backend and React frontend, designed to be easily integrated into websites.

## Features

- 🤖 **AI-Powered Conversations**: Uses OpenAI's GPT models for intelligent responses
- 💬 **Modern Chat Interface**: Clean, responsive design similar to ChatGPT
- ⚡ **Real-time Messaging**: Fast API responses with typing indicators
- 🎨 **Beautiful UI**: Gradient backgrounds, smooth animations, and modern styling
- 📱 **Mobile Responsive**: Works perfectly on desktop and mobile devices
- 🔧 **Easy Integration**: Simple API endpoints for website integration
- 🛡️ **Error Handling**: Robust error handling and user feedback

## Tech Stack

### Backend
- **FastAPI**: Modern, fast web framework for building APIs
- **OpenAI API**: Integration with GPT models
- **Python 3.8+**: Core programming language
- **Uvicorn**: ASGI server for production deployment

### Frontend
- **React 18**: Modern React with hooks
- **CSS3**: Custom styling with gradients and animations
- **Lucide React**: Beautiful icons
- **Axios**: HTTP client for API calls

## Quick Start

### Prerequisites

- Python 3.8 or higher
- Node.js 16 or higher
- OpenAI API key

### 1. Clone and Setup

```bash
# Clone the repository
git clone <your-repo-url>
cd ai-chatbot

# Install Python dependencies
pip install -r requirements.txt

# Install Node.js dependencies
npm install
```

### 2. Environment Configuration

Create a `.env` file in the root directory:

```bash
# Copy the example file
cp env.example .env

# Edit .env and add your OpenAI API key
OPENAI_API_KEY=your_openai_api_key_here
```

### 3. Run the Application

#### Start the Backend (Terminal 1)
```bash
cd backend
python main.py
```
The API will be available at `http://localhost:8000`

#### Start the Frontend (Terminal 2)
```bash
npm start
```
The React app will be available at `http://localhost:3000`

## API Documentation

### Endpoints

#### `GET /`
Health check endpoint
```json
{
  "message": "AI Chatbot API is running!"
}
```

#### `POST /chat`
Send a message to the AI chatbot

**Request Body:**
```json
{
  "messages": [
    {
      "role": "user",
      "content": "Hello, how are you?"
    }
  ],
  "model": "gpt-3.5-turbo",
  "temperature": 0.7,
  "max_tokens": 1000
}
```

**Response:**
```json
{
  "message": "Hello! I'm doing well, thank you for asking. How can I help you today?",
  "usage": {
    "prompt_tokens": 15,
    "completion_tokens": 20,
    "total_tokens": 35
  }
}
```

#### `GET /health`
Health check endpoint
```json
{
  "status": "healthy"
}
```

## Website Integration

### Option 1: Embed as iframe
```html
<iframe 
  src="http://localhost:3000" 
  width="100%" 
  height="600px"
  frameborder="0">
</iframe>
```

### Option 2: API Integration
```javascript
// Example API call from your website
async function sendMessage(message) {
  const response = await fetch('http://localhost:8000/chat', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      messages: [{ role: 'user', content: message }],
      model: 'gpt-3.5-turbo'
    })
  });
  
  const data = await response.json();
  return data.message;
}
```

### Option 3: Custom Chat Widget
You can extract the chat components from the React app and integrate them directly into your website.

## Customization

### Styling
- Modify `src/App.css` to change colors, fonts, and layout
- Update gradient colors in the CSS variables
- Customize message bubbles and animations

### AI Model
- Change the default model in `backend/main.py`
- Adjust temperature and max_tokens for different response styles
- Add support for other AI providers

### Features
- Add message persistence with a database
- Implement user authentication
- Add file upload capabilities
- Include conversation history

## Deployment

### Backend Deployment (Heroku)
```bash
# Install Heroku CLI and login
heroku create your-chatbot-api
heroku config:set OPENAI_API_KEY=your_api_key
git push heroku main
```

### Frontend Deployment (Netlify/Vercel)
```bash
# Build the React app
npm run build

# Deploy the build folder to your hosting service
```

### Docker Deployment
```dockerfile
# Backend Dockerfile
FROM python:3.9-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY backend/ .
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
```

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `OPENAI_API_KEY` | Your OpenAI API key | Yes |
| `HOST` | Server host (default: 0.0.0.0) | No |
| `PORT` | Server port (default: 8000) | No |

## Troubleshooting

### Common Issues

1. **OpenAI API Key Error**
   - Ensure your API key is correctly set in the `.env` file
   - Check that you have sufficient credits in your OpenAI account

2. **CORS Issues**
   - The backend is configured to allow all origins in development
   - For production, update the CORS settings in `backend/main.py`

3. **Port Conflicts**
   - Backend runs on port 8000, frontend on port 3000
   - Change ports in the respective configuration files if needed

4. **Build Issues**
   - Ensure Node.js version 16+ is installed
   - Clear npm cache: `npm cache clean --force`
   - Delete node_modules and reinstall: `rm -rf node_modules && npm install`

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).

## Support

For support and questions:
- Create an issue in the repository
- Check the troubleshooting section
- Review the API documentation

---

**Happy Chatting! 🤖💬**
