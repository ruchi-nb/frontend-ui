"use client";

import { useEffect, useRef } from "react";

export default function SecondCTA() {
  const divRef = useRef(null);

  useEffect(() => {
    const div = divRef.current;
    if (!div) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            div.classList.remove("opacity-0", "translate-y-10");
            div.classList.add("opacity-100", "translate-y-0");
            observer.unobserve(div);
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(div);
  }, []);

  return (
    <section className="py-24 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 relative overflow-hidden">
      {/* Background Circles */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.2),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(255,255,255,0.1),transparent_50%)]" />
      </div>
      <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full animate-pulse"></div>
      <div className="absolute bottom-10 right-10 w-32 h-32 bg-white/5 rounded-full animate-bounce"></div>
      <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-white/10 rounded-full animate-ping"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div ref={divRef} className="text-center transition-all duration-1000 opacity-0 translate-y-10">
          {/* Heading */}
          <h2 className="text-4xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Ready to Transform
            <span className="block bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
              Your Healthcare?
            </span>
          </h2>

          {/* Description */}
          <p className="text-xl lg:text-2xl text-blue-100 max-w-3xl mx-auto mb-8 leading-relaxed">
            Join thousands of patients who have already discovered the convenience of modern healthcare.
            Get started in less than 2 minutes.
          </p>

          {/* CTA */}
          <div className="flex justify-center mb-12">
            <button className="group bg-white text-blue-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-50 transition-all duration-300 transform hover:scale-105 shadow-xl flex items-center space-x-3">
              <span>Log In Now</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Feature Cards */}
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-8 h-8 text-white mb-4 mx-auto"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
              </svg>
              <h3 className="text-white font-semibold mb-2">Live Chat</h3>
              <p className="text-blue-100 text-sm">Get instant answers to your questions</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-8 h-8 text-white mb-4 mx-auto"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384" />
              </svg>
              <h3 className="text-white font-semibold mb-2">Smart Health Support</h3>
              <p className="text-blue-100 text-sm">Get instant answers from your AI assistant</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-8 h-8 text-white mb-4 mx-auto"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M8 2v4" />
                <path d="M16 2v4" />
                <rect width="18" height="18" x="3" y="4" rx="2" />
                <path d="M3 10h18" />
              </svg>
              <h3 className="text-white font-semibold mb-2">Start Anytime</h3>
              <p className="text-blue-100 text-sm">Start whenever convenient for you.</p>
            </div>
          </div>

          {/* Trusted By */}
          <div className="mt-12 pt-8 border-t border-white/20">
            <p className="text-blue-100 text-sm mb-4">Trusted by leading healthcare organizations</p>
            <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
              <div className="text-white font-semibold">FDA Approved</div>
              <div className="w-1 h-1 bg-white rounded-full"></div>
              <div className="text-white font-semibold">HIPAA Compliant</div>
              <div className="w-1 h-1 bg-white rounded-full"></div>
              <div className="text-white font-semibold">ISO 27001 Certified</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
