import Image from "next/image";

export default function StatsSection() {
  return (
    <div className="absolute left-0 w-full h-[600px] top-[900px] z-10 flex flex-col items-center justify-start">
      {/* Background Ellipse SVG */}
      <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-[2500px] h-[800px] z-0 pointer-events-none">
        <img src="/stats/ellipse.svg" className="w-full h-full object-contain opacity-60" alt="Background Decor" />
      </div>

      <div className="relative w-full max-w-[1441px] mx-auto h-full flex flex-col items-center justify-center pt-10">
        {/* Cards Container */}
        <div className="flex justify-center items-center gap-[40px] z-10">
          {/* Stat Card 1: Sekolah */}
          <div className="relative w-[280px] h-[340px] bg-white rounded-[40px] shadow-[0px_30px_60px_rgba(0,0,0,0.05)] flex flex-col items-center justify-start pt-10">
            <div className="w-[140px] h-[140px] rounded-full border-[6px] border-[#F2F2F2] overflow-hidden mb-6">
              <img className="w-full h-full object-cover" src="/stats/school.png" alt="Sekolah" />
            </div>
            <div className="text-[#333333] text-[36px] font-bold font-sf-rounded">38k+</div>
            <div className="text-[#FF4B3A] text-[15px] font-bold font-sf-rounded mt-2 uppercase tracking-widest">Sekolah Dipantau</div>
          </div>

          {/* Stat Card 2: Vendor */}
          <div className="relative w-[280px] h-[340px] bg-white rounded-[40px] shadow-[0px_30px_60px_rgba(0,0,0,0.05)] flex flex-col items-center justify-start pt-10">
            <div className="w-[140px] h-[140px] rounded-full border-[6px] border-[#F2F2F2] overflow-hidden mb-6">
              <img className="w-full h-full object-cover" src="/stats/sppg.png" alt="Vendor" />
            </div>
            <div className="text-[#333333] text-[36px] font-bold font-sf-rounded">1.2k+</div>
            <div className="text-[#FF4B3A] text-[15px] font-bold font-sf-rounded mt-2 uppercase tracking-widest">Vendor SPPG</div>
          </div>

          {/* Stat Card 3: AI Pemantauan */}
          <div className="relative w-[280px] h-[340px] bg-white rounded-[40px] shadow-[0px_30px_60px_rgba(0,0,0,0.05)] flex flex-col items-center justify-start pt-10">
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
