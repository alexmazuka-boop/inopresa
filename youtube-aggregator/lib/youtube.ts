export function extractChannelId(input: string): string | null {
  const trimmed = input.trim();
  
  if (trimmed.startsWith('UC') && trimmed.length === 24) {
    return trimmed;
  }
  
  const patterns = [
    /youtube\.com\/channel\/(UC[\w-]{22})/,
    /youtube\.com\/@([\w-]+)/,
    /youtube\.com\/c\/([\w-]+)/,
    /youtube\.com\/user\/([\w-]+)/,
  ];
  
  for (const pattern of patterns) {
    const match = trimmed.match(pattern);
    if (match) {
      return match[1];
    }
  }
  
  return trimmed;
}

export function generateMockVideos(channelId: string, channelName: string, count: number = 5) {
  const videos = [];
  const now = new Date();
  
  for (let i = 0; i < count; i++) {
    const publishDate = new Date(now);
    publishDate.setDate(publishDate.getDate() - i);
    
    videos.push({
      id: `${channelId}-video-${i}`,
      channelId,
      channelName,
      title: `Latest Video ${i + 1} from ${channelName}`,
      description: `This is a sample video description for video ${i + 1}. In this video, we discuss important topics and share valuable insights.`,
      thumbnailUrl: `https://i.ytimg.com/vi/dQw4w9WgXcQ/mqdefault.jpg`,
      publishedAt: publishDate.toISOString(),
      videoId: `mock-video-${channelId}-${i}`,
      summary: {
        mainPoints: [
          `Key point ${i * 3 + 1} discussed in the video`,
          `Important topic ${i * 3 + 2} covered`,
          `Main takeaway ${i * 3 + 3} from the discussion`,
        ],
        keyQuotes: [
          {
            text: `This is an insightful quote from the video number ${i + 1}`,
            speaker: 'Host',
            timestamp: '5:30',
          },
          {
            text: `Another important statement made during the discussion`,
            speaker: 'Guest Speaker',
            timestamp: '12:45',
          },
        ],
        guests: i % 2 === 0 ? ['Guest Expert', 'Industry Professional'] : ['Special Guest'],
        insights: [
          `Valuable insight ${i + 1} about the topic`,
          `Interesting perspective on current trends`,
          `Practical advice for viewers`,
        ],
      },
    });
  }
  
  return videos;
}
