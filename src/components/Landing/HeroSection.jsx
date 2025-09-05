"use client";

import { useEffect, useRef } from "react";

export default function HeroSection() {
  const heroRef = useRef(null);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            hero.classList.add("opacity-100", "translate-y-0");
            hero.classList.remove("opacity-0", "translate-y-10");
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative z-10 max-w-7xl mx-auto px-6 pt-20 pb-32 opacity-0 translate-y-10 transition-all duration-1000"
    >
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        {/* Left Content */}
        <div className="space-y-8">
          <div className="space-y-6">
            {/* Badge */}
            <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="lucide lucide-calendar w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M8 2v4"></path>
                <path d="M16 2v4"></path>
                <rect width="18" height="18" x="3" y="4" rx="2"></rect>
                <path d="M3 10h18"></path>
              </svg>
              <span>Get consultations instantly</span>
            </div>

            {/* Heading */}
            <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              Healthcare
              <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Made Simple
              </span>
            </h1>

            {/* Subtext */}
            <p className="text-xl text-gray-600 leading-relaxed max-w-lg">
              Connect with top-rated doctors instantly. Get expert medical
              advice, prescriptions, and care plans from the comfort of your
              home.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="group bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2">
              <span>Start Consultation</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="lucide lucide-arrow-right w-5 h-5 group-hover:translate-x-1 transition-transform"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14"></path>
                <path d="m12 5 7 7-7 7"></path>
              </svg>
            </button>
            <button className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-full font-semibold text-lg hover:border-blue-600 hover:text-blue-600 transition-all duration-300">
              Learn More
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 pt-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900">50K+</div>
              <div className="text-gray-600 text-sm">Happy Patients</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900">1000+</div>
              <div className="text-gray-600 text-sm">Expert Doctors</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900">24/7</div>
              <div className="text-gray-600 text-sm">Available</div>
            </div>
          </div>
        </div>

        {/* Right Content - Doctor Card */}
        <div className="relative transition-all duration-1000 delay-300 opacity-100 translate-y-0">
          <div className="relative bg-gradient-to-br from-blue-100 to-purple-100 rounded-3xl p-8 shadow-2xl">
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              {/* Doctor Info */}
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="lucide lucide-shield w-6 h-6 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Dr. Sarah Johnson</h3>
                  <p className="text-gray-600 text-sm">Cardiologist</p>
                </div>
              </div>

              {/* Availability */}
              <div className="space-y-4">
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="lucide lucide-clock w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 6v6l4 2"></path>
                    <circle cx="12" cy="12" r="10"></circle>
                  </svg>
                  <span>Available now</span>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-700">
                    "Ready to help with your health concerns. Let's discuss your
                    symptoms and create a treatment plan."
                  </p>
                </div>
                <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-medium hover:shadow-lg transition-all">
                  Start Video Call
                </button>
              </div>
            </div>
          </div>

          {/* Floating Icons */}
          <div className="absolute -top-4 -right-4 bg-white rounded-full p-3 shadow-lg animate-bounce">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="lucide lucide-calendar w-6 h-6 text-blue-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M8 2v4"></path>
              <path d="M16 2v4"></path>
              <rect width="18" height="18" x="3" y="4" rx="2"></rect>
              <path d="M3 10h18"></path>
            </svg>
          </div>
          <div className="absolute -bottom-4 -left-4 bg-white rounded-full p-3 shadow-lg animate-pulse">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="lucide lucide-shield w-6 h-6 text-purple-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
