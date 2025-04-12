
import React from 'react';
import { Progress } from '@/components/ui/progress';
import { Trophy, BookOpen, Zap, Calendar } from 'lucide-react';

interface ProgressBarProps {
  progress: number;
  streak?: number;
  wordsLearned?: number;
  minutesWatched?: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  progress = 0,
  streak = 0,
  wordsLearned = 0,
  minutesWatched = 0,
}) => {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-medium text-gray-700">Daily Progress</h3>
        <span className="text-sm font-medium text-linguify-primary">{progress}%</span>
      </div>
      
      <Progress value={progress} className="h-2 mb-4" />
      
      <div className="grid grid-cols-3 gap-4 mt-3">
        <div className="flex flex-col items-center bg-white p-3 rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-center justify-center h-8 w-8 rounded-full bg-linguify-accent/10 text-linguify-accent mb-2">
            <Zap className="h-4 w-4" />
          </div>
          <span className="text-lg font-bold">{streak}</span>
          <span className="text-xs text-gray-500">Day Streak</span>
        </div>
        
        <div className="flex flex-col items-center bg-white p-3 rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-center justify-center h-8 w-8 rounded-full bg-linguify-primary/10 text-linguify-primary mb-2">
            <BookOpen className="h-4 w-4" />
          </div>
          <span className="text-lg font-bold">{wordsLearned}</span>
          <span className="text-xs text-gray-500">Words Learned</span>
        </div>
        
        <div className="flex flex-col items-center bg-white p-3 rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-center justify-center h-8 w-8 rounded-full bg-linguify-secondary/10 text-linguify-secondary mb-2">
            <Calendar className="h-4 w-4" />
          </div>
          <span className="text-lg font-bold">{minutesWatched}</span>
          <span className="text-xs text-gray-500">Min Watched</span>
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;
