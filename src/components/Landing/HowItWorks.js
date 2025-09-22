// frontend-ui/src/components/Landing/HowItWorks.js
"use client";

import { useState } from "react";
import LoginPopup from "@/components/Landing/LoginPopUp";
import { Search, UserRoundSearch, Video, FilePlus, Sparkles, ArrowRight } from "lucide-react";
import InvertedGradientButton from "../common/InvertedGradientButton";

const steps = [
  {
    title: "Register Your Account",
    description:
      "Log in to get access to our network of certified healthcare professionals.",
    icon: <Search className="w-8 h-8 text-[var(--color-secondary)]" />,
  },
  {
    title: "Find Your Doctor",
    description:
      "Browse through our network of certified healthcare professionals and find the right specialist for your needs.",
    icon: <UserRoundSearch className="w-8 h-8 text-[var(--color-secondary)]" />,
  },
  {
    title: "Start Consultation",
    description:
      "Connect with your doctor through secure video calls. Discuss symptoms, get diagnosis, and receive treatment plans.",
    icon: <Video className="w-8 h-8 text-[var(--color-secondary)]" />,
  },
  {
    title: "Get Prescription",
    description:
      "Receive digital prescriptions and treatment plans instantly. Access your medical records anytime, anywhere.",
    icon: <FilePlus className="w-8 h-8 text-[var(--color-secondary)]" />,
  },
];

function StepCard({ icon, title, description }) {
  return (
    <div className="flex items-start space-x-4 p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition">
      <div className="flex-shrink-0">{icon}</div>
      <div>
        <h4 className="h4 font-semibold mb-1">{title}</h4>
        <p className="p">{description}</p>
      </div>
    </div>
  );
}

export default function HowItWorks() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  return (
    <section id="how-it-works" className="py-[var(--space-section)] bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* LEFT COLUMN */}
        <div>
          {/* Badge */}
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-100 to-blue-200 text-blue-800 px-4 py-1.5 rounded-full text-sm font-semibold tracking-wide mb-6">
              <Sparkles className="w-4 h-4" />
              <span>Connect in Minutes</span>
            </div>
          <h2 className="h2 mb-[var(--space-heading)]">
            How It{" "}
            <span className="bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] bg-clip-text text-transparent">
              Works
            </span>
          </h2>
          <p className="p mb-[var(--space-subheading)] max-w-lg">
            Getting quality healthcare has never been easier. Follow these
            simple steps to connect with top doctors and get the care you need.
          </p>
          <InvertedGradientButton
            onClick={() => setIsLoginOpen(true)}>
            <span>Start Call Now</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </InvertedGradientButton>
        </div>

        {/* RIGHT COLUMN */}
        <div className="relative">
          {/* Background SVG */}
          <svg
            className="absolute top-20 left-10 w-[400px] h-[400px] opacity-20 pointer-events-none"
            viewBox="0 0 200 200"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path fill="#0F62FE" d="M49,-74.6C63.8,-66.8,76.3,-53.7,81.9,-38.3C87.4,-23,86,-5.4,82,10.7C77.9,26.7,71.2,41.3,60.9,52.5C50.7,63.6,37,71.5,22.6,74.7C8.2,77.9,-6.9,76.4,-23.1,73.8C-39.2,71.2,-56.5,67.5,-66.6,57C-76.8,46.5,-79.9,29.2,-82.1,11.9C-84.4,-5.3,-85.8,-22.6,-79.1,-35.7C-72.4,-48.7,-57.5,-57.5,-43,-65.5C-28.4,-73.4,-14.2,-80.5,1.5,-82.7C17.1,-85,34.2,-82.4,49,-74.6Z" transform="translate(100 100)" />
          </svg>

          {/* Grid content */}
          <div className="grid gap-6 relative z-10">
            {steps.map((step, idx) => (
              <StepCard
                key={idx}
                icon={step.icon}
                title={step.title}
                description={step.description}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Login Popup */}
      <LoginPopup open={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
    </section>
  );
}
