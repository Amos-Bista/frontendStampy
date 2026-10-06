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
import DashboardSuperAdmin from "../pages/superAdmin/dashboardSuperAdmin.tsx";
import FeaturesPageSuperAdmin from "../pages/superAdmin/featuresPageSuperAdmin.tsx";
import BillingcyclePageSuperAdmin from "../pages/superAdmin/billingcyclePageSuperAdmin.tsx";
import ResoucesPage from "../pages/superAdmin/resoucesPage.tsx";
import SubscriptionPage from "../pages/superAdmin/subscriptionPage.tsx";
import DashboardLayout from "../pages/dashboard";
import BusinessHome from "../component/business/businessHome.tsx";

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/signin" element={<MobileResponsiveAuth />} />
            <Route path="/super-admin" element={<SuperAdminPage />} />

            {/* Bussiness */}
            <Route element={<ProtectedRouteBusiness />}>
                < Route path="/admin/" element={<DashboardLayout />} >
                    <Route path="dashboard/:id" element={<BusinessHome />} />
                    <Route path="OfferQR/:businessId/:offerId" element={<OfferQR />} />
                </Route>
            </Route>

            {/* SuperAdmin */}
            <Route element={<SuperAdminProtectedRoute />}>
                <Route path="/superadmin/" element={<SuperAdminLayout />}>
                    <Route path="dashboard" element={<DashboardSuperAdmin />} />
                    <Route path="features" element={<FeaturesPageSuperAdmin />} />
                    <Route path="billingcycle" element={<BillingcyclePageSuperAdmin />} />
                    <Route path="resources" element={<ResoucesPage />} />
                    <Route path="subscription" element={<SubscriptionPage />} />
                </Route>
            </Route>

            <Route path="/" element={<Home />} />
            <Route path="/test" element={<Test />} />
            <Route path="/stamp/:businessId/:offerId" element={<ClaimStamp />} />
            <Route path="/login" element={<CustomerAuth />} />
            <Route path="/customer/dashboard/:customerId" element={<CustomerDashboard />} />            {/* Redirect root ("/") to "/dashboard" */}
        </Routes>
    );
};

export default AppRoutes;