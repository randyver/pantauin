import { Database, BrainCircuit, Activity, Zap } from "lucide-react";

export default function PipelineSection() {
  return (
    <div className="absolute left-0 w-full top-[2750px] z-10 px-[136px]">
      {/* Top Header Section */}
      <div className="relative w-full flex justify-between items-center mb-[100px]">
        {/* Left Side: Title */}
        <div className="max-w-[450px]">
          <h2 className="text-[56px] font-bold font-sf-rounded leading-[1.1]">
            <span className="text-[#FF4B3A]">AI Processing</span>
            <br />
            <span className="text-[#09283A]">Pipeline</span>
          </h2>
        </div>

        {/* Center: Dotted Arrow Asset */}
        <div className="absolute left-[380px] top-[40px] w-[200px] h-[100px]">
          <img src="/pipeline/arrow.svg" className="w-full h-full object-contain" alt="Arrow Decor" />
        </div>

        {/* Right Side: Subheader Box */}
        <div className="relative w-[650px] h-[220px] bg-[#E9F7BA] rounded-[40px] flex items-center px-12">
          <div className="absolute right-[20px] top-[20px] w-[60px] h-[60px] bg-[#FF4B3A] rounded-full -mr-4 -mt-4"></div>
          <p className="text-[#333333] text-[42px] font-medium leading-tight">
            Dari Data Mentah Ke Keputusan, Dalam Hitungan Menit.
          </p>
        </div>
      </div>

      {/* 4 Cards Row */}
      <div className="flex justify-between items-start gap-10">
        
        {/* Step 1: Ingestion */}
        <div className="flex flex-col items-center w-[280px] text-center">
          <div className="relative mb-8">
            <div className="w-[100px] h-[100px] bg-[#F1C9FF] rounded-full flex items-center justify-center shadow-lg">
              <Database size={40} className="text-[#333333]" />
            </div>
            <div className="absolute -top-2 -right-2 w-[35px] h-[35px] bg-[#E1F2E3] rounded-full border-[2px] border-white flex items-center justify-center text-[#1B6D51] font-bold text-[18px] shadow-sm">
              1
            </div>
          </div>
          <h3 className="text-[#0B7077] text-[28px] font-bold mb-3">Ingestion</h3>
          <p className="text-[#696984] text-[17px] leading-relaxed">
            Crawling sosmed, berita, & laporan publik secara terus-menerus.
          </p>
        </div>

        {/* Step 2: NLP Analysis */}
        <div className="flex flex-col items-center w-[280px] text-center">
          <div className="relative mb-8">
            <div className="w-[100px] h-[100px] bg-[#A2D3FF] rounded-full flex items-center justify-center shadow-lg">
              <BrainCircuit size={40} className="text-[#333333]" />
            </div>
            <div className="absolute -top-2 -right-2 w-[35px] h-[35px] bg-[#E1F2E3] rounded-full border-[2px] border-white flex items-center justify-center text-[#1B6D51] font-bold text-[18px] shadow-sm">
              2
            </div>
          </div>
          <h3 className="text-[#0B7077] text-[28px] font-bold mb-3">NLP Analysis</h3>
          <p className="text-[#696984] text-[17px] leading-relaxed">
            Klasifikasi teks (IndoBERT) & ekstraksi lokasi, jenis makanan, waktu.
          </p>
        </div>

        {/* Step 3: Pattern Detection */}
        <div className="flex flex-col items-center w-[280px] text-center">
          <div className="relative mb-8">
            <div className="w-[100px] h-[100px] bg-[#FFDB7E] rounded-full flex items-center justify-center shadow-lg">
              <Activity size={40} className="text-[#333333]" />
            </div>
            <div className="absolute -top-2 -right-2 w-[35px] h-[35px] bg-[#E1F2E3] rounded-full border-[2px] border-white flex items-center justify-center text-[#1B6D51] font-bold text-[18px] shadow-sm">
              3
            </div>
          </div>
          <h3 className="text-[#0B7077] text-[28px] font-bold mb-3">Pattern Detection</h3>
          <p className="text-[#696984] text-[17px] leading-relaxed">
            Clustering laporan serupa & spike detection per wilayah/vendor.
          </p>
        </div>

        {/* Step 4: Risk Prediction */}
        <div className="flex flex-col items-center w-[280px] text-center">
          <div className="relative mb-8">
            <div className="w-[100px] h-[100px] bg-[#CAC9FF] rounded-full flex items-center justify-center shadow-lg">
              <Zap size={40} className="text-[#333333]" />
            </div>
            <div className="absolute -top-2 -right-2 w-[35px] h-[35px] bg-[#E1F2E3] rounded-full border-[2px] border-white flex items-center justify-center text-[#1B6D51] font-bold text-[18px] shadow-sm">
              4
            </div>
          </div>
          <h3 className="text-[#0B7077] text-[28px] font-bold mb-3">Risk Prediction</h3>
          <p className="text-[#696984] text-[17px] leading-relaxed">
            Skor risiko + alert otomatis ke pemangku kepentingan.
          </p>
        </div>

      </div>
    </div>
  );
}
