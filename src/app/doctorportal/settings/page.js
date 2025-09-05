"use client";

import { useState } from "react";
import Layout from "./Layout";
import SettingsHeader from "@/components/DoctorPortal/settings/SettingHeader";
import ProfileInformation from "@/components/DoctorPortal/settings/ProfileInformation";
import AddressInformation from "@/components/DoctorPortal/settings/AddressInformation";
import VoiceSamples from "@/components/DoctorPortal/settings/VoiceSamples";

export default function SettingsPage() {
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = () => {
    // Add your save logic here (API calls, etc.)
    console.log("Saving changes...");
    setIsEditing(false);
  };

  const handleCancel = () => {
    // Add any cancel logic here (reset form fields, etc.)
    console.log("Canceling edits...");
    setIsEditing(false);
  };

  return (
    <Layout>
      <SettingsHeader 
        isEditing={isEditing}
        setIsEditing={setIsEditing}
        onSave={handleSave}
        onCancel={handleCancel}
      />
      <ProfileInformation isEditing={isEditing} />
      <AddressInformation isEditing={isEditing} />
      <VoiceSamples isEditing={isEditing} />
    </Layout>
  );
}