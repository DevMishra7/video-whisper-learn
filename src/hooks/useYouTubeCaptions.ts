
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

      const apiKey = 'AIzaSyCmiNHGvOZWiDTpBDjqrUUoVRF-SCbn7eQ';

      setLoading(true);
      setError(null);

      try {
        const youtubeService = new YouTubeApiService(apiKey);
        const tracks = await youtubeService.getCaptionTracks(videoId);
        
        if (tracks.length > 0) {
          console.log('Caption tracks found, generating sample captions');
          // Since we can't access the actual captions without OAuth2, 
          // we'll generate sample captions that demonstrate the functionality
          const captionData = await youtubeService.getCaptions(tracks[0].id);
          setCaptions(captionData);
          console.log('Sample captions loaded successfully:', captionData.length, 'segments');
        } else {
          setError('No captions available for this video');
          setCaptions([]);
        }
      } catch (err) {
        console.log('Note: YouTube caption download requires OAuth2 authentication');
        console.log('Generating sample captions for demonstration');
        
        // Generate sample captions even if API fails
        const youtubeService = new YouTubeApiService(apiKey);
        const sampleCaptions = await youtubeService.getCaptions('sample');
        setCaptions(sampleCaptions);
        
        setError('Using sample captions (YouTube API requires OAuth2 for real captions)');
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
