"use client";

import { Database, BrainCircuit, Activity, Zap } from "lucide-react";

export default function PipelineSection() {
  return (
    <div className="relative w-full z-10 px-6 lg:px-[136px]">
      {/* Top Header Section - Responsive */}
      <div className="relative w-full flex flex-col lg:flex-row justify-between items-center mb-12 lg:mb-[100px] gap-8 lg:gap-0">
        {/* Left Side: Title */}
        <div className="w-full lg:max-w-[450px] text-center lg:text-left">
          <h2 className="text-[42px] lg:text-[56px] font-bold font-sf-rounded leading-[1.1]">
            <span className="text-[#FF4B3A]">AI Processing</span>
            <br />
            <span className="text-[#09283A]">Pipeline</span>
          </h2>
        </div>

        {/* Center: Dotted Arrow Asset - Hidden on Mobile */}
        <div className="hidden lg:block absolute left-[380px] top-[40px] w-[200px] h-[100px]">
          <img src="/pipeline/arrow.svg" className="w-full h-full object-contain" alt="Arrow Decor" />
        </div>

        {/* Right Side: Subheader Box */}
        <div className="relative w-full lg:w-[650px] min-h-[180px] lg:h-[220px] bg-[#E9F7BA] rounded-[30px] lg:rounded-[40px] flex items-center px-8 lg:px-12 py-8 lg:py-0">
          <div className="absolute right-[10px] lg:right-[20px] top-[10px] lg:top-[20px] w-[40px] lg:w-[60px] h-[40px] lg:h-[60px] bg-[#FF4B3A] rounded-full -mr-2 lg:-mr-4 -mt-2 lg:-mt-4"></div>
          <p className="text-[#333333] text-[28px] lg:text-[42px] font-medium leading-tight text-center lg:text-left">
            Dari Data Mentah Ke Keputusan, Dalam Hitungan Menit.
          </p>
        </div>
      </div>

      {/* 4 Cards Row with Animated Connection Lines - Responsive Stacking */}
      <div className="relative flex flex-col lg:flex-row justify-between items-center lg:items-start gap-16 lg:gap-10">
        
        {/* Animated Background Lines Layer - Horizontal on Desktop, Vertical on Mobile */}
        {/* Desktop Line */}
        <div className="hidden lg:block absolute top-[50px] left-[50px] right-[50px] h-[4px] bg-gray-100 -z-0">
          <div className="absolute top-0 left-0 h-full bg-[#FF4B3A] shadow-[0_0_15px_#FF4B3A] animate-pipeline-flow-h"></div>
        </div>
        {/* Mobile Line */}
        <div className="lg:hidden absolute left-1/2 -translate-x-1/2 top-[50px] bottom-[50px] w-[4px] bg-gray-100 -z-0">
          <div className="absolute left-0 top-0 w-full bg-[#FF4B3A] shadow-[0_0_15px_#FF4B3A] animate-pipeline-flow-v"></div>
        </div>

        {[
          { icon: <Database size={40} className="text-[#333333]" />, title: "Ingestion", desc: "Crawling sosmed, berita, & laporan publik secara terus-menerus.", color: "#F1C9FF", num: 1 },
          { icon: <BrainCircuit size={40} className="text-[#333333]" />, title: "NLP Analysis", desc: "Klasifikasi teks (IndoBERT) & ekstraksi lokasi, jenis makanan, waktu.", color: "#A2D3FF", num: 2 },
          { icon: <Activity size={40} className="text-[#333333]" />, title: "Pattern Detection", desc: "Clustering laporan serupa & spike detection per wilayah/vendor.", color: "#FFDB7E", num: 3 },
          { icon: <Zap size={40} className="text-[#333333]" />, title: "Risk Prediction", desc: "Skor risiko + alert otomatis ke pemangku kepentingan.", color: "#CAC9FF", num: 4 }
        ].map((step, idx) => (
          <div key={idx} className="flex flex-col items-center w-full max-w-[280px] text-center z-10 bg-white lg:bg-transparent py-4 lg:py-0">
            <div className="relative mb-8">
              <div className={`w-[100px] h-[100px] bg-[${step.color}] rounded-full flex items-center justify-center shadow-lg border-[4px] border-white`} style={{ backgroundColor: step.color }}>
                {step.icon}
              </div>
              <div className="absolute -top-2 -right-2 w-[35px] h-[35px] bg-[#E1F2E3] rounded-full border-[2px] border-white flex items-center justify-center text-[#1B6D51] font-bold text-[18px] shadow-sm">
                {step.num}
              </div>
            </div>
            <h3 className="text-[#0B7077] text-[26px] lg:text-[28px] font-bold mb-3">{step.title}</h3>
            <p className="text-[#696984] text-[15px] lg:text-[17px] leading-relaxed">
              {step.desc}
            </p>
          </div>
        ))}

      </div>

      <style jsx global>{`
        @keyframes pipelineFlowH {
          0% { width: 0; left: 0; }
          25% { width: 33.33%; left: 0; }
          50% { width: 33.33%; left: 33.33%; }
          75% { width: 33.33%; left: 66.66%; }
          100% { width: 0; left: 100%; }
        }
        @keyframes pipelineFlowV {
          0% { height: 0; top: 0; }
          25% { height: 33.33%; top: 0; }
          50% { height: 33.33%; top: 33.33%; }
          75% { height: 33.33%; top: 66.66%; }
          100% { height: 0; top: 100%; }
        }
        .animate-pipeline-flow-h {
          animation: pipelineFlowH 4s linear infinite;
        }
        .animate-pipeline-flow-v {
          animation: pipelineFlowV 4s linear infinite;
        }
      `}</style>
    </div>
  );
}
