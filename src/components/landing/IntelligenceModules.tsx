import Image from "next/image";

export default function IntelligenceModules() {
  return (
    <div id="sumber-data" className="relative w-full z-10 px-6 lg:px-[136px] flex flex-col items-center">
      {/* Top Header Section - Centered */}
      <div className="relative w-full flex flex-col items-center text-center mb-12 lg:mb-[80px]">
        <div className="w-full lg:max-w-[800px] pt-0 lg:pt-10 z-10">
          <h2 className="text-[#333333] text-[36px] lg:text-[56px] font-bold font-sf-rounded leading-[1.1] mb-6">
            Memantau setiap sinyal, dari semua arah
          </h2>
          <p className="text-[#333333] text-[16px] lg:text-[18px] font-medium max-w-[550px] mx-auto leading-relaxed opacity-80">
            Bukan hanya keracunan — Pantauin memantau keluhan porsi, mutu gizi, dugaan mark-up harga, keterlambatan distribusi, kemasan, hingga kebersihan dapur SPPG, dari berbagai kanal publik.
          </p>
        </div>
      </div>

      {/* 4 Cards Grid - Responsive layout */}
      <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-[24px] w-full max-w-[1168px] z-10">
        {/* 3D Character Image - Now positioned relative to the grid and BEHIND it */}
        <div className="absolute right-[-20px] lg:right-[-80px] top-[-180px] lg:top-[-330px] w-[250px] lg:w-[400px] h-[250px] lg:h-[400px] z-[-1] pointer-events-none opacity-30 lg:opacity-100">
          <img 
            src="/intelligence/ToyFaces_Tansparent_BG_29(1).png" 
            className="w-full h-full object-contain" 
            alt="Intelligence Character" 
          />
        </div>
        
        {/* Card 1: Twitter */}
        <div className="relative w-full min-h-[180px] lg:h-[210px] bg-[#E9F7BA] rounded-[40px] shadow-[0px_20px_40px_rgba(0,0,0,0.03)] overflow-hidden p-6 lg:p-8 flex items-center gap-6 lg:gap-8">
          <div className="absolute right-[10px] top-[10px] w-[80px] h-[80px] bg-[#FF4B3A] rounded-full -mr-8 -mt-8"></div>
          <div className="w-[60px] lg:w-[80px] h-[60px] lg:h-[80px] flex-shrink-0">
            <img src="/intelligence/x logo.svg" className="w-full h-full object-contain" alt="Twitter" />
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="text-[#FF4B3A] text-[24px] lg:text-[28px] font-bold leading-tight">Twitter</h3>
            <p className="text-black/50 text-[16px] lg:text-[18px] leading-snug">Tweet & reply soal MBG: keracunan, porsi, harga, hingga keluhan rasa.</p>
          </div>
        </div>

        {/* Card 2: Instagram/Tiktok */}
        <div className="relative w-full min-h-[180px] lg:h-[210px] bg-gradient-to-r from-[#EE4F44] to-[#F98422] rounded-[40px] shadow-[0px_20px_40px_rgba(0,0,0,0.03)] overflow-hidden p-6 lg:p-8 flex items-center gap-6 lg:gap-8 text-white">
          <div className="absolute right-[10px] bottom-[10px] w-[80px] h-[80px] bg-[#E9F7BA] rounded-full -mr-8 -mb-8"></div>
          <div className="w-[60px] lg:w-[80px] h-[60px] lg:h-[80px] flex-shrink-0">
            <img src="/intelligence/Instagram.svg" className="w-full h-full object-contain brightness-0 invert" alt="Instagram" />
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="text-[#E9F7BA] text-[24px] lg:text-[28px] font-bold leading-tight">Instagram/Tiktok</h3>
            <p className="text-white/90 text-[16px] lg:text-[18px] leading-snug">Caption & komentar publik — termasuk video viral menu & porsi MBG.</p>
          </div>
        </div>

        {/* Card 3: Laporan Publik */}
        <div className="relative w-full min-h-[180px] lg:h-[210px] bg-[#E9F7BA] rounded-[40px] shadow-[0px_20px_40px_rgba(0,0,0,0.03)] overflow-hidden p-6 lg:p-8 flex items-center gap-6 lg:gap-8">
          <div className="absolute right-[10px] top-[10px] w-[80px] h-[80px] bg-[#FF4B3A] rounded-full -mr-8 -mt-8"></div>
          <div className="w-[60px] lg:w-[80px] h-[60px] lg:h-[80px] flex-shrink-0">
            <img src="/intelligence/chat.svg" className="w-full h-full object-contain" alt="Laporan Publik" />
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="text-[#FF4B3A] text-[24px] lg:text-[28px] font-bold leading-tight">Laporan Publik</h3>
            <p className="text-black/50 text-[16px] lg:text-[18px] leading-snug">Form laporan siswa, guru, orang tua, dan WhatsApp bot komunitas.</p>
          </div>
        </div>

        {/* Card 4: Media/Berita */}
        <div className="relative w-full min-h-[180px] lg:h-[210px] bg-gradient-to-r from-[#EE4F44] to-[#F98422] rounded-[40px] shadow-[0px_20px_40px_rgba(0,0,0,0.03)] overflow-hidden p-6 lg:p-8 flex items-center gap-6 lg:gap-8 text-white">
          <div className="absolute right-[10px] bottom-[10px] w-[80px] h-[80px] bg-[#E9F7BA] rounded-full -mr-8 -mb-8"></div>
          <div className="w-[60px] lg:w-[80px] h-[60px] lg:h-[80px] flex-shrink-0">
            <img src="/intelligence/news-paper--newspaper-periodical-fold-content-entertainment.svg" className="w-full h-full object-contain brightness-0 invert" alt="Media" />
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="text-[#E9F7BA] text-[24px] lg:text-[28px] font-bold leading-tight">Media/Berita</h3>
            <p className="text-white/90 text-[16px] lg:text-[18px] leading-snug">Portal berita lokal & nasional, deteksi isu MBG otomatis 24/7.</p>
          </div>
        </div>

      </div>
    </div>
  );
}
