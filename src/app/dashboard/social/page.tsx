'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  Signal, 
  MessageSquare, 
  Send, 
  Camera, 
  Globe, 
  TrendingUp, 
  BarChart3,
  ExternalLink,
  ThumbsUp,
  MessageCircle,
  Share2
} from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, Cell
} from 'recharts';
import { socialSignals } from '@/lib/dummy-data';
import { cn } from '@/lib/utils';

export default function SocialSignalPage() {
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);

  if (!mounted) return <div className="h-screen" />;

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* Trends & Keywords */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 floating-card p-6">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-lg font-bold text-foreground">Tren Denyut Sosial</h3>
              <p className="text-sm text-muted-foreground">Distribusi volume dan sentimen dari waktu ke waktu</p>
            </div>
            <div className="flex gap-4">
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-green-500" />
                <span className="text-[10px] font-bold uppercase text-muted-foreground">Positif</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-red-500" />
                <span className="text-[10px] font-bold uppercase text-muted-foreground">Negatif</span>
              </div>
            </div>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={socialSignals.trends}>
                <defs>
                  <linearGradient id="colorPos" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorNeg" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#EF4444" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#EF4444" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="date" hide />
                <YAxis hide />
                <Tooltip 
                   contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}
                />
                <Area type="monotone" dataKey="positive" stroke="#10B981" fillOpacity={1} fill="url(#colorPos)" strokeWidth={3} />
                <Area type="monotone" dataKey="negative" stroke="#EF4444" fillOpacity={1} fill="url(#colorNeg)" strokeWidth={3} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="floating-card p-6">
          <h3 className="text-lg font-bold text-foreground mb-1">Kata Kunci Populer</h3>
          <p className="text-sm text-muted-foreground mb-6">Awan topik dari ekstraksi sosial</p>
          <div className="flex flex-wrap gap-2">
            {socialSignals.keywords.map((tag, i) => (
              <motion.div
                key={tag.text}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.05 }}
                className={cn(
                  "px-3 py-1.5 rounded-xl text-xs font-bold cursor-pointer transition-all hover:scale-105",
                  tag.sentiment === 'negative' ? "bg-red-50 text-red-600 border border-red-100" :
                  tag.sentiment === 'positive' ? "bg-green-50 text-green-600 border border-green-100" :
                  "bg-gray-50 text-gray-600 border border-gray-100"
                )}
              >
                {tag.text}
              </motion.div>
            ))}
          </div>
          
          <div className="mt-8 pt-8 border-t border-border/50">
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-4">Pembagian Sentimen</h4>
            <div className="flex items-center gap-2 h-2 rounded-full overflow-hidden">
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
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
            <Signal className="w-4 h-4 text-primary animate-pulse" /> Feed Intelijen Langsung
          </h3>
          <div className="flex gap-2">
            <button className="px-4 py-1.5 glass rounded-xl text-[10px] font-bold uppercase hover:bg-primary/5 transition-colors">Semua Sumber</button>
            <button className="px-4 py-1.5 bg-foreground text-white rounded-xl text-[10px] font-bold uppercase">Hanya Kritis</button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="floating-card p-5 group"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600">
                    {i % 3 === 0 ? <Send className="w-4 h-4" /> : i % 2 === 0 ? <Camera className="w-4 h-4" /> : <Globe className="w-4 h-4" />}
                  </div>
                  <div>
                    <p className="text-xs font-bold text-foreground">@info_user_{i}</p>
                    <p className="text-[10px] text-muted-foreground">3 menit lalu • Jakarta</p>
                  </div>
                </div>
                <div className={cn(
                  "px-2 py-0.5 rounded text-[10px] font-bold",
                  i % 2 === 0 ? "bg-red-100 text-red-600" : "bg-green-100 text-green-600"
                )}>
                  {i % 2 === 0 ? 'KRITIS' : 'POSITIF'}
                </div>
              </div>
              <p className="text-sm text-foreground leading-relaxed mb-4">
                Laporan dari lapangan: Program Makan Bergizi Gratis di SD {i} berjalan lancar, namun ada keluhan terkait {i % 2 === 0 ? 'kualitas susu yang kurang segar' : 'porsi yang sangat memuaskan'}. #MBG_{i}
              </p>
              <div className="flex items-center justify-between pt-4 border-t border-border/50">
                <div className="flex gap-4">
                  <div className="flex items-center gap-1.5 text-muted-foreground text-[10px] font-bold">
                    <ThumbsUp className="w-3 h-3" /> {i * 12}
                  </div>
                  <div className="flex items-center gap-1.5 text-muted-foreground text-[10px] font-bold">
                    <MessageCircle className="w-3 h-3" /> {i * 4}
                  </div>
                </div>
                <button className="text-primary hover:bg-primary/5 p-1.5 rounded-lg transition-colors group-hover:scale-110">
                  <ExternalLink className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
