
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ListChecks, PlayCircle, Plus, X } from 'lucide-react';
import { toast } from 'sonner';

interface PausePoint {
  timestamp: number;
  word?: string;
}

interface WordReviewProps {
  pausePoints: PausePoint[];
  onRemoveWord: (index: number) => void;
}

const WordReview: React.FC<WordReviewProps> = ({ pausePoints, onRemoveWord }) => {
  if (pausePoints.length === 0) {
    return null;
  }

  return (
    <Card className="bg-white shadow-md">
      <CardContent className="pt-6">
        <h3 className="text-xl font-bold mb-4 flex items-center">
          <ListChecks className="mr-2 h-5 w-5 text-linguify-primary" />
          Words to Review ({pausePoints.length})
        </h3>
        <div className="space-y-2">
          {pausePoints.map((point, index) => (
            <div key={index} className="flex items-center justify-between p-2 rounded-md hover:bg-gray-50">
              <div className="flex items-center">
                <span className="text-sm font-medium">
                  {Math.floor(point.timestamp / 60)}:{(point.timestamp % 60).toString().padStart(2, '0')}
                </span>
                <span className="mx-2 text-gray-400">•</span>
                <span className="text-linguify-primary font-medium">
                  {point.word || "Unknown word"}
                </span>
              </div>
              <div className="flex">
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <PlayCircle className="h-4 w-4 text-gray-500" />
                </Button>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0 ml-1">
                  <Plus className="h-4 w-4 text-linguify-secondary" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-8 w-8 p-0 ml-1 hover:text-red-500"
                  onClick={() => onRemoveWord(index)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default WordReview;
