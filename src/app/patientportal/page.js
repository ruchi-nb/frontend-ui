"use client";

import { useEffect } from "react";
import HeroSection from "@/components/PatientPortal/home/HeroSection";
import SpecialtiesSection from "@/components/PatientPortal/home/SpecialtiesSection";

export default function PatientPortalPage() {
  useEffect(() => {
    console.log("✅ Patient portal page loaded successfully!");
  }, []);

  return (
    <div>
      <HeroSection />
      <SpecialtiesSection />
    </div>
  );
}