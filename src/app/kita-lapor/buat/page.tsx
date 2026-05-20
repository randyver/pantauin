'use client';

import React, { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  ChevronLeft, ChevronRight, Loader2, Upload, X,
  User, MapPin, AlertTriangle, Camera, Mail, ClipboardList,
  Megaphone,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001';

// ── Types ─────────────────────────────────────────────────────────────────────

interface Province { id: string; name: string; }

interface FormState {
  role: string;
  reporterName: string;
  schoolName: string;
  provinceId: string;
  incidentDate: string;
  incidentTime: string;
  category: string;
  description: string;
  victimCount: number;
  symptoms: string[];
  photoFiles: File[];
  photoUrls: string[];
  email: string;
}

const INITIAL: FormState = {
  role: '',
  reporterName: '',
  schoolName: '',
  provinceId: '',
  incidentDate: '',
  incidentTime: '',
  category: '',
  description: '',
  victimCount: 0,
  symptoms: [],
  photoFiles: [],
  photoUrls: [],
  email: '',
};

// ── Constants ─────────────────────────────────────────────────────────────────

const ROLES = [
  { value: 'siswa',        label: 'Siswa' },
  { value: 'orang_tua',   label: 'Orang Tua' },
  { value: 'guru',         label: 'Guru' },
  { value: 'petugas_sppg', label: 'Petugas SPPG' },
  { value: 'anonim',       label: 'Anonim' },
];

const CATEGORIES = [
  { value: 'keracunan',        label: 'Keracunan', desc: 'Ada gejala keracunan setelah makan' },
  { value: 'makanan_basi',     label: 'Makanan Basi', desc: 'Makanan berbau, berjamur, atau sudah rusak' },
  { value: 'tidak_higienis',   label: 'Tidak Higienis', desc: 'Kondisi penyajian kotor atau tidak layak' },
  { value: 'porsi_tidak_layak', label: 'Porsi Tidak Sesuai', desc: 'Jumlah atau kualitas tidak sesuai standar' },
  { value: 'lainnya',          label: 'Lainnya', desc: 'Masalah lain yang tidak tercantung' },
];

const SYMPTOMS = [
  'Mual', 'Muntah', 'Diare', 'Pusing', 'Lemas', 'Demam', 'Nyeri Perut', 'Sakit Kepala',
];

const STEPS = [
  { label: 'Identitas', icon: User },
  { label: 'Lokasi', icon: MapPin },
  { label: 'Kronologi', icon: AlertTriangle },
  { label: 'Dampak', icon: Camera },
  { label: 'Kontak', icon: Mail },
  { label: 'Review', icon: ClipboardList },
];

const CATEGORY_LABELS: Record<string, string> = {
  keracunan: 'Keracunan Makanan', makanan_basi: 'Makanan Basi/Rusak',
  tidak_higienis: 'Tidak Higienis', porsi_tidak_layak: 'Porsi Tidak Sesuai', lainnya: 'Lainnya',
};

// ── Page ─────────────────────────────────────────────────────────────────────

export default function BuatLaporanPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormState>(INITIAL);
  const [provinces, setProvinces] = useState<Province[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [uploadingIdx, setUploadingIdx] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load provinces on mount
  React.useEffect(() => {
    fetch(`${API_URL}/api/provinces`)
      .then(r => r.json())
      .then(j => setProvinces(j.data ?? []))
      .catch(() => {});
  }, []);

  const set = (patch: Partial<FormState>) => setForm(f => ({ ...f, ...patch }));

  const toggleSymptom = (s: string) =>
    set({ symptoms: form.symptoms.includes(s) ? form.symptoms.filter(x => x !== s) : [...form.symptoms, s] });

  const handleFiles = async (files: FileList) => {
    const toUpload = Array.from(files).slice(0, 5 - form.photoFiles.length);
    for (let i = 0; i < toUpload.length; i++) {
      const file = toUpload[i];
      setUploadingIdx(form.photoFiles.length + i);
      set({ photoFiles: [...form.photoFiles, ...toUpload.slice(0, i + 1)] });
      try {
        const fd = new FormData();
        fd.append('file', file);
        const res = await fetch(`${API_URL}/api/citizen-reports/upload`, { method: 'POST', body: fd });
        const json = await res.json();
        if (json.data?.url) {
          set({ photoUrls: [...form.photoUrls, json.data.url] });
        }
      } catch {
        // Upload failed, photo will be excluded
      }
    }
    setUploadingIdx(null);
  };

  const removePhoto = (idx: number) => {
    set({
      photoFiles: form.photoFiles.filter((_, i) => i !== idx),
      photoUrls: form.photoUrls.filter((_, i) => i !== idx),
    });
  };

  const canNext = () => {
    if (step === 0) return !!form.role;
    if (step === 1) return !!form.schoolName.trim() && !!form.incidentDate;
    if (step === 2) return !!form.category && form.description.trim().length >= 10;
    return true;
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    setError(null);
    try {
      const incidentAt = form.incidentDate
        ? new Date(`${form.incidentDate}${form.incidentTime ? 'T' + form.incidentTime : 'T00:00'}`).toISOString()
        : null;

      const res = await fetch(`${API_URL}/api/citizen-reports`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          role: form.role,
          reporterName: form.role === 'anonim' ? null : form.reporterName || null,
          email: form.email || null,
          provinceId: form.provinceId || null,
          schoolName: form.schoolName,
          incidentAt,
          category: form.category,
          description: form.description,
          victimCount: form.victimCount,
          symptoms: form.symptoms,
          photoUrls: form.photoUrls,
        }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || 'Gagal mengirim laporan');
      router.push(`/kita-lapor/sukses/${json.data.trackingId}`);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Terjadi kesalahan');
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f5f0] py-8 px-4">
      {/* Header */}
      <div className="max-w-xl mx-auto mb-6">
        <Link href="/kita-lapor" className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 transition-colors mb-4">
          <ChevronLeft className="w-4 h-4" /> Kembali
        </Link>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-9 h-9 rounded-xl bg-[#FF4B3A] flex items-center justify-center">
            <Megaphone className="w-4 h-4 text-white" />
          </div>
          <div>
            <h1 className="font-black text-[#1a1a1a] text-lg leading-tight">Buat Laporan</h1>
            <p className="text-xs text-gray-400">Langkah {step + 1} dari {STEPS.length}</p>
          </div>
        </div>

        {/* Step indicator */}
        <div className="flex items-center gap-1 mb-6">
          {STEPS.map((s, i) => (
            <div key={s.label} className="flex-1 flex flex-col items-center gap-1">
              <div className={cn(
                'w-full h-1.5 rounded-full transition-all',
                i < step ? 'bg-[#FF4B3A]' : i === step ? 'bg-[#FF4B3A]/60' : 'bg-gray-200'
              )} />
              <span className={cn('text-[9px] font-bold uppercase tracking-wider', i <= step ? 'text-[#FF4B3A]' : 'text-gray-300')}>
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Card */}
      <div className="max-w-xl mx-auto bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden">
        <div className="p-6 md:p-8">
          {/* ── Step 0: Identitas ── */}
          {step === 0 && (
            <div className="space-y-5">
              <div>
                <h2 className="text-xl font-black text-[#1a1a1a] mb-1">Siapa Kamu?</h2>
                <p className="text-sm text-gray-400">Pilih peran yang paling sesuai</p>
              </div>
              <div className="grid grid-cols-1 gap-2">
                {ROLES.map((r) => (
                  <button
                    key={r.value}
                    onClick={() => set({ role: r.value })}
                    className={cn(
                      'flex items-center gap-3 p-4 rounded-2xl border-2 text-left transition-all',
                      form.role === r.value
                        ? 'border-[#FF4B3A] bg-[#FF4B3A]/5'
                        : 'border-gray-100 hover:border-gray-200'
                    )}
                  >
                    <div>
                      <p className={cn('font-bold text-sm', form.role === r.value ? 'text-[#FF4B3A]' : 'text-[#1a1a1a]')}>{r.label}</p>
                      {r.value === 'anonim' && <p className="text-xs text-gray-400">Nama & kontak tidak diperlukan</p>}
                    </div>
                    <div className={cn(
                      'ml-auto w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0',
                      form.role === r.value ? 'border-[#FF4B3A] bg-[#FF4B3A]' : 'border-gray-200'
                    )}>
                      {form.role === r.value && <div className="w-2 h-2 rounded-full bg-white" />}
                    </div>
                  </button>
                ))}
              </div>

              {form.role && form.role !== 'anonim' && (
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                    Nama <span className="font-normal text-gray-400">(opsional)</span>
                  </label>
                  <input
                    type="text"
                    value={form.reporterName}
                    onChange={e => set({ reporterName: e.target.value })}
                    placeholder="Nama Anda"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#FF4B3A]/30 focus:border-[#FF4B3A] text-sm"
                  />
                </div>
              )}
            </div>
          )}

          {/* ── Step 1: Lokasi & Waktu ── */}
          {step === 1 && (
            <div className="space-y-5">
              <div>
                <h2 className="text-xl font-black text-[#1a1a1a] mb-1">Dimana & Kapan?</h2>
                <p className="text-sm text-gray-400">Informasi lokasi dan waktu kejadian</p>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Nama Sekolah *</label>
                <input
                  type="text"
                  value={form.schoolName}
                  onChange={e => set({ schoolName: e.target.value })}
                  placeholder="Contoh: SDN Sukamaju 01"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#FF4B3A]/30 focus:border-[#FF4B3A] text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Provinsi</label>
                <select
                  value={form.provinceId}
                  onChange={e => set({ provinceId: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#FF4B3A]/30 focus:border-[#FF4B3A] text-sm bg-white"
                >
                  <option value="">Pilih Provinsi</option>
                  {provinces.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Tanggal Kejadian *</label>
                  <input
                    type="date"
                    value={form.incidentDate}
                    max={new Date().toISOString().split('T')[0]}
                    onChange={e => set({ incidentDate: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#FF4B3A]/30 focus:border-[#FF4B3A] text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Waktu <span className="font-normal text-gray-400">(opsional)</span></label>
                  <input
                    type="time"
                    value={form.incidentTime}
                    onChange={e => set({ incidentTime: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#FF4B3A]/30 focus:border-[#FF4B3A] text-sm"
                  />
                </div>
              </div>
            </div>
          )}

          {/* ── Step 2: Kronologi ── */}
          {step === 2 && (
            <div className="space-y-5">
              <div>
                <h2 className="text-xl font-black text-[#1a1a1a] mb-1">Apa yang Terjadi?</h2>
                <p className="text-sm text-gray-400">Pilih kategori dan ceritakan kejadiannya</p>
              </div>

              <div className="grid grid-cols-1 gap-2">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.value}
                    onClick={() => set({ category: cat.value })}
                    className={cn(
                      'flex items-center gap-3 p-3.5 rounded-xl border-2 text-left transition-all',
                      form.category === cat.value
                        ? 'border-[#FF4B3A] bg-[#FF4B3A]/5'
                        : 'border-gray-100 hover:border-gray-200'
                    )}
                  >
                    <div className="flex-1 min-w-0">
                      <p className={cn('font-bold text-sm', form.category === cat.value ? 'text-[#FF4B3A]' : 'text-[#1a1a1a]')}>{cat.label}</p>
                      <p className="text-xs text-gray-400 truncate">{cat.desc}</p>
                    </div>
                    <div className={cn(
                      'w-4 h-4 rounded-full border-2 shrink-0',
                      form.category === cat.value ? 'border-[#FF4B3A] bg-[#FF4B3A]' : 'border-gray-200'
                    )} />
                  </button>
                ))}
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                  Deskripsi Kejadian * <span className="font-normal text-gray-400">({form.description.trim().length} karakter)</span>
                </label>
                <textarea
                  value={form.description}
                  onChange={e => set({ description: e.target.value })}
                  rows={4}
                  placeholder="Ceritakan secara rinci apa yang terjadi — kapan mulai terasa, seperti apa kondisi makanannya, apa yang dikeluhkan siswa..."
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#FF4B3A]/30 focus:border-[#FF4B3A] text-sm resize-none"
                />
                {form.description.trim().length > 0 && form.description.trim().length < 10 && (
                  <p className="text-xs text-red-500 mt-1">Deskripsi minimal 10 karakter</p>
                )}
              </div>
            </div>
          )}

          {/* ── Step 3: Dampak & Bukti ── */}
          {step === 3 && (
            <div className="space-y-5">
              <div>
                <h2 className="text-xl font-black text-[#1a1a1a] mb-1">Dampak & Bukti</h2>
                <p className="text-sm text-gray-400">Informasi jumlah terdampak, gejala, dan foto</p>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Jumlah Orang Terdampak</label>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => set({ victimCount: Math.max(0, form.victimCount - 1) })}
                    className="w-10 h-10 rounded-xl bg-gray-100 hover:bg-gray-200 font-bold text-lg transition-colors"
                  >−</button>
                  <input
                    type="number"
                    value={form.victimCount}
                    min={0}
                    onChange={e => set({ victimCount: Math.max(0, Number(e.target.value)) })}
                    className="w-24 text-center px-3 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#FF4B3A]/30 text-sm font-bold"
                  />
                  <button
                    onClick={() => set({ victimCount: form.victimCount + 1 })}
                    className="w-10 h-10 rounded-xl bg-gray-100 hover:bg-gray-200 font-bold text-lg transition-colors"
                  >+</button>
                  <span className="text-sm text-gray-400">orang</span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                  Gejala yang Dialami <span className="font-normal text-gray-400">(pilih semua yang sesuai)</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {SYMPTOMS.map(s => (
                    <button
                      key={s}
                      onClick={() => toggleSymptom(s)}
                      className={cn(
                        'px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all',
                        form.symptoms.includes(s)
                          ? 'bg-[#FF4B3A] text-white border-[#FF4B3A]'
                          : 'bg-gray-50 text-gray-600 border-gray-200 hover:border-[#FF4B3A]/40'
                      )}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                  Foto Bukti <span className="font-normal text-gray-400">(opsional, maks 5 foto)</span>
                </label>

                {form.photoFiles.length > 0 && (
                  <div className="grid grid-cols-3 gap-2 mb-3">
                    {form.photoFiles.map((file, i) => (
                      <div key={i} className="relative aspect-square">
                        <img
                          src={URL.createObjectURL(file)}
                          alt=""
                          className="w-full h-full object-cover rounded-xl"
                        />
                        {uploadingIdx === i ? (
                          <div className="absolute inset-0 bg-black/40 rounded-xl flex items-center justify-center">
                            <Loader2 className="w-4 h-4 text-white animate-spin" />
                          </div>
                        ) : (
                          <button
                            onClick={() => removePhoto(i)}
                            className="absolute top-1 right-1 w-5 h-5 bg-black/60 rounded-full flex items-center justify-center"
                          >
                            <X className="w-3 h-3 text-white" />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {form.photoFiles.length < 5 && (
                  <>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      multiple
                      className="hidden"
                      onChange={e => e.target.files && handleFiles(e.target.files)}
                    />
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="w-full py-8 border-2 border-dashed border-gray-200 rounded-xl flex flex-col items-center gap-2 hover:border-[#FF4B3A]/40 hover:bg-[#FF4B3A]/2 transition-all"
                    >
                      <Upload className="w-6 h-6 text-gray-300" />
                      <span className="text-xs text-gray-400">Klik untuk pilih foto</span>
                      <span className="text-[10px] text-gray-300">JPG, PNG, WEBP · maks 10MB per foto</span>
                    </button>
                  </>
                )}
              </div>
            </div>
          )}

          {/* ── Step 4: Kontak ── */}
          {step === 4 && (
            <div className="space-y-5">
              <div>
                <h2 className="text-xl font-black text-[#1a1a1a] mb-1">Kontak</h2>
                <p className="text-sm text-gray-400">Opsional — untuk menerima konfirmasi via email</p>
              </div>

              <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 text-sm text-blue-700">
                <p className="font-semibold mb-1">Mengapa opsional?</p>
                <p className="text-xs leading-relaxed">Laporan kamu akan tetap diproses tanpa email. Jika diisi, kami akan mengirim ID pelacakan ke email untuk referensi.</p>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Email <span className="font-normal text-gray-400">(opsional)</span></label>
                <input
                  type="email"
                  value={form.email}
                  onChange={e => set({ email: e.target.value })}
                  placeholder="email@contoh.com"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#FF4B3A]/30 focus:border-[#FF4B3A] text-sm"
                />
              </div>

              {form.role === 'anonim' && (
                <div className="bg-gray-50 rounded-xl p-4 text-xs text-gray-500">
                  Anda memilih anonim. Identitas Anda tidak akan tersimpan dalam sistem kami.
                </div>
              )}
            </div>
          )}

          {/* ── Step 5: Review ── */}
          {step === 5 && (
            <div className="space-y-5">
              <div>
                <h2 className="text-xl font-black text-[#1a1a1a] mb-1">Review Laporan</h2>
                <p className="text-sm text-gray-400">Periksa kembali sebelum mengirim</p>
              </div>

              <div className="space-y-3 text-sm">
                {[
                  { label: 'Pelapor', value: form.role === 'anonim' ? 'Anonim' : `${ROLES.find(r => r.value === form.role)?.label ?? ''}${form.reporterName ? ` · ${form.reporterName}` : ''}` },
                  { label: 'Sekolah', value: form.schoolName },
                  { label: 'Provinsi', value: provinces.find(p => p.id === form.provinceId)?.name || '—' },
                  { label: 'Tanggal', value: form.incidentDate ? new Date(form.incidentDate + 'T12:00').toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }) : '—' },
                  { label: 'Kategori', value: CATEGORY_LABELS[form.category] ?? form.category },
                  { label: 'Terdampak', value: `${form.victimCount} orang` },
                ].map(item => (
                  <div key={item.label} className="flex gap-3 py-2.5 border-b border-gray-50">
                    <span className="text-gray-400 w-24 shrink-0">{item.label}</span>
                    <span className="font-semibold text-[#1a1a1a] flex-1">{item.value}</span>
                  </div>
                ))}

                {form.symptoms.length > 0 && (
                  <div className="flex gap-3 py-2.5 border-b border-gray-50">
                    <span className="text-gray-400 w-24 shrink-0">Gejala</span>
                    <div className="flex flex-wrap gap-1 flex-1">
                      {form.symptoms.map(s => (
                        <span key={s} className="px-2 py-0.5 bg-red-50 text-red-600 text-xs rounded-md font-medium">{s}</span>
                      ))}
                    </div>
                  </div>
                )}

                <div className="py-2.5 border-b border-gray-50">
                  <p className="text-gray-400 mb-1">Deskripsi</p>
                  <p className="text-[#1a1a1a] text-xs leading-relaxed bg-gray-50 rounded-xl p-3">{form.description}</p>
                </div>

                {form.photoFiles.length > 0 && (
                  <div className="py-2.5">
                    <p className="text-gray-400 mb-2">Foto ({form.photoFiles.length})</p>
                    <div className="flex gap-2">
                      {form.photoFiles.slice(0, 3).map((f, i) => (
                        <img key={i} src={URL.createObjectURL(f)} className="w-14 h-14 rounded-lg object-cover" alt="" />
                      ))}
                      {form.photoFiles.length > 3 && (
                        <div className="w-14 h-14 rounded-lg bg-gray-100 flex items-center justify-center text-xs text-gray-400 font-bold">+{form.photoFiles.length - 3}</div>
                      )}
                    </div>
                  </div>
                )}

                {form.email && (
                  <div className="flex gap-3 py-2.5">
                    <span className="text-gray-400 w-24 shrink-0">Email</span>
                    <span className="font-semibold text-[#1a1a1a]">{form.email}</span>
                  </div>
                )}
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-3 text-sm text-red-600">{error}</div>
              )}
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="px-6 pb-6 md:px-8 md:pb-8 flex items-center justify-between gap-3">
          <button
            onClick={() => setStep(s => s - 1)}
            disabled={step === 0}
            className="flex items-center gap-1.5 px-5 py-3 rounded-xl border border-gray-200 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-4 h-4" /> Kembali
          </button>

          {step < STEPS.length - 1 ? (
            <button
              onClick={() => setStep(s => s + 1)}
              disabled={!canNext()}
              className="flex items-center gap-1.5 px-6 py-3 bg-[#FF4B3A] text-white rounded-xl text-sm font-bold hover:bg-[#e03f31] transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow-sm"
            >
              Lanjut <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={submitting || uploadingIdx !== null}
              className="flex items-center gap-2 px-6 py-3 bg-[#FF4B3A] text-white rounded-xl text-sm font-bold hover:bg-[#e03f31] transition-all disabled:opacity-60 shadow-sm"
            >
              {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Megaphone className="w-4 h-4" />}
              {submitting ? 'Mengirim...' : 'Kirim Laporan'}
            </button>
          )}
        </div>
      </div>

      <p className="text-center text-xs text-gray-400 mt-6 max-w-sm mx-auto">
        Data Anda digunakan hanya untuk keperluan monitoring keamanan program MBG dan tidak akan dipublikasikan.
      </p>
    </div>
  );
}
