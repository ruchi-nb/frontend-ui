// frontend-ui/src/app/page.js
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
    router.push("/doctorportal"); // redirect to doctor portal
  };

  return (
    <LandingPage
      onLogin={handleLogin}
      onRegisterDoctor={handleDoctorRegister} // pass the new prop
    />
  );
}
