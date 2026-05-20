'use client';

import Link from 'next/link';
import { use } from 'react';
import { CheckCircle2, Copy, Check, ArrowRight, LayoutDashboard, Megaphone } from 'lucide-react';
import { useState } from 'react';

export default function SuksesPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(id);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#f5f5f0] flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md">
        {/* Success card */}
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
          <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-8 text-center">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-black text-white mb-1">Laporan Diterima!</h1>
            <p className="text-white/80 text-sm">Terima kasih telah melaporkan</p>
          </div>

          <div className="p-6">
            <p className="text-sm text-gray-500 text-center mb-4">ID Pelacakan Laporan Anda</p>

            <div
              onClick={handleCopy}
              className="group relative flex items-center justify-between bg-[#fff8f7] border-2 border-dashed border-[#FF4B3A]/30 rounded-2xl p-4 cursor-pointer hover:border-[#FF4B3A]/60 transition-colors mb-6"
            >
              <span className="font-mono font-black text-2xl text-[#FF4B3A] tracking-wider">{id}</span>
              <button className="p-2 rounded-lg bg-[#FF4B3A]/10 text-[#FF4B3A] group-hover:bg-[#FF4B3A]/20 transition-colors">
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>

            <div className="bg-gray-50 rounded-xl p-4 mb-6 text-sm text-gray-600 space-y-2">
              <p className="font-semibold text-gray-700">Apa yang terjadi selanjutnya?</p>
              <ul className="space-y-1.5 text-xs">
                <li className="flex items-start gap-2"><span className="text-[#FF4B3A] mt-0.5">→</span> Sistem AI memverifikasi dan mengklasifikasi laporan dalam hitungan menit</li>
                <li className="flex items-start gap-2"><span className="text-[#FF4B3A] mt-0.5">→</span> Jika ada laporan serupa dari area yang sama, laporan dikelompokkan menjadi satu insiden</li>
                <li className="flex items-start gap-2"><span className="text-[#FF4B3A] mt-0.5">→</span> Laporan prioritas tinggi diteruskan ke pemangku kepentingan terkait</li>
              </ul>
            </div>

            <div className="flex flex-col gap-3">
              <Link href="/dashboard/kita-lapor">
                <button className="w-full flex items-center justify-center gap-2 py-3 bg-[#FF4B3A] text-white font-bold rounded-xl hover:bg-[#e03f31] transition-all text-sm">
                  <LayoutDashboard className="w-4 h-4" />
                  Lihat Semua Laporan
                </button>
              </Link>
              <Link href="/kita-lapor/buat">
                <button className="w-full flex items-center justify-center gap-2 py-3 bg-gray-100 text-gray-700 font-bold rounded-xl hover:bg-gray-200 transition-all text-sm">
                  <Megaphone className="w-4 h-4" />
                  Lapor Kejadian Lain
                  <ArrowRight className="w-3 h-3" />
                </button>
              </Link>
            </div>
          </div>
        </div>

        <p className="text-center text-xs text-gray-400 mt-4">
          Simpan ID pelacakan di atas sebagai referensi laporan Anda.
        </p>
      </div>
    </div>
  );
}
