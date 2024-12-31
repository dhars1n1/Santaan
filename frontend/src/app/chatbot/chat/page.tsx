'use client';

import { useState } from 'react';
import { Navbar } from '@/components/ui/Navbar';
import { FAQPopup } from '@/components/ui/faq-popup';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  articles: PubMedArticle[];
}

interface PubMedArticle {
  Topic: string;
  URL: string;
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showFAQs, setShowFAQs] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState<string | undefined>(undefined);

  // Simulated function to fetch PubMed articles based on input
  const fetchArticlesForInput = async (query: string): Promise<PubMedArticle[]> => {
    try {
      console.log('Fetching PubMed articles...');
      const response = await fetch(`/fetch-pubmed?topics=${encodeURIComponent('IVF')}&topics=${encodeURIComponent(query)}`);
      if (!response.ok) throw new Error('Failed to fetch PubMed articles');
      const data = await response.json();
      return data.data || [];
    } catch (error) {
      console.error('Error fetching PubMed articles:', error);
      return [];
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    console.log('User input:', input);

    // Add user message
    const userMessage: Message = {
      role: 'user',
      content: input,
      articles: []
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      console.log('Fetching chat response and PubMed articles...');

      // Fetch chat answer and PubMed articles concurrently
      const [chatResponse, articles] = await Promise.all([
        fetch(`/api/chat?question=${encodeURIComponent(input)}`).then((res) => res.json()),
        fetchArticlesForInput(input)
      ]);

      if (!chatResponse || !chatResponse.answer) {
        throw new Error(chatResponse.error || 'Failed to get chat response');
      }

      console.log('Chat response:', chatResponse);
      console.log('Related PubMed articles:', articles);

      // Add assistant message with fetched articles
      const assistantMessage: Message = {
        role: 'assistant',
        content: chatResponse.answer,
        articles
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error occurred:', error);
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: 'Sorry, I encountered an error while processing your request.',
          articles: []
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-screen flex">
      {showFAQs && (
        <FAQPopup
          topic={selectedTopic || 'General'}
          onSelectQuestion={(question) => {
            console.log('FAQ Selected Question:', question);
            setInput(question);
            setShowFAQs(false);
          }}
          onClose={() => setShowFAQs(false)}
        />
      )}

      <div className="flex-1 flex flex-col">
        <Navbar />
        <main className="flex-1 max-w-3xl mx-auto p-4 overflow-hidden">
          <div className="flex-1 overflow-y-auto mb-4 space-y-4 h-[calc(100vh-12rem)]">
            {messages.map((message, index) => (
              <div key={index} className="space-y-2">
                <div
                  className={`p-4 rounded-lg ${
                    message.role === 'user'
                      ? 'bg-blue-100 ml-auto max-w-[80%]'
                      : 'bg-gray-100 mr-auto max-w-[80%]'
                  }`}
                >
                  {message.content}
                </div>

                {/* Embedded PubMed Articles */}
                {message.articles?.length > 0 && (
                  <div className="space-y-2 mr-auto max-w-[80%]">
                    <h4 className="text-sm font-semibold mb-2 text-gray-600">
                      Related PubMed Articles:
                    </h4>
                    <div className="grid gap-3">
                      {message.articles.map((article, articleIndex) => (
                        <div
                          key={articleIndex}
                          className="p-4 border border-gray-300 rounded-lg shadow-sm bg-white hover:shadow-md transition-shadow"
                        >
                          <h5 className="font-medium text-gray-800 mb-1">
                            {article.Topic}
                          </h5>
                          <a
                            href={article.URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-500 text-sm hover:underline"
                          >
                            View Article
                          </a>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
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
