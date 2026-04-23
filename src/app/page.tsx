import HeroSection from "@/components/landing/HeroSection";
import StatsSection from "@/components/landing/StatsSection";
import IntelligenceModules from "@/components/landing/IntelligenceModules";
import FeaturesSection from "@/components/landing/FeaturesSection";
import PipelineSection from "@/components/landing/PipelineSection";
import CtaSection from "@/components/landing/CtaSection";

export default function Page() {
  return (
    <main className="w-full bg-white min-h-screen overflow-x-hidden flex flex-col items-center">
      <div className="w-full flex flex-col">
        <HeroSection />
        
        {/* Sections now follow a natural vertical flow with responsive spacing */}
        <section className="py-12 md:py-24">
          <StatsSection />
        </section>
        
        <section className="py-12 md:py-32">
          <IntelligenceModules />
        </section>
        
        <section className="py-12 md:py-32">
          <FeaturesSection />
        </section>
        
        <section className="py-12 md:py-32">
          <PipelineSection />
        </section>
        
        <section className="pt-12 md:pt-32">
          <CtaSection />
        </section>
      </div>
    </main>
  );
}
