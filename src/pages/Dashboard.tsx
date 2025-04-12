
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProgressBar from '@/components/ProgressBar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Link } from 'react-router-dom';
import {
  Calendar,
  Clock,
  BarChart3,
  TrendingUp,
  PlayCircle,
  Bookmark,
  Award,
  ChevronRight,
  Video,
  BookOpen,
  Target,
  Zap,
  PieChart,
  History,
  ArrowRight
} from 'lucide-react';

const Dashboard: React.FC = () => {
  // Mock data
  const recentVideos = [
    {
      id: 1,
      title: "Basic English Conversation",
      thumbnail: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
      duration: "12:34",
      progress: 70,
      wordsLearned: 15,
      date: "2 days ago"
    },
    {
      id: 2,
      title: "Intermediate Vocabulary",
      thumbnail: "https://images.unsplash.com/photo-1493612276216-ee3925520721?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1064&q=80",
      duration: "18:22",
      progress: 30,
      wordsLearned: 8,
      date: "1 week ago"
    },
    {
      id: 3,
      title: "Advanced Grammar",
      thumbnail: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1373&q=80",
      duration: "22:45",
      progress: 10,
      wordsLearned: 3,
      date: "2 weeks ago"
    },
  ];
  
  const achievements = [
    {
      id: 1,
      name: "First Video",
      icon: <Video className="h-5 w-5 text-linguify-primary" />,
      completed: true,
      points: 100
    },
    {
      id: 2,
      name: "10 Words Learned",
      icon: <BookOpen className="h-5 w-5 text-linguify-primary" />,
      completed: true,
      points: 200
    },
    {
      id: 3,
      name: "3-Day Streak",
      icon: <Zap className="h-5 w-5 text-linguify-primary" />,
      completed: true,
      points: 150
    },
    {
      id: 4,
      name: "Complete a Quiz",
      icon: <Target className="h-5 w-5 text-linguify-primary" />,
      completed: false,
      points: 250
    },
    {
      id: 5,
      name: "Watch 5 Videos",
      icon: <PlayCircle className="h-5 w-5 text-linguify-primary" />,
      completed: false,
      points: 300
    },
  ];
  
  const stats = [
    {
      name: "Total Time Learning",
      value: "4h 23m",
      icon: <Clock className="h-6 w-6 text-linguify-primary" />,
      change: "+32%",
      up: true
    },
    {
      name: "Words Learned",
      value: "127",
      icon: <BookOpen className="h-6 w-6 text-linguify-secondary" />,
      change: "+15%",
      up: true
    },
    {
      name: "Videos Watched",
      value: "12",
      icon: <Video className="h-6 w-6 text-linguify-accent" />,
      change: "+5%",
      up: true
    },
    {
      name: "Current Streak",
      value: "5 days",
      icon: <Zap className="h-6 w-6 text-linguify-primary" />,
      change: "-1",
      up: false
    },
  ];
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow bg-linguify-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-8">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold mb-1">Your Dashboard</h1>
                  <p className="text-gray-500">Track your progress and set learning goals</p>
                </div>
                
                <div className="mt-4 md:mt-0">
                  <Button 
                    className="bg-linguify-primary hover:bg-linguify-primary/90"
                    asChild
                  >
                    <Link to="/learn">
                      Continue Learning <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {stats.map((stat, index) => (
                  <Card key={index} className="bg-white">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-sm font-medium text-gray-500">{stat.name}</p>
                          <p className="text-2xl font-bold mt-1">{stat.value}</p>
                        </div>
                        <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center">
                          {stat.icon}
                        </div>
                      </div>
                      <div className={`flex items-center mt-3 text-sm ${
                        stat.up ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {stat.up ? <TrendingUp className="h-3 w-3 mr-1" /> : <TrendingUp className="h-3 w-3 mr-1 transform rotate-180" />}
                        <span>{stat.change} from last week</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              <Card className="bg-white">
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl flex items-center">
                    <History className="mr-2 h-5 w-5 text-linguify-primary" />
                    Recent Learning Activity
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentVideos.map((video) => (
                      <div key={video.id} className="flex p-2 hover:bg-gray-50 rounded-lg transition-colors">
                        <div className="relative h-20 w-32 flex-shrink-0">
                          <img 
                            src={video.thumbnail} 
                            alt={video.title}
                            className="h-full w-full object-cover rounded-md"
                          />
                          <div className="absolute bottom-1 right-1 bg-black/70 text-white text-xs px-1.5 py-0.5 rounded">
                            {video.duration}
                          </div>
                          <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                            <Button 
                              variant="secondary" 
                              size="sm" 
                              className="h-8 w-8 p-0 bg-white/90"
                            >
                              <PlayCircle className="h-5 w-5 text-linguify-primary" />
                            </Button>
                          </div>
                        </div>
                        
                        <div className="ml-4 flex-grow">
                          <h4 className="font-medium">{video.title}</h4>
                          <div className="flex items-center text-xs text-gray-500 space-x-2 mt-1">
                            <span>{video.date}</span>
                            <span className="inline-block h-1 w-1 rounded-full bg-gray-500"></span>
                            <span>{video.wordsLearned} words learned</span>
                          </div>
                          
                          <div className="mt-2 bg-gray-200 rounded-full h-1.5 w-full">
                            <div 
                              className="bg-linguify-primary h-1.5 rounded-full"
                              style={{ width: `${video.progress}%` }}
                            ></div>
                          </div>
                          <div className="flex justify-between text-xs mt-1">
                            <span className="text-gray-500">{video.progress}% complete</span>
                            <Link to="/learn" className="text-linguify-primary">
                              Continue <ChevronRight className="h-3 w-3 inline" />
                            </Link>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <Button 
                    variant="outline" 
                    className="w-full mt-4"
                    asChild
                  >
                    <Link to="/learn">
                      View All Learning History
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
            
            <div className="space-y-8">
              <Card className="bg-white">
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl flex items-center">
                    <BarChart3 className="mr-2 h-5 w-5 text-linguify-primary" />
                    Your Progress
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ProgressBar 
                    progress={65} 
                    streak={5} 
                    wordsLearned={127} 
                    minutesWatched={263}
                  />
                </CardContent>
              </Card>
              
              <Card className="bg-white">
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl flex items-center">
                    <Calendar className="mr-2 h-5 w-5 text-linguify-primary" />
                    Weekly Activity
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-7 gap-1 mt-2">
                    {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, index) => (
                      <div key={index} className="text-center">
                        <div className="text-xs text-gray-500 mb-1">{day}</div>
                        <div 
                          className={`h-8 w-full rounded-md ${
                            index < 5 ? 'bg-linguify-primary' : 'bg-gray-200'
                          }`}
                          style={{ 
                            opacity: index < 5 ? (1 - (0.2 * (4 - index))) : 0.2 
                          }}
                        ></div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex justify-between items-center mt-4">
                    <div className="text-sm">
                      <span className="font-medium">5-day</span> streak
                    </div>
                    <div className="text-linguify-primary text-sm">
                      Keep it up!
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-white">
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl flex items-center">
                    <Award className="mr-2 h-5 w-5 text-linguify-primary" />
                    Achievements
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {achievements.map((achievement) => (
                      <div 
                        key={achievement.id} 
                        className={`flex items-center p-2 rounded-lg ${
                          achievement.completed ? 'bg-linguify-primary/5' : 'bg-gray-100'
                        }`}
                      >
                        <div className={`h-8 w-8 rounded-full flex items-center justify-center ${
                          achievement.completed ? 'bg-linguify-primary/20' : 'bg-gray-200'
                        }`}>
                          {achievement.icon}
                        </div>
                        <div className="ml-3 flex-grow">
                          <div className="font-medium">{achievement.name}</div>
                          <div className="text-xs text-gray-500">
                            {achievement.completed ? (
                              'Completed'
                            ) : (
                              'In progress'
                            )}
                          </div>
                        </div>
                        <div className="text-sm font-medium">
                          +{achievement.points} pts
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <Button 
                    variant="outline" 
                    className="w-full mt-4"
                  >
                    View All Achievements
                  </Button>
                </CardContent>
              </Card>
              
              <Card className="bg-gradient-to-br from-linguify-primary to-linguify-primary/80 text-white">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-lg font-bold">Today's Goal</h3>
                    <Target className="h-5 w-5" />
                  </div>
                  
                  <p className="mb-4 text-white/90">
                    Learn 10 new words from video content today!
                  </p>
                  
                  <div className="bg-white/20 h-2 rounded-full mb-2">
                    <div 
                      className="bg-white h-2 rounded-full"
                      style={{ width: '50%' }}
                    ></div>
                  </div>
                  
                  <div className="flex justify-between text-sm">
                    <span>5/10 words</span>
                    <span>50% complete</span>
                  </div>
                  
                  <Button 
                    className="w-full mt-4 bg-white text-linguify-primary hover:bg-white/90"
                    asChild
                  >
                    <Link to="/learn">
                      Continue Learning
                    </Link>
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

export default Dashboard;
