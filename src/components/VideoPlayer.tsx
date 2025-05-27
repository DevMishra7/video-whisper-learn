
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { AlertTriangle, Play, Pause, ChevronRight, Youtube, Captions, CaptionsOff } from 'lucide-react';
import { toast } from 'sonner';
import { useYouTubeCaptions } from '@/hooks/useYouTubeCaptions';

interface VideoPlayerProps {
  onPause?: (timestamp: number) => void;
  onTimeUpdate?: (currentTime: number) => void;
  onCaptionsUpdate?: (captions: string) => void;
  onCaptionsDataUpdate?: (captions: any[]) => void;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ 
  onPause, 
  onTimeUpdate,
  onCaptionsUpdate,
  onCaptionsDataUpdate
}) => {
  const [videoUrl, setVideoUrl] = useState('');
  const [videoId, setVideoId] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [captionsEnabled, setCaptionsEnabled] = useState(true);
  const videoRef = useRef<HTMLIFrameElement>(null);
  const [error, setError] = useState<string | null>(null);
  
  const { captions, currentCaption, loading, error: captionsError } = useYouTubeCaptions({
    videoId,
    currentTime,
    enabled: captionsEnabled
  });

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
      setCurrentTime(0);
      setIsPlaying(false);
      toast.success("Video loaded! Loading transcript...");
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

  const toggleCaptions = () => {
    setCaptionsEnabled(prev => !prev);
    if (!captionsEnabled) {
      toast.info("Captions enabled");
    } else {
      toast.info("Captions disabled");
      if (onCaptionsUpdate) {
        onCaptionsUpdate("");
      }
    }
  };

  // Update parent component with current caption
  useEffect(() => {
    if (onCaptionsUpdate) {
      onCaptionsUpdate(currentCaption);
    }
  }, [currentCaption, onCaptionsUpdate]);

  // Update parent component with full captions data
  useEffect(() => {
    if (onCaptionsDataUpdate && captions.length > 0) {
      onCaptionsDataUpdate(captions);
      toast.success("Transcript loaded successfully!");
    }
  }, [captions, onCaptionsDataUpdate]);

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
      if (isPlaying && videoId) {
        setCurrentTime(prev => prev + 1);
      }
    }, 1000);
    
    return () => clearInterval(timer);
  }, [isPlaying, videoId]);

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
          <div className="video-container rounded-lg overflow-hidden shadow-lg relative">
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
            
            {captionsEnabled && currentCaption && (
              <div className="absolute bottom-8 left-0 right-0 text-center">
                <div className="bg-black bg-opacity-70 text-white px-4 py-2 mx-auto inline-block rounded">
                  {currentCaption}
                </div>
              </div>
            )}
            
            {captionsEnabled && captionsError && (
              <div className="absolute bottom-8 left-0 right-0 text-center">
                <div className="bg-red-600 bg-opacity-70 text-white px-4 py-2 mx-auto inline-block rounded text-sm">
                  {captionsError}
                </div>
              </div>
            )}
            
            {captionsEnabled && loading && (
              <div className="absolute bottom-8 left-0 right-0 text-center">
                <div className="bg-blue-600 bg-opacity-70 text-white px-4 py-2 mx-auto inline-block rounded text-sm">
                  Loading transcript...
                </div>
              </div>
            )}
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <span className="text-sm font-medium">{Math.floor(currentTime / 60)}:{(currentTime % 60).toString().padStart(2, '0')}</span>
            </div>
            
            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={toggleCaptions}
                className="flex items-center"
                title={captionsEnabled ? "Disable captions" : "Enable captions"}
              >
                {captionsEnabled ? (
                  <Captions className="h-4 w-4" />
                ) : (
                  <CaptionsOff className="h-4 w-4" />
                )}
              </Button>
                
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
                  if (onCaptionsUpdate) {
                    onCaptionsUpdate("");
                  }
                  if (onCaptionsDataUpdate) {
                    onCaptionsDataUpdate([]);
                  }
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
