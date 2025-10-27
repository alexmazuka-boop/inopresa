"use client";

import { Channel } from '@/lib/types';

interface ChannelListProps {
  channels: Channel[];
  onRemove: (channelId: string) => void;
}

export default function ChannelList({ channels, onRemove }: ChannelListProps) {
  if (channels.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        No channels added yet. Add your first channel above!
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {channels.map((channel) => (
        <div
          key={channel.id}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow"
        >
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className="font-semibold text-lg mb-1">{channel.name}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                ID: {channel.channelId}
              </p>
              <p className="text-xs text-gray-500">
                Added: {new Date(channel.addedAt).toLocaleDateString()}
              </p>
            </div>
            <button
              onClick={() => onRemove(channel.id)}
              className="ml-2 px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
              aria-label="Remove channel"
            >
              Remove
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
