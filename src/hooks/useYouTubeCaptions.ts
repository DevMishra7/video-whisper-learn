
import { useState, useEffect } from 'react';
import { TranscriptApiService } from '@/services/transcriptApi';

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

      setLoading(true);
      setError(null);

      try {
        console.log('Fetching real transcript for video:', videoId);
        const transcriptService = new TranscriptApiService();
        const transcriptData = await transcriptService.getTranscript(videoId);
        
        // Convert transcript format to caption format
        const captionData: YouTubeCaption[] = transcriptData.map(item => ({
          start: item.start,
          duration: item.duration,
          text: item.text
        }));
        
        setCaptions(captionData);
        console.log('Transcript loaded successfully:', captionData.length, 'segments');
        
        if (captionData.length === 0) {
          setError('No transcript available for this video');
        }
      } catch (err) {
        console.error('Error fetching transcript:', err);
        setError('Failed to load transcript for this video');
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
