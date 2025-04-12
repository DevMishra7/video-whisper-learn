
import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MemoryList from '@/components/MemoryList';
import { Link } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, ChevronRight, ArrowRight } from 'lucide-react';

const Vocabulary: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow bg-linguify-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold mb-1">Your Vocabulary</h1>
              <p className="text-gray-500">Review and practice words you've learned</p>
            </div>
            
            <div className="mt-4 md:mt-0">
              <Button 
                className="bg-linguify-primary hover:bg-linguify-primary/90"
                asChild
              >
                <Link to="/learn">
                  Learn New Words <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-3">
              <MemoryList />
            </div>
            
            <div className="space-y-6">
              <Card className="bg-white">
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl flex items-center">
                    <BookOpen className="mr-2 h-5 w-5 text-linguify-primary" />
                    Vocabulary Stats
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm text-gray-500">Total Words</span>
                        <span className="font-medium">127</span>
                      </div>
                      <div className="h-2 bg-gray-100 rounded-full">
                        <div 
                          className="h-2 bg-linguify-primary rounded-full"
                          style={{ width: '100%' }}
                        ></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm text-gray-500">Mastered</span>
                        <span className="font-medium">76</span>
                      </div>
                      <div className="h-2 bg-gray-100 rounded-full">
                        <div 
                          className="h-2 bg-emerald-500 rounded-full"
                          style={{ width: '60%' }}
                        ></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm text-gray-500">Learning</span>
                        <span className="font-medium">38</span>
                      </div>
                      <div className="h-2 bg-gray-100 rounded-full">
                        <div 
                          className="h-2 bg-yellow-500 rounded-full"
                          style={{ width: '30%' }}
                        ></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm text-gray-500">New</span>
                        <span className="font-medium">13</span>
                      </div>
                      <div className="h-2 bg-gray-100 rounded-full">
                        <div 
                          className="h-2 bg-linguify-accent rounded-full"
                          style={{ width: '10%' }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-white">
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl">Ready for Review</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-500 mb-4">
                    These words are due for review today based on spaced repetition.
                  </p>
                  
                  <div className="space-y-2">
                    {['Welcome', 'Conversation', 'Vocabulary'].map((word, index) => (
                      <div key={index} className="p-2 rounded-md bg-linguify-primary/5 flex justify-between items-center">
                        <span className="font-medium">{word}</span>
                        <Button variant="ghost" size="sm" className="h-7 p-0">
                          <ChevronRight className="h-4 w-4 text-linguify-primary" />
                        </Button>
                      </div>
                    ))}
                  </div>
                  
                  <Button className="w-full mt-6 bg-linguify-primary hover:bg-linguify-primary/90">
                    Review All
                  </Button>
                </CardContent>
              </Card>
              
              <Card className="bg-linguify-secondary text-white">
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold mb-2">Import Vocabulary</h3>
                  <p className="text-white/90 text-sm mb-4">
                    Add words from external sources to your vocabulary list.
                  </p>
                  
                  <Button variant="secondary" className="w-full bg-white text-linguify-secondary hover:bg-white/90">
                    Import from File
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Vocabulary;
