"use client";

import Image from "next/image";

export default function HeroSection() {
  const scrollToNext = () => {
    window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
  };

  return (
    <>
      {/* Decorative Red Background Circles - Restored to perfect circle and z-20 */}
      <div className="absolute left-[318.54px] top-[-726px] w-[1324.81px] h-[1324.81px] bg-[#FF4B3A] rounded-full z-20"></div>
      <div className="absolute left-[318.54px] top-[-726px] w-[1324.81px] h-[1324.81px] bg-[#FF4B3A] rounded-full border-[1.13px] border-[#FF4B3A] z-20"></div>

      {/* Orbiting Food Icons Mask Container (z-30) 
          This container has the exact same shape as the red circle and hides anything outside of it.
      */}
      <div className="absolute left-[318.54px] top-[-726px] w-[1324.81px] h-[1324.81px] rounded-full overflow-hidden z-30 pointer-events-none">
        {/* Orbiting Food Icons Container (relative to the mask) */}
        <div className="absolute left-[346.86px] top-[1010.53px] w-[630.33px] h-[630.33px] rounded-full animate-[spin_25s_linear_infinite]">
          
          {/* Icon 1: Top */}
          <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 w-[105px] h-[105px] bg-white rounded-full border-[1px] border-[#FF4B3A] shadow-lg flex items-center justify-center animate-[spin_25s_linear_infinite_reverse]">
            <img className="w-[60%] h-[60%] object-contain drop-shadow-md" src="/hero/food-icon/Type=Fruits, Icon=Orange.png" alt="Orange" />
          </div>

          {/* Icon 2: Top Right (72 degrees) */}
          <div className="absolute left-[97.55%] top-[34.55%] -translate-x-1/2 -translate-y-1/2 w-[105px] h-[105px] bg-white rounded-full border-[1px] border-[#FF4B3A] shadow-lg flex items-center justify-center animate-[spin_25s_linear_infinite_reverse]">
            <img className="w-[60%] h-[60%] object-contain drop-shadow-md" src="/hero/food-icon/Type=Fruits, Icon=Grape.png" alt="Grape" />
          </div>

          {/* Icon 3: Bottom Right (144 degrees) */}
          <div className="absolute left-[79.38%] top-[90.45%] -translate-x-1/2 -translate-y-1/2 w-[105px] h-[105px] bg-white rounded-full border-[1px] border-[#FF4B3A] shadow-lg flex items-center justify-center animate-[spin_25s_linear_infinite_reverse]">
            <img className="w-[60%] h-[60%] object-contain drop-shadow-md" src="/hero/food-icon/Type=Fruits, Icon=Lemon.png" alt="Lemon" />
          </div>

          {/* Icon 4: Bottom Left (216 degrees) */}
          <div className="absolute left-[20.62%] top-[90.45%] -translate-x-1/2 -translate-y-1/2 w-[105px] h-[105px] bg-white rounded-full border-[1px] border-[#FF4B3A] shadow-lg flex items-center justify-center animate-[spin_25s_linear_infinite_reverse]">
            <img className="w-[70%] h-[70%] object-contain drop-shadow-md" src="/hero/food-icon/Type=Fruits, Icon=Watermelon.png" alt="Watermelon" />
          </div>

          {/* Icon 5: Top Left (288 degrees) */}
          <div className="absolute left-[2.45%] top-[34.55%] -translate-x-1/2 -translate-y-1/2 w-[105px] h-[105px] bg-white rounded-full border-[1px] border-[#FF4B3A] shadow-lg flex items-center justify-center animate-[spin_25s_linear_infinite_reverse]">
            <img className="w-[60%] h-[60%] object-contain drop-shadow-md" src="/hero/food-icon/Type=Fruits, Icon=Pineapple (1).png" alt="Pineapple" />
          </div>
        </div>
      </div>

      {/* Hero Lines - Spanning the whole screen width */}
      <div className="absolute left-1/2 -translate-x-1/2 top-[101px] w-screen h-0 outline outline-[0.30px] outline-[#F4F4F8] -outline-offset-[0.15px] z-50 opacity-30"></div>
      <div className="absolute left-1/2 -translate-x-1/2 top-[212px] w-screen h-0 outline outline-[0.30px] outline-[#F4F4F8] -outline-offset-[0.15px] z-50 opacity-30"></div>

      {/* Big Main Center Image Component (Tray) */}
      <div className="absolute left-[826.01px] top-[420.92px] w-[315.23px] h-[315.23px] bg-white rounded-full shadow-[0px_23px_45px_rgba(0,0,0,0.11)] overflow-hidden flex items-center justify-center z-40">
        <img className="w-full h-full object-cover" src="/hero/mbg.png" alt="Main MBG Tray" />
      </div>

      {/* Hero Typography */}
      <div className="absolute left-[111.13px] top-[360px] w-[800px] flex flex-col justify-end z-50">
        <span className="text-[#333333] text-[50px] font-extrabold capitalize leading-[56.28px] break-words">
          Deteksi Dini <br />
          <span className="text-[#FF4B3A]">Keracunan MBG</span>
        </span>
      </div>

      <div className="absolute left-[111.13px] top-[492px] w-[390.58px] flex flex-col justify-end z-50">
        <span className="text-[#333333] text-[14.63px] font-normal capitalize break-words">
          Pantauin Menggabungkan AI,{" "}
          <span className="italic">Social Listening</span>
          , Dan Data Lapangan Untuk Memberi Peringatan Dini Risiko Keracunan Makanan Pada Program Makan Bergizi Gratis Di Seluruh Indonesia.
        </span>
      </div>

      {/* Buttons */}
      <div className="absolute left-[111.43px] top-[641.58px] inline-flex items-center justify-start gap-[20.26px] z-50">
        {/* Btn 1 */}
        <div className="relative w-[247.63px] h-[54.03px] flex items-center justify-center bg-[#FF4B3A] rounded-[77.67px] shadow-[0px_22.5px_45px_#F4E2D1] cursor-pointer hover:bg-[#e03f31] transition-colors">
          <span className="text-white text-[14.63px] font-bold capitalize">LIHAT DASHBOARD LIVE</span>
        </div>
        {/* Divider line invisible logic based on original html */}
        <div className="w-[11.26px] h-[2.25px] bg-transparent shadow-[0px_22.5px_45px_#F4E2D1] rounded-[77.67px]"></div>
        {/* Btn 2 */}
        <div className="relative w-[247.63px] h-[54.03px] flex items-center justify-center bg-white rounded-[77.67px] shadow-[0px_22.5px_45px_#F4E2D1] border-[1.13px] border-[#FF4B3A] cursor-pointer hover:bg-gray-50 transition-colors">
          <span className="text-[#FF4B3A] text-[14.63px] font-bold capitalize">LAPOR INSIDEN</span>
        </div>
      </div>

      {/* Decorative Dots (Smooth scroll to next section) */}
      <div 
        onClick={scrollToNext}
        className="absolute left-[1283.16px] top-[694.48px] w-[45.02px] h-[45.02px] bg-[#FF4B3A] rounded-full shadow-[0px_11px_22.5px_#F5ECE3] flex items-center justify-center text-white cursor-pointer hover:bg-[#e03f31] pb-1 z-50 transition-transform hover:scale-110"
      >
        &darr;
      </div>

      {/* Navbar & Navigation */}
      <div className="absolute left-[422.09px] top-[58.53px] inline-flex items-center justify-start gap-[58px] z-50">
        <div className="flex flex-col justify-end text-white text-[15.76px] font-medium capitalize cursor-pointer hover:opacity-80">Fitur</div>
        <div className="flex flex-col justify-end text-white text-[15.76px] font-medium capitalize cursor-pointer hover:opacity-80">Sumber Data</div>
        <div className="flex flex-col justify-end text-white text-[15.76px] font-medium capitalize cursor-pointer hover:opacity-80">Cara Kerja</div>
      </div>

      {/* Logo */}
      <div className="absolute left-[136.20px] top-[58.90px] flex flex-col justify-end text-[#333333] text-[20.26px] font-extrabold capitalize z-50">Pantauin</div>
      <div className="absolute left-[112.56px] top-[58.53px] w-[18.01px] h-[18.01px] bg-[#FF4B3A] rounded-full z-50"></div>

      {/* Big Title Background */}
      <div className="absolute left-[432px] top-[115px] text-white text-[73.16px] font-extrabold leading-[63.53px] z-50">Pantauin MBG</div>

      {/* Top Right Action */}
      <div className="absolute left-[1181px] top-[47px] text-center text-white text-[17px] font-semibold cursor-pointer hover:underline flex items-center gap-2 z-50">
        Buka Dashboard <span>&rarr;</span>
      </div>
    </>
  );
}
