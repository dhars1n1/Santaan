'use client';

import { useState } from 'react';
import { Navbar } from '@/components/ui/Navbar';
import { FAQPopup } from '@/components/ui/faq-popup';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showFAQs, setShowFAQs] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState<string | undefined>(undefined);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message
    const userMessage: Message = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // Send GET request to backend
      const response = await fetch(`/api/chat?question=${encodeURIComponent(input)}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to get response');
      }

      // Add assistant message
      const assistantMessage: Message = { role: 'assistant', content: data.answer };
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error:', error);
      const errorMessage: Message = {
        role: 'assistant',
        content: 'Sorry, I encountered an error while processing your request.'
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleTopicClick = (topic: string) => {
    setSelectedTopic(topic);
    setShowFAQs(true);
  };

  const handleSelectQuestion = (question: string) => {
    setInput(question);
    setShowFAQs(false);
  };

  return (
    <div className="h-screen flex">
      {showFAQs && (
        <FAQPopup
          topic={selectedTopic || 'General'}
          onSelectQuestion={handleSelectQuestion}
          onClose={() => setShowFAQs(false)}
        />
      )}
      <div className="flex-1 flex flex-col">
        <Navbar />
        <main className="flex-1 max-w-3xl mx-auto p-4 overflow-hidden">
          <div className="flex-1 overflow-y-auto mb-4 space-y-4 h-[calc(100vh-12rem)]">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg ${
                  message.role === 'user'
                    ? 'bg-blue-100 ml-auto max-w-[80%]'
                    : 'bg-gray-100 mr-auto max-w-[80%]'
                }`}
              >
                {message.content}
              </div>
            ))}
            {isLoading && (
              <div className="bg-gray-100 p-4 rounded-lg mr-auto">
                Thinking...
              </div>
            )}
          </div>

          <form onSubmit={handleSubmit} className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your medical question..."
              className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-blue-300"
            >
              Send
            </button>
          </form>
        </main>
      </div>
    </div>
  );
}
