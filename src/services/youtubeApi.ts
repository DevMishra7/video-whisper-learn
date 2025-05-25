
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
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/captions?part=snippet&videoId=${videoId}&key=${this.apiKey}`
      );
      
      if (!response.ok) {
        throw new Error('Failed to fetch caption tracks');
      }
      
      const data = await response.json();
      
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
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/captions/${trackId}?tfmt=srv3&key=${this.apiKey}`
      );
      
      if (!response.ok) {
        throw new Error('Failed to fetch captions');
      }
      
      const xmlText = await response.text();
      return this.parseSubtitles(xmlText);
    } catch (error) {
      console.error('Error fetching captions:', error);
      return [];
    }
  }

  private parseSubtitles(xmlText: string): YouTubeCaption[] {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlText, 'text/xml');
    const textElements = xmlDoc.getElementsByTagName('text');
    
    const captions: YouTubeCaption[] = [];
    
    for (let i = 0; i < textElements.length; i++) {
      const element = textElements[i];
      const start = parseFloat(element.getAttribute('start') || '0');
      const duration = parseFloat(element.getAttribute('dur') || '3');
      const text = element.textContent || '';
      
      captions.push({
        start,
        duration,
        text: text.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
      });
    }
    
    return captions;
  }
}
