"use client";

import { Video } from '@/lib/types';
import VideoCard from './VideoCard';

interface VideoListProps {
  videos: Video[];
}

export default function VideoList({ videos }: VideoListProps) {
  if (videos.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        No videos found. Add channels and fetch videos to see them here!
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {videos.map((video) => (
        <VideoCard key={video.id} video={video} />
      ))}
    </div>
  );
}
