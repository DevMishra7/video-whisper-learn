
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
      const segments: TranscriptSegment[] = captionsData.map(caption => {
        const words = caption.text.split(/\s+/).filter(word => word.trim() !== '');
        const wordDuration = caption.duration / words.length;
        
        const transcriptWords: TranscriptWord[] = words.map((text, idx) => {
          const start = caption.start + (idx * wordDuration);
          const end = start + wordDuration;
          
          // Highlight key vocabulary words
          const highlighted = [
            'hello', 'welcome', 'lesson', 'vocabulary', 'learn', 'greetings', 
            'morning', 'afternoon', 'evening', 'practice', 'phrases', 'question',
            'answer', 'essential', 'beginners', 'improve', 'clearly', 'slowly',
            'conversation', 'family', 'friends', 'basic', 'useful', 'common'
          ].includes(text.toLowerCase().replace(/[.,!?]/g, ''));
          
          return { text, start, end, highlighted };
        });

        return {
          words: transcriptWords,
          start: caption.start,
          end: caption.start + caption.duration
        };
      });

      setDynamicTranscript(segments);
    } else if (captions && captions.trim() !== '') {
      // Fallback to dynamic caption creation if no structured data
      const words = captions.split(/\s+/).filter(word => word.trim() !== '');
      if (words.length > 0) {
        const startTime = Math.floor(currentTime);
        const endTime = startTime + 3;
        
        const newSegment: TranscriptSegment = {
          words: words.map((text, idx) => {
            const wordDuration = 3 / words.length;
            const start = startTime + (idx * wordDuration);
            const end = start + wordDuration;
            
            const highlighted = [
              'hello', 'welcome', 'lesson', 'vocabulary', 'learn', 'greetings', 
              'morning', 'afternoon', 'evening', 'practice', 'phrases', 'question',
              'answer', 'essential', 'beginners', 'improve', 'clearly', 'slowly'
            ].includes(text.toLowerCase().replace(/[.,!?]/g, ''));
            
            return { text, start, end, highlighted };
          }),
          start: startTime,
          end: endTime
        };
        
        setDynamicTranscript(prev => {
          const existingIndex = prev.findIndex(segment => 
            Math.abs(segment.start - startTime) < 2
          );
          
          if (existingIndex !== -1) {
            const updated = [...prev];
            updated[existingIndex] = newSegment;
            return updated;
          } else {
            return [...prev, newSegment].sort((a, b) => a.start - b.start);
          }
        });
      }
    }
  }, [captions, captionsData, currentTime]);

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

  return (
    <div className="w-full max-w-3xl mx-auto mt-6">
      <Card className="bg-white shadow-md">
        <CardContent className="pt-6">
          <h3 className="text-xl font-bold mb-4">Transcript</h3>
          <div className="max-h-60 overflow-y-auto pr-2">
            {dynamicTranscript.length === 0 ? (
              <div className="text-gray-500 text-center py-8">
                <p>Play the video to see the transcript appear here...</p>
                <p className="text-sm mt-2">Real captions will be loaded from YouTube when available</p>
              </div>
            ) : (
              dynamicTranscript.map((segment, segIndex) => {
                const isActiveSegment = currentSegment === segment;
                
                return (
                  <div 
                    key={segIndex} 
                    className={`mb-4 p-3 rounded-md transition-colors ${
                      isActiveSegment ? "bg-linguify-primary/10 border-l-4 border-linguify-primary" : "hover:bg-gray-50"
                    }`}
                  >
                    <div className="text-xs text-gray-500 mb-1">
                      {Math.floor(segment.start / 60)}:{(segment.start % 60).toFixed(1).padStart(4, '0')} - {Math.floor(segment.end / 60)}:{(segment.end % 60).toFixed(1).padStart(4, '0')}
                    </div>
                    {segment.words.map((word, wordIndex) => (
                      <React.Fragment key={`${segIndex}-${wordIndex}`}>
                        <span
                          className={`${
                            word.highlighted
                              ? "text-linguify-primary font-medium bg-linguify-primary/10 px-1 rounded"
                              : "hover:bg-gray-100 transition-colors px-1 py-0.5 rounded"
                          } ${
                            currentTime >= word.start && currentTime <= word.end && isActiveSegment
                              ? "bg-yellow-200 px-1 rounded shadow-sm"
                              : ""
                          } cursor-pointer`}
                          onClick={(e) => handleWordClick(word, e)}
                        >
                          {word.text}
                        </span>{" "}
                      </React.Fragment>
                    ))}
                  </div>
                );
              })
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
