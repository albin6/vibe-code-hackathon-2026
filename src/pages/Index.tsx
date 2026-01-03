import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/sections/HeroSection";
import { HighlightsSection } from "@/components/sections/HighlightsSection";
import { ScheduleSection } from "@/components/sections/ScheduleSection";
import { WinnersSection } from "@/components/sections/WinnersSection";
import { RulesSection } from "@/components/sections/RulesSection";

const Index = () => {
  // Toggle this to show/hide the winners section after the event
  const [showWinners] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <HighlightsSection />
        <ScheduleSection />
        <WinnersSection isVisible={showWinners} />
        <RulesSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
