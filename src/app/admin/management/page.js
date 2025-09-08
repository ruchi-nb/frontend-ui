import Sidebar from "@/components/Admin/Sidebar";
import HosNavbar from "@/components/Admin/Navbar";
import HospitalCards from "@/components/Admin/Management/HospitalCards";
import AddHospitalModal from "@/components/Admin/Management/ManageHeader"; 

export default function managePage(){
    return(
        <div className="flex h-screen bg-stone-50">
            <div className="h-full w-64 bg-slate-900 shadow-xl flex-shrink-0">
                <Sidebar />
            </div>
            <div className="flex-1 flex flex-col overflow-hidden">
                <HosNavbar />
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-stone-50">
                    <div className="p-6 max-w-7xl mx-auto">
                        <AddHospitalModal />
                        <HospitalCards />
                    </div>
                </main>
            </div>
        </div>
    );
}
        