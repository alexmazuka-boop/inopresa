import { Channel, Video } from './types';

const CHANNELS_KEY = 'youtube_channels';
const VIDEOS_KEY = 'youtube_videos';

export const storage = {
  getChannels: (): Channel[] => {
    if (typeof window === 'undefined') return [];
    const data = localStorage.getItem(CHANNELS_KEY);
    return data ? JSON.parse(data) : [];
  },

  saveChannels: (channels: Channel[]): void => {
    if (typeof window === 'undefined') return;
    localStorage.setItem(CHANNELS_KEY, JSON.stringify(channels));
  },

  addChannel: (channel: Channel): void => {
    const channels = storage.getChannels();
    channels.push(channel);
    storage.saveChannels(channels);
  },

  removeChannel: (channelId: string): void => {
    const channels = storage.getChannels().filter(c => c.id !== channelId);
    storage.saveChannels(channels);
  },

  getVideos: (): Video[] => {
    if (typeof window === 'undefined') return [];
    const data = localStorage.getItem(VIDEOS_KEY);
    return data ? JSON.parse(data) : [];
  },

  saveVideos: (videos: Video[]): void => {
    if (typeof window === 'undefined') return;
    localStorage.setItem(VIDEOS_KEY, JSON.stringify(videos));
  },

  addVideos: (newVideos: Video[]): void => {
    const existingVideos = storage.getVideos();
    const videoMap = new Map(existingVideos.map(v => [v.videoId, v]));
    
    newVideos.forEach(video => {
      videoMap.set(video.videoId, video);
    });
    
    const allVideos = Array.from(videoMap.values())
      .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
    
    storage.saveVideos(allVideos);
  }
};
