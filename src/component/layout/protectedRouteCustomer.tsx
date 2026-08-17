import { Navigate, Outlet } from "react-router-dom";

const ProtectedRouteCustomer = () => {
    const customerId = localStorage.getItem("customerId");
    const authToken = localStorage.getItem("authToken");

    if (!customerId || !authToken) {
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
};

export default ProtectedRouteCustomer;