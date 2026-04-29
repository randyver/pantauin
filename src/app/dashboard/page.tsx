'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  ArrowUpRight,
  ArrowDownRight,
  MapPin,
  AlertTriangle,
  School,
  Building,
  Activity,
  Globe,
  Radio,
  Bell,
  Newspaper,
  Video
} from 'lucide-react';
import {
  AreaChart, Area, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts';
import { socialSignals, sparklineData, provincesData } from '@/lib/dummy-data';
import { cn } from '@/lib/utils';
import { useSearch } from '@/lib/search-context';
import Link from 'next/link';

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

const TwitterIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.261 5.635 5.903-5.635Zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const InstagramIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
  </svg>
);

const TiktokIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V9.15a8.28 8.28 0 004.84 1.55V7.25a4.85 4.85 0 01-1.07-.56z" />
  </svg>
);

export default function OverviewPage() {
  const [mounted, setMounted] = React.useState(false);
  const { value: searchTerm } = useSearch();

  React.useEffect(() => setMounted(true), []);
  if (!mounted) return <div className="h-screen" />;

  // Data ringkasan dari sosmed-dummy-data.ts
  const summaryIncidents = [
    {
      id: 'inc-demak',
      title: 'Keracunan Massal Nasi Goreng',
      location: 'Demak',
      province: 'Jawa Tengah',
      type: 'Keracunan',
      status: 'Investigating',
      victims: 187,
      sources: [
        { platform: 'tiktok', url: 'https://vt.tiktok.com/ZS9SYrgAL/' },
        { platform: 'news', url: 'https://regional.kompas.com/read/2026/04/20/110825478/diduga-keracunan-mbg-di-demak-ibu-menyusui-alami-mual-ratusan-santri' }
      ],
    },
    {
      id: 'inc-cianjur',
      title: 'Dugaan Keracunan Fatal (Balita)',
      location: 'Cianjur',
      province: 'Jawa Barat',
      type: 'Keracunan',
      status: 'Escalated',
      victims: 50,
      sources: [
        { platform: 'twitter', url: 'https://x.com/i/status/2048056231928217678' },
        { platform: 'instagram', url: 'https://www.instagram.com/reel/DWl5cMSk6VO/' },
        { platform: 'news', url: 'https://pontianakpost.jawapos.com/nasional/2604270003/balita-di-cianjur-meninggal-diduga-keracunan-makan-bergizi-gratis-dinkes-lakukan-penyelidikan' }
      ],
    },
    {
      id: 'inc-rembang',
      title: 'Keracunan Susu Acara Kartinian',
      location: 'Rembang',
      province: 'Jawa Tengah',
      type: 'Makanan Basi',
      status: 'Resolved',
      victims: 22,
      sources: [
        { platform: 'tiktok', url: 'https://vt.tiktok.com/ZS9SjxXQC/' },
        { platform: 'news', url: 'https://semarang.viva.co.id/berita/6843-diduga-keracun22-siswa-sd-di-rembang-dilarikan-ke-puskesmas-setelah-makan-menu-mbg' }
      ],
    },
    {
      id: 'inc-jeneponto',
      title: 'Keracunan Lauk Ikan MBG',
      location: 'Jeneponto',
      province: 'Sulawesi Selatan',
      type: 'Keracunan',
      status: 'Investigating',
      victims: 35,
      sources: [
        { platform: 'instagram', url: 'https://www.instagram.com/reel/DXibavdgeGU/' },
        { platform: 'tiktok', url: 'https://vt.tiktok.com/ZS9SFCcmw/' }
      ],
    },
    {
      id: 'inc-deli',
      title: 'Keracunan Ayam Bakar MBG',
      location: 'Deli Serdang',
      province: 'Sumatra Utara',
      type: 'Keracunan',
      status: 'Investigating',
      victims: 12,
      sources: [
        { platform: 'news', url: 'https://medan.kompas.com/read/2026/04/29/080316778/12-siswa-sd-di-deli-serdang-keracunan-usai-santap-mbg-bgn-sppg-kami-pastikan' }
      ],
    }
  ];

  const summaryAlerts = [
    {
      id: 'alt-001',
      title: 'Lonjakan Kasus Keracunan - Demak',
      severity: 'High',
      timestamp: '20 Apr 2026',
      recommendation: '187 warga termasuk santri dan ibu menyusui terdampak. SPPG Pilangwetan perlu dievaluasi segera.',
    },
    {
      id: 'alt-002',
      title: 'Isu Kritis: Balita Meninggal di Cianjur',
      severity: 'High',
      timestamp: '25 Apr 2026',
      recommendation: 'Dinkes sedang melakukan investigasi. Sentimen negatif sangat tinggi. Tunggu hasil lab resmi.',
    },
    {
      id: 'alt-003',
      title: 'Peringatan Kualitas: Susu Basi Rembang',
      severity: 'Medium',
      timestamp: '21 Apr 2026',
      recommendation: 'Puluhan siswa dilarikan ke RS. Cek standar penyimpanan susu di mitra dapur terkait.',
    },
  ];

  const filteredIncidents = summaryIncidents.filter(inc =>
    !searchTerm ||
    inc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    inc.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    inc.province.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredAlerts = summaryAlerts.filter(alert =>
    !searchTerm ||
    alert.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    alert.recommendation.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const keyMetrics = [
    { label: 'Insiden Bulan Ini', value: '84', change: '-15%', type: 'positive', icon: AlertTriangle, sparkline: sparklineData.incidents },
    { label: 'Wilayah Risiko Tinggi', value: '12', change: '+2', type: 'negative', icon: MapPin, sparkline: sparklineData.highRisk },
    { label: 'Sekolah Dipantau', value: '15.240', change: '+12%', type: 'neutral', icon: School, sparkline: sparklineData.schools },
    { label: 'Vendor SPPG', value: '1.842', change: '+5%', type: 'neutral', icon: Building, sparkline: sparklineData.vendors },
  ];

  const topProvinces = [...provincesData].sort((a, b) => b.riskScore - a.riskScore).slice(0, 5);

  const formatDate = (dateStr: any) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return date.toLocaleDateString('id-ID', { day: 'numeric', month: 'short' });
  };

  return (
    <div className="space-y-6 md:space-y-8 animate-in fade-in duration-700">

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
          <span className="text-sm font-semibold text-foreground">29 April 2026, 23:15 WIB</span>
        </div>
      </header>



      {/* 3. Key Metric Cards */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {keyMetrics.map((stat, i) => {
          const Icon = stat.icon;
          const color = stat.type === 'positive' ? '#16a34a' : stat.type === 'negative' ? '#dc2626' : '#2563eb';
          
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="floating-card p-4 md:p-5 relative overflow-hidden"
            >
              <div className="flex justify-between items-start mb-2">
                <div className="p-2 rounded-xl bg-primary/10">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <div className={cn(
                  "flex items-center text-[10px] font-bold px-1.5 py-0.5 rounded-lg",
                  stat.type === 'positive' ? "bg-green-100 text-green-600" :
                  stat.type === 'negative' ? "bg-red-100 text-red-600" : "bg-blue-100 text-blue-600"
                )}>
                  {stat.change}
                  {stat.type === 'positive' ? <ArrowDownRight className="w-3 h-3 ml-0.5" /> :
                   stat.type === 'negative' ? <ArrowUpRight className="w-3 h-3 ml-0.5" /> : null}
                </div>
              </div>
              <p className="text-[10px] md:text-[11px] font-bold text-muted-foreground uppercase tracking-widest mt-4 mb-1">
                {stat.label}
              </p>
              <div className="flex items-end justify-between">
                <h3 className="text-2xl md:text-3xl font-black text-foreground">{stat.value}</h3>
                <Sparkline data={stat.sparkline} color={color} />
              </div>
            </motion.div>
          );
        })}
      </section>

      {/* 4. Main Content Area */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
        <div className="lg:col-span-2 floating-card p-4 md:p-6 flex flex-col">
          <div className="flex items-center justify-between mb-4 md:mb-6">
            <div>
              <h3 className="text-base md:text-lg font-bold text-foreground">Tren Insiden &amp; Sentimen</h3>
              <p className="text-xs md:text-sm text-muted-foreground">Agregat harian laporan publik</p>
            </div>
            <div className="flex gap-3">
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-primary" />
                <span className="text-[10px] font-bold uppercase text-muted-foreground hidden sm:block">Total Sebutan</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
                <span className="text-[10px] font-bold uppercase text-muted-foreground hidden sm:block">Sentimen Negatif</span>
              </div>
            </div>
          </div>
          <div className="flex-1 min-h-[250px] md:min-h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={socialSignals.trends} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
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
          </div>
        </div>

        <div className="floating-card p-4 md:p-6 flex flex-col justify-between">
          <div className="w-full text-center">
            <h3 className="text-base md:text-lg font-bold text-foreground">Skor Kesehatan MBG</h3>
            <p className="text-xs text-muted-foreground mt-1">Indeks performa nasional</p>
          </div>
          
          <Gauge value={72} />
          
          <div className="w-full mt-4 pt-4 border-t border-border/50">
            <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-4 text-center">
              Distribusi Kategori Insiden
            </h3>
            <div className="h-[140px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={[
                      { name: 'Keracunan', value: 40 },
                      { name: 'Makanan Basi', value: 25 },
                      { name: 'Benda Asing', value: 15 },
                      { name: 'Kualitas Buruk', value: 20 },
                    ]}
                    innerRadius={40}
                    outerRadius={60}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {COLORS.map((color, index) => (
                      <Cell key={`cell-${index}`} fill={color} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', fontSize: '12px' }} />
                  <Legend layout="vertical" verticalAlign="middle" align="right" wrapperStyle={{ fontSize: '11px', fontWeight: '600' }} />
                </PieChart>
              </ResponsiveContainer>
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
                  <th className="px-4 md:px-6 py-3 md:py-4">Lokasi &amp; Wilayah</th>
                  <th className="px-4 md:px-6 py-3 md:py-4">Sumber Dominan</th>
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
                  filteredIncidents.map((incident) => (
                    <tr key={incident.id} className="group hover:bg-primary/5 transition-colors cursor-pointer">
                      <td className="px-4 md:px-6 py-4">
                        <p className="text-sm font-bold text-foreground group-hover:text-primary transition-colors">{incident.title}</p>
                        <p className="text-[11px] text-muted-foreground mt-0.5">{incident.type}</p>
                      </td>
                      <td className="px-4 md:px-6 py-4">
                        <div className="flex items-center gap-1.5 text-xs font-medium text-foreground">
                          <MapPin className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                          <span className="truncate max-w-[150px]">{incident.location}, {incident.province}</span>
                        </div>
                      </td>
                      <td className="px-4 md:px-6 py-4">
                        <div className="flex flex-wrap gap-2">
                          {incident.sources.map((src: { platform: string, url: string }) => {
                            let Icon: any = Newspaper;
                            let bgColor = "bg-slate-100 text-slate-600 hover:bg-slate-200";
                            
                            if (src.platform === 'tiktok') {
                              Icon = TiktokIcon;
                              bgColor = "bg-zinc-900 text-white hover:bg-zinc-800";
                            } else if (src.platform === 'instagram') {
                              Icon = InstagramIcon;
                              bgColor = "bg-pink-100 text-pink-600 hover:bg-pink-200";
                            } else if (src.platform === 'twitter') {
                              Icon = TwitterIcon;
                              bgColor = "bg-blue-100 text-blue-600 hover:bg-blue-200";
                            }

                            return (
                              <a 
                                key={src.platform} 
                                href={src.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                title={`Lihat sumber di ${src.platform}`}
                                className={cn(
                                  "p-1.5 rounded-full transition-colors flex items-center justify-center",
                                  bgColor
                                )}
                              >
                                <Icon className="w-3.5 h-3.5" />
                              </a>
                            );
                          })}
                        </div>
                      </td>
                      <td className="px-4 md:px-6 py-4">
                        <span className={cn(
                          "px-2.5 py-1 rounded-full text-[10px] font-bold whitespace-nowrap",
                          incident.status === 'Investigating' ? "bg-amber-100 text-amber-600 border border-amber-200" :
                          incident.status === 'Resolved' ? "bg-green-100 text-green-600 border border-green-200" :
                          "bg-red-100 text-red-600 border border-red-200"
                        )}>
                          {incident.status === 'Investigating' ? 'Sedang Investigasi' :
                           incident.status === 'Resolved' ? 'Selesai' :
                           incident.status === 'Escalated' ? 'Eskalasi ke Pusat' : incident.status}
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
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
}