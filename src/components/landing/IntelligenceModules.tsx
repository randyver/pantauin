import Image from "next/image";

export default function IntelligenceModules() {
  return (
    <div className="relative w-full z-10 px-6 lg:px-[136px]">
      {/* Top Header Section */}
      <div className="relative w-full flex flex-col lg:flex-row justify-between items-start mb-12 lg:mb-[80px]">
        <div className="w-full lg:max-w-[700px] pt-0 lg:pt-10 z-10">
          <h2 className="text-[#333333] text-[36px] lg:text-[56px] font-bold font-sf-rounded leading-[1.1] mb-6">
            Memantau setiap sinyal, dari semua arah
          </h2>
          <p className="text-[#333333] text-[16px] lg:text-[18px] font-medium max-w-[550px] leading-relaxed opacity-80">
            Data Publik Dari Media, Sosial Media, Dan Laporan Masyarakat Dianalisis Bersama Data Resmi Pemerintah & Sekolah.
          </p>
        </div>

        {/* 3D Character Image - Positioned to overlap on desktop, stacks or hides on small mobile if needed */}
        <div className="absolute right-[-40px] lg:right-[-100px] top-[-100px] lg:top-[-50px] w-[300px] lg:w-[450px] h-[300px] lg:h-[450px] z-0 pointer-events-none opacity-40 lg:opacity-100">
          <img 
            src="/intelligence/ToyFaces_Tansparent_BG_29(1).png" 
            className="w-full h-full object-contain" 
            alt="Intelligence Character" 
          />
        </div>
      </div>

      {/* 4 Cards Grid - Responsive layout */}
      <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-[24px] w-full max-w-[1168px] z-10">
        
        {/* Card 1: Twitter */}
        <div className="relative w-full min-h-[180px] lg:h-[210px] bg-[#E9F7BA] rounded-[40px] shadow-[0px_20px_40px_rgba(0,0,0,0.03)] overflow-hidden p-6 lg:p-8 flex items-center gap-6 lg:gap-8">
          <div className="absolute right-[10px] top-[10px] w-[80px] h-[80px] bg-[#FF4B3A] rounded-full -mr-8 -mt-8"></div>
          <div className="w-[60px] lg:w-[80px] h-[60px] lg:h-[80px] flex-shrink-0">
            <img src="/intelligence/x logo.svg" className="w-full h-full object-contain" alt="Twitter" />
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="text-[#FF4B3A] text-[24px] lg:text-[28px] font-bold leading-tight">Twitter</h3>
            <p className="text-black/50 text-[16px] lg:text-[18px] leading-snug">Tweet & reply terkait MBG, keracunan, makan siang sekolah.</p>
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
            <p className="text-white/90 text-[16px] lg:text-[18px] leading-snug">Caption & komentar publik dari hashtag relevan.</p>
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
            <p className="text-black/50 text-[16px] lg:text-[18px] leading-snug">Form laporan siswa, guru, orang tua, WhatsApp bot</p>
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
            <p className="text-white/90 text-[16px] lg:text-[18px] leading-snug">Portal berita lokal & nasional, deteksi otomatis 24/7.</p>
          </div>
        </div>

      </div>
    </div>
  );
}
