"use client";

import { useState } from 'react';
import { extractChannelId } from '@/lib/youtube';

interface AddChannelFormProps {
  onAdd: (channelId: string, channelName: string) => void;
}

export default function AddChannelForm({ onAdd }: AddChannelFormProps) {
  const [channelInput, setChannelInput] = useState('');
  const [channelName, setChannelName] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!channelInput.trim() || !channelName.trim()) {
      setError('Please fill in both fields');
      return;
    }

    const channelId = extractChannelId(channelInput);
    if (!channelId) {
      setError('Invalid channel URL or ID');
      return;
    }

    onAdd(channelId, channelName.trim());
    setChannelInput('');
    setChannelName('');
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
      <h2 className="text-2xl font-bold mb-4">Add YouTube Channel</h2>
      
      <div className="space-y-4">
        <div>
          <label htmlFor="channelName" className="block text-sm font-medium mb-2">
            Channel Name
          </label>
          <input
            id="channelName"
            type="text"
            value={channelName}
            onChange={(e) => setChannelName(e.target.value)}
            placeholder="e.g., Tech Channel"
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700"
          />
        </div>

        <div>
          <label htmlFor="channelInput" className="block text-sm font-medium mb-2">
            Channel URL or ID
          </label>
          <input
            id="channelInput"
            type="text"
            value={channelInput}
            onChange={(e) => setChannelInput(e.target.value)}
            placeholder="e.g., https://youtube.com/@channelname or UC..."
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700"
          />
        </div>

        {error && (
          <div className="text-red-500 text-sm">{error}</div>
        )}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium"
        >
          Add Channel
        </button>
      </div>
    </form>
  );
}
