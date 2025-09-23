// File: app/patientportal/layout.jsx
"use client";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Landing/Navbar";
import Footer from "@/components/Landing/Footer";

const portalNavItems = [
  { type: "link", path: "/patientportal", label: "Home" },
  { type: "link", path: "/patientportal/mydoctors", label: "My Doctors" },
  { type: "link", path: "/patientportal/settings", label: "Settings" },
  { type: "logout", label: "Logout", variant: "outline", color: "red" },
];


export default function PatientPortalLayout({ children }) {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    router.push("/");
  };

  return (
    <div>
      <Navbar 
        onLogout={handleLogout} 
        navItems={portalNavItems} 
      />
      <main>{children}</main>
      <Footer />
    </div>
  );
}