
import React from 'react';
import { Bot, User } from 'lucide-react';

interface ChatMessageProps {
  message: string;
  isBot: boolean;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message, isBot }) => {
  return (
    <div className={`flex gap-3 ${isBot ? 'bg-white' : 'bg-[#f7f7f8]'} p-4 rounded-lg`}>
      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${isBot ? 'bg-primary/10 text-primary' : 'bg-secondary'}`}>
        {isBot ? <Bot size={20} /> : <User size={20} />}
      </div>
      <div className="flex-1">
        <p className="text-sm text-foreground/90 leading-relaxed">{message}</p>
      </div>
    </div>
  );
};

export default ChatMessage;
