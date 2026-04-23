export default function PipelineSection() {
  return (
    <>
      {/* Background connecting line / curves */}
      <div className="absolute left-[879.28px] top-[2793.54px] w-[121.73px] h-[110.12px] outline outline-[3px] outline-[#C4C4C4]/70 -outline-offset-[1.50px] origin-top-left rotate-7"></div>
      <div className="absolute left-[942.85px] top-[2772.08px] w-[43.63px] h-[45.71px] bg-[#C4C4C4]/70 rounded-lg origin-top-left -rotate-22"></div>
      
      {/* Main Title Background Container */}
      <div className="absolute left-[566.13px] top-[2756px] w-[775px] h-[251px] bg-[#E9F7BA] rounded-tl-[40px] rounded-br-[40px] overflow-hidden">
        <div className="absolute left-[54px] top-[22px] w-[690px] h-[164px] flex flex-col justify-end text-[#333333] text-[40px] font-normal capitalize">
          Dari data mentah ke keputusan, dalam hitungan menit.
        </div>
        <div className="absolute left-[708px] top-[-46px] w-[107.59px] h-[107.59px] bg-[#FF4B3A] rounded-full"></div>
      </div>

      <div className="absolute left-[546.73px] top-[2871.62px] w-[121.73px] h-[110.12px] outline outline-[3px] outline-[#FF4B3A] -outline-offset-[1.50px] origin-top-left rotate-68"></div>
      <div className="absolute left-[596.49px] top-[2916.63px] w-[43.63px] h-[45.71px] bg-[#FF4B3A] rounded-lg origin-top-left rotate-39"></div>

      {/* Main Section Title */}
      <div className="absolute left-[93.13px] top-[2815.36px] w-[447.22px] flex flex-col justify-center">
        <span className="text-[#FF3839] text-[65px] font-bold font-sf-rounded leading-[62.40px]">AI Processing<br/></span>
        <span className="text-[#09283A] text-[65px] font-bold font-sf-rounded leading-[62.40px]">Pipeline</span>
      </div>

      {/* 4 Pipeline Cards */}
      <div className="absolute left-[80.13px] top-[3126.11px] inline-flex items-center justify-start gap-[40px]">
        
        {/* Card 1: Ingestion */}
        <div className="relative w-[290px] h-[356px] bg-white rounded-[15px] overflow-hidden shadow-sm">
          <div className="absolute left-0 top-[9px] w-[290px] h-[109.33px]">
            <div className="absolute left-0 top-[62.08px] w-full h-[6.49px] bg-[#F6F6F6] rounded-full"></div>
            <div className="absolute left-[98.67px] top-0 w-[92.65px] h-[109.33px]">
              <div className="absolute left-[7.88px] top-[17.11px] w-[76.41px] h-[76.41px] bg-[#F1C9FF] shadow-[0px_4.58px_9.17px_rgba(0,0,0,0.20)] rounded-full"></div>
              {/* Replaced 400 lines of div vector art with a placeholder image as requested */}
              <img className="absolute left-[18px] top-[30px] w-[55px] h-[50px] object-contain" src="https://placehold.co/55x50" alt="Ingestion Icon" />
              <div className="absolute left-[29.65px] top-0 w-[32.43px] h-[32.43px] bg-[#E1F2E3] rounded-[27.80px] flex items-center justify-center">
                <span className="text-[#1B6D51] text-[18.53px] font-bold">1</span>
              </div>
            </div>
          </div>
          <div className="absolute left-[13px] top-[188px] w-[260px] text-center text-[#696984] text-[18px] font-normal leading-[29px]">
            Crawling sosmed, berita, & laporan publik secara terus-menerus.
          </div>
          <div className="absolute left-[86px] top-[133px] text-center text-[#0B7077] text-[27px] font-semibold">
            Ingestion
          </div>
        </div>

        {/* Card 2: NLP Analysis */}
        <div className="relative w-[290px] h-[356px] bg-white rounded-[15px] overflow-hidden shadow-sm">
          <div className="absolute left-0 top-[9px] w-[290px] h-[109.33px]">
            <div className="absolute left-0 top-[62.08px] w-full h-[6.49px] bg-[#F6F6F6] rounded-full"></div>
            <div className="absolute left-[98.67px] top-0 w-[92.65px] h-[109.33px]">
              <div className="absolute left-[7.87px] top-[17.11px] w-[76.41px] h-[76.41px] bg-[#A2D3FF] shadow-[0px_4.58px_9.17px_rgba(0,0,0,0.20)] rounded-full"></div>
              <img className="absolute left-[17.83px] top-[32.60px] w-[55px] h-[49px] object-contain" src="https://placehold.co/55x49" alt="NLP Icon" />
              <div className="absolute left-[29.65px] top-0 w-[32.43px] h-[32.43px] bg-[#E1F2E3] rounded-[27.80px] flex items-center justify-center">
                <span className="text-[#1B6D51] text-[18.53px] font-bold">2</span>
              </div>
            </div>
          </div>
          <div className="absolute left-[13px] top-[188px] w-[260px] text-center text-[#696984] text-[18px] font-medium leading-[29px]">
            Klasifikasi teks (IndoBERT) & ekstraksi lokasi, jenis makanan, waktu.
          </div>
          <div className="absolute left-[62px] top-[133px] text-center text-[#0B7077] text-[27px] font-semibold">
            NLP Analysis
          </div>
        </div>

        {/* Card 3: Pattern Detection */}
        <div className="relative w-[290px] h-[356px] bg-white rounded-[15px] overflow-hidden shadow-sm">
          <div className="absolute left-0 top-[9px] w-[290px] h-[109.33px]">
            <div className="absolute left-0 top-[62.08px] w-full h-[6.49px] bg-[#F6F6F6] rounded-full"></div>
            <div className="absolute left-[98.67px] top-0 w-[92.65px] h-[109.33px]">
              <div className="absolute left-[7.88px] top-[17.11px] w-[76.41px] h-[76.41px] bg-[#FFDB7E] shadow-[0px_4.58px_9.17px_rgba(0,0,0,0.20)] rounded-full"></div>
              <img className="absolute left-[16.83px] top-[32.60px] w-[57px] h-[51px] object-contain" src="https://placehold.co/57x51" alt="Pattern Icon" />
              <div className="absolute left-[29.65px] top-0 w-[32.43px] h-[32.43px] bg-[#E1F2E3] rounded-[27.80px] flex items-center justify-center">
                <span className="text-[#1B6D51] text-[18.53px] font-bold">3</span>
              </div>
            </div>
          </div>
          <div className="absolute left-[13px] top-[188px] w-[260px] text-center text-[#696984] text-[18px] font-medium leading-[29px]">
            Clustering laporan serupa & spike detection per wilayah/vendor.
          </div>
          <div className="absolute left-[30px] top-[133px] text-center text-[#0B7077] text-[27px] font-semibold">
            Pattern Detection
          </div>
        </div>

        {/* Card 4: Risk Prediction */}
        <div className="relative w-[290px] h-[356px] bg-white rounded-[15px] overflow-hidden shadow-sm">
          <div className="absolute left-0 top-[9px] w-[290px] h-[109.33px]">
            <div className="absolute left-0 top-[62.08px] w-full h-[6.49px] bg-[#F6F6F6] rounded-full"></div>
            <div className="absolute left-[98.67px] top-0 w-[92.65px] h-[109.33px]">
              <div className="absolute left-[7.88px] top-[17.11px] w-[76.41px] h-[76.41px] bg-[#CAC9FF] shadow-[0px_4.58px_9.17px_rgba(0,0,0,0.20)] rounded-full"></div>
              <img className="absolute left-[14.83px] top-[25.60px] w-[62px] h-[56px] object-contain" src="https://placehold.co/62x56" alt="Risk Icon" />
              <div className="absolute left-[29.65px] top-0 w-[32.43px] h-[32.43px] bg-[#E1F2E3] rounded-[27.80px] flex items-center justify-center">
                <span className="text-[#1B6D51] text-[18.53px] font-bold">4</span>
              </div>
            </div>
          </div>
          <div className="absolute left-[13px] top-[188px] w-[260px] text-center text-[#696984] text-[18px] font-medium leading-[29px]">
            Scoring risiko & notifikasi otomatis ke dinas kesehatan & sekolah.
          </div>
          <div className="absolute left-[45px] top-[133px] text-center text-[#0B7077] text-[27px] font-semibold">
            Risk Prediction
          </div>
        </div>

      </div>
    </>
  );
}
