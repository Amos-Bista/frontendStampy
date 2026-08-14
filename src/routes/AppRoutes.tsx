import { Routes, Route } from "react-router-dom";
import Dashboard from "../pages/dashboard";
import OfferQR from "../pages/offerQR";
import ClaimStamp from "../pages/claimStamp";
import CustomerAuth from "../pages/customerAuth";
import CustomerDashboard from "../pages/customersDashboard";

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/OfferQR/:businessId/:offerId" element={<OfferQR />} />


            <Route path="/stamp/:businessId/:offerId" element={<ClaimStamp />} />
            <Route path="/login" element={<CustomerAuth />} />
            <Route path="/customer/dashboard/:customerId" element={<CustomerDashboard />} />            {/* Redirect root ("/") to "/dashboard" */}
            {/* <Route path="/" element={<Navigate to="/dashboard" replace />} /> */}

            {/* Dashboard Route */}

            {/* Optional: Redirect any unknown routes to "/dashboard" */}
            {/* <Route path="*" element={<Navigate to="/dashboard" replace />} /> */}
        </Routes>
    );
};

export default AppRoutes;