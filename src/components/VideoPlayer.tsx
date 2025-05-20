
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { AlertTriangle, Play, Pause, ChevronRight, Youtube } from 'lucide-react';
import { toast } from 'sonner';

interface VideoPlayerProps {
  onPause?: (timestamp: number) => void;
  onTimeUpdate?: (currentTime: number) => void;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ onPause, onTimeUpdate }) => {
  const [videoUrl, setVideoUrl] = useState('');
  const [videoId, setVideoId] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const videoRef = useRef<HTMLIFrameElement>(null);
  const [error, setError] = useState<string | null>(null);
  
  // Function to extract YouTube video ID from URL
  const extractYouTubeId = (url: string): string | null => {
    const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[7].length === 11) ? match[7] : null;
  };

  const handleUrlSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const id = extractYouTubeId(videoUrl);
    
    if (id) {
      setVideoId(id);
      setError(null);
      toast.success("Video loaded successfully!");
    } else {
      setError('Invalid YouTube URL. Please enter a valid YouTube video link.');
      toast.error("Invalid YouTube URL!");
    }
  };

  const handlePause = () => {
    setIsPlaying(false);
    if (onPause && currentTime > 0) {
      onPause(currentTime);
    }
  };

  const handlePlay = () => {
    setIsPlaying(true);
  };

  // Call onTimeUpdate when currentTime changes
  useEffect(() => {
    if (onTimeUpdate) {
      onTimeUpdate(currentTime);
    }
  }, [currentTime, onTimeUpdate]);

  // Mock function for YouTube iframe API
  useEffect(() => {
    // In a real implementation, we would use the YouTube iframe API
    // This is just a placeholder for demonstration purposes
    const timer = setInterval(() => {
      if (isPlaying) {
        setCurrentTime(prev => prev + 1);
      }
    }, 1000);
    
    return () => clearInterval(timer);
  }, [isPlaying]);

  return (
    <div className="w-full max-w-3xl mx-auto">
      {!videoId ? (
        <Card className="bg-white shadow-md">
          <CardContent className="pt-6">
            <h3 className="text-xl font-bold mb-4">Import a Video</h3>
            <form onSubmit={handleUrlSubmit} className="space-y-4">
              <div className="flex flex-col md:flex-row gap-3">
                <div className="flex-grow relative">
                  <Input
                    type="text"
                    placeholder="Paste YouTube URL here..."
                    value={videoUrl}
                    onChange={(e) => setVideoUrl(e.target.value)}
                    className="pr-10"
                  />
                  <Youtube className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                </div>
                <Button 
                  type="submit" 
                  className="bg-linguify-primary hover:bg-linguify-primary/90"
                >
                  Learn with this video <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </div>
              
              {error && (
                <div className="text-red-500 flex items-center text-sm mt-2">
                  <AlertTriangle size={16} className="mr-1" />
                  {error}
                </div>
              )}
              
              <div className="text-center py-4">
                <p className="text-gray-500 text-sm">or</p>
              </div>
              
              <Button 
                variant="outline" 
                className="w-full border-dashed border-2"
                type="button"
              >
                Upload your own video
              </Button>
            </form>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          <div className="video-container rounded-lg overflow-hidden shadow-lg">
            <iframe
              ref={videoRef}
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${videoId}?enablejsapi=1`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <span className="text-sm font-medium">{Math.floor(currentTime / 60)}:{(currentTime % 60).toString().padStart(2, '0')}</span>
            </div>
            
            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => isPlaying ? handlePause() : handlePlay()}
                className="flex items-center"
              >
                {isPlaying ? (
                  <>
                    <Pause className="mr-1 h-4 w-4" /> Pause
                  </>
                ) : (
                  <>
                    <Play className="mr-1 h-4 w-4" /> Play
                  </>
                )}
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setVideoId(null);
                  setVideoUrl('');
                  setCurrentTime(0);
                  setIsPlaying(false);
                }}
              >
                Reset
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoPlayer;
