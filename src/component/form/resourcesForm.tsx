
import { useState } from "react";
import axios from "axios";
import FormInput from "../ui/formInput";

interface ResourceFormData {
    name: string;
    key: string;
    description: string;
    unit: string;
    isActive: boolean;
    isPublic: boolean;
    sortOrder: string;
}

const ResourcesForm = () => {
    const [formData, setFormData] =
        useState<ResourceFormData>({
            name: "",
            key: "",
            description: "",
            unit: "",
            isActive: true,
            isPublic: true,
            sortOrder: "1",
        });

    const [loading, setLoading] = useState(false);

    const handleInputChange = (
        field: keyof ResourceFormData,
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

            if (!token) {
                throw new Error(
                    "Authentication token not found"
                );
            }

            const response = await axios.post(
                `${import.meta.env.VITE_API_URL}/api/v1/resources/post/ `,
                {
                    name: formData.name,
                    key: formData.key,
                    description: formData.description,
                    unit: formData.unit,
                    isActive: formData.isActive,
                    isPublic: formData.isPublic,
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
                "Resource created:",
                response.data
            );

            alert("Resource created successfully");

            setFormData({
                name: "",
                key: "",
                description: "",
                unit: "",
                isActive: true,
                isPublic: true,
                sortOrder: "1",
            });
        } catch (error: any) {
            console.error(
                "Resource creation failed:",
                error.response?.data || error
            );

            alert(
                error.response?.data?.message ||
                error.message ||
                "Failed to create resource"
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
                            Create Resource
                        </h1>

                        <p className="mt-1 text-sm text-slate-500">
                            Add a resource that can be used to
                            define subscription limits.
                        </p>
                    </div>

                    <form
                        onSubmit={handleSubmit}
                        className="space-y-5"
                    >

                        {/* Resource Name */}
                        <FormInput
                            label="Resource Name"
                            type="text"
                            required
                            value={formData.name}
                            onChange={(value: string) =>
                                handleInputChange(
                                    "name",
                                    value
                                )
                            }
                            placeholder="Customers"
                        />

                        {/* Resource Key */}
                        <FormInput
                            label="Resource Key"
                            type="text"
                            required
                            value={formData.key}
                            onChange={(value: string) =>
                                handleInputChange(
                                    "key",
                                    value
                                )
                            }
                            placeholder="customers"
                        />

                        {/* Description */}
                        <div>
                            <label className="block text-xs font-semibold text-slate-700 mb-1">
                                Description
                            </label>

                            <textarea
                                value={formData.description}
                                onChange={(e) =>
                                    handleInputChange(
                                        "description",
                                        e.target.value
                                    )
                                }
                                placeholder="Number of customers a business can manage"
                                rows={4}
                                className="w-full px-4 py-3 text-base sm:text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none resize-none"
                            />
                        </div>

                        {/* Unit */}
                        <FormInput
                            label="Unit"
                            type="text"
                            value={formData.unit}
                            onChange={(value: string) =>
                                handleInputChange(
                                    "unit",
                                    value
                                )
                            }
                            placeholder="customers"
                        />

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
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                            {/* Active */}
                            <label className="flex items-center gap-3 border border-slate-200 rounded-xl p-4 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={
                                        formData.isActive
                                    }
                                    onChange={(e) =>
                                        setFormData(
                                            (prev) => ({
                                                ...prev,
                                                isActive:
                                                    e.target
                                                        .checked,
                                            })
                                        )
                                    }
                                    className="h-4 w-4 rounded text-indigo-600 focus:ring-indigo-500"
                                />

                                <div>
                                    <p className="text-sm font-semibold text-slate-800">
                                        Active
                                    </p>

                                    <p className="text-xs text-slate-500">
                                        Resource can be used
                                        in subscription limits
                                    </p>
                                </div>
                            </label>

                            {/* Public */}
                            <label className="flex items-center gap-3 border border-slate-200 rounded-xl p-4 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={
                                        formData.isPublic
                                    }
                                    onChange={(e) =>
                                        setFormData(
                                            (prev) => ({
                                                ...prev,
                                                isPublic:
                                                    e.target
                                                        .checked,
                                            })
                                        )
                                    }
                                    className="h-4 w-4 rounded text-indigo-600 focus:ring-indigo-500"
                                />

                                <div>
                                    <p className="text-sm font-semibold text-slate-800">
                                        Public
                                    </p>

                                    <p className="text-xs text-slate-500">
                                        Visible when creating
                                        subscription plans
                                    </p>
                                </div>
                            </label>

                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-xl transition disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading
                                ? "Creating..."
                                : "Create Resource"}
                        </button>

                    </form>
                </div>
            </div>
        </div>
    );
};

export default ResourcesForm;
