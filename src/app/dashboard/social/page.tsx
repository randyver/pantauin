'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  ExternalLink, ThumbsUp, MessageCircle, Newspaper,
} from 'lucide-react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts';
import { socialSignals } from '@/lib/dummy-data';
import { cn } from '@/lib/utils';
import { allSocialPosts, type SocialPost, type Source } from '@/lib/sosmed-dummy-data';
import { useSearch } from '@/lib/search-context';


function IconX({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.261 5.635 5.903-5.635Zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function IconInstagram({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    </svg>
  );
}

function IconTiktok({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V9.15a8.28 8.28 0 004.84 1.55V7.25a4.85 4.85 0 01-1.07-.56z" />
    </svg>
  );
}


function SourceIcon({ source, className }: { source: Source; className?: string }) {
  if (source === 'instagram') return <IconInstagram className={className} />;
  if (source === 'tiktok')    return <IconTiktok className={className} />;
  if (source === 'news')      return <Newspaper className={className} />;
  return <IconX className={className} />;
}

function iconBgClass(source: Source) {
  if (source === 'instagram') return 'bg-gradient-to-br from-pink-500 to-orange-400 text-white';
  if (source === 'tiktok')    return 'bg-black text-white';
  if (source === 'news')      return 'bg-blue-600 text-white';
  return 'bg-black text-white';
}

function sourceLabel(source: Source) {
  if (source === 'instagram') return 'Instagram';
  if (source === 'tiktok')    return 'TikTok';
  if (source === 'news')      return 'News';
  return 'X / Twitter';
}

type FilterSource = 'all' | Source;

const FILTERS: { value: FilterSource; label: string }[] = [
  { value: 'all',       label: 'Semua' },
  { value: 'web',       label: 'X / Twitter' },
  { value: 'instagram', label: 'Instagram' },
  { value: 'tiktok',   label: 'TikTok' },
  { value: 'news',     label: 'News' },
];

// ── Feed Card ────────────────────────────────────────────────────────────────

function FeedCard({ post, index }: { post: SocialPost; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04 }}
      className="glass rounded-2xl p-4 md:p-5 space-y-3 hover:ring-1 hover:ring-primary/20 transition-all"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <div className={cn('w-9 h-9 shrink-0 rounded-xl flex items-center justify-center', iconBgClass(post.source))}>
            <SourceIcon source={post.source} className="w-4 h-4" />
          </div>

          <div className="min-w-0">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-sm font-semibold truncate">{post.username}</span>
              <span className="text-[10px] text-muted-foreground bg-muted px-1.5 py-0.5 rounded-full shrink-0">
                {sourceLabel(post.source)}
              </span>
            </div>
            <p className="text-[11px] text-muted-foreground">{post.timeAgo} • {post.location}</p>
          </div>
        </div>

        <span className={cn(
          'shrink-0 text-[9px] font-black px-2 py-1 rounded-lg uppercase tracking-wider',
          post.sentiment === 'negative' ? 'bg-red-500/15 text-red-500' :
          post.sentiment === 'positive' ? 'bg-green-500/15 text-green-500' :
          'bg-yellow-500/15 text-yellow-600',
        )}>
          {post.sentiment === 'negative' ? 'KRITIS' :
           post.sentiment === 'positive' ? 'POSITIF' : 'NETRAL'}
        </span>
      </div>

      <p className="text-sm leading-relaxed">{post.content}</p>

      <div className="flex items-center justify-between pt-1">
        <div className="flex items-center gap-4 text-muted-foreground text-xs">
          <span className="flex items-center gap-1">
            <ThumbsUp className="w-3.5 h-3.5" />
            {post.likes.toLocaleString('id-ID')}
          </span>
          <span className="flex items-center gap-1">
            <MessageCircle className="w-3.5 h-3.5" />
            {post.comments.toLocaleString('id-ID')}
          </span>
        </div>
        <a
          href={post.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-muted-foreground hover:text-primary transition-colors"
        >
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>
    </motion.div>
  );
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function SocialSignalPage() {
  const [mounted, setMounted] = React.useState(false);
  const [filter, setFilter] = React.useState<FilterSource>('all');
  const { value: searchTerm } = useSearch();

  React.useEffect(() => setMounted(true), []);
  if (!mounted) return <div />;

  const basePosts = filter === 'all'
    ? allSocialPosts
    : allSocialPosts.filter(p => p.source === filter);

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
              <h3 className="text-base md:text-lg font-bold text-foreground">Tren Sosial</h3>
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
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="font-bold text-base flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500" />
              </span>
              Feed Intelijen
            </h2>
            {searchTerm && (
              <p className="text-xs text-muted-foreground mt-0.5">
                Filter: "{searchTerm}" — {displayedPosts.length} hasil
              </p>
            )}
          </div>

          <div className="flex items-center gap-1.5 flex-wrap">
            {FILTERS.map(({ value, label }) => {
              const isActive = filter === value;
              return (
                <button
                  key={value}
                  onClick={() => setFilter(value)}
                  className={cn(
                    'flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[10px] font-bold uppercase tracking-wider transition-colors',
                    isActive ? 'bg-foreground text-background' : 'glass hover:bg-primary/5',
                  )}
                >
                  {value !== 'all' && (
                    <span className={cn(
                      'w-3.5 h-3.5 shrink-0',
                      value === 'instagram' ? 'text-pink-500' :
                      value === 'tiktok'    ? '' :
                      value === 'news'      ? 'text-blue-500' : '',
                    )}>
                      <SourceIcon source={value as Source} className="w-3.5 h-3.5" />
                    </span>
                  )}
                  {label}
                </button>
              );
            })}
          </div>
        </div>

        {displayedPosts.length === 0 ? (
          <div className="floating-card p-8 text-center text-sm text-muted-foreground">
            Tidak ada post yang cocok dengan pencarian
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
            {displayedPosts.map((post, i) => (
              <FeedCard key={`${post.id}-${post.platform}`} post={post} index={i} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}