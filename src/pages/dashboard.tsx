import { useState } from "react";
import Sidebar from "../component/layout/Sidebar";
import MobileSidebar from "../component/layout/mobilesidebar";
import Header from "../component/layout/header";
import BusinessHome from "../component/business/businessHome";


const DashboardLayout = () => {

    const [open, setOpen] = useState(false);


    return (
        <div className="flex h-screen bg-gray-50">

            <Sidebar />

            <MobileSidebar
                open={open}
                onClose={() => setOpen(false)}
            />

            <div className="flex flex-1 flex-col overflow-hidden">

                <Header
                    onMenuClick={() => setOpen(true)}
                />

                <main className="flex-1 overflow-y-auto p-6">

                    {/* <Outlet /> */}
                    <BusinessHome />


                </main>

            </div>

        </div >

    );
};

export default DashboardLayout;