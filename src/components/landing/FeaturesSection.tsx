import Image from "next/image";

export default function FeaturesSection() {
  return (
    <>
      <div className="absolute left-[150.13px] top-[2335px] inline-flex items-start justify-start gap-[34px]">
        
        {/* Feature 1: Early Warning System */}
        <div className="relative w-[268px] h-[350px] flex flex-col items-center">
          <div className="absolute left-0 top-[138px] w-[268px] h-[212px] bg-white shadow-[0px_30px_60px_rgba(57,57,57,0.10)] rounded-[30px]"></div>
          <div className="relative z-10 flex flex-col items-center justify-start gap-[20px] pt-[83px]">
            <div className="w-[110px] h-[110px] bg-white shadow-[0px_30px_40px_rgba(0,0,0,0.10)] rounded-full flex items-center justify-center">
              {/* Refactored vector to an image placeholder for cleanliness */}
              <img src="https://placehold.co/41x41" alt="Early Warning" className="w-[41px] h-[41px]" />
            </div>
            <div className="w-[208px] text-center text-black text-[30px] font-semibold font-sf-rounded leading-[30.40px]">
              Early warning system
            </div>
            <div className="w-[208px] text-center text-black text-[17px] font-normal font-sf-rounded">
              Alert otomatis saat lonjakan laporan terdeteksi di suatu wilayah, vendor, atau sekolah.
            </div>
          </div>
        </div>

        {/* Feature 2: Social Signal Dashboard */}
        <div className="relative w-[268px] h-[350px] flex flex-col items-center">
          <div className="absolute left-0 top-[138px] w-[268px] h-[212px] bg-white shadow-[0px_30px_60px_rgba(57,57,57,0.10)] rounded-[30px]"></div>
          <div className="relative z-10 flex flex-col items-center justify-start gap-[20px] pt-[83px]">
            <div className="w-[110px] h-[110px] bg-white shadow-[0px_30px_40px_rgba(0,0,0,0.10)] rounded-full flex items-center justify-center">
              <img src="https://placehold.co/38x38" alt="Social Signal" className="w-[38px] h-[38px]" />
            </div>
            <div className="w-[208px] text-center text-black text-[30px] font-semibold font-sf-rounded leading-[30.40px]">
              Social Signal Dashboard
            </div>
            <div className="w-[208px] text-center text-black text-[17px] font-normal font-sf-rounded">
              Visualisasi mention, sentimen publik, dan trending keyword secara real-time.
            </div>
          </div>
        </div>

        {/* Feature 3: Risk Map Indonesia */}
        <div className="relative w-[268px] h-[350px] flex flex-col items-center">
          <div className="absolute left-0 top-[138px] w-[268px] h-[212px] bg-white shadow-[0px_30px_60px_rgba(57,57,57,0.10)] rounded-[30px]"></div>
          <div className="relative z-10 flex flex-col items-center justify-start gap-[20px] pt-[83px]">
            <div className="w-[110px] h-[110px] bg-white shadow-[0px_30px_40px_rgba(0,0,0,0.10)] rounded-full flex items-center justify-center overflow-hidden">
              <img src="https://placehold.co/159x110" alt="Risk Map" className="w-[158.79px] h-[110px] object-cover" />
            </div>
            <div className="w-[208px] text-center text-black text-[30px] font-semibold font-sf-rounded leading-[30.40px]">
              Risk Map Indonesia
            </div>
            <div className="w-[208px] text-center text-black text-[17px] font-normal font-sf-rounded">
              Peta interaktif dengan indikator hijau-kuning-merah per wilayah & hotspot.
            </div>
          </div>
        </div>

        {/* Feature 4: Incident Explorer */}
        <div className="relative w-[268px] h-[350px] flex flex-col items-center">
          <div className="absolute left-0 top-[138px] w-[268px] h-[212px] bg-white shadow-[0px_30px_60px_rgba(57,57,57,0.10)] rounded-[30px]"></div>
          <div className="relative z-10 flex flex-col items-center justify-start gap-[20px] pt-[83px]">
            <div className="w-[110px] h-[110px] bg-white shadow-[0px_30px_40px_rgba(0,0,0,0.10)] rounded-full flex items-center justify-center overflow-hidden">
              <img src="https://placehold.co/157x196" alt="Incident Explorer" className="w-[157px] h-[196px] object-cover" />
            </div>
            <div className="w-[208px] text-center text-black text-[30px] font-semibold font-sf-rounded leading-[30.40px]">
              Incident Explorer
            </div>
            <div className="w-[208px] text-center text-black text-[17px] font-normal font-sf-rounded">
              Daftar laporan dari sosmed, berita, & user bisa difilter & ditelusuri detailnya
            </div>
          </div>
        </div>

      </div>
    </>
  );
}
