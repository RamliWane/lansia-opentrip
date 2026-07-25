import Navbar from "@/components/layout/Navbar";
import HeroSection from "@/components/landing/HeroSection";
import MarketingSection from "@/components/landing/MarketingSection";
import TutorialSection from "@/components/landing/TutorialSection";
import DestinationSection from "@/components/landing/DestinationSection";
import TestimonialsSection from "@/components/landing/TestimonialsSection";
import FaqSection from "@/components/landing/FAQSection";
import Subs from "@/components/landing/Subs";
import Footer from "@/components/layout/Footer";

const Home = () => {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <MarketingSection />
        <DestinationSection />
        <TutorialSection />
        <TestimonialsSection />
        <FaqSection />
      </main>
      <Subs />
      <Footer />
    </>
  );
};

export default Home;
