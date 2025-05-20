
import React from 'react';
import { Button } from '@/components/ui/button';
import { MessageSquare } from 'lucide-react';

const AIChat: React.FC = () => {
  return (
    <div>
      <h3 className="text-lg font-bold mb-4">Ask the AI Tutor</h3>
      <div className="border rounded-lg p-4 h-64 overflow-y-auto bg-gray-50">
        <div className="space-y-4">
          <div className="flex items-start">
            <div className="h-8 w-8 rounded-full bg-linguify-primary/20 flex items-center justify-center mr-2 flex-shrink-0">
              <MessageSquare className="h-4 w-4 text-linguify-primary" />
            </div>
            <div className="bg-white p-3 rounded-lg shadow-sm w-full">
              <p className="text-sm">
                Hello! I'm your AI language tutor. Ask me anything about the words or concepts in this video.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex mt-4 gap-2">
        <input 
          type="text" 
          className="flex-grow rounded-md border border-gray-300 px-3 py-2"
          placeholder="Ask a question..."
        />
        <Button className="bg-linguify-primary hover:bg-linguify-primary/90">
          Send
        </Button>
      </div>
    </div>
  );
};

export default AIChat;
