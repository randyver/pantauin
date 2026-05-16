'use client';

import React from 'react';
import { MapPin, AlertTriangle, School, Building, Activity } from 'lucide-react';
import {
  AreaChart, Area, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts';
import { cn } from '@/lib/utils';
import { useSearch } from '@/lib/search-context';
import { fetchOverview, fetchOverviewTrends, type OverviewResponse } from '@/lib/api';

const RANGE_OPTIONS: Array<{ label: string; days: number }> = [
  { label: '7 Hari', days: 7 },
  { label: '30 Hari', days: 30 },
  { label: '3 Bulan', days: 90 },
];

const COLORS = ['#FF4B3A', '#EF4444', '#F59E0B', '#6B7280'];

const Sparkline = ({ data, color }: { data: number[], color: string }) => {
  const chartData = data.map((val, i) => ({ val, index: i }));
  return (
    <div className="h-10 w-24">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={chartData}>
          <defs>
            <linearGradient id={`color-${color.replace('#', '')}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={color} stopOpacity={0.4}/>
              <stop offset="95%" stopColor={color} stopOpacity={0}/>
            </linearGradient>
          </defs>
          <Area 
            type="monotone" 
            dataKey="val" 
            stroke={color} 
            fill={`url(#color-${color.replace('#', '')})`} 
            strokeWidth={2} 
            isAnimationActive={true} 
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

const Gauge = ({ value }: { value: number }) => {
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (value / 100) * circumference;
  const color = value >= 80 ? '#22c55e' : value >= 60 ? '#eab308' : '#ef4444';

  return (
    <div className="relative flex flex-col items-center justify-center h-[160px] my-4">
      <svg className="w-32 h-32 transform -rotate-90">
        <circle
          cx="64"
          cy="64"
          r={radius}
          stroke="currentColor"
          strokeWidth="12"
          fill="transparent"
          className="text-primary/10"
        />
        <circle
          cx="64"
          cy="64"
          r={radius}
          stroke={color}
          strokeWidth="12"
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          className="transition-all duration-1000 ease-out"
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute flex flex-col items-center justify-center">
        <span className="text-3xl font-black text-foreground">{value}</span>
        <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mt-1">Skor</span>
      </div>
    </div>
  );
};

export default function OverviewPage() {
  const [mounted, setMounted] = React.useState(false);
  const [overview, setOverview] = React.useState<OverviewResponse | null>(null);
  const [trendDays, setTrendDays] = React.useState<number>(7);
  const [trendData, setTrendData] = React.useState<OverviewResponse['sentimentTrend']>([]);
  const [trendLoading, setTrendLoading] = React.useState(false);
  const { value: searchTerm } = useSearch();

  React.useEffect(() => setMounted(true), []);
  React.useEffect(() => {
    fetchOverview().then(setOverview).catch((e) => console.warn('overview fetch failed:', e));
  }, []);

  React.useEffect(() => {
    setTrendLoading(true);
    fetchOverviewTrends(trendDays)
      .then(setTrendData)
      .catch((e) => console.warn('trend fetch failed:', e))
      .finally(() => setTrendLoading(false));
  }, [trendDays]);

  if (!mounted) return <div className="h-screen" />;

  const summaryIncidents = (overview?.recentIncidents ?? []).map((inc) => ({
    id: inc.id,
    title: inc.title,
    location: inc.locationText ?? '—',
    province: inc.provinceId ?? '',
    type: inc.type ?? '—',
    status: inc.status,
    victims: inc.victims,
    vendor: inc.vendorName ?? '—',
  }));

  const summaryAlerts = (overview?.recentAlerts ?? []).slice(0, 3).map((a) => ({
    id: a.id,
    title: a.title,
    severity: (a.severity ?? 'medium').replace(/^\w/, (c) => c.toUpperCase()),
    timestamp: new Date(a.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }),
    recommendation: a.recommendation ?? '',
  }));

  const filteredIncidents = summaryIncidents.filter((inc) =>
    !searchTerm ||
    inc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    inc.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    inc.province.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredAlerts = summaryAlerts.filter((alert) =>
    !searchTerm ||
    alert.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    alert.recommendation.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const fmtNum = (n: number | undefined | null) => (n == null ? '—' : n.toLocaleString('id-ID'));

  const keyMetrics = [
    { label: 'Insiden Bulan Ini', value: fmtNum(overview?.metrics.incidentsThisMonth), icon: AlertTriangle, sparkline: overview?.sparklines.incidents ?? [], color: '#dc2626' },
    { label: 'Wilayah Risiko Tinggi', value: fmtNum(overview?.metrics.highRiskProvinces), icon: MapPin, sparkline: overview?.sparklines.anomalies ?? [], color: '#dc2626' },
    { label: 'Sekolah Terdampak', value: fmtNum(overview?.metrics.schoolsAffected), icon: School, sparkline: overview?.sparklines.incidents ?? [], color: '#2563eb' },
    { label: 'Vendor Terlibat', value: fmtNum(overview?.metrics.vendors), icon: Building, sparkline: overview?.sparklines.anomalies ?? [], color: '#2563eb' },
  ];

  const topProvinces = (overview?.topProvinces ?? []).map((p) => ({
    id: p.id,
    name: p.name,
    riskScore: p.risk_score,
    incidentsCount: p.incidents_count,
  }));

  const distributionData = (overview?.incidentDistribution ?? []).map((d) => ({
    name: d.type.charAt(0).toUpperCase() + d.type.slice(1),
    value: d.n,
  }));

  const formatDate = (dateStr: any) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return date.toLocaleDateString('id-ID', { day: 'numeric', month: 'short' });
  };

  return (
    <div className="sm:ml-4 space-y-6 md:space-y-8 animate-in fade-in duration-700">

      {searchTerm && (
        <div className="px-1 text-xs text-primary font-semibold">
          Menampilkan hasil untuk: "{searchTerm}"
        </div>
      )}

      {/* 1. Hero Header */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 floating-card p-4 md:p-6 bg-gradient-to-r from-primary/10 to-transparent border-l-4 border-l-primary">
        <div>
          <h1 className="text-xl md:text-2xl font-black text-foreground flex items-center gap-2">
            <Activity className="w-6 h-6 text-primary" />
            Pantauin MBG — Status Nasional
          </h1>
          <p className="text-xs md:text-sm text-muted-foreground mt-1">
            Dashboard publik untuk memantau program Makan Bergizi Gratis secara real-time
          </p>
        </div>
        <div className="text-left md:text-right flex flex-col justify-center">
          <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Terakhir Diperbarui</span>
          <span className="text-sm font-semibold text-foreground">
            {overview?.generatedAt
              ? new Date(overview.generatedAt).toLocaleString('id-ID', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit', timeZone: 'Asia/Jakarta' }) + ' WIB'
              : 'Memuat...'}
          </span>
        </div>
      </header>



      {/* 3. Key Metric Cards */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {keyMetrics.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="floating-card p-4 md:p-5 relative overflow-hidden"
            >
              <div className="flex justify-between items-start mb-2">
                <div className="p-2 rounded-xl bg-primary/10">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
              </div>
              <p className="text-[10px] md:text-[11px] font-bold text-muted-foreground uppercase tracking-widest mt-4 mb-1">
                {stat.label}
              </p>
              <div className="flex items-end justify-between">
                <h3 className="text-2xl md:text-3xl font-black text-foreground">{stat.value}</h3>
                {stat.sparkline.length > 0 && <Sparkline data={stat.sparkline} color={stat.color} />}
              </div>
            </div>
          );
        })}
      </section>

      {/* 4. Main Content Area */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
        <div className="lg:col-span-2 floating-card p-4 md:p-6 flex flex-col">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 md:mb-6">
            <div>
              <h3 className="text-base md:text-lg font-bold text-foreground">Tren Insiden &amp; Sentimen</h3>
              <p className="text-xs md:text-sm text-muted-foreground">Agregat harian laporan publik</p>
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
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-primary" />
                  <span className="text-[10px] font-bold uppercase text-muted-foreground hidden sm:block">Sebutan</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
                  <span className="text-[10px] font-bold uppercase text-muted-foreground hidden sm:block">Negatif</span>
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
            {!trendLoading && trendData.length === 0 ? (
              <div className="absolute inset-0 flex items-center justify-center text-xs text-muted-foreground">
                Belum ada data dalam rentang ini
              </div>
            ) : (
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorMentions" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#FF4B3A" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#FF4B3A" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis 
                  dataKey="date" 
                  tickFormatter={formatDate} 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 11, fill: '#888' }} 
                  dy={10} 
                />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#888' }} />
                <Tooltip
                  contentStyle={{ backgroundColor: 'rgba(255,255,255,0.95)', borderRadius: '16px', border: 'none', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)' }}
                  labelFormatter={formatDate}
                />
                <Area 
                  type="monotone" 
                  dataKey="mentions" 
                  name="Total Sebutan"
                  stroke="#FF4B3A" 
                  fillOpacity={1} 
                  fill="url(#colorMentions)" 
                  strokeWidth={3}
                  activeDot={{ r: 6, strokeWidth: 0, fill: '#FF4B3A' }} 
                />
                <Area 
                  type="monotone" 
                  dataKey="negative" 
                  name="Sentimen Negatif"
                  stroke="#EF4444" 
                  fill="transparent" 
                  strokeWidth={2} 
                  strokeDasharray="5 5"
                  activeDot={{ r: 5, strokeWidth: 0, fill: '#EF4444' }} 
                />
              </AreaChart>
            </ResponsiveContainer>
            )}
          </div>
        </div>

        <div className="floating-card p-4 md:p-6 flex flex-col justify-between">
          <div className="w-full text-center">
            <h3 className="text-base md:text-lg font-bold text-foreground">Skor Kesehatan MBG</h3>
            <p className="text-xs text-muted-foreground mt-1">Indeks performa nasional</p>
          </div>
          
          <Gauge value={overview?.healthScore ?? 0} />

          <div className="w-full mt-4 pt-4 border-t border-border/50">
            <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-4 text-center">
              Distribusi Kategori Insiden
            </h3>
            <div className="h-[140px] w-full">
              {distributionData.length === 0 ? (
                <div className="h-full flex items-center justify-center text-[11px] text-muted-foreground">
                  Belum ada data insiden
                </div>
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={distributionData}
                      innerRadius={40}
                      outerRadius={60}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {distributionData.map((_, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', fontSize: '12px' }} />
                    <Legend layout="vertical" verticalAlign="middle" align="right" wrapperStyle={{ fontSize: '11px', fontWeight: '600' }} />
                  </PieChart>
                </ResponsiveContainer>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 5. Middle Section — Province Ranking */}
      <section className="grid grid-cols-1 gap-4 md:gap-6">
        <div className="floating-card p-4 md:p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-base md:text-lg font-bold text-foreground">Top 5 Provinsi Risiko Tertinggi</h3>
              <p className="text-xs text-muted-foreground mt-1">Berdasarkan agregat skor insiden dan sentimen</p>
            </div>
          </div>
          
          <div className="space-y-5">
            {topProvinces.map((prov, i) => (
              <div key={prov.id} className="flex items-center gap-4 group">
                <div className="w-6 text-center font-bold text-muted-foreground group-hover:text-primary transition-colors">
                  {i + 1}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-end mb-1.5">
                    <span className="text-sm font-bold text-foreground">{prov.name}</span>
                    <span className="text-[10px] font-bold text-muted-foreground bg-foreground/5 px-2 py-0.5 rounded-full">
                      {prov.incidentsCount} insiden
                    </span>
                  </div>
                  <div className="h-2 w-full bg-primary/10 rounded-full overflow-hidden">
                    <div 
                      className={cn(
                        "h-full rounded-full transition-all duration-1000", 
                        prov.riskScore > 80 ? "bg-red-500" : prov.riskScore > 50 ? "bg-amber-500" : "bg-green-500"
                      )}
                      style={{ width: `${prov.riskScore}%` }}
                    />
                  </div>
                </div>
                <div className="w-10 text-right">
                  <span className="text-sm font-black text-foreground">{prov.riskScore}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Bottom Section — Alerts + Incidents Table */}
      <section className="grid grid-cols-1 xl:grid-cols-4 gap-4 md:gap-6">
        {/* Recent Alerts */}
        <div className="xl:col-span-1 space-y-3 md:space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-[10px] md:text-sm font-bold uppercase tracking-widest text-muted-foreground">Peringatan Kritis</h3>
            <span className="flex items-center gap-1 px-2 py-0.5 bg-red-100 text-red-600 rounded-full text-[10px] font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
              LIVE
            </span>
          </div>
          {filteredAlerts.length === 0 ? (
            <div className="floating-card p-4 text-center text-xs text-muted-foreground">Tidak ada peringatan</div>
          ) : (
            filteredAlerts.map((alert) => (
              <div key={alert.id} className={cn(
                "floating-card p-3 md:p-4 border-l-4 transition-transform hover:translate-x-1",
                alert.severity === 'High' ? "border-l-red-500 relative overflow-hidden" : "border-l-amber-500"
              )}>
                {alert.severity === 'High' && (
                  <div className="absolute top-3 right-3">
                    <span className="flex h-2 w-2 relative">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                    </span>
                  </div>
                )}
                <div className="flex items-center gap-2 mb-2">
                  <span className={cn(
                    "px-2 py-0.5 rounded text-[9px] font-bold uppercase",
                    alert.severity === 'High' ? "bg-red-100 text-red-600" : "bg-amber-100 text-amber-600"
                  )}>
                    {alert.severity === 'High' ? 'Kritis' : 'Waspada'}
                  </span>
                  <span className="text-[10px] text-muted-foreground font-medium">{alert.timestamp}</span>
                </div>
                <h4 className="text-xs md:text-sm font-bold text-foreground mb-1 pr-4">{alert.title}</h4>
                <p className="text-[10px] md:text-[11px] text-muted-foreground leading-relaxed">{alert.recommendation}</p>
              </div>
            ))
          )}
        </div>

        {/* Recent Incidents Table */}
        <div className="xl:col-span-3 floating-card overflow-hidden flex flex-col">
          <div className="p-4 md:p-6 flex items-center justify-between border-b border-border/50">
            <div>
              <h3 className="text-base md:text-lg font-bold text-foreground">Tabel Insiden Aktif</h3>
              <p className="text-xs md:text-sm text-muted-foreground mt-1">Status investigasi lapangan</p>
            </div>
            <button className="text-xs font-bold text-primary hover:text-primary/80 transition-colors bg-primary/10 px-3 py-1.5 rounded-full">
              Lihat Semua Laporan
            </button>
          </div>
          <div className="overflow-x-auto flex-1">
            <table className="w-full text-left min-w-[600px]">
              <thead>
                <tr className="bg-primary/5 text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                  <th className="px-4 md:px-6 py-3 md:py-4">Detail Insiden</th>
                  <th className="px-4 md:px-6 py-3 md:py-4">Lokasi</th>
                  <th className="px-4 md:px-6 py-3 md:py-4">Vendor</th>
                  <th className="px-4 md:px-6 py-3 md:py-4">Status Penanganan</th>
                  <th className="px-4 md:px-6 py-3 md:py-4 text-right">Korban</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/50">
                {filteredIncidents.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-12 text-center">
                      <p className="text-sm font-bold text-muted-foreground">Tidak ada insiden yang ditemukan.</p>
                    </td>
                  </tr>
                ) : (
                  filteredIncidents.map((incident) => {
                    const status = incident.status.toLowerCase();
                    const statusLabel =
                      status === 'investigating' ? 'Sedang Investigasi' :
                      status === 'resolved' ? 'Selesai' :
                      status === 'escalated' ? 'Eskalasi ke Pusat' :
                      status === 'closed' ? 'Ditutup' : incident.status;
                    return (
                      <tr key={incident.id} className="group hover:bg-primary/5 transition-colors cursor-pointer">
                        <td className="px-4 md:px-6 py-4">
                          <p className="text-sm font-bold text-foreground group-hover:text-primary transition-colors">{incident.title}</p>
                          <p className="text-[11px] text-muted-foreground mt-0.5">{incident.type}</p>
                        </td>
                        <td className="px-4 md:px-6 py-4">
                          <div className="flex items-center gap-1.5 text-xs font-medium text-foreground">
                            <MapPin className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                            <span className="truncate max-w-[150px]">{incident.location}</span>
                          </div>
                        </td>
                        <td className="px-4 md:px-6 py-4 text-xs text-foreground truncate max-w-[180px]">
                          {incident.vendor}
                        </td>
                        <td className="px-4 md:px-6 py-4">
                          <span className={cn(
                            "px-2.5 py-1 rounded-full text-[10px] font-bold whitespace-nowrap",
                            status === 'investigating' ? "bg-amber-100 text-amber-600 border border-amber-200" :
                            status === 'resolved' || status === 'closed' ? "bg-green-100 text-green-600 border border-green-200" :
                            "bg-red-100 text-red-600 border border-red-200"
                          )}>
                            {statusLabel}
                          </span>
                        </td>
                        <td className="px-4 md:px-6 py-4 text-right font-black text-sm text-foreground">
                          {incident.victims > 0 ? (
                            <span className="text-red-500">{incident.victims}</span>
                          ) : (
                            <span className="text-muted-foreground">-</span>
                          )}
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
}