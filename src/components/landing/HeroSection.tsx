"use client";

import Image from "next/image";
import Link from "next/link";

export default function HeroSection() {
  const scrollToNext = () => {
    // Standard scroll to next natural section
    const nextSection = document.getElementById('stats-section');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative w-full min-h-screen lg:h-[850px] overflow-hidden bg-white">
      {/* Decorative Red Background Circles - Shifted further right */}
      <div className="absolute left-[20%] lg:left-[550px] top-[-300px] lg:top-[-726px] w-[150vw] lg:w-[1324.81px] h-[150vw] lg:h-[1324.81px] bg-[#FF4B3A] rounded-full z-20 transition-all duration-700"></div>
      
      {/* Orbiting Food Icons Mask Container (z-30) - Hidden on mobile - Shifted further right */}
      <div className="hidden lg:block absolute left-[20%] lg:left-[550px] top-[-300px] lg:top-[-726px] w-[150vw] lg:w-[1324.81px] h-[150vw] lg:h-[1324.81px] rounded-full overflow-hidden z-30 pointer-events-none transition-all duration-700">
        {/* Orbiting Food Icons Container */}
        <div className="absolute left-[15%] lg:left-[346.86px] top-[70%] lg:top-[1010.53px] w-[60vw] lg:w-[630.33px] h-[60vw] lg:h-[630.33px] rounded-full animate-[spin_35s_linear_infinite]">
          {/* Icons - Dynamically positioned in a circle */}
          {[
            "Type=Fruits, Icon=Orange.png",
            "Type=Food, Icon=Fried Eggs.png",
            "Type=Vegetables, Icon=Carrot (1).png",
            "Type=Fruits, Icon=Grape.png",
            "Type=Food, Icon=Bread.png",
            "Type=Fruits, Icon=Watermelon.png"
          ].map((imgName, idx, arr) => {
            const angle = (idx / arr.length) * 2 * Math.PI;
            const left = 50 + 50 * Math.cos(angle);
            const top = 50 + 50 * Math.sin(angle);
            
            return (
              <div 
                key={idx} 
                className="absolute w-[60px] lg:w-[105px] h-[60px] lg:h-[105px] bg-white rounded-full border-[1px] border-[#FF4B3A] shadow-lg flex items-center justify-center animate-[spin_25s_linear_infinite_reverse]"
                style={{ 
                  left: `${left}%`, 
                  top: `${top}%`,
                  transform: 'translate(-50%, -50%)'
                }}
              >
                <img 
                  className="w-[60%] h-[60%] object-contain drop-shadow-md" 
                  src={`/hero/food-icon/${imgName}`} 
                  alt={imgName} 
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* Hero Lines */}
      <div className="absolute left-0 top-[101px] w-full h-0 border-t-[0.30px] border-[#F4F4F8] z-50 opacity-30"></div>
      <div className="absolute left-0 top-[212px] w-full h-0 border-t-[0.30px] border-[#F4F4F8] z-50 opacity-30"></div>

      {/* Big Title Background - Shifted further right */}
      <div className="absolute left-[25%] lg:left-[640px] top-[125px] text-white text-[28px] lg:text-[73.16px] font-extrabold leading-none z-50 pointer-events-none whitespace-nowrap">
        Pantauin MBG
      </div>

      {/* Navbar Content */}
      <div className="relative w-full px-6 lg:px-[136px] pt-[47px] flex justify-between items-center z-50">
        {/* Left: Logo */}
        <div className="flex items-center gap-3 min-w-[150px]">
          <div className="w-[18px] h-[18px] bg-[#FF4B3A] rounded-full"></div>
          <div className="text-[#333333] text-[20px] font-extrabold capitalize">Pantauin</div>
        </div>
        
        {/* Center: Navigation Links */}
        <div className="hidden lg:flex items-center justify-center gap-[58px] flex-1">
          <div className="text-white text-[16px] font-medium capitalize cursor-pointer hover:opacity-80">Fitur</div>
          <div className="text-white text-[16px] font-medium capitalize cursor-pointer hover:opacity-80">Sumber Data</div>
          <div className="text-white text-[16px] font-medium capitalize cursor-pointer hover:opacity-80">Cara Kerja</div>
        </div>

        {/* Right: CTA Button - Slightly shifted left */}
        <Link href="/dashboard" className="text-white text-[17px] font-semibold cursor-pointer hover:underline flex items-center gap-2 min-w-[150px] justify-end lg:pr-10">
          Buka Dashboard <span className="text-[20px]">&rarr;</span>
        </Link>
      </div>

      {/* Main Content Area */}
      <div className="relative w-full px-6 lg:px-[136px] mt-32 lg:mt-[100px] z-50 flex flex-col lg:flex-row items-center lg:items-start lg:justify-between">
        
        {/* Right: Tray Image Container (Hidden on mobile) */}
        <div className="hidden lg:flex relative lg:static w-full lg:w-auto justify-center mb-10 lg:mb-0 order-1 lg:order-2">
          <div className="relative lg:absolute lg:left-[1050px] lg:top-[250px] w-[250px] lg:w-[315px] h-[250px] lg:h-[315px] bg-white rounded-full shadow-2xl overflow-hidden flex items-center justify-center z-40">
            <img className="w-full h-full object-cover" src="/hero/mbg.png" alt="Main MBG Tray" />
          </div>
        </div>

        {/* Left: Typography */}
        <div className="w-full lg:max-w-[600px] text-center lg:text-left pt-24 lg:pt-20 order-2 lg:order-1">
          <h1 className="text-[#333333] text-[42px] lg:text-[60px] font-extrabold capitalize leading-[1.1] mb-6 mt-20 lg:mt-32">
            Deteksi Dini <br />
            <span>Keracunan MBG</span>
          </h1>
          <p className="text-[#333333] text-[16px] lg:text-[14.6px] font-normal leading-relaxed max-w-[400px] mx-auto lg:mx-0 mb-10">
            Pantauin Menggabungkan AI, <span className="italic">Social Listening</span>, Dan Data Lapangan Untuk Memberi Peringatan Dini Risiko Keracunan Makanan Pada Program Makan Bergizi Gratis Di Seluruh Indonesia.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 lg:gap-5">
            <Link href="/dashboard" className="w-full sm:w-[247px]">
              <button className="w-full h-[54px] bg-[#FF4B3A] text-white font-bold rounded-full shadow-lg hover:bg-[#e03f31] transition-all">
                LIHAT DASHBOARD LIVE
              </button>
            </Link>
            <button className="w-full sm:w-[247px] h-[54px] bg-white text-[#FF4B3A] border-[1px] border-[#FF4B3A] font-bold rounded-full shadow-lg hover:bg-gray-50 transition-all">
              LAPOR INSIDEN
            </button>
          </div>
        </div>
      </div>

      {/* Scroll Down Button */}
      <div 
        onClick={scrollToNext}
        className="absolute right-6 lg:right-[136px] bottom-10 w-[45px] h-[45px] bg-[#FF4B3A] rounded-full shadow-lg flex items-center justify-center text-white cursor-pointer hover:bg-[#e03f31] z-50 animate-bounce"
      >
        &darr;
      </div>
    </div>
  );
}
