import React, { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Volume2, Search, ArrowUpDown, Check, ListFilter } from 'lucide-react';

interface WordItem {
  id: string;
  word: string;
  translation?: string;
  definition: string;
  lastReviewed: Date;
  masteryLevel: number; // 0-5 scale
  partOfSpeech: string;
}

const mockWords: WordItem[] = [
  {
    id: '1',
    word: 'Hello',
    translation: 'Hola',
    definition: 'Used as a greeting or to begin a phone conversation.',
    lastReviewed: new Date(2023, 3, 15),
    masteryLevel: 4,
    partOfSpeech: 'exclamation',
  },
  {
    id: '2',
    word: 'Welcome',
    translation: 'Bienvenido',
    definition: 'An instance or manner of greeting someone.',
    lastReviewed: new Date(2023, 4, 2),
    masteryLevel: 3,
    partOfSpeech: 'noun',
  },
  {
    id: '3',
    word: 'English',
    translation: 'Inglés',
    definition: 'Relating to England, its people, or its language.',
    lastReviewed: new Date(2023, 4, 10),
    masteryLevel: 2,
    partOfSpeech: 'noun',
  },
  {
    id: '4',
    word: 'Vocabulary',
    translation: 'Vocabulario',
    definition: 'The body of words used in a particular language.',
    lastReviewed: new Date(2023, 4, 12),
    masteryLevel: 1,
    partOfSpeech: 'noun',
  },
  {
    id: '5',
    word: 'Conversation',
    translation: 'Conversación',
    definition: 'A talk, especially an informal one, between two or more people.',
    lastReviewed: new Date(2023, 4, 15),
    masteryLevel: 2,
    partOfSpeech: 'noun',
  },
];

const MasteryBadge = ({ level }: { level: number }) => {
  const colors = [
    'bg-gray-100 text-gray-500',
    'bg-red-100 text-red-500',
    'bg-orange-100 text-orange-500',
    'bg-yellow-100 text-yellow-500',
    'bg-green-100 text-green-500',
    'bg-emerald-100 text-emerald-500',
  ];
  
  const labels = [
    'New',
    'Beginner',
    'Familiar',
    'Intermediate',
    'Advanced',
    'Mastered',
  ];
  
  return (
    <span className={`text-xs px-2 py-1 rounded-full ${colors[level]}`}>
      {labels[level]}
    </span>
  );
};

const MemoryList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [words, setWords] = useState(mockWords);
  
  const filteredWords = words.filter(word => 
    word.word.toLowerCase().includes(searchTerm.toLowerCase()) ||
    word.definition.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    <Card className="w-full">
      <CardHeader className="pb-2">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Search words..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" className="h-9">
              <ListFilter className="h-4 w-4 mr-1" />
              Filter
            </Button>
            <Button variant="outline" size="sm" className="h-9">
              <ArrowUpDown className="h-4 w-4 mr-1" />
              Sort
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <Tabs defaultValue="all">
          <TabsList className="mb-4">
            <TabsTrigger value="all">All Words</TabsTrigger>
            <TabsTrigger value="new">New</TabsTrigger>
            <TabsTrigger value="learning">Learning</TabsTrigger>
            <TabsTrigger value="mastered">Mastered</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="m-0">
            <div className="divide-y">
              {filteredWords.length === 0 ? (
                <div className="py-8 text-center text-gray-500">
                  <p>No words found. Try a different search term.</p>
                </div>
              ) : (
                filteredWords.map((word) => (
                  <div key={word.id} className="py-3 px-1">
                    <div className="flex justify-between items-start mb-1">
                      <div>
                        <div className="flex items-center">
                          <h4 className="font-medium text-gray-900">{word.word}</h4>
                          <Button variant="ghost" size="sm" className="p-0 h-6 w-6 ml-1">
                            <Volume2 className="h-4 w-4 text-linguify-primary" />
                          </Button>
                        </div>
                        
                        <div className="text-sm text-gray-500 italic mb-1">
                          {word.partOfSpeech} • {word.translation}
                        </div>
                      </div>
                      
                      <MasteryBadge level={word.masteryLevel} />
                    </div>
                    
                    <p className="text-sm text-gray-700">{word.definition}</p>
                    
                    <div className="flex justify-between items-center mt-2">
                      <div className="text-xs text-gray-400">
                        Last reviewed: {word.lastReviewed.toLocaleDateString()}
                      </div>
                      
                      <Button variant="ghost" size="sm" className="h-8">
                        <Check className="h-4 w-4 mr-1 text-linguify-secondary" />
                        Review
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="new" className="m-0">
            <div className="py-8 text-center text-gray-500">
              <p>Words you recently added will appear here.</p>
            </div>
          </TabsContent>
          
          <TabsContent value="learning" className="m-0">
            <div className="py-8 text-center text-gray-500">
              <p>Words you're currently learning will appear here.</p>
            </div>
          </TabsContent>
          
          <TabsContent value="mastered" className="m-0">
            <div className="py-8 text-center text-gray-500">
              <p>Words you've mastered will appear here.</p>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default MemoryList;
