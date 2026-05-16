import type { SocialPost, Platform, Source, Sentiment } from '@/types/social';
import type { MbgStaticData } from '@/types/mbg';

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001';

type Envelope<T> = { data: T; meta?: { page: number; pageSize: number; total: number } };

async function get<T>(path: string, init?: RequestInit): Promise<Envelope<T>> {
  const res = await fetch(`${API_URL}${path}`, {
    ...init,
    headers: { 'Content-Type': 'application/json', ...(init?.headers ?? {}) },
  });
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`API ${res.status}: ${body.slice(0, 200)}`);
  }
  return res.json();
}

// ── Overview ──────────────────────────────────────────────────────────────────

export interface ApiOverviewIncident {
  id: string;
  title: string;
  type: string | null;
  severity: string | null;
  status: string;
  provinceId: string | null;
  locationText: string | null;
  victims: number;
  lastUpdatedAt: string;
  vendorName: string | null;
}

export interface OverviewResponse {
  metrics: {
    incidentsThisMonth: number;
    highRiskProvinces: number;
    vendors: number;
    schoolsAffected: number;
  };
  topProvinces: Array<{
    id: string; name: string; lat: number | null; lng: number | null;
    incidents_count: number; anomaly_count: number; risk_score: number;
  }>;
  recentAlerts: ApiAlert[];
  recentIncidents: ApiOverviewIncident[];
  sentimentTrend: Array<{ date: string; positive: number; negative: number; neutral: number; mentions: number }>;
  incidentDistribution: Array<{ type: string; n: number }>;
  sparklines: { incidents: number[]; anomalies: number[] };
  healthScore: number;
  generatedAt: string;
}

export async function fetchOverview(): Promise<OverviewResponse> {
  const { data } = await get<OverviewResponse>('/api/overview');
  return data;
}

export async function fetchOverviewTrends(days = 7): Promise<OverviewResponse['sentimentTrend']> {
  const { data } = await get<OverviewResponse['sentimentTrend']>(`/api/overview/trends?days=${days}`);
  return data;
}

// ── RUP ───────────────────────────────────────────────────────────────────────

export async function fetchRupNational(): Promise<MbgStaticData> {
  const { data } = await get<MbgStaticData>('/api/rup/national');
  return data;
}

// ── Posts ─────────────────────────────────────────────────────────────────────

export interface ApiPost {
  id: string;
  platform: Platform;
  source: Source;
  url: string;
  username: string | null;
  content: string;
  locationText: string | null;
  provinceId: string | null;
  postedAt: string;
  likes: number;
  comments: number;
  sentiment: Sentiment | null;
  sentimentScore: number | null;
  entities: unknown;
  crawledAt: string;
}

export interface FetchPostsParams {
  platform?: 'all' | Source;
  sentiment?: Sentiment;
  province?: string;
  q?: string;
  page?: number;
  pageSize?: number;
}

export async function fetchPosts(params: FetchPostsParams = {}): Promise<{
  posts: SocialPost[]; total: number; page: number; pageSize: number;
}> {
  const qs = new URLSearchParams();
  if (params.platform && params.platform !== 'all') qs.set('platform', params.platform);
  if (params.sentiment) qs.set('sentiment', params.sentiment);
  if (params.province) qs.set('province', params.province);
  if (params.q) qs.set('q', params.q);
  if (params.page) qs.set('page', String(params.page));
  if (params.pageSize) qs.set('pageSize', String(params.pageSize));

  const { data, meta } = await get<ApiPost[]>(`/api/posts?${qs}`);
  return {
    posts: data.map(toSocialPost),
    total: meta?.total ?? data.length,
    page: meta?.page ?? 1,
    pageSize: meta?.pageSize ?? data.length,
  };
}

export interface PostsStats {
  ratio: { positive: number; negative: number; neutral: number; total: number };
  topEntities: Array<{ entity: string; n: number; sentiment: string }>;
}

export async function fetchPostsStats(days = 7): Promise<PostsStats> {
  const { data } = await get<PostsStats>(`/api/posts/stats?days=${days}`);
  return data;
}

// ── Incidents ─────────────────────────────────────────────────────────────────

export interface ApiIncident {
  id: string;
  title: string;
  type: string | null;
  severity: string | null;
  status: string;
  provinceId: string | null;
  locationText: string | null;
  lat: number | null;
  lng: number | null;
  victims: number;
  schoolsAffected: number;
  vendorName: string | null;
  sppgName: string | null;
  aiSummary: string | null;
  firstReportedAt: string | null;
  lastUpdatedAt: string;
}

export async function fetchIncidentsMap(): Promise<ApiIncident[]> {
  const { data } = await get<ApiIncident[]>('/api/incidents/map');
  return data;
}

// ── Alerts ────────────────────────────────────────────────────────────────────

export interface ApiAlert {
  id: string;
  title: string;
  severity: string | null;
  recommendation: string | null;
  triggerType: string | null;
  triggerRef: string | null;
  provinceId: string | null;
  status: string;
  createdAt: string;
}

export interface AlertsStats {
  active_high: number;
  pending: number;
  closed_today: number;
  total_active: number;
}

export async function fetchAlerts(params: { status?: string; severity?: string; page?: number; pageSize?: number } = {}): Promise<{
  alerts: ApiAlert[]; total: number;
}> {
  const qs = new URLSearchParams();
  if (params.status) qs.set('status', params.status);
  if (params.severity) qs.set('severity', params.severity);
  if (params.page) qs.set('page', String(params.page));
  if (params.pageSize) qs.set('pageSize', String(params.pageSize));

  const { data, meta } = await get<ApiAlert[]>(`/api/alerts?${qs}`);
  return { alerts: data, total: meta?.total ?? data.length };
}

export async function fetchAlertsStats(): Promise<AlertsStats> {
  const { data } = await get<AlertsStats>('/api/alerts/stats');
  return data;
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function toSocialPost(p: ApiPost): SocialPost {
  return {
    id: p.id,
    url: p.url,
    username: p.username ?? '',
    location: p.locationText ?? '',
    timeAgo: formatTimeAgo(p.postedAt),
    sentiment: p.sentiment ?? 'neutral',
    content: p.content,
    likes: p.likes,
    comments: p.comments,
    platform: p.platform,
    source: p.source,
  };
}

export function formatTimeAgo(iso: string): string {
  const d = new Date(iso);
  const diffMs = Date.now() - d.getTime();
  const hours = Math.floor(diffMs / 3_600_000);
  if (hours < 1) return 'baru saja';
  if (hours < 24) return `${hours} jam lalu`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days} hari lalu`;
  return d.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });
}
