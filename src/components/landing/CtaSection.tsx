export default function CtaSection() {
  return (
    <footer className="absolute left-1/2 -translate-x-1/2 w-screen top-[3500px] z-10">
      {/* Red Background Banner */}
      <div className="relative w-full bg-[#FF4B3A] py-[100px] flex flex-col items-center justify-center text-center px-4">
        
        {/* Main Heading */}
        <h2 className="text-white text-[56px] font-bold font-sf-rounded leading-tight mb-4">
          Bertindak sebelum kasus meluas.
        </h2>
        
        {/* Subheading */}
        <p className="text-white text-[20px] font-medium max-w-[900px] mb-12 opacity-90">
          Buka dashboard intelijen Pantauin, pantau seluruh sinyal MBG di Indonesia dalam satu layar.
        </p>

        {/* Action Buttons */}
        <div className="flex items-center gap-6 mb-20">
          <button className="px-10 py-4 bg-[#E9F7BA] text-black font-bold text-[18px] rounded-full hover:bg-[#d9e8aa] transition-colors shadow-lg">
            Buka Dashboard
          </button>
          <button className="px-10 py-4 bg-transparent border-2 border-white text-white font-bold text-[18px] rounded-full hover:bg-white/10 transition-colors shadow-lg">
            Liat Risk Map
          </button>
        </div>

        {/* Copyright Text - Positioned at the very bottom of the red area */}
        <div className="absolute bottom-10 w-full text-center text-white/60 text-[14px]">
          © 2026 Pantauin
        </div>
      </div>
    </footer>
  );
}
