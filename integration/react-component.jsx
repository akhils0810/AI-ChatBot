// React Component for Chatbot Integration
// Copy this component into your React project

import React, { useState, useRef, useEffect } from 'react';
import './ChatWidget.css'; // You'll need to create this CSS file

const API_BASE_URL = process.env.REACT_APP_CHATBOT_API_URL || 'http://localhost:8000';

const ChatWidget = ({ 
    isOpen = false, 
    onToggle, 
    position = 'bottom-right',
    title = 'AI Assistant',
    placeholder = 'Type your message...'
}) => {
    const [messages, setMessages] = useState([
        {
            role: 'assistant',
            content: 'Hello! I\'m your AI assistant. How can I help you today?'
        }
    ]);
    const [inputMessage, setInputMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const sendMessage = async () => {
        if (!inputMessage.trim() || isLoading) return;

        const userMessage = {
            role: 'user',
            content: inputMessage.trim()
        };

        setMessages(prev => [...prev, userMessage]);
        setInputMessage('');
        setIsLoading(true);

        try {
            const response = await fetch(`${API_BASE_URL}/chat`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    messages: [...messages, userMessage],
                    model: 'gemini-1.5-flash'
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to get response from AI');
            }

            const data = await response.json();
            setMessages(prev => [...prev, {
                role: 'assistant',
                content: data.message
            }]);
        } catch (error) {
            console.error('Error:', error);
            setMessages(prev => [...prev, {
                role: 'assistant',
                content: 'Sorry, I encountered an error. Please try again.'
            }]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    };

    const formatMessage = (content) => {
        return content.split('**').map((part, index) => 
            index % 2 === 1 ? <strong key={index}>{part}</strong> : part
        );
    };

    return (
        <div className={`chat-widget ${position} ${isOpen ? 'open' : 'closed'}`}>
            {!isOpen && (
                <button className="chat-toggle-btn" onClick={onToggle}>
                    💬
                </button>
            )}
            
            {isOpen && (
                <div className="chat-container">
                    <div className="chat-header">
                        <h3>{title}</h3>
                        <button className="close-btn" onClick={onToggle}>×</button>
                    </div>
                    
                    <div className="messages-container">
                        {messages.map((message, index) => (
                            <div key={index} className={`message ${message.role}`}>
                                <div className="message-content">
                                    <div className="message-text">
                                        {formatMessage(message.content)}
                                    </div>
                                </div>
                            </div>
                        ))}
                        
                        {isLoading && (
                            <div className="message assistant loading">
                                <div className="message-content">
                                    <div className="message-text">
                                        <span className="typing-indicator">AI is thinking...</span>
                                    </div>
                                </div>
                            </div>
                        )}
                        
                        <div ref={messagesEndRef} />
                    </div>
                    
                    <div className="input-container">
                        <textarea
                            value={inputMessage}
                            onChange={(e) => setInputMessage(e.target.value)}
                            onKeyPress={handleKeyPress}
                            placeholder={placeholder}
                            className="message-input"
                            rows="1"
                            disabled={isLoading}
                        />
                        <button
                            onClick={sendMessage}
                            disabled={!inputMessage.trim() || isLoading}
                            className="send-button"
                        >
                            ➤
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ChatWidget;

// Usage in your main App component:
/*
import React, { useState } from 'react';
import ChatWidget from './components/ChatWidget';

function App() {
    const [isChatOpen, setIsChatOpen] = useState(false);

    return (
        <div className="App">
            // Your existing app content
            <h1>My Website</h1>
            <p>Your content here...</p>
            
            // Chatbot integration
            <ChatWidget 
                isOpen={isChatOpen}
                onToggle={() => setIsChatOpen(!isChatOpen)}
                position="bottom-right"
                title="AI Assistant"
            />
        </div>
    );
}

export default App;
*/
