'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  ShieldAlert, 
  Clock, 
  CheckCircle2, 
  ArrowRight,
  Zap,
  Activity,
  UserCheck
} from 'lucide-react';
import { alerts } from '@/lib/dummy-data';
import { cn } from '@/lib/utils';

export default function AlertsCenterPage() {
  return (
    <div className="space-y-4 md:space-y-6 animate-in fade-in duration-700">

      {/* Quick Stats — selalu 1 baris 3 kolom */}
      <div className="grid grid-cols-3 gap-3 md:gap-4 ml-4">
        <div className="floating-card p-3 md:p-5 bg-red-50/50 border-red-100">
          <div className="flex items-center gap-2 md:gap-3">
            <div className="w-8 h-8 md:w-10 md:h-10 bg-red-500 rounded-xl flex items-center justify-center text-white shadow-lg shadow-red-200 flex-shrink-0">
              <ShieldAlert className="w-4 h-4 md:w-5 md:h-5" />
            </div>
            <div>
              <p className="text-[9px] md:text-[10px] font-bold text-red-600 leading-tight">Risiko Tinggi Aktif</p>
              <h3 className="text-lg md:text-2xl font-bold text-foreground">12</h3>
            </div>
          </div>
          <p className="text-[10px] text-muted-foreground font-medium mt-2 hidden md:block">Memerlukan perhatian segera dari koordinator lapangan.</p>
        </div>

        <div className="floating-card p-3 md:p-5 ">
          <div className="flex items-center gap-2 md:gap-3">
            <div className="w-8 h-8 md:w-10 md:h-10 bg-amber-500 rounded-xl flex items-center justify-center text-white shadow-lg shadow-amber-200 flex-shrink-0">
              <Activity className="w-4 h-4 md:w-5 md:h-5" />
            </div>
            <div>
              <p className="text-[9px] md:text-[10px] font-bold text-amber-600 leading-tight">Tindakan Menunggu</p>
              <h3 className="text-lg md:text-2xl font-bold text-foreground">42</h3>
            </div>
          </div>
          <p className="text-[10px] text-muted-foreground font-medium mt-2 hidden md:block">Peringatan yang sedang diproses oleh unit intelijen.</p>
        </div>

        <div className="floating-card p-3 md:p-5">
          <div className="flex items-center gap-2 md:gap-3">
            <div className="w-8 h-8 md:w-10 md:h-10 bg-green-500 rounded-xl flex items-center justify-center text-white shadow-lg shadow-green-200 flex-shrink-0">
              <CheckCircle2 className="w-4 h-4 md:w-5 md:h-5" />
            </div>
            <div>
              <p className="text-[9px] md:text-[10px] font-bold text-green-600 leading-tight">Selesai Hari Ini</p>
              <h3 className="text-lg md:text-2xl font-bold text-foreground">156</h3>
            </div>
          </div>
          <p className="text-[10px] text-muted-foreground font-medium mt-2 hidden md:block">Masalah yang berhasil ditutup dan diverifikasi.</p>
        </div>
      </div>

      {/* Alerts Feed — full width */}
      <div className="space-y-4 ml-4">
        <div className="flex items-center justify-between">
          <h3 className="text-[10px] md:text-sm font-bold uppercase tracking-widest text-muted-foreground">Feed Peringatan Intelijen</h3>
          <div className="flex gap-2">
            <button className="px-3 md:px-4 py-1.5 bg-foreground text-white rounded-xl text-[10px] font-bold uppercase">Semua</button>
            <button className="px-3 md:px-4 py-1.5 glass rounded-xl text-[10px] font-bold uppercase">Kritis</button>
          </div>
        </div>

        <div className="space-y-3">
          {alerts.concat(alerts).map((alert, i) => (
            <motion.div
              key={`${alert.id}-${i}`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className={cn(
                "floating-card p-4 md:p-5 group",
                alert.severity === 'High' ? "border-l-4 border-l-red-500" : "border-l-4 border-l-amber-500"
              )}
            >
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className={cn(
                  "px-2 py-0.5 rounded text-[10px] font-bold",
                  alert.severity === 'High' ? "bg-red-100 text-red-600" : "bg-amber-100 text-amber-600"
                )}>
                  {alert.severity === 'High' ? 'TINGGI' : 'SEDANG'}
                </span>
                <span className="text-[10px] text-muted-foreground font-bold flex items-center gap-1">
                  <Clock className="w-3 h-3" /> {alert.timestamp}
                </span>
                <span className="text-[10px] text-muted-foreground font-bold flex items-center gap-1">
                  <Zap className="w-3 h-3 text-primary" /> {alert.source}
                </span>
              </div>

              <h4 className="text-sm md:text-base font-bold text-foreground mb-1 group-hover:text-primary transition-colors leading-snug">
                {alert.title}
              </h4>
              <p className="text-xs md:text-sm text-muted-foreground leading-relaxed mb-3">
                {alert.recommendation}
              </p>

              <div className="flex items-center gap-2 pt-3 border-t border-border/40">
                <button className="p-2 bg-primary/10 rounded-lg text-primary hover:bg-primary hover:text-white transition-all">
                  <UserCheck className="w-4 h-4" />
                </button>
                <button className="flex items-center gap-1.5 px-4 py-2 bg-foreground text-white rounded-lg text-[10px] md:text-xs font-bold hover:bg-black transition-all">
                  Konfirmasi <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

    </div>
  );
}