"use client";

import { useEffect, useState } from "react";
import {Clock4, Shield, SquareActivity, Users, HeartPlus, Zap } from "lucide-react";

const benefitsData = [
  {
    title: "24/7 Availability",
    description:
      "Access healthcare anytime, anywhere. No more waiting for office hours or emergency room queues.",
    icon: (<Clock4 className="w-7 h-7 text-white" />),
    badge: "99.9% Uptime",
  },
  {
    title: "Secure & Private",
    description:
      "HIPAA-compliant platform with end-to-end encryption. Your health data is always protected.",
    icon: (<Shield className="w-7 h-7 text-white" />),
    badge: "Bank-level Security",
  },
  {
    title: "Smooth Care",
    description:
      "Crystal-clear audio and video with smooth, uninterrupted consultations for stress-free care.",
    icon: (<SquareActivity className="w-7 h-7 text-white" />),
    badge: "Zero hassle",
  },  
  {
    title: "Expert Doctors",
    description:
      "Board-certified physicians with years of experience. Verified credentials and patient reviews.",
    icon: (<Users className="w-7 h-7 text-white" />),
    badge: "15+ Specialists",
  },
  {
    title: "Personalized Care",
    description:
      "Tailored treatment plans based on your medical history and current health conditions.",
    icon: (<HeartPlus className="w-7 h-7 text-white" />),
    badge: "95% Satisfaction Rate",
  },
  {
    title: "Instant Results",
    description:
      "Get prescriptions, lab orders, and medical certificates delivered instantly to your device.",
    icon: (<Zap className="w-7 h-7 text-white" />),
    badge: "Under 2 Minutes",
  },
];

export default function WhyChoose() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section id="benefits" className="py-8 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <span>Why Choose Us</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Healthcare{" "}
            <span className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
              Benefits
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Experience the future of healthcare with our comprehensive platform designed to make quality medical care accessible to everyone.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
  {benefitsData.map((benefit, idx) => (
    <div
      key={idx}
      className={`group relative bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 sm:p-8 border border-gray-100 transition-all duration-500 ${
        mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      } hover:-translate-y-2 hover:scale-105`}
    >
      <div className="relative z-10">
        {/* Icon */}
        <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl flex items-center justify-center mb-4 sm:mb-6 transition-transform duration-300 group-hover:scale-110">
          {benefit.icon}
        </div>

        {/* Title */}
        <h3 className="text-base sm:text-xl font-bold text-gray-900 mb-2 sm:mb-4 group-hover:text-blue-600 transition-colors">
          {benefit.title}
        </h3>

        {/* Description - hidden on small screens */}
        <p className="hidden sm:block text-gray-600 leading-relaxed mb-4 sm:mb-6 text-sm sm:text-base">
          {benefit.description}
        </p>

        {/* Badge */}
        <div className="hidden sm:inline-flex items-center space-x-2 bg-white rounded-full px-3 py-1.5 sm:px-4 sm:py-2 border border-gray-200 transition-colors group-hover:border-blue-200">
          <div className="w-2 h-2 bg-gradient-to-r from-blue-600 to-blue-800 rounded-full animate-pulse"></div>
          <span className="text-xs sm:text-sm font-semibold text-gray-700 group-hover:text-blue-600 transition-colors">
            {benefit.badge}
          </span>
        </div>
      </div>
    </div>
  ))}
</div>


        <div className="hidden md:block mt-20 text-center">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-3xl p-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-6">Join thousands of satisfied patients</h3>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Experience the difference of modern healthcare. Start your journey to better health today.
            </p>
            <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              Start Your Consultation
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
