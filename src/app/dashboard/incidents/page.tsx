'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, Filter, Download, Calendar, Eye,
  MessageSquare, History, FileText, MapPin, X
} from 'lucide-react';
import { recentIncidents, Incident } from '@/lib/dummy-data';
import { cn } from '@/lib/utils';
import { useSearch } from '@/lib/search-context';

export default function IncidentExplorerPage() {
  const [selectedIncident, setSelectedIncident] = useState<Incident | null>(null);
  const { value: globalSearch } = useSearch();
  const [localSearch, setLocalSearch] = useState('');

  const searchTerm = localSearch || globalSearch;

  const filtered = recentIncidents.filter(inc =>
    !searchTerm ||
    inc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    inc.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    inc.province.toLowerCase().includes(searchTerm.toLowerCase()) ||
    inc.vendor.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-4 md:space-y-6 animate-in fade-in duration-700">
      {/* Filters */}
      <div className="glass p-3 md:p-4 rounded-2xl flex flex-wrap items-center gap-2 md:gap-4 border-white/40 shadow-sm">
        <div className="relative flex-1 min-w-[150px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Filter insiden..."
            value={localSearch}
            onChange={e => setLocalSearch(e.target.value)}
            className="w-full bg-white/50 border border-border/50 rounded-xl py-2 pl-10 pr-4 text-sm outline-none focus:ring-2 focus:ring-primary/20 transition-all"
          />
        </div>
        <button className="flex items-center gap-2 px-3 md:px-4 py-2 bg-white/50 border border-border/50 rounded-xl text-xs md:text-sm font-semibold hover:bg-white transition-all">
          <Filter className="w-3.5 h-3.5" /> Filter
        </button>
        <button className="flex items-center gap-2 px-3 md:px-4 py-2 bg-white/50 border border-border/50 rounded-xl text-xs md:text-sm font-semibold hover:bg-white transition-all">
          <Calendar className="w-3.5 h-3.5" /> 30 Hari
        </button>
        <div className="flex-1 hidden md:block" />
        <button className="flex items-center gap-2 px-3 md:px-4 py-2 bg-foreground text-white rounded-xl text-xs md:text-sm font-semibold hover:bg-black transition-all ml-auto sm:ml-0">
          <Download className="w-3.5 h-3.5" /> <span className="hidden sm:inline">Ekspor</span>
        </button>
      </div>

      {/* Table */}
      <div className="floating-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left min-w-[560px]">
            <thead>
              <tr className="bg-primary/5 text-[10px] font-bold text-muted-foreground uppercase tracking-widest border-b border-border/50">
                <th className="px-4 md:px-6 py-3 md:py-4">Status &amp; Judul</th>
                <th className="px-4 md:px-6 py-3 md:py-4">Lokasi</th>
                <th className="px-4 md:px-6 py-3 md:py-4">Keparahan</th>
                <th className="px-4 md:px-6 py-3 md:py-4 hidden md:table-cell">Jenis</th>
                <th className="px-4 md:px-6 py-3 md:py-4 hidden lg:table-cell">Tanggal</th>
                <th className="px-4 md:px-6 py-3 md:py-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-10 text-center text-sm text-muted-foreground">
                    Tidak ada insiden yang cocok dengan pencarian
                  </td>
                </tr>
              ) : (
                filtered.map((incident) => (
                  <tr
                    key={incident.id}
                    className="group hover:bg-primary/5 transition-colors cursor-pointer"
                    onClick={() => setSelectedIncident(incident)}
                  >
                    <td className="px-4 md:px-6 py-3 md:py-4">
                      <div className="flex items-center gap-2 md:gap-3">
                        <div className={cn(
                          "w-2 h-2 rounded-full flex-shrink-0",
                          incident.status === 'Investigating' ? "bg-amber-500" :
                          incident.status === 'Resolved' ? "bg-green-500" : "bg-red-500"
                        )} />
                        <div>
                          <p className="text-xs md:text-sm font-bold text-foreground group-hover:text-primary transition-colors leading-snug">{incident.title}</p>
                          <p className="text-[10px] text-muted-foreground">ID: {incident.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 md:px-6 py-3 md:py-4 text-xs md:text-sm font-medium text-foreground">
                      {incident.location}, {incident.province}
                    </td>
                    <td className="px-4 md:px-6 py-3 md:py-4">
                      <span className={cn(
                        "px-2 py-0.5 rounded text-[10px] font-bold whitespace-nowrap",
                        incident.severity === 'Critical' ? "bg-red-100 text-red-600" :
                        incident.severity === 'High' ? "bg-red-50 text-red-500" : "bg-blue-100 text-blue-600"
                      )}>
                        {incident.severity === 'Critical' ? 'KRITIS' :
                         incident.severity === 'High' ? 'TINGGI' : 'SEDANG'}
                      </span>
                    </td>
                    <td className="px-4 md:px-6 py-3 md:py-4 text-xs font-semibold text-muted-foreground hidden md:table-cell">
                      {incident.type}
                    </td>
                    <td className="px-4 md:px-6 py-3 md:py-4 text-xs text-muted-foreground hidden lg:table-cell">
                      {new Date(incident.date).toLocaleDateString('id-ID')}
                    </td>
                    <td className="px-4 md:px-6 py-3 md:py-4 text-right">
                      <button className="p-1.5 md:p-2 hover:bg-white rounded-lg transition-colors">
                        <Eye className="w-4 h-4 text-muted-foreground" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedIncident && (
          <div className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/20 backdrop-blur-sm"
              onClick={() => setSelectedIncident(null)}
            />
            <motion.div
              initial={{ y: '100%', opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: '100%', opacity: 0 }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="relative w-full sm:max-w-2xl bg-white shadow-2xl overflow-hidden max-h-[92dvh] flex flex-col"
              style={{ borderRadius: '24px 24px 0 0' }}
            >
              <div className="flex justify-center pt-3 pb-1 sm:hidden">
                <div className="w-10 h-1 rounded-full bg-gray-300" />
              </div>

              <div className="h-36 md:h-48 bg-primary relative p-5 md:p-8 flex-shrink-0">
                <button
                  onClick={() => setSelectedIncident(null)}
                  className="absolute top-4 right-4 p-2 bg-white/20 hover:bg-white/40 rounded-full transition-colors text-white"
                >
                  <X className="w-4 h-4" />
                </button>
                <div className="mt-4 md:mt-8">
                  <span className="px-3 py-1 bg-white/20 rounded-full text-[10px] font-bold text-white uppercase tracking-widest border border-white/30">
                    {selectedIncident.status === 'Investigating' ? 'Investigasi' :
                     selectedIncident.status === 'Resolved' ? 'Selesai' :
                     selectedIncident.status === 'Escalated' ? 'Eskalasi' : selectedIncident.status}
                  </span>
                  <h2 className="text-lg md:text-2xl font-bold text-white mt-2 leading-snug">{selectedIncident.title}</h2>
                  <div className="flex items-center gap-2 text-white/80 text-xs mt-1">
                    <MapPin className="w-3 h-3" />
                    {selectedIncident.location}, {selectedIncident.province}
                  </div>
                </div>
              </div>

              <div className="overflow-y-auto flex-1">
                <div className="p-5 md:p-8 grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
                  <div className="sm:col-span-2 space-y-6 md:space-y-8">
                    <div>
                      <h3 className="text-sm font-bold text-foreground mb-2 md:mb-3 flex items-center gap-2">
                        <FileText className="w-4 h-4 text-primary" /> Ringkasan Insiden
                      </h3>
                      <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
                        Laporan diterima melalui platform monitoring pada {new Date(selectedIncident.date).toLocaleString('id-ID')}.
                        Insiden melibatkan {selectedIncident.victims} korban dengan status {selectedIncident.status}.
                        Tim investigasi lapangan telah dikerahkan untuk melakukan verifikasi.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-sm font-bold text-foreground mb-3 md:mb-4 flex items-center gap-2">
                        <History className="w-4 h-4 text-primary" /> Lini Masa
                      </h3>
                      <div className="space-y-4 relative before:absolute before:left-2 before:top-2 before:bottom-2 before:w-[1px] before:bg-border">
                        <div className="relative pl-6">
                          <div className="absolute left-1 top-1.5 w-2 h-2 rounded-full bg-primary" />
                          <p className="text-xs font-bold text-foreground">Insiden Dilaporkan</p>
                          <p className="text-[10px] text-muted-foreground">Hari ini, 10:30 AM</p>
                        </div>
                        <div className="relative pl-6">
                          <div className="absolute left-1 top-1.5 w-2 h-2 rounded-full bg-border" />
                          <p className="text-xs font-bold text-muted-foreground">Tim Lapangan Dikerahkan</p>
                          <p className="text-[10px] text-muted-foreground">Hari ini, 11:15 AM</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4 md:space-y-6">
                    <div className="p-3 md:p-4 bg-primary/5 rounded-2xl border border-primary/10">
                      <p className="text-[10px] font-bold text-muted-foreground uppercase mb-2 md:mb-3 tracking-widest">Metadata</p>
                      <div className="space-y-2 md:space-y-3">
                        <div>
                          <p className="text-[10px] text-muted-foreground">Keparahan</p>
                          <p className="text-xs font-bold text-red-500">{selectedIncident.severity === 'Critical' ? 'KRITIS' : 'TINGGI'}</p>
                        </div>
                        <div>
                          <p className="text-[10px] text-muted-foreground">Korban</p>
                          <p className="text-xs font-bold text-foreground">{selectedIncident.victims}</p>
                        </div>
                        <div>
                          <p className="text-[10px] text-muted-foreground">Vendor</p>
                          <p className="text-xs font-bold text-foreground truncate">{selectedIncident.vendor}</p>
                        </div>
                      </div>
                    </div>

                    <button className="w-full py-2.5 md:py-3 bg-foreground text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 hover:bg-black transition-all">
                      Eskalasi Tugas <MessageSquare className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}