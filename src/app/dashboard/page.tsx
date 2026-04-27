'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowUpRight, 
  ArrowDownRight, 
  MapPin 
} from 'lucide-react';
import { 
  AreaChart, Area, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend 
} from 'recharts';
import { statsOverview, recentIncidents, alerts, socialSignals } from '@/lib/dummy-data';
import { cn } from '@/lib/utils';

const COLORS = ['#FF4B3A', '#EF4444', '#F59E0B', '#6B7280', '#374151'];

const translatedStats = [
  { label: 'Total Sekolah Dipantau', value: '15.240', change: '+12%', type: 'neutral' },
  { label: 'Total Vendor SPPG', value: '1.842', change: '+5%', type: 'neutral' },
  { label: 'Wilayah Risiko Tinggi', value: '12', change: '+2', type: 'negative' },
  { label: 'Insiden Bulan Ini', value: '84', change: '-15%', type: 'positive' },
  { label: 'Total Nilai Pengadaan', value: 'Rp 45,2T', change: '+8%', type: 'neutral' },
  { label: 'Wilayah Prioritas', value: '4', change: '0', type: 'neutral' },
];

export default function OverviewPage() {
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);
  if (!mounted) return <div className="h-screen" />;

  return (
    <div className="space-y-6 md:space-y-8 animate-in fade-in duration-700">
      {/* Hero Stats */}
      <section className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-3 md:gap-4">
        {translatedStats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="floating-card p-4 md:p-5"
          >
            <p className="text-[9px] md:text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-1 leading-tight">{stat.label}</p>
            <div className="flex items-end justify-between gap-1">
              <h3 className="text-lg md:text-2xl font-bold text-foreground">{stat.value}</h3>
              <div className={cn(
                "flex items-center text-[9px] md:text-[10px] font-bold px-1 md:px-1.5 py-0.5 rounded-lg flex-shrink-0",
                stat.type === 'positive' ? "bg-green-100 text-green-600" : 
                stat.type === 'negative' ? "bg-red-100 text-red-600" : "bg-gray-100 text-gray-600"
              )}>
                {stat.change}
                {stat.type === 'positive' ? <ArrowUpRight className="w-2.5 h-2.5 ml-0.5" /> : 
                 stat.type === 'negative' ? <ArrowDownRight className="w-2.5 h-2.5 ml-0.5" /> : null}
              </div>
            </div>
          </motion.div>
        ))}
      </section>

      {/* Main Charts */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
        {/* Incident Trend */}
        <div className="lg:col-span-2 floating-card p-4 md:p-6">
          <div className="flex items-center justify-between mb-4 md:mb-6">
            <div>
              <h3 className="text-base md:text-lg font-bold text-foreground">Tren Insiden & Sentimen</h3>
              <p className="text-xs md:text-sm text-muted-foreground">Agregat harian laporan masalah</p>
            </div>
            <div className="flex gap-2 md:gap-3">
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-primary" />
                <span className="text-[10px] font-bold uppercase text-muted-foreground hidden sm:block">Sebutan</span>
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
                  <linearGradient id="colorMentions" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#FF4B3A" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#FF4B3A" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="date" hide />
                <YAxis hide />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'rgba(255,255,255,0.9)', borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                />
                <Area type="monotone" dataKey="mentions" stroke="#FF4B3A" fillOpacity={1} fill="url(#colorMentions)" strokeWidth={3} />
                <Area type="monotone" dataKey="negative" stroke="#EF4444" fill="transparent" strokeWidth={2} strokeDasharray="5 5" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Categories Distribution */}
        <div className="floating-card p-4 md:p-6">
          <h3 className="text-base md:text-lg font-bold text-foreground mb-1">Kategori Insiden</h3>
          <p className="text-xs md:text-sm text-muted-foreground mb-4 md:mb-6">Distribusi berdasarkan jenis laporan</p>
          <div className="h-[200px] md:h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={[
                    { name: 'Keracunan', value: 40 },
                    { name: 'Makanan Basi', value: 25 },
                    { name: 'Benda Asing', value: 15 },
                    { name: 'Kualitas Buruk', value: 20 },
                  ]}
                  innerRadius={50}
                  outerRadius={70}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {COLORS.map((color, index) => (
                    <Cell key={`cell-${index}`} fill={color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend layout="vertical" verticalAlign="middle" align="right" wrapperStyle={{ fontSize: '10px', fontWeight: 'bold' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>

      {/* Bottom Section */}
      <section className="grid grid-cols-1 xl:grid-cols-4 gap-4 md:gap-6">
        {/* Recent Alerts */}
        <div className="xl:col-span-1 space-y-3 md:space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-[10px] md:text-sm font-bold uppercase tracking-widest text-muted-foreground">Peringatan Kritis</h3>
            <span className="px-2 py-0.5 bg-red-100 text-red-600 rounded-full text-[10px] font-bold">LANGSUNG</span>
          </div>
          {alerts.map((alert) => (
            <div key={alert.id} className="floating-card p-3 md:p-4 border-l-4 border-l-primary hover:translate-x-1 transition-transform">
              <div className="flex items-center justify-between mb-2">
                <span className={cn(
                  "px-2 py-0.5 rounded text-[10px] font-bold",
                  alert.severity === 'High' ? "bg-red-100 text-red-600" : "bg-amber-100 text-amber-600"
                )}>
                  {alert.severity === 'High' ? 'TINGGI' : 'SEDANG'}
                </span>
                <span className="text-[10px] text-muted-foreground font-medium">{alert.timestamp}</span>
              </div>
              <h4 className="text-xs md:text-sm font-bold text-foreground mb-1">{alert.title}</h4>
              <p className="text-[10px] md:text-xs text-muted-foreground leading-relaxed">{alert.recommendation}</p>
            </div>
          ))}
        </div>

        {/* Recent Incidents Table */}
        <div className="xl:col-span-3 floating-card overflow-hidden">
          <div className="p-4 md:p-6 flex items-center justify-between border-b border-border/50">
            <div>
              <h3 className="text-base md:text-lg font-bold text-foreground">Insiden Aktif</h3>
              <p className="text-xs md:text-sm text-muted-foreground hidden sm:block">Investigasi sedang berlangsung</p>
            </div>
            <button className="text-xs font-bold text-primary hover:underline">Lihat Semua</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left min-w-[500px]">
              <thead>
                <tr className="bg-primary/5 text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                  <th className="px-4 md:px-6 py-3 md:py-4">Insiden</th>
                  <th className="px-4 md:px-6 py-3 md:py-4">Lokasi</th>
                  <th className="px-4 md:px-6 py-3 md:py-4">Status</th>
                  <th className="px-4 md:px-6 py-3 md:py-4 text-right">Korban</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/50">
                {recentIncidents.map((incident) => (
                  <tr key={incident.id} className="group hover:bg-primary/5 transition-colors cursor-pointer">
                    <td className="px-4 md:px-6 py-3 md:py-4">
                      <p className="text-xs md:text-sm font-bold text-foreground group-hover:text-primary transition-colors">{incident.title}</p>
                      <p className="text-[10px] text-muted-foreground">{incident.type}</p>
                    </td>
                    <td className="px-4 md:px-6 py-3 md:py-4">
                      <div className="flex items-center gap-1.5 text-xs font-medium text-foreground">
                        <MapPin className="w-3 h-3 md:w-3.5 md:h-3.5 text-primary flex-shrink-0" />
                        <span className="truncate max-w-[120px]">{incident.location}, {incident.province}</span>
                      </div>
                    </td>
                    <td className="px-4 md:px-6 py-3 md:py-4">
                      <span className={cn(
                        "px-2 py-0.5 rounded-full text-[10px] font-bold whitespace-nowrap",
                        incident.status === 'Investigating' ? "bg-amber-100 text-amber-600" :
                        incident.status === 'Resolved' ? "bg-green-100 text-green-600" :
                        "bg-red-100 text-red-600"
                      )}>
                        {incident.status === 'Investigating' ? 'Investigasi' : 
                         incident.status === 'Resolved' ? 'Selesai' : 
                         incident.status === 'Escalated' ? 'Eskalasi' : incident.status}
                      </span>
                    </td>
                    <td className="px-4 md:px-6 py-3 md:py-4 text-right font-bold text-xs md:text-sm text-foreground">
                      {incident.victims > 0 ? incident.victims : '-'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
}