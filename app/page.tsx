import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import HeroSection from "@/components/hero-section"
import AboutSection from "@/components/about-section"
import SubjectsSection from "@/components/subjects-section"
import EventsSection from "@/components/events-section"
import PremiumSection from "@/components/premium-section"
import FaqSection from "@/components/faq-section"
export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <SubjectsSection />
        <EventsSection />
        <PremiumSection />
        <AboutSection />
        
        <FaqSection />
      </main>
      <Footer />
    </div>
  )
}
