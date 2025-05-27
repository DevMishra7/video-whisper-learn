
interface YouTubeCaptionTrack {
  id: string;
  name: string;
  languageCode: string;
  url: string;
}

interface YouTubeCaption {
  start: number;
  duration: number;
  text: string;
}

export class YouTubeApiService {
  private apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async getCaptionTracks(videoId: string): Promise<YouTubeCaptionTrack[]> {
    try {
      console.log('Fetching caption tracks for video:', videoId);
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/captions?part=snippet&videoId=${videoId}&key=${this.apiKey}`
      );
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Caption tracks API error:', response.status, errorText);
        throw new Error(`Failed to fetch caption tracks: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('Caption tracks response:', data);
      
      if (!data.items || data.items.length === 0) {
        console.log('No caption tracks found for this video');
        return [];
      }
      
      return data.items.map((item: any) => ({
        id: item.id,
        name: item.snippet.name,
        languageCode: item.snippet.language,
        url: `https://www.googleapis.com/youtube/v3/captions/${item.id}?key=${this.apiKey}`
      }));
    } catch (error) {
      console.error('Error fetching caption tracks:', error);
      return [];
    }
  }

  async getCaptions(trackId: string): Promise<YouTubeCaption[]> {
    try {
      console.log('Fetching captions for track:', trackId);
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/captions/${trackId}?tfmt=srv3&key=${this.apiKey}`,
        {
          headers: {
            'Accept': 'application/xml, text/xml, */*'
          }
        }
      );
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Captions API error:', response.status, errorText);
        throw new Error(`Failed to fetch captions: ${response.status}`);
      }
      
      const xmlText = await response.text();
      console.log('Raw caption XML received, length:', xmlText.length);
      
      const captions = this.parseSubtitles(xmlText);
      console.log('Parsed captions:', captions.length, 'segments');
      
      return captions;
    } catch (error) {
      console.error('Error fetching captions:', error);
      return [];
    }
  }

  private parseSubtitles(xmlText: string): YouTubeCaption[] {
    try {
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(xmlText, 'text/xml');
      
      // Check for parsing errors
      const parserError = xmlDoc.querySelector('parsererror');
      if (parserError) {
        console.error('XML parsing error:', parserError.textContent);
        return [];
      }
      
      const textElements = xmlDoc.getElementsByTagName('text');
      console.log('Found text elements:', textElements.length);
      
      const captions: YouTubeCaption[] = [];
      
      for (let i = 0; i < textElements.length; i++) {
        const element = textElements[i];
        const start = parseFloat(element.getAttribute('start') || '0');
        const duration = parseFloat(element.getAttribute('dur') || '3');
        const text = element.textContent || '';
        
        if (text.trim()) {
          captions.push({
            start,
            duration,
            text: this.decodeHtmlEntities(text.trim())
          });
        }
      }
      
      return captions;
    } catch (error) {
      console.error('Error parsing subtitles XML:', error);
      return [];
    }
  }

  private decodeHtmlEntities(text: string): string {
    const textarea = document.createElement('textarea');
    textarea.innerHTML = text;
    return textarea.value;
  }
}
