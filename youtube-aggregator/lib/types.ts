export interface Channel {
  id: string;
  name: string;
  channelId: string;
  thumbnailUrl?: string;
  addedAt: string;
}

export interface Video {
  id: string;
  channelId: string;
  channelName: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  publishedAt: string;
  videoId: string;
  summary?: VideoSummary;
}

export interface VideoSummary {
  mainPoints: string[];
  keyQuotes: Quote[];
  guests: string[];
  insights: string[];
}

export interface Quote {
  text: string;
  speaker: string;
  timestamp?: string;
}
