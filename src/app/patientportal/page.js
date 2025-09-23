// File: app/patientportal/page.js
"use client";

import HeroSection from "@/components/PatientPortal/home/HeroSection";
import SpecialtiesSection from "@/components/PatientPortal/home/SpecialtiesSection";

export default function PatientPortalPage() {

  return (
    <>
      <HeroSection />
      <SpecialtiesSection />
    </>
  );
}