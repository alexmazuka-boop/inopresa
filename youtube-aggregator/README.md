# YouTube Channel Aggregator

A modern web application that allows users to aggregate and view summaries of videos from their favorite YouTube channels in one place.

## Features

- **Add YouTube Channels**: Add channels by URL or channel ID
- **Manage Channel List**: View and remove channels from your collection
- **Fetch Latest Videos**: Get the most recent videos from all your channels
- **Video Summaries**: View detailed summaries including:
  - Main points discussed
  - Key quotes with timestamps
  - Guest information
  - Insights and takeaways
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Dark Mode Support**: Automatic dark mode based on system preferences
- **Local Storage**: All data is stored locally in your browser

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Navigate to the project directory:
```bash
cd youtube-aggregator
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Building for Production

```bash
npm run build
npm start
```

## Usage

1. **Add a Channel**:
   - Enter the channel name
   - Paste the YouTube channel URL or channel ID
   - Click "Add Channel"

2. **Fetch Videos**:
   - Click "Fetch Latest Videos" to get recent videos from all your channels
   - Videos are automatically sorted by publish date

3. **View Summaries**:
   - Click "Show Summary & Insights" on any video card
   - View guests, main points, key quotes, and insights
   - Click "Watch on YouTube" to view the full video

## Technology Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Storage**: Browser LocalStorage
- **Deployment**: Ready for Vercel deployment

## Note

This application currently uses mock data for video summaries. To integrate with real YouTube data, you would need to:

1. Set up YouTube Data API v3
2. Implement API routes for fetching channel and video data
3. Optionally integrate with AI services for generating summaries

## License

MIT
