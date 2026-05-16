'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ExternalLink, ThumbsUp, MessageCircle, Newspaper,
  Bot, Activity, AlertTriangle, Radar,
  ChevronLeft, ChevronRight,
} from 'lucide-react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts';
import { cn } from '@/lib/utils';
import { type SocialPost, type Source } from '@/types/social';
import { useSearch } from '@/lib/search-context';
import { fetchPosts, fetchPostsStats, fetchOverviewTrends, type PostsStats } from '@/lib/api';

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
  if (source === 'tiktok')    return 'bg-zinc-900 text-white';
  if (source === 'news')      return 'bg-blue-600 text-white';
  return 'bg-zinc-900 text-white';
}

function sourceLabel(source: Source) {
  if (source === 'instagram') return 'Instagram';
  if (source === 'tiktok')    return 'TikTok';
  if (source === 'news')      return 'News';
  return 'X / Twitter';
}

const PAGE_SIZE = 9;

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
      className="group relative glass rounded-2xl p-4 md:p-5 space-y-4 hover:ring-1 hover:ring-primary/40 hover:shadow-[0_0_20px_rgba(var(--primary),0.1)] transition-all overflow-hidden flex flex-col h-full"
    >
      {/* Decorative tech background */}
      <div className="absolute right-0 top-0 w-32 h-32 bg-gradient-to-bl from-foreground/5 to-transparent rounded-bl-full pointer-events-none opacity-50 group-hover:opacity-100 transition-opacity" />
      
      <div className="flex items-start justify-between gap-3 relative z-10">
        <div className="flex items-center gap-3 min-w-0">
          <div className={cn('w-10 h-10 shrink-0 rounded-xl flex items-center justify-center shadow-sm relative overflow-hidden', iconBgClass(post.source))}>
            <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
            <SourceIcon source={post.source} className="w-4.5 h-4.5 relative z-10" />
          </div>

          <div className="min-w-0">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-sm font-bold text-foreground truncate max-w-[120px] sm:max-w-[160px]">{post.username}</span>
              <span className="text-[9px] font-mono text-muted-foreground bg-muted/50 border border-border/50 px-1.5 py-0.5 rounded-md shrink-0">
                {sourceLabel(post.source)}
              </span>
            </div>
            <p className="text-[11px] text-muted-foreground font-medium mt-0.5 flex items-center gap-1">
              {post.timeAgo} <span className="w-1 h-1 rounded-full bg-border" /> {post.location}
            </p>
          </div>
        </div>

        <span className={cn(
          'shrink-0 text-[10px] font-black px-2.5 py-1 rounded-lg uppercase tracking-wider border backdrop-blur-md',
          post.sentiment === 'negative' ? 'bg-red-500/10 text-red-500 border-red-500/20' :
          post.sentiment === 'positive' ? 'bg-green-500/10 text-green-500 border-green-500/20' :
          'bg-yellow-500/10 text-yellow-600 border-yellow-500/20',
        )}>
          {post.sentiment === 'negative' ? 'KRITIS' :
           post.sentiment === 'positive' ? 'POSITIF' : 'NETRAL'}
        </span>
      </div>

      <p className="text-sm leading-relaxed text-foreground/90 relative z-10 flex-grow">{post.content}</p>

      {/* Metadata block */}
      <div className="bg-muted/30 border border-border/50 rounded-xl p-3 flex items-center justify-between mt-auto">
        <div className="flex items-center gap-3 text-muted-foreground text-xs">
          <span className="flex items-center gap-1 font-medium">
            <ThumbsUp className="w-3.5 h-3.5" />
            {post.likes > 1000 ? (post.likes / 1000).toFixed(1) + 'k' : post.likes}
          </span>
          <span className="flex items-center gap-1 font-medium">
            <MessageCircle className="w-3.5 h-3.5" />
            {post.comments > 1000 ? (post.comments / 1000).toFixed(1) + 'k' : post.comments}
          </span>
        </div>

        <a
          href={post.url}
          target="_blank"
          rel="noopener noreferrer"
          className="w-8 h-8 rounded-full bg-background border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 transition-all shadow-sm"
        >
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>
    </motion.div>
  );
}

// ── Page ─────────────────────────────────────────────────────────────────────

const RANGE_OPTIONS: Array<{ label: string; days: number }> = [
  { label: '7 Hari', days: 7 },
  { label: '30 Hari', days: 30 },
  { label: '3 Bulan', days: 90 },
];

export default function SocialSignalPage() {
  const [mounted, setMounted] = React.useState(false);
  const [filter, setFilter] = React.useState<FilterSource>('all');
  const [page, setPage] = React.useState(1);
  const [posts, setPosts] = React.useState<SocialPost[]>([]);
  const [totalPosts, setTotalPosts] = React.useState(0);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [stats, setStats] = React.useState<PostsStats | null>(null);
  const [trends, setTrends] = React.useState<Array<{ date: string; positive: number; negative: number; neutral: number; mentions: number }>>([]);
  const [trendDays, setTrendDays] = React.useState<number>(7);
  const [trendLoading, setTrendLoading] = React.useState(false);
  const { value: searchTerm } = useSearch();

  React.useEffect(() => setMounted(true), []);
  React.useEffect(() => setPage(1), [filter, searchTerm]);

  React.useEffect(() => {
    fetchPostsStats(trendDays).then(setStats).catch((e) => console.warn('stats fetch failed:', e));
  }, [trendDays]);

  React.useEffect(() => {
    setTrendLoading(true);
    fetchOverviewTrends(trendDays)
      .then(setTrends)
      .catch((e) => console.warn('trends fetch failed:', e))
      .finally(() => setTrendLoading(false));
  }, [trendDays]);

  React.useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    fetchPosts({ platform: filter, q: searchTerm || undefined, page, pageSize: PAGE_SIZE })
      .then((res) => {
        if (cancelled) return;
        setPosts(res.posts);
        setTotalPosts(res.total);
      })
      .catch((e) => { if (!cancelled) setError(e instanceof Error ? e.message : 'Gagal memuat data'); })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, [filter, searchTerm, page]);

  if (!mounted) return <div />;

  const totalPages = Math.max(1, Math.ceil(totalPosts / PAGE_SIZE));
  const displayedPosts = posts;

  return (
    <div className="sm:ml-4 space-y-6 md:space-y-8 animate-in fade-in duration-700 pb-12">

      {/* Trends & Keywords */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
        <div className="lg:col-span-2 floating-card p-4 md:p-6 flex flex-col relative overflow-hidden">
          <div className="absolute top-0 right-0 p-32 bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
            <div>
              <h3 className="text-base md:text-lg font-bold text-foreground flex items-center gap-2">
                <Activity className="w-5 h-5 text-primary" />
                Pulse Sentimen Nasional
              </h3>
              <p className="text-xs md:text-sm text-muted-foreground mt-1">
                {stats?.ratio.total
                  ? `Distribusi sentimen dari ${stats.ratio.total.toLocaleString('id-ID')} sinyal`
                  : 'Distribusi sentimen harian'}
              </p>
            </div>
            <div className="flex items-center gap-3 flex-wrap">
              <div className="flex items-center gap-1 bg-muted/30 p-0.5 rounded-lg border border-border/50">
                {RANGE_OPTIONS.map((opt) => (
                  <button
                    key={opt.days}
                    onClick={() => setTrendDays(opt.days)}
                    className={cn(
                      'px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider transition-all',
                      trendDays === opt.days
                        ? 'bg-background text-foreground shadow-sm'
                        : 'text-muted-foreground hover:text-foreground'
                    )}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
              <div className="flex gap-2">
                <div className="flex items-center gap-2 bg-green-500/10 px-2.5 py-1 rounded-md border border-green-500/20">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-[10px] font-bold uppercase text-green-600 hidden sm:block">Positif</span>
                </div>
                <div className="flex items-center gap-2 bg-red-500/10 px-2.5 py-1 rounded-md border border-red-500/20">
                  <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                  <span className="text-[10px] font-bold uppercase text-red-600 hidden sm:block">Negatif</span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex-1 min-h-[250px] md:min-h-[300px] w-full relative">
            {trendLoading && (
              <div className="absolute inset-0 flex items-center justify-center text-xs text-muted-foreground z-10 bg-background/40 backdrop-blur-[2px]">
                Memuat...
              </div>
            )}
            {!trendLoading && trends.length === 0 ? (
              <div className="absolute inset-0 flex items-center justify-center text-xs text-muted-foreground">
                Belum ada data dalam rentang ini
              </div>
            ) : (
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trends} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorPos" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorNeg" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#EF4444" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#EF4444" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" opacity={0.5} />
                <XAxis dataKey="date" tick={{fontSize: 12, fill: 'hsl(var(--muted-foreground))'}} axisLine={false} tickLine={false} />
                <YAxis tick={{fontSize: 12, fill: 'hsl(var(--muted-foreground))'}} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: 'hsl(var(--background))', borderRadius: '12px', border: '1px solid hsl(var(--border))', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.2)' }}
                  labelStyle={{ fontWeight: 'bold', color: 'hsl(var(--foreground))', marginBottom: '8px' }}
                />
                <Area type="monotone" dataKey="positive" stroke="#10B981" fillOpacity={1} fill="url(#colorPos)" strokeWidth={3} activeDot={{r: 6, fill: '#10B981', stroke: '#fff', strokeWidth: 2}} />
                <Area type="monotone" dataKey="negative" stroke="#EF4444" fillOpacity={1} fill="url(#colorNeg)" strokeWidth={3} activeDot={{r: 6, fill: '#EF4444', stroke: '#fff', strokeWidth: 2}} />
              </AreaChart>
            </ResponsiveContainer>
            )}
          </div>
        </div>

        <div className="floating-card p-4 md:p-6 flex flex-col h-full">
          <div className="mb-6">
            <h3 className="text-base md:text-lg font-bold text-foreground flex items-center gap-2 mb-1">
              <Radar className="w-5 h-5 text-primary" />
              Entitas Terdeteksi
            </h3>
            <p className="text-xs md:text-sm text-muted-foreground">Ekstraksi NLP dari dataset terkini</p>
          </div>
          
          <div className="flex flex-wrap gap-2 mb-8">
            {stats?.topEntities.length ? (
              stats.topEntities.map((tag, i) => (
                <motion.div
                  key={tag.entity}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.05 }}
                  className={cn(
                    'flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium cursor-pointer transition-all hover:scale-105 border backdrop-blur-sm',
                    tag.sentiment === 'negative' ? 'bg-red-500/5 text-red-600 dark:text-red-400 border-red-500/20 hover:bg-red-500/10' :
                    tag.sentiment === 'positive' ? 'bg-green-500/5 text-green-600 dark:text-green-400 border-green-500/20 hover:bg-green-500/10' :
                    'bg-muted/50 text-foreground border-border hover:bg-muted',
                  )}
                >
                  <span>{tag.entity}</span>
                  <span className="text-[9px] px-1.5 py-0.5 rounded bg-background/50 font-mono opacity-80">
                    {tag.n}
                  </span>
                </motion.div>
              ))
            ) : (
              <p className="text-xs text-muted-foreground">Belum ada entitas terdeteksi</p>
            )}
          </div>

          <div className="mt-auto pt-6 border-t border-border/50">
            <h4 className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4">
              <Bot className="w-3.5 h-3.5" /> Rasio Sentimen
            </h4>
            {(() => {
              const total = stats?.ratio.total ?? 0;
              const posPct = total > 0 ? (stats!.ratio.positive / total) * 100 : 0;
              const neuPct = total > 0 ? (stats!.ratio.neutral / total) * 100 : 0;
              const negPct = total > 0 ? (stats!.ratio.negative / total) * 100 : 0;
              return (
                <>
                  <div className="relative h-3 rounded-full overflow-hidden bg-muted flex shadow-inner">
                    <div className="h-full bg-green-500 transition-all duration-1000 relative" style={{ width: `${posPct}%` }}>
                      <div className="absolute inset-0 bg-white/20 animate-pulse" />
                    </div>
                    <div className="h-full bg-zinc-400 transition-all duration-1000" style={{ width: `${neuPct}%` }} />
                    <div className="h-full bg-red-500 transition-all duration-1000 relative" style={{ width: `${negPct}%` }}>
                      <div className="absolute inset-0 bg-black/10" />
                    </div>
                  </div>
                  <div className="flex justify-between mt-3 text-[10px] font-bold uppercase text-muted-foreground">
                    <span className="text-green-600 dark:text-green-500">Positif ({Math.round(posPct)}%)</span>
                    <span className="text-zinc-500">Netral ({Math.round(neuPct)}%)</span>
                    <span className="text-red-600 dark:text-red-500">Negatif ({Math.round(negPct)}%)</span>
                  </div>
                </>
              );
            })()}
          </div>
        </div>
      </div>

      {/* Live Feed */}
      <div className="space-y-5 pt-4">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
          <div>
            <h2 className="font-bold text-xl md:text-2xl flex items-center gap-3">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500" />
              </span>
              Live Data Feed
            </h2>
            <p className="text-sm text-muted-foreground mt-1.5">
              {totalPosts > 0
                ? `Menampilkan ${displayedPosts.length} dari ${totalPosts.toLocaleString('id-ID')} sinyal terpantau.`
                : 'Belum ada sinyal terpantau.'}
              {searchTerm && <span className="text-primary font-medium ml-1">Filter aktif: "{searchTerm}"</span>}
            </p>
          </div>

          <div className="flex items-center gap-2 flex-wrap bg-muted/30 p-1.5 rounded-2xl border border-border/50">
            {FILTERS.map(({ value, label }) => {
              const isActive = filter === value;
              return (
                <button
                  key={value}
                  onClick={() => setFilter(value)}
                  className={cn(
                    'flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all',
                    isActive 
                      ? 'bg-background text-foreground shadow-sm border border-border' 
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted/50 border border-transparent',
                  )}
                >
                  {value !== 'all' && (
                    <span className={cn(
                      'w-3.5 h-3.5 shrink-0',
                      value === 'instagram' ? 'text-pink-500' :
                      value === 'tiktok'    ? 'text-foreground' :
                      value === 'news'      ? 'text-blue-500' : 'text-blue-400',
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

        {loading ? (
          <div className="glass rounded-2xl p-12 text-center flex flex-col items-center justify-center border-dashed">
            <Radar className="w-12 h-12 text-muted-foreground/30 mb-4 animate-spin-slow" />
            <h3 className="text-lg font-bold text-foreground">Memuat data...</h3>
          </div>
        ) : error ? (
          <div className="glass rounded-2xl p-12 text-center flex flex-col items-center justify-center border-dashed border-red-500/30">
            <AlertTriangle className="w-12 h-12 text-red-400/60 mb-4" />
            <h3 className="text-lg font-bold text-foreground">Gagal memuat data</h3>
            <p className="text-sm text-muted-foreground max-w-sm mt-2">{error}</p>
          </div>
        ) : displayedPosts.length === 0 ? (
          <div className="glass rounded-2xl p-12 text-center flex flex-col items-center justify-center border-dashed">
            <Radar className="w-12 h-12 text-muted-foreground/30 mb-4 animate-spin-slow" />
            <h3 className="text-lg font-bold text-foreground">Tidak ada anomali terdeteksi</h3>
            <p className="text-sm text-muted-foreground max-w-sm mt-2">Sistem AI tidak menemukan post yang cocok dengan parameter pencarian Anda.</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
              <AnimatePresence>
                {displayedPosts.map((post, i) => (
                  <FeedCard key={`${post.id}-${post.platform}`} post={post} index={i} />
                ))}
              </AnimatePresence>
            </div>

            {totalPages > 1 && (
              <div className="flex items-center justify-between pt-4 border-t border-border/30">
                <p className="text-xs text-muted-foreground">
                  {(page - 1) * PAGE_SIZE + 1}–{Math.min(page * PAGE_SIZE, totalPosts)} dari {totalPosts} post
                </p>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setPage(p => Math.max(1, p - 1))}
                    disabled={page === 1}
                    className="p-1.5 rounded-lg border border-border/50 disabled:opacity-30 hover:bg-muted/30 transition-colors"
                  >
                    <ChevronLeft className="w-3.5 h-3.5" />
                  </button>
                  {Array.from({ length: Math.min(totalPages, 7) }, (_, i) => {
                    const p = totalPages <= 7 ? i + 1 : page <= 4 ? i + 1 : page >= totalPages - 3 ? totalPages - 6 + i : page - 3 + i;
                    return (
                      <button
                        key={p}
                        onClick={() => setPage(p)}
                        className={cn(
                          'w-7 h-7 rounded-lg text-xs font-medium transition-colors',
                          page === p ? 'bg-foreground text-white' : 'hover:bg-muted/30 text-muted-foreground'
                        )}
                      >
                        {p}
                      </button>
                    );
                  })}
                  <button
                    onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                    disabled={page === totalPages}
                    className="p-1.5 rounded-lg border border-border/50 disabled:opacity-30 hover:bg-muted/30 transition-colors"
                  >
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}