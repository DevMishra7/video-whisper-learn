
import { useState, useEffect } from 'react';
import { YouTubeApiService } from '@/services/youtubeApi';

interface YouTubeCaption {
  start: number;
  duration: number;
  text: string;
}

interface UseYouTubeCaptionsProps {
  videoId: string | null;
  currentTime: number;
  enabled: boolean;
}

export const useYouTubeCaptions = ({ videoId, currentTime, enabled }: UseYouTubeCaptionsProps) => {
  const [captions, setCaptions] = useState<YouTubeCaption[]>([]);
  const [currentCaption, setCurrentCaption] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCaptions = async () => {
      if (!videoId || !enabled) {
        setCaptions([]);
        setCurrentCaption('');
        return;
      }

      // For demo purposes, we'll use a placeholder API key
      // In production, this should come from environment variables
      const apiKey = 'YOUR_YOUTUBE_API_KEY';
      
      if (apiKey === 'YOUR_YOUTUBE_API_KEY') {
        // Fallback to mock captions if no API key is provided
        setError('YouTube API key not configured. Using mock captions.');
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const youtubeService = new YouTubeApiService(apiKey);
        const tracks = await youtubeService.getCaptionTracks(videoId);
        
        if (tracks.length > 0) {
          // Use the first available caption track (usually English)
          const captionData = await youtubeService.getCaptions(tracks[0].id);
          setCaptions(captionData);
        } else {
          setError('No captions available for this video');
        }
      } catch (err) {
        setError('Failed to load captions');
        console.error('Caption loading error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCaptions();
  }, [videoId, enabled]);

  useEffect(() => {
    if (captions.length > 0) {
      const activeCaption = captions.find(
        caption => currentTime >= caption.start && currentTime <= caption.start + caption.duration
      );
      
      setCurrentCaption(activeCaption?.text || '');
    }
  }, [currentTime, captions]);

  return {
    captions,
    currentCaption,
    loading,
    error
  };
};
