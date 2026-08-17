import { Navigate, Outlet } from "react-router-dom";

const ProtectedRouteBusiness = () => {
    const businessId = localStorage.getItem("businessId");
    const authToken = localStorage.getItem("authToken");

    if (!businessId || !authToken) {
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
};

export default ProtectedRouteBusiness;