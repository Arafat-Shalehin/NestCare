import AboutSection from "@/components/home/AboutSection";
import HeroSection from "@/components/home/HeroSection";
import ServicesSection from "@/components/home/ServicesSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";

export default function Home() {
  return (
    <div>
      <HeroSection></HeroSection>
      <AboutSection></AboutSection>
      <ServicesSection></ServicesSection>
      <TestimonialsSection></TestimonialsSection>
    </div>
  );
}
