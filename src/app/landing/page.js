// frontend-ui/src/app/landing/page.js
"use client";
import Navbar from "@/components/Landing/Navbar";
import HeroSection from "@/components/Landing/HeroSection";
import HowItWorks from "@/components/Landing/HowItWorks";
import Benefits from "@/components/Landing/Benefits";
import SecondCTA from "@/components/Landing/SecondCTA";
import Specialties from '@/components/Landing/SpecialtyCards';
import AboutSection from "@/components/Landing/About";
import HealthcarePartners from "@/components/Landing/HealthCarePatners";
import Footer from "@/components/Landing/footer";

export default function Home({ onLogin }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 overflow-hidden">
      <Navbar onLogin={onLogin} />
      <HeroSection />
      <HowItWorks onLogin={onLogin} />
      <Benefits />
      <SecondCTA />
      <AboutSection />
      <Specialties />
      <HealthcarePartners />
      <Footer />
    </div>
  );
}
