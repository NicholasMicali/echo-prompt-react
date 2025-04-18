
import React from 'react';
import { Bot, User } from 'lucide-react';

interface ChatMessageProps {
  message: string;
  isBot: boolean;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message, isBot }) => {
  return (
    <div className={`flex gap-3 ${isBot ? 'bg-white' : 'bg-[#F5F5F5]'} p-4 rounded-lg shadow-sm`}>
      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${isBot ? 'bg-[#CC0000]/10 text-[#CC0000]' : 'bg-[#CC0000]'}`}>
        {isBot ? <Bot size={20} /> : <User size={20} className="text-white" />}
      </div>
      <div className="flex-1">
        <p className="text-sm text-foreground/90 leading-relaxed">{message}</p>
      </div>
    </div>
  );
};

export default ChatMessage;
