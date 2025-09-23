// frontend-ui/src/app/landing/page.js
"use client";
import Navbar from "@/components/Landing/Navbar";
import HeroSection from "@/components/Landing/HeroSection";
import HowItWorks from "@/components/Landing/HowItWorks";
import WhyChoose from "@/components/Landing/Benefits";
import SidePop from "@/components/Landing/SecondCTA";
import Specialties from '@/components/Landing/SpecialtyCards';
import HealthcarePartners from "@/components/Landing/HealthCarePatners";
import Footer from "@/components/Landing/footer";

const landingNavItems = [
  { type: "scroll", id: "how-it-works", label: "How It Works" },
  { type: "scroll", id: "benefits", label: "Benefits" },
  { type: "scroll", id: "specialties", label: "Specialties" },
  { type: "login", label: "Login", icon: "ri-login-circle-line", variant: "outline" },
  {
    type: "dropdown",
    label: "Register",
    items: [
      { type: "registerPatient", label: "Register as Patient" },
      { type: "registerDoctor", label: "Register as Doctor" },
    ],
  },
];


export default function Home({ onLogin }) {
  return (
    <>
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 overflow-hidden">
      <Navbar navItems={landingNavItems} onLogin={onLogin} />
      <HeroSection />
      <HowItWorks onLogin={onLogin} />
      <WhyChoose />
      <SidePop />
      <Specialties />
      <HealthcarePartners />
      <Footer />
    </div>
    {/* <WavyDivider className="absolute bottom-0 left-0 right-0 text-blue-400 " /> */}
    </>
  );
}
