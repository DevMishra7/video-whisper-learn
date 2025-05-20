
import React from 'react';
import { Button } from '@/components/ui/button';

interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
}

interface QuizProps {
  questions: QuizQuestion[];
}

const Quiz: React.FC<QuizProps> = ({ questions }) => {
  return (
    <div>
      <h3 className="text-lg font-bold mb-4">Test Your Understanding</h3>
      <div className="space-y-6">
        {questions.map((question) => (
          <div key={question.id} className="p-4 border rounded-lg">
            <p className="font-medium mb-3">{question.question}</p>
            <div className="space-y-2">
              {question.options.map((option, idx) => (
                <div 
                  key={idx} 
                  className="flex items-center p-2 rounded-md hover:bg-gray-50 cursor-pointer"
                >
                  <div className="h-5 w-5 rounded-full border border-gray-300 mr-3 flex items-center justify-center">
                    {idx === question.correctAnswer && (
                      <div className="h-3 w-3 rounded-full bg-linguify-primary"></div>
                    )}
                  </div>
                  <span>{option}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
        
        <Button className="w-full bg-linguify-primary hover:bg-linguify-primary/90">
          Check Answers
        </Button>
      </div>
    </div>
  );
};

export default Quiz;
