export default function IntelligenceModules() {
  return (
    <>
      {/* Background Decor */}
      <div className="absolute left-[-72.87px] top-[804px] w-[1586.33px] h-[396px] rounded-full outline outline-[2.25px] outline-[#FF4B3A]/30 -outline-offset-[1.13px]"></div>
      
      {/* Module 1: Blur decorative shadow */}
      <div className="absolute left-[1029.40px] top-[1563.88px] w-[264.19px] h-[129.29px] bg-gradient-to-b from-[#54425A] to-white shadow-[19.87px_19.87px_19.87px] blur-[9.94px] origin-top-left rotate-15"></div>

      {/* Headers */}
      <div className="absolute left-[149.13px] top-[1309px] w-[908px] text-[#333333] text-[73.16px] font-bold font-sf-rounded leading-[63.53px]">
        Memantau setiap sinyal, dari semua arah
      </div>
      
      <div className="absolute left-[152.13px] top-[1469.11px] w-[472px] h-[53px] flex flex-col justify-end text-[#333333] text-[14.63px] font-normal capitalize">
        Data publik dari media, sosial media, dan laporan masyarakat dianalisis bersama data resmi pemerintah & sekolah.
      </div>

      <div className="absolute left-[672.13px] top-[2127px] w-[728px] text-[73.16px] font-bold font-sf-rounded leading-[63.53px]">
        <span className="text-[#FF4B3A]">Empat</span>
        <span className="text-[#333333]"> </span>
        <span className="text-white">modul intelijen dalam satu platform.</span>
      </div>

      {/* 4 Cards Grid */}
      <div className="absolute left-[152.13px] top-[1576px] w-[1006px] inline-flex flex-wrap content-start items-start justify-start gap-[16.14px]">
        
        {/* Card 1: Twitter */}
        <div className="relative w-[494.93px] h-[177.53px] bg-gradient-to-l from-[#E9F7BA] to-[#E9F7BA] rounded-[32.28px] overflow-hidden group">
          <div className="absolute left-[428.22px] top-[-50.57px] w-[107.59px] h-[107.59px] bg-[#FF4B3A] rounded-[387.34px] transition-transform group-hover:scale-110"></div>
          <div className="absolute left-[30.13px] top-[23.67px] inline-flex items-center gap-[21.52px]">
            <img className="w-[85.19px] h-[86.96px] object-contain" src="https://placehold.co/85x87" alt="Twitter" />
            <div className="w-[327.08px] inline-flex flex-col items-start gap-[21.52px]">
              <div className="w-full text-[#FF4B3A] text-[43.04px] font-normal leading-[37.37px]">Twitter</div>
              <div className="w-full text-black/50 text-[26.90px] font-normal leading-[23.36px]">Tweet & reply terkait MBG, keracunan, makan siang sekolah.</div>
            </div>
          </div>
        </div>

        {/* Card 2: Instagram/Tiktok */}
        <div className="relative w-[494.93px] h-[177.53px] bg-gradient-to-l from-[#EE4F44] to-[#F98422] rounded-[32.28px] overflow-hidden group">
          <div className="absolute left-[424.99px] top-[128.04px] w-[107.59px] h-[107.59px] bg-[#E9F7BA] rounded-[387.34px] transition-transform group-hover:scale-110"></div>
          <div className="absolute left-[30.13px] top-[23.67px] inline-flex items-center gap-[21.52px]">
            <div className="relative w-[86.07px] h-[86.07px] overflow-hidden">
              <div className="absolute left-[7.17px] top-[7.17px] w-[71.73px] h-[71.73px] outline outline-[4.30px] outline-white/90 -outline-offset-[2.15px] rounded-2xl"></div>
            </div>
            <div className="w-[327.08px] inline-flex flex-col items-start gap-[21.52px]">
              <div className="w-[352.91px] text-[#E9F7BA] text-[43.04px] font-normal leading-[37.37px]">Instagram/Tiktok</div>
              <div className="w-full text-white/90 text-[26.90px] font-normal leading-[23.36px]">Caption & komentar publik dari hashtag relevan.</div>
            </div>
          </div>
        </div>

        {/* Card 3: Media/Berita */}
        <div className="relative w-[494.93px] h-[177.53px] bg-gradient-to-l from-[#EE4F44] to-[#F98422] rounded-[32.28px] overflow-hidden group">
          <div className="absolute left-[424.99px] top-[128.04px] w-[107.59px] h-[107.59px] bg-[#E9F7BA] rounded-[387.34px] transition-transform group-hover:scale-110"></div>
          <div className="absolute left-[30.13px] top-[23.67px] inline-flex items-center gap-[21.52px]">
            <div className="relative w-[72.56px] h-[72.56px] overflow-hidden">
              <div className="absolute left-[2.59px] top-[9.07px] w-[67.38px] h-[54.42px] outline outline-[5.18px] outline-[#FEF1EA] -outline-offset-[2.59px] rounded-lg"></div>
              <div className="absolute left-[18.14px] top-[22.03px] w-[23.32px] h-[12.96px] outline outline-[5.18px] outline-[#FEF1EA] -outline-offset-[2.59px] rounded-sm"></div>
            </div>
            <div className="w-[327.08px] inline-flex flex-col items-start gap-[21.52px]">
              <div className="w-[352.91px] text-[#E9F7BA] text-[43.04px] font-normal leading-[37.37px]">Media/Berita</div>
              <div className="w-full text-white/90 text-[26.90px] font-normal leading-[23.36px]">Portal berita lokal & nasional, deteksi otomatis 24/7.</div>
            </div>
          </div>
        </div>

        {/* Card 4: Laporan Publik */}
        <div className="relative w-[494.93px] h-[177.53px] bg-gradient-to-l from-[#E9F7BA] to-[#E9F7BA] rounded-[32.28px] overflow-hidden group">
          <div className="absolute left-[428.22px] top-[-50.57px] w-[107.59px] h-[107.59px] bg-[#FF4B3A] rounded-[387.34px] transition-transform group-hover:scale-110"></div>
          <div className="absolute left-[30.13px] top-[23.67px] inline-flex items-center gap-[21.52px]">
            <div className="relative w-[79.08px] h-[79.08px] overflow-hidden">
              <div className="absolute left-[28.23px] top-[28.24px] w-[48.03px] h-[48.01px] outline outline-[5.65px] outline-black -outline-offset-[2.82px] rounded-xl"></div>
              <div className="absolute left-[2.82px] top-[2.87px] w-[52.87px] h-[59.27px] outline outline-[5.65px] outline-black -outline-offset-[2.82px] rounded-xl"></div>
            </div>
            <div className="w-[327.08px] inline-flex flex-col items-start gap-[21.52px]">
              <div className="w-full text-[#FF4B3A] text-[43.04px] font-normal leading-[37.37px]">Laporan Publik</div>
              <div className="w-full text-black/50 text-[26.90px] font-normal leading-[23.36px]">Form laporan siswa, guru, orang tua, WhatsApp bot</div>
            </div>
          </div>
        </div>

      </div>
    </>
  );
}
