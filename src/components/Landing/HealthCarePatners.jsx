"use client";

import { Sparkles, Users, Building, Medal, Heart, User } from "lucide-react";
import { useState, useEffect } from "react";

const HealthcarePartners = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    affiliation: "",
    role: "",
    specialty: "",
    message: "",
    consent: false
  });

  const [errors, setErrors] = useState({});

  // Validation functions
  const isTextValid = (value) => /^[A-Za-z\s'-]+$/.test(value);
  const isMessageValid = (value) => /^[A-Za-z0-9\s]+$/.test(value); // no symbols
  const isEmailValid = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  const isPhoneValid = (value) => /^[0-9]+$/.test(value);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    let error;
    if ((name === "name" || name === "affiliation") && value && !isTextValid(value)) {
      error = "No numbers or special characters allowed.";
    } else if (name === "message" && value && !isMessageValid(value)) {
      error = "No symbols or parentheses allowed.";
    } else if (name === "email" && value && !isEmailValid(value)) {
      error = "Enter a valid email address.";
    } else if (name === "phone" && value && !isPhoneValid(value)) {
      error = "Phone must contain only numbers.";
    }

    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    setErrors(prev => ({
      ...prev,
      [name]: error
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name || !isTextValid(formData.name)) {
      newErrors.name = "Name must not contain numbers or special characters.";
    }
    if (!formData.email || !isEmailValid(formData.email)) {
      newErrors.email = "Valid email is required.";
    }
    if (!formData.phone || !isPhoneValid(formData.phone)) {
      newErrors.phone = "Phone must contain only numbers.";
    }
    if (!formData.role) {
      newErrors.role = "Role is required.";
    }
    if (!formData.message || !isMessageValid(formData.message)) {
      newErrors.message = "Message is required and must not contain symbols or parentheses.";
    }
    if (formData.affiliation && !isTextValid(formData.affiliation)) {
      newErrors.affiliation = "Affiliation must not contain numbers or special characters.";
    }
    if (!formData.consent) {
      newErrors.consent = "Consent is required.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    alert('Thank you for your interest in MediCare! We will contact you within 24 hours.');
    setFormData({
      name: "",
      email: "",
      phone: "",
      affiliation: "",
      role: "",
      specialty: "",
      message: "",
      consent: false
    });
    setErrors({});
  };

  // Animation on scroll functionality
  useEffect(() => {
    const animateOnScroll = () => {
      const elements = document.querySelectorAll('.animate-on-scroll');
      
      elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
          const animation = element.getAttribute('data-animation');
          const delay = element.getAttribute('data-delay') || 0;
          
          setTimeout(() => {
            element.classList.add(`animate-${animation}`);
          }, delay);
        }
      });
    };

    // Initial check and add scroll event listener
    animateOnScroll();
    window.addEventListener('scroll', animateOnScroll);
    
    return () => {
      window.removeEventListener('scroll', animateOnScroll);
    };
  }, []);

  return (
    <section className="py-8 bg-gradient-to-b from-[#004dd6] to-[#101828]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16 animate-on-scroll" data-animation="fade-in-up">
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-100 to-blue-200 text-blue-800 px-4 py-1.5 rounded-full text-sm font-semibold tracking-wide mb-6">
            <Sparkles className="w-4 h-4" />
            <span className="uppercase">Join Our Network</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">Calling All <span className="bg-gradient-to-r from-[#ffd166] to-[#eba80e] bg-clip-text text-transparent">Healthcare Heroes</span></h2>
          <p className="text-xl text-[#f1f5f9] max-w-3xl mx-auto">Join thousands of doctors and healthcare institutions who are transforming patient care through our platform. Together, we're making quality healthcare accessible to everyone, everywhere.</p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <div className="space-y-8 animate-on-scroll" data-animation="fade-in-left" data-delay="300">
            <div className="space-y-6">
              <h3 className="text-3xl font-bold text-white">Why Partner With MediCare?</h3>
              <p className="text-lg text-[#f1f5f9] leading-relaxed">Be part of the healthcare revolution. Our platform empowers medical professionals to deliver exceptional care while reaching more patients than ever before.</p>
            </div>
            
            <div className="space-y-6">
              <div className="flex items-start space-x-4 group">
                <div className="w-12 h-12 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                  <Users className="w-8 h-8 text-[#d7e3f7]" />
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-white mb-2 group-hover:text-[#ffd166] transition-colors">Expand Your Reach</h4>
                  <p className="text-[#f1f5f9] leading-relaxed">Connect with thousands of patients seeking quality healthcare services.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4 group">
                <div className="w-12 h-12 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                  <Building className="w-8 h-8 text-[#d7e3f7]" />
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-white mb-2 group-hover:text-[#ffd166] transition-colors">Modern Platform</h4>
                  <p className="text-[#f1f5f9] leading-relaxed">Access cutting-edge telemedicine technology and patient management tools.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4 group">
                <div className="w-12 h-12 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                  <Medal className="w-8 h-8 text-[#d7e3f7]" />
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-white mb-2 group-hover:text-[#ffd166] transition-colors">Professional Growth</h4>
                  <p className="text-[#f1f5f9] leading-relaxed">Join a network of top-rated healthcare professionals and enhance your practice.</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-2xl p-8 shadow-lg hidden lg-block">
              <h4 className="text-lg font-semibold text-gray-900 mb-6">Join Our Growing Network</h4>
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-1">1,000+</div>
                  <div className="text-gray-600 text-sm">Active Doctors</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-1">50K+</div>
                  <div className="text-gray-600 text-sm">Patients Served</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-1">200+</div>
                  <div className="text-gray-600 text-sm">Partner Hospitals</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-1">24/7</div>
                  <div className="text-gray-600 text-sm">Support Available</div>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 hidden lg:block">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-blue-800 rounded-full px-4 flex items-center justify-center text-white font-bold">Dr</div>
                <div>
                  <p className="text-gray-700 italic mb-3">"MediCare has revolutionized my practice. I can now reach patients globally while maintaining the highest quality of care. The platform is intuitive and the support is exceptional."</p>
                  <div className="text-sm">
                    <div className="font-semibold text-gray-900">Dr. Sarah Johnson</div>
                    <div className="text-gray-600">Cardiologist, NYC Medical Center</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="animate-on-scroll" data-animation="fade-in-right" data-delay="500">
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <div className="text-center mb-8">
                <div className="w-16 h-16  flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-12 h-12 text-[#004dd6]" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Join Our Mission</h3>
                <p className="text-gray-600">Fill out the form below and we'll get back to you within 24 hours.</p>
              </div>
              
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="relative">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-user absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" aria-hidden="true">
                    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                  <input 
                    placeholder="Full Name" 
                    className={`w-full pl-10 pr-4 py-3 border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:border-blue-500 transition-colors text-gray-600`} 
                    required 
                    type="text" 
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                  />
                  {errors.name && <span className="text-red-500 text-xs absolute left-0 -bottom-5">{errors.name}</span>}
                </div>
                
                <div className="relative">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-mail absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" aria-hidden="true">
                    <path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7"></path>
                    <rect x="2" y="4" width="20" height="16" rx="2"></rect>
                  </svg>
                  <input 
                    placeholder="Email Address" 
                    className={`w-full pl-10 pr-4 py-3 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:border-blue-500 transition-colors text-gray-600`} 
                    required 
                    type="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                  {errors.email && <span className="text-red-500 text-xs absolute left-0 -bottom-5">{errors.email}</span>}
                </div>
                
                <div className="relative">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-phone absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" aria-hidden="true">
                    <path d="M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384"></path>
                  </svg>
                  <input 
                    placeholder="Phone Number" 
                    className={`w-full pl-10 pr-4 py-3 border ${errors.phone ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:border-blue-500 transition-colors text-gray-600`} 
                    required 
                    type="tel" 
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                  />
                  {errors.phone && <span className="text-red-500 text-xs absolute left-0 -bottom-5">{errors.phone}</span>}
                </div>
                
                <div className="relative">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-building absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" aria-hidden="true">
                    <rect width="16" height="20" x="4" y="2" rx="2" ry="2"></rect>
                    <path d="M9 22v-4h6v4"></path>
                    <path d="M8 6h.01"></path>
                    <path d="M16 6h.01"></path>
                    <path d="M12 6h.01"></path>
                    <path d="M12 10h.01"></path>
                    <path d="M12 14h.01"></path>
                    <path d="M16 10h.01"></path>
                    <path d="M16 14h.01"></path>
                    <path d="M8 10h.01"></path>
                    <path d="M8 14h.01"></path>
                  </svg>
                  <input 
                    placeholder="Hospital/Clinic Affiliation" 
                    className={`w-full pl-10 pr-4 py-3 border ${errors.affiliation ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:border-blue-500 transition-colors text-gray-600`} 
                    required 
                    type="text" 
                    name="affiliation"
                    value={formData.affiliation}
                    onChange={handleInputChange}
                  />
                  {errors.affiliation && <span className="text-red-500 text-xs absolute left-0 -bottom-5">{errors.affiliation}</span>}
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <select 
                      name="role" 
                      className={`w-full px-4 py-3 border ${errors.role ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:border-blue-500 transition-colors text-gray-600`} 
                      required
                      value={formData.role}
                      onChange={handleInputChange}
                    >
                      <option value="">Select Role *</option>
                      <option value="doctor">Doctor</option>
                      <option value="hospital-administrator">Hospital Administrator</option>
                    </select>
                    {errors.role && <span className="text-red-500 text-xs">{errors.role}</span>}
                  </div>
                  
                  <div className="relative">
                    <select 
                      name="specialty" 
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition-colors text-gray-600 pr-10"
                      value={formData.specialty}
                      onChange={handleInputChange}
                    >
                      <option value="">Select Specialty </option>
                      <option value="cardiology">Cardiology</option>
                      <option value="neurology">Neurology</option>
                      <option value="ophthalmology">Ophthalmology</option>
                      <option value="orthopedics">Orthopedics</option>
                      <option value="pediatrics">Pediatrics</option>
                      <option value="internal-medicine">Internal Medicine</option>
                      <option value="psychiatry">Psychiatry</option>
                      <option value="emergency-medicine">Emergency Medicine</option>
                      <option value="other">Other</option>
                    </select>
                    <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xs text-gray-400 bg-white px-1">
                      Optional
                    </span>
                  </div>
                </div>
                
                <div className="relative">
                  <textarea 
                    name="message" 
                    placeholder="Tell us about your interest in joining MediCare and how you'd like to contribute to our mission..." 
                    rows="4" 
                    className={`w-full px-4 py-3 border ${errors.message ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:border-blue-500 transition-colors resize-none text-gray-600`}
                    value={formData.message}
                    onChange={handleInputChange}
                  ></textarea>
                  {errors.message && <span className="text-red-500 text-xs absolute left-0 -bottom-5">{errors.message}</span>}
                </div>
                
                <div className="flex items-start space-x-2">
                  <input 
                    className="mt-1" 
                    required 
                    type="checkbox" 
                    name="consent"
                    checked={formData.consent}
                    onChange={handleInputChange}
                  />
                  <span className="text-sm text-gray-600">I agree to be contacted by MediCare regarding partnership opportunities and confirm that all provided information is accurate.</span>
                </div>
                {errors.consent && <span className="text-red-500 text-xs">{errors.consent}</span>}
                
                <button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2">
                  <span>Submit Application</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-right w-5 h-5" aria-hidden="true">
                    <path d="M5 12h14"></path>
                    <path d="m12 5 7 7-7 7"></path>
                  </svg>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HealthcarePartners;