import { Navigate, Outlet } from "react-router-dom";

const SuperAdminProtectedRoute = () => {
    const superAdminToken = localStorage.getItem("superAdminToken");
    const superAdmin = localStorage.getItem("superAdmin");


    if (!superAdminToken || !superAdmin) {
        return <Navigate to="/superadmin" replace />;
    }



    return <Outlet />;
};

export default SuperAdminProtectedRoute;