import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  X, 
  Send, 
  MessageCircle, 
  Bot, 
  User,
  Sparkles,
  Clock,
  CheckCircle
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  status?: 'sending' | 'sent' | 'read';
}

interface ChatbotModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ChatbotModal({ isOpen, onClose }: ChatbotModalProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hello! I'm your AI study assistant. How can I help you today? You can ask me about any subject, concept, or get help with your studies! 🤓",
      sender: 'bot',
      timestamp: new Date(),
      status: 'read'
    },
    {
      id: '2',
      text: "Hi! I'm having trouble understanding quadratic equations in math. Can you help?",
      sender: 'user',
      timestamp: new Date(Date.now() - 30000),
      status: 'read'
    },
    {
      id: '3',
      text: "Of course! Quadratic equations can be tricky. Let me break it down for you:\n\nA quadratic equation is in the form: ax² + bx + c = 0\n\nThere are several ways to solve them:\n1. **Factoring** - when the equation can be factored\n2. **Quadratic Formula** - x = (-b ± √(b² - 4ac)) / 2a\n3. **Completing the Square**\n4. **Graphing**\n\nWhich method would you like me to explain in detail?",
      sender: 'bot',
      timestamp: new Date(Date.now() - 25000),
      status: 'read'
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date(),
      status: 'sending'
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    
    // Simulate sending status
    setTimeout(() => {
      setMessages(prev => 
        prev.map(msg => 
          msg.id === userMessage.id 
            ? { ...msg, status: 'sent' as const }
            : msg
        )
      );
    }, 500);

    // Simulate bot typing
    setIsTyping(true);
    
    // Simulate bot response
    setTimeout(() => {
      const botResponses = [
        "That's a great question! Let me explain this concept step by step...",
        "I understand your confusion. Here's a simple way to think about it:",
        "Excellent question! This is a common point of confusion. Let me break it down:",
        "I'm glad you asked! This concept is fundamental to understanding the topic. Here's what you need to know:",
        "That's a tricky one! Let me help you understand this better:",
        "Great question! This is exactly the kind of thing students often struggle with. Here's the explanation:"
      ];
      
      const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)];
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: randomResponse + "\n\nWould you like me to explain anything else or provide more examples?",
        sender: 'bot',
        timestamp: new Date(),
        status: 'sent'
      };

      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 2000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md h-[600px] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Study Assistant</h3>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-xs text-gray-500">Online</span>
              </div>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="hover:bg-gray-100"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                "flex gap-3",
                message.sender === 'user' ? 'justify-end' : 'justify-start'
              )}
            >
              {message.sender === 'bot' && (
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <Bot className="w-4 h-4 text-white" />
                </div>
              )}
              
              <div className={cn(
                "max-w-[80%] rounded-2xl px-4 py-3",
                message.sender === 'user' 
                  ? "bg-blue-500 text-white" 
                  : "bg-gray-100 text-gray-900"
              )}>
                <div className="whitespace-pre-wrap text-sm">{message.text}</div>
                <div className={cn(
                  "flex items-center gap-1 mt-2 text-xs",
                  message.sender === 'user' ? "text-blue-100" : "text-gray-500"
                )}>
                  <Clock className="w-3 h-3" />
                  <span>{message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                  {message.sender === 'user' && (
                    <>
                      <span>•</span>
                      {message.status === 'sending' && <span>Sending...</span>}
                      {message.status === 'sent' && <CheckCircle className="w-3 h-3" />}
                      {message.status === 'read' && <CheckCircle className="w-3 h-3 text-blue-300" />}
                    </>
                  )}
                </div>
              </div>

              {message.sender === 'user' && (
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <User className="w-4 h-4 text-white" />
                </div>
              )}
            </div>
          ))}

          {/* Typing indicator */}
          {isTyping && (
            <div className="flex gap-3 justify-start">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <div className="bg-gray-100 rounded-2xl px-4 py-3">
                <div className="flex items-center gap-1">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  </div>
                  <span className="text-xs text-gray-500 ml-2">AI is typing...</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="p-4 border-t border-gray-200">
          <div className="flex gap-2 mb-3 overflow-x-auto scrollbar-hide">
            <Badge 
              variant="secondary" 
              className="cursor-pointer hover:bg-gray-200 whitespace-nowrap"
              onClick={() => setInputValue("Can you explain quadratic equations?")}
            >
              Math Help
            </Badge>
            <Badge 
              variant="secondary" 
              className="cursor-pointer hover:bg-gray-200 whitespace-nowrap"
              onClick={() => setInputValue("I need help with physics formulas")}
            >
              Physics
            </Badge>
            <Badge 
              variant="secondary" 
              className="cursor-pointer hover:bg-gray-200 whitespace-nowrap"
              onClick={() => setInputValue("How do I study effectively?")}
            >
              Study Tips
            </Badge>
            <Badge 
              variant="secondary" 
              className="cursor-pointer hover:bg-gray-200 whitespace-nowrap"
              onClick={() => setInputValue("Explain this concept")}
            >
              General
            </Badge>
          </div>
        </div>

        {/* Input */}
        <div className="p-4 border-t border-gray-200">
          <div className="flex gap-2">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask me anything about your studies..."
              className="flex-1"
            />
            <Button
              onClick={handleSendMessage}
              disabled={!inputValue.trim() || isTyping}
              className="bg-blue-500 hover:bg-blue-600"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
