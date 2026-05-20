'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Phone, Mail, Globe, ExternalLink, MapPin, Search,
  ChevronDown, Shield, Building2, Smartphone, PhoneCall,
  AlertTriangle, BookOpen, FileText, Users, Megaphone,
  ChevronRight, Copy, Check
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useSearch } from '@/lib/search-context';
import {
  kontakNasional, kontakProvinsi, kanalOnline,
  getProvinsiList,
  type KontakNasional, type KontakProvinsi, type KanalOnline,
} from '@/lib/pengaduan-data';

const kategoriLabels: Record<string, { label: string; color: string; icon: React.ElementType }> = {
  pengaduan: { label: 'Pengaduan', color: 'bg-blue-100 text-blue-700 border-blue-200', icon: Megaphone },
  pengawasan: { label: 'Pengawasan', color: 'bg-amber-100 text-amber-700 border-amber-200', icon: Shield },
  penegakan: { label: 'Penegakan', color: 'bg-red-100 text-red-700 border-red-200', icon: AlertTriangle },
};

const jenisIcons: Record<string, React.ElementType> = {
  'Dinas Pendidikan': BookOpen,
  'Dinas Kesehatan': Building2,
  'Inspektorat': Shield,
  'Ombudsman Perwakilan': Users,
};

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button onClick={handleCopy} className="p-1 rounded-md hover:bg-muted/30 transition-colors text-muted-foreground hover:text-foreground">
      {copied ? <Check className="w-3 h-3 text-green-500" /> : <Copy className="w-3 h-3" />}
    </button>
  );
}

export default function LaporinPage() {
  const [mounted, setMounted] = useState(false);
  const { value: globalSearch } = useSearch();
  const [selectedProvinsi, setSelectedProvinsi] = useState<string>('all');
  const [activeTab, setActiveTab] = useState<'nasional' | 'daerah' | 'online'>('nasional');
  const [expandedCard, setExpandedCard] = useState<string | null>(null);

  useEffect(() => { setMounted(true); }, []);

  const provinsiList = getProvinsiList();

  // Filter kontak provinsi
  const filteredProvinsi = kontakProvinsi.filter(k => {
    if (selectedProvinsi !== 'all' && k.provinsi !== selectedProvinsi) return false;
    if (globalSearch) {
      const q = globalSearch.toLowerCase();
      return k.instansi.toLowerCase().includes(q) || k.provinsi.toLowerCase().includes(q);
    }
    return true;
  });

  // Filter kontak nasional
  const filteredNasional = kontakNasional.filter(k => {
    if (globalSearch) {
      const q = globalSearch.toLowerCase();
      return k.nama.toLowerCase().includes(q) || k.deskripsi.toLowerCase().includes(q);
    }
    return true;
  });

  // ✅ Filter kanal online berdasarkan search
  const filteredOnline = kanalOnline.filter(k => {
    if (globalSearch) {
      const q = globalSearch.toLowerCase();
      return (
        k.nama.toLowerCase().includes(q) ||
        k.deskripsi.toLowerCase().includes(q) ||
        k.jenis.toLowerCase().includes(q)
      );
    }
    return true;
  });

  if (!mounted) return <div className="h-screen" />;

  return (
    <div className="sm:ml-4 space-y-6 md:space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center shadow-lg shadow-primary/20">
            <Megaphone className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-lg md:text-xl font-bold text-foreground tracking-tight">Pusat Pengaduan MBG</h1>
            <p className="text-xs text-muted-foreground">Temukan kontak resmi untuk melaporkan isu terkait program MBG</p>
          </div>
        </div>
      </div>

      {/* ✅ Search feedback banner */}
      {globalSearch && (
        <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary/5 border border-primary/20 text-xs text-primary font-medium">
          <Search className="w-3.5 h-3.5" />
          Filter aktif: "{globalSearch}" — ditemukan{' '}
          {activeTab === 'nasional' ? filteredNasional.length :
           activeTab === 'daerah' ? filteredProvinsi.length :
           filteredOnline.length} hasil
        </div>
      )}

      {/* Tips Banner */}
      <div className="floating-card p-4 md:p-5 border-l-4 border-primary">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
            <FileText className="w-4 h-4 text-primary" />
          </div>
          <div>
            <p className="text-xs font-bold text-foreground mb-1">Tips Melapor</p>
            <p className="text-[11px] md:text-xs text-muted-foreground leading-relaxed">
              Siapkan <strong>bukti foto/video</strong>, <strong>kronologi kejadian</strong> (tanggal, waktu, lokasi), 
              <strong> nama sekolah/lembaga terkait</strong>, dan <strong>identitas pelapor</strong> (bisa anonim di beberapa kanal). 
              Semakin lengkap bukti, semakin cepat ditindaklanjuti.
            </p>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {([
          { key: 'nasional' as const, label: 'Instansi Nasional', icon: Building2, count: filteredNasional.length },
          { key: 'daerah' as const, label: 'Kontak Daerah', icon: MapPin, count: filteredProvinsi.length },
          { key: 'online' as const, label: 'Kanal Online', icon: Globe, count: filteredOnline.length },
        ]).map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={cn(
              'flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-semibold transition-all whitespace-nowrap',
              activeTab === tab.key
                ? 'bg-primary text-white shadow-lg shadow-primary/20'
                : 'bg-white/50 text-muted-foreground hover:bg-white/80 border border-border/50'
            )}
          >
            <tab.icon className="w-3.5 h-3.5" />
            {tab.label}
            <span className={cn(
              'px-1.5 py-0.5 rounded-full text-[10px] font-bold',
              activeTab === tab.key ? 'bg-white/20' : 'bg-muted/50'
            )}>
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {/* TAB: INSTANSI NASIONAL */}
        {activeTab === 'nasional' && (
          <motion.div
            key="nasional"
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            {filteredNasional.length === 0 ? (
              <div className="col-span-2 floating-card p-8 text-center">
                <Search className="w-8 h-8 text-muted-foreground mx-auto mb-3" />
                <p className="text-sm font-medium text-muted-foreground">Tidak ada instansi ditemukan</p>
                <p className="text-xs text-muted-foreground mt-1">Coba ubah kata kunci pencarian</p>
              </div>
            ) : filteredNasional.map((k, i) => {
              const kat = kategoriLabels[k.kategori];
              const isExpanded = expandedCard === k.id;
              return (
                <div
                  key={k.id}
                  className="floating-card p-4 md:p-5 hover:shadow-xl transition-shadow cursor-pointer group"
                  onClick={() => setExpandedCard(isExpanded ? null : k.id)}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-xl overflow-hidden flex-shrink-0 border border-border/40 bg-white">
                        {k.logo
                          ? <img src={k.logo} alt={k.nama} className="w-full h-full object-cover" />
                          : <div className="w-full h-full flex items-center justify-center bg-primary/10"><kat.icon className="w-4 h-4 text-primary" /></div>
                        }
                      </div>
                      <div>
                        <h3 className="text-xs md:text-sm font-bold text-foreground leading-snug">{k.nama}</h3>
                        <span className={cn('inline-flex items-center text-[9px] font-bold px-1.5 py-0.5 rounded-md border mt-1', kat.color)}>
                          {kat.label}
                        </span>
                      </div>
                    </div>
                    <ChevronDown className={cn('w-4 h-4 text-muted-foreground transition-transform', isExpanded && 'rotate-180')} />
                  </div>

                  <p className="text-[11px] md:text-xs text-muted-foreground leading-relaxed mb-3">{k.deskripsi}</p>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-xs">
                      <Phone className="w-3.5 h-3.5 text-muted-foreground flex-shrink-0" />
                      <span className="font-medium text-foreground">{k.telepon}</span>
                      <CopyButton text={k.telepon} />
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      <Mail className="w-3.5 h-3.5 text-muted-foreground flex-shrink-0" />
                      <span className="font-medium text-foreground truncate">{k.email}</span>
                      <CopyButton text={k.email} />
                    </div>
                  </div>

                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="mt-3 pt-3 border-t border-border/30 space-y-2">
                          <div className="flex items-start gap-2 text-xs">
                            <MapPin className="w-3.5 h-3.5 text-muted-foreground flex-shrink-0 mt-0.5" />
                            <span className="text-muted-foreground">{k.alamat}</span>
                          </div>
                          <a
                            href={k.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={e => e.stopPropagation()}
                            className="flex items-center gap-2 text-xs text-primary hover:underline font-medium"
                          >
                            <Globe className="w-3.5 h-3.5 flex-shrink-0" />
                            {k.website.replace('https://', '')}
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </motion.div>
        )}

        {/* TAB: KONTAK DAERAH */}
        {activeTab === 'daerah' && (
          <motion.div
            key="daerah"
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
            className="space-y-4"
          >
            <div className="flex items-center gap-3 flex-wrap">
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
                <select
                  value={selectedProvinsi}
                  onChange={e => setSelectedProvinsi(e.target.value)}
                  className="pl-9 pr-8 py-2 text-xs border border-border rounded-xl bg-white/50 focus:outline-none focus:ring-1 focus:ring-primary appearance-none cursor-pointer font-medium"
                >
                  <option value="all">Semua Provinsi</option>
                  {provinsiList.map(p => (
                    <option key={p} value={p}>{p}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground pointer-events-none" />
              </div>
              <span className="text-[10px] text-muted-foreground">
                Menampilkan {filteredProvinsi.length} kontak
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {filteredProvinsi.map((k, i) => {
                const JenisIcon = jenisIcons[k.jenis] || Building2;
                const isExpanded = expandedCard === k.id;
                return (
                  <div
                    key={k.id}
                    className="floating-card p-4 hover:shadow-xl transition-shadow cursor-pointer group"
                    onClick={() => setExpandedCard(isExpanded ? null : k.id)}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <JenisIcon className="w-4 h-4 text-primary" />
                        </div>
                        <div>
                          <p className="text-[10px] font-bold text-primary uppercase tracking-wider">{k.provinsi}</p>
                          <h3 className="text-[11px] md:text-xs font-bold text-foreground leading-snug">{k.instansi}</h3>
                        </div>
                      </div>
                      <span className="text-[9px] font-semibold px-2 py-0.5 rounded-md bg-muted/50 text-muted-foreground whitespace-nowrap">
                        {k.jenis}
                      </span>
                    </div>

                    <div className="space-y-1.5 mt-3">
                      <div className="flex items-center gap-2 text-[11px]">
                        <Phone className="w-3 h-3 text-muted-foreground flex-shrink-0" />
                        <span className="font-medium text-foreground">{k.telepon}</span>
                        <CopyButton text={k.telepon} />
                      </div>
                      <div className="flex items-center gap-2 text-[11px]">
                        <Mail className="w-3 h-3 text-muted-foreground flex-shrink-0" />
                        <span className="font-medium text-foreground truncate">{k.email}</span>
                        <CopyButton text={k.email} />
                      </div>
                    </div>

                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="mt-3 pt-3 border-t border-border/30 space-y-1.5">
                            <div className="flex items-start gap-2 text-[11px]">
                              <MapPin className="w-3 h-3 text-muted-foreground flex-shrink-0 mt-0.5" />
                              <span className="text-muted-foreground">{k.alamat}</span>
                            </div>
                            <a
                              href={k.website}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={e => e.stopPropagation()}
                              className="flex items-center gap-2 text-[11px] text-primary hover:underline font-medium"
                            >
                              <Globe className="w-3 h-3 flex-shrink-0" />
                              {k.website.replace('https://', '')}
                              <ExternalLink className="w-2.5 h-2.5" />
                            </a>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>

            {filteredProvinsi.length === 0 && (
              <div className="floating-card p-8 text-center">
                <Search className="w-8 h-8 text-muted-foreground mx-auto mb-3" />
                <p className="text-sm font-medium text-muted-foreground">Tidak ada kontak ditemukan</p>
                <p className="text-xs text-muted-foreground mt-1">Coba ubah filter provinsi atau kata kunci pencarian</p>
              </div>
            )}
          </motion.div>
        )}

        {/* TAB: KANAL ONLINE — ✅ sekarang sudah difilter */}
        {activeTab === 'online' && (
          <motion.div
            key="online"
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            {filteredOnline.length === 0 ? (
              <div className="col-span-2 floating-card p-8 text-center">
                <Search className="w-8 h-8 text-muted-foreground mx-auto mb-3" />
                <p className="text-sm font-medium text-muted-foreground">Tidak ada kanal ditemukan</p>
                <p className="text-xs text-muted-foreground mt-1">Coba ubah kata kunci pencarian</p>
              </div>
            ) : filteredOnline.map((k, i) => {
              const IconComp = k.icon === 'globe' ? Globe : k.icon === 'smartphone' ? Smartphone : PhoneCall;
              return (
                <div
                  key={k.id}
                  className="floating-card p-5 md:p-6 hover:shadow-xl transition-shadow group flex flex-col"
                >
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl overflow-hidden flex-shrink-0 border border-border/40 bg-white">
                      {k.logo
                        ? <img src={k.logo} alt={k.nama} className="w-full h-full object-cover" />
                        : <div className="w-full h-full flex items-center justify-center bg-primary/10"><IconComp className="w-5 h-5 text-primary" /></div>
                      }
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-bold text-foreground leading-snug">{k.nama}</h3>
                      <div className="flex items-center gap-1.5 mt-1 flex-wrap">
                        {k.kategoriLabel && (
                          <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-md border bg-primary/5 text-primary border-primary/20">
                            {k.kategoriLabel}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <p className="text-[11px] md:text-xs text-muted-foreground leading-relaxed mb-3">{k.deskripsi}</p>

                  {(k.telepon || k.whatsapp || k.email || k.sms) && (
                    <div className="space-y-1.5 mb-3 pt-3 border-t border-border/30">
                      {k.telepon && (
                        <div className="flex items-center gap-2 text-xs">
                          <Phone className="w-3.5 h-3.5 text-muted-foreground flex-shrink-0" />
                          <span className="font-medium text-foreground">{k.telepon}</span>
                          <CopyButton text={k.telepon} />
                        </div>
                      )}
                      {k.sms && (
                        <div className="flex items-center gap-2 text-xs">
                          <Smartphone className="w-3.5 h-3.5 text-muted-foreground flex-shrink-0" />
                          <span className="font-medium text-foreground">SMS: {k.sms}</span>
                          <CopyButton text={k.sms} />
                        </div>
                      )}
                      {k.whatsapp && (
                        <div className="flex items-center gap-2 text-xs">
                          <PhoneCall className="w-3.5 h-3.5 text-muted-foreground flex-shrink-0" />
                          <span className="font-medium text-foreground">WA: {k.whatsapp}</span>
                          <CopyButton text={k.whatsapp} />
                        </div>
                      )}
                      {k.email && (
                        <div className="flex items-center gap-2 text-xs">
                          <Mail className="w-3.5 h-3.5 text-muted-foreground flex-shrink-0" />
                          <span className="font-medium text-foreground truncate">{k.email}</span>
                          <CopyButton text={k.email} />
                        </div>
                      )}
                    </div>
                  )}

                  <a
                    href={k.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full py-2.5 bg-foreground text-white rounded-xl text-xs font-bold hover:bg-black transition-colors group-hover:shadow-lg mt-auto"
                  >
                    Kunjungi <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}