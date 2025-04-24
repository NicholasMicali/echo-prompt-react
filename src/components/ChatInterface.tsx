
import React, { useState, useRef, useEffect } from 'react';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import { useToast } from "@/components/ui/use-toast";
import { School } from 'lucide-react';

interface Message {
  text: string;
  isBot: boolean;
}

const apiKey = ''; // import.meta.env.VITE_OPENAI_API_KEY;


const ChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (message: string) => {
    setMessages(prev => [...prev, { text: message, isBot: false }]);
    setIsLoading(true);

    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: [
            {
              role: 'system',
              content: 'You are a Boston University expert. Only answer questions related to Boston University, its programs, campus life, history, faculty, research, and student services. If a question is not related to Boston University, politely redirect the user to ask BU-specific questions.'
            },
            { role: 'user', content: message }
          ],
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          `API request failed with status ${response.status}: ${errorData.error?.message || 'Unknown error'}`
        );
      }

      const data = await response.json();
      const botResponse = data.choices[0].message.content;

      setMessages(prev => [...prev, { text: botResponse, isBot: true }]);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to get response from AI. Please try again.",
      });
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen max-w-3xl mx-auto">
      <header className="text-center py-8 bg-[#CC0000]">
        <div className="flex items-center justify-center gap-2 mb-2">
          <School className="text-white" size={24} />
          <h1 className="text-2xl font-semibold text-white">BU Chat Assistant</h1>
        </div>
        <p className="text-white/90">Ask me anything about Boston University!</p>
      </header>
      
      <div className="flex-1 overflow-y-auto px-4 bg-[#F5F5F5]">
        <div className="space-y-4 pb-4">
          {messages.map((message, index) => (
            <ChatMessage
              key={index}
              message={message.text}
              isBot={message.isBot}
            />
          ))}
          {isLoading && (
            <div className="flex justify-center">
              <div className="animate-pulse text-[#CC0000]">Processing...</div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      <div className="p-4 border-t bg-white">
        <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
      </div>
    </div>
  );
};

export default ChatInterface;
