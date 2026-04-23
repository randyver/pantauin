export default function CtaSection() {
  return (
    <footer className="relative w-full z-10">
      {/* Red Background Banner */}
      <div className="relative w-full bg-[#FF4B3A] py-16 lg:py-[100px] flex flex-col items-center justify-center text-center px-6">
        
        {/* Main Heading */}
        <h2 className="text-white text-[32px] lg:text-[56px] font-bold font-sf-rounded leading-tight mb-6 max-w-[800px]">
          Bertindak sebelum kasus meluas.
        </h2>
        
        {/* Subheading */}
        <p className="text-white text-[16px] lg:text-[20px] font-medium max-w-[900px] mb-12 opacity-90 leading-relaxed">
          Buka dashboard intelijen Pantauin, pantau seluruh sinyal MBG di Indonesia dalam satu layar.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4 lg:gap-6 mb-16 lg:mb-20 w-full sm:w-auto">
          <button className="w-full sm:w-auto px-10 py-4 bg-[#E9F7BA] text-black font-bold text-[18px] rounded-full hover:bg-[#d9e8aa] transition-all shadow-lg">
            Buka Dashboard
          </button>
          <button className="w-full sm:w-auto px-10 py-4 bg-transparent border-2 border-white text-white font-bold text-[18px] rounded-full hover:bg-white/10 transition-all shadow-lg">
            Liat Risk Map
          </button>
        </div>

        {/* Copyright Text */}
        <div className="w-full text-center text-white/60 text-[14px]">
          © 2026 Pantauin
        </div>
      </div>
    </footer>
  );
}
