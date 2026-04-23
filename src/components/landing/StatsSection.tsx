import Image from "next/image";

export default function StatsSection() {
  return (
    <div id="stats-section" className="relative w-full min-h-[600px] flex flex-col items-center justify-center overflow-hidden py-24 lg:py-32">
      {/* Background Ellipse SVG - Refined sizing to prevent clipping */}
      <div className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center">
        <img src="/stats/ellipse.svg" className="w-[200%] lg:w-[180%] h-auto max-h-[1000px] object-contain opacity-60" alt="Background Decor" />
      </div>

      <div className="relative w-full max-w-[1441px] mx-auto px-6 lg:px-[136px] flex flex-col items-center justify-center">
        {/* Cards Container - Stack on mobile, row on desktop */}
        <div className="flex flex-col lg:flex-row justify-center items-center gap-10 lg:gap-[40px] z-10 w-full">
          
          {/* Stat Card 1: Sekolah */}
          <div className="relative w-full max-w-[280px] h-[340px] bg-white rounded-[40px] shadow-[0px_30px_60px_rgba(0,0,0,0.05)] flex flex-col items-center justify-start pt-10 transition-transform hover:scale-105 duration-300">
            <div className="w-[140px] h-[140px] rounded-full border-[6px] border-[#F2F2F2] overflow-hidden mb-6">
              <img className="w-full h-full object-cover" src="/stats/school.png" alt="Sekolah" />
            </div>
            <div className="text-[#333333] text-[36px] font-bold font-sf-rounded">38k+</div>
            <div className="text-[#FF4B3A] text-[15px] font-bold font-sf-rounded mt-2 uppercase tracking-widest">Sekolah Dipantau</div>
          </div>

          {/* Stat Card 2: Vendor */}
          <div className="relative w-full max-w-[280px] h-[340px] bg-white rounded-[40px] shadow-[0px_30px_60px_rgba(0,0,0,0.05)] flex flex-col items-center justify-start pt-10 transition-transform hover:scale-105 duration-300">
            <div className="w-[140px] h-[140px] rounded-full border-[6px] border-[#F2F2F2] overflow-hidden mb-6">
              <img className="w-full h-full object-cover" src="/stats/sppg.png" alt="Vendor" />
            </div>
            <div className="text-[#333333] text-[36px] font-bold font-sf-rounded">1.2k+</div>
            <div className="text-[#FF4B3A] text-[15px] font-bold font-sf-rounded mt-2 uppercase tracking-widest">Vendor SPPG</div>
          </div>

          {/* Stat Card 3: AI Pemantauan */}
          <div className="relative w-full max-w-[280px] h-[340px] bg-white rounded-[40px] shadow-[0px_30px_60px_rgba(0,0,0,0.05)] flex flex-col items-center justify-start pt-10 transition-transform hover:scale-105 duration-300">
            <div className="w-[140px] h-[140px] rounded-full border-[6px] border-[#F2F2F2] overflow-hidden mb-6">
              <img className="w-full h-full object-cover" src="/stats/ai-pantau.png" alt="AI Pemantauan" />
            </div>
            <div className="text-[#333333] text-[36px] font-bold font-sf-rounded">24/7</div>
            <div className="text-[#FF4B3A] text-[15px] font-bold font-sf-rounded mt-2 uppercase tracking-widest">Pemantauan AI</div>
          </div>

        </div>
      </div>
    </div>
  );
}
