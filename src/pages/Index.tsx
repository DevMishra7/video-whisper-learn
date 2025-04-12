
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { 
  PlayCircle, 
  BookText, 
  BrainCircuit, 
  Languages, 
  Youtube, 
  Upload,
  Sparkles,
  CheckCircle,
  ArrowRight 
} from 'lucide-react';

const Index: React.FC = () => {
  const features = [
    {
      icon: <Youtube className="h-8 w-8 text-linguify-primary" />,
      title: 'Learn from YouTube Videos',
      description: 'Import any YouTube video and transform it into an interactive language learning session.',
    },
    {
      icon: <Upload className="h-8 w-8 text-linguify-primary" />,
      title: 'Upload Your Own Content',
      description: 'Use your own videos for a personalized learning experience tailored to your interests.',
    },
    {
      icon: <BookText className="h-8 w-8 text-linguify-primary" />,
      title: 'Interactive Transcripts',
      description: 'Click on any word to instantly see definitions, examples, and translations.',
    },
    {
      icon: <BrainCircuit className="h-8 w-8 text-linguify-primary" />,
      title: 'AI-Powered Learning',
      description: 'Our AI analyzes your video content to provide context-aware definitions and quizzes.',
    },
    {
      icon: <Languages className="h-8 w-8 text-linguify-primary" />,
      title: 'Multiple Languages',
      description: 'Start with English and expand to other languages as you grow your skills.',
    },
    {
      icon: <Sparkles className="h-8 w-8 text-linguify-primary" />,
      title: 'Gamified Experience',
      description: 'Earn points, track streaks, and unlock achievements to stay motivated.',
    },
  ];

  const testimonials = [
    {
      content: "Linguify transformed how I learn English. Being able to pause videos and get instant explanations for new words has accelerated my vocabulary growth tremendously.",
      author: "Maria S.",
      role: "English Learner"
    },
    {
      content: "As a language teacher, I recommend Linguify to all my students. The spaced repetition system ensures they actually remember what they've learned.",
      author: "David L.",
      role: "Language Instructor"
    },
    {
      content: "I've tried many language apps, but Linguify's real-world video approach makes the learning process much more engaging and practical.",
      author: "Takashi M.",
      role: "Business Professional"
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-linguify-primary to-linguify-primary/80 text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-12">
              <div className="md:w-1/2 space-y-6">
                <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
                  Learn Languages with Your Favorite Videos
                </h1>
                <p className="text-xl text-white/90">
                  Transform any YouTube video or personal content into an interactive language learning experience with AI-powered assistance.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button 
                    size="lg" 
                    className="bg-white text-linguify-primary hover:bg-white/90"
                    asChild
                  >
                    <Link to="/learn">
                      Start Learning <PlayCircle className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                  <Button 
                    variant="outline" 
                    size="lg" 
                    className="bg-transparent border-white text-white hover:bg-white/10"
                  >
                    Watch Demo
                  </Button>
                </div>
              </div>
              
              <div className="md:w-1/2">
                <div className="relative">
                  <div className="rounded-lg shadow-xl overflow-hidden border-4 border-white/20">
                    <img 
                      src="https://images.unsplash.com/photo-1596638787647-904d822d751e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2671&q=80" 
                      alt="Learning languages with video" 
                      className="w-full object-cover rounded"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Button 
                        size="icon" 
                        className="h-16 w-16 rounded-full bg-white text-linguify-primary hover:bg-white/90"
                      >
                        <PlayCircle className="h-10 w-10" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-linguify-text">
                Supercharge Your Language Learning
              </h2>
              <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
                Discover how Linguify transforms everyday video content into powerful language learning materials.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <div 
                  key={index} 
                  className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-center justify-center h-14 w-14 rounded-lg bg-linguify-primary/10 mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-linguify-text">
                How Linguify Works
              </h2>
              <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
                A simple three-step process to transform your video watching into active language learning.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-10">
              <div className="text-center">
                <div className="inline-flex items-center justify-center h-20 w-20 rounded-full bg-linguify-primary text-white text-2xl font-bold mb-4">
                  1
                </div>
                <h3 className="text-xl font-bold mb-3">Import a Video</h3>
                <p className="text-gray-600">
                  Paste a YouTube URL or upload your own video file to begin your learning journey.
                </p>
              </div>
              
              <div className="text-center">
                <div className="inline-flex items-center justify-center h-20 w-20 rounded-full bg-linguify-secondary text-white text-2xl font-bold mb-4">
                  2
                </div>
                <h3 className="text-xl font-bold mb-3">Watch & Interact</h3>
                <p className="text-gray-600">
                  Pause when you encounter new words and get instant definitions, examples, and context.
                </p>
              </div>
              
              <div className="text-center">
                <div className="inline-flex items-center justify-center h-20 w-20 rounded-full bg-linguify-accent text-white text-2xl font-bold mb-4">
                  3
                </div>
                <h3 className="text-xl font-bold mb-3">Practice & Review</h3>
                <p className="text-gray-600">
                  Complete auto-generated quizzes and review your saved words with spaced repetition.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-20 bg-linguify-primary/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-linguify-text">
                What Our Users Say
              </h2>
              <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
                Join thousands of language learners who have transformed their learning experience.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <div 
                  key={index} 
                  className="bg-white p-6 rounded-xl shadow-md relative"
                >
                  <div className="absolute -top-4 -left-4 h-10 w-10 bg-linguify-primary text-white flex items-center justify-center rounded-full">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"></path>
                      <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 2-2.75 3.75V19c0 1 0 2 2 2z"></path>
                    </svg>
                  </div>
                  
                  <p className="text-gray-600 mb-4 mt-2">"{testimonial.content}"</p>
                  
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full bg-gray-200 mr-3"></div>
                    <div>
                      <p className="font-medium text-linguify-text">{testimonial.author}</p>
                      <p className="text-sm text-gray-500">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-linguify-primary text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Transform Your Language Learning?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
              Start learning from videos today and experience the power of context-based, interactive language acquisition.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button 
                size="lg" 
                className="bg-white text-linguify-primary hover:bg-white/90"
                asChild
              >
                <Link to="/learn">
                  Get Started for Free <CheckCircle className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="bg-transparent border-white text-white hover:bg-white/10"
                asChild
              >
                <Link to="/learn">
                  Explore Features <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
