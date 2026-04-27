'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { APIProvider, Map, AdvancedMarker } from '@vis.gl/react-google-maps';
import {
  AlertTriangle, Package, ExternalLink, Search, ChevronDown,
  ChevronUp, X, Loader2, RefreshCw, ShieldAlert, TrendingUp,
  Building2, BadgeAlert, ArrowUpRight, ChevronLeft, ChevronRight,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { PROVINCES } from '@/lib/provinces';
import { useSearch } from '@/lib/search-context';
import type { MbgStaticData, MbgProvinceData, RupPackageEnriched } from '@/types/mbg';

const MAPS_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '';
const PAGE_SIZE = 20;

function formatRupiah(n: number) {
  if (n >= 1e12) return `Rp ${(n / 1e12).toFixed(1)}T`;
  if (n >= 1e9) return `Rp ${(n / 1e9).toFixed(1)}M`;
  if (n >= 1e6) return `Rp ${(n / 1e6).toFixed(0)}jt`;
  return `Rp ${n.toLocaleString('id-ID')}`;
}

function AnomalyBadge({ score }: { score: number }) {
  const level = score >= 80 ? 'Kritis' : score >= 60 ? 'Tinggi' : score >= 40 ? 'Sedang' : 'Rendah';
  return (
    <span className={cn(
      'text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide whitespace-nowrap',
      score >= 80 ? 'bg-red-100 text-red-700' :
      score >= 60 ? 'bg-orange-100 text-orange-700' :
      score >= 40 ? 'bg-yellow-100 text-yellow-700' :
      'bg-green-100 text-green-700'
    )}>
      {level} {score}
    </span>
  );
}

function markerColor(riskScore: number) {
  if (riskScore >= 70) return { bg: '#EF4444', ring: '#FCA5A5' };
  if (riskScore >= 40) return { bg: '#F97316', ring: '#FED7AA' };
  return { bg: '#EAB308', ring: '#FEF08A' };
}

function PackageModal({ pkg, onClose }: { pkg: RupPackageEnriched; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <motion.div
        initial={{ y: '100%', opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: '100%', opacity: 0 }}
        transition={{ type: 'spring', damping: 30 }}
        className="relative z-10 w-full sm:max-w-lg glass sm:rounded-3xl rounded-t-3xl p-5 md:p-6 shadow-2xl max-h-[85dvh] overflow-y-auto"
      >
        <div className="flex justify-center mb-3 sm:hidden">
          <div className="w-10 h-1 rounded-full bg-white/30" />
        </div>

        <button onClick={onClose} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground">
          <X className="w-4 h-4" />
        </button>

        <div className="mb-4 pr-6">
          <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1">{pkg.satker}</p>
          <h3 className="text-sm md:text-base font-bold text-foreground leading-snug">{pkg.namaPaket}</h3>
        </div>

        <div className="grid grid-cols-2 gap-2 md:gap-3 mb-4">
          {[
            { label: 'Pagu Anggaran', value: formatRupiah(pkg.paguAnggaran) },
            { label: 'Metode', value: pkg.metodePengadaan },
            { label: 'Sumber Dana', value: pkg.sumberDana },
            { label: 'Rencana Awal', value: pkg.rencanaAwal || '—' },
          ].map(f => (
            <div key={f.label} className="bg-white/50 rounded-xl p-2 md:p-3 border border-white/80">
              <p className="text-[10px] text-muted-foreground mb-0.5">{f.label}</p>
              <p className="text-xs md:text-sm font-semibold text-foreground">{f.value}</p>
            </div>
          ))}
        </div>

        {pkg.anomalyScore > 0 && (
          <div className={cn(
            'p-3 md:p-4 rounded-xl border mb-4',
            pkg.anomalyScore >= 60 ? 'bg-red-50 border-red-200' : 'bg-yellow-50 border-yellow-200'
          )}>
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs font-bold text-foreground">Analisis AI</p>
              <AnomalyBadge score={pkg.anomalyScore} />
            </div>
            {pkg.anomalyReason && (
              <p className="text-xs text-foreground leading-relaxed mb-2">{pkg.anomalyReason}</p>
            )}
            {pkg.anomalyFlags.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {pkg.anomalyFlags.map(flag => (
                  <span key={flag} className="text-[10px] bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full">{flag}</span>
                ))}
              </div>
            )}
          </div>
        )}

        <a
          href={pkg.detailUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full py-2.5 bg-foreground text-white rounded-xl text-xs font-bold hover:bg-black transition-colors"
        >
          Lihat Detail di INAPROC <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </motion.div>
    </div>
  );
}

export default function RiskMapPage() {
  const [nationalData, setNationalData] = useState<MbgStaticData | null>(null);
  const [selectedProvince, setSelectedProvince] = useState<MbgProvinceData | null>(null);
  const [selectedPackage, setSelectedPackage] = useState<RupPackageEnriched | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [tableSortBy, setTableSortBy] = useState<'score' | 'value'>('score');
  const [page, setPage] = useState(1);
  const [mounted, setMounted] = useState(false);

  // Gunakan search dari context (navbar) — juga sediakan input lokal di tabel
  // agar bisa dipakai mandiri jika user ingin filter hanya di tabel ini
  const { value: globalSearch } = useSearch();
  const [localSearch, setLocalSearch] = useState('');

  // Gabungkan: local search prioritas, fallback ke global
  const tableSearch = localSearch || globalSearch;

  useEffect(() => setMounted(true), []);
  useEffect(() => setPage(1), [tableSearch, tableSortBy]);

  const loadNational = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/data/mbg-data.json');
      if (!res.ok) throw new Error('Data belum digenerate. Jalankan: npm run generate-data');
      setNationalData(await res.json());
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error tidak diketahui');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { loadNational(); }, [loadNational]);

  const allPackages = nationalData?.bgnPackages ?? [];
  const filteredPackages = allPackages
    .filter(p =>
      !tableSearch ||
      p.namaPaket.toLowerCase().includes(tableSearch.toLowerCase()) ||
      p.satker.toLowerCase().includes(tableSearch.toLowerCase())
    )
    .sort((a, b) => tableSortBy === 'score' ? b.anomalyScore - a.anomalyScore : b.paguAnggaran - a.paguAnggaran);

  const totalPages = Math.max(1, Math.ceil(filteredPackages.length / PAGE_SIZE));
  const pagePkgs = filteredPackages.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const provinceMap: Record<string, MbgProvinceData> = {};
  nationalData?.provinces.forEach(p => { provinceMap[p.provinceId] = p; });
  const provincesWithData = PROVINCES.filter(p => (provinceMap[p.id]?.packages.length ?? 0) > 0);

  if (!mounted) return <div className="h-screen" />;

  return (
    <div className="space-y-4 md:space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">

      {/* Stats Bar */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        {[
          { label: 'Total Anggaran BGN', value: nationalData ? formatRupiah(nationalData.totalNasional) : '—', icon: TrendingUp, color: 'text-blue-600 bg-blue-50' },
          { label: 'Total Paket', value: nationalData ? `${nationalData.bgnPackages.length}` : '—', icon: Package, color: 'text-emerald-600 bg-emerald-50' },
          { label: 'Terindikasi Anomali', value: nationalData ? `${nationalData.totalAnomali}` : '—', icon: BadgeAlert, color: 'text-red-600 bg-red-50' },
          { label: 'Provinsi Dengan Data', value: nationalData ? `${provincesWithData.length}` : '—', icon: ShieldAlert, color: 'text-amber-600 bg-amber-50' },
        ].map((stat) => (
          <div key={stat.label} className="floating-card p-3 md:p-4 flex items-center gap-3 md:gap-4">
            <div className={cn('w-8 h-8 md:w-10 md:h-10 rounded-xl flex items-center justify-center flex-shrink-0', stat.color)}>
              <stat.icon className="w-4 h-4 md:w-5 md:h-5" />
            </div>
            <div>
              <p className="text-[10px] text-muted-foreground leading-tight">{stat.label}</p>
              <p className="text-base md:text-lg font-bold text-foreground">
                {loading ? <Loader2 className="w-4 h-4 animate-spin inline" /> : stat.value}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Map + Detail Panel — mobile: panel dulu lalu map; desktop: map kiri panel kanan */}
      <div className="flex flex-col xl:flex-row gap-4 md:gap-6">

        {/* Map — di mobile tampil setelah panel (order-2), di desktop kiri (order-1) */}
        <div className="order-2 xl:order-1 xl:flex-1 relative h-[320px] sm:h-[420px] md:h-[500px] glass rounded-3xl overflow-hidden border-white/40 shadow-2xl">
          {!MAPS_KEY ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-8">
              <AlertTriangle className="w-10 h-10 text-amber-500 mb-4" />
              <p className="text-sm text-muted-foreground">Google Maps API Key belum dikonfigurasi</p>
            </div>
          ) : (
            <APIProvider apiKey={MAPS_KEY}>
              <Map defaultCenter={{ lat: -2.5489, lng: 118.0149 }} defaultZoom={4} mapId="PANTUIN_RISK_MAP" disableDefaultUI>
                {provincesWithData.map((province) => {
                  const pd = provinceMap[province.id];
                  const colors = markerColor(pd.riskScore);
                  const isSelected = selectedProvince?.provinceId === province.id;
                  return (
                    <AdvancedMarker key={province.id} position={province.coordinates} onClick={() => setSelectedProvince(pd)}>
                      <div
                        className={cn(
                          'relative flex items-center justify-center w-8 h-8 md:w-10 md:h-10 rounded-full border-2 transition-all duration-300 cursor-pointer',
                          isSelected ? 'scale-125 z-10' : 'hover:scale-110'
                        )}
                        style={{ backgroundColor: colors.bg, borderColor: colors.ring }}
                      >
                        <div className="absolute inset-0 rounded-full animate-ping opacity-30" style={{ backgroundColor: colors.bg }} />
                        <span className="text-[8px] md:text-[9px] font-bold text-white relative z-10">{pd.riskScore}</span>
                      </div>
                    </AdvancedMarker>
                  );
                })}
              </Map>
            </APIProvider>
          )}

          {/* Legend */}
          <div className="absolute bottom-3 left-3 glass rounded-xl p-2 md:p-3 text-[10px] space-y-1">
            {[
              { color: '#EF4444', label: 'Kritis (≥70)' },
              { color: '#F97316', label: 'Tinggi (40-69)' },
              { color: '#EAB308', label: 'Sedang (<40)' },
            ].map(l => (
              <div key={l.label} className="flex items-center gap-1.5 md:gap-2">
                <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: l.color }} />
                <span className="text-muted-foreground">{l.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Province Detail Panel — mobile: tampil duluan (order-1), desktop: kanan (order-2) */}
        <div className="order-1 xl:order-2 w-full xl:w-96">
          <AnimatePresence mode="wait">
            {selectedProvince ? (
              <motion.div
                key={selectedProvince.provinceId}
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}
                className="glass rounded-3xl p-4 md:p-6 relative"
              >
                <button onClick={() => setSelectedProvince(null)} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground">
                  <X className="w-4 h-4" />
                </button>
                <div className="mb-3 md:mb-4">
                  <h3 className="text-base md:text-lg font-bold text-foreground">{selectedProvince.provinceName}</h3>
                  <p className="text-xs text-muted-foreground">Data Pengadaan MBG</p>
                </div>
                {selectedProvince.packages.length > 0 ? (
                  <>
                    <div className="grid grid-cols-3 gap-2 mb-3 md:mb-4">
                      {[
                        { label: 'Paket', value: selectedProvince.packages.length },
                        { label: 'Anomali', value: selectedProvince.anomalyCount },
                        { label: 'Risk Score', value: selectedProvince.riskScore },
                      ].map(s => (
                        <div key={s.label} className="bg-white/50 rounded-xl p-2 text-center border border-white/80">
                          <p className="text-[10px] text-muted-foreground">{s.label}</p>
                          <p className={cn('text-sm md:text-base font-bold', s.label === 'Anomali' && s.value > 0 ? 'text-red-600' : 'text-foreground')}>{s.value}</p>
                        </div>
                      ))}
                    </div>
                    <div className="mb-3 md:mb-4">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1">Total Anggaran</p>
                      <p className="text-lg md:text-xl font-bold text-foreground">{formatRupiah(selectedProvince.totalAnggaran)}</p>
                    </div>
                    {/* Grid paket — 1 kolom di mobile, 2 kolom di sm ke atas */}
                    <div className="space-y-2">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Paket Pengadaan</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {selectedProvince.packages.map(pkg => (
                          <button key={pkg.id} onClick={() => setSelectedPackage(pkg)}
                            className="w-full p-3 bg-white/40 rounded-xl border border-white/60 space-y-1 text-left hover:bg-white/70 transition-colors"
                          >
                            <p className="text-xs font-medium text-foreground leading-tight">{pkg.namaPaket}</p>
                            <div className="flex items-center justify-between">
                              <span className="text-[10px] text-muted-foreground">{formatRupiah(pkg.paguAnggaran)}</span>
                              <AnomalyBadge score={pkg.anomalyScore} />
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    <Package className="w-8 h-8 mx-auto mb-2 opacity-40" />
                    <p className="text-sm">Belum ada data paket MBG</p>
                  </div>
                )}
              </motion.div>
            ) : (
              <motion.div
                key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className="glass rounded-3xl p-6 flex flex-col items-center justify-center text-center h-48"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center mb-3">
                  <Building2 className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-bold text-foreground mb-1 text-sm">Pilih Provinsi</h3>
                <p className="text-xs text-muted-foreground max-w-[200px]">Klik marker di peta untuk melihat detail</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Anomali Table */}
      <div className="floating-card p-4 md:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 md:gap-4 mb-4 md:mb-5">
          <div>
            <h3 className="text-[10px] md:text-sm font-bold uppercase tracking-widest text-muted-foreground">Daftar Paket Mencurigakan</h3>
            <p className="text-[10px] md:text-xs text-muted-foreground mt-0.5">
              Data Badan Gizi Nasional — dianalisis oleh AI
              {globalSearch && !localSearch && (
                <span className="ml-2 text-primary font-semibold">· Filter: "{globalSearch}"</span>
              )}
            </p>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <div className="relative">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Cari paket..."
                value={localSearch}
                onChange={e => setLocalSearch(e.target.value)}
                className="pl-8 pr-3 py-1.5 text-xs border border-border rounded-lg bg-white/50 focus:outline-none focus:ring-1 focus:ring-primary w-36 md:w-48"
              />
            </div>
            <button
              onClick={() => setTableSortBy(s => s === 'score' ? 'value' : 'score')}
              className="flex items-center gap-1 text-xs px-2.5 md:px-3 py-1.5 border border-border rounded-lg bg-white/50 hover:bg-white/80 transition-colors"
            >
              {tableSortBy === 'score' ? 'Anomali' : 'Nilai'}
              {tableSortBy === 'score' ? <ChevronDown className="w-3 h-3" /> : <ChevronUp className="w-3 h-3" />}
            </button>
            <button onClick={loadNational} className="p-1.5 border border-border rounded-lg bg-white/50 hover:bg-white/80 transition-colors">
              <RefreshCw className={cn('w-3.5 h-3.5', loading && 'animate-spin')} />
            </button>
          </div>
        </div>

        {error && (
          <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-xl mb-4 text-xs md:text-sm text-red-700">
            <AlertTriangle className="w-4 h-4 flex-shrink-0" />
            {error}
          </div>
        )}

        <div className="overflow-x-auto">
          <table className="w-full text-xs min-w-[500px]">
            <thead>
              <tr className="border-b border-border/50">
                <th className="text-left pb-2 font-semibold text-muted-foreground w-8">#</th>
                <th className="text-left pb-2 font-semibold text-muted-foreground">Nama Paket</th>
                <th className="text-left pb-2 font-semibold text-muted-foreground hidden md:table-cell">Satker</th>
                <th className="text-right pb-2 font-semibold text-muted-foreground">Nilai</th>
                <th className="text-left pb-2 font-semibold text-muted-foreground hidden sm:table-cell">Metode</th>
                <th className="text-center pb-2 font-semibold text-muted-foreground">Anomali</th>
                <th className="w-8 pb-2" />
              </tr>
            </thead>
            <tbody>
              {loading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <tr key={i} className="border-b border-border/30">
                    {Array.from({ length: 6 }).map((_, j) => (
                      <td key={j} className="py-3 pr-4">
                        <div className="h-3 bg-muted/50 rounded animate-pulse" style={{ width: `${60 + (i * j % 4) * 10}%` }} />
                      </td>
                    ))}
                  </tr>
                ))
              ) : filteredPackages.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-muted-foreground">
                    {tableSearch ? 'Tidak ada paket yang cocok' : 'Data belum tersedia'}
                  </td>
                </tr>
              ) : (
                pagePkgs.map((pkg, i) => (
                  <tr
                    key={pkg.id}
                    onClick={() => setSelectedPackage(pkg)}
                    className={cn(
                      'border-b border-border/30 transition-colors cursor-pointer',
                      pkg.anomalyScore >= 60 ? 'bg-red-50/30 hover:bg-red-50/70' : 'hover:bg-muted/30'
                    )}
                  >
                    <td className="py-2.5 pr-2 text-muted-foreground">{(page - 1) * PAGE_SIZE + i + 1}</td>
                    <td className="py-2.5 pr-4 max-w-[160px] md:max-w-[220px]">
                      <p className="font-medium text-foreground truncate">{pkg.namaPaket}</p>
                      {pkg.anomalyFlags.length > 0 && (
                        <div className="flex gap-1 mt-0.5 flex-wrap">
                          {pkg.anomalyFlags.slice(0, 2).map(flag => (
                            <span key={flag} className="text-[9px] bg-orange-100 text-orange-600 px-1 py-0.5 rounded">{flag}</span>
                          ))}
                        </div>
                      )}
                    </td>
                    <td className="py-2.5 pr-4 text-muted-foreground hidden md:table-cell max-w-[160px] truncate">{pkg.satker}</td>
                    <td className="py-2.5 pr-4 text-right font-mono font-medium whitespace-nowrap">{formatRupiah(pkg.paguAnggaran)}</td>
                    <td className="py-2.5 pr-4 text-muted-foreground hidden sm:table-cell max-w-[100px] truncate">{pkg.metodePengadaan}</td>
                    <td className="py-2.5 pr-2 text-center"><AnomalyBadge score={pkg.anomalyScore} /></td>
                    <td className="py-2.5">
                      <a href={pkg.detailUrl} target="_blank" rel="noopener noreferrer"
                        onClick={e => e.stopPropagation()}
                        className="text-primary hover:text-primary/70 flex items-center justify-center"
                      >
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </a>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {!loading && filteredPackages.length > PAGE_SIZE && (
          <div className="flex items-center justify-between mt-4 pt-4 border-t border-border/30 flex-wrap gap-2">
            <p className="text-xs text-muted-foreground">
              {(page - 1) * PAGE_SIZE + 1}–{Math.min(page * PAGE_SIZE, filteredPackages.length)} dari {filteredPackages.length}
            </p>
            <div className="flex items-center gap-1">
              <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}
                className="p-1.5 rounded-lg border border-border/50 disabled:opacity-30 hover:bg-muted/30 transition-colors">
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>
              {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                const p = totalPages <= 5 ? i + 1 : page <= 3 ? i + 1 : page >= totalPages - 2 ? totalPages - 4 + i : page - 2 + i;
                return (
                  <button key={p} onClick={() => setPage(p)}
                    className={cn('w-7 h-7 rounded-lg text-xs font-medium transition-colors',
                      page === p ? 'bg-foreground text-white' : 'hover:bg-muted/30 text-muted-foreground')}>
                    {p}
                  </button>
                );
              })}
              <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}
                className="p-1.5 rounded-lg border border-border/50 disabled:opacity-30 hover:bg-muted/30 transition-colors">
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}
      </div>

      <AnimatePresence>
        {selectedPackage && <PackageModal pkg={selectedPackage} onClose={() => setSelectedPackage(null)} />}
      </AnimatePresence>
    </div>
  );
}