
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import WordDefinition from './WordDefinition';

interface TranscriptWord {
  text: string;
  start: number;
  end: number;
  highlighted?: boolean;
}

interface TranscriptSegment {
  words: TranscriptWord[];
  start: number;
  end: number;
}

interface YouTubeCaption {
  start: number;
  duration: number;
  text: string;
}

interface TranscriptDisplayProps {
  transcript?: TranscriptSegment[];
  currentTime?: number;
  captions?: string;
  captionsData?: YouTubeCaption[];
}

const TranscriptDisplay: React.FC<TranscriptDisplayProps> = ({
  currentTime = 0,
  captions = '',
  captionsData = []
}) => {
  const [selectedWord, setSelectedWord] = useState<TranscriptWord | null>(null);
  const [definitionPosition, setDefinitionPosition] = useState({ x: 0, y: 0 });
  const [dynamicTranscript, setDynamicTranscript] = useState<TranscriptSegment[]>([]);

  // Create transcript segments from YouTube captions data
  useEffect(() => {
    if (captionsData && captionsData.length > 0) {
      console.log('Processing captions data:', captionsData.length, 'items');
      
      const segments: TranscriptSegment[] = captionsData.map(caption => {
        const words = caption.text.split(/\s+/).filter(word => word.trim() !== '');
        const wordDuration = words.length > 0 ? caption.duration / words.length : caption.duration;
        
        const transcriptWords: TranscriptWord[] = words.map((text, idx) => {
          const start = caption.start + (idx * wordDuration);
          const end = start + wordDuration;
          
          // Highlight vocabulary words (common learning words)
          const cleanText = text.toLowerCase().replace(/[.,!?;:()[\]""']/g, '');
          const highlighted = [
            'hello', 'welcome', 'lesson', 'vocabulary', 'learn', 'greetings', 
            'morning', 'afternoon', 'evening', 'practice', 'phrases', 'question',
            'answer', 'essential', 'beginners', 'improve', 'clearly', 'slowly',
            'conversation', 'family', 'friends', 'basic', 'useful', 'common',
            'language', 'english', 'study', 'speaking', 'listening', 'reading'
          ].includes(cleanText);
          
          return { text, start, end, highlighted };
        });

        return {
          words: transcriptWords,
          start: caption.start,
          end: caption.start + caption.duration
        };
      });

      setDynamicTranscript(segments);
      console.log('Created transcript segments:', segments.length);
    }
  }, [captionsData]);

  const handleWordClick = (
    word: TranscriptWord,
    event: React.MouseEvent<HTMLSpanElement>
  ) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setDefinitionPosition({
      x: rect.left + window.scrollX,
      y: rect.bottom + window.scrollY,
    });
    setSelectedWord(word);
  };

  const closeDefinition = () => {
    setSelectedWord(null);
  };

  // Find the current active segment based on time
  const currentSegment = dynamicTranscript.find(
    segment => currentTime >= segment.start && currentTime <= segment.end
  );

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="w-full max-w-3xl mx-auto mt-6">
      <Card className="bg-white shadow-md">
        <CardContent className="pt-6">
          <h3 className="text-xl font-bold mb-4">Transcript</h3>
          <div className="max-h-60 overflow-y-auto pr-2">
            {dynamicTranscript.length === 0 ? (
              <div className="text-gray-500 text-center py-8">
                <p>Loading transcript from YouTube captions...</p>
                <p className="text-sm mt-2">Make sure the video has captions available</p>
              </div>
            ) : (
              <div className="space-y-3">
                {dynamicTranscript.map((segment, segIndex) => {
                  const isActiveSegment = currentSegment === segment;
                  
                  return (
                    <div 
                      key={segIndex} 
                      className={`p-3 rounded-md transition-all duration-200 ${
                        isActiveSegment 
                          ? "bg-linguify-primary/10 border-l-4 border-linguify-primary shadow-sm" 
                          : "hover:bg-gray-50 border-l-4 border-transparent"
                      }`}
                    >
                      <div className="text-xs text-gray-500 mb-2 font-medium">
                        {formatTime(segment.start)} - {formatTime(segment.end)}
                      </div>
                      <div className="leading-relaxed">
                        {segment.words.map((word, wordIndex) => (
                          <React.Fragment key={`${segIndex}-${wordIndex}`}>
                            <span
                              className={`${
                                word.highlighted
                                  ? "text-linguify-primary font-medium bg-linguify-primary/10 px-1 rounded cursor-pointer"
                                  : "hover:bg-gray-100 transition-colors px-1 py-0.5 rounded cursor-pointer"
                              } ${
                                currentTime >= word.start && currentTime <= word.end && isActiveSegment
                                  ? "bg-yellow-200 px-1 rounded shadow-sm"
                                  : ""
                              }`}
                              onClick={(e) => handleWordClick(word, e)}
                              title="Click for definition"
                            >
                              {word.text}
                            </span>{" "}
                          </React.Fragment>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {selectedWord && (
        <WordDefinition
          word={selectedWord.text}
          position={definitionPosition}
          onClose={closeDefinition}
        />
      )}
    </div>
  );
};

export default TranscriptDisplay;
