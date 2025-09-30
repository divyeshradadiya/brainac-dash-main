import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";
import { ChatbotModal } from "./chatbot-modal";

interface FloatingDoubtButtonProps {
  onClick?: () => void;
  className?: string;
}

export function FloatingDoubtButton({ onClick, className }: FloatingDoubtButtonProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleClick = () => {
    setIsModalOpen(true);
    onClick?.();
  };

  return (
    <>
      <div className={`fixed bottom-6 right-6 z-50 group ${className || ''}`}>
        <Button 
          size="lg" 
          className="btn-primary rounded-full w-14 h-14 p-0 shadow-lg hover:shadow-xl transition-all duration-200"
          onClick={handleClick}
        >
          <MessageCircle className="w-6 h-6" />
        </Button>
        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-foreground text-background text-xs px-2 py-1 rounded whitespace-nowrap transition-opacity">
          Ask a Doubt
        </div>
      </div>

      <ChatbotModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </>
  );
}
