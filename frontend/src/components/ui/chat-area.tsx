import React, { useState } from 'react';
import { Send, Loader2 } from 'lucide-react';

interface ChatAreaProps {
  onMessageChange?: (message: string) => void;
  message?: string;
}

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export const ChatArea: React.FC<ChatAreaProps> = ({ 
  onMessageChange,
  message: externalMessage 
}) => {
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);

  const handleMessageChange = (newMessage: string) => {
    setMessage(newMessage);
    onMessageChange?.(newMessage);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const messageToSend = externalMessage || message;
    if (!messageToSend.trim()) return;

    // Add user message to chat
    const userMessage: ChatMessage = { role: 'user', content: messageToSend };
    setChatHistory(prev => [...prev, userMessage]);
    handleMessageChange('');
    setIsLoading(true);

    try {
      const response = await fetch(`http://localhost:5000/api/chat?question=${encodeURIComponent(messageToSend)}`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const aiMessage: ChatMessage = { 
        role: 'assistant', 
        content: data.answer || 'Sorry, I could not process your request.' 
      };
      setChatHistory(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage: ChatMessage = {
        role: 'assistant',
        content: 'Sorry, there was an error processing your message. Please try again.'
      };
      setChatHistory(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  // Use external message if provided, otherwise use internal state
  const displayMessage = externalMessage !== undefined ? externalMessage : message;

  return (
    <div className="flex flex-col h-full w-full">
      {/* Chat Messages Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4 w-full max-w-7xl mx-auto">
        {chatHistory.map((chat, index) => (
          <div
            key={index}
            className={`flex ${chat.role === 'user' ? 'justify-end' : 'justify-start'} w-full`}
          >
            <div
              className={`max-w-[70%] rounded-lg p-4 ${
                chat.role === 'user'
                  ? 'bg-blue-500 text-white ml-4'
                  : 'bg-gray-100 text-gray-900 mr-4'
              }`}
            >
              {chat.content}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start w-full">
            <div className="bg-gray-100 rounded-lg p-4">
              <Loader2 className="h-6 w-6 animate-spin" />
            </div>
          </div>
        )}
      </div>

      {/* Chat Input Area */}
      <div className="border-t w-full">
        <div className="max-w-7xl mx-auto w-full p-6">
          <form onSubmit={handleSubmit} className="flex space-x-4 w-full">
            <input
              type="text"
              value={displayMessage}
              onChange={(e) => handleMessageChange(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 min-w-0 rounded-lg border border-gray-300 px-6 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
            />
            <button
              type="submit"
              disabled={isLoading || !displayMessage.trim()}
              className="bg-blue-500 text-white rounded-lg px-8 py-4 hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <Loader2 className="h-6 w-6 animate-spin" />
              ) : (
                <Send className="h-6 w-6" />
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
