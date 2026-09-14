import { useState } from 'react'
import SuperAdminSidebar from '../component/layout/sidebarSuperAdmin'
import Header from '../component/layout/header'
import SuperAdminMobileSidebar from '../component/layout/superAdminMobileSidebar';

const SuperAdminLayout = () => {
    const [open, setOpen] = useState(false);

    return (
        <div>
            <div className="flex h-screen bg-gray-50">

                <SuperAdminSidebar />

                <SuperAdminMobileSidebar
                    open={open}
                    onClose={() => setOpen(false)}
                />

                <div className="flex flex-1 flex-col overflow-hidden">

                    <Header
                        onMenuClick={() => setOpen(true)}
                    />

                    {/* <main className="flex-1 overflow-y-auto p-6"> */}

                    {/* <Outlet /> */}
                    {/* {<SuperAdminLayout />} */}


                    {/* </main> */}

                </div>

            </div ></div>
    )
}

export default SuperAdminLayout