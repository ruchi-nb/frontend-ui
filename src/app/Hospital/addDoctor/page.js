'use client';
import HosSidebar from "@/components/Hospital/Sidebar";
import FormHeader from "@/components/Hospital/form/FormHeader";
import DoctorForm from "@/components/Hospital/form/DoctorForm";

export default function Page2() {
    return (
        <div className="flex h-screen bg-[#E6EEF8]">
        <div className="h-full w-[17rem] flex-shrink-0">
            <HosSidebar />
        </div>
        <div className="flex-1 flex flex-col overflow-hidden">
            <main className="flex-1 overflow-x-hidden overflow-y-auto ">
                <div className="p-6 max-w-4xl mx-auto">
                    <FormHeader />
                    <DoctorForm />
                </div>
            </main>
        </div>
        </div>
  );
}