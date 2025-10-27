"use client";

import { useState, useEffect } from 'react';
import AddChannelForm from '@/components/AddChannelForm';
import ChannelList from '@/components/ChannelList';
import VideoList from '@/components/VideoList';
import { Channel, Video } from '@/lib/types';
import { storage } from '@/lib/storage';
import { generateMockVideos } from '@/lib/youtube';

export default function Home() {
  const [channels, setChannels] = useState<Channel[]>([]);
  const [videos, setVideos] = useState<Video[]>([]);
  const [activeTab, setActiveTab] = useState<'channels' | 'videos'>('channels');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setChannels(storage.getChannels());
    setVideos(storage.getVideos());
  }, []);

  const handleAddChannel = (channelId: string, channelName: string) => {
    const newChannel: Channel = {
      id: `${Date.now()}-${channelId}`,
      name: channelName,
      channelId,
      addedAt: new Date().toISOString(),
    };

    storage.addChannel(newChannel);
    setChannels(storage.getChannels());
  };

  const handleRemoveChannel = (channelId: string) => {
    storage.removeChannel(channelId);
    setChannels(storage.getChannels());
  };

  const handleFetchVideos = async () => {
    setIsLoading(true);
    
    const allChannels = storage.getChannels();
    const newVideos: Video[] = [];

    for (const channel of allChannels) {
      const mockVideos = generateMockVideos(channel.channelId, channel.name, 5);
      newVideos.push(...mockVideos);
    }

    storage.addVideos(newVideos);
    setVideos(storage.getVideos());
    setIsLoading(false);
    setActiveTab('videos');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <header className="mb-8">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            YouTube Channel Aggregator
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Collect and summarize videos from your favorite YouTube channels
          </p>
        </header>

        <div className="mb-6 flex flex-wrap gap-4 items-center">
          <div className="flex gap-2 bg-white dark:bg-gray-800 rounded-lg p-1 shadow">
            <button
              onClick={() => setActiveTab('channels')}
              className={`px-6 py-2 rounded-md transition-colors font-medium ${
                activeTab === 'channels'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              Channels ({channels.length})
            </button>
            <button
              onClick={() => setActiveTab('videos')}
              className={`px-6 py-2 rounded-md transition-colors font-medium ${
                activeTab === 'videos'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              Videos ({videos.length})
            </button>
          </div>

          {channels.length > 0 && (
            <button
              onClick={handleFetchVideos}
              disabled={isLoading}
              className="ml-auto px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed shadow"
            >
              {isLoading ? 'Fetching...' : 'Fetch Latest Videos'}
            </button>
          )}
        </div>

        <div className="space-y-8">
          {activeTab === 'channels' && (
            <>
              <AddChannelForm onAdd={handleAddChannel} />
              <div>
                <h2 className="text-2xl font-bold mb-4">Your Channels</h2>
                <ChannelList channels={channels} onRemove={handleRemoveChannel} />
              </div>
            </>
          )}

          {activeTab === 'videos' && (
            <div>
              <h2 className="text-2xl font-bold mb-4">Latest Videos</h2>
              <VideoList videos={videos} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
