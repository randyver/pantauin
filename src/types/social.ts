export type Sentiment = 'positive' | 'negative' | 'neutral';
export type Platform = 'twitter' | 'instagram' | 'tiktok' | 'news';
export type Source = 'web' | 'instagram' | 'tiktok' | 'news';

export interface SocialPost {
  id: string;
  url: string;
  username: string;
  location: string;
  timeAgo: string;
  sentiment: Sentiment;
  content: string;
  likes: number;
  comments: number;
  platform: Platform;
  source: Source;
}
