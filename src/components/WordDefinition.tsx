
import React, { useEffect, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpen, X, Plus, Volume2 } from 'lucide-react';

interface WordDefinitionProps {
  word: string;
  position: { x: number; y: number };
  onClose: () => void;
}

interface ExampleSentence {
  text: string;
  translation?: string;
}

const WordDefinition: React.FC<WordDefinitionProps> = ({ word, position, onClose }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  
  // Mock data - in a real application this would come from an API
  const definition = {
    word,
    phonetic: word === 'Hello' ? '/həˈləʊ/' : word === 'welcome' ? '/ˈwelkəm/' : '/ˈɪŋɡlɪʃ/',
    partOfSpeech: word === 'Hello' ? 'exclamation, noun' : word === 'welcome' ? 'exclamation, verb, adjective' : 'noun, adjective',
    meanings: [
      word === 'Hello' 
        ? 'Used as a greeting or to begin a phone conversation.' 
        : word === 'welcome' 
        ? 'An instance or manner of greeting someone.' 
        : 'Relating to England, its people, or its language.',
    ],
    examples: [
      { 
        text: word === 'Hello' 
          ? "Hello, how are you today?" 
          : word === 'welcome' 
          ? "You're welcome to join us for dinner." 
          : "I'm learning English vocabulary.", 
        translation: word === 'Hello' 
          ? "Hola, ¿cómo estás hoy?" 
          : word === 'welcome' 
          ? "Eres bienvenido a unirte a nosotros para cenar." 
          : "Estoy aprendiendo vocabulario inglés."
      }
    ] as ExampleSentence[],
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (cardRef.current && !cardRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  // Adjust position to ensure the popup stays within viewport
  const adjustedPosition = { ...position };
  
  useEffect(() => {
    if (cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      if (rect.right > window.innerWidth) {
        adjustedPosition.x = window.innerWidth - rect.width - 20;
      }
      if (rect.bottom > window.innerHeight) {
        adjustedPosition.y = position.y - rect.height - 10;
      }
    }
  }, [position]);

  return (
    <div
      ref={cardRef}
      className="absolute z-50 w-72 shadow-xl"
      style={{
        left: `${adjustedPosition.x}px`,
        top: `${adjustedPosition.y + 10}px`,
      }}
    >
      <Card className="bg-white border-linguify-primary/20">
        <CardContent className="p-3">
          <div className="flex justify-between items-start mb-2">
            <div className="flex items-center">
              <h4 className="text-lg font-bold">{definition.word}</h4>
              <Button variant="ghost" size="sm" className="ml-1 p-0 h-6 w-6">
                <Volume2 className="h-4 w-4 text-linguify-primary" />
              </Button>
            </div>
            <div className="flex">
              <Button
                variant="ghost"
                size="sm"
                className="h-6 w-6 p-0"
                onClick={() => {
                  console.log('Add to vocabulary:', definition.word);
                }}
              >
                <Plus className="h-4 w-4 text-linguify-secondary" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="h-6 w-6 p-0 ml-1"
                onClick={onClose}
              >
                <X className="h-4 w-4 text-gray-400" />
              </Button>
            </div>
          </div>
          
          <div className="text-sm text-gray-600 mb-1">
            {definition.phonetic} • <span className="italic">{definition.partOfSpeech}</span>
          </div>
          
          <div className="mb-3">
            <p className="text-sm">{definition.meanings[0]}</p>
          </div>
          
          {definition.examples.length > 0 && (
            <div className="border-t pt-2">
              <div className="flex items-center text-xs text-gray-500 mb-1">
                <BookOpen className="h-3 w-3 mr-1" />
                <span>Example</span>
              </div>
              {definition.examples.map((example, index) => (
                <div key={index} className="space-y-1">
                  <p className="text-sm">{example.text}</p>
                  {example.translation && (
                    <p className="text-xs text-gray-500 italic">{example.translation}</p>
                  )}
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default WordDefinition;
