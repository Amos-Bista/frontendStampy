import { Routes, Route } from "react-router-dom";
import Dashboard from "../pages/dashboard";
import OfferQR from "../pages/offerQR";
import ClaimStamp from "../pages/claimStamp";
import CustomerAuth from "../pages/customerAuth";
import CustomerDashboard from "../pages/customersDashboard";
import MobileResponsiveAuth from "../pages/businessLogin";
import ProtectedRouteBusiness from "../component/layout/protectedRoutebusiness";
import Home from "../pages/home";
import Test from "../pages/test";
import SuperAdminPage from "../pages/superAdminPage";
import SuperAdminProtectedRoute from "../component/layout/superAdminProtectedRoute";
import SuperAdminLayout from "../pages/superAdminLayout.tsx";

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/signin" element={<MobileResponsiveAuth />} />
            <Route path="/superAdmin" element={<SuperAdminPage />} />

            <Route element={<ProtectedRouteBusiness />}>
                <Route path="/dashboard/:id" element={<Dashboard />} />
                <Route path="/OfferQR/:businessId/:offerId" element={<OfferQR />} />

            </Route>

            <Route path="/superadmin/dashboard" element={<SuperAdminLayout />} />
            <Route element={<SuperAdminProtectedRoute />}>

            </Route>



            {/* SuperAdmin */}


            {/* <Route path="/dashboard/:id" element={<Dashboard />} /> */}
            {/* <Route path="/OfferQR/:businessId/:offerId" element={<OfferQR />} /> */}

            <Route path="/" element={<Home />} />
            <Route path="/test" element={<Test />} />

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