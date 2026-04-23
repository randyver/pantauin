import HeroSection from "@/components/landing/HeroSection";
import StatsSection from "@/components/landing/StatsSection";
import IntelligenceModules from "@/components/landing/IntelligenceModules";
import FeaturesSection from "@/components/landing/FeaturesSection";
import PipelineSection from "@/components/landing/PipelineSection";
import CtaSection from "@/components/landing/CtaSection";

export default function Page() {
  return (
    <main className="w-full bg-white min-h-screen overflow-x-hidden">
      <div className="w-full max-w-[1441px] mx-auto h-[5350px] relative bg-white">
        <HeroSection />
        
        {/* Extra spacing added via translate-y to simulate h-screen gaps */}
        <div className="translate-y-[200px]">
          <StatsSection />
        </div>
        
        <div className="translate-y-[700px]">
          <IntelligenceModules />
        </div>
        
        <div className="translate-y-[600px]">
          <FeaturesSection />
        </div>
        
        <div className="translate-y-[1100px]">
          <PipelineSection />
        </div>
        
        <div className="translate-y-[1350px]">
          <CtaSection />
        </div>
      </div>
    </main>
  );
}
