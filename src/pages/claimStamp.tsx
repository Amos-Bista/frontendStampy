import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export default function ClaimStamp() {
    const { businessId, offerId } = useParams<{ businessId: string; offerId: string }>();
    const navigate = useNavigate();
    const [status, setStatus] = useState("Checking authentication...");

    // 🔴 GUARD LOCK: Prevents React StrictMode from executing useEffect twice
    const hasClaimedRef = useRef(false);

    useEffect(() => {
        // If already triggered once, exit immediately
        if (hasClaimedRef.current) return;

        const token = localStorage.getItem("token");
        const customerId = localStorage.getItem("customerId");
        const currentPath = `/stamp/${businessId}/${offerId}`;

        // 1. Redirect to login if unauthenticated
        if (!token) {
            setStatus("Redirecting to login...");
            navigate(`/login?redirect=${encodeURIComponent(currentPath)}`, { replace: true });
            return;
        }

        // 2. Claim stamp via API
        async function processStampClaim() {
            // Lock immediately before making the API request
            hasClaimedRef.current = true;

            try {
                setStatus("Claiming your stamp...");

                const activeCustomerId = customerId && customerId !== "undefined" ? customerId : "";

                const response = await axios.post(
                    `${API_URL}/api/v1/stamps/claim/${businessId}/${activeCustomerId}/${offerId}`,
                    {
                        businessId,
                        offerId,
                        customerId: activeCustomerId
                    },
                    { headers: { Authorization: `Bearer ${token}` } }
                );

                const targetCustomerId =
                    response.data?.customerId ||
                    response.data?.data?.customerId ||
                    activeCustomerId;

                // Redirect to user-specific dashboard
                navigate(`/customer/dashboard/${targetCustomerId}`, {
                    state: { successMessage: "Stamp added successfully! 🎉" },
                    replace: true,
                });
            } catch (err: any) {
                console.error("Stamp claim error:", err);
                const targetCustomerId = customerId || "";

                navigate(`/customer/dashboard/${targetCustomerId}`, {
                    state: { errorMessage: err.response?.data?.message || "Failed to claim stamp." },
                    replace: true,
                });
            }
        }

        if (businessId && offerId) {
            processStampClaim();
        }
    }, [businessId, offerId, navigate]);

    return (
        <div className="flex h-screen flex-col items-center justify-center bg-gray-50 p-4 dark:bg-gray-900">
            <div className="flex flex-col items-center gap-4 rounded-2xl bg-white p-8 shadow-xl dark:bg-gray-800">
                <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />
                <p className="text-sm font-medium text-gray-700 dark:text-gray-200">{status}</p>
            </div>
        </div>
    );
}