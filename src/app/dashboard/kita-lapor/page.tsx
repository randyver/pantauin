'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Megaphone, ChevronLeft, ChevronRight, Filter,
  MapPin, Calendar, Users, FileX,
  Clock, CheckCircle, AlertCircle, X, BrainCircuit,
  ShieldAlert, GitBranch,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useSearch } from '@/lib/search-context';

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001';

// ── Types ─────────────────────────────────────────────────────────────────────

interface CitizenReport {
  id: string;
  trackingId: string;
  isAnonymous: boolean;
  role: string | null;
  schoolName: string | null;
  provinceId: string | null;
  incidentAt: string | null;
  category: string | null;
  description: string;
  victimCount: number | null;
  symptoms: string[] | null;
  photoUrls: string[] | null;
  status: string;
  aiSeverity: string | null;
  aiSummary: string | null;
  aiSpamScore: number | null;
  clusterId: string | null;
  createdAt: string;
}

interface Province { id: string; name: string; }

// ── Constants ─────────────────────────────────────────────────────────────────

const CATEGORY_MAP: Record<string, { label: string; color: string }> = {
  keracunan:        { label: 'Keracunan', color: 'bg-red-50 text-red-700 border-red-200' },
  makanan_basi:     { label: 'Makanan Basi', color: 'bg-orange-50 text-orange-700 border-orange-200' },
  tidak_higienis:   { label: 'Tidak Higienis', color: 'bg-yellow-50 text-yellow-700 border-yellow-200' },
  porsi_tidak_layak:{ label: 'Porsi Tidak Sesuai', color: 'bg-blue-50 text-blue-700 border-blue-200' },
  lainnya:          { label: 'Lainnya', color: 'bg-gray-100 text-gray-600 border-gray-200' },
};

const STATUS_MAP: Record<string, { label: string; icon: React.ElementType; color: string }> = {
  pending:    { label: 'Menunggu', icon: Clock, color: 'text-yellow-600 bg-yellow-50' },
  verified:   { label: 'Terverifikasi', icon: CheckCircle, color: 'text-green-600 bg-green-50' },
  escalated:  { label: 'Dieskalasi', icon: AlertCircle, color: 'text-red-600 bg-red-50' },
  rejected:   { label: 'Ditolak (Spam)', icon: ShieldAlert, color: 'text-gray-400 bg-gray-50' },
  closed:     { label: 'Selesai', icon: CheckCircle, color: 'text-gray-500 bg-gray-50' },
};

const SEVERITY_MAP: Record<string, { label: string; color: string }> = {
  low:      { label: 'Rendah', color: 'bg-green-50 text-green-700 border-green-200' },
  medium:   { label: 'Sedang', color: 'bg-yellow-50 text-yellow-700 border-yellow-200' },
  high:     { label: 'Tinggi', color: 'bg-orange-50 text-orange-700 border-orange-200' },
  critical: { label: 'Kritis', color: 'bg-red-50 text-red-700 border-red-200' },
};

const ROLE_LABEL: Record<string, string> = {
  siswa: 'Siswa', orang_tua: 'Orang Tua', guru: 'Guru',
  petugas_sppg: 'Petugas SPPG', anonim: 'Anonim',
};

const PAGE_SIZE = 12;

function formatDate(iso: string) {
  const d = new Date(iso);
  const diffMs = Date.now() - d.getTime();
  const hours = Math.floor(diffMs / 3_600_000);
  if (hours < 1) return 'Baru saja';
  if (hours < 24) return `${hours} jam lalu`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days} hari lalu`;
  return d.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });
}

// ── Lightbox ──────────────────────────────────────────────────────────────────

function Lightbox({ url, onClose }: { url: string; onClose: () => void }) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      <button className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">
        <X className="w-5 h-5 text-white" />
      </button>
      <img
        src={url}
        alt=""
        className="max-w-full max-h-[90vh] rounded-2xl object-contain shadow-2xl"
        onClick={e => e.stopPropagation()}
      />
    </div>
  );
}

// ── Report Card ───────────────────────────────────────────────────────────────

function ReportCard({ report, provinceName }: { report: CitizenReport; provinceName?: string }) {
  const [lightboxUrl, setLightboxUrl] = useState<string | null>(null);
  const cat = CATEGORY_MAP[report.category ?? ''];
  const stat = STATUS_MAP[report.status] ?? STATUS_MAP.pending;
  const StatIcon = stat.icon;

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-5 hover:border-[#FF4B3A]/20 hover:shadow-md transition-all flex flex-col gap-3">
      {/* Header */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2 flex-wrap">
          {cat && (
            <span className={cn('inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold border', cat.color)}>
              {cat.label}
            </span>
          )}
          {report.aiSeverity && SEVERITY_MAP[report.aiSeverity] && (
            <span className={cn('inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[10px] font-bold border', SEVERITY_MAP[report.aiSeverity].color)}>
              <BrainCircuit className="w-3 h-3" />
              {SEVERITY_MAP[report.aiSeverity].label}
            </span>
          )}
          <span className={cn('inline-flex items-center gap-1 px-2 py-1 rounded-lg text-[10px] font-bold', stat.color)}>
            <StatIcon className="w-3 h-3" /> {stat.label}
          </span>
        </div>
        <span className="font-mono text-[10px] text-gray-400 shrink-0">{report.trackingId}</span>
      </div>

      {/* School */}
      {report.schoolName && (
        <div className="flex items-center gap-1.5 text-sm font-semibold text-gray-800">
          <MapPin className="w-3.5 h-3.5 text-[#FF4B3A] shrink-0" />
          <span className="truncate">{report.schoolName}</span>
          {provinceName && <span className="text-gray-400 font-normal shrink-0">· {provinceName}</span>}
        </div>
      )}

      {/* Description */}
      <p className="text-xs text-gray-500 leading-relaxed line-clamp-2">{report.description}</p>

      {/* AI Summary */}
      {report.aiSummary && (
        <div className="flex items-start gap-1.5">
          <BrainCircuit className="w-3 h-3 text-purple-400 mt-0.5 shrink-0" />
          <p className="text-xs text-purple-600 leading-relaxed line-clamp-2 italic">{report.aiSummary}</p>
        </div>
      )}

      {/* Cluster indicator */}
      {report.clusterId && (
        <div className="flex items-center gap-1 text-[10px] text-purple-500 font-medium">
          <GitBranch className="w-3 h-3" />
          <span>Klaster: {report.clusterId}</span>
        </div>
      )}

      {/* Symptoms */}
      {report.symptoms && report.symptoms.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {report.symptoms.slice(0, 4).map(s => (
            <span key={s} className="px-1.5 py-0.5 bg-red-50 text-red-600 text-[10px] font-medium rounded-md">{s}</span>
          ))}
          {report.symptoms.length > 4 && (
            <span className="px-1.5 py-0.5 bg-gray-100 text-gray-400 text-[10px] rounded-md">+{report.symptoms.length - 4}</span>
          )}
        </div>
      )}

      {/* Photos */}
      {report.photoUrls && report.photoUrls.length > 0 && (
        <div className="flex gap-1.5">
          {report.photoUrls.slice(0, 3).map((url, i) => (
            <button
              key={i}
              onClick={() => setLightboxUrl(url)}
              className="w-14 h-14 rounded-lg overflow-hidden border border-gray-100 hover:border-[#FF4B3A]/40 hover:scale-105 transition-all shrink-0 cursor-pointer"
            >
              <img src={url} alt="" className="w-full h-full object-cover" />
            </button>
          ))}
          {report.photoUrls.length > 3 && (
            <button
              onClick={() => setLightboxUrl(report.photoUrls![3])}
              className="w-14 h-14 rounded-lg bg-gray-50 border border-gray-100 flex items-center justify-center text-xs text-gray-400 font-bold hover:border-[#FF4B3A]/40 transition-colors cursor-pointer"
            >
              +{report.photoUrls.length - 3}
            </button>
          )}
        </div>
      )}
      {lightboxUrl && <Lightbox url={lightboxUrl} onClose={() => setLightboxUrl(null)} />}

      {/* Footer */}
      <div className="flex items-center justify-between pt-2 border-t border-gray-50 text-[11px] text-gray-400">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1">
            <Users className="w-3 h-3" />
            {report.victimCount ?? 0} terdampak
          </span>
          <span>{ROLE_LABEL[report.role ?? ''] ?? 'Anonim'}</span>
        </div>
        <span className="flex items-center gap-1">
          <Calendar className="w-3 h-3" />
          {formatDate(report.createdAt)}
        </span>
      </div>
    </div>
  );
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function KitaLaporListPage() {
  const [reports, setReports] = useState<CitizenReport[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [provinces, setProvinces] = useState<Province[]>([]);
  const [filterCategory, setFilterCategory] = useState('');
  const [filterProvince, setFilterProvince] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const { value: searchTerm } = useSearch();

  useEffect(() => {
    fetch(`${API_URL}/api/provinces`).then(r => r.json()).then(j => setProvinces(j.data ?? [])).catch(() => {});
  }, []);

  useEffect(() => {
    setLoading(true);
    const qs = new URLSearchParams({ page: String(page), pageSize: String(PAGE_SIZE) });
    if (filterCategory) qs.set('category', filterCategory);
    if (filterProvince) qs.set('province', filterProvince);
    fetch(`${API_URL}/api/citizen-reports?${qs}`)
      .then(r => r.json())
      .then(j => { setReports(j.data ?? []); setTotal(j.meta?.total ?? 0); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [page, filterCategory, filterProvince]);

  useEffect(() => { setPage(1); }, [filterCategory, filterProvince]);

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const provinceMap = Object.fromEntries(provinces.map(p => [p.id, p.name]));

  const filteredReports = searchTerm
    ? reports.filter(r => {
        const q = searchTerm.toLowerCase();
        return (
          r.description.toLowerCase().includes(q) ||
          (r.schoolName ?? '').toLowerCase().includes(q) ||
          (r.trackingId ?? '').toLowerCase().includes(q)
        );
      })
    : reports;

  return (
    <div className="sm:ml-4 space-y-6 md:space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl md:text-2xl font-black text-foreground flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#FF4B3A] flex items-center justify-center shrink-0">
              <Megaphone className="w-4 h-4 text-white" />
            </div>
            Laporan Masyarakat
          </h1>
          <p className="text-xs md:text-sm text-muted-foreground mt-1.5">
            {total > 0 ? `${total.toLocaleString('id-ID')} laporan masuk dari seluruh Indonesia` : 'Laporan warga tentang program MBG'}
          </p>
        </div>
        <Link href="/kita-lapor/buat">
          <button className="flex items-center gap-2 px-5 py-2.5 bg-[#FF4B3A] text-white text-sm font-bold rounded-xl hover:bg-[#e03f31] transition-all shadow-sm shrink-0">
            <Megaphone className="w-4 h-4" /> Buat Laporan
          </button>
        </Link>
      </div>

      {/* Filters */}
      <div>
        <button
          onClick={() => setShowFilters(v => !v)}
          className={cn(
            'flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold border transition-all mb-3',
            showFilters ? 'bg-[#FF4B3A] text-white border-[#FF4B3A]' : 'bg-white text-gray-600 border-gray-200 hover:border-[#FF4B3A]/40'
          )}
        >
          <Filter className="w-3.5 h-3.5" /> Filter
          {(filterCategory || filterProvince) && (
            <span className="w-2 h-2 rounded-full bg-white/80" />
          )}
        </button>

        {showFilters && (
          <div className="bg-white rounded-2xl border border-gray-100 p-4 flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-2">Kategori</label>
              <select
                value={filterCategory}
                onChange={e => setFilterCategory(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-gray-200 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#FF4B3A]/20"
              >
                <option value="">Semua Kategori</option>
                {Object.entries(CATEGORY_MAP).map(([v, c]) => (
                  <option key={v} value={v}>{c.label}</option>
                ))}
              </select>
            </div>
            <div className="flex-1">
              <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-2">Provinsi</label>
              <select
                value={filterProvince}
                onChange={e => setFilterProvince(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-gray-200 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#FF4B3A]/20"
              >
                <option value="">Semua Provinsi</option>
                {provinces.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
              </select>
            </div>
            {(filterCategory || filterProvince) && (
              <div className="flex items-end">
                <button
                  onClick={() => { setFilterCategory(''); setFilterProvince(''); }}
                  className="px-4 py-2 text-xs font-semibold text-gray-500 hover:text-gray-700 transition-colors"
                >
                  Reset
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Content */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="bg-white rounded-2xl border border-gray-100 p-5 animate-pulse">
              <div className="h-6 bg-gray-100 rounded-lg w-1/2 mb-3" />
              <div className="h-4 bg-gray-100 rounded w-3/4 mb-2" />
              <div className="h-3 bg-gray-100 rounded w-full mb-1" />
              <div className="h-3 bg-gray-100 rounded w-5/6" />
            </div>
          ))}
        </div>
      ) : filteredReports.length === 0 ? (
        <div className="text-center py-20">
          <FileX className="w-12 h-12 text-gray-200 mx-auto mb-4" />
          <h3 className="font-bold text-gray-400 mb-1">Belum ada laporan</h3>
          <p className="text-sm text-gray-400 mb-6">
            {searchTerm
              ? `Tidak ada hasil untuk "${searchTerm}".`
              : filterCategory || filterProvince
                ? 'Tidak ada laporan yang sesuai filter.'
                : 'Jadilah yang pertama melaporkan!'}
          </p>
          <Link href="/kita-lapor/buat">
            <button className="px-6 py-2.5 bg-[#FF4B3A] text-white text-sm font-bold rounded-xl hover:bg-[#e03f31] transition-all">
              Buat Laporan Pertama
            </button>
          </Link>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {filteredReports.map(r => (
              <ReportCard key={r.id} report={r} provinceName={r.provinceId ? provinceMap[r.provinceId] : undefined} />
            ))}
          </div>

          {totalPages > 1 && !searchTerm && (
            <div className="flex items-center justify-between pt-6 border-t border-gray-200">
              <p className="text-xs text-gray-400">
                {(page - 1) * PAGE_SIZE + 1}–{Math.min(page * PAGE_SIZE, total)} dari {total} laporan
              </p>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setPage(p => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="p-2 rounded-lg border border-gray-200 disabled:opacity-30 hover:bg-gray-50 transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                  const p = totalPages <= 5 ? i + 1 : page <= 3 ? i + 1 : page >= totalPages - 2 ? totalPages - 4 + i : page - 2 + i;
                  return (
                    <button
                      key={p}
                      onClick={() => setPage(p)}
                      className={cn(
                        'w-8 h-8 rounded-lg text-xs font-semibold transition-colors',
                        page === p ? 'bg-[#FF4B3A] text-white' : 'hover:bg-gray-100 text-gray-500'
                      )}
                    >
                      {p}
                    </button>
                  );
                })}
                <button
                  onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className="p-2 rounded-lg border border-gray-200 disabled:opacity-30 hover:bg-gray-50 transition-colors"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
