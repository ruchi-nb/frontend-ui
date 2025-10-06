import HosSidebar from "@/components/Hospital/Sidebar";
import HosNavbar from "@/components/Hospital/Navbar";
import DashboardHeader from'@/components/Hospital/Dashboard/DashHeader';
import SubscriptionOverview from '@/components/Hospital/Dashboard/SubsOverview';
import UsageAlerts from '@/components/Hospital/Dashboard/Usage';
import Dashboard from "@/components/Hospital/Dashboard/Summary";
import Footer from "@/components/Landing/Footer";

export default function Navbar(){
    return(
        <div className="flex h-screen bg-[#E6EEF8]">
            <div className="h-full w-64 bg-slate-900 shadow-xl flex-shrink-0">
                <HosSidebar />
            </div>
            <div className="flex-1 flex flex-col overflow-hidden">
                <HosNavbar />
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-[#E6EEF8]">
                    <div className="relative z-10 p-6 max-w-7xl mx-auto">
                        <div className="mb-8"><DashboardHeader /></div>
                        <div className="mb-8"><SubscriptionOverview /></div>                    
                        <div className="mb-8"><UsageAlerts /></div>
                        <div className="mb-8"><Dashboard /></div>
                    </div>
                    <Footer />
                </main>
            </div>
        </div>
    );
}