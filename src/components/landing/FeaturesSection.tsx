import { Bell, LayoutDashboard, Map as MapIcon, ShieldAlert } from "lucide-react";

export default function FeaturesSection() {
  return (
    <div id="fitur" className="relative w-full overflow-hidden">
      {/* Main Banner Container - Full width with rounded edge */}
      <div className="relative w-full min-h-[400px] lg:h-[550px] bg-[#1A2130] lg:rounded-tl-[120px] flex flex-col lg:flex-row overflow-hidden">
        {/* Banner Image */}
        <div className="w-full lg:w-[45%] h-[250px] lg:h-full">
          <img 
            src="/feature/sppg.png" 
            className="w-full h-full object-cover opacity-80 lg:opacity-100" 
            alt="Feature SPPG" 
          />
        </div>
        
        {/* Banner Text */}
        <div className="w-full lg:w-[55%] flex items-center lg:items-start px-6 lg:px-20 py-12 lg:pt-36">
          <h2 className="text-white text-[32px] lg:text-[56px] font-bold font-sf-rounded leading-[1.2] lg:leading-[1.1] max-w-[700px] text-center lg:text-left">
            <span className="text-[#FF4B3A]">Empat</span> modul intelijen dalam satu platform.
          </h2>
        </div>
      </div>

      {/* Floating Cards Container - Adjusted for perfect overlap and mobile responsiveness */}
      <div className="relative lg:absolute lg:left-1/2 lg:-translate-x-1/2 mt-20 lg:mt-0 lg:top-[400px] w-full max-w-[1441px] flex flex-col lg:flex-row justify-center items-center gap-24 lg:gap-8 px-6 lg:px-10 z-20 pb-20 lg:pb-0 mx-auto">
        
        {[
          { icon: <Bell size={44} />, title: "Early warning system", desc: "Alert otomatis saat lonjakan isu MBG terdeteksi — keracunan, porsi, harga, atau distribusi — di wilayah, vendor, atau sekolah tertentu." },
          { icon: <LayoutDashboard size={44} />, title: "Social Signal Dashboard", desc: "Visualisasi mention, sentimen publik, dan trending keyword seputar MBG secara real-time." },
          { icon: <MapIcon size={44} />, title: "Risk Map Indonesia", desc: "Peta interaktif dengan indikator hijau-kuning-merah per wilayah & hotspot isu MBG." },
          { icon: <ShieldAlert size={44} />, title: "Incident Explorer", desc: "Daftar laporan dari sosmed, berita, & masyarakat — semua kategori isu MBG, bisa difilter & ditelusuri." }
        ].map((card, idx) => (
          <div key={idx} className="relative w-full max-w-[300px] h-[360px] bg-white rounded-[40px] shadow-[0px_40px_80px_rgba(0,0,0,0.08)] flex flex-col items-center justify-start pt-16 px-6 text-center transition-all hover:-translate-y-2 duration-300">
            <div className="absolute -top-[60px] w-[120px] h-[120px] bg-white rounded-full shadow-xl flex items-center justify-center text-[#333333] border-[1px] border-gray-100">
              {card.icon}
            </div>
            <h3 className="text-[#333333] text-[26px] lg:text-[30px] font-bold font-sf-rounded leading-tight mt-6">
              {card.title}
            </h3>
            <p className="text-[#333333]/70 text-[15px] lg:text-[16px] font-normal font-sf-rounded mt-4 leading-relaxed">
              {card.desc}
            </p>
          </div>
        ))}

      </div>
      
      {/* Spacer for desktop layout overlap - Increased significantly to prevent clipping */}
      <div className="hidden lg:block h-[350px]"></div>
    </div>
  );
}
