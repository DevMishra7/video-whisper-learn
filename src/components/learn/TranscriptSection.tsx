
import React from 'react';
import { Button } from '@/components/ui/button';
import { BookOpen, ChevronUp, ChevronDown } from 'lucide-react';
import TranscriptDisplay from '@/components/TranscriptDisplay';

interface YouTubeCaption {
  start: number;
  duration: number;
  text: string;
}

interface TranscriptSectionProps {
  showTranscript: boolean;
  toggleTranscript: () => void;
  currentVideoTime: number;
  currentCaptions: string;
  captionsData?: YouTubeCaption[];
}

const TranscriptSection: React.FC<TranscriptSectionProps> = ({
  showTranscript,
  toggleTranscript,
  currentVideoTime,
  currentCaptions,
  captionsData
}) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-xl font-bold flex items-center">
          <BookOpen className="mr-2 h-5 w-5 text-linguify-primary" />
          Transcript
        </h3>
        <Button 
          variant="ghost" 
          size="sm"
          onClick={toggleTranscript}
        >
          {showTranscript ? (
            <>
              <ChevronUp className="h-4 w-4 mr-1" />
              Hide
            </>
          ) : (
            <>
              <ChevronDown className="h-4 w-4 mr-1" />
              Show
            </>
          )}
        </Button>
      </div>
      
      {showTranscript && (
        <TranscriptDisplay 
          currentTime={currentVideoTime} 
          captions={currentCaptions}
          captionsData={captionsData}
        />
      )}
    </div>
  );
};

export default TranscriptSection;
