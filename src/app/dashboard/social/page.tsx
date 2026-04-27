'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  Signal, Send, Camera, Globe, ExternalLink, ThumbsUp, MessageCircle,
} from 'lucide-react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts';
import { socialSignals } from '@/lib/dummy-data';
import { cn } from '@/lib/utils';
import { allSocialPosts, criticalPosts, type SocialPost, type Source } from '@/lib/sosmed-dummy-data';
import { useSearch } from '@/lib/search-context';

function SourceIcon({ source }: { source: Source }) {
  if (source === 'telegram') return <Send className="w-4 h-4" />;
  if (source === 'instagram') return <Camera className="w-4 h-4" />;
  return <Globe className="w-4 h-4" />;
}

function iconBgClass(source: Source) {
  if (source === 'telegram') return 'bg-sky-100 text-sky-600';
  if (source === 'instagram') return 'bg-pink-100 text-pink-600';
  return 'bg-blue-100 text-blue-600';
}

function FeedCard({ post, index }: { post: SocialPost; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08 }}
      className="floating-card p-4 md:p-5 group"
    >
      <div className="flex items-center justify-between mb-3 md:mb-4">
        <div className="flex items-center gap-2">
          <div className={cn('w-7 h-7 md:w-8 md:h-8 rounded-lg flex items-center justify-center flex-shrink-0', iconBgClass(post.source))}>
            <SourceIcon source={post.source} />
          </div>
          <div>
            <p className="text-xs font-bold text-foreground">{post.username}</p>
            <p className="text-[10px] text-muted-foreground">{post.timeAgo} • {post.location}</p>
          </div>
        </div>

        <div className={cn(
          'px-2 py-0.5 rounded text-[10px] font-bold flex-shrink-0',
          post.sentiment === 'negative' && 'bg-red-100 text-red-600',
          post.sentiment === 'positive' && 'bg-green-100 text-green-600',
          post.sentiment === 'neutral' && 'bg-gray-100 text-gray-600',
        )}>
          {post.sentiment === 'negative' ? 'KRITIS' :
           post.sentiment === 'positive' ? 'POSITIF' : 'NETRAL'}
        </div>
      </div>

      <p className="text-xs md:text-sm text-foreground leading-relaxed mb-3 md:mb-4">{post.content}</p>

      <div className="flex items-center justify-between pt-3 border-t border-border/50">
        <div className="flex gap-3 md:gap-4">
          <div className="flex items-center gap-1.5 text-muted-foreground text-[10px] font-bold">
            <ThumbsUp className="w-3 h-3" /> {post.likes.toLocaleString('id-ID')}
          </div>
          <div className="flex items-center gap-1.5 text-muted-foreground text-[10px] font-bold">
            <MessageCircle className="w-3 h-3" /> {post.comments.toLocaleString('id-ID')}
          </div>
        </div>
        <a
          href={post.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary hover:bg-primary/5 p-1.5 rounded-lg transition-colors group-hover:scale-110 inline-flex"
        >
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>
    </motion.div>
  );
}

export default function SocialSignalPage() {
  const [mounted, setMounted] = React.useState(false);
  const [filter, setFilter] = React.useState<'all' | 'critical'>('all');
  const { value: searchTerm } = useSearch();

  React.useEffect(() => setMounted(true), []);
  if (!mounted) return <div className="h-screen" />;

  const basePosts = filter === 'critical' ? criticalPosts : allSocialPosts;
  const displayedPosts = basePosts.filter(post =>
    !searchTerm ||
    post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 md:space-y-8 animate-in fade-in duration-700">

      {/* Trends & Keywords */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
        <div className="lg:col-span-2 floating-card p-4 md:p-6">
          <div className="flex items-center justify-between mb-5 md:mb-8">
            <div>
              <h3 className="text-base md:text-lg font-bold text-foreground">Tren Denyut Sosial</h3>
              <p className="text-xs md:text-sm text-muted-foreground">Distribusi volume dan sentimen</p>
            </div>
            <div className="flex gap-2 md:gap-4">
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-green-500" />
                <span className="text-[10px] font-bold uppercase text-muted-foreground hidden sm:block">Positif</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-red-500" />
                <span className="text-[10px] font-bold uppercase text-muted-foreground hidden sm:block">Negatif</span>
              </div>
            </div>
          </div>
          <div className="h-[200px] md:h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={socialSignals.trends}>
                <defs>
                  <linearGradient id="colorPos" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorNeg" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#EF4444" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#EF4444" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="date" hide />
                <YAxis hide />
                <Tooltip
                  contentStyle={{ backgroundColor: 'rgba(255,255,255,0.9)', borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                />
                <Area type="monotone" dataKey="positive" stroke="#10B981" fillOpacity={1} fill="url(#colorPos)" strokeWidth={3} />
                <Area type="monotone" dataKey="negative" stroke="#EF4444" fillOpacity={1} fill="url(#colorNeg)" strokeWidth={3} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="floating-card p-4 md:p-6">
          <h3 className="text-base md:text-lg font-bold text-foreground mb-1">Kata Kunci Populer</h3>
          <p className="text-xs md:text-sm text-muted-foreground mb-4 md:mb-6">Awan topik dari ekstraksi sosial</p>
          <div className="flex flex-wrap gap-1.5 md:gap-2">
            {socialSignals.keywords.map((tag: { text: string; sentiment: string }, i: number) => (
              <motion.div
                key={tag.text}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.05 }}
                className={cn(
                  'px-2.5 md:px-3 py-1 md:py-1.5 rounded-xl text-[10px] md:text-xs font-bold cursor-pointer transition-all hover:scale-105',
                  tag.sentiment === 'negative' ? 'bg-red-50 text-red-600 border border-red-100' :
                  tag.sentiment === 'positive' ? 'bg-green-50 text-green-600 border border-green-100' :
                  'bg-gray-50 text-gray-600 border border-gray-100',
                )}
              >
                {tag.text}
              </motion.div>
            ))}
          </div>

          <div className="mt-6 md:mt-8 pt-6 md:pt-8 border-t border-border/50">
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-3 md:mb-4">Pembagian Sentimen</h4>
            <div className="flex items-center h-2 rounded-full overflow-hidden">
              <div className="h-full bg-green-500" style={{ width: '45%' }} />
              <div className="h-full bg-gray-200" style={{ width: '20%' }} />
              <div className="h-full bg-red-500" style={{ width: '35%' }} />
            </div>
            <div className="flex justify-between mt-2 text-[10px] font-bold uppercase text-muted-foreground">
              <span>Positif (45%)</span>
              <span>Negatif (35%)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Live Feed */}
      <div className="space-y-4 md:space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-[10px] md:text-sm font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
              <Signal className="w-3.5 h-3.5 md:w-4 md:h-4 text-primary animate-pulse" /> Feed Intelijen
            </h3>
            {searchTerm && (
              <p className="text-[10px] text-primary font-semibold mt-0.5">Filter: "{searchTerm}" — {displayedPosts.length} hasil</p>
            )}
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setFilter('all')}
              className={cn(
                'px-3 md:px-4 py-1.5 rounded-xl text-[10px] font-bold uppercase transition-colors',
                filter === 'all' ? 'bg-foreground text-white' : 'glass hover:bg-primary/5',
              )}
            >
              Semua
            </button>
            <button
              onClick={() => setFilter('critical')}
              className={cn(
                'px-3 md:px-4 py-1.5 rounded-xl text-[10px] font-bold uppercase transition-colors',
                filter === 'critical' ? 'bg-foreground text-white' : 'glass hover:bg-primary/5',
              )}
            >
              Kritis
            </button>
          </div>
        </div>

        {displayedPosts.length === 0 ? (
          <div className="floating-card p-8 text-center text-sm text-muted-foreground">
            Tidak ada post yang cocok dengan pencarian
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
            {displayedPosts.map((post, i) => (
              <FeedCard key={post.id} post={post} index={i} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}