"use client";

import { useRouter } from "next/navigation";
import LandingPage from "./landing/page";
import { GoogleLogin } from "@react-oauth/google";
import { loginWithGoogle } from "@/data/api";

export default function Home() {
  const router = useRouter();

  const handleLogin = () => {
    localStorage.setItem("isLoggedIn", "true");
    router.push("/patientportal");
  };

  const handleDoctorRegister = () => {
    router.push("/doctorportal");
  };

  const handleGoogleLoginSuccess = async (credentialResponse) => {
    try {
      const idToken = credentialResponse.credential; // Google JWT
      await loginWithGoogle(idToken); // send to backend and store tokens
      localStorage.setItem("isLoggedIn", "true");
      router.push("/patientportal");
    } catch (err) {
      console.error("Google login failed", err);
    }
  };

  return (
    <LandingPage
      onLogin={handleLogin}
      onRegisterDoctor={handleDoctorRegister}
      googleLoginButton={
        <GoogleLogin
          onSuccess={handleGoogleLoginSuccess}
          onError={() => console.error("Login Failed")}
        />
      }
    />
  );
}
