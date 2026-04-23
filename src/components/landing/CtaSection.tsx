export default function CtaSection() {
  return (
    <>
      <div className="absolute left-0 top-[3500px] w-[1441px] h-[490px] pt-[80px] pb-[110px] px-[24px] bg-[#FF4B3A] flex flex-col items-center justify-start gap-[50px]">
        {/* Horizontal bleed to fill ultrawide screens */}
        <div className="absolute left-[-100vw] right-[-100vw] top-0 bottom-0 bg-[#FF4B3A] pointer-events-none"></div>
        
        {/* Texts */}
        <div className="flex flex-col items-center justify-start overflow-hidden relative z-10">
          <div className="flex items-center justify-start gap-[10px] p-[10px] overflow-hidden">
            <div className="w-[461px] text-center text-white text-[40px] font-bold font-sf-rounded leading-[57px] tracking-[0.20px]">
              Bertindak sebelum <br/>kasus meluas.
            </div>
          </div>
          <div className="flex items-center justify-start gap-[10px] p-[10px] overflow-hidden">
            <div className="text-center text-white text-[24px] font-medium leading-[38px] tracking-[0.20px]">
              Buka dashboard intelijen Pantauin, pantau seluruh sinyal MBG di Indonesia dalam satu layar.
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="inline-flex items-center justify-start gap-[20.26px] relative z-10">
          {/* Button 1 */}
          <div className="relative group cursor-pointer">
            <div className="w-[247.63px] h-[54.03px] bg-[#E9F7BA] rounded-[77.67px] transition-colors group-hover:bg-[#d6f08c] flex items-center justify-center shadow-[0px_22.5px_45px_#F4E2D1]">
              <span className="text-black text-[20px] font-bold capitalize">Buka Dashboard</span>
            </div>
          </div>
          
          <div className="w-[11.26px] h-[2.25px] bg-transparent shadow-[0px_22.5px_45px_#F4E2D1] rounded-[77.67px]"></div>
          
          {/* Button 2 */}
          <div className="relative group cursor-pointer">
            <div className="w-[247.63px] h-[54.03px] rounded-[77.67px] border-[1.13px] border-white flex items-center justify-center shadow-[0px_22.5px_45px_#F4E2D1] transition-colors group-hover:bg-white/10">
              <span className="text-white text-[20px] font-bold capitalize">Lihat Risk Map</span>
            </div>
          </div>
        </div>

      </div>
    </>
  );
}
