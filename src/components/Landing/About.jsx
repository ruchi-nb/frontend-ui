"use client";

import React, { useState, useEffect } from 'react';

const AboutSection = () => {
  const [isVisible, setIsVisible] = useState({
    aboutSection: false,
    aboutSection2: false,
    aboutSection3: false,
    aboutSection4: false
  });

  useEffect(() => {
    // Simulate animation triggers on component mount
    const timer1 = setTimeout(() => {
      setIsVisible(prev => ({ ...prev, aboutSection: true }));
    }, 100);
    
    const timer2 = setTimeout(() => {
      setIsVisible(prev => ({ ...prev, aboutSection2: true }));
    }, 300);
    
    const timer3 = setTimeout(() => {
      setIsVisible(prev => ({ ...prev, aboutSection3: true }));
    }, 500);
    
    const timer4 = setTimeout(() => {
      setIsVisible(prev => ({ ...prev, aboutSection4: true }));
    }, 700);
    
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, []);

  // Carousel data
  const carouselItems = [
  { id: 1, name: "HealthVision", icon: <i className="ri-first-aid-kit-line"></i> },
  { id: 2, name: "MediTech", icon: <i className="ri-stethoscope-line"></i> },
  { id: 3, name: "CarePlus", icon: <i className="ri-medicine-bottle-line"></i> },
  { id: 4, name: "HealthPlus", icon: <i className="ri-heart-pulse-line"></i> },
  { id: 5, name: "BioLife", icon: <i className="ri-hospital-line"></i> },
  { id: 6, name: "Wellness Corp", icon: <i className="ri-syringe-line"></i> },
];

  const [currentCarouselIndex, setCurrentCarouselIndex] = useState(0);

  useEffect(() => {
    const carouselTimer = setInterval(() => {
      setCurrentCarouselIndex(prev => (prev + 1) % carouselItems.length);
    }, 3000);
    
    return () => clearInterval(carouselTimer);
  }, [carouselItems.length]);

  return (
    <section className="pt-8 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Top Heading */}
        <div
          id="aboutSection"
          className={`text-center mb-16 transition-all duration-1000 ${
            isVisible.aboutSection
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          }`}
        >
          <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <span>About MediCare</span>
          </div>

          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Revolutionizing{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Healthcare
            </span>
          </h2>

          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We're on a mission to make quality healthcare accessible to
            everyone, everywhere. Through innovative technology and
            compassionate care, we're building the future of medicine.
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-10">
          {/* Left Content */}
          <div
            id="aboutSection2"
            className={`space-y-8 transition-all duration-1000 ${
              isVisible.aboutSection2
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-10"
            }`}
          >
            <div className="space-y-6">
              <h3 className="text-3xl font-bold text-gray-900">
                Leading the Digital Health Revolution
              </h3>
              <p className="text-lg text-gray-600 leading-relaxed">
                Founded in 2020, MediCare has grown from a small startup to a
                trusted healthcare platform serving patients worldwide. Our team
                of medical professionals, engineers, and designers work together
                to create seamless healthcare experiences.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                We believe that everyone deserves access to quality healthcare,
                regardless of location, time, or circumstances. That's why we've
                built a platform that connects patients with top-tier medical
                professionals instantly.
              </p>
            </div>

            {/* Bullet Points */}
            <div className="hidden lg:block space-y-4">
              {[
                {
                  title: "Accessible Healthcare",
                  desc: "Breaking down barriers to quality medical care for everyone.",
                },
                {
                  title: "Innovation First",
                  desc: "Leveraging cutting-edge technology to improve patient outcomes.",
                },
                {
                  title: "Patient-Centered",
                  desc: "Every decision we make puts patient needs and experience first.",
                },
              ].map((item, idx) => (
                <div key={idx} className="flex items-start space-x-4">
                  <div className="w-6 h-6 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">
                      {item.title}
                    </h4>
                    <p className="text-gray-600">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Content - Stats Cards */}
          <div className="grid grid-cols-2 gap-6">
            {/* 24/7 Support Card */}
            <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg flex items-center justify-center">
                  <span className="text-white text-lg"><i className="ri-shield-cross-line"></i></span>
                </div>
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">24/7</div>
              <div className="text-gray-600 text-sm">Available Support</div>
            </div>

            {/* Uptime Guarantee Card */}
            <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg flex items-center justify-center">
                  <span className="text-white text-lg"><i className="ri-flashlight-line"></i></span>
                </div>
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">99.9%</div>
              <div className="text-gray-600 text-sm">Uptime Guarantee</div>
            </div>

            {/* Happy Patients Card */}
            <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg flex items-center justify-center">
                  <span className="text-white text-lg"><i className="ri-user-smile-line"></i></span>
                </div>
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">50,000+</div>
              <div className="text-gray-600 text-sm">Happy Patients</div>
            </div>

            {/* Expert Doctors Card */}
            <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg flex items-center justify-center">
                  <span className="text-white text-lg"><i className="ri-nurse-line"></i></span>
                </div>
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">1,000+</div>
              <div className="text-gray-600 text-sm">Expert Doctors</div>
            </div>
            {/* Trusted Organizations Section - Full width spanning both columns */}
            <div
  id="aboutSection3"
  className={`col-span-2 bg-white rounded-2xl p-8 shadow-lg mb-20 transition-all duration-1000 ${
    isVisible.aboutSection3
      ? "opacity-100 translate-y-0"
      : "opacity-0 translate-y-10"
  }`}
>
  <h4 className="text-lg font-semibold text-gray-900 mb-6 text-center">
    Trusted by Leading Organizations
  </h4>

  <div className="flex flex-col items-center justify-center h-32">
    <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl flex items-center justify-center text-3xl mb-3">
      {carouselItems[currentCarouselIndex].icon}
    </div>
    <span className="text-lg font-semibold text-gray-700 text-center">
      {carouselItems[currentCarouselIndex].name}
    </span>
  </div>

  <div className="flex justify-center mt-6">
    {carouselItems.map((_, index) => (
      <button
        key={index}
        className={`w-3 h-3 rounded-full mx-1 transition-all duration-300 ${
          index === currentCarouselIndex
            ? "bg-blue-600"
            : "bg-gray-300 hover:bg-gray-400"
        }`}
        onClick={() => setCurrentCarouselIndex(index)}
        aria-label={`Go to ${carouselItems[index].name}`}
      />
    ))}
  </div>
</div>

          </div>
        </div>
        
      </div>
    </section>
  );
};

export default AboutSection;