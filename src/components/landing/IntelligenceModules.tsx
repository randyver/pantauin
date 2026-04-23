import Image from "next/image";

export default function IntelligenceModules() {
  return (
    <div className="absolute left-0 w-full top-[1300px] z-10 px-[136px]">
      {/* Top Header Section */}
      <div className="relative w-full flex justify-between items-start mb-[80px]">
        <div className="max-w-[700px] pt-10">
          <h2 className="text-[#333333] text-[56px] font-bold font-sf-rounded leading-[1.1] mb-6">
            Memantau setiap sinyal, dari semua arah
          </h2>
          <p className="text-[#333333] text-[18px] font-medium max-w-[550px] leading-relaxed opacity-80">
            Data Publik Dari Media, Sosial Media, Dan Laporan Masyarakat Dianalisis Bersama Data Resmi Pemerintah & Sekolah.
          </p>
        </div>

        {/* 3D Character Image - Positioned absolute to overlap with cards below */}
        <div className="absolute right-[-100px] top-[-50px] w-[450px] h-[450px] z-0 pointer-events-none">
          <img 
            src="/intelligence/ToyFaces_Tansparent_BG_29(1).png" 
            className="w-full h-full object-contain" 
            alt="Intelligence Character" 
          />
        </div>
      </div>

      {/* 4 Cards Grid - Higher z-index to cover the character's body */}
      <div className="relative grid grid-cols-2 gap-[24px] max-w-[1168px] z-10">
        
        {/* Card 1: Twitter */}
        <div className="relative w-[572px] h-[210px] bg-[#E9F7BA] rounded-[40px] shadow-[0px_20px_40px_rgba(0,0,0,0.03)] overflow-hidden p-8 flex items-center gap-8">
          <div className="absolute right-[10px] top-[10px] w-[80px] h-[80px] bg-[#FF4B3A] rounded-full -mr-8 -mt-8"></div>
          <div className="w-[80px] h-[80px] flex-shrink-0">
            <img src="/intelligence/x logo.svg" className="w-full h-full object-contain" alt="Twitter" />
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="text-[#FF4B3A] text-[28px] font-bold leading-tight">Twitter</h3>
            <p className="text-black/50 text-[18px] leading-snug">Tweet & reply terkait MBG, keracunan, makan siang sekolah.</p>
          </div>
        </div>

        {/* Card 2: Instagram/Tiktok */}
        <div className="relative w-[572px] h-[210px] bg-gradient-to-r from-[#EE4F44] to-[#F98422] rounded-[40px] shadow-[0px_20px_40px_rgba(0,0,0,0.03)] overflow-hidden p-8 flex items-center gap-8 text-white">
          <div className="absolute right-[10px] bottom-[10px] w-[80px] h-[80px] bg-[#E9F7BA] rounded-full -mr-8 -mb-8"></div>
          <div className="w-[80px] h-[80px] flex-shrink-0">
            <img src="/intelligence/Instagram.svg" className="w-full h-full object-contain brightness-0 invert" alt="Instagram" />
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="text-[#E9F7BA] text-[28px] font-bold leading-tight">Instagram/Tiktok</h3>
            <p className="text-white/90 text-[18px] leading-snug">Caption & komentar publik dari hashtag relevan.</p>
          </div>
        </div>

        {/* Card 4: Laporan Publik */}
        <div className="relative w-[572px] h-[210px] bg-[#E9F7BA] rounded-[40px] shadow-[0px_20px_40px_rgba(0,0,0,0.03)] overflow-hidden p-8 flex items-center gap-8">
          <div className="absolute right-[10px] top-[10px] w-[80px] h-[80px] bg-[#FF4B3A] rounded-full -mr-8 -mt-8"></div>
          <div className="w-[80px] h-[80px] flex-shrink-0">
            <img src="/intelligence/chat.svg" className="w-full h-full object-contain" alt="Laporan Publik" />
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="text-[#FF4B3A] text-[28px] font-bold leading-tight">Laporan Publik</h3>
            <p className="text-black/50 text-[18px] leading-snug">Form laporan siswa, guru, orang tua, WhatsApp bot</p>
          </div>
        </div>

        {/* Card 3: Media/Berita */}
        <div className="relative w-[572px] h-[210px] bg-gradient-to-r from-[#EE4F44] to-[#F98422] rounded-[40px] shadow-[0px_20px_40px_rgba(0,0,0,0.03)] overflow-hidden p-8 flex items-center gap-8 text-white">
          <div className="absolute right-[10px] bottom-[10px] w-[80px] h-[80px] bg-[#E9F7BA] rounded-full -mr-8 -mb-8"></div>
          <div className="w-[80px] h-[80px] flex-shrink-0">
            <img src="/intelligence/news-paper--newspaper-periodical-fold-content-entertainment.svg" className="w-full h-full object-contain brightness-0 invert" alt="Media" />
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="text-[#E9F7BA] text-[28px] font-bold leading-tight">Media/Berita</h3>
            <p className="text-white/90 text-[18px] leading-snug">Portal berita lokal & nasional, deteksi otomatis 24/7.</p>
          </div>
        </div>

      </div>
    </div>
  );
}
