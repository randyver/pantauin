import Image from "next/image";

export default function StatsSection() {
  return (
    <>
      {/* Stat Card 1: Sekolah */}
      <div className="absolute left-[255.13px] top-[915px] w-[268px] h-[212px] bg-white rounded-[30px] shadow-[0px_30px_60px_rgba(57,57,57,0.10)] flex flex-col items-center justify-end pb-8">
        <div className="absolute left-[68px] top-[-42px] w-[128.98px] h-[128.98px] bg-white rounded-full"></div>
        <img className="absolute left-[36px] top-[-42px] w-[192px] h-[128px] object-contain" src="https://placehold.co/192x128" alt="Sekolah Icon" />
        <div className="text-black text-[30px] font-semibold font-sf-rounded leading-[30.40px]">38k+</div>
        <div className="text-[#FA4A0C] text-[17px] font-bold font-sf-rounded mt-2">Sekolah Dipantau</div>
      </div>

      {/* Stat Card 2: Vendor */}
      <div className="absolute left-[552.13px] top-[919px] w-[268px] h-[212px] bg-white rounded-[30px] shadow-[0px_30px_60px_rgba(57,57,57,0.10)] flex flex-col items-center justify-end pb-8">
        <div className="absolute left-[70px] top-[-46px] w-[128.98px] h-[128.98px] bg-white rounded-full"></div>
        <img className="absolute left-[26px] top-[-53px] w-[216.95px] h-[143.89px] object-contain" src="https://placehold.co/217x144" alt="Vendor Decor" />
        <img className="absolute left-[53px] top-[-46px] w-[200.64px] h-[129px] object-contain" src="https://placehold.co/201x129" alt="Vendor Icon" />
        <div className="text-black text-[30px] font-semibold font-sf-rounded leading-[30.40px]">1.2k+</div>
        <div className="text-[#FA4A0C] text-[17px] font-bold font-sf-rounded mt-2">Vendor SPPG</div>
      </div>

      {/* Stat Card 3: AI Pemantauan */}
      <div className="absolute left-[864.25px] top-[915px] w-[268px] h-[212px] bg-white rounded-[30px] shadow-[0px_30px_60px_rgba(57,57,57,0.10)] flex flex-col items-center justify-end pb-8">
        <div className="absolute left-[64px] top-[-42px] w-[128.98px] h-[128.98px] bg-white rounded-full"></div>
        <img className="absolute left-[20px] top-[-49px] w-[216.95px] h-[143.89px] object-contain" src="https://placehold.co/217x144" alt="AI Icon" />
        <div className="text-black text-[30px] font-semibold font-sf-rounded leading-[30.40px]">24/7</div>
        <div className="text-[#FA4A0C] text-[17px] font-bold font-sf-rounded mt-2">Pemantauan AI</div>
      </div>
    </>
  );
}
