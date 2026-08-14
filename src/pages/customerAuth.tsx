import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export default function CustomerAuth() {
    const [phone, setPhoneNumber] = useState("");
    const [otp, setOtp] = useState("");
    const [step, setStep] = useState<"PHONE" | "OTP">("PHONE");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Stores OTP received from API to display on top banner
    const [displayOtp, setDisplayOtp] = useState<string | null>(null);

    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const redirectUrl = searchParams.get("redirect");

    // 1. Send OTP Request
    const handleSendOtp = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!phone) return setError("Please enter a valid phone number");

        try {
            setLoading(true);
            setError(null);

            const response = await axios.post(
                `${API_URL}/api/v1/auth/send-otp`,
                { phone }, // ⚠️ Check if backend schema expects "phone" or "phone"
                {
                    headers: {
                        "Content-Type": "application/json", // Explicit JSON Header
                    },
                }
            );

            const generatedOtp =
                response.data?.data?.otp || response.data?.otp || "123456";

            setDisplayOtp(generatedOtp);
            setStep("OTP");
        } catch (err: any) {
            console.error(err);
            setError(err.response?.data?.message || "Failed to send OTP. Try again.");
        } finally {
            setLoading(false);
        }
    };

    // 2. Verify OTP Request
    const handleVerifyOtp = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!otp) return setError("Please enter the OTP");

        try {
            setLoading(true);
            setError(null);

            const response = await axios.post(`${API_URL}/api/v1/auth/verify-otp`, {
                phone,
                otp,
            });

            // Save Auth Token
            const resData = response.data?.data || response.data;
            // console.log("OTP Verification Response:", resData);
            const token = resData?.token;
            const customerId = resData?.customer?._id;

            // console.log("customerId After otp verification:", customerId);
            if (token) {
                localStorage.setItem("token", token);
                localStorage.setItem("customerId", customerId);
            }

            // If came from scanning QR Code, go back to claim-stamp route; otherwise go to Dashboard
            if (redirectUrl) {
                navigate(redirectUrl, { replace: true });
            } else {
                navigate(`/customer/dashboard/${customerId}`, { replace: true });
            }
        } catch (err: any) {
            console.error(err);
            setError(err.response?.data?.message || "Invalid OTP. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="relative flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4 dark:bg-gray-900">

            {/* ================= TOP OTP BANNER ================= */}
            {displayOtp && (
                <div className="fixed top-4 left-1/2 z-50 w-full max-w-md -translate-x-1/2 px-4">
                    <div className="flex items-center justify-between rounded-xl border border-amber-200 bg-amber-50 p-4 text-amber-900 shadow-lg dark:border-amber-800 dark:bg-amber-950 dark:text-amber-200">
                        <div className="flex items-center gap-2">
                            <span className="text-xl">🔑</span>
                            <div>
                                <p className="text-xs font-semibold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                                    Dev Mode OTP
                                </p>
                                <p className="text-lg font-mono font-bold tracking-widest">
                                    {displayOtp}
                                </p>
                            </div>
                        </div>
                        <button
                            onClick={() => {
                                setOtp(displayOtp);
                            }}
                            className="rounded-lg bg-amber-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-amber-700 active:scale-95"
                        >
                            Auto Fill
                        </button>
                    </div>
                </div>
            )}

            {/* Main Form Container */}
            <div className="w-full max-w-md rounded-2xl border border-gray-100 bg-white p-8 shadow-xl dark:border-gray-800 dark:bg-gray-800">
                <h2 className="text-center text-2xl font-bold text-gray-900 dark:text-white">
                    {step === "PHONE" ? "Welcome" : "Enter Verification Code"}
                </h2>
                <p className="mt-1 text-center text-sm text-gray-500 dark:text-gray-400">
                    {step === "PHONE"
                        ? "Enter your phone number to sign in or register"
                        : `Code sent to ${phone}`}
                </p>

                {error && (
                    <div className="mt-4 rounded-lg bg-rose-50 p-3 text-center text-xs font-medium text-rose-600 dark:bg-rose-950/50 dark:text-rose-400">
                        {error}
                    </div>
                )}

                {/* STEP 1: Phone Input Form */}
                {step === "PHONE" && (
                    <form onSubmit={handleSendOtp} className="mt-6 space-y-4">
                        <div>
                            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500">
                                Phone Number
                            </label>
                            <input
                                type="tel"
                                value={phone}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                                placeholder="+1 234 567 8900"
                                required
                                className="mt-1 w-full rounded-xl border border-gray-200 px-4 py-3 text-gray-900 outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="flex w-full items-center justify-center rounded-xl bg-blue-600 py-3 text-sm font-semibold text-white transition-all hover:bg-blue-700 active:scale-95 disabled:opacity-50"
                        >
                            {loading ? (
                                <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                            ) : (
                                "Send OTP"
                            )}
                        </button>
                    </form>
                )}

                {/* STEP 2: OTP Input Form */}
                {step === "OTP" && (
                    <form onSubmit={handleVerifyOtp} className="mt-6 space-y-4">
                        <div>
                            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500">
                                Enter 6-Digit OTP
                            </label>
                            <input
                                type="text"
                                maxLength={6}
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                                placeholder="123456"
                                required
                                className="mt-1 w-full rounded-xl border border-gray-200 px-4 py-3 text-center font-mono text-2xl tracking-widest text-gray-900 outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="flex w-full items-center justify-center rounded-xl bg-blue-600 py-3 text-sm font-semibold text-white transition-all hover:bg-blue-700 active:scale-95 disabled:opacity-50"
                        >
                            {loading ? (
                                <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                            ) : (
                                "Verify & Continue"
                            )}
                        </button>

                        <button
                            type="button"
                            onClick={() => {
                                setStep("PHONE");
                                setDisplayOtp(null);
                            }}
                            className="w-full text-center text-xs font-medium text-gray-500 hover:underline dark:text-gray-400"
                        >
                            ← Change Phone Number
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
}