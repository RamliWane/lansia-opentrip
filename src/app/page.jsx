import Navbar from "@/components/layout/Navbar";
import HeroSection from "@/components/landing/HeroSection";
import MarketingSection from "@/components/landing/MarketingSection";
import TutorialSection from "@/components/landing/TutorialSection";
import DestinationSection from "@/components/landing/DestinationSection";
import TestimonialsSection from "@/components/landing/TestimonialsSection";
import Footer from "@/components/layout/Footer";
import Subs from "@/components/landing/Subs";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <MarketingSection />
        <DestinationSection />
        <TutorialSection />
        <TestimonialsSection />
      </main>
      <Subs />
      <Footer />
    </>
  );
}
