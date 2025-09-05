// File: app/patientportal/layout.jsx
"use client";
import Navbar from "@/components/PatientPortal/Navbar";
import { useRouter } from "next/navigation";

export default function PatientPortalLayout({ children }) {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    router.push("/");
  };

  return (
    <div>
      <Navbar onLogout={handleLogout} />
      <main>{children}</main>
    </div>
  );
}