
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

const VideoSummary: React.FC = () => {
  return (
    <Card className="bg-white shadow-md">
      <CardContent className="pt-6">
        <h3 className="text-lg font-bold mb-4">Video Summary</h3>
        <p className="text-gray-700 text-sm">
          This video covers basic English vocabulary for everyday conversations, including greetings like "hello" and "welcome". It introduces common phrases and explains their usage in different contexts.
        </p>
        
        <Separator className="my-4" />
        
        <h4 className="font-medium mb-2">Key Vocabulary</h4>
        <div className="flex flex-wrap gap-2 mb-4">
          <span className="px-2 py-1 bg-linguify-primary/10 text-linguify-primary rounded-full text-sm">
            Hello
          </span>
          <span className="px-2 py-1 bg-linguify-primary/10 text-linguify-primary rounded-full text-sm">
            Welcome
          </span>
          <span className="px-2 py-1 bg-linguify-primary/10 text-linguify-primary rounded-full text-sm">
            English
          </span>
          <span className="px-2 py-1 bg-linguify-primary/10 text-linguify-primary rounded-full text-sm">
            Vocabulary
          </span>
          <span className="px-2 py-1 bg-linguify-primary/10 text-linguify-primary rounded-full text-sm">
            Conversation
          </span>
        </div>
        
        <Button variant="outline" className="w-full">
          Save to My Collection
        </Button>
      </CardContent>
    </Card>
  );
};

export default VideoSummary;
