
import { useEffect, useState } from "react";
import axios from "axios";
import FormInput from "../ui/formInput";

interface Feature {
    _id: string;
    name: string;
    key: string;
    description?: string;
    isActive: boolean;
    isPublic: boolean;
    sortOrder: number;
}

interface BillingCycle {
    _id: string;
    name: string;
    slug: string;
    duration: number;
    durationUnit: string;
    isActive: boolean;
    sortOrder: number;
}

interface Resource {
    _id: string;
    name: string;
    key: string;
    description?: string;
    unit: string;
    isActive: boolean;
    isPublic: boolean;
    sortOrder: number;
}

interface PriceFormData {
    billingCycleId: string;
    amount: string;
    currency: string;
}

interface LimitFormData {
    resourceId: string;
    value: string;
}

interface SubscriptionFormData {
    name: string;
    slug: string;
    description: string;
    prices: PriceFormData[];
    featureIds: string[];
    limits: LimitFormData[];
    isActive: boolean;
    isPublic: boolean;
    sortOrder: string;
}

const SubscriptionForm = () => {
    const [features, setFeatures] = useState<Feature[]>([]);
    const [billingCycles, setBillingCycles] = useState<
        BillingCycle[]
    >([]);
    const [resources, setResources] = useState<Resource[]>([]);

    const [formData, setFormData] =
        useState<SubscriptionFormData>({
            name: "",
            slug: "",
            description: "",
            prices: [
                {
                    billingCycleId: "",
                    amount: "",
                    currency: "NPR",
                },
            ],
            featureIds: [],
            limits: [],
            isActive: true,
            isPublic: true,
            sortOrder: "1",
        });

    const [loadingData, setLoadingData] = useState(true);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchSubscriptionData();
    }, []);

    async function fetchSubscriptionData() {
        try {
            setLoadingData(true);

            const token =
                localStorage.getItem("superAdminToken");

            if (!token) {
                throw new Error(
                    "Authentication token not found"
                );
            }

            const API_URL =
                import.meta.env.VITE_API_URL;

            const headers = {
                Authorization: `Bearer ${token} `,
                "Content-Type": "application/json",
            };

            const [
                featuresResponse,
                billingCyclesResponse,
                resourcesResponse,
            ] = await Promise.all([
                axios.get(
                    `${API_URL}/api/v1/features/get/ `,
                    { headers }
                ),

                axios.get(
                    `${API_URL}/api/v1/billingcycle/get/ `,
                    { headers }
                ),

                axios.get(
                    `${API_URL}/api/v1/resources/get/ `,
                    { headers }
                ),
            ]);

            console.log(
                "Features:",
                featuresResponse.data
            );

            console.log(
                "Billing cycles:",
                billingCyclesResponse.data
            );

            console.log(
                "Resources:",
                resourcesResponse.data
            );

            if (!featuresResponse.data.success) {
                throw new Error(
                    featuresResponse.data.message ||
                    "Failed to fetch features"
                );
            }

            if (!billingCyclesResponse.data.success) {
                throw new Error(
                    billingCyclesResponse.data.message ||
                    "Failed to fetch billing cycles"
                );
            }

            if (!resourcesResponse.data.success) {
                throw new Error(
                    resourcesResponse.data.message ||
                    "Failed to fetch resources"
                );
            }

            setFeatures(featuresResponse.data.data);
            setBillingCycles(
                billingCyclesResponse.data.data
            );
            setResources(resourcesResponse.data.data);
        } catch (error: any) {
            console.error(
                "Failed to load subscription data:",
                error.response?.data || error
            );

            alert(
                error.response?.data?.message ||
                error.message ||
                "Failed to load subscription data"
            );
        } finally {
            setLoadingData(false);
        }
    }

    const handleInputChange = (
        field: "name" | "slug" | "description" | "sortOrder",
        value: string
    ) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleFeatureChange = (
        featureId: string
    ) => {
        setFormData((prev) => {
            const alreadySelected =
                prev.featureIds.includes(featureId);

            return {
                ...prev,
                featureIds: alreadySelected
                    ? prev.featureIds.filter(
                        (id) => id !== featureId
                    )
                    : [
                        ...prev.featureIds,
                        featureId,
                    ],
            };
        });
    };

    const handlePriceChange = (
        index: number,
        field: keyof PriceFormData,
        value: string
    ) => {
        setFormData((prev) => {
            const prices = [...prev.prices];

            prices[index] = {
                ...prices[index],
                [field]: value,
            };

            return {
                ...prev,
                prices,
            };
        });
    };

    const addPrice = () => {
        setFormData((prev) => ({
            ...prev,
            prices: [
                ...prev.prices,
                {
                    billingCycleId: "",
                    amount: "",
                    currency: "NPR",
                },
            ],
        }));
    };

    const removePrice = (index: number) => {
        setFormData((prev) => ({
            ...prev,
            prices: prev.prices.filter(
                (_, i) => i !== index
            ),
        }));
    };

    const handleResourceChange = (
        resourceId: string,
        value: string
    ) => {
        setFormData((prev) => {
            const existingLimitIndex =
                prev.limits.findIndex(
                    (limit) =>
                        limit.resourceId === resourceId
                );

            const limits = [...prev.limits];

            if (value === "") {
                if (existingLimitIndex !== -1) {
                    limits.splice(
                        existingLimitIndex,
                        1
                    );
                }

                return {
                    ...prev,
                    limits,
                };
            }

            if (existingLimitIndex !== -1) {
                limits[existingLimitIndex] = {
                    ...limits[existingLimitIndex],
                    value,
                };
            } else {
                limits.push({
                    resourceId,
                    value,
                });
            }

            return {
                ...prev,
                limits,
            };
        });
    };

    const getResourceLimit = (
        resourceId: string
    ) => {
        const limit = formData.limits.find(
            (item) =>
                item.resourceId === resourceId
        );

        return limit?.value || "";
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

            if (formData.featureIds.length === 0) {
                alert(
                    "Please select at least one feature"
                );
                return;
            }

            const validPrices =
                formData.prices.filter(
                    (price) =>
                        price.billingCycleId &&
                        price.amount !== ""
                );

            if (validPrices.length === 0) {
                alert(
                    "Please add at least one billing cycle price"
                );
                return;
            }

            const validLimits =
                formData.limits.filter(
                    (limit) =>
                        limit.resourceId &&
                        limit.value !== ""
                );

            const payload = {
                name: formData.name,
                slug: formData.slug,
                description: formData.description,

                prices: validPrices.map(
                    (price) => ({
                        billingCycleId:
                            price.billingCycleId,
                        amount: Number(
                            price.amount
                        ),
                        currency:
                            price.currency,
                    })
                ),

                featureIds:
                    formData.featureIds,

                limits: validLimits.map(
                    (limit) => ({
                        resourceId:
                            limit.resourceId,
                        value: Number(
                            limit.value
                        ),
                    })
                ),

                isActive:
                    formData.isActive,

                isPublic:
                    formData.isPublic,

                sortOrder: Number(
                    formData.sortOrder
                ),
            };

            console.log(
                "Creating subscription plan:",
                payload
            );

            const API_URL =
                import.meta.env.VITE_API_URL;

            const response = await axios.post(
                `${API_URL}/api/v1/subscriptions/plans/post/ `,
                payload,
                {
                    headers: {
                        Authorization: `Bearer ${token} `,
                        "Content-Type":
                            "application/json",
                    },
                }
            );

            console.log(
                "Subscription plan created:",
                response.data
            );

            alert(
                "Subscription plan created successfully"
            );

            setFormData({
                name: "",
                slug: "",
                description: "",
                prices: [
                    {
                        billingCycleId: "",
                        amount: "",
                        currency: "NPR",
                    },
                ],
                featureIds: [],
                limits: [],
                isActive: true,
                isPublic: true,
                sortOrder: "1",
            });
        } catch (error: any) {
            console.error(
                "Subscription creation failed:",
                error.response?.data || error
            );

            alert(
                error.response?.data?.message ||
                error.message ||
                "Failed to create subscription plan"
            );
        } finally {
            setLoading(false);
        }
    };

    if (loadingData) {
        return (
            <div className="min-h-screen bg-slate-50 p-4 sm:p-6">
                <div className="max-w-2xl mx-auto">
                    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-7">
                        <p className="text-center text-sm text-slate-500">
                            Loading subscription data...
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 p-4 sm:p-6">
            <div className="max-w-4xl mx-auto">
                <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5 sm:p-7">

                    {/* Header */}
                    <div className="mb-6">
                        <h1 className="text-xl sm:text-2xl font-bold text-slate-900">
                            Create Subscription Plan
                        </h1>

                        <p className="mt-1 text-sm text-slate-500">
                            Create a subscription plan using
                            features, billing cycles and
                            resource limits.
                        </p>
                    </div>

                    <form
                        onSubmit={handleSubmit}
                        className="space-y-7"
                    >

                        {/* Basic Information */}
                        <div>
                            <h2 className="text-sm font-bold text-slate-800 mb-4">
                                Basic Information
                            </h2>

                            <div className="space-y-4">

                                <FormInput
                                    label="Plan Name"
                                    type="text"
                                    required
                                    value={
                                        formData.name
                                    }
                                    onChange={(
                                        value: string
                                    ) =>
                                        handleInputChange(
                                            "name",
                                            value
                                        )
                                    }
                                    placeholder="Growth"
                                />

                                <FormInput
                                    label="Slug"
                                    type="text"
                                    required
                                    value={
                                        formData.slug
                                    }
                                    onChange={(
                                        value: string
                                    ) =>
                                        handleInputChange(
                                            "slug",
                                            value
                                        )
                                    }
                                    placeholder="growth"
                                />

                                {/* Description */}
                                <div>
                                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                                        Description
                                    </label>

                                    <textarea
                                        value={
                                            formData.description
                                        }
                                        onChange={(e) =>
                                            handleInputChange(
                                                "description",
                                                e.target.value
                                            )
                                        }
                                        placeholder="For growing businesses"
                                        rows={3}
                                        className="w-full px-4 py-3 text-base sm:text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none resize-none"
                                    />
                                </div>

                                <FormInput
                                    label="Sort Order"
                                    type="number"
                                    required
                                    value={
                                        formData.sortOrder
                                    }
                                    onChange={(
                                        value: string
                                    ) =>
                                        handleInputChange(
                                            "sortOrder",
                                            value
                                        )
                                    }
                                    placeholder="2"
                                />

                            </div>
                        </div>

                        {/* Billing Prices */}
                        <div className="border-t border-slate-100 pt-6">
                            <div className="flex items-center justify-between mb-4">
                                <div>
                                    <h2 className="text-sm font-bold text-slate-800">
                                        Pricing
                                    </h2>

                                    <p className="text-xs text-slate-500 mt-1">
                                        Set a price for each
                                        billing cycle.
                                    </p>
                                </div>

                                <button
                                    type="button"
                                    onClick={addPrice}
                                    className="text-sm font-semibold text-indigo-600 hover:text-indigo-700"
                                >
                                    + Add Price
                                </button>
                            </div>

                            <div className="space-y-4">
                                {formData.prices.map(
                                    (
                                        price,
                                        index
                                    ) => (
                                        <div
                                            key={index}
                                            className="border border-slate-200 rounded-xl p-4"
                                        >
                                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

                                                {/* Billing Cycle */}
                                                <div>
                                                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                                                        Billing Cycle
                                                    </label>

                                                    <select
                                                        value={
                                                            price.billingCycleId
                                                        }
                                                        onChange={(
                                                            e
                                                        ) =>
                                                            handlePriceChange(
                                                                index,
                                                                "billingCycleId",
                                                                e.target.value
                                                            )
                                                        }
                                                        required
                                                        className="w-full px-4 py-3 text-base sm:text-sm border border-slate-200 rounded-xl bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                                                    >
                                                        <option value="">
                                                            Select billing cycle
                                                        </option>

                                                        {billingCycles
                                                            .filter(
                                                                (
                                                                    cycle
                                                                ) =>
                                                                    cycle.isActive
                                                            )
                                                            .map(
                                                                (
                                                                    cycle
                                                                ) => (
                                                                    <option
                                                                        key={
                                                                            cycle._id
                                                                        }
                                                                        value={
                                                                            cycle._id
                                                                        }
                                                                    >
                                                                        {
                                                                            cycle.name
                                                                        }{" "}
                                                                        (
                                                                        {
                                                                            cycle.duration
                                                                        }{" "}
                                                                        {
                                                                            cycle.durationUnit.toLowerCase()
                                                                        }
                                                                        )
                                                                    </option>
                                                                )
                                                            )}
                                                    </select>
                                                </div>

                                                {/* Amount */}
                                                <FormInput
                                                    label="Amount"
                                                    type="number"
                                                    required
                                                    value={
                                                        price.amount
                                                    }
                                                    onChange={(
                                                        value: string
                                                    ) =>
                                                        handlePriceChange(
                                                            index,
                                                            "amount",
                                                            value
                                                        )
                                                    }
                                                    placeholder="999"
                                                />

                                                {/* Currency */}
                                                <div>
                                                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                                                        Currency
                                                    </label>

                                                    <select
                                                        value={
                                                            price.currency
                                                        }
                                                        onChange={(
                                                            e
                                                        ) =>
                                                            handlePriceChange(
                                                                index,
                                                                "currency",
                                                                e.target.value
                                                            )
                                                        }
                                                        className="w-full px-4 py-3 text-base sm:text-sm border border-slate-200 rounded-xl bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                                                    >
                                                        <option value="NPR">
                                                            NPR
                                                        </option>

                                                        <option value="USD">
                                                            USD
                                                        </option>

                                                        <option value="EUR">
                                                            EUR
                                                        </option>
                                                    </select>
                                                </div>

                                            </div>

                                            {formData
                                                .prices
                                                .length >
                                                1 && (
                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            removePrice(
                                                                index
                                                            )
                                                        }
                                                        className="mt-3 text-xs font-semibold text-red-600 hover:text-red-700"
                                                    >
                                                        Remove
                                                    </button>
                                                )}
                                        </div>
                                    )
                                )}
                            </div>
                        </div>

                        {/* Features */}
                        <div className="border-t border-slate-100 pt-6">
                            <h2 className="text-sm font-bold text-slate-800">
                                Features
                            </h2>

                            <p className="text-xs text-slate-500 mt-1 mb-4">
                                Select the features included
                                in this subscription plan.
                            </p>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {features
                                    .filter(
                                        (
                                            feature
                                        ) =>
                                            feature.isActive &&
                                            feature.isPublic
                                    )
                                    .map(
                                        (
                                            feature
                                        ) => (
                                            <label
                                                key={
                                                    feature._id
                                                }
                                                className="flex items-start gap-3 border border-slate-200 rounded-xl p-4 cursor-pointer hover:border-indigo-300"
                                            >
                                                <input
                                                    type="checkbox"
                                                    checked={formData.featureIds.includes(
                                                        feature._id
                                                    )}
                                                    onChange={() =>
                                                        handleFeatureChange(
                                                            feature._id
                                                        )
                                                    }
                                                    className="h-4 w-4 mt-0.5 rounded text-indigo-600 focus:ring-indigo-500"
                                                />

                                                <div>
                                                    <p className="text-sm font-semibold text-slate-800">
                                                        {
                                                            feature.name
                                                        }
                                                    </p>

                                                    <p className="text-xs text-slate-500">
                                                        {
                                                            feature.description
                                                        }
                                                    </p>
                                                </div>
                                            </label>
                                        )
                                    )}
                            </div>
                        </div>

                        {/* Resource Limits */}
                        <div className="border-t border-slate-100 pt-6">
                            <h2 className="text-sm font-bold text-slate-800">
                                Resource Limits
                            </h2>

                            <p className="text-xs text-slate-500 mt-1 mb-4">
                                Define the maximum amount of
                                each resource available in
                                this plan.
                            </p>

                            <div className="space-y-3">
                                {resources
                                    .filter(
                                        (
                                            resource
                                        ) =>
                                            resource.isActive &&
                                            resource.isPublic
                                    )
                                    .map(
                                        (
                                            resource
                                        ) => (
                                            <div
                                                key={
                                                    resource._id
                                                }
                                                className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-end border border-slate-200 rounded-xl p-4"
                                            >
                                                <div>
                                                    <p className="text-sm font-semibold text-slate-800">
                                                        {
                                                            resource.name
                                                        }
                                                    </p>

                                                    <p className="text-xs text-slate-500 mt-1">
                                                        {
                                                            resource.description
                                                        }
                                                    </p>

                                                    <span className="inline-block mt-2 rounded bg-gray-100 px-2 py-1 font-mono text-xs text-gray-600">
                                                        {
                                                            resource.key
                                                        }
                                                    </span>
                                                </div>

                                                <FormInput
                                                    label={`Limit ${resource.unit
                                                        ? `(${resource.unit})`
                                                        : ""
                                                        } `}
                                                    type="number"
                                                    value={getResourceLimit(
                                                        resource._id
                                                    )}
                                                    onChange={(
                                                        value: string
                                                    ) =>
                                                        handleResourceChange(
                                                            resource._id,
                                                            value
                                                        )
                                                    }
                                                    placeholder="500"
                                                />
                                            </div>
                                        )
                                    )}
                            </div>
                        </div>

                        {/* Status */}
                        <div className="border-t border-slate-100 pt-6">
                            <h2 className="text-sm font-bold text-slate-800 mb-4">
                                Visibility & Status
                            </h2>

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
                                                (
                                                    prev
                                                ) => ({
                                                    ...prev,
                                                    isActive:
                                                        e
                                                            .target
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
                                            Plan can be
                                            subscribed to
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
                                                (
                                                    prev
                                                ) => ({
                                                    ...prev,
                                                    isPublic:
                                                        e
                                                            .target
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
                                            Visible to
                                            businesses
                                        </p>
                                    </div>
                                </label>

                            </div>
                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-xl transition disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading
                                ? "Creating..."
                                : "Create Subscription Plan"}
                        </button>

                    </form>
                </div>
            </div>
        </div>
    );
};

export default SubscriptionForm;

