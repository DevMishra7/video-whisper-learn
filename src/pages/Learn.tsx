import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import VideoPlayer from '@/components/VideoPlayer';
import TranscriptDisplay from '@/components/TranscriptDisplay';
import WordDefinition from '@/components/WordDefinition';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  PlayCircle, 
  MessageSquare, 
  BookOpen, 
  ListChecks, 
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Plus,
  ChevronLeft
} from 'lucide-react';
import { toast } from 'sonner';

interface PausePoint {
  timestamp: number;
  word?: string;
}

const Learn: React.FC = () => {
  const [pausePoints, setPausePoints] = useState<PausePoint[]>([]);
  const [showTranscript, setShowTranscript] = useState(true);
  const [currentVideoTime, setCurrentVideoTime] = useState(0);
  
  const handlePause = (timestamp: number) => {
    setPausePoints(prev => [...prev, { timestamp }]);
    toast.info("Video paused - definition added to your review list");
  };
  
  const handleTimeUpdate = (currentTime: number) => {
    setCurrentVideoTime(currentTime);
  };
  
  const toggleTranscript = () => {
    setShowTranscript(prev => !prev);
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
              <VideoPlayer onPause={handlePause} onTimeUpdate={handleTimeUpdate} />
              
              {pausePoints.length > 0 && (
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
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
              
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
                
                {showTranscript && <TranscriptDisplay currentTime={currentVideoTime} />}
              </div>
            </div>
            
            <div className="space-y-6">
              <Card className="bg-white shadow-md">
                <CardContent className="pt-6">
                  <Tabs defaultValue="quiz">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="quiz">Quiz</TabsTrigger>
                      <TabsTrigger value="notes">Notes</TabsTrigger>
                      <TabsTrigger value="chat">AI Chat</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="quiz" className="mt-4">
                      <h3 className="text-lg font-bold mb-4">Test Your Understanding</h3>
                      <div className="space-y-6">
                        {quizQuestions.map((question) => (
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
                    </TabsContent>
                    
                    <TabsContent value="notes" className="mt-4">
                      <h3 className="text-lg font-bold mb-4">Your Notes</h3>
                      <div className="border rounded-lg p-4 h-64 bg-gray-50">
                        <textarea 
                          className="w-full h-full bg-transparent border-0 focus:ring-0 resize-none" 
                          placeholder="Take notes while you learn..."
                        ></textarea>
                      </div>
                      <Button className="w-full mt-4 bg-linguify-primary hover:bg-linguify-primary/90">
                        Save Notes
                      </Button>
                    </TabsContent>
                    
                    <TabsContent value="chat" className="mt-4">
                      <h3 className="text-lg font-bold mb-4">Ask the AI Tutor</h3>
                      <div className="border rounded-lg p-4 h-64 overflow-y-auto bg-gray-50">
                        <div className="space-y-4">
                          <div className="flex items-start">
                            <div className="h-8 w-8 rounded-full bg-linguify-primary/20 flex items-center justify-center mr-2 flex-shrink-0">
                              <MessageSquare className="h-4 w-4 text-linguify-primary" />
                            </div>
                            <div className="bg-white p-3 rounded-lg shadow-sm w-full">
                              <p className="text-sm">
                                Hello! I'm your AI language tutor. Ask me anything about the words or concepts in this video.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex mt-4 gap-2">
                        <input 
                          type="text" 
                          className="flex-grow rounded-md border border-gray-300 px-3 py-2"
                          placeholder="Ask a question..."
                        />
                        <Button className="bg-linguify-primary hover:bg-linguify-primary/90">
                          Send
                        </Button>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
              
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
