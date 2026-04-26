'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  BellRing, 
  ShieldAlert, 
  Clock, 
  CheckCircle2, 
  AlertCircle,
  ArrowRight,
  ShieldCheck,
  Zap,
  Activity,
  UserCheck
} from 'lucide-react';
import { alerts } from '@/lib/dummy-data';
import { cn } from '@/lib/utils';

export default function AlertsCenterPage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Quick Stats */}
        <div className="lg:col-span-1 space-y-4">
          <div className="floating-card p-6 bg-red-50/50 border-red-100">
             <div className="flex items-center gap-3 mb-4">
               <div className="w-10 h-10 bg-red-500 rounded-xl flex items-center justify-center text-white shadow-lg shadow-red-200">
                 <ShieldAlert className="w-5 h-5" />
               </div>
               <div>
                 <p className="text-sm font-bold text-red-600">Risiko Tinggi Aktif</p>
                 <h3 className="text-2xl font-bold text-foreground">12</h3>
               </div>
             </div>
             <p className="text-[10px] text-muted-foreground font-medium">Memerlukan perhatian segera dari koordinator lapangan.</p>
          </div>

          <div className="floating-card p-6">
             <div className="flex items-center gap-3 mb-4">
               <div className="w-10 h-10 bg-amber-500 rounded-xl flex items-center justify-center text-white shadow-lg shadow-amber-200">
                 <Activity className="w-5 h-5" />
               </div>
               <div>
                 <p className="text-sm font-bold text-amber-600">Tindakan Menunggu</p>
                 <h3 className="text-2xl font-bold text-foreground">42</h3>
               </div>
             </div>
             <p className="text-[10px] text-muted-foreground font-medium">Peringatan yang sedang diproses oleh unit intelijen.</p>
          </div>

          <div className="floating-card p-6">
             <div className="flex items-center gap-3 mb-4">
               <div className="w-10 h-10 bg-green-500 rounded-xl flex items-center justify-center text-white shadow-lg shadow-green-200">
                 <CheckCircle2 className="w-5 h-5" />
               </div>
               <div>
                 <p className="text-sm font-bold text-green-600">Selesai Hari Ini</p>
                 <h3 className="text-2xl font-bold text-foreground">156</h3>
               </div>
             </div>
             <p className="text-[10px] text-muted-foreground font-medium">Masalah yang berhasil ditutup dan diverifikasi.</p>
          </div>
        </div>

        {/* Alerts Feed */}
        <div className="lg:col-span-3 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Feed Peringatan Intelijen</h3>
            <div className="flex gap-2">
              <button className="px-4 py-1.5 bg-foreground text-white rounded-xl text-[10px] font-bold uppercase">Semua Sinyal</button>
              <button className="px-4 py-1.5 glass rounded-xl text-[10px] font-bold uppercase">Kritis</button>
            </div>
          </div>

          <div className="space-y-4">
            {alerts.concat(alerts).map((alert, i) => (
              <motion.div
                key={`${alert.id}-${i}`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className={cn(
                  "floating-card p-6 flex flex-col md:flex-row gap-6 group",
                  alert.severity === 'High' ? "border-l-4 border-l-red-500" : "border-l-4 border-l-amber-500"
                )}
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className={cn(
                      "px-2 py-0.5 rounded text-[10px] font-bold",
                      alert.severity === 'High' ? "bg-red-100 text-red-600" : "bg-amber-100 text-amber-600"
                    )}>
                      PRIORITAS {alert.severity === 'High' ? 'TINGGI' : 'SEDANG'}
                    </span>
                    <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {alert.timestamp}
                    </span>
                    <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider flex items-center gap-1">
                      <Zap className="w-3 h-3 text-primary" /> {alert.source}
                    </span>
                  </div>
                  <h4 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors">{alert.title}</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {alert.recommendation}
                  </p>
                </div>
                
                <div className="flex items-center gap-3 md:border-l border-border/50 md:pl-6">
                  <button className="p-3 bg-primary/10 rounded-xl text-primary hover:bg-primary hover:text-white transition-all shadow-sm">
                    <UserCheck className="w-5 h-5" />
                  </button>
                  <button className="flex items-center gap-2 px-6 py-3 bg-foreground text-white rounded-xl text-xs font-bold hover:bg-black transition-all">
                    Konfirmasi <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
