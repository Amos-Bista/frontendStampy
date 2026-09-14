import { useState } from "react";
import { ShieldCheck, Mail, Eye, EyeOff } from "lucide-react";
import axios from "axios";
import FormInput from "../ui/formInput";

interface LoginFormData {
    email: string;
    password: string;
}

const SuperAdminLoginForm = () => {
    const [formData, setFormData] = useState<LoginFormData>({
        email: "admin@stampy.com",
        password: "Admin@123456",
    });

    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleInputChange = (
        field: keyof LoginFormData,
        value: string
    ) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));

        if (error) {
            setError("");
        }
    };

    const handleSubmit = async (
        e: React.FormEvent<HTMLFormElement>
    ) => {
        e.preventDefault();

        if (!formData.email.trim()) {
            setError("Email or username is required");
            return;
        }

        if (!formData.password) {
            setError("Password is required");
            return;
        }

        try {
            setLoading(true);
            setError("");

            const API_URL =
                import.meta.env.VITE_API_URL

            const response = await axios.post(
                `${API_URL}/api/v1/super-admin/auth/login`,
                {
                    email: formData.email.trim(),
                    password: formData.password,
                }
            );

            console.log(
                "SuperAdmin login response:",
                response.data
            );

            const token =
                response.data?.data?.token ||
                response.data?.token;

            const admin =
                response.data?.data?.superAdmin ||
                response.data?.data?.admin ||
                response.data?.superAdmin;

            console.log("superAdmin token:", token, admin);

            if (!token) {
                throw new Error(
                    "Login successful but authentication token was not returned"
                );
            }

            localStorage.setItem(
                "superAdminToken",
                token
            );

            if (admin) {
                localStorage.setItem(
                    "superAdmin",
                    JSON.stringify(admin)
                );
            }

            window.location.href = "/superadmin/dashboard";
        } catch (error: any) {
            console.error(
                "SuperAdmin login failed:",
                error.response?.data || error
            );

            setError(
                error.response?.data?.message ||
                error.message ||
                "Invalid email or password"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4 py-8">
            <div className="w-full max-w-md">
                {/* Logo / Brand */}
                <div className="text-center mb-8">
                    <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-600 shadow-lg shadow-indigo-600/30">
                        <ShieldCheck
                            size={34}
                            className="text-white"
                            strokeWidth={2}
                        />
                    </div>

                    <h1 className="text-3xl font-bold text-white">
                        Stampy
                    </h1>

                    <p className="mt-2 text-sm text-slate-400">
                        SuperAdmin Control Panel
                    </p>
                </div>

                {/* Card */}
                <div className="rounded-2xl border border-white/10 bg-white p-6 shadow-2xl sm:p-8">
                    <div className="mb-7">
                        <h2 className="text-2xl font-bold text-slate-900">
                            Welcome back
                        </h2>

                        <p className="mt-1 text-sm text-slate-500">
                            Sign in to manage the Stampy platform.
                        </p>
                    </div>

                    <form
                        onSubmit={handleSubmit}
                        className="space-y-5"
                    >
                        {/* email */}
                        <div className="relative">
                            <FormInput
                                label="Email or Username"
                                type="text"
                                required
                                value={formData.email}
                                onChange={(value) =>
                                    handleInputChange(
                                        "email",
                                        value
                                    )
                                }
                                placeholder="admin@stampy.com"
                            />

                            <Mail
                                size={18}
                                className="pointer-events-none absolute right-4 top-[34px] text-slate-400"
                            />
                        </div>

                        {/* Password */}
                        <div className="relative">
                            <FormInput
                                label="Password"
                                type={
                                    showPassword
                                        ? "text"
                                        : "password"
                                }
                                required
                                value={formData.password}
                                onChange={(value) =>
                                    handleInputChange(
                                        "password",
                                        value
                                    )
                                }
                                placeholder="Enter your password"
                            />



                            <button
                                type="button"
                                onClick={() =>
                                    setShowPassword(
                                        (prev) => !prev
                                    )
                                }
                                className="absolute right-4 top-[32px] text-slate-400 transition hover:text-slate-700"
                                aria-label={
                                    showPassword
                                        ? "Hide password"
                                        : "Show password"
                                }
                            >
                                {showPassword ? (
                                    <EyeOff size={18} />
                                ) : (
                                    <Eye size={18} />
                                )}
                            </button>
                        </div>

                        {/* Error */}
                        {error && (
                            <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3">
                                <p className="text-sm font-medium text-red-600">
                                    {error}
                                </p>
                            </div>
                        )}

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full rounded-xl bg-indigo-600 px-4 py-3.5 text-sm font-semibold text-white shadow-lg shadow-indigo-600/20 transition hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {loading
                                ? "Signing in..."
                                : "Sign in to Admin Panel"}
                        </button>
                    </form>

                    {/* Security Notice */}
                    <div className="mt-6 flex items-center justify-center gap-2 text-xs text-slate-400">
                        <ShieldCheck size={14} />

                        <span>
                            Authorized SuperAdmin access only
                        </span>
                    </div>
                </div>

                {/* Footer */}
                <p className="mt-6 text-center text-xs text-slate-500">
                    © {new Date().getFullYear()} Stampy. All rights reserved.
                </p>
            </div>
        </div>
    );
};

export default SuperAdminLoginForm;