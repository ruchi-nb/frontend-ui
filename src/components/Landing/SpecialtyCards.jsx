"use client";

import { useState, useEffect, useRef } from "react";

const Specialties = () => {
  const [selected, setSelected] = useState(null);
  const modalRef = useRef(null);
  
  // Sample data for specialties
  const specialties = [
    {
      id: 1,
      title: "Pediatrics",
      icon: <i className="ri-parent-line"></i>,
      description: "Comprehensive healthcare for infants, children, and adolescents.",
      doctors: 52,
      gradient: "from-blue-400 to-blue-600",
      fullDescription: "Our pediatricians provide preventive care, treat childhood illnesses, and support healthy development from infancy through adolescence.",
      conditions: ["Growth Issues", "Common Colds", "Vaccinations", "Behavioral Concerns"]
    },
    {
      id: 2,
      title: "Cardiology",
      icon: <i className="ri-heart-2-fill"></i>,
      description: "Expert care for heart and cardiovascular conditions.",
      doctors: 38,
      gradient: "from-blue-400 to-blue-600",
      fullDescription: "Our cardiologists specialize in diagnosing and treating diseases of the heart and blood vessels, helping patients maintain cardiovascular health.",
      conditions: ["Heart Disease", "High Blood Pressure", "Arrhythmias", "Heart Failure"]
    },
    {
      id: 3,
      title: "Dermatology",
      icon: <i className="ri-microscope-line"></i>,
      description: "Skin, hair, and nail care from certified dermatologists.",
      doctors: 27,
      gradient: "from-blue-400 to-blue-600",
      fullDescription: "Our dermatologists diagnose and treat conditions affecting the skin, hair, and nails, providing both medical and cosmetic solutions.",
      conditions: ["Acne", "Eczema", "Psoriasis", "Skin Cancer"]
    },
    {
      id: 4,
      title: "Orthopedics",
      icon: <i className="ri-wheelchair-line"></i>,
      description: "Treatment for musculoskeletal injuries and conditions.",
      doctors: 43,
      gradient: "from-blue-400 to-blue-600",
      fullDescription: "Our orthopedic specialists focus on the diagnosis and treatment of disorders of the bones, joints, ligaments, tendons, and muscles.",
      conditions: ["Arthritis", "Fractures", "Sports Injuries", "Joint Pain"]
    },
    {
      id: 5,
      title: "Neurology",
      icon: <i className="ri-brain-line"></i>,
      description: "Expert care for brain and nervous system disorders.",
      doctors: 31,
      gradient: "from-blue-400 to-blue-600",
      fullDescription: "Our neurologists specialize in treating disorders of the nervous system, including the brain, spinal cord, nerves, and muscles.",
      conditions: ["Migraines", "Epilepsy", "Stroke", "Multiple Sclerosis"]
    },
    {
      id: 6,
      title: "Ophthalmology",
      icon: <i className="ri-eye-2-line"></i>,
      description: "Comprehensive eye care and vision services.",
      doctors: 29,
      gradient: "from-blue-400 to-blue-600",
      fullDescription: "Our ophthalmologists provide medical and surgical eye care, treating diseases and conditions affecting vision and eye health.",
      conditions: ["Cataracts", "Glaucoma", "Macular Degeneration", "Diabetic Retinopathy"]
    },
    {
      id: 7,
      title: "Psychiatry",
      icon: <i className="ri-mental-health-line"></i>,
      description: "Mental health care and psychological support.",
      doctors: 41,
      gradient: "from-blue-400 to-blue-600",
      fullDescription: "Our psychiatrists diagnose and treat mental health disorders through therapy, medication management, and other interventions.",
      conditions: ["Depression", "Anxiety", "Bipolar Disorder", "PTSD"]
    },
    {
      id: 8,
      title: "Endocrinology",
      icon: <i className="ri-flask-line"></i>,
      description: "Specialized care for hormone-related conditions.",
      doctors: 24,
      gradient: "from-blue-400 to-blue-600",
      fullDescription: "Our endocrinologists specialize in treating disorders of the endocrine system, including diabetes, thyroid issues, and hormonal imbalances.",
      conditions: ["Diabetes", "Thyroid Disorders", "Osteoporosis", "Hormonal Imbalances"]
    }
  ];

  // Intersection Observer for fade-in animation
  useEffect(() => {
    const cards = document.querySelectorAll("#specialty-cards > div");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.remove("opacity-0", "translate-y-10");
            entry.target.classList.add("opacity-100", "translate-y-0");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    cards.forEach((card) => observer.observe(card));
    
    return () => {
      cards.forEach((card) => observer.unobserve(card));
    };
  }, []);

  // Handle modal close with animation
  const closeModal = () => {
    if (modalRef.current) {
      modalRef.current.classList.remove("scale-100", "opacity-100");
      modalRef.current.classList.add("scale-95", "opacity-0");
      
      setTimeout(() => {
        setSelected(null);
      }, 300);
    }
  };

  // Handle modal open with animation
  useEffect(() => {
    if (selected && modalRef.current) {
      setTimeout(() => {
        modalRef.current.classList.remove("scale-95", "opacity-0");
        modalRef.current.classList.add("scale-100", "opacity-100");
      }, 10);
    }
  }, [selected]);

  return (
    <section id="specialties" className="py-8 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
            
            <span>Medical Specialties</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Expert Care in Every{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Specialty
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our network of board-certified specialists covers all major medical
            fields. Find the right expert for your specific health needs and get
            personalized care.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12" id="specialty-cards">
          {specialties.map((s, idx) => (
            <div
              key={s.id}
              className="group bg-white rounded-2xl p-6 shadow-md transition-all duration-300 cursor-pointer transform hover:-translate-y-2 hover:shadow-xl opacity-0 translate-y-10"
              style={{ transitionDelay: `${idx * 100}ms` }}
              onClick={() => setSelected(s)}
            >
              <div className={`w-14 h-14 bg-gradient-to-r ${s.gradient} rounded-xl flex items-center justify-center mb-4 text-2xl`}>
                {s.icon}
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                {s.title}
              </h3>
              <p className="text-gray-600 text-sm mb-4">{s.description}</p>
              <div className="flex items-center justify-between text-xs text-gray-500">
                <span>{s.doctors} doctors</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-black/40 bg-opacity-50 transition-opacity duration-300"
            onClick={closeModal}
          ></div>
          <div
            ref={modalRef}
            className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto relative z-10 transform transition-all duration-300 scale-95 opacity-0"
          >
            <div className="p-8">
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-3xl font-bold text-gray-900">{selected.title}</h2>
                <button
                  className="text-gray-400 hover:text-gray-600 text-2xl"
                  onClick={closeModal}
                >
                  &times;
                </button>
              </div>
              <p className="text-gray-600 mb-6">{selected.fullDescription}</p>
              <div className="flex space-x-6 mb-6">
                <div className="bg-blue-50 p-4 rounded-xl text-center flex-1">
                  <div className="text-2xl font-bold text-blue-700">{selected.doctors}</div>
                  <div className="text-sm text-gray-600">Available Doctors</div>
                </div>
              </div>
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Common Conditions Treated:
                </h3>
                <ul className="grid grid-cols-2 list-disc list-inside text-gray-600 space-y-1">
                  {selected.conditions.map((condition, index) => (
                    <li key={index}>{condition}</li>
                  ))}
                </ul>
              </div>
              <div className="flex space-x-4">
                <button className="bg-blue-600 text-white px-6 py-3 rounded-full font-medium hover:bg-blue-700 transition-colors">
                  Find Specialists
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Specialties;