
import React from 'react';
import { Button } from '@/components/ui/button';

const Notes: React.FC = () => {
  return (
    <div>
      <h3 className="text-lg font-bold mb-4">Your Notes</h3>
      <div className="border rounded-lg p-4 h-64 bg-gray-50">
        <textarea 
          className="w-full h-full bg-transparent border-0 focus:ring-0 resize-none" 
          placeholder="Take notes while you learn..."
        ></textarea>
      </div>
      <Button className="w-full mt-4 bg-linguify-primary hover:bg-linguify-primary/90">
        Save Notes
      </Button>
    </div>
  );
};

export default Notes;
