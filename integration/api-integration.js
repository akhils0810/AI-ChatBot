// API Integration Example for your existing project
// Replace 'http://localhost:8000' with your deployed backend URL

class ChatbotAPI {
    constructor(apiUrl = 'http://localhost:8000') {
        this.apiUrl = apiUrl;
        this.conversationHistory = [];
    }

    async sendMessage(message) {
        try {
            // Add user message to history
            this.conversationHistory.push({ role: 'user', content: message });

            const response = await fetch(`${this.apiUrl}/chat`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    messages: this.conversationHistory,
                    model: 'gemini-1.5-flash',
                    temperature: 0.7,
                    max_tokens: 1000
                })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            
            // Add assistant response to history
            this.conversationHistory.push({ role: 'assistant', content: data.message });
            
            return data.message;
        } catch (error) {
            console.error('Error sending message:', error);
            return 'Sorry, I encountered an error. Please try again.';
        }
    }

    clearHistory() {
        this.conversationHistory = [];
    }

    getHistory() {
        return this.conversationHistory;
    }
}

// Usage Examples:

// Example 1: Simple integration
const chatbot = new ChatbotAPI();

async function handleUserInput() {
    const userInput = document.getElementById('userInput').value;
    const response = await chatbot.sendMessage(userInput);
    document.getElementById('response').innerHTML = response;
}

// Example 2: React Component Integration
/*
import React, { useState } from 'react';

function ChatWidget() {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const chatbot = new ChatbotAPI();

    const sendMessage = async () => {
        if (!input.trim()) return;
        
        setIsLoading(true);
        const response = await chatbot.sendMessage(input);
        
        setMessages(prev => [
            ...prev,
            { role: 'user', content: input },
            { role: 'assistant', content: response }
        ]);
        
        setInput('');
        setIsLoading(false);
    };

    return (
        <div className="chat-widget">
            <div className="messages">
                {messages.map((msg, index) => (
                    <div key={index} className={`message ${msg.role}`}>
                        {msg.content}
                    </div>
                ))}
            </div>
            <div className="input-area">
                <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                    placeholder="Type your message..."
                />
                <button onClick={sendMessage} disabled={isLoading}>
                    {isLoading ? 'Sending...' : 'Send'}
                </button>
            </div>
        </div>
    );
}
*/

// Example 3: jQuery Integration
/*
$(document).ready(function() {
    const chatbot = new ChatbotAPI();
    
    $('#sendBtn').click(async function() {
        const message = $('#messageInput').val();
        const response = await chatbot.sendMessage(message);
        $('#chatContainer').append(`<div class="user-message">${message}</div>`);
        $('#chatContainer').append(`<div class="bot-message">${response}</div>`);
        $('#messageInput').val('');
    });
});
*/

// Example 4: Vue.js Integration
/*
export default {
    data() {
        return {
            messages: [],
            input: '',
            isLoading: false,
            chatbot: new ChatbotAPI()
        }
    },
    methods: {
        async sendMessage() {
            if (!this.input.trim()) return;
            
            this.isLoading = true;
            const response = await this.chatbot.sendMessage(this.input);
            
            this.messages.push(
                { role: 'user', content: this.input },
                { role: 'assistant', content: response }
            );
            
            this.input = '';
            this.isLoading = false;
        }
    }
}
*/

// Export for use in modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ChatbotAPI;
}
