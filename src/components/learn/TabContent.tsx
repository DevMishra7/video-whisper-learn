
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import Quiz from './Quiz';
import Notes from './Notes';
import AIChat from './AIChat';

interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
}

interface TabContentProps {
  quizQuestions: QuizQuestion[];
}

const TabContent: React.FC<TabContentProps> = ({ quizQuestions }) => {
  return (
    <Card className="bg-white shadow-md">
      <CardContent className="pt-6">
        <Tabs defaultValue="quiz">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="quiz">Quiz</TabsTrigger>
            <TabsTrigger value="notes">Notes</TabsTrigger>
            <TabsTrigger value="chat">AI Chat</TabsTrigger>
          </TabsList>
          
          <TabsContent value="quiz" className="mt-4">
            <Quiz questions={quizQuestions} />
          </TabsContent>
          
          <TabsContent value="notes" className="mt-4">
            <Notes />
          </TabsContent>
          
          <TabsContent value="chat" className="mt-4">
            <AIChat />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default TabContent;
