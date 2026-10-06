
import { useState } from "react";
import axios from "axios";
import FormInput from "../ui/formInput";

interface BillingCycleFormData {
    name: string;
    slug: string;
    duration: string;
    durationUnit: string;
    isActive: boolean;
    sortOrder: string;
}

const BillingCycleForm = () => {
    const [formData, setFormData] =
        useState<BillingCycleFormData>({
            name: "",
            slug: "",
            duration: "1",
            durationUnit: "MONTH",
            isActive: true,
            sortOrder: "1",
        });

    const [loading, setLoading] = useState(false);

    const handleInputChange = (
        field: keyof BillingCycleFormData,
        value: string
    ) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleSubmit = async (
        e: React.FormEvent<HTMLFormElement>
    ) => {
        e.preventDefault();

        try {
            setLoading(true);

            const token =
                localStorage.getItem("superAdminToken");

            const response = await axios.post(
                `${import.meta.env.VITE_API_URL}/api/v1/billingcycle/post/ `,
                {
                    name: formData.name,
                    slug: formData.slug,
                    duration: Number(formData.duration),
                    durationUnit: formData.durationUnit,
                    isActive: formData.isActive,
                    sortOrder: Number(formData.sortOrder),
                },
                {
                    headers: {
                        Authorization: `Bearer ${token} `,
                        "Content-Type": "application/json",
                    },
                }
            );

            console.log(
                "Billing cycle created:",
                response.data
            );

            alert("Billing cycle created successfully");

            setFormData({
                name: "",
                slug: "",
                duration: "1",
                durationUnit: "MONTH",
                isActive: true,
                sortOrder: "1",
            });
        } catch (error: any) {
            console.error(
                "Billing cycle creation failed:",
                error.response?.data || error
            );

            alert(
                error.response?.data?.message ||
                "Failed to create billing cycle"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 p-4 sm:p-6">
            <div className="max-w-2xl mx-auto">
                <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5 sm:p-7">

                    {/* Header */}
                    <div className="mb-6">
                        <h1 className="text-xl sm:text-2xl font-bold text-slate-900">
                            Create Billing Cycle
                        </h1>

                        <p className="mt-1 text-sm text-slate-500">
                            Add a billing cycle that can be used
                            for subscription plans.
                        </p>
                    </div>

                    <form
                        onSubmit={handleSubmit}
                        className="space-y-5"
                    >

                        {/* Billing Cycle Name */}
                        <FormInput
                            label="Billing Cycle Name"
                            type="text"
                            required
                            value={formData.name}
                            onChange={(value: string) =>
                                handleInputChange(
                                    "name",
                                    value
                                )
                            }
                            placeholder="Monthly"
                        />

                        {/* Slug */}
                        <FormInput
                            label="Slug"
                            type="text"
                            required
                            value={formData.slug}
                            onChange={(value: string) =>
                                handleInputChange(
                                    "slug",
                                    value
                                )
                            }
                            placeholder="monthly"
                        />

                        {/* Duration */}
                        <FormInput
                            label="Duration"
                            type="number"
                            required
                            value={formData.duration}
                            onChange={(value: string) =>
                                handleInputChange(
                                    "duration",
                                    value
                                )
                            }
                            placeholder="1"
                        />

                        {/* Duration Unit */}
                        <div>
                            <label className="block text-xs font-semibold text-slate-700 mb-1">
                                Duration Unit
                            </label>

                            <select
                                value={formData.durationUnit}
                                onChange={(e) =>
                                    handleInputChange(
                                        "durationUnit",
                                        e.target.value
                                    )
                                }
                                className="w-full px-4 py-3 text-base sm:text-sm border border-slate-200 rounded-xl bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                            >
                                <option value="DAY">
                                    Day
                                </option>

                                <option value="WEEK">
                                    Week
                                </option>

                                <option value="MONTH">
                                    Month
                                </option>

                                <option value="YEAR">
                                    Year
                                </option>
                            </select>
                        </div>

                        {/* Sort Order */}
                        <FormInput
                            label="Sort Order"
                            type="number"
                            required
                            value={formData.sortOrder}
                            onChange={(value: string) =>
                                handleInputChange(
                                    "sortOrder",
                                    value
                                )
                            }
                            placeholder="1"
                        />

                        {/* Status */}
                        <label className="flex items-center gap-3 border border-slate-200 rounded-xl p-4 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={formData.isActive}
                                onChange={(e) =>
                                    setFormData((prev) => ({
                                        ...prev,
                                        isActive:
                                            e.target.checked,
                                    }))
                                }
                                className="h-4 w-4 rounded text-indigo-600 focus:ring-indigo-500"
                            />

                            <div>
                                <p className="text-sm font-semibold text-slate-800">
                                    Active
                                </p>

                                <p className="text-xs text-slate-500">
                                    Billing cycle can be used
                                    for subscription plans
                                </p>
                            </div>
                        </label>

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-xl transition disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading
                                ? "Creating..."
                                : "Create Billing Cycle"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default BillingCycleForm;
