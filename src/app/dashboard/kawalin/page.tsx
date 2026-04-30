'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Video, ExternalLink, X, MapPin, RefreshCw, WifiOff, Maximize2, ChevronDown, Lock } from 'lucide-react';
import { cn } from '@/lib/utils';

const BASE_URL = 'https://stream.kuduskab.go.id';

type CameraFeed = {
  name: string;
  uuid: string;
};

const KUDUS_CAMERAS: CameraFeed[] = [
  { name: 'SPPG Bae Gondangmanis', uuid: 'b107e246-9adc-4d1a-b2b0-eb4624b502d7' },
  { name: 'SPPG Bae Gondangmanis 2', uuid: 'b6ecdbd6-4b2c-4fd1-a51e-45001402ea1a' },
  { name: 'SPPG Kirig Mejobo', uuid: '67670b26-c298-4296-a5ed-617f2db87e3c' },
  { name: 'SPPG Dawe Tergo', uuid: 'c5100243-e434-476e-ac6a-d49c5d00ab47' },
  { name: 'SPPG Kemala Bhayangkari 2', uuid: '32bedd28-d54e-4661-8882-0a53ca399f28' },
  { name: 'SPPG Papringan 01', uuid: 'a6e0dfcf-cb12-4ffa-85eb-ce394a954604' },
  { name: 'SPPG Dersalam', uuid: '32f200a8-9c57-4d9c-906f-86fb88986d39' },
  { name: 'SPPG Margorejo 01', uuid: '707d656a-7fb3-4b82-85dc-956598ef8308' },
  { name: 'SPPG Blimbing Kidul', uuid: '4bd9eb3e-006b-49db-bedc-a07dd2d6e2a6' },
  { name: 'SPPG Samirejo Dawe', uuid: '3f4f5053-b7ec-42fa-ae48-a2934728689d' },
  { name: 'SPPG Singocandi', uuid: '86f403fc-15d0-4568-b2cc-fdd8d7984283' },
  { name: 'SPPG Getas Pejaten (Polres 3)', uuid: 'd7ce1337-5131-43a1-bf06-5535259db1c7' },
];

type District = { name: string; active: boolean; cameras: CameraFeed[] };
type Province = { name: string; active: boolean; districts: District[] };

const PROVINCES: Province[] = [
  {
    name: 'Jawa Tengah',
    active: true,
    districts: [
      { name: 'Kudus', active: true, cameras: KUDUS_CAMERAS },
      { name: 'Kota Semarang', active: false, cameras: [] },
      { name: 'Kab. Semarang', active: false, cameras: [] },
      { name: 'Demak', active: false, cameras: [] },
      { name: 'Pati', active: false, cameras: [] },
      { name: 'Jepara', active: false, cameras: [] },
      { name: 'Rembang', active: false, cameras: [] },
      { name: 'Blora', active: false, cameras: [] },
      { name: 'Grobogan', active: false, cameras: [] },
      { name: 'Kendal', active: false, cameras: [] },
      { name: 'Batang', active: false, cameras: [] },
      { name: 'Kota Pekalongan', active: false, cameras: [] },
      { name: 'Kab. Pekalongan', active: false, cameras: [] },
      { name: 'Pemalang', active: false, cameras: [] },
      { name: 'Kota Tegal', active: false, cameras: [] },
      { name: 'Kab. Tegal', active: false, cameras: [] },
      { name: 'Brebes', active: false, cameras: [] },
      { name: 'Boyolali', active: false, cameras: [] },
      { name: 'Klaten', active: false, cameras: [] },
      { name: 'Sukoharjo', active: false, cameras: [] },
      { name: 'Wonogiri', active: false, cameras: [] },
      { name: 'Karanganyar', active: false, cameras: [] },
      { name: 'Sragen', active: false, cameras: [] },
      { name: 'Kota Surakarta', active: false, cameras: [] },
      { name: 'Magelang', active: false, cameras: [] },
      { name: 'Purworejo', active: false, cameras: [] },
      { name: 'Wonosobo', active: false, cameras: [] },
      { name: 'Temanggung', active: false, cameras: [] },
      { name: 'Banjarnegara', active: false, cameras: [] },
      { name: 'Purbalingga', active: false, cameras: [] },
      { name: 'Banyumas', active: false, cameras: [] },
      { name: 'Cilacap', active: false, cameras: [] },
      { name: 'Kebumen', active: false, cameras: [] },
    ],
  },
  { name: 'DKI Jakarta', active: false, districts: [] },
  { name: 'Jawa Barat', active: false, districts: [] },
  { name: 'Jawa Timur', active: false, districts: [] },
  { name: 'DI Yogyakarta', active: false, districts: [] },
  { name: 'Banten', active: false, districts: [] },
  { name: 'Bali', active: false, districts: [] },
  { name: 'Sumatera Utara', active: false, districts: [] },
  { name: 'Sumatera Selatan', active: false, districts: [] },
  { name: 'Kalimantan Timur', active: false, districts: [] },
  { name: 'Sulawesi Selatan', active: false, districts: [] },
];

function CameraCard({
  camera,
  onClick,
  timestamp,
  index,
}: {
  camera: CameraFeed;
  onClick: () => void;
  timestamp: number;
  index: number;
}) {
  const [imgError, setImgError] = useState(false);
  const thumbnailUrl = `${BASE_URL}/memfs/${camera.uuid}.jpg?t=${timestamp}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04 }}
      onClick={onClick}
      className="group relative glass rounded-2xl overflow-hidden cursor-pointer hover:ring-1 hover:ring-primary/40 hover:shadow-[0_0_20px_rgba(var(--primary),0.1)] transition-all"
    >
      <div className="relative aspect-video bg-muted overflow-hidden">
        {imgError ? (
          <div className="w-full h-full flex flex-col items-center justify-center gap-2 bg-muted/50">
            <WifiOff className="w-6 h-6 text-muted-foreground/50" />
            <span className="text-xs text-muted-foreground">Tidak tersedia</span>
          </div>
        ) : (
          <img
            src={thumbnailUrl}
            alt={camera.name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            onError={() => setImgError(true)}
          />
        )}

        <div className="absolute top-2 left-2 flex items-center gap-1.5 px-2 py-1 rounded-md bg-black/60 backdrop-blur-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
          <span className="text-[10px] font-bold text-white uppercase tracking-wider">Live</span>
        </div>

        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/25">
          <div className="p-2.5 rounded-full bg-black/50 backdrop-blur-sm">
            <Maximize2 className="w-5 h-5 text-white" />
          </div>
        </div>
      </div>

      <div className="px-3.5 py-3 flex items-center justify-between gap-2">
        <span className="text-sm font-medium text-foreground truncate">{camera.name}</span>
        <div className="shrink-0 flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
          <span className="text-[10px] text-green-600 dark:text-green-500 font-semibold">Online</span>
        </div>
      </div>
    </motion.div>
  );
}

function CameraModal({ camera, onClose }: { camera: CameraFeed; onClose: () => void }) {
  const playerUrl = `${BASE_URL}/playersite_${camera.uuid}.html`;

  useEffect(() => {
    const handler = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 8 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 8 }}
        transition={{ duration: 0.2 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-4xl glass rounded-2xl overflow-hidden shadow-2xl"
      >
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-border/50">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              <span className="text-xs font-bold text-red-500 uppercase tracking-wider">Live</span>
            </div>
            <span className="font-semibold text-foreground">{camera.name}</span>
          </div>
          <div className="flex items-center gap-2">
            <a
              href={playerUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              Buka di Tab Baru
            </a>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="relative aspect-video bg-black">
          <iframe
            src={playerUrl}
            className="w-full h-full border-0"
            allowFullScreen
            title={camera.name}
          />
        </div>

        <div className="px-5 py-2.5 bg-muted/30 border-t border-border/50 flex items-center justify-between">
          <p className="text-xs text-muted-foreground">
            Sumber:{' '}
            <a
              href="https://stream.kuduskab.go.id"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline font-medium"
            >
              stream.kuduskab.go.id
            </a>
            {' '}— Pemerintah Kabupaten Kudus
          </p>
          <span className="text-xs text-muted-foreground">Tekan Esc untuk tutup</span>
        </div>
      </motion.div>
    </motion.div>
  );
}

function useDropdown() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (!open) return;
    const handler = () => setOpen(false);
    document.addEventListener('click', handler);
    return () => document.removeEventListener('click', handler);
  }, [open]);
  return [open, setOpen] as const;
}

export default function KawalinPage() {
  const [selectedCamera, setSelectedCamera] = useState<CameraFeed | null>(null);
  const [selectedProvince, setSelectedProvince] = useState('Jawa Tengah');
  const [selectedDistrict, setSelectedDistrict] = useState('Kudus');
  const [provinceOpen, setProvinceOpen] = useDropdown();
  const [districtOpen, setDistrictOpen] = useDropdown();
  const [timestamp, setTimestamp] = useState(Date.now());
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const interval = setInterval(() => setTimestamp(Date.now()), 10000);
    return () => clearInterval(interval);
  }, []);

  if (!mounted) return <div />;

  const province = PROVINCES.find((p) => p.name === selectedProvince);
  const district = province?.districts.find((d) => d.name === selectedDistrict);

  return (
    <div className="space-y-6 md:space-y-8 animate-in fade-in duration-700 pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground flex items-center gap-3">
            <Video className="w-7 h-7 text-primary" />
            Kawalin
          </h1>
          <p className="text-sm text-muted-foreground mt-1">Pemantauan CCTV SPPG real-time per wilayah</p>
        </div>
        <a
          href="https://stream.kuduskab.go.id"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-xs text-muted-foreground bg-muted/30 border border-border/50 rounded-xl px-4 py-2.5 hover:border-primary/30 hover:text-primary transition-colors w-fit"
        >
          <MapPin className="w-3.5 h-3.5 text-primary" />
          <span>Sumber: stream.kuduskab.go.id</span>
          <span className="text-border">·</span>
          <span>Pemkab Kudus</span>
          <ExternalLink className="w-3 h-3 ml-0.5" />
        </a>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3 flex-wrap">
        {/* Province dropdown */}
        <div className="relative" onClick={(e) => e.stopPropagation()}>
          <div className="flex items-center gap-1.5 mb-1.5">
            <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Provinsi</span>
          </div>
          <button
            onClick={() => setProvinceOpen((v) => !v)}
            className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-muted/30 border border-border/50 hover:border-primary/30 transition-colors text-sm font-semibold text-foreground min-w-[200px]"
          >
            <span className="flex-1 text-left">{selectedProvince}</span>
            <ChevronDown className={cn('w-4 h-4 text-muted-foreground transition-transform duration-200', provinceOpen && 'rotate-180')} />
          </button>
          <AnimatePresence>
            {provinceOpen && (
              <motion.div
                initial={{ opacity: 0, y: -4, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -4, scale: 0.97 }}
                transition={{ duration: 0.15 }}
                className="absolute top-full mt-1.5 left-0 min-w-full w-max z-20 glass rounded-xl border border-border/50 shadow-xl overflow-y-auto max-h-64"
              >
                {PROVINCES.map((p) => (
                  <button
                    key={p.name}
                    disabled={!p.active}
                    onClick={() => {
                      if (!p.active) return;
                      setSelectedProvince(p.name);
                      const firstActive = p.districts.find((d) => d.active);
                      if (firstActive) setSelectedDistrict(firstActive.name);
                      setProvinceOpen(false);
                    }}
                    className={cn(
                      'w-full flex items-center justify-between px-4 py-2.5 text-sm transition-colors',
                      p.active
                        ? selectedProvince === p.name
                          ? 'bg-primary/10 text-primary font-semibold'
                          : 'text-foreground hover:bg-muted/60'
                        : 'text-muted-foreground cursor-not-allowed opacity-50',
                    )}
                  >
                    {p.name}
                    {!p.active && (
                      <span className="flex items-center gap-1 text-[10px] text-muted-foreground ml-4">
                        <Lock className="w-2.5 h-2.5" />
                        Soon
                      </span>
                    )}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Divider */}
        <div className="w-px h-8 bg-border/50 mt-6 hidden sm:block" />

        {/* District dropdown */}
        <div className="relative" onClick={(e) => e.stopPropagation()}>
          <div className="flex items-center gap-1.5 mb-1.5">
            <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Kab / Kota</span>
          </div>
          <button
            onClick={() => setDistrictOpen((v) => !v)}
            className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-muted/30 border border-border/50 hover:border-primary/30 transition-colors text-sm font-semibold text-foreground min-w-[200px]"
          >
            <span className="flex-1 text-left">{selectedDistrict}</span>
            <ChevronDown className={cn('w-4 h-4 text-muted-foreground transition-transform duration-200', districtOpen && 'rotate-180')} />
          </button>
          <AnimatePresence>
            {districtOpen && (
              <motion.div
                initial={{ opacity: 0, y: -4, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -4, scale: 0.97 }}
                transition={{ duration: 0.15 }}
                className="absolute top-full mt-1.5 left-0 min-w-full w-max z-20 glass rounded-xl border border-border/50 shadow-xl overflow-y-auto max-h-64"
              >
                {province?.districts.map((d) => (
                  <button
                    key={d.name}
                    disabled={!d.active}
                    onClick={() => {
                      if (!d.active) return;
                      setSelectedDistrict(d.name);
                      setDistrictOpen(false);
                    }}
                    className={cn(
                      'w-full flex items-center justify-between px-4 py-2.5 text-sm transition-colors',
                      d.active
                        ? selectedDistrict === d.name
                          ? 'bg-primary/10 text-primary font-semibold'
                          : 'text-foreground hover:bg-muted/60'
                        : 'text-muted-foreground cursor-not-allowed opacity-50',
                    )}
                  >
                    {d.name}
                    {!d.active && (
                      <span className="flex items-center gap-1 text-[10px] text-muted-foreground ml-4">
                        <Lock className="w-2.5 h-2.5" />
                        Soon
                      </span>
                    )}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Count + refresh */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          <span className="font-semibold text-foreground">{district?.cameras.length ?? 0} kamera</span> SPPG tersedia di {selectedDistrict}, {selectedProvince}
        </p>
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <RefreshCw className="w-3 h-3 animate-spin [animation-duration:3s]" />
          <span>Thumbnail refresh tiap 10 detik</span>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-5">
        {district?.cameras.map((camera, i) => (
          <CameraCard
            key={camera.uuid}
            camera={camera}
            onClick={() => setSelectedCamera(camera)}
            timestamp={timestamp}
            index={i}
          />
        ))}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedCamera && (
          <CameraModal
            key="camera-modal"
            camera={selectedCamera}
            onClose={() => setSelectedCamera(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
