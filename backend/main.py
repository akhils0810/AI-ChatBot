from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import google.generativeai as genai
import os
from dotenv import load_dotenv
import uvicorn

# Load environment variables
load_dotenv()

app = FastAPI(title="AI Chatbot API", version="1.0.0")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with your frontend domain
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize Gemini client
api_key = os.getenv("GEMINI_API_KEY")
if not api_key:
    print("Warning: GEMINI_API_KEY not found in environment variables")
    print("Please create a .env file with your Gemini API key")
    genai.configure(api_key=None)
else:
    genai.configure(api_key=api_key)

class Message(BaseModel):
    role: str  # "user" or "assistant"
    content: str

class ChatRequest(BaseModel):
    messages: List[Message]
    model: Optional[str] = "gemini-1.5-flash"
    temperature: Optional[float] = 0.7
    max_tokens: Optional[int] = 1000

class ChatResponse(BaseModel):
    message: str
    usage: Optional[dict] = None

@app.get("/")
async def root():
    return {"message": "AI Chatbot API is running!"}

@app.post("/chat", response_model=ChatResponse)
async def chat(request: ChatRequest):
    try:
        # Check if API key is available
        if not api_key:
            raise HTTPException(status_code=500, detail="Gemini API key not configured")
        
        # Initialize the model
        model = genai.GenerativeModel("gemini-1.5-flash")
        
        # Get the last user message
        user_message = ""
        for msg in reversed(request.messages):
            if msg.role == "user":
                user_message = msg.content
                break
        
        if not user_message:
            raise HTTPException(status_code=400, detail="No user message found")
        
        # Generate response
        response = model.generate_content(
            user_message,
            generation_config=genai.types.GenerationConfig(
                temperature=request.temperature,
                max_output_tokens=request.max_tokens,
            )
        )
        
        # Format the response for better readability
        formatted_message = response.text
        
        # Add formatting for better readability
        import re
        
        # Make headings bold (lines that start with numbers, letters followed by colon, or common heading patterns)
        formatted_message = re.sub(r'^(\d+\.?\s+[A-Z][^:\n]*)(?=\n|$)', r'**\1**', formatted_message, flags=re.MULTILINE)
        formatted_message = re.sub(r'^([A-Z][^:\n]*:)(?=\n|$)', r'**\1**', formatted_message, flags=re.MULTILINE)
        formatted_message = re.sub(r'^([A-Z][A-Z\s]+)(?=\n|$)', r'**\1**', formatted_message, flags=re.MULTILINE)
        
        # Format mathematical formulas and equations
        # Make formulas more readable with proper spacing
        formatted_message = re.sub(r'(\w+)\s*=\s*([^=\n]+)', r'**\1** = \2', formatted_message)
        
        # Format mathematical expressions with better spacing
        formatted_message = re.sub(r'(\d+)\s*([+\-*/])\s*(\d+)', r'\1 \2 \3', formatted_message)
        formatted_message = re.sub(r'(\w+)\s*([+\-*/])\s*(\w+)', r'\1 \2 \3', formatted_message)
        
        # Format square roots and powers
        formatted_message = re.sub(r'√\[([^\]]+)\]', r'√[\1]', formatted_message)
        formatted_message = re.sub(r'(\w+)\^(\d+)', r'\1^\2', formatted_message)
        formatted_message = re.sub(r'(\w+)\^(\w+)', r'\1^\2', formatted_message)
        
        # Format fractions and divisions
        formatted_message = re.sub(r'(\w+)\s*/\s*(\w+)', r'\1/\2', formatted_message)
        
        # Format trigonometric functions
        formatted_message = re.sub(r'\b(arccos|arcsin|arctan|cos|sin|tan)\s*\(', r'**\1**(', formatted_message)
        
        # Add proper spacing around mathematical operators
        formatted_message = re.sub(r'([a-zA-Z0-9])\s*([+\-*/=])\s*([a-zA-Z0-9])', r'\1 \2 \3', formatted_message)
        
        # Format bullet points for better readability
        formatted_message = re.sub(r'^\s*[-*]\s*', r'• ', formatted_message, flags=re.MULTILINE)
        
        # Add line breaks for better spacing
        formatted_message = formatted_message.replace('\n\n', '\n\n')
        formatted_message = formatted_message.replace('**', '**')
        
        return ChatResponse(
            message=formatted_message,
            usage={"prompt_tokens": len(user_message), "completion_tokens": len(response.text)}
        )
    
    except Exception as e:
        print(f"Error in chat endpoint: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Error generating response: {str(e)}")

@app.get("/health")
async def health_check():
    return {"status": "healthy"}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
