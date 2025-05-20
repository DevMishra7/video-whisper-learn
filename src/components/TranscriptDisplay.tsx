
import React, { useState } from 'react';
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

interface TranscriptDisplayProps {
  transcript?: TranscriptSegment[];
  currentTime?: number;
}

const mockTranscript: TranscriptSegment[] = [
  {
    words: [
      { text: "Hello", start: 0.1, end: 0.5, highlighted: true },
      { text: "and", start: 0.6, end: 0.8 },
      { text: "welcome", start: 0.9, end: 1.4, highlighted: true },
      { text: "to", start: 1.5, end: 1.7 },
      { text: "this", start: 1.8, end: 2.1 },
      { text: "English", start: 2.2, end: 2.8, highlighted: true },
      { text: "lesson", start: 2.9, end: 3.4, highlighted: true },
    ],
    start: 0,
    end: 3.5,
  },
  {
    words: [
      { text: "Today", start: 4.0, end: 4.3 },
      { text: "we're", start: 4.4, end: 4.6 },
      { text: "going", start: 4.7, end: 4.9 },
      { text: "to", start: 5.0, end: 5.1 },
      { text: "learn", start: 5.2, end: 5.5, highlighted: true },
      { text: "about", start: 5.6, end: 5.9 },
      { text: "vocabulary", start: 6.0, end: 6.8, highlighted: true },
      { text: "for", start: 6.9, end: 7.1 },
      { text: "daily", start: 7.2, end: 7.6 },
      { text: "conversations", start: 7.7, end: 8.6, highlighted: true },
    ],
    start: 4.0,
    end: 8.6,
  },
];

const TranscriptDisplay: React.FC<TranscriptDisplayProps> = ({
  transcript = mockTranscript,
  currentTime = 0,
}) => {
  const [selectedWord, setSelectedWord] = useState<TranscriptWord | null>(null);
  const [definitionPosition, setDefinitionPosition] = useState({ x: 0, y: 0 });

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
  const currentSegment = transcript.find(
    segment => currentTime >= segment.start && currentTime <= segment.end
  );

  return (
    <div className="w-full max-w-3xl mx-auto mt-6">
      <Card className="bg-white shadow-md">
        <CardContent className="pt-6">
          <h3 className="text-xl font-bold mb-4">Transcript</h3>
          <div className="max-h-60 overflow-y-auto pr-2">
            {transcript.map((segment, segIndex) => {
              const isActiveSegment = currentSegment === segment;
              
              return (
                <div 
                  key={segIndex} 
                  className={`mb-4 p-2 rounded-md ${isActiveSegment ? "bg-gray-50" : ""}`}
                >
                  {segment.words.map((word, wordIndex) => (
                    <React.Fragment key={`${segIndex}-${wordIndex}`}>
                      <span
                        className={`${
                          word.highlighted
                            ? "text-linguify-primary font-medium"
                            : "hover:bg-gray-100 transition-colors px-1 py-0.5 rounded"
                        } ${
                          currentTime >= word.start && currentTime <= word.end
                            ? "bg-linguify-primary/20 px-1 rounded"
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
            })}
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
