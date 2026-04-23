import { Bell, LayoutDashboard, Map as MapIcon, ShieldAlert } from "lucide-react";

export default function FeaturesSection() {
  return (
    <div className="absolute left-1/2 -translate-x-1/2 w-screen top-[2335px] z-10">
      {/* Main Banner Container - Now truly full width */}
      <div className="relative w-full h-[550px] bg-[#1A2130] rounded-tl-[120px] flex overflow-hidden">
        {/* Left Side: Image */}
        <div className="w-[45%] h-full">
          <img 
            src="/feature/sppg.png" 
            className="w-full h-full object-cover" 
            alt="Feature SPPG" 
          />
        </div>
        
        {/* Right Side: Text - Shifted up using items-start and padding */}
        <div className="w-[55%] h-full flex items-start px-20 pt-36">
          <h2 className="text-white text-[56px] font-bold font-sf-rounded leading-[1.1] max-w-[700px]">
            <span className="text-[#FF4B3A]">Empat</span> modul intelijen dalam satu platform.
          </h2>
        </div>
      </div>

      {/* Floating Cards Container - Shifted down to avoid overlapping the text */}
      <div className="absolute left-1/2 -translate-x-1/2 -bottom-[220px] w-full max-w-[1441px] flex justify-center gap-8 px-10">
        
        {/* Card 1: Early Warning */}
        <div className="relative w-[300px] h-[360px] bg-white rounded-[40px] shadow-[0px_40px_80px_rgba(0,0,0,0.08)] flex flex-col items-center justify-start pt-16 px-6 text-center">
          <div className="absolute -top-[60px] w-[120px] h-[120px] bg-white rounded-full shadow-xl flex items-center justify-center text-[#333333] border-[1px] border-gray-100">
            <Bell size={44} />
          </div>
          <h3 className="text-[#333333] text-[30px] font-bold font-sf-rounded leading-tight mt-6">
            Early warning system
          </h3>
          <p className="text-[#333333]/70 text-[16px] font-normal font-sf-rounded mt-4 leading-relaxed">
            Alert otomatis saat lonjakan laporan terdeteksi di suatu wilayah, vendor, atau sekolah.
          </p>
        </div>

        {/* Card 2: Social Signal Dashboard */}
        <div className="relative w-[300px] h-[360px] bg-white rounded-[40px] shadow-[0px_40px_80px_rgba(0,0,0,0.08)] flex flex-col items-center justify-start pt-16 px-6 text-center">
          <div className="absolute -top-[60px] w-[120px] h-[120px] bg-white rounded-full shadow-xl flex items-center justify-center text-[#333333] border-[1px] border-gray-100">
            <LayoutDashboard size={44} />
          </div>
          <h3 className="text-[#333333] text-[30px] font-bold font-sf-rounded leading-tight mt-6">
            Social Signal Dashboard
          </h3>
          <p className="text-[#333333]/70 text-[16px] font-normal font-sf-rounded mt-4 leading-relaxed">
            Visualisasi mention, sentimen publik, dan trending keyword secara real-time.
          </p>
        </div>

        {/* Card 3: Risk Map Indonesia */}
        <div className="relative w-[300px] h-[360px] bg-white rounded-[40px] shadow-[0px_40px_80px_rgba(0,0,0,0.08)] flex flex-col items-center justify-start pt-16 px-6 text-center">
          <div className="absolute -top-[60px] w-[120px] h-[120px] bg-white rounded-full shadow-xl flex items-center justify-center text-[#333333] border-[1px] border-gray-100">
            <MapIcon size={44} />
          </div>
          <h3 className="text-[#333333] text-[30px] font-bold font-sf-rounded leading-tight mt-6">
            Risk Map Indonesia
          </h3>
          <p className="text-[#333333]/70 text-[16px] font-normal font-sf-rounded mt-4 leading-relaxed">
            Peta interaktif dengan indikator hijau-kuning-merah per wilayah & hotspot.
          </p>
        </div>

        {/* Card 4: Incident Explorer */}
        <div className="relative w-[300px] h-[360px] bg-white rounded-[40px] shadow-[0px_40px_80px_rgba(0,0,0,0.08)] flex flex-col items-center justify-start pt-16 px-6 text-center">
          <div className="absolute -top-[60px] w-[120px] h-[120px] bg-white rounded-full shadow-xl flex items-center justify-center text-[#333333] border-[1px] border-gray-100">
            <ShieldAlert size={44} />
          </div>
          <h3 className="text-[#333333] text-[30px] font-bold font-sf-rounded leading-tight mt-6">
            Incident Explorer
          </h3>
          <p className="text-[#333333]/70 text-[16px] font-normal font-sf-rounded mt-4 leading-relaxed">
            Daftar laporan dari sosmed, berita, & user bisa difilter & ditelusuri detailnya.
          </p>
        </div>

      </div>
    </div>
  );
}
