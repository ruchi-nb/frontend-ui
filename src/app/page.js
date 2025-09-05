// "use client";

// import { useRouter } from "next/navigation";
// import LandingPage from "./landing/page";

// export default function Home() {
//   const router = useRouter();

//   const handleLogin = () => {
//     // Optional: store login state
//     localStorage.setItem("isLoggedIn", "true");

//     // Redirect to patient portal
//     router.push("/patientportal");
//   };

//   return <LandingPage onLogin={handleLogin} />;
// }

// src/app/page.js
"use client";

import { useRouter } from "next/navigation";
import LandingPage from "./landing/page";

export default function Home() {
  const router = useRouter();

  // Existing patient login
  const handleLogin = () => {
    localStorage.setItem("isLoggedIn", "true"); // store login state
    router.push("/patientportal"); // redirect to patient portal
  };

  // New doctor registration/login button
  const handleDoctorRegister = () => {
    localStorage.setItem("isDoctor", "true"); // optional flag for doctor
    router.push("/doctorportal"); // redirect to doctor portal
  };

  return (
    <LandingPage
      onLogin={handleLogin}
      onRegisterDoctor={handleDoctorRegister} // pass the new prop
    />
  );
}
