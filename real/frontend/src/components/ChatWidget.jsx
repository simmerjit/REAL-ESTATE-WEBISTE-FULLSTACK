import React, { useState } from 'react';
import '../styles/ChatWidget.css';

import Chatbot from '../components/Chatbot';    

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleChat = () => setIsOpen(prev => !prev);

  return (
    <div className="chat-widget-container">
      {isOpen && (
        <div className="chat-window">
          <div className="chat-header">
            <span>Chat with us</span>
            <button
              className="chat-close-button"
              onClick={toggleChat}
              aria-label="Close chat"
            >
              &times;
            </button>
          </div>
          <Chatbot />
        </div>
      )}

      <button
        className="chat-icon"
        onClick={toggleChat}
        aria-label="Open chat"
      >
        💬
      </button>
    </div>
  );
};

export default ChatWidget;
