"use client";

import { Video } from '@/lib/types';
import { useState } from 'react';

interface VideoCardProps {
  video: Video;
}

export default function VideoCard({ video }: VideoCardProps) {
  const [showDetails, setShowDetails] = useState(false);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow">
      <div className="aspect-video bg-gray-200 dark:bg-gray-700 relative">
        <img
          src={video.thumbnailUrl}
          alt={video.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
          {formatDate(video.publishedAt)}
        </div>
      </div>

      <div className="p-4">
        <div className="mb-2">
          <span className="text-xs font-semibold text-blue-600 dark:text-blue-400">
            {video.channelName}
          </span>
        </div>

        <h3 className="font-bold text-lg mb-2 line-clamp-2">{video.title}</h3>

        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
          {video.description}
        </p>

        {video.summary && (
          <>
            <button
              onClick={() => setShowDetails(!showDetails)}
              className="text-sm text-blue-600 dark:text-blue-400 hover:underline mb-3"
            >
              {showDetails ? 'Hide Details' : 'Show Summary & Insights'}
            </button>

            {showDetails && (
              <div className="mt-4 space-y-4 border-t pt-4">
                {video.summary.guests.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-sm mb-2">Guests:</h4>
                    <div className="flex flex-wrap gap-2">
                      {video.summary.guests.map((guest, idx) => (
                        <span
                          key={idx}
                          className="bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 text-xs px-2 py-1 rounded"
                        >
                          {guest}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div>
                  <h4 className="font-semibold text-sm mb-2">Main Points:</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm text-gray-700 dark:text-gray-300">
                    {video.summary.mainPoints.map((point, idx) => (
                      <li key={idx}>{point}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-sm mb-2">Key Quotes:</h4>
                  <div className="space-y-2">
                    {video.summary.keyQuotes.map((quote, idx) => (
                      <div key={idx} className="bg-gray-50 dark:bg-gray-700 p-3 rounded">
                        <p className="text-sm italic mb-1">&quot;{quote.text}&quot;</p>
                        <p className="text-xs text-gray-600 dark:text-gray-400">
                          — {quote.speaker}
                          {quote.timestamp && ` (${quote.timestamp})`}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-sm mb-2">Insights:</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm text-gray-700 dark:text-gray-300">
                    {video.summary.insights.map((insight, idx) => (
                      <li key={idx}>{insight}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </>
        )}

        <a
          href={`https://youtube.com/watch?v=${video.videoId}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-3 text-sm bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors"
        >
          Watch on YouTube
        </a>
      </div>
    </div>
  );
}
