
import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import VideoPlayer from '@/components/VideoPlayer';
import { Button } from '@/components/ui/button';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { toast } from 'sonner';

import WordReview from '@/components/learn/WordReview';
import TabContent from '@/components/learn/TabContent';
import VideoSummary from '@/components/learn/VideoSummary';
import TranscriptSection from '@/components/learn/TranscriptSection';

interface PausePoint {
  timestamp: number;
  word?: string;
}

interface YouTubeCaption {
  start: number;
  duration: number;
  text: string;
}

const Learn: React.FC = () => {
  const [pausePoints, setPausePoints] = useState<PausePoint[]>([]);
  const [showTranscript, setShowTranscript] = useState(true);
  const [currentVideoTime, setCurrentVideoTime] = useState(0);
  const [currentCaptions, setCurrentCaptions] = useState("");
  const [captionsData, setCaptionsData] = useState<YouTubeCaption[]>([]);
  
  const handlePause = (timestamp: number) => {
    setPausePoints(prev => [...prev, { timestamp }]);
    toast.info("Video paused - definition added to your review list");
  };
  
  const handleTimeUpdate = (currentTime: number) => {
    setCurrentVideoTime(currentTime);
  };
  
  const handleCaptionsUpdate = (captions: string) => {
    setCurrentCaptions(captions);
  };

  const handleCaptionsDataUpdate = (captions: YouTubeCaption[]) => {
    setCaptionsData(captions);
  };
  
  const toggleTranscript = () => {
    setShowTranscript(prev => !prev);
  };

  const removeWordFromReview = (index: number) => {
    setPausePoints(prev => prev.filter((_, i) => i !== index));
    toast.info("Word removed from your review list");
  };
  
  // Mock quiz questions based on video content
  const quizQuestions = [
    {
      id: 1,
      question: "What does 'vocabulary' mean?",
      options: [
        "A list of phrases used in a language",
        "The body of words used in a particular language",
        "A language learning app",
        "A type of grammar"
      ],
      correctAnswer: 1
    },
    {
      id: 2,
      question: "How would you use 'welcome' in a sentence?",
      options: [
        "I welcome you to my home",
        "The welcome is cold today",
        "She welcomed very loudly",
        "Welcome is a difficult word"
      ],
      correctAnswer: 0
    }
  ];
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow bg-linguify-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-6">
            <h1 className="text-2xl md:text-3xl font-bold mb-2">Learn with Videos</h1>
            <p className="text-gray-500">Import a YouTube video or upload your own to start learning.</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <VideoPlayer 
                onPause={handlePause} 
                onTimeUpdate={handleTimeUpdate}
                onCaptionsUpdate={handleCaptionsUpdate}
                onCaptionsDataUpdate={handleCaptionsDataUpdate}
              />
              
              <WordReview 
                pausePoints={pausePoints} 
                onRemoveWord={removeWordFromReview} 
              />
              
              <TranscriptSection 
                showTranscript={showTranscript}
                toggleTranscript={toggleTranscript}
                currentVideoTime={currentVideoTime}
                currentCaptions={currentCaptions}
                captionsData={captionsData}
              />
            </div>
            
            <div className="space-y-6">
              <TabContent quizQuestions={quizQuestions} />
              
              <VideoSummary />
              
              <div className="flex space-x-2">
                <Button variant="outline" className="flex-1">
                  <ChevronLeft className="mr-1 h-4 w-4" /> Previous
                </Button>
                <Button className="flex-1 bg-linguify-primary hover:bg-linguify-primary/90">
                  Next <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Learn;
