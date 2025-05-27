
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

      // Use the provided YouTube API key
      const apiKey = 'AIzaSyCmiNHGvOZWiDTpBDjqrUUoVRF-SCbn7eQ';

      setLoading(true);
      setError(null);

      try {
        const youtubeService = new YouTubeApiService(apiKey);
        const tracks = await youtubeService.getCaptionTracks(videoId);
        
        if (tracks.length > 0) {
          // Use the first available caption track (usually English)
          const captionData = await youtubeService.getCaptions(tracks[0].id);
          setCaptions(captionData);
          console.log('Captions loaded successfully:', captionData.length, 'segments');
        } else {
          setError('No captions available for this video');
          setCaptions([]);
        }
      } catch (err) {
        setError('Failed to load captions from YouTube');
        console.error('Caption loading error:', err);
        setCaptions([]);
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
    } else {
      setCurrentCaption('');
    }
  }, [currentTime, captions]);

  return {
    captions,
    currentCaption,
    loading,
    error
  };
};
