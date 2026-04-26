'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  APIProvider, 
  Map, 
  AdvancedMarker, 
  Pin,
  InfoWindow
} from '@vis.gl/react-google-maps';
import { 
  ShieldAlert, 
  TrendingUp, 
  Users, 
  School, 
  ArrowRight,
  Info,
  ChevronRight,
  AlertTriangle,
  Package,
  Factory
} from 'lucide-react';
import { 
  ScatterChart, Scatter, XAxis, YAxis, ZAxis, 
  CartesianGrid, Tooltip, ResponsiveContainer, Cell 
} from 'recharts';
import { provincesData, ProvinceData } from '@/lib/dummy-data';
import { cn } from '@/lib/utils';

const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '';

export default function RiskMapPage() {
  const [selectedProvince, setSelectedProvince] = useState<ProvinceData | null>(null);
  const [mapCenter] = useState({ lat: -2.5489, lng: 118.0149 }); // Center of Indonesia
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);

  if (!mounted) return <div className="h-screen" />;

  if (!API_KEY) {
    return (
      <div className="h-[600px] flex flex-col items-center justify-center glass rounded-3xl p-12 text-center">
        <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mb-6">
          <AlertTriangle className="text-amber-600 w-8 h-8" />
        </div>
        <h2 className="text-2xl font-bold text-foreground mb-2">Google Maps API Key Hilang</h2>
        <p className="text-muted-foreground max-w-md mb-8">
          Untuk mengaktifkan peta intelijen interaktif, silakan tambahkan API Key Anda ke file 
          <code className="mx-1 px-1.5 py-0.5 bg-primary/10 rounded text-primary">.env.local</code> sebagai 
          <code className="mx-1 px-1.5 py-0.5 bg-primary/10 rounded text-primary">NEXT_PUBLIC_GOOGLE_MAPS_API_KEY</code>.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col xl:flex-row gap-6">
        {/* Map Section */}
        <div className="flex-1 relative h-[600px] glass rounded-3xl overflow-hidden border-white/40 shadow-2xl">
          <APIProvider apiKey={API_KEY}>
            <Map
              defaultCenter={mapCenter}
              defaultZoom={5}
              mapId="PANTUIN_RISK_MAP"
              disableDefaultUI={true}
              styles={[
                {
                  "elementType": "geometry",
                  "stylers": [{ "color": "#f5f5f5" }]
                },
                {
                  "elementType": "labels.icon",
                  "stylers": [{ "visibility": "off" }]
                }
              ]}
            >
              {provincesData.map((province) => (
                <AdvancedMarker
                  key={province.id}
                  position={province.coordinates}
                  onClick={() => setSelectedProvince(province)}
                >
                  <div className={cn(
                    "relative flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 cursor-pointer border-2",
                    province.severity === 'Critical' ? "bg-red-600 border-red-200 shadow-lg shadow-red-200 scale-125" :
                    province.severity === 'High' ? "bg-red-500 border-red-100 shadow-lg shadow-red-100 scale-110" :
                    "bg-amber-400 border-amber-500 shadow-lg shadow-amber-500"
                  )}>
                    <div className="absolute inset-0 bg-white/20 rounded-full animate-ping opacity-75" />
                    <span className="text-[10px] font-bold text-white">{province.riskScore}</span>
                  </div>
                </AdvancedMarker>
              ))}
            </Map>
          </APIProvider>

          {/* Floating Detail Panel */}
          <AnimatePresence>
            {selectedProvince && (
              <motion.div
                initial={{ x: 400, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 400, opacity: 0 }}
                className="absolute top-6 right-6 bottom-6 w-96 glass rounded-2xl p-6 shadow-2xl z-10 overflow-y-auto"
              >
                <button 
                  onClick={() => setSelectedProvince(null)}
                  className="absolute top-4 right-4 text-muted-foreground hover:text-foreground"
                >
                  &times;
                </button>
                
                <div className="flex items-center gap-3 mb-6">
                  <div className={cn(
                    "w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-lg",
                    selectedProvince.severity === 'Critical' ? "bg-red-600" : "bg-red-400"
                  )}>
                    {selectedProvince.id.toUpperCase()}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-foreground">{selectedProvince.name}</h3>
                    <p className="text-xs font-bold uppercase text-muted-foreground tracking-widest">Prioritas {selectedProvince.severity === 'Critical' ? 'Kritis' : 'Tinggi'}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-6">
                  <div className="p-3 bg-white/50 rounded-xl border border-white/80">
                    <p className="text-[10px] font-bold text-muted-foreground uppercase mb-1">Skor Risiko</p>
                    <p className="text-lg font-bold text-foreground">{selectedProvince.riskScore}</p>
                  </div>
                  <div className="p-3 bg-white/50 rounded-xl border border-white/80">
                    <p className="text-[10px] font-bold text-muted-foreground uppercase mb-1">Insiden</p>
                    <p className="text-lg font-bold text-foreground text-red-500">{selectedProvince.incidentsCount}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3 flex items-center gap-2">
                      <Package className="w-3.5 h-3.5" /> Konteks Pengadaan
                    </h4>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-muted-foreground">Total Nilai</span>
                        <span className="font-bold">Rp {(selectedProvince.procurementValue / 1e9).toFixed(1)}M</span>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-muted-foreground">Paket RUP</span>
                        <span className="font-bold">{selectedProvince.packagesCount}</span>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-muted-foreground">Vendor Dominan</span>
                        <span className="font-bold text-xs max-w-[150px] text-right">{selectedProvince.dominantVendor}</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-primary/5 rounded-xl border border-primary/20">
                    <div className="flex items-center gap-2 mb-2 text-primary">
                      <Info className="w-4 h-4" />
                      <span className="text-[10px] font-bold uppercase tracking-wider">Insight AI</span>
                    </div>
                    <p className="text-xs leading-relaxed text-foreground italic">
                      "{selectedProvince.name} masuk Prioritas {selectedProvince.severity === 'Critical' ? 'Kritis' : 'Tinggi'} karena lonjakan insiden di wilayah {selectedProvince.dominantVendor}. Diperlukan audit segera pada rantai distribusi."
                    </p>
                  </div>
                </div>

                <button className="w-full mt-6 py-3 bg-foreground text-white rounded-xl text-sm font-bold flex items-center justify-center gap-2 hover:bg-black transition-all">
                  Buat Laporan Audit Lengkap <ArrowRight className="w-4 h-4" />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Priority List */}
        <div className="w-full xl:w-96 space-y-6">
          <div className="floating-card p-6">
            <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-4">Wilayah Prioritas Utama</h3>
            <div className="space-y-3">
              {[...provincesData].sort((a,b) => b.riskScore - a.riskScore).slice(0, 3).map((prov, i) => (
                <div key={prov.id} className="flex items-center gap-4 p-3 rounded-xl border border-border/50 hover:bg-primary/5 transition-colors cursor-pointer group">
                  <div className="text-sm font-bold text-muted-foreground">0{i+1}</div>
                  <div className="flex-1">
                    <p className="text-sm font-bold text-foreground group-hover:text-primary transition-colors">{prov.name}</p>
                    <p className="text-[10px] text-muted-foreground">Skor: {prov.riskScore} • {prov.severity === 'Critical' ? 'Kritis' : 'Tinggi'}</p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:translate-x-1 transition-transform" />
                </div>
              ))}
            </div>
          </div>

          <div className="floating-card p-6">
            <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-1">Eksposur Pengadaan</h3>
            <p className="text-[10px] text-muted-foreground mb-4">Korelasi antara Nilai & Risiko</p>
            <div className="h-[200px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: -20 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                  <XAxis type="number" dataKey="procurementValue" name="Nilai" hide />
                  <YAxis type="number" dataKey="riskScore" name="Risiko" hide />
                  <ZAxis type="number" dataKey="incidentsCount" range={[50, 400]} />
                  <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                  <Scatter name="Provinsi" data={provincesData}>
                    {provincesData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.severity === 'Critical' ? '#EF4444' : '#FF4B3A'} />
                    ))}
                  </Scatter>
                </ScatterChart>
              </ResponsiveContainer>
            </div>
            <p className="text-[10px] text-center text-muted-foreground italic mt-2">Ukuran gelembung menunjukkan jumlah insiden</p>
          </div>
        </div>
      </div>
    </div>
  );
}
