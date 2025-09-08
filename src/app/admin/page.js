import Sidebar from "@/components/Admin/Sidebar";
import HosNavbar from "@/components/Admin/Navbar";
import DashboardHeader from "@/components/Admin/Dashboard/DashHeader";
import Overview from "@/components/Admin/Dashboard/Overview";
import HospitalList from "@/components/Admin/Dashboard/HospitalList";

export default function adminDashPage(){
    return(
        <div className="flex h-screen bg-stone-50">
            <div className="h-full w-64 bg-slate-900 shadow-xl flex-shrink-0">
                <Sidebar />
            </div>
            <div className="flex-1 flex flex-col overflow-hidden">
                <HosNavbar />
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-stone-50">
                    <div className="p-6 max-w-7xl mx-auto">
                        <DashboardHeader />
                        <Overview />
                        <HospitalList />
                    </div>
                </main>
            </div>
        </div>
    );
}
        